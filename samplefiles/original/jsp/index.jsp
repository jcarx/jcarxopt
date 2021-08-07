<!DOCTYPE html>
<%@page import="com.jcarx.util.NetLog" %>
<%@ page import="com.jcarx.util.NetClientHeaderInfo" %>
<%@ page import="com.jcarx.util.Utility" %>
<%
    String path = session.getServletContext().getContextPath();
    String userip = NetClientHeaderInfo.getClientIp(request);
    NetLog.logInfo("jaXit Index.JSP Request= " + userip + " <br>yyyy.MM.dd.HH.mm.ss= " + Utility.getTimeStr());
%>
<html lang="en">
    <head>
        <title>jcarX</title>
        <!-- robots -->
        <meta name="robots" content="noindex, nofollow"/>  
        <link rel="icon" type="image/png" 
              href="<%=path%>/assets/images/pwa/justnet32.png">
        <link rel="manifest" href="<%=path%>/assets/manifest.json">       
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#b3d7ff"/>
        <link rel="apple-touch-icon" href="<%=path%>/assets/images/pwa/icon-192.png"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="keywords" content="js,css,html,image optimization tool"/>
        <meta name="description" content="Optimization Tool for CSS HTML JS and Images"/>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta property="og:title" content="Optimization Tool for Web and Mobile Content" />
        <meta property="og:description" content="Optimization Tool for CSS HTML JS and Images" />
        <meta property="og:url" content="https://www.jcarx.com" />
        <meta property="og:image" content="https://www.jcarx.com/assets/images/pwa/icons-192.png" />
        <meta property="og:site_name" content="www.jcarx.com" />
        <meta property="og:type" content="Web Mobile Optimization Tools Online" />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content="jcarX"/>
        <meta name="twitter:description" content="Optimization Tool for CSS HTML JS and Images"/>
        <meta name="twitter:site" content="https://www.jcarx.com"/>
        <meta name="twitter:image" content="https://www.jcarx.com/assets/images/pwa/icons-192.png"/>
        <meta name="twitter:creator" content="@manthenar"/>
        
        <jsp:include page="jspincludes/head.jsp" /> 
    </head>
    <body onload="optWindow('input')">
        <jsp:include page="jspincludes/topnavigation.jsp" />
        <div class="container-fluid">  
            <div class="row content">
                <!-- jsp:include page="jspincludes/leftadds.jsp" / -->
                <div class="col-sm-8 text-left"> 
                    <center>
                        <br>
                        <table class="optjcarxtablemain">
                            <tr>
                                <td>
                                    <div class="topopttab">
                                        <a href="#" class="netbutopttop" onclick="location.reload();">
                                            &nbsp;&nbsp;&#127968;&nbsp;&nbsp;</a>
                                        <a href="#" class="netbutopttop" onclick="optWindow('input');">Input</a>
                                        <a href="#" class="netbutopttop" onclick="optWindow('output');">Output</a>

                                        <span class='logosignnormal' style='float: right'>jcarX &nbsp;v1.2&nbsp;&nbsp;</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>  
                                    <div id="input" class="opttabcontent">
                                        <table width="100%">
                                            <td width="70%">
                                                <div class="drop-zone" id="drop-zone">
                                                    <span class="drop-zone__prompt"><br><br>
                                                        Tap or Drop<br><br>to<br><br>
                                                        upload your file
                                                        <br><br><br><br>
                                                        Optimize your files<br><br>
                                                        for Web / Mobile<br>
                                                    </span><br><br><br><br>
                                                    <input style="display:none" type="file" name="file" class="drop-zone__input">
                                                </div>
                                                <div class="text-zone" id="text-zone"> 
                                                    <textarea class="textdisplay disabledInput" id="textdisplay" rows=10 cols=10 disabled>
                                                    </textarea>
                                                    <div class="netbutoptdiv" >
                                                        <center>
                                                            <table class="netbutopttable">
                                                                <tr>
                                                                    <td class="netbutopttable-td">
                                                                        <div id="fileuploadnametxt">&nbsp;&nbsp;</div></td>
                                                                    <td class="netbutopttable-td">
                                                                        <a href="javascript:optimizeweb();" id="textrouter"> 
                                                                            <div class="netbutton" id="netbutopttxt" hidden>                                               
                                                                                &#10148;&nbsp;Optimize&nbsp;&#128193;
                                                                            </div>
                                                                        </a>
                                                                    </td>
                                                                    <td class="netbutopttable-td">
                                                                        <div> <img src="<%=path%>/images/progress.gif" 
                                                                                   class="loading-image" id="loading-imagetxt" hidden/></div>
                                                                    </td>                              
                                                                </tr>
                                                            </table>
                                                        </center>
                                                    </div>
                                                </div>
                                                <div class="image-zone" id="image-zone"> 
                                                    <img id="imagedisplay" class="imagedisplay" src="" alt="alt"/><img>
                                                    <div class="netbutoptdiv" >
                                                        <center>
                                                            <table class="netbutopttable">
                                                                <tr>
                                                                    <td class="netbutopttable-td-center">
                                                                        <div id="fileuploadnameimg">&nbsp;&nbsp;</div></td>
                                                                    <td class="netbutopttable-td">
                                                                        <a href="javascript:optimizeimage();"> 
                                                                            <div class="netbutton" id="netbutoptimg" hidden>                                               
                                                                                &#10148;&nbsp;Optimize&nbsp;&#128193;
                                                                            </div>
                                                                        </a>
                                                                    </td>
                                                                    <td class="netbutopttable-td">
                                                                        <div> <img src="<%=path%>/images/progress.gif" 
                                                                                   class="loading-image" id="loading-imageimg" hidden/></div>
                                                                    </td>                              
                                                                </tr>
                                                            </table>
                                                        </center>
                                                    </div>
                                                </div>
                                                <div class="video-zone" id="video-zone">
                                                    <center>
                                                        <div id="videodisplay" class="videodisplay">           
                                                            <div class="videofilediv">
                                                                <video id="videofile" autoplay muted loop width="480">
                                                                    <source src=""/>
                                                                </video>  
                                                            </div>
                                                        </div>
                                                    </center>
                                                    <div class="netbutoptdiv" >
                                                        <center>
                                                            <table class="netbutopttable">
                                                                <tr>
                                                                    <td class="netbutopttable-td-center">
                                                                        <div id="fileuploadnamevid">&nbsp;&nbsp;</div></td>
                                                                    <td class="netbutopttable-td">
                                                                        <a href="javascript:optimizevideo();"> 
                                                                            <div class="netbutton" id="netbutoptvid" hidden>                                               
                                                                                &#10148;&nbsp;Optimize&nbsp;&#128193;
                                                                            </div>
                                                                        </a>
                                                                    </td>
                                                                    <td class="netbutopttable-td">
                                                                        <div> <img src="<%=path%>/images/progress.gif" 
                                                                                   class="loading-image" id="loading-vid" hidden/></div>
                                                                    </td>                              
                                                                </tr>
                                                            </table>
                                                        </center>
                                                    </div>
                                                </div>
                                            </td>
                                            <td width="30%">
                                                <div class="tools-zone" id="tools-zone">
                                                    <div class='opt-buttondivopt'>
                                                        <center class='fonttinyfancy' style='margin-top: -12px'>Support Share</center>
                                                        <div class="divsharebtnopt">
                                                            <img src="<%=path%>/images/fb32.webp" 
                                                                 class="shareimghvr" alt="Facebook" width="26" height="26"
                                                                 onclick="shareevent('fb')"
                                                                 >
                                                            <img src="<%=path%>/images/yt32.webp" 
                                                                 class="shareimghvr" alt="YouTube" width="26" height="26" 
                                                                 onclick="shareevent('yt')"
                                                                 >
                                                            <img src="<%=path%>/images/ln32.webp" 
                                                                 class="shareimghvr" alt="Linkden" width="26" height="26"
                                                                 onclick="shareevent('ln')"
                                                                 >
                                                            <img src="<%=path%>/images/tw32.webp" 
                                                                 class="shareimghvr" alt="Twitter" width="26" height="26"
                                                                 onclick="shareevent('tw')"
                                                                 >
                                                            <a href="https://wa.me/919989370575" target="_blank" rel="noopener">
                                                                <img src="<%=path%>/images/em32.webp" 
                                                                     class="shareimghvr" alt="Whatsup" width="26" height="26"></a>
                                                        </div>
                                                    </div>
                                                    <div class="toolsform-zone1" id="toolsform-zone1">
                                                        <div class="animateopttext">
                                                            <center>
                                                                <br>
                                                                &nbsp;Optimize Images <br>
                                                                .gif .gif(ani) .png .jpeg<br><br>
                                                                &nbsp;Optimize Mobile/Web <br>
                                                                .html .css .js<br><br>
                                                                &nbsp;Optimize Videos <br>
                                                                &nbsp;mp4<br><br> 
                                                                &nbsp;Contact<br>
                                                                bulkloads, more formats<br><br>
                                                            </center>
                                                        </div>
                                                        <br>
                                                    </div>
                                                    <div class="toolsform-zone2" id="toolsform-zone2">
                                                        <div class="toolsform-user fonttiny"> 
                                                            <br>
                                                            <div id="imagesetting" class="imagesetting">
                                                                &nbsp;Image Resolution<br>
                                                                <label>&nbsp;&nbsp;min&nbsp;&nbsp;&nbsp;
                                                                    <input type="radio" name="imagecompress" onclick="updateimagecompress(0)">    
                                                                </label><br>                                               
                                                                <label >&nbsp;&nbsp;med&nbsp;&nbsp;
                                                                    <input type="radio" name="imagecompress" onclick="updateimagecompress(5)"
                                                                           checked>
                                                                </label><br>
                                                                <label >&nbsp;&nbsp;max&nbsp;&nbsp;
                                                                    <input type="radio" name="imagecompress" onclick="updateimagecompress(10)"> 
                                                                </label><br><hr>
                                                                &nbsp;Is Image Animated<br>
                                                                <label>&nbsp;&nbsp;no&nbsp;&nbsp;&nbsp;
                                                                    <input type="radio" name="ani" onclick="updateimageani('no')" 
                                                                           checked>    
                                                                </label><br>
                                                                <label >&nbsp;&nbsp;yes&nbsp;&nbsp;
                                                                    <input type="radio" name="ani" onclick="updateimageani('yes')">
                                                                </label><br><hr>
                                                            </div>
                                                            <br>
                                                        </div>
                                                    </div>
                                                    <div class="toolsform-advanced" id="toolsform-advanced">                                
                                                        <button class='toolsform-advancedtxt netbutton' onclick="enablejason();">Advance (Enable)</button>
                                                        <button class='toolsform-advancedtxthelp netbutton' onclick="optWindow('help');">Help</button>   
                                                    </div>
                                                    <div class="rules-zone" id="rules-zone">
                                                        <textarea disabled class="rulesdisplay" id="rulesdisplay" 
                                                                  rows="10" cols="5"> 
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </td>
                                        </table>
                                    </div>             
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="output" class="opttabcontent">
                                        <table class="optjcarxtablegeneric" width="100%">
                                            <td width="100%">
                                                <div>
                                                    <div class="output-zone"> 
                                                        <center>
                                                            <div> <img src="<%=path%>/images/progress.gif" 
                                                                       class="loading-image outputresultswaitani" id="loading-imageout" hidden/>
                                                            </div>
                                                            <div id="outputtable"  class="outputtable outputresultsani">
                                                                <br><br><br><br>
                                                                <table class="outputboder"><!-- tr>&nbsp;</tr><tr>&nbsp;</tr><tr>&nbsp;</tr -->
                                                                    <tr>
                                                                        <th class="logosignnormal">jcarX&nbsp;v1.2</th>
                                                                        <th><div style="text-align: center">Original</div></th>
                                                                        <th><div style="text-align: center">Optimized</div></th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><div style="float: left">FileName</div></th>
                                                                        <td class="outputpadcenter"><div id="originalfname"></div></td>
                                                                        <td class="outputpadcenter">
                                                                            <div id="processedfname">
                                                                            </div></td>                                                
                                                                    </tr>
                                                                    <tr>
                                                                        <th><div style="float: left">FileSize</div></th>                                                 
                                                                        <td class="outputpadcenter"><div id="originalsize">4000</div></td>
                                                                        <td class="outputpadcenter">
                                                                            <div id="processedfsize">2000</div></td>                                           
                                                                    </tr>
                                                                    <tr>
                                                                        <th><div style="float: left">Size %</div></th>    
                                                                        <td class="outputpadcenter">
                                                                            <div class="outputorgper" id="outputorgper">
                                                                                <span id="outputorgperp">&nbsp;100</span>
                                                                            </div>
                                                                        </td>
                                                                        <td class="outputpadcenter">
                                                                            <div class="outputoptper" id="outputoptper"> 
                                                                                <span id="outputoptperp">&nbsp;</span>
                                                                            </div>
                                                                        </td> 
                                                                    </tr>
                                                                    <tr>
                                                                        <th><div style="float: left">Download</div></th>                                                      
                                                                        <td>&nbsp;</td>                                         
                                                                        <td>
                                                                            <a href="#" class="netbutton" id="processedpath" download>Download</a>
                                                                        </td>
                                                                    </tr>
                                                                </table> 
                                                            </div>
                                                        </center>
                                                        <br><br><br>
                                                        <div id="demolink" class="demolink">
                                                            <a href="#" class="netbutton" 
                                                               onclick="optWindow('demo');">See your image in Action</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="demo" class="opttabcontent">
                                        <div id="includedContent"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="help" class="opttabcontent">
                                        <jsp:include page="jspincludes/help.jsp" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class='footeropt'>
                                        <!--a href="#" class="netbutbottom">Sign In</a>
                                        <a href="#" class="netbutbottom">Do More</a -->
                                        <a href="terms.jsp" class="netbutbottom">Terms</a>
                                        <a href="privacy.jsp" class="netbutbottom">Privacy</a>
                                        <a href="#" class="netbutbottom" onclick="optWindow('help');">Help</a>
                                    </div>
                                </td>
                            </tr> 
                        </table>
                        <br>
                    </center>
                </div>
                <!-- jsp:include page="jspincludes/rightadds.jsp" / -->
            </div>
        </div> 
        <script>
            function enablejason() {
                document.getElementById('rulesdisplay').disabled = false;
            }
        </script>  
        <script src="<%=path%>/scripts/jquery.min.1.11.1.js"></script>  
        <script src="<%=path%>/scripts/opt.js"></script>
        <script src="<%=path%>/scripts/bootstrap.min.js"></script>
        <!-- script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script -->
    </body>
</html>