"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventArgument = void 0;
class EventArgument {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
    toString() {
        return this.type + " " + this.name;
    }
}
exports.EventArgument = EventArgument;
//# sourceMappingURL=event_argument.js.map