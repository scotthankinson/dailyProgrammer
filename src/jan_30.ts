"use strict";
// tslint:disable
import * as ts from "typescript";

const start_jan_30 = (): void => {
    console.log(new Date());
    solve_jan_30("3 34312332");
    solve_jan_30("3 912743471352");
    solve_jan_30("3 42137586");
    solve_jan_30("9 2");
    solve_jan_30("4 064876318535318");
    console.log(new Date());

    /*
    2018-02-01T03:58:49.693Z
    
    Dividing 4,3,3,3,3,2,2,1 into 3 piles
    { '0': [ 4, 3 ], '1': [ 3, 3, 1 ], '2': [ 3, 2, 2 ] }
    Dividing 9,7,7,5,4,4,3,3,2,2,1,1 into 3 piles
    { '0': [ 9, 7 ], '1': [ 7, 5, 4 ], '2': [ 4, 3, 3, 2, 2, 1, 1 ] }
    Dividing 8,7,6,5,4,3,2,1 into 3 piles
    { '0': [ 8, 4 ], '1': [ 7, 5 ], '2': [ 6, 3, 2, 1 ] }
    Dividing 2 into 9 piles
    Invalid Input
    Dividing 8,8,8,7,6,6,5,5,4,3,3,3,1,1,0 into 4 piles
    { '0': [ 0, 3, 5, 7, 1, 1 ],
      '1': [ 4, 5, 8 ],
      '2': [ 6, 3, 8 ],
      '3': [ 3, 8, 6 ] }
    2018-02-01T03:58:49.697Z
*/
};

module.exports = {
    start_jan_30
};

const solve_jan_30 = (input: string) => {
    const numberOfStacks = parseInt(input.split(" ")[0], 10);
    const sizes = input.split(" ")[1].split("").map(value => parseInt(value, 10)).sort((a, b) => { return b - a; });
    console.log(`Dividing ${sizes} into ${numberOfStacks} piles`);
    let sum: number = 0;
    sizes.forEach(value => sum = sum + value);
    if (sum % numberOfStacks !== 0) {
        console.log('Invalid Input');
        return;
    }
    // console.log(`Total size: ${sum}, average size: ${sum / numberOfStacks}`);
    const target = sum / numberOfStacks;
    const solution: any = {};
    for (let i = 0; i < numberOfStacks; i++) {
        solution[i] = [];
    }

    let rotate = 0;
    while (sizes.length > 0) {
        // for (let i = sizes.length; i > -1; i--) {
        const oneBox = sizes.shift();
        let stuffed = false;
        for (let i = 0; i < numberOfStacks; i++) {
            if (solution[i].reduce((a, b) => a + b, 0) + oneBox <= target) {
                solution[i].push(oneBox);
                stuffed = true;
                break;
            }
        }
        if (!stuffed) {
            sizes.push(oneBox);
            if (solution[rotate % numberOfStacks].length > 0) {
                sizes.push(solution[rotate % numberOfStacks].shift());
            }
            rotate = rotate + 1;
        }
    }
    console.log(solution);
    console.log();
}

start_jan_30();