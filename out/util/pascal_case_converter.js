"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDartExtension = exports.toPascalCase = void 0;
function toPascalCase(string) {
    return `${string}`
        .replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(new RegExp(/\s+(.)(\w+)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(new RegExp(/\s/, "g"), "")
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
exports.toPascalCase = toPascalCase;
function removeDartExtension(filename) {
    return filename.replace(".dart", "");
}
exports.removeDartExtension = removeDartExtension;
//# sourceMappingURL=pascal_case_converter.js.map