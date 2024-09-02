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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const child_process_1 = require("child_process");
const label = (_b = (_a = process.argv.slice(2)) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.trim();
function main() {
    core.info(`Selected label: ${label}`);
    switch (label) {
        case 'major':
        case 'minor':
        case 'patch':
            bumpVersion(label);
            break;
        default:
            core.setFailed(`Invalid label: ${label}`);
            return;
    }
}
function bumpVersion(label) {
    try {
        core.info(`Incrementing version with label: ${label}`);
        const output = (0, child_process_1.execSync)(`npm version ${label}`, {
            stdio: 'pipe',
        });
        const newVersion = output.toString().trim();
        core.info(`New version: ${newVersion}`);
        core.setOutput('version', newVersion.replace('v', ''));
    }
    catch (error) {
        core.setFailed(error);
    }
}
main();
