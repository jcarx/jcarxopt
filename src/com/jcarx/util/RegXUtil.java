/*
 * 2021 Ravi Manthena.
 * https://www.jcarx.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.jcarx.util;

import java.util.regex.*;

public class RegXUtil {

    public static void regTest(String str) {
        System.out.println("split: " + str.split("\\.", 0)[0]);
        System.out.println("split: " + str.split("\\.", 0)[1]);
        System.out.println("split: " + str.split("\\.", 0)[0] + ".json");
    }

    public static void getextension(String filename) {
       /* 
        \\.        #match a literal dot
        [^.]+      # match 1 or more of any character but dot
        (\\.[^.]+) # capture above test in group #1
        $          # anchor to match end of input
        */
       System.out.println("split: " + filename.split("(\\\\.[^.]+)$", 1)[0]);
    }

    public static void main(String[] args) {
        //RegXUtil.regTest("sfsdfsf.com");
        RegXUtil.getextension("sfsdfsf.jsp");
    }
}
