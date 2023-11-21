/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */

import { Plugin, OutputBundle } from 'rollup';
import { readFileSync, writeFileSync } from 'fs';

class PackageCleanPlugin implements Plugin {
  name: string;

  constructor(name = 'package-clean') {
    this.name = name;
  }

  generateBundle(_: any, bundle: OutputBundle) {
  
    console.log('HELLO PLUGIN');
  
    // const packageJSONPath = 'package.json'; // Pfad zur package.json-Datei
    // const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf-8'));

    // if (packageJSON.hasOwnProperty('scripts')) {
    //   delete packageJSON.scripts; // Entferne die gesamte "scripts"-Sektion
    // }

    // // Schreibe die aktualisierte package.json zurück
    // writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  }
}

export default PackageCleanPlugin;
