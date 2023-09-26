## CSS 第二天

### 01-复合选择器

#### 后代选择器

选择所有后代中的特定元素

```css
.nav a {
  color: red;
}
```

#### 子代选择器

选择特定的直接子元素

```css
.nav > a {
  color: red;
}
```

> 区别：后代选择器可以跨多级寻找，子代选择器只会寻找下一级

#### 并集选择器

同时选择多个类型的元素，以统一应用相同的样式，可以使用并集选择器：

```css
/* 正确写法 */
.dad a,
.mom a {
  color: green;
}
/* 错误写法：dad类中的a标签不会被应用样式 */
.dad,
.mom a {
  color: black;
}
```

> 并集选择器的优先级比后代选择器低，所以一起使用时要注意

#### 交集选择器

选择同时满足多个条件的元素，使用交集选择器：

```css
/* 选择a标签且类名是mark的元素 */
a.mark {
  color: red;
}
```

#### 伪类选择器

选择特定状态的元素，常见的伪类有：

- :link 链接未被访问时的样式，只能作用于 a 标签
- :visited 链接已经访问过的样式，只能作用于 a 标签
- :hover 鼠标经过时的样式【常用】
- :active 鼠标按下未松开时的样式

拓展：如果四个属性一起写，顺序必须是：love hate

```css
a:link {
  color: blue;
}
a:visited {
  color: gray;
}
a:hover {
  color: red;
}
a:active {
  color: orange;
}
```

> 我们一般给 a 链接设置样式都是直接设置，极少用到 :link :visited :active 这三个伪类

### 02-Emmet 语法

[Emmet 语法让你的编码更高效！](https://juejin.cn/post/7018567571876102151)

![image-20230712113233439](https://post-src.wyun521.top/images/image-20230712113233439.png)

![image-20230712113159818](https://post-src.wyun521.top/images/image-20230712113159818.png)

### 03-背景属性

#### 背景颜色

`background-color` 属性用来设置元素的背景颜色

```css
.box {
  width: 100px;
  height: 100px;
  background-color: pink;
}
```

> 元素单独设置背景颜色、背景图片不会生效，块元素要有宽高，行内元素要有内容

#### 背景图片

`background-image` 属性用来设置元素的背景图片：

```css
.logo {
  width: 80px;
  height: 80px;
  background-image: url(./logo.png);
}
```

![image-20230712141443647](https://post-src.wyun521.top/images/image-20230712141443647.png)

#### 背景图片平铺

当给元素设置的宽高小于图片尺寸时，图片默认只显示左上角那一部分；当元素宽高大于图片尺寸时，默认图片会平铺多次，以占满元素的全部空间

`background-repeat` 属性用来设置背景图片的平铺方式：

![image-20230712144919054](https://post-src.wyun521.top/images/image-20230712144919054.png)

#### 背景图片位置

`background-position` 属性用来设置背景图片在元素中的位置：

![image-20230712152205919](https://post-src.wyun521.top/images/image-20230712152205919.png)

> 背景图片默认会在元素左上方显示

#### 背景图片尺寸

`background-size` 属性用来设置背景图片的尺寸，它的属性值有：

- 数字
- cover: 等比例缩放图片，让图片把盒子填满（图片部分可能超出盒子区域而显示不全）
- contain: 等比例缩放图片，让图片完整地显示在盒子内（盒子内部可能留有空白）【包含图片】

```css
/* 使用数字直接定义图片尺寸 设置单个值作为宽度，高度会等比例缩放 */
background-size: 250px;
```

![image-20230712160642415](https://post-src.wyun521.top/images/image-20230712160642415.png)

```css
/* 等比例缩放图片， 让图片把盒子填满*/
background-size: cover;
```

![image-20230712160542604](https://post-src.wyun521.top/images/image-20230712160542604.png)

```css
/* 等比例缩放图片，让图片完整地显示出来 */
background-size: contain;
```

![image-20230712160515461](https://post-src.wyun521.top/images/image-20230712160515461.png)

#### 背景图固定

`background-attachment` 属性用来设置背景图是否随页面滚动：

- scroll：随页面滚动【默认】
- fixed：固定在页面的某一位置

```css
body {
  background-image: url(./bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
```

#### 背景复合属性

`background` 是所有背景属性的复合属性，支持不同的背景属性值连写：

![image-20230712163701690](https://post-src.wyun521.top/images/image-20230712163701690.png)

当然，一般我们都这样使用背景复合属性：

```css
background: url(./logo.png) no-repeat; /* 注意不要写成background-image */
```

### 04-显示模式

#### 显示模式分类

HTML 中的所有元素都是以下三种显示模式之一：

![image-20230712172923366](https://post-src.wyun521.top/images/image-20230712172923366.png)

> 可以把 img、input 看做行内块元素，或者说是行内替换元素来理解 [为什么 img、input 等内联元素可设置宽高？](https://juejin.cn/post/6844903516952068109)

#### 转换显示模式

元素的显示模式不是一成不变的，我们可以使用 `display` 属性改变元素的显示模式：

- block: 显示为块元素【常用】
- inline-block: 显示为行内块元素【常用】
- inline: 显示为行内元素

> 我们一般都是使用 display 将行内元素转换为块元素或行内块元素，这样元素就可以设置宽高了

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .nav {
        text-align: center;
      }
      .nav a {
        /* 转换为行内块元素，使宽高生效 */
        display: inline-block;
        width: 80px;
        height: 50px;
        color: #eee;
        background-color: pink;
        text-decoration: none;
        text-align: center;
        line-height: 50px;
      }
      .nav a:hover {
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <a href="#">宫保鸡丁</a>
      <a href="#">麻婆豆腐</a>
      <a href="#">鱼香肉丝</a>
      <a href="#">水煮肉片</a>
      <a href="#">老八汉堡</a>
    </div>
  </body>
</html>
```

![image-20230712182625396](https://post-src.wyun521.top/images/image-20230712182625396.png)
