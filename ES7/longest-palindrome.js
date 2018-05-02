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


function longestPalindrome(S) {
    const n = S.length;
    let M = arr.zeros(n, n);
    let bounds = {};

    // All one-character strings are a 1-palindrome
    for (let i = 0; i < n; ++i) {
        M[i][i] = 1;
    }

    for (let l = 2; l <= n; ++l) {
        for (let i = 0; i < (n - l + 1); ++i) {
            let j = i + l - 1;
            
            // A two-character string with two identical chars is a 2-palindrome
            if (S[i] == S[j] && l == 2) {
                M[i][j] = 2;
            }
            // If chars at [i] and [j], the length of the palindrome increases by 2
            // in relation to that of the same string without the ends
            else if (S[i] == S[j]) {
                M[i][j] = M[i+1][j-1] + 2;
                bounds.start = i;
                bounds.end = j;
            }
            // else, it is Math.max(M[i+1][j] , M[i][j-1])
            else if (M[i+1][j] > M[i][j-1]) {
                M[i][j] = M[i+1][j];
            }
            else {
                M[i][j] = M[i][j-1];
            }
        }
    }

    return { M, bounds };
}


res = longestPalindrome('BABCBAB');
arr.print(res.M);
console.log(res.bounds);
