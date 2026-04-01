<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>{{name}}</title>
    <link href="/static/normalize.css" rel="stylesheet"></link>
    <link href="/static/monkey.png" rel="icon" type="image/x-icon"></link>
</head>
<body style="margin: 0;">
   <div id="root"></div>
</body>
<script type="text/javascript">
   try {
      window.env = document.getElementById('env').value
      window.options = document.getElementById('options').value
      window.options = options
      console.log(window.options)
   } catch (error) {
      console.log(error)
   }
</script>
</html>