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

package com.jcarx.jcarxit.model;

import com.google.gson.JsonObject;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Map;

public abstract class Base {

    public static String getfilecontent(String file) {
        StringBuilder list = new StringBuilder();
        try {
            java.io.RandomAccessFile r = new java.io.RandomAccessFile(file, "r");
            String line = null;
            while ((line = r.readLine()) != null) {
                //list.append(line.replaceAll("\\t", ""));
                if (!line.trim().startsWith("//")) { // remove any comment with this format in a line
                    list.append(line);
                } else {
                    list.append(line);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list.toString();
    }

    public static String getfilecontent_as_is(String file) {
        StringBuilder list = new StringBuilder();
        try {
            java.io.RandomAccessFile r = new java.io.RandomAccessFile(file, "r");
            String line = null;
            while ((line = r.readLine()) != null) {
                list.append(line + "\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list.toString();
    }

    public static String getfilecontentforjs(String file) {
        StringBuilder list = new StringBuilder();
        try {
            java.io.RandomAccessFile r = new java.io.RandomAccessFile(file, "r");
            String line = null;
            while ((line = r.readLine()) != null) {
                //list.append(line.replaceAll("\\t", ""));
                if (line.trim().startsWith("//")) { // remove any comment with this format in a line
                    //list.append(line);
                    //System.out.println("Processing starts with // :" + line);
                } else {
                    if (line.trim().length() > 0) {
                        list.append(removeinemptyspaceinfront(line) + "\n");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list.toString();
    }

    public static String removeinlinecomments(String line) {
        String processline = " ";
        //System.out.println("Processing:" + line);
        String[] a = line.split("//");//.[0];
        // remove inline comment after valid code example: somecode // my comment
        processline = a[0];
        // remove white char before code begin example:      codestarts here.. make it example:codestart here
        return removeinemptyspaceinfront(processline);
    }

    public static String removeinemptyspaceinfront(String line) {
        return line.trim();
    }

    public static String getfilecontentforhtml(String file) {
        StringBuilder list = new StringBuilder();
        try {
            java.io.RandomAccessFile r = new java.io.RandomAccessFile(file, "r");
            String line = null;
            while ((line = r.readLine()) != null) {
                if (line.trim().length() > 0) {
                    list.append(removeinemptyspaceinfront(line) + "\n");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list.toString();
    }

    public static boolean writeoutfile(String file, String str) {
        try {
            BufferedWriter bwr = new BufferedWriter(new FileWriter(new File(file)));
            bwr.write(str);
            bwr.flush();
            bwr.close();
            File f = new File(file);
            System.out.println("Optimized file location:" + file);
        } catch (Exception x) {
            x.printStackTrace();
        }
        return false;
    }

    public static String searchreplace(ArrayList<String[]> list, String str) {
        for (int i = 0; i < list.size(); i++) {
            String[] obj = list.get(i);
            String search = obj[0];
            String replace = obj[1];
            System.out.println("searchreplace" + search + ":" + replace);
            str = str.replaceAll(search, replace);
        }
        return str;
    }

    public static String searchreplacejson(String filecontent, JsonObject results) {
        JsonObject allData = results.getAsJsonObject("searchreplace");
        for (Map.Entry e : allData.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            System.out.println(key + ":" + value);
            filecontent = filecontent.replaceAll(key, value);
        }
        return filecontent;
    }

    public static void logme(String s) {
        //System.out.println(s);
    }
}
