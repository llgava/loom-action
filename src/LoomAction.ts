require('dotenv').config();
import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import { FileNameConvention } from './core/FileNameConvention';
import { BehaviorPackGroups, ResourcePackGroups } from './@types/Groups';
import { NamePatterns } from './core/NamePatterns';
import { Logger } from './utils/Logger';

export interface Groups {
  group: BehaviorPackGroups | ResourcePackGroups;
  name: string;
  path: string;
}

export class LoomAction {
  // GitHub action inputs
  private static pattern: string | any = core.getInput('pattern') || process.env.PATTERN;
  private static bpPath: string | any = core.getInput('behavior_pack_path') || process.env.BEHAVIOR_PACK_PATH;
  private static rpPath: string | any = core.getInput('resource_pack_path') || process.env.RESOURCE_PACK_PATH;

  private static bpFiles: Groups[] = [];
  private static rpFiles: Groups[] = [];
  private static fileNameConvention: FileNameConvention = new FileNameConvention(this.pattern);
  private static namePatterns: NamePatterns = new NamePatterns(this.pattern);

  public static run(): void {
    this.getFilesFrom(this.bpPath, this.bpFiles);
    this.getFilesFrom(this.rpPath, this.rpFiles);

    this.fileNameConvention.testFilesNameConvention('behavior_pack', this.bpFiles);
    this.fileNameConvention.testFilesNameConvention('resource_pack', this.rpFiles);

    this.namePatterns.testNamePattern(this.bpFiles);
    this.namePatterns.testNamePattern(this.rpFiles);
    this.fileNameConvention.result();
    this.namePatterns.result();
  }

  /**
   * Collect files from a specific directory.
   * @param dir The path to collect files.
   * @param groups The array to save the collected files.
   */
  private static getFilesFrom(dir: string, groups: Groups[]) {
    try {
      fs.readdirSync(dir).forEach(async (file) => {
        const insideDir = path.join(dir, file);
        const stat = fs.lstatSync(insideDir);

        if (stat.isDirectory()) {
          return this.getFilesFrom(insideDir, groups);
        }

        const group = dir.split('/').at(2);
        const name = path.basename(insideDir);

        if (!group || !name) return;

        groups.push({ group, name, path: insideDir });
      });
    } catch {
      Logger.sendMessage(
        { message: `The directory '${dir}' cannot be found on this repository.`, setFailed: true }
      );
    }
  }
}
