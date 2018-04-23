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

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Esta é uma implementação da solução o problema da
 * criação concorrente de moléculas de água do livro
 * "Little Book of Semaphores" de Allen B. Downey.
 */
public class Main {
    
    public static void main(String[] args) {
        List<Thread> threads = new ArrayList<Thread>();
        Semaphore Hsemaphore = new Semaphore(0);
        Semaphore Osemaphore = new Semaphore(0);
        AtomicInteger moleculeCount = new AtomicInteger(0);

        for (int i = 0; i < 300; ++i) {
            Element element = new Element((i % 3) == 0 ? 'O' : 'H',
                                          Hsemaphore, Osemaphore, moleculeCount);
            Thread thread = new Thread(element);
            thread.setName("Thread " + String.valueOf(i));
            thread.start();
            threads.add(thread);
        }
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (Exception ex) {
                System.out.println("Error on join()");
            }
        }
    }
}
