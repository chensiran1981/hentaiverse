<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
<!DOCTYPE html>
<html>  
  <head>     
	
    <title>My JSP 'index.jsp' starting page</title>  
  </head>  
    
  <body>  
    <%!  
        synchronized void count() {  
            ServletContext application = getServletContext();  
            Integer num = (Integer)application.getAttribute("num");  
            if (null == num) {  
                num = new Integer(1);  
                application.setAttribute("num", num);  
            } else {  
                num = new Integer(1 + num);  
                application.setAttribute("num", num);  
            }  
        }  
     %>  
       
     <%  
         count();  
         Integer i = (Integer)application.getAttribute("num");

      %>  
	   b
       
  </body>  
</html>