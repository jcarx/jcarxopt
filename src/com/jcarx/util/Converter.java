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

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;

public class Converter {

	static String rootPath = null;
	static String articlePath = null;

	public static void main(String[] args) {

		if (args.length == 0) {
			//rootPath = args[0];
			//articlePath = args[1];/
                        rootPath = "/home/net/NetBeansProjects/NetAppsOcean/src/java/com/jcarx/util";
			articlePath = "/home/net/NetBeansProjects/NetAppsOcean/src/java/com/jcarx/util/ht.html";
                      
			System.out.println("rootPath =" + rootPath);
			System.out.println("articlePath =" + articlePath);

			try {
				File filePath = new File(rootPath);
				Converter.listFilesInDirectory(filePath);
			} catch (Exception x) {
				x.printStackTrace();
			}
		} else {
			System.out
					.println("Please provide eclipse project root path and Article destination path");
			System.out
					.println("\nExample >java Converter /home/projects/animalpiano /home/projects/pianoartivle.html");
		}
	}

	public static void listFilesInDirectory(File dir) {
		File[] files = dir.listFiles();
		if (files != null) {
			for (File f : files) {
				if (f.isDirectory()) {
					listFilesInDirectory(f);
				} else {
					
					String filename = f.getName();
					if(filename.endsWith("java") && (!filename.endsWith("R.java")) && (!filename.endsWith("Config.java"))){
						System.out.println(filename +" "+dir.getAbsolutePath());
						Converter.readFromFile(filename, dir.getAbsolutePath());
					}
					//System.out.println(filename);
				}
			}
		}
		
		// write to file
		Converter.writeToFile(mainbuf, articlePath);
		
	}
	
	public static boolean writeToFile(StringBuffer buf, String filename){
		boolean status = true;
		try {
			File file = new File(filename);
			java.io.FileWriter writer = new java.io.FileWriter(file);
			writer.write(buf.toString());
			writer.close();

		} catch (Exception x) {
			status = false;
			x.printStackTrace();
		}
		return status;
	}

	public static boolean writeToFile(StringBuffer buf, String filename,
			String filePath) {
		boolean status = true;
		try {
			if (filePath == null) {
				return false;
			}
			File file = new File(filePath + filename);
			if (!file.exists()) {
				return false;
			}
			java.io.FileWriter writer = new java.io.FileWriter(file);
			writer.write(buf.toString());
			writer.close();

		} catch (Exception x) {
			status = false;
			x.printStackTrace();
		}
		return status;
	}

	public static StringBuffer mainbuf = new StringBuffer();
	
	public static String readFromFile(String filename, String filePath) {
		String status = "";
		BufferedReader inputStream = null;
		FileReader fr = null;
		try {
			fr = new FileReader(filePath +File.separator+ filename);

			inputStream = new BufferedReader(fr);
			String l;
			//mainbuf.append("<br>");
			mainbuf.append("\n");
			mainbuf.append("<strong>"+filename+"</strong>");
			mainbuf.append("\n");
			mainbuf.append("\n");
			mainbuf.append("<pre class="+'"'+"prettyprint"+'"'+">");
			mainbuf.append("<code class="+'"'+"language-java"+'"'+">");
			while ((l = inputStream.readLine()) != null) {
				
				// read each and every char to see if it is one of these so that we can format
				//Ampersand	&amp;	&
				//Greater than	&gt;	>
				//Less than	&lt;	<
				//Quotation mark	&quot;	"
				
				char[] chararr = l.toCharArray();
				for(int i =0 ; i < chararr.length; i++){
					char coparechar = chararr[i];
					if(coparechar == '&'){
						mainbuf.append("&amp;");
					}else if(coparechar == '>'){
						mainbuf.append("&gt;");
					}else if(coparechar == '<'){
						mainbuf.append("&lt;");
					}else if(coparechar == '"'){
						mainbuf.append("&quot;");
					}
					else{
						mainbuf.append(coparechar);
					}
				}
				
				status = l;
				mainbuf.append("\n");
				//mainbuf.append(status+"<br>");
			}
			mainbuf.append("</code>");
			mainbuf.append("</pre>");
			//mainbuf.append("</code>");
			
		} catch (Exception x) {
			x.printStackTrace();
		} finally {
			try {
				fr.close();
				inputStream.close();
			} catch (Exception x2) {
				x2.printStackTrace();
			}
		}
		return status;
	}
}