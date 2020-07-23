"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDartExtension = exports.toPascalCase = exports.capitalizeFirstLetter = void 0;
function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
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
//# sourceMappingURL=string_functions.js.map