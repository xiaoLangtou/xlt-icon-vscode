import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    const rootPath = workspaceFolders[0].uri.fsPath;
    const angularConfigPath = path.join(rootPath, "angular.json");
    const nestConfigPath1 = path.join(rootPath, "nest-cli.json");
    const nestConfigPath2 = path.join(rootPath, ".nest-cli.json");
    const nestConfigPath3 = path.join(rootPath, "nestconfig.json");
    const nestConfigPath4 = path.join(rootPath, ".nestconfig.json");

    if (fs.existsSync(angularConfigPath)) {
      updateIconPath('angular');
    } else if (
      fs.existsSync(nestConfigPath1) ||
      fs.existsSync(nestConfigPath2) ||
      fs.existsSync(nestConfigPath3) ||
      fs.existsSync(nestConfigPath4)
    ) {
      updateIconPath('nestjs');
    }
  }
}

export function deactivate() {}


function getFileExtensions(type: 'angular' | 'nestjs') {
  if (type === 'angular') {
    return {
      'controller.ts': 'file_angularcontroller',
      'controller.spec.ts': 'file_angularcontrollertest',
      'controller.js': 'file_angularcontroller',
      'controller.spec.js': 'file_angularcontrollertest',
      'guard.ts': 'file_angularguard',
      'guard.js': 'file_angularguard',
      'module.js': 'file_angularmodule',
      'module.ts': 'file_angularmodule',
      'service.js': 'file_angularservice',
      'service.spec.js': 'file_angularservicetest',
      'service.ts': 'file_angularservice',
      'service.spec.ts': 'file_angularservicetest',
      'pipe.ts': 'file_angularpipe',
      'pipe.js': 'file_angularpipe'
    };
  } else {
    return {
      'controller.ts': 'file_nestcontroller',
      'controller.spec.ts': 'file_nestcontrollertest',
      'controller.js': 'file_nestcontroller',
      'controller.spec.js': 'file_nestcontrollertest',
      'guard.ts': 'file_nestguard',
      'guard.js': 'file_nestguard',
      'module.js': 'file_nestmodule',
      'module.ts': 'file_nestmodule',
      'service.js': 'file_nestservice',
      'service.spec.js': 'file_nestservicetest',
      'service.ts': 'file_nestservice',
      'service.spec.ts': 'file_nestservicetest',
      'pipe.ts': 'file_nestpipe',
      'pipe.js': 'file_nestpipe'
    };
  }
}

function updateIconPath(type: 'angular' | 'nestjs') {
  const themes = ['dark', 'light', 'auto'];
  const fileExtensions = getFileExtensions(type);

  themes.forEach(theme => {
    const configPath = path.join(__dirname, '..', `dist/2023/${theme}`, 'theme.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    if (config.fileExtensions) {
      Object.keys(fileExtensions).forEach(extension => {
        config.fileExtensions[extension] = fileExtensions[extension];
      });
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  });
}
