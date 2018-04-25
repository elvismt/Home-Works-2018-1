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

const util = require('util');

module.exports.zeros = (ax1, ax2) => {
    if (ax1 && ax2) {
        let array = new Array(ax1);
        for(let i=0; i < ax1; i++) {
            array[i] = new Array(ax2);
            for(let j=0; j < ax2; j++)
                array[i][j] = 0.0;
        }
        array.shape = [ax1, ax2];
        return array;
    } else if (ax1) {
        array = new Array(ax1);
        for(let j=0; j < ax1; j++)
            array[j] = 0.0;
        array.shape = [ax1];
        return array;
    } else {
        throw new Error("zeros(): Invalid array size");
    }
};


module.exports.print = (obj) => {
    console.log(util.inspect(obj, false, null));
}


module.exports.str = (s) => {
    let arr = new Array(s.length);
    for (let i = 0; i < arr.length; ++i)
        arr[i] = s[i];
    arr.shape = [arr.length];
    return arr;
}
