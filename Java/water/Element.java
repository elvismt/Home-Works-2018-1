// -*- Java -*-
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

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Element implements Runnable {
    private char type;
    private Semaphore mutex;
    private Semaphore Hwait;
    private Semaphore Owait;
    private AtomicInteger Hcount;
    private AtomicInteger H2Ocount;

    Element(char type, Semaphore mutex, Semaphore Hwait, Semaphore Owait,
            AtomicInteger Hcount, AtomicInteger H2Ocount) {
        this.type = type;
        this.mutex = mutex;
        this.Hwait = Hwait;
        this.Owait = Owait;
        this.Hcount = Hcount;
        this.H2Ocount = H2Ocount;
    }

    @Override
    public void run() {
        try {
            // Código executado por átomos de hidrogênio
            if (this.type == 'H') {
                mutex.acquire(1);
                Hcount.incrementAndGet();
                if (Hcount.get() % 2 == 1) {
                    mutex.release(1);
                    Hwait.acquire(1);
                } else {
                    Owait.release(1);
                    Hwait.acquire(1);
                    mutex.release(1);
                }
            }
            // Código executado por átomos de oxigênio
            else {
                Owait.acquire(1);
                Hwait.release(2);
                H2Ocount.incrementAndGet();
            }
        } catch (Exception exc) {
            System.out.println(exc);
        }
    }
}

