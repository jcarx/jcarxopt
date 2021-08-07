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
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class RecursiveSearch {

    private String fileNameToSearch;
    private List<String> result = new ArrayList<String>();

    public String getFileNameToSearch() {
        return fileNameToSearch;
    }

    public void setFileNameToSearch(String fileNameToSearch) {
        this.fileNameToSearch = fileNameToSearch;
    }

    public List<String> getResult() {
        return result;
    }

    public void searchDirectory(File directory, String fileNameToSearch) {

        setFileNameToSearch(fileNameToSearch);

        if (directory.isDirectory()) {
            search(directory);
        } else {
            System.out.println(directory.getAbsoluteFile() + " is not a directory!");
        }

    }

    private void search(File file) {

        if (file.isDirectory()) {
            System.out.println("Searching directory ... " + file.getAbsoluteFile());
            //do you have permission to read this directory?	
            if (file.canRead()) {
                for (File temp : file.listFiles()) {
                    if (temp.isDirectory()) {
                        search(temp);
                    } else {
                        //System.out.println(temp.getName());
                        System.out.println(temp.lastModified());

                        System.out.println(getCreateTime(temp));
                        //if (getFileNameToSearch().equals(temp.getName().toLowerCase())) {
                        //    result.add(temp.getAbsoluteFile().toString());
                        //}
                    }
                }
            } else {
                System.out.println(file.getAbsoluteFile() + "Permission Denied");
            }
        }
    }

    private static LocalDateTime getCreateTimeg(File file) {
        try {
            Path path = Paths.get(file.getPath());
            BasicFileAttributeView basicfile = Files.getFileAttributeView(path, BasicFileAttributeView.class, LinkOption.NOFOLLOW_LINKS);
            BasicFileAttributes attr = basicfile.readAttributes();
            long date = attr.creationTime().toMillis();
            Instant instant = Instant.ofEpochMilli(date);
            String currentTime = new SimpleDateFormat("HH:mm").format(new Date());
            String timeToCompare = "15:30";
            boolean x = currentTime.equals(timeToCompare);
            return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        } catch (Exception x) {
            x.printStackTrace();
        }
        return null;
    }

    private static LocalDateTime getCreateTime(File file) {
        try {
            Path path = Paths.get(file.getPath());
            BasicFileAttributeView basicfile = Files.getFileAttributeView(path, BasicFileAttributeView.class, LinkOption.NOFOLLOW_LINKS);
            BasicFileAttributes attr = basicfile.readAttributes();
            long date = attr.creationTime().toMillis();
            Instant instant = Instant.ofEpochMilli(date);
            return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        } catch (Exception x) {
            x.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {

        RecursiveSearch fileSearch = new RecursiveSearch();
        String filesroot = "/home/net/GlassFish_Server/glassfish/domains/domain1/docroot";
        fileSearch.search(new File(filesroot));
        //try different directory and filename :)
        //fileSearch.searchDirectory(new File("/Users/mkyong/websites"), "post.php");
        fileSearch.searchDirectory(new File(filesroot), "post.php");
        int count = fileSearch.getResult().size();
        if (count == 0) {
            System.out.println("\nNo result found!");
        } else {
            System.out.println("\nFound " + count + " result!\n");
            for (String matched : fileSearch.getResult()) {
                System.out.println("Found : " + matched);
            }
        }
    }
}
