import * as patterns from '../patterns';
import { Groups } from '../LoomAction';
import { AbstractPatternReader } from './AbstractPatternReader';
import { Logger } from '../utils/Logger';

export type Patterns = 'mojang' | 'custom';

export class FileNameConvention extends AbstractPatternReader {
  constructor(pattern: Patterns | string) {
    super(patterns[pattern]);
  }

  public testFilesNameConvention(pack: string, groups: Groups[]) {
    if (groups.length == 0) return;

    if (!this.silent) {
      Logger.sendMessage(
        { message: `Verifying ${pack} files ending...`}
      )
    }

    groups.forEach((file) => {
      this.numberOfFiles++;
      const expected = this.getExpectedFileNameEndingFrom(pack, file.group);

      if (expected === undefined) return;

      if (!file.name.endsWith(expected)) {
        this.invalidFiles.push({ pack, expected, file });
        return;
      }
    });
  }

  public result() {
    const fails = this.invalidFiles.length;
    const total = this.numberOfFiles;

    if (fails > 0) {
      Logger.sendMessage(
        { message: '' },
        { message: `${fails} of ${total} files has invalid endings.`, setFailed: true }
      )

      this.invalidFiles.forEach((invalidFile) => {
        Logger.sendMessage(
          { prefix: { level: 'warning', value: '  ⚬'}, message: invalidFile.file.name },
          { prefix: { value: '    Expected:' }, level: 'success', message: invalidFile.expected },
          { message: '' }
        )
      });
    }
  }
}
