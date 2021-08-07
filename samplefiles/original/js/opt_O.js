document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    console.log("drop-zone__input");
    const dropZoneElement = inputElement.closest(".drop-zone");
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]); // passes back stuff we need
            console.log(scope + " : " + array[i]);
        }
    };
    var div_list = document.querySelectorAll('div'); // returns NodeList
    var div_array = [div_list]; // converts NodeList to Array
    div_array.forEach(div => {
        console.log(div);
    });
    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
        dropZoneElement.removeEventListener("click", e);
        console.log("click");
    });
    inputElement.addEventListener("change", (e) => {
        console.log("change");
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0], e);
            let data = inputElement.files[0];
            uploadclick(data);
            dropZoneElement.removeEventListener("change", e);
        }
    });
    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        console.log("dragover");
        dropZoneElement.classList.add("drop-zone--over");
    });
    ["dragleave", "dragend"].forEach((type) => {
        console.log("dragleave - dragend");
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });
    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log("drop");
        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0], e);
            dropZoneElement.removeEventListener("drop", e);
        }
        dropZoneElement.classList.remove("drop-zone--over");
        uploaddrop(e, e.dataTransfer.files[0]);
    });
});
/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file, e) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    let textareaElement = dropZoneElement.querySelector(".drop-zone__txt");
    //let test = dropZoneElement.getElementsByTagName("show");
    console.log(".drop-zone__thumb:" + thumbnailElement);
    // First time - remove the prompt
    //.querySelector(".drop-zone").remove();
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
    if (dropZoneElement.querySelector(".drop-zone__thumb")) {
        dropZoneElement.querySelector(".drop-zone__thumb").remove();
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
    console.log("file.type:" + file.type);
    if (file.type.startsWith("video/")) {
//alert("video ) dropped");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        // clean up done 
        var videozone = document.getElementById("video-zone");
        var videoplay = document.getElementById("videofile");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            document.getElementById('video-zone').style.display = 'block';
            videoplay.src = reader.result;
        };
    } else if (file.type.startsWith("image/")) {
//alert("image dropped");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            document.getElementById('image-zone').style.display = 'block';
            document.getElementById('imagedisplay').src = reader.result;
        };
    } else if (file.type.startsWith("text/css")) {
//alert("css dropped");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var base64result = reader.result.split(';base64,')[1];
            document.getElementById('text-zone').style.display = 'block';
            document.getElementById('textdisplay').value = atou(base64result);
        };
    } else if (file.type.startsWith("text/html")) {
        alert("html dropped");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var base64result = reader.result.split(';base64,')[1];
            document.getElementById('text-zone').style.display = 'block';
            document.getElementById('textdisplay').value = atou(base64result);
        };
    } else if (file.type.startsWith("text/javascript")) {
        alert("js dropped");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var base64result = reader.result.split(';base64,')[1];
            document.getElementById('text-zone').style.display = 'block';
            document.getElementById('textdisplay').value = atou(base64result);
        };
    } else {
        var str = file.name;
        const [pluginName, fileExtension] = str.split(/\.(?=[^\.]+$)/);
        filetype = fileExtension;
        if (filetype === "jsp") {
            alert("jsp dropped");
            var myobj = document.getElementById("drop-zone");
            myobj.remove();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var base64result = reader.result.split(';base64,')[1];
                document.getElementById('text-zone').style.display = 'block';
                document.getElementById('textdisplay').value = atou(base64result);
            };
        } else if (filetype === "jsf") {
            alert("jsf dropped");
            var myobj = document.getElementById("drop-zone");
            myobj.remove();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var base64result = reader.result.split(';base64,')[1];
                document.getElementById('text-zone').style.display = 'block';
                document.getElementById('textdisplay').value = atou(base64result);
            };
        } else {
            alert("curretnly do not support");
            var myobj = document.getElementById("drop-zone");
            myobj.remove();
            document.getElementById('text-zone').style.display = 'block';
            document.getElementById('textdisplay').value = "Please Contact Admin for support of " + file.type;
        }
    }
}
function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
function uploaddrop(event, file) {
    //event.stopPropagation();
    //event.preventDefault();
    //console.log("Send to server from event:" + file.name);
    //var formData = new FormData();
    //formData.append("file", event.dataTransfer.files[0]);
    //formData.append("rules", getdefualtrules());
    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", "/NetFileService/upload");
    //xhr.send(formData);
    uploadclick(file);
}

