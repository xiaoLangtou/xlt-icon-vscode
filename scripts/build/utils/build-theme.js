"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTheme = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const get_icon_paths_1 = require("./get-icon-paths");
function buildTheme(themePath, buildPath) {
    const theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
    const iconPaths = (0, get_icon_paths_1.getIconPaths)(theme, themePath);
    fs.mkdirSync(buildPath, { recursive: true });
    fs.writeFileSync(path.join(buildPath, "theme.json"), JSON.stringify(theme, null, 4));
    iconPaths.forEach((iconPath) => {
        if (!fs.existsSync(iconPath)) {
            console.warn(`Icon does not exist: ${iconPath}`);
            return;
        }
        const buildIconPath = path.join(buildPath, path.relative(path.dirname(themePath), iconPath));
        fs.mkdirSync(path.dirname(buildIconPath), { recursive: true });
        fs.copyFileSync(iconPath, buildIconPath);
    });
}
exports.buildTheme = buildTheme;
