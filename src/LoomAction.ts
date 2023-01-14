import fs from 'fs';
import path from 'path';
import core from '@actions/core';
import { PatternReader } from './PatternReader';
import { BehaviorPackGroups, ResourcePackGroups } from './types/Groups';

export interface Groups {
  group: BehaviorPackGroups | ResourcePackGroups;
  name: string;
}

export class LoomAction {
  private static reader: PatternReader;

  public static bpFiles: Groups[] = [];
  public static rpFiles: Groups[] = [];

  public static run(): void {
    console.clear();

    const pattern = core.getInput('pattern');
    const bpPath = core.getInput('behavior_pack_path');
    const rpPath = core.getInput('resource_pack_path');
    this.reader = new PatternReader(pattern);

    this.getFilesFrom(bpPath, this.bpFiles);
    this.getFilesFrom(rpPath, this.rpFiles);

    this.reader.testFileEndingFrom('BEHAVIOR_PACK', this.bpFiles);
    this.reader.testFileEndingFrom('RESOURCE_PACK', this.rpFiles);

    this.shouldFail();
  }

  /**
   * Collect files from a specific directory.
   * @param dir The path to collect files.
   * @param groups The array to save the collected files.
   */
  private static getFilesFrom(dir: string, groups: Groups[]) {
    fs.readdirSync(dir).forEach(async (file) => {
      const insideDir = path.join(dir, file);
      const stat = fs.lstatSync(insideDir);

      if (stat.isDirectory()) {
        return this.getFilesFrom(insideDir, groups);
      }

      const group = dir.split('/').at(2);
      const name = path.basename(insideDir);

      if (!group || !name) return;

      groups.push({ group, name });
    });
  }

  private static shouldFail() {
    if (this.reader.invalid.length > 0) {
      core.setFailed('TEST: Invalid file endings');
    }
  }
}
