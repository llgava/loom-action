import core from '@actions/core';

export class LoomAction {
  private static pattern: string = core.getInput('pattern');

  public static run(): void {
    console.log('Hello world');
  }
}
