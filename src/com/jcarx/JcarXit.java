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
package com.jcarx;

import com.jcarx.jcarxit.*;
import com.jcarx.util.Utility;

public class JcarXit {
    // Unit test Example's 
    public static void main(String[] args) {
        /* CSS Tester 
        String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/css/netappspink.css";
        String jasonrulesfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/cssrules.json";
        String outputfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/processed/css/netappspink.css";
        boolean result = CSSopt.optimize(originalfile,jasonrulesfile,outputfile);
        System.out.println("\nOptimization:"+result+" \nOriginal:"+
                Utility.getfilesize(originalfile)+" \nOptimized:"+Utility.getfilesize(outputfile)); */
        //String c3rdparty = "/home/net/NetBeansProjects/jcarxopt/samplefiles/compre3rdparty/css/netappssimple.css";       
        //System.out.println("3rd party Size:"+Utility.getfilesize(c3rdparty)); 
          
        /* JS Tester 
        String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/js/jquery.min.1.11.1.js";
        //String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/js/opt_c.js";
        String jasonrulesfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/jsrules.json";
        String outputfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/processed/js/jquery.min.1.11.1.js";
        boolean result = JSopt.optimize(originalfile,jasonrulesfile,outputfile);
        System.out.println("\nOptimization:"+result+" \nOriginal:"+
                Utility.getfilesize(originalfile)+" \nOptimized:"+Utility.getfilesize(outputfile));*/
        //String c3rdparty = "/home/net/NetBeansProjects/jcarxopt/samplefiles/compre3rdparty/js/opt.js";       
        //System.out.println("3rd party Size:"+Utility.getfilesize(c3rdparty));  
        
        /* HTML Tester 
        String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/html/index_O.html";
        //String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/js/opt_c.js";
        String jasonrulesfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/htmlrules.json";
        String outputfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/processed/html/index.html";
        int commentsremoved = HTMLopt.optimize(originalfile,jasonrulesfile,outputfile);
        System.out.println("\nchars Removed:"+commentsremoved+" \nOriginal:"+
                Utility.getfilesize(originalfile)+" \nOptimized:"+Utility.getfilesize(outputfile));
        String c3rdparty = "/home/net/NetBeansProjects/jcarxopt/samplefiles/compre3rdparty/html/index.html";       
        System.out.println("3rd party Size:"+Utility.getfilesize(c3rdparty)); */
        
        /* HTML Tester */
        String originalfile = "/home/net/NetBeansProjects/samplefiles/original/jsp/index.jsp";
        //String originalfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/original/js/opt_c.js";
        String jasonrulesfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/htmlrules.json";
        String outputfile = "/home/net/NetBeansProjects/jcarxopt/samplefiles/processed/jsp/index.jsp";
        int commentsremoved = HTMLopt.optimize(originalfile,jasonrulesfile,outputfile);
        System.out.println("\nchars Removed:"+commentsremoved+" \nOriginal:"+
                Utility.getfilesize(originalfile)+" \nOptimized:"+Utility.getfilesize(outputfile));
        //String c3rdparty = "/home/net/NetBeansProjects/jcarxopt/samplefiles/compre3rdparty/html/index.html";       
        //System.out.println("3rd party Size:"+Utility.getfilesize(c3rdparty)); 
        
    }
}
