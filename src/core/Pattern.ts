import fs from 'fs';
import YAML from 'yaml';
import * as core from '@actions/core';
import { BehaviorPackGroups, ResourcePackGroups } from '../types/Groups';

export class Pattern {
  private path: string;
  public silent: boolean | any = core.getInput('silent') || true;

  constructor(path: string) {
    this.path = path;
  }

  protected getExpectedNamePatternFor(value: string): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile['name-patterns'][value];
  }

  protected getExpectedFileNameEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    return parsedFile['file-name-convention'][pack][group];
  }
}
