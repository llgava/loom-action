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

  constructor(pattern: Patterns | string) {
    this.path = patterns[pattern];
  }

  public testFileEndingFrom(pack: string, groups: Groups[]) {
    core.info('');
    core.info('┌────────────────────────────────────────────────────────────┐');
    core.info('│ Verifying the files ending...                              │');
    core.info('└────────────────────────────────────────────────────────────┘');
    core.info('');

    groups.forEach((file) => {
      const expected = this.getFileEndingFrom(pack, file.group);

      if (!file.name.endsWith(expected)) {
        this.invalid.push({ pack, expected, file });
        core.info('\u001b[31;1m✖\u001b[0m ' + file.name + ` (Expected: ${expected})`);
        return;
      }

      core.info('\u001b[32;1m✔\u001b[0m ' + file.name);
    });
  }

  // TODO: Add group and pack type.
  public getFileEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile[pack][group];
  }
}
