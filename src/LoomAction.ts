import core from '@actions/core';
import { PatternReader } from './PatternReader';
import { BehaviorPack } from './types/BehaviorPack';
import { Pack } from './types/Pack';

export class LoomAction {
  public static pattern: string = 'mojang' /* core.getInput('pattern') */;
  public static bpPath: string = './behavior_packs/0' /* core.getInput('behavior_pack_path') */;
  public static rpPath: string = './resource_packs/0' /* core.getInput('resource_pack_path') */;

  public static reader: PatternReader = new PatternReader(this.pattern);

  public static run(): void {
    console.clear();
    this.reader.getFileEndingFrom(Pack.BEHAVIOR_PACK, BehaviorPack.ANIMATION_CONTROLLERS);
    console.log('Hello world');
  }
}
