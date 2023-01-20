import fs from 'fs';
import * as core from '@actions/core';
import * as patterns from '../patterns';
import { JSONPath } from 'jsonpath-plus';
import { Groups } from '../LoomAction';
import { TerminalColor } from '../types/TerminalColor';
import { AbstractPatternReader } from './AbstractPatternReader';
import { GroupsJSONPaths } from '../types/GroupsJSONPaths';

export type Patterns = 'mojang' | 'custom';

export class NamePatterns extends AbstractPatternReader {
  constructor(pattern: Patterns | string) {
    super(patterns[pattern]);
  }

  public testNamePattern(groups: Groups[]) {
    if (groups.length == 0) return;

    if (!this.silent) {
      core.info('');
      core.info(TerminalColor.BOLD + 'Verifying name patterns');
    }

    groups.forEach((file) => {
      this.numberOfFiles++;

      if (!file.name.endsWith('.json')) return;

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

          if (!this.silent) {
            core.info(
              TerminalColor.BRIGHT_RED + '✖ ' +
              TerminalColor.RESET + file.name +
              TerminalColor.YELLOW + ` (${results[result]})` +
              TerminalColor.RESET
            );
          }

          return;
        }

        if (!this.silent) {
          core.info(
            TerminalColor.BRIGHT_GREEN + '✔ ' +
            TerminalColor.RESET + file.name +
            TerminalColor.YELLOW + ` (${results[result]})` +
            TerminalColor.RESET
          );
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
      core.info('');
      core.warning(`${fails} of ${total} files has invalid name patterns.`);

      this.invalidFiles.forEach((invalidFile) => {
        core.info(TerminalColor.YELLOW + `  ⚬ ` + TerminalColor.RESET + invalidFile.file.name);
        core.info(`    Expected: ` + TerminalColor.GREEN + invalidFile.expected + TerminalColor.RESET);
        core.info('');
      });

      //core.ExitCode.Failure;
    }
  }
}
