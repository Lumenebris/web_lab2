<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>LW2 WEB</title>
    <link rel="shortcut icon" href="images/logo.png" type="image/png">
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <script type="text/javascript"><%@include file='js/script.js' %></script>
</head>
<body onload="init()">
<header>
    <h1>Проверка попадания точки в график</h1>
    <h2>Пономаренко Елена Андреевна</h2>
    <h3>Группа: Р3202</h3>
    <h3>Вариант: 218318</h3>
</header>
<div class="content">
    <div class="upperSidebar">
        <div class="form">
            <div class="chooseX">
                <p class="heading"><b>Значение X:
                        <output name="x_output" id="x_out" class="output">_</output></b>
                </p>

                <table>
                    <tr>
                        <td><input type="button" name="x1" id="x_1" value="-4" autocomplete="off" onclick="setX(x_1.value)"></td>
                        <td><input type="button" name="x2" id="x_2" value="-3" autocomplete="off" onclick="setX(x_2.value)"></td>
                        <td><input type="button" name="x3" id="x_3" value="-2" autocomplete="off" onclick="setX(x_3.value)"></td>
                    </tr>
                    <tr>
                        <td><input type="button" name="x4" id="x_4" value="-1" autocomplete="off" onclick="setX(x_4.value)"></td>
                        <td><input type="button" name="x5" id="x_5" value=" 0" autocomplete="off" onclick="setX(x_5.value)"></td>
                        <td><input type="button" name="x6" id="x_6" value=" 1" autocomplete="off" onclick="setX(x_6.value)"></td>
                    </tr>
                    <tr>
                        <td><input type="button" name="x7" id="x_7" value=" 2" autocomplete="off" onclick="setX(x_7.value)"></td>
                        <td><input type="button" name="x8" id="x_8" value=" 3" autocomplete="off" onclick="setX(x_8.value)"></td>
                        <td><input type="button" name="x9" id="x_9" value=" 4" autocomplete="off" onclick="setX(x_9.value)"></td>
                    </tr>
                </table>
            </div>

            <div class="inputY">
                <p class="heading"><b>Значение Y:
                        <output name="y_output" id="y_out" class="output">_</output></b>
                </p>
                    <p><input id="text_y" type="text" size="15" name="x" placeholder="от -5 до 5" autocomplete="off" onblur="verifyY(this)" oninput="verifyY(this)" onchange="checkY()">
                    <p id="message" style="visibility: hidden">.</p>
            </div>

            <div class="chooseR">
                <p class="heading"><b>Значение R:
                        <output name="r_output" id="r_out" class="output">_</output></b>
                </p>
                <p><input type="button" name="r" id="r_1" value="1" autocomplete="off" onclick="setR(this.value)">
                    <input type="button" name="r" id="r_2" value="2" autocomplete="off" onclick="setR(this.value)">
                    <input type="button" name="r" id="r_3" value="3" autocomplete="off" onclick="setR(this.value)">
                    <input type="button" name="r" id="r_4" value="4" autocomplete="off" onclick="setR(this.value)">
                    <input type="button" name="r" id="r_5" value="5" autocomplete="off" onclick="setR(this.value)">
                </p>
            </div>

        <form action="check" method="GET" target="result" onsubmit="check()">
            <div class="button">
                <input type="submit" id="submit" value=" Результат " >
            </div>
            <p id="error"></p>
            <input type="hidden" name="flag" id="flag" value="1">
            <input type="hidden" name="r_v" id="r_id" value="0">
            <input type="hidden" name="x_v" id="x_id" value="0">
            <input type="hidden" name="y_v" id="y_id" value="0">
        </form>
        </div>
        <div class="graph">
            <canvas id="canvas" width="300" height="300" onclick="clickOnGraph(document.getElementById('r_out').value)" width="300" height="300"></canvas>
            <p id="errorGraph"></p>
        </div>
    </div>
    <div class="bottomSidebar">
        <div id="frame" class="container">
            <iframe id="result" name = "result" src="check?x_v=1&r_v=2&y_v=1"></iframe>
        </div>
    </div>
</div>
<div class="footer">Copyright © <a href="https://github.com/Lumenebris/web_lab2">Lumenebris</a>, 2019</div>
</body>
