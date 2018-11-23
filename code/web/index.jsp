<%--
  Created by IntelliJ IDEA.
  User: John
  Date: 2018/11/23
  Time: 21:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>二维码生成</title>
  <script type="text/javascript" src="./js/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="./css/common.css">
  <script type="text/javascript" src="./js/common.js"></script>
  <script type="text/javascript">
      var basePath = '';
  </script>
  <script type="text/javascript" src="./js/jquery-qrcode-0.14.0.min.js"></script>
  <script language="javascript">
      function MsgBox() {
          alert("呵呵哒")
      }
  </script>
</head>

<body>
<div class="layui-container">
  <fieldset class="layui-elem-field layui-field-title"
            style="margin-top: 20px;">
    <legend>二维码生成</legend>
  </fieldset>
  <form class="layui-form layui-form-pane" action=""
        style="padding-top: 20px;">
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">数据</label>
      <div class="layui-input-block">
					<textarea placeholder="请输入数据" name=qr id="content"
                              class="layui-textarea"></textarea>
      </div>
    </div>
    <div style="text-align: center">
      <div class="layui-form-item layui-form-text">
        <div class="layui-input-block">
          <button class="layui-btn" onclick="genQrcode();" type="button">生成二维码</button>
          <button class="layui-btn" onclick="MsgBox()" type="button">button</button>
        </div>
      </div>
    </div>
    <br>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <div id="qrcode"></div>
      </div>
    </div>
  </form>
</div>
</body>
<link rel="stylesheet" type="text/css" href="./css/layui.css">
<script type="text/javascript" src="./js/layui.js"></script>
<script type="text/javascript">
    var layer;
    var form;
    layui.use([ 'layer', 'form' ], function() {
        layer = layui.layer;
        form = layui.form;
    });
</script>
<script type="text/javascript">
    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    function genQrcode() {
        var content = $("#content").val();
        if (content != null && content.length > 0) {
            $('#qrcode').html("");
            $('#qrcode').qrcode({
                width : 200,
                height : 200,
                correctLevel : 0,
                text : utf16to8(content)
            });
        }
    }
</script>
</html>
