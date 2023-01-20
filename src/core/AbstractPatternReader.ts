import fs from 'fs';
import YAML from 'yaml';
import * as core from '@actions/core';
import { BehaviorPackGroups, ResourcePackGroups } from '../@types/Groups';
import { Groups } from '../LoomAction';

interface InvalidFiles {
  pack?: string;
  expected: string | RegExp;
  file: Groups;
}

export abstract class AbstractPatternReader {
  // GitHub action inputs
  public silent: boolean | any = core.getInput('silent') || false;

  private path: string;
  private parsedFile: any;
  public invalidFiles: InvalidFiles[] = [];
  public numberOfFiles: number = 0;

  constructor(path: string) {
    this.path = path;

    const file = fs.readFileSync(this.path, 'utf-8');
    this.parsedFile = YAML.parse(file);
  }

  protected getExpectedNamePatternFrom(type: string): RegExp {
    return new RegExp(this.parsedFile['name-patterns'][type]);
  }

  protected getExpectedFileNameEndingFrom(pack: string, group: BehaviorPackGroups | ResourcePackGroups): string {
    return this.parsedFile['file-name-convention'][pack][group];
  }

  public abstract result(): void;
}
