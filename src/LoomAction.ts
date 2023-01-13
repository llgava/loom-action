import core from '@actions/core';

export class LoomAction {
  public static pattern: string = core.getInput('pattern');

  public static run(): void {
    console.log(this.pattern);
  }
}
