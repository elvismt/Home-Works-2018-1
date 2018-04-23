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
    private Semaphore Hsemaphore;
    private Semaphore Osemaphore;
    private AtomicInteger moleculeCount;

    Element(char type, Semaphore Hsemaphore, Semaphore Osemaphore, AtomicInteger moleculeCount) {
        this.type = type;
        this.Hsemaphore = Hsemaphore;
        this.Osemaphore = Osemaphore;
        this.moleculeCount = moleculeCount;
    }

    @Override
    public void run() {
        // codigo executable por atomos de hidrogênio
        // observe a mudança na ordem de aquisição e sinalização
        // para evitar um deadlock imediato
        Hsemaphore.release(1);
        if (this.type == 'H') {
            try {
                Osemaphore.acquire(1);
            } catch (InterruptedException exc) {
                System.out.println("InterruptedException on hydrogen");
            }
        }
        // codigo executable por atomos de oxigênio
        else {
            try {
                Hsemaphore.acquire(2);
                System.out.println("Made a water molecule #" + moleculeCount.addAndGet(1));
            } catch (InterruptedException exc) {
                System.out.println("InterruptedException on oxygen");
            }
            Osemaphore.release(2);
        }
    }
}
