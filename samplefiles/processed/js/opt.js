      function optWindow(showwindow) {
var i, tabcontent;
tabcontent = document.getElementsByClassName("opttabcontent");
for (i = 0; i < tabcontent.length; i++) {
tabcontent[i].style.display = "none";
}
document.getElementById(showwindow).style.display = "block";
}
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
const dropZoneElement = inputElement.closest(".drop-zone");
var forEach = function (array, callback, scope) {
for (var i = 0; i < array.length; i++) {
callback.call(scope, i, array[i]); // passes back stuff we need
}
};
var div_list = document.querySelectorAll('div'); // returns NodeList
var div_array = [div_list]; // converts NodeList to Array
div_array.forEach(div => {
});
dropZoneElement.addEventListener("click", (e) => {
inputElement.click();
dropZoneElement.removeEventListener("click", e);
});
inputElement.addEventListener("change", (e) => {
if (inputElement.files.length) {
updateThumbnail(dropZoneElement, inputElement.files[0], e);
let data = inputElement.files[0];
uploadclick(data);
dropZoneElement.removeEventListener("change", e);
}
});
dropZoneElement.addEventListener("dragover", (e) => {
e.preventDefault();
dropZoneElement.classList.add("drop-zone--over");
});
["dragleave", "dragend"].forEach((type) => {
dropZoneElement.addEventListener(type, (e) => {
dropZoneElement.classList.remove("drop-zone--over");
});
});
dropZoneElement.addEventListener("drop", (e) => {
e.preventDefault();
if (e.dataTransfer.files.length) {
inputElement.files = e.dataTransfer.files;
updateThumbnail(dropZoneElement, e.dataTransfer.files[0], e);
dropZoneElement.removeEventListener("drop", e);
}
dropZoneElement.classList.remove("drop-zone--over");
uploadclick(e.dataTransfer.files[0]);
});
});
function updateThumbnail(dropZoneElement, file, e) {
let textareaElement = dropZoneElement.querySelector(".drop-zone__txt");
if (dropZoneElement.querySelector(".drop-zone__prompt")) {
dropZoneElement.querySelector(".drop-zone__prompt").remove();
}
if (dropZoneElement.querySelector(".image-zone")) {
dropZoneElement.querySelector(".image-zone").remove();
}
if (dropZoneElement.querySelector(".video-zone")) {
dropZoneElement.querySelector(".video-zone").remove();
}
if (dropZoneElement.querySelector(".text-zone")) {
dropZoneElement.querySelector(".text-zone").remove();
}
if (file.type.startsWith("video/")) {
var myobj = document.getElementById("drop-zone");
myobj.remove();
var videozone = document.getElementById("video-zone");
var videoplay = document.getElementById("videofile");
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
document.getElementById('video-zone').style.display = 'block';
videoplay.src = reader.result;
};
} else if (file.type.startsWith("image/")) {
var myobj = document.getElementById("drop-zone");
myobj.remove();
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
document.getElementById('image-zone').style.display = 'block';
document.getElementById('imagesetting').style.display = 'block';
document.getElementById('imagedisplay').src = reader.result;
};
} else if (file.type.startsWith("text/css")) {
var myobj = document.getElementById("drop-zone");
myobj.remove();
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
var base64result = reader.result.split(';base64,')[1];
document.getElementById('text-zone').style.display = 'block';
document.getElementById('textdisplay').value = atou(base64result);
document.getElementById('rulesdisplay').value = getdefualtcssrules();
document.getElementById('textrouter').value = "css";
};
} else if (file.type.startsWith("text/html")) {
var myobj = document.getElementById("drop-zone");
myobj.remove();
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
var base64result = reader.result.split(';base64,')[1];
document.getElementById('text-zone').style.display = 'block';
document.getElementById('textdisplay').value = atou(base64result);
document.getElementById('rulesdisplay').value = getdefualthtmlrules();
document.getElementById('textrouter').value = "html";
};
} else if (file.type.startsWith("text/javascript")) {
var myobj = document.getElementById("drop-zone");
myobj.remove();
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
var base64result = reader.result.split(';base64,')[1];
document.getElementById('text-zone').style.display = 'block';
document.getElementById('textdisplay').value = atou(base64result);
document.getElementById('rulesdisplay').value = getdefualtjsrules();
document.getElementById('textrouter').value = "js";
};
} else { // add support for jsp jsf later
var myobj = document.getElementById("drop-zone");
myobj.remove();
document.getElementById('text-zone').style.display = 'block';
document.getElementById('textdisplay').value = "Please Contact Admin for support of " + file.type;
}
}
function atou(str) {
return decodeURIComponent(escape(window.atob(str)));
}
let fileName;
function uploadclick(file) {
event.stopPropagation();
event.preventDefault();
if (file.size > 7088608) { // 8mb=8388608 make it 6188608 curret ~3MB 3088608
reason();
return;
}
fileName = file.name;
var formData = getFormdataToUpload(file);
if (filetype === "video") {
sourceupload(formData, "video");
} else if (filetype === "image") {
sourceupload(formData, "image");
} else if (filetype === "css") {
sourceupload(formData, "text");
} else if (filetype === "html") {
sourceupload(formData, "text");
} else if (filetype === "js") {
sourceupload(formData, "text");
} else if (filetype === "jsp") {
formData.append("file", file);
formData.append("rules", getdefualtrules());
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://www.jcarx.com/NetFileService/uploadjsp");
} else if (filetype === "jsf") {
formData.append("file", file);
formData.append("rules", getdefualtrules());
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://www.jcarx.com/NetFileService/uploadjsf");
}
}
function sourceupload(formData, whattype) {
if (fileName.length > 15) {
fileName = fileName.toString().substr(0, 8) + "..." + fileName.toString().substr(fileName.length - 4);
}
$.ajax({
url: "../NetFileService/upload",
type: 'POST',
data: formData,
cache: false,
dataType: 'json',
processData: false,
contentType: false,
beforeSend: function () {
if (whattype === "text") {
$("#loading-imagetxt").show();
document.getElementById('fileuploadnametxt').innerHTML = fileName + "  ";
} else if (whattype === "image") {
$("#loading-imageimg").show();
document.getElementById('fileuploadnameimg').innerHTML = fileName + "  ";
} else if (whattype === "video") {
document.getElementById('fileuploadnamevid').innerHTML = fileName + "  ";
$("#loading-imagevid").show();
} else {
}
},
complete: function () {
if (whattype === "text") {
document.getElementById('toolsform-zone2').style.display = "block";
document.getElementById('toolsform-advanced').style.display = "block";
document.getElementById('rules-zone').style.display = "block";
$("#loading-imagetxt").hide();
$("#netbutopttxt").show();
} else if (whattype === "image") {
document.getElementById('toolsform-zone2').style.display = "block";
$("#loading-imageimg").hide();
$("#netbutoptimg").show();
} else if (whattype === "video") {
$("#loading-imagevid").hide();
$("#netbutoptvid").show();
} else {
}
},
success: function (data) {
},
error: function (data, status, er) {
$("#loading-image").show();
}
});
}
let filetype = "none";
function getFormdataToUpload(file) {
var formData = new FormData();
if (file.type.startsWith("video/")) {
filetype = "video";
formData.append("file", file);
} else if (file.type.startsWith("image/")) {
formData.append("file", file);
filetype = "image";
} else if (file.type.startsWith("text/css")) {
formData.append("file", file);
formData.append("type", "css");
filetype = "css";
} else if (file.type.startsWith("text/html")) {
formData.append("file", file);
formData.append("type", "html");
filetype = "html";
} else if (file.type.startsWith("text/javascript")) {
formData.append("file", file);
formData.append("type", "js");
filetype = "js";
} else {
var str = file.name;
const [pluginName, fileExtension] = str.split(/\.(?=[^\.]+$)/);
filetype = fileExtension;
}
return formData;
}
function optimizeweb() {
let routeto = document.getElementById('textrouter').value;
if (routeto === 'css') {
optimizecss();
} else if (routeto === 'js') {
optimizejs();
} else {
optimizehtml();
}
}
function optimizecss() {
optWindow('output');
var userrules = getuserrules();
$.ajax({
url: "../NetFileService/optcss",
type: 'POST',
dataType: 'json',
data: userrules,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-imageout").show();
},
complete: function () {
$("#loading-imageout").hide();
},
success: function (data) {
let originalfname = data.originalfname;
let processedfname = data.processedfname;
if (originalfname.length > 15) {
originalfname = originalfname.toString().substr(0, 4) + "..." +
originalfname.toString().substr(originalfname.length - 8);
}
if (processedfname.length > 15) {
processedfname = processedfname.toString().substr(0, 4) + "..." +
processedfname.toString().substr(processedfname.length - 8);
}
let orgsize = data.originalsize;
let optsize = data.processedfsize;
let optper = (optsize / orgsize) * 100;
let rounoff;
if (optper > 100) {
rounoff = 100;
} else {
rounoff = Math.round(optper);
}
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = data.originalsize + ' kB';
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
document.getElementById('processedpath').href = data.processedpath;
document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
document.getElementById('outputoptperp').innerHTML = rounoff;
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = orgsize + ' kB';
document.getElementById('outputtable').style.display = "block";
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = optsize + ' kB';
},
error: function (data, status, er) {
$("#loading-image").show();
}
}
);
}
function optimizejs() {
optWindow('output');
var userrules = getuserrules();
$.ajax({
url: "../NetFileService/optjs",
type: 'POST',
dataType: 'json',
data: userrules,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-imageout").show();
},
complete: function () {
$("#loading-imageout").hide();
},
success: function (data) {
let originalfname = data.originalfname;
let processedfname = data.processedfname;
if (originalfname.length > 15) {
originalfname = originalfname.toString().substr(0, 4) + "..." +
originalfname.toString().substr(originalfname.length - 8);
}
if (processedfname.length > 15) {
processedfname = processedfname.toString().substr(0, 4) + "..." +
processedfname.toString().substr(processedfname.length - 8);
}
let orgsize = data.originalsize;
let optsize = data.processedfsize;
let optper = (optsize / orgsize) * 100;
let rounoff;
if (optper > 100) {
rounoff = 100;
} else {
rounoff = Math.round(optper);
}
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = data.originalsize + ' kB';
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
document.getElementById('processedpath').href = data.processedpath;
document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
document.getElementById('outputoptperp').innerHTML = rounoff;
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = orgsize + ' kB';
document.getElementById('outputtable').style.display = "block";
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = optsize + ' kB';
},
error: function (data, status, er) {
$("#loading-image").show();
}
});
}
function optimizehtml() {
optWindow('output');
var userrules = getuserrules();
$.ajax({
url: "../NetFileService/HTMLService",
type: 'POST',
dataType: 'json',
data: userrules,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-imageout").show();
},
complete: function () {
$("#loading-imageout").hide();
},
success: function (data) {
let originalfname = data.originalfname;
let processedfname = data.processedfname;
if (originalfname.length > 15) {
originalfname = originalfname.toString().substr(0, 4) + "..." +
originalfname.toString().substr(originalfname.length - 8);
}
if (processedfname.length > 15) {
processedfname = processedfname.toString().substr(0, 4) + "..." +
processedfname.toString().substr(processedfname.length - 8);
}
let orgsize = data.originalsize;
let optsize = data.processedfsize;
let optper = (optsize / orgsize) * 100;
let rounoff;
if (optper > 100) {
rounoff = 100;
} else {
rounoff = Math.round(optper);
}
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = data.originalsize + ' kB';
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
document.getElementById('processedpath').href = data.processedpath;
document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
document.getElementById('outputoptperp').innerHTML = rounoff;
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = orgsize + ' kB';
document.getElementById('outputtable').style.display = "block";
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = optsize + ' kB';
},
error: function (data, status, er) {
$("#loading-image").show();
}
});
}
let imagecompress = 5;
function updateimagecompress(v) {
imagecompress = v;
}
let imageani = 'no';
function updateimageani(v) {
imageani = v;
}
function optimizeimage() {
optWindow('output');
let imgcompress = imagecompress;//document.getElementById("imgcompress").value;
let imgani = imageani;//document.getElementById("imgani").value;
let imagerules = filetype + "," + imgcompress + "," + imgani;
$.ajax({
url: "../NetFileService/optimage",
type: 'POST',
dataType: 'json',
data: imagerules,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-imageout").show();
},
complete: function () {
$("#loading-imageout").hide();
},
success: function (data) {
let originalfname = data.originalfname;
let processedfname = data.processedfname;
if (originalfname.length > 15) {
originalfname = originalfname.toString().substr(0, 4) + "..." +
originalfname.toString().substr(originalfname.length - 8);
}
if (processedfname.length > 15) {
processedfname = processedfname.toString().substr(0, 4) + "..." +
processedfname.toString().substr(processedfname.length - 8);
}
let orgsize = data.originalsize;
let optsize = data.processedfsize;
let optper = (optsize / orgsize) * 100;
let rounoff;
if (optper > 100) {
rounoff = 100;
} else {
rounoff = Math.round(optper);
}
document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
document.getElementById('outputoptperp').innerHTML = rounoff;
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = orgsize + ' kB';
document.getElementById('processedpath').href = data.processedpath;
document.getElementById('outputtable').style.display = "block";
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = optsize + ' kB';
let downloadlink = data.processedpath;
document.getElementById('demolink').style.display = "block";
var s = downloadlink.split("/").reverse();
s.splice(0, 1);
let htmllink = (s.reverse().join("/")) + "/indexdemo.html";
$("#includedContent").load(htmllink);
},
error: function (data, status, er) {
$("#loading-image").show();
}
});
}
function optimizevideo() {
optWindow('output');
var vidrules = filetype;
$.ajax({
url: "../NetFileService/optvideo",
type: 'POST',
dataType: 'json',
data: vidrules,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-imageout").show();
},
complete: function () {
$("#loading-imageout").hide();
},
success: function (data) {
let originalfname = data.originalfname;
let processedfname = data.processedfname;
if (originalfname.length > 15) {
originalfname = originalfname.toString().substr(0, 4) + "..." +
originalfname.toString().substr(originalfname.length - 8);
}
if (processedfname.length > 15) {
processedfname = processedfname.toString().substr(0, 4) + "..." +
processedfname.toString().substr(processedfname.length - 8);
}
let orgsize = data.originalsize;
let optsize = data.processedfsize;
let optper = (optsize / orgsize) * 100;
let rounoff;
if (optper > 100) {
rounoff = 100;
} else {
rounoff = Math.round(optper);
}
document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
document.getElementById('outputoptperp').innerHTML = rounoff;
document.getElementById('originalfname').innerHTML = originalfname;
document.getElementById('originalsize').innerHTML = orgsize + ' kB';
document.getElementById('processedpath').href = data.processedpath;
document.getElementById('outputtable').style.display = "block";
document.getElementById('processedfname').innerHTML = processedfname;
document.getElementById('processedfsize').innerHTML = optsize + ' kB';
},
error: function (data, status, er) {
$("#loading-image").show();
}
});
}
function sourceuploadbackup() {
var css = getdefualtrulesajax();
$.ajax({
url: "https://www.jcarx.com/NetFileService/CSSService",
type: 'POST',
dataType: 'json',
data: css,
contentType: 'application/json',
mimeType: 'application/json',
beforeSend: function () {
$("#loading-image").show();
},
complete: function () {
$("#loading-image").hide();
},
success: function (data) {
},
error: function (data, status, er) {
}
});
}
function getuserrules() {
let rulesdisplay = document.getElementById("rulesdisplay").value;
return rulesdisplay;
}
function getdefualtcssrules() {
let rules =
'{' + "\n" +
'   "name"' + ':' + '"css"' + ',' + "\n" +
'   "version"' + ':' + '"1.1"' + ',' + "\n" +
'   "searchreplace"' + ':' + "\n" +
'   {' + "\n" +
'       "000"' + ':' + '"000"' + ',' + "\n" +
'       "(?i)fff"' + ':' + '"fff"' + ',' + "\n" +
'       "00f"' + ':' + '"00f"' + "\n" +
'   },' + "\n" +
'   "leaveintact"' + ':' + "\n" +
'   {' + "\n" +
'       "@media"' + ':' + '"{",' + "\n" +
'       "card"' + ':' + '"{",' + "\n" +
'       "fly"' + ':' + '"{",' + "\n" +
'       "video"' + ':' + '"{",' + "\n" +
'       "@key"' + ':' + '"{",' + "\n" +
'       "border"' + ':' + '";",' + "\n" +
'       "animation"' + ':' + '";",' + "\n" +
'       "padding"' + ':' + '";"' + "\n" +
'   }' + "\n" +
'}';
return rules;
}
function getdefualthtmlrules() {
let rules =
'{' + "\n" +
'   "name"' + ':' + '"html"' + ',' + "\n" +
'   "version"' + ':' + '"1.1"' + ',' + "\n" +
'   "searchreplace"' + ':' + "\n" +
'   {' + "\n" +
'       "000"' + ':' + '"000"' + ',' + "\n" +
'       "(?i)fff"' + ':' + '"fff"' + ',' + "\n" +
'       "00f"' + ':' + '"00f"' + "\n" +
'   },' + "\n" +
'   "remove"' + ':' + "\n" +
'   {' + "\n" +
'       "<!--"' + ':' + '"-->",' + "\n" +
'       ""' + "\n" +
'   }' + "\n" +
'}';
return rules;
}
function getdefualtjsrules() {
let rules =
'{' + "\n" +
'   "name"' + ':' + '"js"' + ',' + "\n" +
'   "version"' + ':' + '"1.1"' + ',' + "\n" +
'   "searchreplace"' + ':' + "\n" +
'   {' + "\n" +
'       "000"' + ':' + '"000"' + ',' + "\n" +
'       "(?i)fff"' + ':' + '"fff"' + ',' + "\n" +
'       "00f"' + ':' + '"00f"' + "\n" +
'   },' + "\n" +
'   "removelogs"' + ':' + "\n" +
'   {' + "\n" +
'       "",' + "\n" +
'       "",' + "\n" +
'       "",' + "\n" +
'       ""' + "\n" +
'   }' + "\n" +
'}';
return rules;
}
function reason() {
}
