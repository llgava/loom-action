import core from '@actions/core';
import { PatternReader } from './PatternReader';

export class LoomAction {
  public static pattern: string = core.getInput('pattern');
  public static bpPath: string = core.getInput('behavior_pack_path');
  public static rpPath: string = core.getInput('resource_pack_path');

  public static reader: PatternReader = new PatternReader(this.pattern);

  public static run(): void {
    console.log('Hello world');
  }
}
