import fs from 'fs';
import YAML from 'yaml';
import chalk from 'chalk';
import * as core from '@actions/core';
import * as patterns from './patterns';
import { Groups } from './LoomAction';
import { BehaviorPackGroups, ResourcePackGroups } from './types/Groups';

export type Patterns = 'mojang' | 'custom';

interface InvalidFiles {
  pack: string;
  expected: string;
  file: Groups;
}

export class PatternReader {
  private path: string;
  public invalid: InvalidFiles[] = [];
  public numberOfFiles: number = 0;

  constructor(pattern: Patterns | string) {
    this.path = patterns[pattern];
  }

  public testFileEndingFrom(pack: string, groups: Groups[]) {
    if (core.getState('JOB_FAILED')) return;

    core.info('');
    core.info(`\u001b[1m${pack.toLowerCase()}\u001b[0m - Verifying the files ending...`);

    groups.forEach((file) => {
      const expected = this.getFileEndingFrom(pack, file.group);

      if (!file.name.endsWith(expected)) {
        this.invalid.push({ pack, expected, file });
        core.info(`\u001b[31;1m✖\u001b[0m\u001b[30m ${file.name}\u001b[0m`);
        return;
      }

      core.info('\u001b[32;1m✔\u001b[0m\u001b[30m ' + file.name + '\u001b[0m');
      this.numberOfFiles++;
    });
  }

  // TODO: Add group and pack type.
  public getFileEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile[pack][group];
  }
}
