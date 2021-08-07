<!DOCTYPE html>
<%@ page import="com.jcarx.util.NetLog" %>
<%@ page import="com.jcarx.util.NetClientHeaderInfo" %>
<%@ page import="com.jcarx.util.Utility" %>

<html lang="en">
    <%
        String path = session.getServletContext().getContextPath();
        String userip = NetClientHeaderInfo.getClientIp(request);
        session.setAttribute("likepath", "index.jsp");
        NetLog.logInfo("Index.JSP Request= " + userip + " <br>yyyy.MM.dd.HH.mm.ss= " + Utility.getTimeStr());
    %>
    <jsp:include page="jspincludes/head.jsp" />
    <body>
        <jsp:include page="jspincludes/topnavigation.jsp" />
        <div class="container-fluid text-center" style="margin-top: 0px">    
            <div class="row content">
                <jsp:include page="jspincludes/leftcontent.jsp" />
                <br>
                <div  class="col-sm-8 text-left"> 
                    <p><span class="tab"></span>Build your Next Generation App Using
                        jcarx's Framework v1.02</p>
                    <p>Enterprise Dynamic Progressive Web/Mobile App Framework</em></span></p>
                    <p>will be available to download and use / customize for free...</em></span></p>
                    <p>&nbsp;</p>
                    <p>
                        <a href="register.jsp">Register</a> to be notified when download is available</p>
                    <p>&nbsp;</p>
                    <p>Build once deploy to</p>
                    <ul>
                        <li>
                            <p>WebContainer (Glassfish / Tomcat / Weblogic / WebSphere / JBoss)</p>
                        </li>
                        <li>
                            <p>Clients (Browser / Android / IOS)</p>
                        </li> 
                    </ul>
                    <br><br><br>
                    <center>
                        <section class="products">
                            <div class="fly-in">  
                                <div>Java&nbsp;&#9749;<span>&nbsp;elegant OOP</span></div>
                                <div>Continuous integration&nbsp;&#127905;</div>
                                <div>IoT<span>to enterprise</span>&nbsp;&#127970;</div>
                                <div>Arduino<span>&nbsp;&nbsp;POC's</span>&nbsp;&#128225;</div>
                                <div>Enterprise&nbsp;&nbsp;<span>Cloud  / Scale</span>&nbsp;&#127758;</div>
                                <div>Android&nbsp;<span>no limit's</span>&nbsp;&#9832;&#128039;</div>
                                <div>&#127754;PWA&nbsp;<span>Progressive Web Apps</span></div>
                            </div>  
                        </section>
                    </center>
                    <br>
                </div>
                <jsp:include page="jspincludes/rightcontent.jsp" />
            </div>
        </div>
        <!-- jsp:include page="jspincludes/footer.jsp" / --> 
    </body>
</html>