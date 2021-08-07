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

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class JSontoPojo {

    public static JsonObject getJsonObject(String file) {
        try {
            Gson gson = new Gson();
            Reader reader = Files.newBufferedReader(Paths.get(file));
            return gson.fromJson(reader, JsonObject.class);
        } catch (Exception x) {
            x.printStackTrace();
        }
        return null;
    }  

    public static JsonObject getJsonObjectfromStr(String jsonStr) {
        try {
            Gson gson = new Gson();
            return gson.fromJson(jsonStr, JsonObject.class);
        } catch (Exception x) {
            x.printStackTrace();
        }
        return null;
    }

    public static void GsonTest(String file) {
        try {
            Gson gson = new Gson();
            Reader reader = Files.newBufferedReader(Paths.get(file));
            Map<?, ?> map = gson.fromJson(reader, Map.class);
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                System.out.println(entry.getKey() + "=" + entry.getValue());
                System.out.println("Type:" + entry.getValue());
            }
            reader.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void processhttpgetjson() {
        try {
            URL url = new URL("/get-from-remote-if-needed");
            HttpURLConnection fixerConnection = (HttpURLConnection) url.openConnection();
            fixerConnection.setRequestMethod("GET");
            BufferedReader jsonData = new BufferedReader(new InputStreamReader(fixerConnection.getInputStream()));
            // ravi see JasonParser method in this class for better solution
            JsonObject allData = new JsonParser().parse(jsonData).getAsJsonObject();
            JsonObject rates = allData.getAsJsonObject("rates");
            Set<Map.Entry<String, JsonElement>> entries = rates.entrySet();
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // unit test
        //myMethodName("./src/com/jcarx/jcarxit/util/cssrules.json");
        JsonObject results = getJsonObject("./src/com/jcarx/util/cssrules.json");
        System.out.println(results.getAsJsonObject().get("name").toString().replace('"', ' ').trim());
        System.out.println(results.getAsJsonObject().get("version").toString().replace('"', ' ').trim());
        System.out.println(results.getAsJsonArray("arrayplaceholder").get(0).toString().replace('"', ' ').trim());
        System.out.println(results.getAsJsonArray("arrayplaceholder").size());

        JsonObject allData = results.getAsJsonObject("searchreplace");
        for (Entry e : allData.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            System.out.println(key + ":" + value);
        }

        JsonObject allData2 = results.getAsJsonObject("leaveintact");
        for (Entry e : allData2.entrySet()) {
            String key = e.getKey().toString().replace('"', ' ').trim();
            String value = e.getValue().toString().replace('"', ' ').trim();
            System.out.println(key + ":" + value.toString().replace('"', ' ').trim());
        }
    }
}
