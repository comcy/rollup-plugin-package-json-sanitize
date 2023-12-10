/**
 * @copyrightCopyright (c) 2023 Christian Silfang
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { OutputBundle, Plugin } from "rollup";
import { CliParameter } from "./cli";

export default function cleanPackageJSON(parameters: CliParameter): Plugin {
  if (!parameters) {
    console.log("No parameters given");
    throw new Error("No parameters given");
  }
  console.log("Parameters: ", parameters);

  return {
    name: "cleanPackageJson",

    generateBundle(_: any, bundle: OutputBundle) {
      const targetDirectory = parameters.targetDirectory; // Pfad zur package.json-Datei
      const srcPackageJSONPath = parameters.sourceFilePath; // Pfad zur package.json-Datei
      const targetPackageJSONPath = parameters.targetFileName; // Pfad zur package.json-Datei
      const packageJSON = JSON.parse(readFileSync(srcPackageJSONPath, "utf-8"));

      console.log("packageJSON >>> : ", packageJSON);

      if (parameters.config.length > 0) {
        parameters.config.forEach((config) => {
          switch (config.operation) {
            case "remove":
              console.log(" --------- DELETE -------- ");
              delete packageJSON[config.propertyName];
              break;
            case "add":
              packageJSON[config.propertyName] = config.value;
              break;
            default:
              break;
          }
        });
      }

      // if (packageJSON.hasOwnProperty("scripts")) {
      //   delete packageJSON.scripts; // Entferne die gesamte "scripts"-Sektion
      // }

      // Schreibe die aktualisierte package.json zurück
      console.log("packageJSON >>> : ", packageJSON);

      if (!existsSync(targetPackageJSONPath)) {
        mkdirSync(targetDirectory);

        writeFileSync(
          targetPackageJSONPath,
          JSON.stringify(packageJSON, null, 2)
        );
      }
    },
  };
}
