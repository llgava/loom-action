require('dotenv').config();
import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import { FilePattern } from './core/FilePattern';
import { BehaviorPackGroups, ResourcePackGroups } from './types/Groups';
import { TerminalColor } from './types/TerminalColor';

export interface Groups {
  group: BehaviorPackGroups | ResourcePackGroups;
  name: string;
}

export class LoomAction {
  // GitHub action inputs
  private static pattern: string | any = core.getInput('pattern') || process.env.PATTERN;
  private static bpPath: string | any = core.getInput('behavior_pack_path') || process.env.BEHAVIOR_PACK_PATH;
  private static rpPath: string | any = core.getInput('resource_pack_path') || process.env.RESOURCE_PACK_PATH;

  private static bpFiles: Groups[] = [];
  private static rpFiles: Groups[] = [];
  private static patternReader: FilePattern = new FilePattern(this.pattern);

  public static run(): void {
    this.getFilesFrom(this.bpPath, this.bpFiles);
    this.getFilesFrom(this.rpPath, this.rpFiles);

    this.patternReader.testFileEndingFrom('BEHAVIOR_PACK', this.bpFiles);
    this.patternReader.testFileEndingFrom('RESOURCE_PACK', this.rpFiles);

    this.result();
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

        groups.push({ group, name });
      });
    } catch {
      core.setFailed(
        `The directory '${TerminalColor.BOLD + dir + TerminalColor.RESET}' cannot be found on this repository.`
      );
    }
  }

  private static result() {
    const fails = this.patternReader.invalidFiles.length;
    const total = this.patternReader.numberOfFiles;

    if (fails > 0) {
      core.info('');
      core.setFailed(`${fails} of ${total} files has invalid endings.`);

      this.patternReader.invalidFiles.forEach((invalidFile) => {
        core.info(TerminalColor.YELLOW + `  ⚬ ` + TerminalColor.RESET + invalidFile.file.name);
        core.info(`    Expected: ` + TerminalColor.GREEN + invalidFile.expected + TerminalColor.RESET);
        core.info('');
      });

      core.ExitCode.Failure;
    }
  }
}
