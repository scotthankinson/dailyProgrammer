"use strict";
// tslint:disable

const start_feb_20 = (): void => {
    solve_feb_20(`15674
    7026425611433322325`);

    solve_feb_20(`187621
    237860461
    2187521
    18752`);
};

module.exports = {
    start_feb_20
};
const solve_feb_20 = (input: string) => {
    console.log(input);
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    console.log(parseInt(input));
    // TODO: fails for parseInt on large integers because javascript
    const inputs: number[] = input.split("\n").map(value => parseInt(value.trim(), 10));
    console.log(inputs);
    inputs.forEach(value => console.log(encodeBase62(value, alphabet)));
}

const encodeBase62 = (input: number, alphabet: string[]) => {
    let output = "";
    while (input > 0) {
        const digit = input % 62;
        output = output + alphabet[digit];
        input = Math.trunc(input / 62);
    }
    return output;
}

start_feb_20();