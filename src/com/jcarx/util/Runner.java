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

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * 
 * @author NetSolvers.Net
 */
// os command runner to debug for test not in the main pipe
public class Runner implements Runnable {

    String command = "";

    public Runner(String commandstr) {
        this.command = commandstr;
    }

    public void run() {
        runMailProcess(command);
    }

    public String runMailProcess(String command) {
        StringBuffer buf = new StringBuffer();
        try {

            //ProcessBuilder pb = new ProcessBuilder("Notepad.exe", command);
            //pb.start();
            Runtime rt = Runtime.getRuntime();
            Process proceso = null;

            proceso = rt.exec(command);
            //int exitValue = proceso.exitValue();
            //int exitValue = 
            proceso.wait(5000);

            //System.out.println("******Exit Value = " + exitValue);
            //buf.append(" return code =" + exitValue + " ");
            InputStream stdin = proceso.getInputStream();
            InputStreamReader isr = new InputStreamReader(stdin);
            BufferedReader buffer = new BufferedReader(isr);
            String line = null;

            while ((line = buffer.readLine()) != null) {
                System.out.println("<br>line=" + line);
                break;
            }
            buf.append("Some Buffer stuff " + line.toString());
            buffer.close();
        } catch (Exception x) {
            x.printStackTrace();
        }
        System.out.println("runMailProcess2 = " + buf.toString());
        return buf.toString();
    }

    public String runMailProcess2(String command) {
        String line, line2 = "";
        try {
            //Windows command
            //ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", command);
            //I use this with quots and without quotes
            //ProcessBuilder builder = new ProcessBuilder("/bin/sh -c asadmin list-instances --long=true");
            ProcessBuilder builder = new ProcessBuilder(command);

            builder.redirectErrorStream(true);
            Process p = builder.start();
            BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
            while (true) {
                line = r.readLine();
                if (line == null) {
                    break;
                }
                line2 += r.readLine() + "\n<br>";
            }
        } catch (Exception e) {
            System.out.println("Exception = " + e);
        }
        System.out.println("runMailProcess2 = " + line2);
        return line2;
    }
}
