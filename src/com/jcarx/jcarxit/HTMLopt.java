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
import static com.jcarx.jcarxit.model.Base.logme;
import static com.jcarx.jcarxit.model.Base.searchreplacejson;
import static com.jcarx.jcarxit.model.Base.writeoutfile;
import com.jcarx.util.JSontoPojo;
import java.util.Map;
import java.util.Scanner;

public class HTMLopt extends Base {

    static String jsbegin = "<script";
    static String jsend = "</script>";
    static boolean jsscript = false;
    static StringBuilder buf = new StringBuilder();
    static StringBuilder combuf = new StringBuilder();
    static StringBuilder jsscriptbuf = new StringBuilder();
    static String str = "";
    static int removedchar = 0;
    static boolean ccomments = false;
    static boolean success = false;
    static boolean removelogs = false; // first level check
    static boolean emptyspace = false;  // second level
    static String stopstring = "";
    static JsonObject jsonrules = null;

    public static int optimize(String originalfile, String jsonrulesfile, String outputfile) {
        buf = new StringBuilder();
        combuf = new StringBuilder();
        jsscriptbuf = new StringBuilder();
        str = "";
        jsonrules = JSontoPojo.getJsonObject(jsonrulesfile);
        return charit(getfilecontentforhtml(originalfile), outputfile);
    }

    public static int charit(String strin, String strfileout) {
        if (strin == null) {
            //System.out.println("strin is null no inputfile to process");
            return 0;
        }
        str = strin;
        char[] cs = str.toCharArray();
        int len = cs.length;
        logme("Charlength:" + len);
        for (int i = 0; i < len; i++) {
            //logme("Sending Counter=" + i + " : Value=" + cs[i]);
            i = optimize(len, i, cs);
            //static boolean removelogs = false;
            //static boolean emptyspace = false;

            if ((i < len) && removelogs) {
                // buf.append(cs[i]); remove <!-- html comments -->
                removedchar++;
            } else if ((i < len) && jsscript) {
                //System.out.println("Write Script:" + cs[i]);
                jsscriptbuf.append(cs[i]);
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
        String searchandreplace = searchreplacejson(combuf.toString(), jsonrules);
        //System.out.println("Script" + jsscriptbuf.toString());
        // good praticle load js script before end of body
        String searchandreplacejs = searchandreplace.replaceAll("</body>", jsscriptbuf.toString() + "\n</body>");
        writeoutfile(strfileout, searchandreplacejs);

        return removedchar;
    }

    public static int optimize(int len, int loc, char[] cs) {
        JsonObject allData2 = jsonrules.getAsJsonObject("remove");
        for (Map.Entry e : allData2.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            if ((loc + key.length()) < str.length()) {
                if (str.subSequence(loc, key.length() + loc).toString().equalsIgnoreCase(key)) {
                    stopstring = value;
                    removelogs = true;
                    return loc;
                } else if ((loc + jsbegin.length()) < str.length()) {
                    //System.out.println("Check :" + str.subSequence(loc, jsbegin.length() + loc).toString());
                    if (str.subSequence(loc, jsbegin.length() + loc).toString().equalsIgnoreCase(jsbegin)) {
                        jsscript = true;
                        return loc;
                    }
                }
            } else if ((loc + jsbegin.length()) < str.length()) {
                //System.out.println("Check :" + str.subSequence(loc, jsbegin.length() + loc).toString());
                if (str.subSequence(loc, jsbegin.length() + loc).toString().equalsIgnoreCase(jsbegin)) {
                    jsscript = true;
                    return loc;
                }
            }
        }
        if (removelogs) {
            if ((loc + stopstring.length()) < str.length()) {
                if (str.subSequence(loc, stopstring.length() + loc).toString().equalsIgnoreCase(stopstring)) {
                    loc = loc + stopstring.length();
                    removelogs = false;
                }
            }
        }
        if (jsscript) {
            if ((loc + stopstring.length()) < str.length()) {
                if (str.subSequence(loc, jsend.length() + loc).toString().equalsIgnoreCase(jsend)) {
                    loc = loc + jsend.length();
                    jsscriptbuf.append(jsend + "\n");
                    jsscript = false;
                }
            }
        }
        return loc;
    }
}
