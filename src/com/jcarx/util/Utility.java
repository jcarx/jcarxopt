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

import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import org.apache.log4j.Logger;

public class Utility {

    private static final Logger log = Logger.getLogger(Utility.class.getName());

    public static String getTimeStr() {
        final SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return sdf.format(timestamp);
    }

    public static String getFormatedTimeStr() {
        final SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return sdf.format(timestamp);
    }

    public static String getfilesize(String file) {
        try {
            File f = new File(file);
            if (f.exists()) {
                return String.valueOf(f.length());
            }
        } catch (Exception x) {
            x.printStackTrace();
        }
        return "0";
    }

    public static void main(String args[]) {
        System.out.println(Utility.getFormatedTimeStr());
    }
}
