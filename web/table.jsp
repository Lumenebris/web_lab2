<%@ page import="lab_2.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Результат проверки</title>
    <link rel="stylesheet" href="css/handler.css">
    <meta charset="utf-8">
    <script type="text/javascript"> <%@include file='js/script.js' %> </script>
</head>
<body>
<table class="results block centered" align="center">
    <tr> <th>X</th> <th>Y</th> <th>R</th> <th><b>Результат</b></th></tr>
    <%
        ArrayList<Point> list = (ArrayList)request.getSession().getAttribute("list");
        for (Point point : list) {
    %>
    <tr>
        <td align="center"><%=point.getX() %></td>
        <td align="center"><%=point.getY() %></td>
        <td align="center"><%=point.getR()%></td>
        <td align="center"><%=point.isInArea() ? "Попадание" : "Промах" %></td>

    </tr>
    <%}%>


</table>
</body>
</html>