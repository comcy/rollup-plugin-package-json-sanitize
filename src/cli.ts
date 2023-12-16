/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */

interface Parameter {
  sourceFilePath: string;
  targetFileName: string;
  targetDirectory: string;
  config: Configuration[];
}

interface Configuration {
  operation: Operation;
  properties: string[];
  value?: string;
}

type CliParameter = Parameter &
  Configuration &
  Required<Pick<Configuration, "value">>;

const OPERATION = {
  remove: "Remove",
  add: "Add", // Currently not supported
} as const;


type Operation = keyof typeof OPERATION;

export { Operation, CliParameter };
