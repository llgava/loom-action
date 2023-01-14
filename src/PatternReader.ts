import fs from 'fs';
import YAML from 'yaml';
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
    groups.forEach((file) => {
      const expected = this.getFileEndingFrom(pack, file.group);

      if (!file.name.endsWith(expected)) {
        this.invalid.push({ pack, expected, file });
      }
    });
  }

  // TODO: Add group and pack type.
  public getFileEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile[pack][group];
  }
}
