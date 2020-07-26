export class EventArgument {
  type: string;
  name: string;

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }

  toString() {
    return this.type + " " + this.name;
  }
}
