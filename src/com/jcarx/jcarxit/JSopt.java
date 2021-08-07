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
package com.jcarx.jcarxit;

import com.google.gson.JsonObject;
import com.jcarx.jcarxit.model.Base;
import com.jcarx.util.JSontoPojo;
import java.util.Map;
import java.util.Scanner;

public class JSopt extends Base {

    static StringBuilder buf = new StringBuilder();
    static StringBuilder combuf = new StringBuilder();
    static String str = "";
    static int commentstotal = 0;
    static boolean ccomments = false;
    static boolean success = false;
    static boolean removelogs = false; // first level check
    static boolean emptyspace = false;  // second level
    static String stopstring = "";
    static JsonObject jsonrules = null;

    public static boolean optimize(String originalfile, String jsonrulesfile, String outputfile) {
        buf = new StringBuilder();
        combuf = new StringBuilder();
        str = "";
        jsonrules = JSontoPojo.getJsonObject(jsonrulesfile);
        return charit(getfilecontentforjs(originalfile), outputfile);
    }

    public static boolean charit(String strin, String strfileout) {
        // "/*": "*/"
        /*if (strin == null) {
            System.out.println("strin is null no inputfile to process");
            return false;
        } else {
            System.out.println("strin is :" + strin.length());
        }*/
        str = strin;
        char[] cs = str.toCharArray();
        int len = cs.length;

        StringBuilder removeccomments = new StringBuilder();
        for (int i = 0; i < len; i++) {
            i = remcom(len, i, cs);

            if ((i < len) && (!ccomments)) {
                removeccomments.append(cs[i]);
            }//else{
            //    System.out.println("not writing="+cs[i]);
            //}
        }

        str = removeccomments.toString();
        cs = str.toCharArray();
        len = cs.length;

        logme("Charlength:" + len);
        for (int i = 0; i < len; i++) {
            //logme("Sending Counter=" + i + " : Value=" + cs[i]);
            i = optimize(len, i, cs);
            //static boolean removelogs = false;
            //static boolean emptyspace = false;

            if ((i < len) && removelogs) {
                // buf.append(cs[i]); remove alerts console stuff
            } else {
                buf.append(cs[i]);
            }
        }

        String lineemptycheck = null;
        Scanner scanner = new Scanner(buf.toString());
        while (scanner.hasNextLine()) {
            lineemptycheck = scanner.nextLine();
            if (lineemptycheck.trim().length() > 0) {
                combuf.append(lineemptycheck.trim() + "\n");
            }
        }

        // json search and replace
        //System.out.println("strin is buf :" + buf.length());
        String searchandreplace = searchreplacejson(combuf.toString(), jsonrules);
        //System.out.println("total comments " + commentstotal);
        //writeoutfile(strfileout, searchreplacejson(buf.toString(), jsonrules));
        //writeoutfile(strfileout, searchreplacejson(strin, jsonrules));        
        writeoutfile(strfileout, searchandreplace);
        return (success = true);
    }

    public static int optimize(int len, int loc, char[] cs) {
        JsonObject allData2 = jsonrules.getAsJsonObject("removelogs");

        for (Map.Entry e : allData2.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            //System.out.println(key + ":" + value.toString().replace('"', ' ').trim());

            if ((loc + key.length()) < str.length()) {
                //System.out.println("loc :"+loc+" key_size:" + key.length()+" : key:"+key);
                //System.out.println("subSequence:'" + str.subSequence(loc, key.length()+loc).toString()+"'");
                //System.out.println("match found:'" + str.subSequence(loc, key.length()).toString()+"'");
                if (str.subSequence(loc, key.length() + loc).toString().equalsIgnoreCase(key)) { // && (!removelogs)) {
                    //System.out.println("removelogs begin:" + key);
                    stopstring = value;
                    removelogs = true;
                    return loc;
                }
            }
        }
        if (removelogs) {
            if ((loc + stopstring.length()) < str.length()) {
                if (str.subSequence(loc, stopstring.length() + loc).toString().equalsIgnoreCase(stopstring)) {
                    //System.out.println("removelogs end:'" + stopchar + "'");
                    loc = loc + stopstring.length();
                    removelogs = false;
                }
            }
        }
        return loc;
    }

    public static int removeextracolon(int len, int loc, char[] cs) {
        if ((loc + 1) < len) {
            if (cs[loc] == ';') {
                //logme("incremented the counter:" + loc);
                if (cs[loc + 1] == '}') {
                    //System.out.println("found a Match of ;}");
                    return (loc + 1);
                }
            }
        }
        return loc;
    }

    /* do this after all optimization is done */
    public static int remcom(int len, int loc, char[] cs) {
        if ((loc + 1) < len) {
            if ((cs[loc] == '/') && (cs[loc + 1] == '*')) {
                //System.out.println("what could this be begin:'" + cs[loc + 1] + "'");
                commentstotal++;
                if (cs[loc + 1] == '*') {
                    //System.out.println("comment begin at "+cs[loc+1]+cs[loc+2]+cs[loc+3]);
                    ccomments = true;

                    logme("comment location:" + loc + ":" + cs[loc]);
                    combuf.append(" ");
                    //buf.replace(loc, loc+1," ");
                    //buf.append(cs[loc] = ' ');
                    return loc;
                }
            }
            if (ccomments) {
                if ((cs[loc] == '*') && (cs[loc + 1] == '/')) {
                    //System.out.println("what could this be end:'" + cs[loc + 1] + "'");
                    //commentstotal++;
                    //System.out.println("comment end at"+cs[loc-2]+cs[loc-1]+cs[loc]);
                    ccomments = false;
                    logme("replace location:" + loc + ":" + cs[loc]);
                    //buf.replace(loc-1, loc," ");
                    return loc + 2;
                }
                return loc;
            }
        }
        return loc;
    }
}
