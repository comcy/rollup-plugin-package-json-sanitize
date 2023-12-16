/**
 * @copyrightCopyright (c) 2023 Christian Silfang
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { OutputBundle, Plugin } from "rollup";
import { CliParameter } from "./cli";

const BANNER =`
█▀ ▄▀█ █▄░█ █ ▀█▀ █ ▀█ █▀▀ █▀█ █▄▀ █▀▀ ░░█ █▀ █▀█ █▄░█
▄█ █▀█ █░▀█ █ ░█░ █ █▄ ██▄ █▀▀ █░█ █▄█ █▄█ ▄█ █▄█ █░▀█`;

export default function sanitizePackageJSON(parameters: CliParameter): Plugin {

  console.log(BANNER)

  if (!parameters) {
    throw new Error("No parameters given");
  }

  return {
    name: "sanitizePkgJson",

    generateBundle(_: any, bundle: OutputBundle) {
      const srcPackageJSONPath = parameters.sourceFilePath ?? './package.json';
      const targetDirectory = parameters.targetDirectory ?? './dist';
      const targetPackageJSONPath = parameters.targetFileName ?? 'package.json';
      const packageJSON = JSON.parse(readFileSync(srcPackageJSONPath, "utf-8"));

      if (parameters.config.length > 0) {
        parameters.config.forEach((config) => {
          switch (config.operation) {
            case "remove":

              config.properties.forEach((prop) => {
                delete packageJSON[prop];
              });
              writePackageJSON(
                packageJSON,
                targetDirectory,
                targetPackageJSONPath
              );
              break;

            default:
              break;
          }
        });
      }
    },
  };
}

function writePackageJSON(
  packageJSON: any,
  targetDirectoryPath: string,
  targetPackageJSONPath: string
) {
  const filePath = `${targetDirectoryPath}/${targetPackageJSONPath}`;

  if (!existsSync(targetDirectoryPath)) {
    mkdirSync(targetDirectoryPath);
  }

  writeFileSync(filePath, JSON.stringify(packageJSON, null, 2));
}
