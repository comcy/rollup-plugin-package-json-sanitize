import { Plugin } from "rollup";
import { readFileSync, writeFileSync } from "fs";

class RemoveScriptsFromPackageJSON implements Plugin {
  name = "modifyPackageJSON";

  generateBundle(_: unknown, bundle: unknown) {
    const packageJSONPath = "package.json"; // Pfad zur package.json-Datei
    const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf-8"));

    // if (packageJSON.hasOwnProperty("scripts")) {
    //   delete packageJSON.scripts; // Entferne die gesamte "scripts"-Sektion
    // }

    // Schreibe die aktualisierte package.json zurück
    writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  }
}

export default () => new RemoveScriptsFromPackageJSON();
