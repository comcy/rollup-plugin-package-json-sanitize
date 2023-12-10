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
  propertyName: Property;
  value?: string;
}

type CliParameter = Parameter &
  Configuration &
  Required<Pick<Configuration, "value">>;

const OPERATION = {
  remove: "Remove",
  add: "Add",
} as const;

const PROPERTY = {
  scripts: "scripts",
  devDependencies: "devDependencies",
} as const;

type Property = keyof typeof PROPERTY;
type Operation = keyof typeof OPERATION;

export { Operation, Property, CliParameter };
