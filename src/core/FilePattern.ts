import fs from 'fs';
import YAML from 'yaml';
import * as core from '@actions/core';
import * as patterns from '../patterns';
import { Groups } from '../LoomAction';
import { BehaviorPackGroups, ResourcePackGroups } from '../types/Groups';
import { TerminalColor } from '../types/TerminalColor';

export type Patterns = 'mojang' | 'custom';

interface InvalidFiles {
  pack: string;
  expected: string;
  file: Groups;
}

export class FilePattern {
  private path: string;
  public invalidFiles: InvalidFiles[] = [];
  public numberOfFiles: number = 0;

  constructor(pattern: Patterns | string) {
    this.path = patterns[pattern];
  }

  public testFilesNameConvention(pack: string, groups: Groups[]) {
    if (groups.length == 0) return;

    core.info('');
    core.info(TerminalColor.BOLD + 'Verifying ' + pack.toLowerCase() + ' files ending');

    groups.forEach((file) => {
      this.numberOfFiles++;
      const expected = this.getExpectedFileNameEndingFrom(pack, file.group);

      if (expected === undefined) return;

      if (!file.name.endsWith(expected)) {
        this.invalidFiles.push({ pack, expected, file });
        core.info(
          TerminalColor.BRIGHT_RED + '✖ ' +
          TerminalColor.RESET + file.name +
          TerminalColor.YELLOW + ` (${file.group})` +
          TerminalColor.RESET
        );
        return;
      }

      core.info(
        TerminalColor.BRIGHT_GREEN + '✔ ' +
        TerminalColor.RESET + file.name +
        TerminalColor.YELLOW + ` (${file.group})` +
        TerminalColor.RESET
      );
    });
  }

  private getExpectedFileNameEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile['file-name-convention'][pack][group];
  }
}
