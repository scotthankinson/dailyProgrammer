"use strict";
// tslint:disable

const start = (): void => {
    solve_jan_29("Input: 10 5 5 2 2 1", "Output: n <= 3");
    // Solution:  [5, 5]
    // Smallest result: 2

    solve_jan_29("Input: 8 5 5 3 3 3 2 2 1", "Output: n > 3");
    // Solution:  [3, 3, 2, 1]
    // Smallest result: 4

    solve_jan_29("Input: 150 100 50 50 50 50", "Output: n < 5");
    // Solution: [100, 50], [50, 50, 50]
    // Smallest result: 2

    solve_jan_29("Input: 130 100 20 18 12 5 5", "Output: n < 6");
    // Solution: [100, 20, 5, 5], [100, 18, 12]
    // Smallest result: 3

    solve_jan_29("Input: 200 50 50 20 20 10", "Output: n >= 5");
    // No solutions available

    let giantInput = "Input: 150";
    for (let i = 0; i < 1000; i++) {
        giantInput = giantInput + " 1";
    }
    // solve_jan_29(giantInput, "Output: n === 150");
};

module.exports = {
    start
};

const solve_jan_29 = (line1: string, line2: string) => {

    // Command line parsing instead of method signature
    // const input = process.argv[2].replace("Input: ", "").trim();
    // const output = process.argv[3].replace("Output: ", "").trim();

    // method signature inputs
    const input = line1.replace("Input: ", "").trim();
    const output = line2.replace("Output: ", "").trim();

    const makeChangeFor = parseInt(input.split(" ")[0], 10);
    const coins = input.split(" ").slice(1).map(value => parseInt(value, 10));
    const operator = output.split(" ")[1]; // TODO: build possible sets based on comparator
    const target = parseInt(output.split(" ")[2].trim(), 10);

    console.log(`Making change for ${makeChangeFor} from ${coins} in ${operator} ${target} moves`);

    // Try to only hold the pieces of the powerset we need based on valid # of coins
    let sets = [];
    const depths: any = {};
    for (let i = 1; i <= coins.length; i++) {
        depths[i] = eval(i + " " + operator + " " + target);
    }
    for (let i = 1; i <= coins.length; i++) {
        buildSets(coins.length, sets, i);
        // Discard sets after our range
        if (depths[i] && depths[i + 1] === false)
            break;
        // Discard sets before our range
        if (depths[i] && depths[i - 1] === false) {
            sets = sets.filter(value => value.length >= (i));
        }
        // Discard helper sets while getting to the start of the range
        if (!depths[i - 1] && !depths[i - 2]) {
            sets = sets.filter(value => value.length >= (i - 1));
        }
    }
    // console.log(depths);
    // console.log(sets);
    const all: any = {};
    const winners: any = [];
    sets.forEach(value => {
        if (all[value]) return;
        let sum = 0;
        value.forEach(value => sum = sum + coins[value]);
        all[value] = sum;
        if (sum === makeChangeFor) {
            winners.push(value);
        }
    });

    if (winners.length === 0) {
        console.log("No solutions available");
    } else {
        const winnersConverted: string[] = [];
        let min = coins.length;
        winners.forEach(value => {
            let answer = "";
            value.forEach(selected => {
                answer = answer + " " + coins[selected];
            });
            min = value.length < min ? value.length : min;
            if (winnersConverted.indexOf(answer.trim()) === -1) winnersConverted.push(answer.trim());
        });
        console.log(winnersConverted);
        console.log(`Smallest result: ${min}`);
    }
}

const buildSets = (arrayLength: number, sets: any[], depth: number) => {
    if (depth === 1) {
        for (let i = 0; i < arrayLength; i++) {
            sets.push([i]);
        }
    } else if (depth === arrayLength) {
        let all = [];
        for (let i = 0; i < arrayLength; i++) {
            all.push(i);
        }
        sets.push(all);
    } else {
        const dupes: any = {};
        for (let i = 0; i < arrayLength; i++) {
            for (let j = 0; j < sets.length; j++) {
                if (sets[j].indexOf(i) >= 0) continue;
                if (sets[j].length !== (depth - 1)) continue;
                const value = [i].concat(sets[j]).sort();
                if (dupes[value.toString()]) continue;
                dupes[value.toString()] = true;
                sets.push(value);
            }
        }
    }
    return sets;
}

start();