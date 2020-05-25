export class Pokemon {
    constructor(public name?: string, public front_default?: string, public type1?: string, public type2?: string, public number?: number) {
        this.name = name;
        this.front_default = front_default;
        this.type1 = type1;
        this.type2 = type2;
        this.number = number;
    }
}