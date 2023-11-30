/**
 * @copyrightCopyright (c) 2023 Christian Silfang
 */

import { readFileSync, writeFileSync } from "fs";
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
      const packageJSONPath = "package.json"; // Pfad zur package.json-Datei
      const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf-8"));

      // if (packageJSON.hasOwnProperty("scripts")) {
      //   delete packageJSON.scripts; // Entferne die gesamte "scripts"-Sektion
      // }

      // Schreibe die aktualisierte package.json zurück
      writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
    },
  };
}
