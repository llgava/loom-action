import fs from 'fs';
import YAML from 'yaml';
import * as patterns from './patterns';
import { BehaviorPack } from './types/BehaviorPack';
import { ResourcePack } from './types/ResourcePack';
import { Pack } from './types/Pack';

export type Patterns = 'mojang' | 'custom';

export class PatternReader {
  private path: string;

  constructor(pattern: Patterns | string) {
    this.path = patterns[pattern];
  }

  public getFileEndingFrom(pack: Pack, config: BehaviorPack | ResourcePack): void {
    const file = fs.readFileSync(this.path, 'utf-8');
    const parsedFile = YAML.parse(file);

    console.log(parsedFile[pack][config]);
  }
}
