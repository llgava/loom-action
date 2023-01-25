import fs from 'fs';
import minimatch from 'minimatch';
import * as patterns from '../patterns';
import { JSONPath } from 'jsonpath-plus';
import { Groups } from '../LoomAction';
import { AbstractPatternReader } from './AbstractPatternReader';
import { GroupsJSONPaths } from '../@types/GroupsJSONPaths';
import { Logger } from '../utils/Logger';

export type Patterns = 'mojang' | 'custom';

export class NamePatterns extends AbstractPatternReader {
  protected ignorePatterns: string[] = this.parsedFile['name-patterns']['ignore'];

  constructor(pattern: Patterns | string) {
    super(patterns[pattern]);
  }

  public testNamePattern(groups: Groups[]) {
    if (groups.length == 0) return;

    if (!this.silent) {
      Logger.sendMessage(
        { message: `Verifying name patterns...` }
      );
    }

    groups.forEach((file) => {
      this.numberOfFiles++;

      if (!file.name.endsWith('.json')) return;

      this.ignorePatterns.forEach((value) => {
        if (minimatch(file.path, value)) {
          this.ignoredFiles.push(file);
        }
      });

      if (this.ignoredFiles.includes(file)) return;

      const jsonPath = GroupsJSONPaths[file.group];
      const patternType = this.getPatternType(file.group);
      const expectedPattern = this.getExpectedNamePatternFrom(patternType);

      if (!jsonPath || !expectedPattern) return;

      const rawData = fs.readFileSync(file.path, 'utf-8');
      const data = JSON.parse(rawData);

      const results: any[] = JSONPath({ path: jsonPath, json: data });
      let isValidPattern: boolean;

      for (const result in results) {
        isValidPattern = expectedPattern.test(results[result]);

        if (!isValidPattern) {
          this.invalidFiles.push({
            expected: expectedPattern,
            file: file
          });

          return;
        }
      }
    });
  }

  private getPatternType(group: string): string {
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
    const fails = this.invalidFiles.length;
    const total = this.numberOfFiles;

    if (fails > 0) {
      Logger.sendMessage(
        { message: '' },
        { message: `${fails} of ${total} files has invalid name patterns.`, setFailed: true }
      );

      this.invalidFiles.forEach((invalidFile) => {
        Logger.sendMessage(
          { prefix: { level: 'warning', value: '  ⚬' }, message: invalidFile.file.name },
          { prefix: { value: '    Expected:' }, level: 'success', message: invalidFile.expected },
          { message: '' }
        );
      });
    }
  }
}
