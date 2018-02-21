"use strict";
// tslint:disable
import { BigNumber } from 'bignumber.js';

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
    const inputs: BigNumber[] = input.split("\n").map(value => new BigNumber(value.trim(), 10));
    // console.log(inputs);
    inputs.forEach(value => console.log(encodeBase62(value, alphabet)));
}

const encodeBase62 = (input: BigNumber, alphabet: string[]) => {
    let output = "";
    while (input.comparedTo(0) > 0) {
        const digit = input.modulo(62);
        output = output + alphabet[digit.toNumber()];
        input = input.dividedToIntegerBy(62);
    }
    return output;
}

start_feb_20();