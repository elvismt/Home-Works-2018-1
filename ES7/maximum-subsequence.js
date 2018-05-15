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

"use-strict";
let arr = require('./array');

function maxSubseq(sequence) {
    const n = sequence.length;
    let maxSoFar = 0.0;
    let maxEndingHere = 0.0;
    let start = 0, end = 0;
    
    for (let i = 0; i < n; ++i) {
        
        // Remembers the sum of the current subsequence
        // ensing in this position
        maxEndingHere += sequence[i];

        // If the sum ending here is greater than the
        // recorded maxium, update the maximum
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            end = i;
        }

        // If the becomes negative we should start the search
        // again from this position
        if (maxEndingHere < 0.0) {
            maxEndingHere = 0.0;
            start = i + 1;
        }
    }

    return { maxSum: maxSoFar, start, end };
}

console.log(maxSubseq([-2, -3, 4, -1, -2, 1, 5, -3]))
