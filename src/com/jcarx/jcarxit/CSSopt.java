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

public class CSSopt extends Base {

    static StringBuffer buf = new StringBuffer();
    static StringBuffer combuf = new StringBuffer();
    static String str = "";
    static int commentstotal = 0;
    static boolean ccomments = false;
    static boolean success = false;
    static boolean leaveintact = false; // first level check
    static boolean emptyspace = false;  // second level
    static String stopstring = "";
    static JsonObject jsonrules = null;

    public static boolean optimize(String originalfile, String jsonrulesfile, String outputfile) {
        buf = new StringBuffer();
        combuf = new StringBuffer();
        str = "";
        jsonrules = JSontoPojo.getJsonObject(jsonrulesfile);
        return charit(getfilecontent(originalfile), outputfile);
        //return searchandreplace(jsonrulesfile);
    }

    public static boolean charit(String strin, String strfileout) {
        /*if (strin == null) {
            System.out.println("strin is null");
        } else {
            System.out.println("strin is not null"+strin.length());
        }*/
        str = strin;
        char[] cs = str.toCharArray();
        int len = cs.length;
        logme("Charlength:" + len);
        for (int i = 0; i < len; i++) {
            //logme("                                                              Sending Counter=" + i + " : Value=" + cs[i]);
            i = optimize(len, i, cs);
            //static boolean leaveintact = false;
            //static boolean emptyspace = false;
            if ((i < len) && leaveintact) {
                buf.append(cs[i]);
            } else {
                if (emptyspace) {
                    //System.out.println("Empty space found'" + cs[i] + "'");
                } else {
                    buf.append(cs[i]);
                }
                //System.out.println("not writing char:'" + cs[i] + "' leaveintact:" + leaveintact + " emptyspace:" + emptyspace);
            }
        }

        cs = buf.toString().toCharArray();
        len = cs.length;
        combuf = new StringBuffer();
        for (int i = 0; i < len; i++) {
            i = remcom(len, i, cs);

            if ((i < len) && (!ccomments)) {
                combuf.append(cs[i]);
            }//else{
            //    System.out.println("not writing="+cs[i]);
            //}
        }
        cs = combuf.toString().toCharArray();
        len = cs.length;
        combuf = new StringBuffer();
        for (int i = 0; i < len; i++) {
            i = removeextracolon(len, i, cs);

            if (i < len) {
                combuf.append(cs[i]);
            }
        }
        //System.out.println("total comments " + commentstotal);
        //writeoutfile(strfileout, searchreplacejson(buf.toString(), jsonrules));
        //writeoutfile(strfileout, searchreplacejson(strin, jsonrules));        
        writeoutfile(strfileout, searchreplacejson(combuf.toString(), jsonrules));
        return (success = true);
    }

    public static int optimize(int len, int loc, char[] cs) {
        JsonObject allData2 = jsonrules.getAsJsonObject("leaveintact");

        for (Map.Entry e : allData2.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            //System.out.println(key + ":" + value.toString().replace('"', ' ').trim());

            if ((loc + key.length()) < str.length()) {
                //System.out.println("loc :"+loc+" key_size:" + key.length()+" : key:"+key);
                //System.out.println("subSequence:'" + str.subSequence(loc, key.length()+loc).toString()+"'");
                //System.out.println("match found:'" + str.subSequence(loc, key.length()).toString()+"'");
                if (str.subSequence(loc, key.length() + loc).toString().equalsIgnoreCase(key)) { // && (!leaveintact)) {
                    //System.out.println("leaveintact begin:" + key);
                    stopstring = value;
                    leaveintact = true;
                    return loc;
                }
            }
        }
        if (leaveintact) {
            if (str.subSequence(loc, stopstring.length() + loc).toString().equalsIgnoreCase(stopstring)) {
                //System.out.println("leaveintact end:'" + stopchar + "'");
                leaveintact = false;
            }
        }
        //removeextracolon(len,loc, cs);
        //int val = cs[loc];
        if (cs[loc] == ' ') {
            emptyspace = true;
        } else {
            emptyspace = false;
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
