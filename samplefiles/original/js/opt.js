function optWindow(showwindow) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("opttabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(showwindow).style.display = "block";
}

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
        uploadclick(e.dataTransfer.files[0]);
    });
});

function updateThumbnail(dropZoneElement, file, e) {
    let textareaElement = dropZoneElement.querySelector(".drop-zone__txt");
    //let test = dropZoneElement.getElementsByTagName("show");
    // First time - remove the prompt
    //.querySelector(".drop-zone").remove();
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
    console.log("file.type:" + file.type);
    if (file.type.startsWith("video/")) {
//alert("video dropped");
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
            document.getElementById('imagesetting').style.display = 'block';
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
            document.getElementById('rulesdisplay').value = getdefualtcssrules();
            document.getElementById('textrouter').value = "css";
        };
    } else if (file.type.startsWith("text/html")) {
        //alert("html dropped");
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
        // alert("js dropped");
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
        /*var str = file.name;
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
         } else { */
        //alert("curretnly do not support");
        var myobj = document.getElementById("drop-zone");
        myobj.remove();
        document.getElementById('text-zone').style.display = 'block';
        document.getElementById('textdisplay').value = "Please Contact Admin for support of " + file.type;
        //}
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

    console.log("Send to server only file:" + file.name);
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
        console.log('send To : ' + "https://www.jcarx.com/NetFileService/upload");
        formData.append("file", file);
        formData.append("rules", getdefualtrules());
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.jcarx.com/NetFileService/uploadjsp");
        //xhr.send(formData);
    } else if (filetype === "jsf") {
        console.log('send To : ' + "https://www.jcarx.com/NetFileService/uploadjsf");
        formData.append("file", file);
        formData.append("rules", getdefualtrules());
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.jcarx.com/NetFileService/uploadjsf");
        //xhr.send(formData);
    }
}
function sourceupload(formData, whattype) {
    if (fileName.length > 15) {
        fileName = fileName.toString().substr(0, 8) + "..." + fileName.toString().substr(fileName.length - 4);
    }
    //alert("whattype:"+whattype);
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
                document.getElementById('toolsform-zone2').style.display = "block";
                $("#loading-imageimg").hide();
                $("#netbutoptimg").show();
            } else if (whattype === "video") {
                $("#loading-imagevid").hide();
                $("#netbutoptvid").show();
            } else {
                console.log("Cannot process type");
            }
        },
        success: function (data) {
            console.log("Server Send Back:" + data);
        },
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
    //alert('ajax New I am ready for backend css optimization');
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
            //document.getElementById('originalpath').href = data.originalpath;

            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
            document.getElementById('processedpath').href = data.processedpath;

            document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
            document.getElementById('outputoptperp').innerHTML = rounoff;
            document.getElementById('originalfname').innerHTML = originalfname;
            document.getElementById('originalsize').innerHTML = orgsize + ' kB';
            //document.getElementById('originalpath').href = data.originalpath;
            document.getElementById('outputtable').style.display = "block";
            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = optsize + ' kB';
            //let downloadlink = data.processedpath;
            //document.getElementById('demolink').style.display = "block";
            console.log(data.originalfname);
            console.log(data.originalpath);
            console.log(data.originalsize);
            console.log(data.processedfname);
            console.log(data.processedfsize);
            console.log(data.processedpath);
            console.log(status);
        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("CSS Process Error" + er);
        }
    }
    );
}
function optimizejs() {
    //alert('ajax New I am ready for backend css optimization');
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
            //document.getElementById('originalpath').href = data.originalpath;

            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
            document.getElementById('processedpath').href = data.processedpath;

            document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
            document.getElementById('outputoptperp').innerHTML = rounoff;
            document.getElementById('originalfname').innerHTML = originalfname;
            document.getElementById('originalsize').innerHTML = orgsize + ' kB';
            //document.getElementById('originalpath').href = data.originalpath;
            document.getElementById('outputtable').style.display = "block";
            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = optsize + ' kB';
            //let downloadlink = data.processedpath;
            //document.getElementById('demolink').style.display = "block";
            console.log(data.originalfname);
            console.log(data.originalpath);
            console.log(data.originalsize);
            console.log(data.processedfname);
            console.log(data.processedfsize);
            console.log(data.processedpath);
            console.log(status);
        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
        }
    });
}
function optimizehtml() {
    //alert('ajax New I am ready for backend css optimization');
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
            //document.getElementById('originalpath').href = data.originalpath;

            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = data.processedfsize + ' kB';
            document.getElementById('processedpath').href = data.processedpath;

            document.getElementById('outputoptper').setAttribute("style", "width:" + rounoff + "%;");
            document.getElementById('outputoptperp').innerHTML = rounoff;
            document.getElementById('originalfname').innerHTML = originalfname;
            document.getElementById('originalsize').innerHTML = orgsize + ' kB';
            //document.getElementById('originalpath').href = data.originalpath;
            document.getElementById('outputtable').style.display = "block";
            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = optsize + ' kB';
            //let downloadlink = data.processedpath;
            //document.getElementById('demolink').style.display = "block";
            console.log(data.originalfname);
            console.log(data.originalpath);
            console.log(data.originalsize);
            console.log(data.processedfname);
            console.log(data.processedfsize);
            console.log(data.processedpath);
            console.log(status);
        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
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
    //alert('ajax New I am ready for backend css optimization');
    optWindow('output');
    // filestype,quality,anigif(yes,no)
    let imgcompress = imagecompress;//document.getElementById("imgcompress").value;
    let imgani = imageani;//document.getElementById("imgani").value;
    let imagerules = filetype + "," + imgcompress + "," + imgani;
    //alert(imagerules);
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
            document.getElementById('processedpath').href = data.processedpath;
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
    //reason();

    //alert('ajax New I am ready for backend css optimization');
    optWindow('output');
    // no json send tokens
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
            document.getElementById('processedpath').href = data.processedpath;
            //document.getElementById('originalpath').href = data.originalpath;
            document.getElementById('outputtable').style.display = "block";
            document.getElementById('processedfname').innerHTML = processedfname;
            document.getElementById('processedfsize').innerHTML = optsize + ' kB';

        },
        error: function (data, status, er) {
            $("#loading-image").show();
            alert("Server could \nbe Overwhelmed\nPlease try later\n\nThank you \nr@jcarx.com\n" + er);
        }
    });
}
function sourceuploadbackup() {
    alert('ajax New I am ready for backend css optimization');
    //document.location = 'http://localhost:8080https://www.jcarx.com/NetFileService/CSSService';
    //document.location = 'http://localhost:8080https://www.jcarx.com/NetFileService/optcss';
    var css = getdefualtrulesajax();
    // var css = '{' +
    // '"comments"' + ':' + '"css"' + ',' +
    // '"rules"' + ':' + '"1.1"' +
    // '}';

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
            console.log(data.comments);
            console.log(data.rules);
            console.log(status);
        },
        error: function (data, status, er) {
            alert("error: " + data + " status: " + status + " er:" + er);
        }
    });
}
/* reads from UI only */
function getuserrules() {
    let rulesdisplay = document.getElementById("rulesdisplay").value;
    return rulesdisplay;
}
/* following sets rules UI for web */
function getdefualtcssrules() {
    let rules =
            '{' + "\n" +
            '   "name"' + ':' + '"css"' + ',' + "\n" +
            '   "version"' + ':' + '"1.1"' + ',' + "\n" +
            '   "searchreplace"' + ':' + "\n" +
            '   {' + "\n" +
            '       "000000"' + ':' + '"000"' + ',' + "\n" +
            '       "(?i)ffffff"' + ':' + '"fff"' + ',' + "\n" +
            '       "0000ff"' + ':' + '"00f"' + "\n" +
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
            '       "000000"' + ':' + '"000"' + ',' + "\n" +
            '       "(?i)ffffff"' + ':' + '"fff"' + ',' + "\n" +
            '       "0000ff"' + ':' + '"00f"' + "\n" +
            '   },' + "\n" +
            '   "remove"' + ':' + "\n" +
            '   {' + "\n" +
            '       "<!--"' + ':' + '"-->",' + "\n" +
            '       "/*"' + ':' + '"*/"' + "\n" +
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
            '       "000000"' + ':' + '"000"' + ',' + "\n" +
            '       "(?i)ffffff"' + ':' + '"fff"' + ',' + "\n" +
            '       "0000ff"' + ':' + '"00f"' + "\n" +
            '   },' + "\n" +
            '   "removelogs"' + ':' + "\n" +
            '   {' + "\n" +
            '       "console"' + ':' + '");",' + "\n" +
            '       "alert"' + ':' + '");",' + "\n" +
            '       "/*"' + ':' + '"*/",' + "\n" +
            '       "/**"' + ':' + '"*/"' + "\n" +
            '   }' + "\n" +
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
contract as needed \n\
\n\
\nHas build in support for registered\n\
users to use optimized image's/videos \n\
from a fast static FileServices API\n\
using token based Architecture \n\
\n\
\nCan Demo Full Features Live\n\
\n\
Thank You\n\
Ravi Manthena\n\
r@jcarx.com\n\
manthena1@gmail.com");
}
