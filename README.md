#jquery插件
1、[访window弹窗全屏最小化及拖拽](#访window弹窗全屏最小化及拖拽)
2、[打字机](#打字机)

#####访window弹窗全屏最小化及拖拽
######使用
```
引入jquery.win.js、jquery.win.css文件

<link rel="stylesheet" type="text/css" href="jquery.win.css">
<script type="text/javascript" src="jquery.win.js"></script>

html
<div id='win'>这是一个测试div</div>

javascript
$('#win').lyfwin_effect();
```
######参数
width：可选，窗口宽度
height：可选，窗口高度
title：可选，窗口标题

######打字机
######使用
```
引入jquery.win.js、jquery.win.css文件

<link rel="stylesheet" type="text/css" href="jquery.word.css">
<script type="text/javascript" src="jquery.word.js"></script>

html
<div class="content">content test</div>
<div class="contentlist">
    <span class="word-group">test1</span>
    <span class="word-group">test2</span>
    <span class="word-group">test3</span>
</div>

javascript
$('.content').typelist({
    'covercolor':'#bae8ce',
    'recycle':0,
});
$('.contentlist').wordslist();
```
######参数
covercolor：可选，选中内容时背景颜色
recycle：可选，1-循环，0-不循环
