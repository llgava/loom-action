import fs from 'fs';
import * as patterns from '../patterns';
import { Groups } from '../LoomAction';
import { TerminalColor } from '../types/TerminalColor';
import { AbstractPatternReader } from './AbstractPatternReader';

export type Patterns = 'mojang' | 'custom';

export class NamePatterns extends AbstractPatternReader {
  constructor(pattern: Patterns | string) {
    super(patterns[pattern]);
  }

  public testNamePattern(groups: Groups[]) {
    if (groups.length == 0) return;

    groups.forEach((file) => {
      this.numberOfFiles++;

      if (!file.name.endsWith('.json')) return;

      const patternType = this.getPatternType(file.group);
      const expected = this.getExpectedNamePatternFrom(patternType);

      if (expected === undefined) return;

      const rawData = fs.readFileSync(file.path, 'utf-8');
      const data = JSON.parse(rawData);

      console.log(file.name, file.group, expected);
    });
  }

  private getPatternType(group: string): string {
    // TODO: Change to a outside object.
    const patternTypes = {
      identifiers: ['blocks', 'entity', 'entities', 'items', 'particles'],
      animation_controllers: ['animation_controllers'],
      animations: ['animations'],
      geometries: ['models']
    };

    for (const type in patternTypes) {
      if (patternTypes[type].includes(group)) {
        return type;
      }
    }

    return 'undefined';
  }

  public result(): void {
    throw new Error('Method not implemented (yet).');
  }
}