let fileName;
function uploadclick(file) {
    event.stopPropagation();
    event.preventDefault();
    if (file.size > 988608) { // 8mb=8388608 make it 6188608
        reason();
        return;
    }

    console.log("Send to server only file:" + file.name);
    fileName = file.name;
    var formData = getFormdataToUpload(file);
    if (filetype === "video") {
        //var xhr = new XMLHttpRequest();
        //console.log('send To : ' + "/NetFileService/uploadvid");
        //xhr.open("POST", "/NetFileService/uploadvid");
        //xhr.send(formData);
        //sourceupload(formData, "video");
    } else if (filetype === "image") {
        console.log('send To : ' + "/NetFileService/uploadimg");
        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "/NetFileService/uploadimg");
        //xhr.send(formData);
        sourceupload(formData, "image");
    } else if (filetype === "css") {
        console.log('send To : ' + "/NetFileService/upload");
        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "/NetFileService/upload");
        //xhr.send(formData);
        sourceupload(formData, "text");
    } else if (filetype === "html") {
        console.log('send To : ' + "/NetFileService/uploadhtml");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/NetFileService/uploadhtml");
        //xhr.send(formData);
    } else if (filetype === "js") {
        console.log('send To : ' + "/NetFileService/uploadjs");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/NetFileService/uploadjs");
        //xhr.send(formData);
    } else if (filetype === "jsp") {
        console.log('send To : ' + "/NetFileService/uploadjsp");
        formData.append("file", file);
        formData.append("rules", getdefualtrules());
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/NetFileService/uploadjsp");
        //xhr.send(formData);
    } else if (filetype === "jsf") {
        console.log('send To : ' + "/NetFileService/uploadjsf");
        formData.append("file", file);
        formData.append("rules", getdefualtrules());
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/NetFileService/uploadjsf");
        //xhr.send(formData);
    }
}
function sourceupload(formData, whattype) {
    if (fileName.length > 15) {
        fileName = fileName.toString().substr(0, 8) + "..." + fileName.toString().substr(fileName.length - 4);
    }
    $.ajax({
        url: "/NetFileService/upload",
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
                console.log("Cannot process type");
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
                $("#loading-imageimg").hide();
                $("#netbutoptimg").show();
            } else if (whattype === "video") {
                $("#loading-imagevid").hide();
                $("#netbutoptvid").show();
            } else {
                console.log("Cannot process type");
            }
        },
        success: function (data) {},
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
            //alert("error: " + data + " status: " + status + " er:" + er);
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
        formData.append("rules", getdefualtrules());
        filetype = "html";
    } else if (file.type.startsWith("text/javascript")) {
        formData.append("file", file);
        formData.append("rules", getdefualtrules());
        filetype = "js";
    } else {
        var str = file.name;
        const [pluginName, fileExtension] = str.split(/\.(?=[^\.]+$)/);
        filetype = fileExtension;
    }
    return formData;
}

function optimizecss() {
    //alert('ajax New I am ready for backend css optimization');
    optWindow('output');
    var css = getcssrules();
    $.ajax({
        url: "/NetFileService/optcss",
        type: 'POST',
        dataType: 'json',
        data: css,
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

            document.getElementById('originalfname').innerHTML = originalfname;
            document.getElementById('originalsize').innerHTML = data.originalsize + ' kB';
            //document.getElementById('originalpath').href = data.originalpath;

            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
            document.getElementById('processedpath').href = data.processedpath;
            console.log(data.originalfname);
            console.log(data.originalpath);
            console.log(data.originalsize);
            console.log(status);
        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
        }
    });
}

