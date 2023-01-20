import * as core from '@actions/core';
import * as patterns from '../patterns';
import { Groups } from '../LoomAction';
import { TerminalColor } from '../types/TerminalColor';
import { Pattern } from './Pattern';

export type Patterns = 'mojang' | 'custom';

interface InvalidFiles {
  pack: string;
  expected: string;
  file: Groups;
}

export class FileNameConvention extends Pattern {
  public invalidFiles: InvalidFiles[] = [];
  public numberOfFiles: number = 0;

  constructor(pattern: Patterns | string) {
    super(patterns[pattern])
  }

  public testFilesNameConvention(pack: string, groups: Groups[]) {
    if (groups.length == 0) return;

    if (!this.silent) {
      core.info('');
      core.info(TerminalColor.BOLD + 'Verifying ' + pack.toLowerCase() + ' files ending');
    }

    groups.forEach((file) => {
      this.numberOfFiles++;
      const expected = this.getExpectedFileNameEndingFrom(pack, file.group);

      if (expected === undefined) return;

      if (!file.name.endsWith(expected)) {
        this.invalidFiles.push({ pack, expected, file });

        if (!this.silent) {
          core.info(
            TerminalColor.BRIGHT_RED + '✖ ' +
            TerminalColor.RESET + file.name +
            TerminalColor.YELLOW + ` (${file.group})` +
            TerminalColor.RESET
          );
        }

        return;
      }

      if (!this.silent) {
        core.info(
          TerminalColor.BRIGHT_GREEN + '✔ ' +
          TerminalColor.RESET + file.name +
          TerminalColor.YELLOW + ` (${file.group})` +
          TerminalColor.RESET
        );
      }
    });
  }
}
