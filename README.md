# rollup-plugin-package-json-sanitize

This is a rollup plugin to clean several sections from a package.json during build process before publishing it.

**Content**

## Table of Contents

- [rollup-plugin-package-json-sanitize](#rollup-plugin-package-json-sanitize)
  - [Usage](#usage)
    - [Parameters](#parameters)
      - [Optional](#optional)
      - [Required](#required)
    - [Cleanup configuration](#cleanup-configuration)
    - [Example configuration](#example-configuration)
  - [Development](#development)
    - [Build](#build)

## Usage

### Parameters

| Name              | Required | Type   | Default          | Description                                                |
| :---------------- | :------- | ------ | :--------------- | :--------------------------------------------------------- |
| `sourceFilePath`  | false    | string | `./package.json` | The `package.json` which should be sanitized               |
| `targetDirectory` | false    | string | `./dist`         | The destination directory name                             |
| `targetFileName`  | false    | string | `package.json`   | The name of your destination file                          |
| `config`          | true     | Object | -                | The plugin configuration for sanitizing the `package.json` |

#### Supported Configuration

`remove`

- The `remove` operation can be used to remove properties and according values from a `package.json` file. The properties to remove are declared as `string[]` (`Array<string>`)

### Example configuration

The plugin can simply added to your existing `rollup.config.js` configuration file:

```
...
import cleanPackageJson from "rollup-plugin-package-json-sanitize";
...

export default {
  input: "src/index.ts",

    ...

  },
  plugins: [

    ...

    cleanPackageJson({
      sourceFilePath: "./package.json",
      targetDirectory: "./dist",
      targetFileName: "package.json",
      config: [
        {
          operation: "remove",
          propertyNames: ["dependencies", "devDependencies", "scripts"],
        },
      ],
    }),

    ...


  ],
};

```

## Development

### Build

1. Install depencencies

   ```
   npm install
   ```

2. Build the package as prod

   ```
   npm run build

   # npm run build:dev # For debugging purpose

   ```
