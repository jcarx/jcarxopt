/** @author Ravi Manthena */
function updatelikes(ip, email, theme)
{
    var device = getdevice();
    /*alert("device:" + device + "\n" +
     "ip:" + ip + "\n" +
     "email:" + email + "\n" +
     "theme:" + theme);*/

    var url = 'ServletLikesService?device=' + device +
            '&ip=' + ip +
            '&email=' + email +
            '&theme=' + theme;
    //alert(url);
    document.location = url;

    //document.loginForm.submit();
}
function getdevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //document.write("mobile");
        //alert("it's Mobile\n" + navigator.userAgent);
        return "mobile";
    } else {
        return "web";
        //alert("Not Mobile\n" + navigator.userAgent);
        //document.write("not mobile");
    }
}
function validateLogin(frm)
{
    event.preventDefault();

    if (frm.email.value == "")
    {
        alert("User Name can not be left blank");
        frm.email.focus();
        return false;
    }
    if (frm.password.value == "")
    {
        alert("Password can not be left blank");
        frm.password.focus();
        return false;
    }
    document.loginForm.submit();
}

function mouseEnter() {
    // this will get us a 4 digit random number
    var x = Math.floor((Math.random() * 999) + 1000);
    document.getElementById("randompin").innerHTML = 'Your Pin : ' + x;
}

function validateRegisterrecap(frm)
{
    event.preventDefault();
    if (frm.email.value == "")
    {
        alert("Please enter valid Email");
        frm.email.focus();
        return false;
    }
    // check if the email syntax makes sense
    if (!(ValidateEmailFormat(frm.email.value))) {
        alert("You have entered an invalid email address!");
        frm.email.focus();
        return false;
    }

    var pw = frm.password.value;
    if (pw == "") {
        alert("Password cannot be empty");
        return false;
    }
    if (pw.length < 8) {
        alert("Password length must be atleast 8 characters");
        return false;
    }
    if (pw.length > 12) {
        alert("Password length must not exceed 15 characters");
        return false;
    }

    var genpin = document.getElementById("randompin").innerHTML;
    var pin = frm.pin.value;
    if (genpin.length < 13)
    {
        alert("Please Hoover Over Get Pin");
        return false;
    }
    if (pin == "")
    {
        alert("Please enter your Pin");
        frm.pin.focus();
        return false;
    }
    if (genpin.length > 13) {
        var subgenpen = genpin.substr(11);
        if (subgenpen == pin) {
            //alert("good to go" + frm.email.value + " " + pin + " " + genpin.length);
            //submit to backend service where we do addtional check's and processes
            document.registerForm.submit();
        } else {
            alert("Pin does't match, Try again");
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
    console.log(x);
    document.getElementById("randompincomment").innerHTML = 'Your Pin : ' + x;
}
function validateComment(frm)
{
    event.preventDefault();
    if (frm.email.value == "")
    {
        alert("Please enter your Email");
        frm.email.focus();
        return false;
    }
    if (!(ValidateEmailFormat(frm.email.value))) {
        alert("You have entered an invalid email address!");
        frm.email.focus();
        return false;
    }
    if (frm.comment.value == "")
    {
        alert("Please enter your comment");
        frm.comment.focus();
        return false;
    }

    // check if new user is newvalidate
    var genpin = "";
    try {
        genpin = document.getElementById("randompincomment").innerHTML;
    } catch (error) {
        // registered user no worries
        document.commentForm.submit();
    }
    var pin = frm.pin.value;

    //alert("Pin is " + pin + " genpin is " + genpin);

    if (pin.length > 14)
    {
        alert("Please enter your Pin 1" + pin);
        return false;
    }
    if (pin.length < 4)
    {
        alert("Please enter your Pin 2" + pin);
        return false;
    }
    if (pin.value == "")
    {
        alert("Please enter your Pin 3" + genpin);
        frm.pin.focus();
        return false;
    }
    if (genpin.length > 13) {
        var subgenpen = genpin.substr(11);
        if (subgenpen == pin) {
            //alert("good to go" + frm.email.value + " " + pin + " " + genpin.length);
            document.commentForm.submit();
        } else {
            alert("Pin does't match, Try again");
            return false;
        }
    }
}
/* check for Null input */
function validateSQLRunner(frm)
{
    event.preventDefault();

    if (frm.sql.value == "") {
        alert("sql cannot be empty ");
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
        alert("Please enter valid Title");
        frm.blogname.focus();
        return false;
    }
    if (frm.content.value == "")
    {
        alert("Please enter your Content");
        frm.content.focus();
        return false;
    }
    if (frm.author.value == "")
    {
        alert("Please enter Author Name");
        frm.content.focus();
        return false;
    }
    document.newblog.submit();
}
function loadjscssfile(filename, filetype) {
    //http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml#:~:text=To%20load%20a%20.,location%20within%20the%20document%20tree.
    if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    //location.reload(true);
}
// sharing is caring
function shareevent(str) {
    console.log(str);
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
/* tooltip copy */
function copyFunction(copiedtext) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", copiedtext);
    //tooltip.innerHTML = "Copied:"+ copyText.value;
}
function copyoutFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}