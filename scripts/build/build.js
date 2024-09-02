"use strict";
// This script is used to prepare the build directory of the icon set.
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
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const constants_1 = require("./constants");
const generate_2023_auto_theme_1 = require("./generators/generate-2023-auto-theme");
const build_theme_1 = require("./utils/build-theme");
// Here is the mapping of the source theme directory to the build theme directory.
//
// assets/v1/theme-dark.json -> build/themes/v1/dark/theme-dark.json
// assets/2023/theme-light.json -> build/themes/2023/light/theme-light.json
// assets/2023/theme-dark.json -> build/themes/2023/dark/theme-dark.json
// [GENERATED] -> build/themes/2023/auto/theme-auto.json
// STEP 1: Remove existing build directory.
if (fs.existsSync(constants_1.BUILD_DIR_PATH)) {
    fs.rmSync(constants_1.BUILD_DIR_PATH, { recursive: true });
}
// STEP 2: Create build directory.
fs.mkdirSync(constants_1.BUILD_DIR_PATH, { recursive: true });
// STEP 3: Build themes.
(0, build_theme_1.buildTheme)(path.join(constants_1.SRC_DIR_PATH, "v1", "theme-dark.json"), path.join(constants_1.BUILD_DIR_PATH, "v1", "dark"));
(0, build_theme_1.buildTheme)(path.join(constants_1.SRC_DIR_PATH, "2023", "theme-light.json"), path.join(constants_1.BUILD_DIR_PATH, "2023", "light"));
(0, build_theme_1.buildTheme)(path.join(constants_1.SRC_DIR_PATH, "2023", "theme-dark.json"), path.join(constants_1.BUILD_DIR_PATH, "2023", "dark"));
// STEP 4: Generate 2023 auto theme.
(0, generate_2023_auto_theme_1.generate2023AutoTheme)(path.join(constants_1.SRC_DIR_PATH, '2023', 'theme-light.json'), path.join(constants_1.SRC_DIR_PATH, '2023', 'theme-dark.json'), path.join(constants_1.BUILD_DIR_PATH, '2023', 'auto'));
