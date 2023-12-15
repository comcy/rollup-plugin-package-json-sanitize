/**
 * @copyrightCopyright (c) 2023 Christian Silfang
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { OutputBundle, Plugin } from "rollup";
import { CliParameter } from "./cli";

export default function cleanPackageJSON(parameters: CliParameter): Plugin {
  if (!parameters) {
    // console.log("No parameters given");
    throw new Error("No parameters given");
  }
  // console.log("Parameters: ", parameters);

  return {
    name: "cleanPackageJson",

    generateBundle(_: any, bundle: OutputBundle) {
      const srcPackageJSONPath = parameters.sourceFilePath; 
      const targetDirectory = parameters.targetDirectory;    
      const targetPackageJSONPath = parameters.targetFileName; 
      const packageJSON = JSON.parse(readFileSync(srcPackageJSONPath, "utf-8"));

      // console.log("packageJSON >>> : ", packageJSON);

      if (parameters.config.length > 0) {
        parameters.config.forEach((config) => {
          console.log('CONFIG >>> : ', config);
          switch (config.operation) {
            case "remove":
              console.log(" --------- DELETE -------- ");
              console.log(" property to remove: ", config.propertyName);
              delete packageJSON[config.propertyName];
              writePackageJSON(packageJSON, targetDirectory, targetPackageJSONPath);
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

      // console.log("packageJSON >>> : ", packageJSON);

      // if (!existsSync(targetPackageJSONPath)) {
      //   mkdirSync(targetDirectory);

      //   writeFileSync(
      //     `${targetDirectory}/${targetPackageJSONPath}`,
      //     JSON.stringify(packageJSON, null, 2)
      //   );
      // }
    },
  };
}

function writePackageJSON(packageJSON: any, targetDirectoryPath: string, targetPackageJSONPath: string) {

  console.log('PACKAGE JSON >>> : ', packageJSON);
  const filePath = `${targetDirectoryPath}/${targetPackageJSONPath}`

  console.log('FILEPATH >>> : ', filePath);

  if (!existsSync(targetDirectoryPath)) {
    mkdirSync(targetDirectoryPath);

    writeFileSync(
      filePath,
      JSON.stringify(packageJSON, null, 2)
    );
  } else {
    writeFileSync(
      filePath,
      JSON.stringify(packageJSON, null, 2)
    );
  }
  // writeFileSync(filePath, JSON.stringify(packageJSON, null, 2));
}
