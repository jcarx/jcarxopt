    function updatelikes(ip, email, theme)
{
var device = getdevice();
var url = '/NetAppsOcean/ServletLikesService?device=' + device +
'&ip=' + ip +
'&email=' + email +
'&theme=' + theme;
document.location = url;
}
function getdevice() {
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
return "mobile";
} else {
return "web";
}
}
function validateLogin(frm)
{
event.preventDefault();
if (frm.email.value == "")
{
frm.email.focus();
return false;
}
if (frm.password.value == "")
{
frm.password.focus();
return false;
}
document.loginForm.submit();
}
function mouseEnter() {
var x = Math.floor((Math.random() * 999) + 1000);
document.getElementById("randompin").innerHTML = 'Your Pin : ' + x;
}
function validateRegisterrecap(frm)
{
event.preventDefault();
if (frm.email.value == "")
{
frm.email.focus();
return false;
}
if (!(ValidateEmailFormat(frm.email.value))) {
frm.email.focus();
return false;
}
var pw = frm.password.value;
if (pw == "") {
return false;
}
if (pw.length < 8) {
return false;
}
if (pw.length > 12) {
return false;
}
var genpin = document.getElementById("randompin").innerHTML;
var pin = frm.pin.value;
if (genpin.length < 13)
{
return false;
}
if (pin == "")
{
frm.pin.focus();
return false;
}
if (genpin.length > 13) {
var subgenpen = genpin.substr(11);
if (subgenpen == pin) {
document.registerForm.submit();
} else {
}
}
}
function ValidateEmailFormat(inputText)
{
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if (inputText.match(mailformat))
{
return true;
} else
{
return false;
}
}
function mouseEnterComment() {
var x = Math.floor((Math.random() * 999) + 1000);
document.getElementById("randompincomment").innerHTML = 'Your Pin : ' + x;
}
function validateComment(frm)
{
event.preventDefault();
if (frm.email.value == "")
{
frm.email.focus();
return false;
}
if (!(ValidateEmailFormat(frm.email.value))) {
frm.email.focus();
return false;
}
if (frm.comment.value == "")
{
frm.comment.focus();
return false;
}
var genpin = "";
try {
genpin = document.getElementById("randompincomment").innerHTML;
} catch (error) {
document.commentForm.submit();
}
var pin = frm.pin.value;
if (pin.length > 14)
{
return false;
}
if (pin.length < 4)
{
return false;
}
if (pin.value == "")
{
frm.pin.focus();
return false;
}
if (genpin.length > 13) {
var subgenpen = genpin.substr(11);
if (subgenpen == pin) {
document.commentForm.submit();
} else {
return false;
}
}
}
function validateSQLRunner(frm)
{
event.preventDefault();
if (frm.sql.value == "") {
frm.sql.focus();
return false;
}
document.sqlrunnerForm.submit();
}
function validateCreateBlog(frm)
{
event.preventDefault();
if (frm.title.value == "")
{
frm.blogname.focus();
return false;
}
if (frm.content.value == "")
{
frm.content.focus();
return false;
}
if (frm.author.value == "")
{
frm.content.focus();
return false;
}
document.newblog.submit();
}
function loadjscssfile(filename, filetype) {
if (filetype == "css") { //if filename is an external CSS file
var fileref = document.createElement("link")
fileref.setAttribute("rel", "stylesheet")
fileref.setAttribute("type", "text/css")
fileref.setAttribute("href", filename)
}
if (typeof fileref != "undefined") {
document.getElementsByTagName("head")[0].appendChild(fileref)
}
}
function shareevent(str) {
if (str == "fb") {
fbshare();
} else if (str == "yt") {
ytshare();
} else if (str == "ln") {
lnshare();
} else if (str == "tw") {
twshare();
} else {
ytshare();
}
}
function fbshare() {
window.open("https://www.facebook.com/sharer.php", rel = "noopener");
}
function ytshare() {
window.open("https://www.youtube.com/channel/UCH0UM75l3iHecOET4MvzIUw", rel = "noopener");
}
function lnshare() {
window.open("https://www.linkedin.com/shareArticle?mini=true", rel = "noopener");
}
function twshare() {
window.open("https://twitter.com/intent/tweet", rel = "noopener");
}
function copyFunction(copiedtext) {
window.prompt("Copy to clipboard: Ctrl+C, Enter", copiedtext);
}
function copyoutFunc() {
var tooltip = document.getElementById("myTooltip");
tooltip.innerHTML = "Copy to clipboard";
}
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
