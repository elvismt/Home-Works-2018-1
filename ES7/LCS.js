// -*- JavaScript -*-
// Copyright 2018 Elvis M. Teixeira <elvismtt@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

let arr = require('./array');


let LCS = (X, Y) => {
    let m = X.shape[0];
    let n = Y.shape[0];
    let A = arr.zeros(m+1, n+1);
    let T = arr.zeros(m+1, n+1);

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            // interesting A indices are [1..m+1], [1..n+1]
            let ai = i+1;
            let aj = j+1;

            // PROPERTY 1: If the current characters are equal,
            //             then the LCS has the size of that
            //             without these chars plus one
            if (X[i] === Y[j]) {
                A[ai][aj] = A[ai-1][aj-1] + 1;
                T[ai][aj] = '↖';
            }
            // PROPERTY 2: If the current characters are different
            //             then the LCS has the length of the
            //             maximum subsequence adding one of the chars
            else if (A[ai-1][aj] > A[ai][aj-1]) {
                A[ai][aj] = A[ai-1][aj];
                T[ai][aj] = '↑';
            } else {
                A[ai][aj] = A[ai][aj-1];
                T[ai][aj] = '←';
            }
        }
    }

    return { dists: A, track: T };
};


function print_LCS(track, X, i, j) {
    // from Cormen
    if (i == 0 || j == 0) {
        return;
    }
    if (track[i][j] == '↖') {
        print_LCS(track, X, i-1, j-1);
        console.log(X[i-1]);
    } else if (track[i][j] == '↑') {
        print_LCS(track, X, i-1, j);
    } else {
        print_LCS(track, X, i, j-1);
    }
}


let X = arr.str('AGGTAB');
let Y = arr.str('GXTXAYB');
let lcs = LCS(X, Y);
console.log('Lengths:');
arr.print(lcs.dists);

console.log('Track:');
arr.print(lcs.track);

print_LCS(lcs.track, X, lcs.track.shape[0]-1, lcs.track.shape[1]-1);