function getcssrules() {
    let comments = document.getElementById("comment").value;
    let newline = document.getElementById("newline").value;
    let extrachr = document.getElementById("extrachr").value;
    let useroptions = '"comments"' + ':' + '"' + comments + '"' + ',' +
            '"newline"' + ':' + '"' + newline + '"' + ',' +
            '"extrachr"' + ':' + '"' + extrachr + '"' + ',';
    // get user edits and append the top three for users wish
    let rules =
            '"name"' + ':' + '"css"' + ',' +
            '"version"' + ':' + '"1.1"' + ',' +
            '"searchreplace"' + ':' +
            '{' +
            '"000000"' + ':' + '"000"' + ',' +
            '"(?i)ffffff"' + ':' + '"fff"' + ',' +
            '"0000ff"' + ':' + '"00f"' +
            '},' +
            '"leaveintact"' + ':' +
            '{' +
            '"@me"' + ':' + '"{",' +
            '"car"' + ':' + '"{",' +
            '"fly"' + ':' + '"{",' +
            '"vid"' + ':' + '"{",' +
            '"@ke"' + ':' + '"{",' +
            '"bor"' + ':' + '";",' +
            '"ani"' + ':' + '";",' +
            '"pad"' + ':' + '";"' +
            '},' +
            '"arrayplaceholder"' + ':' +
            '[' + '"i", "am", "not", "used", "for", "now"' + ']';
    return '{' + useroptions + rules + '}';
}
function optimizeimage() {
    //alert('ajax New I am ready for backend css optimization');
    optWindow('output');
    // filestype,quality,anigif(yes,no)
    var imagerules = filetype + "," + "10" + "," + "no";
    $.ajax({
        url: "/NetFileService/optimage",
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
            // outputorgper outputoptper width%  spand outputorgperp outputoptperp
            let orgsize = data.originalsize;
            let optsize = data.processedfsize;
            let optper = (optsize / orgsize) * 100;
            let rounoff;
            if (optper > 100) {
                rounoff = 100;
            } else {
                rounoff = Math.round(optper);
            }
            console.log("percentage :" + rounoff);
            document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
            document.getElementById('outputoptperp').innerHTML = rounoff;
            document.getElementById('originalfname').innerHTML = originalfname;
            document.getElementById('originalsize').innerHTML = orgsize + ' kB';
            //document.getElementById('originalpath').href = data.originalpath;
            document.getElementById('outputtable').style.display = "block";
            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = optsize + ' kB';
            let downloadlink = data.processedpath;
            document.getElementById('demolink').style.display = "block";
            var s = downloadlink.split("/").reverse();
            s.splice(0, 1);
            let htmllink = (s.reverse().join("/")) + "/indexdemo.html";
            //alert(htmllink);
            //document.getElementById('outputindexhtml').href = htmllink;
            $("#includedContent").load(htmllink);
            console.log(data.originalfname);
            console.log(data.originalpath);
            console.log(data.originalsize);
            console.log(status);
        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
        }
    });
}
function optimizevideo() {
    reason();
    /*
     //alert('ajax New I am ready for backend css optimization');
     optWindow('output');
     // no json send tokens
     var vidrules =filetype;
     $.ajax({
     url: "/NetFileService/optvideo",
     type: 'POST',
     dataType: 'json',
     data: vidrules,
     contentType: 'application/json',
     mimeType: 'application/json',
     beforeSend: function () {
     $("#loading-vid").show();
     },
     complete: function () {
     $("#loading-vid").hide();
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
     
     document.getElementById('originalfname').innerHTML = originalfname;
     document.getElementById('originalsize').innerHTML = data.originalsize + ' kB';
     //document.getElementById('originalpath').href = data.originalpath;
     
     document.getElementById('processedfname').innerHTML = processedfname;
     document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
     document.getElementById('processedpath').href = data.processedpath;
     
     console.log(data.originalfname);
     console.log(data.originalpath);
     console.log(data.originalsize);
     console.log(status);
     },
     error: function (data, status, er) {
     $("#loading-image").show();
     alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
     }
     });
     * 
     */
}
function sourceuploadbackup() {
    alert('ajax New I am ready for backend css optimization');
    //document.location = 'http://localhost:8080/NetFileService/CSSService';
    //document.location = 'http://localhost:8080/NetFileService/optcss';
    var css = getdefualtrulesajax();
    // var css = '{' +
    // '"comments"' + ':' + '"css"' + ',' +
    // '"rules"' + ':' + '"1.1"' +
    // '}';

    $.ajax({
        url: "/NetFileService/CSSService",
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
            console.log(data.comments);
            console.log(data.rules);
            console.log(status);
        },
        error: function (data, status, er) {
            alert("error: " + data + " status: " + status + " er:" + er);
        }
    });
}
function optWindow(showwindow) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("opttabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("opttablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(showwindow).style.display = "block";
    //evt.currentTarget.className += "active";
}

function getdefualtrules() {
    let rules =
            '{' +
            '"name"' + ':' + '"css"' + ',' +
            '"version"' + ':' + '"1.1"' + ',' +
            '"searchreplace"' + ':' +
            '{' +
            '"000000"' + ':' + '"000"' + ',' +
            '"(?i)ffffff"' + ':' + '"fff"' + ',' +
            '"0000ff"' + ':' + '"00f"' +
            '},' +
            '"leaveintact"' + ':' +
            '{' +
            '"@me"' + ':' + '"{",' +
            '"car"' + ':' + '"{",' +
            '"fly"' + ':' + '"{",' +
            '"vid"' + ':' + '"{",' +
            '"@ke"' + ':' + '"{",' +
            '"bor"' + ':' + '";",' +
            '"ani"' + ':' + '";",' +
            '"pad"' + ':' + '";"' +
            '},' +
            '"arrayplaceholder"' + ':' +
            '[' + '"i", "am", "not", "used", "for", "now"' + ']' +
            '}';
    return rules;
}

function reason() {
    alert("jcarX API is ready to optimize images/video's\n\
\n\
\n\Limited Image Size to 6MB and \n\
\n\Disable video Optimization\n\n\
Looking for Venture Capital or \n\
Potencial Sale along with Support/Upgrade \n\
contract as needed\n\
\nCan Demo Full Features Live\n\
\n\
Thank You\n\
Ravi Manthena\n\
r@jcarx.com\n\
manthena1@gmail.com");
}
