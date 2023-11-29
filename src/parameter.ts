/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */

export interface Parameter {
  op: Operation;
  props: Property[];
}

const OPERATION = {
  remove: "Remove",
} as const;

const PROPERTY = {
  scripts: "scripts",
  devDependencies: "devDependencies",
} as const;

type Property = keyof typeof PROPERTY;
type Operation = keyof typeof OPERATION;

export { Operation, Property };
