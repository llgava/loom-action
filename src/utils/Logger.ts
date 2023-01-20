import * as core from '@actions/core';

export enum LoggerColor {
  RESET = '\u001b[0m',
  BOLD = '\u001b[1m',

  DEFAULT = '\u001b[0m',
  ERROR = '\u001b[91m',
  SUCCESS = '\u001b[92m',
  WARNING = '\u001b[33m',
  INFO = '\u001b[94m',
}

type MessageLevel = |
  'default' |
  'error' |
  'success' |
  'warning' |
  'info';

interface ContentPrefix {
  level?: MessageLevel | any;
  value: string;
}

interface Content {
  level?: MessageLevel | any;
  prefix?: ContentPrefix;
  message: string | RegExp;
  setFailed?: boolean;
}

export class Logger {

  public static sendMessage(...contents: Array<Content>): void {
    for (const content in contents) {
      const level = contents[content]?.level;
      const prefix = contents[content].prefix;
      const setFailed = contents[content]?.setFailed;

      const messageColor = level ? LoggerColor[level.toUpperCase()] : LoggerColor.DEFAULT;
      let message = messageColor + contents[content].message;

      if (setFailed) {
        core.setFailed(message + LoggerColor.RESET);
        core.ExitCode.Failure;
        return;
      }

      if (prefix) {
        const prefixColor = prefix.level ? LoggerColor[prefix?.level.toUpperCase()] : LoggerColor.DEFAULT;
        const parsedPrefix = prefixColor + prefix.value + LoggerColor.RESET;
        message = parsedPrefix + ' ' + message;
      }

      core.info(message + LoggerColor.RESET);
    }
  }
}
