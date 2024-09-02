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
exports.generate2023AutoTheme = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const svg = __importStar(require("svgson"));
function removeExtension(fileName) {
    return path.basename(fileName, path.extname(fileName));
}
function removeSuffix(fileName) {
    return removeExtension(fileName).split("_")[0];
}
function getIconName(fileName) {
    return removeSuffix(removeExtension(fileName));
}
function getIcons(lightTheme, darkTheme) {
    const icons = {};
    const iconDefinitionsEntries = [
        ...Object.entries(lightTheme.iconDefinitions).map(([iconDefinitionKey, iconDefinition]) => [iconDefinitionKey, Object.assign(Object.assign({}, iconDefinition), { theme: "light" })]),
        ...Object.entries(darkTheme.iconDefinitions).map(([iconDefinitionKey, iconDefinition]) => [iconDefinitionKey, Object.assign(Object.assign({}, iconDefinition), { theme: "dark" })]),
    ];
    for (const [iconDefinitionKey, iconDefinition] of iconDefinitionsEntries) {
        if (!fs.existsSync(iconDefinition.iconPath)) {
            continue;
        }
        const iconName = getIconName(path.basename(iconDefinition.iconPath));
        if (!icons[iconDefinitionKey]) {
            icons[iconDefinitionKey] = {
                light: null,
                dark: null,
                iconName,
            };
        }
        const iconSource = fs.readFileSync(iconDefinition.iconPath, {
            encoding: "utf8",
        });
        const iconAst = svg.parseSync(iconSource);
        icons[iconDefinitionKey][iconDefinition.theme] = iconAst;
    }
    return icons;
}
function getAutoIconAst(lightIcon, darkIcon) {
    return {
        name: "svg",
        type: "element",
        value: "",
        attributes: lightIcon.attributes,
        children: [
            ...(darkIcon !== null
                ? [
                    {
                        name: "style",
                        type: "element",
                        value: "",
                        attributes: {},
                        children: [
                            {
                                name: "",
                                type: "text",
                                value: ".dark { display: none; } .light { display: block; } @media (prefers-color-scheme: dark) { .dark { display: block; } .light { display: none; } }",
                                attributes: {},
                                children: [],
                            },
                        ],
                    },
                ]
                : []),
            {
                name: "g",
                type: "element",
                value: "",
                attributes: {
                    class: "light",
                },
                children: lightIcon.children,
            },
            ...(darkIcon !== null
                ? [
                    {
                        name: "g",
                        type: "element",
                        value: "",
                        attributes: {
                            class: "dark",
                        },
                        children: darkIcon.children,
                    },
                ]
                : []),
        ],
    };
}
function buildAutoIcons(lightTheme, darkTheme, buildDirPath) {
    const icons = getIcons(lightTheme, darkTheme);
    const iconDefinitions = {};
    fs.mkdirSync(path.join(buildDirPath, "icons"), { recursive: true });
    for (const iconDefinitionKey in icons) {
        const icon = icons[iconDefinitionKey];
        const autoIcon = getAutoIconAst(icon.light, icon.dark);
        const iconRelativePath = `./icons/${icon.iconName}_auto.svg`;
        fs.writeFileSync(path.join(buildDirPath, iconRelativePath), svg.stringify(autoIcon));
        iconDefinitions[iconDefinitionKey] = {
            iconPath: iconRelativePath,
        };
    }
    return iconDefinitions;
}
function fixIconPaths(theme, themePath) {
    for (const iconDefinitionKey in theme.iconDefinitions) {
        const iconDefinition = theme.iconDefinitions[iconDefinitionKey];
        iconDefinition.iconPath = path.join(path.dirname(themePath), iconDefinition.iconPath);
    }
    return theme;
}
function generate2023AutoTheme(lightThemePath, darkThemePath, buildDirPath) {
    const lightTheme = fixIconPaths(JSON.parse(fs.readFileSync(lightThemePath, { encoding: "utf8" })), lightThemePath);
    const darkTheme = fixIconPaths(JSON.parse(fs.readFileSync(darkThemePath, { encoding: "utf8" })), darkThemePath);
    const autoTheme = {
        iconDefinitions: buildAutoIcons(lightTheme, darkTheme, buildDirPath),
        file: lightTheme.file,
        folder: lightTheme.folder,
        folderNames: Object.assign(Object.assign({}, lightTheme.folderNames), darkTheme.folderNames),
        fileNames: Object.assign(Object.assign({}, lightTheme.fileNames), darkTheme.fileNames),
        fileExtensions: Object.assign(Object.assign({}, lightTheme.fileExtensions), darkTheme.fileExtensions),
    };
    fs.mkdirSync(path.dirname(buildDirPath), { recursive: true });
    fs.writeFileSync(path.join(buildDirPath, "theme.json"), JSON.stringify(autoTheme, null, 4));
}
exports.generate2023AutoTheme = generate2023AutoTheme;
