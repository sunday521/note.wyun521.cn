## CSS 第七天

### 隐藏元素

`overflow: hidden;` 属性的用途有：

- 隐藏超出元素部分的内容
- 解决外边距塌陷的问题
- 清除浮动

如果想要隐藏整个元素，就得使用下面的属性：

- `visibility: hidden`：隐藏后的元素仍占有空间

- `display: none`：隐藏后的元素不保留空间【常用】

**例-hover 显示二维码**

1.  先搭建元素基本结构和初始化样式

```html
<div class="box">
  <span>来扫我呀</span>
  <!-- 二维码放在盒子内部，才能在hover盒子时找到二维码这个元素设置样式 -->
  <img src="./images/qr-code.png" alt="二维码" />
</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #999;
  text-align: center;
  line-height: 100px;
}
```

2.  利用定位调整盒子位置和图片位置

```css
/* 固定在屏幕右下方 */
.box {
  position: fixed;
  right: 50px;
  bottom: 200px;
}
/* 定位在.box左侧 */
.box img {
  position: absolute;
  top: -20px;
  left: -150px;
}
```

![image-20230725114628635](https://post-src.wyun521.top/images/image-20230725114628635.png)

3.  将图片先隐藏起来，hover 时再显示就可以了

```css
/* 隐藏图片 */
.box img {
  display: none;
}
/* 鼠标经过.box 找到后代img设置样式 */
.box:hover img {
  display: block;
}
```

![hidden](https://post-src.wyun521.top/images/hidden-16901925176553.gif)

**例-给卡卡西添加遮罩**

1.  先搭建元素基本结构和初始化样式

```html
<div class="box">
  <a href="https://baike.baidu.com/item/旗木卡卡西/405593" target="_blank">
    <img src="./images/卡卡西.jpg" alt="卡卡西" />
  </a>
</div>
```

```css
body {
  background-color: #f5f5f5;
}
.box {
  position: relative;
  width: 500px;
  height: 368px;
  margin: 100px auto;
}
```

2.  使用伪元素创建遮罩层，先隐藏起来，hover 时再显示

```css
/* 使用伪元素创建遮罩层并隐藏 */
.box a::after {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 500px;
  height: 368px;
  /* 播放按钮 */
  background: url(./images/arr.png) no-repeat center center;
  /* 背景遮罩 */
  background-color: rgba(0, 0, 0, 0.4);
}
/* 鼠标经过时再显示 */
.box a:hover::after {
  display: block;
}
```

![kakaxi-2](https://post-src.wyun521.top/images/kakaxi-2.gif)

### 精灵图

CSS 精灵图：将各种小图片整合到一张图片上，然后使用 `background-position` 来展示图片的不同部分

优点：减少图片请求次数，减轻服务器压力，提高页面加载速度

**例 拼姓名案例**

1.  假设有一张这样的精灵图，量出自己姓名首字母的大小和位置

![image-20230724110201083](https://post-src.wyun521.top/images/image-20230724110201083.png)

2.  使用背景图+背景图定位来拼出一个姓名：

```html
<div class="myname">
  <div class="w"></div>
  <div class="l"></div>
  <div class="x"></div>
</div>
```

```css
.myname {
  display: flex;
  width: 500px;
  height: 300px;
  margin: 100px auto;
}
.w {
  width: 142px;
  height: 108px;
  background: url(./images/abcd.jpg);
  background-position: -111px -561px;
}
.l {
  width: 106px;
  height: 113px;
  background: url(./images/abcd.jpg);
  background-position: 0 -273px;
}
.x {
  width: 107px;
  height: 107px;
  background: url(./images/abcd.jpg);
  background-position: -252px -560px;
}
```

![image-20230724112336455](https://post-src.wyun521.top/images/image-20230724112336455.png)

### 字体图标

在网页中添加简单的、颜色单一的小图标，这些字体图标可以使用字体属性修改样式

优点：体积小、不失真、样式可修改

![image/iconfont](https://post-src.wyun521.top/images/iconfont.png)

> [css 雪碧图（精灵图）与字体图标的介绍以及对比](https://juejin.cn/post/6844903951725395981?searchId=20230724113459EB0F7DD54DA633B6CA73)

### CSS 变换

#### opacity

`opacity` 用来设置整个元素的透明度【包含背景和内容】

- 0：完全透明
- 1：不透明

> 如果不想元素内容消失，可以用透明背景色代替

#### vertical-align

`vertical-align` 属性用来设置行内元素、行内块元素的垂直对齐方式。属性值：

- baseline：基线对齐【默认】
- middle：居中对齐【常用】
- top：顶部对齐
- bottom：底部对齐

**解决图片底部空白间隙问题**

![image-20230725121911594](https://post-src.wyun521.top/images/image-20230725121911594.png)

图片底部出现了空白间隙，这是由于 CSS 默认的图片和文字的基线对齐导致的，要解决这个问题，只需要给图片设置：

```css
.box img {
  /* 图片和文字底线对齐 */
  vertical-align: bottom;
}
```

![image-20230725122230918](https://post-src.wyun521.top/images/image-20230725122230918.png)

```css
.box img {
  /* 图片和文字居中对齐 */
  vertical-align: middle;
}
```

![image-20230725122504885](https://post-src.wyun521.top/images/image-20230725122504885.png)

> 实际上，我们也可以给放图片的盒子设置和图片大小一致的宽高，这样也不会有空白间隙

#### transition

通常当 CSS 的属性值更改后，浏览器会立即更新相应的样式

![transition01](https://post-src.wyun521.top/images/transition01.gif)

CSS 过渡效果可以让样式改变地更加平滑

```css
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* 可以简写为 transition: all 0.3s; */
  transition: width 0.3s, background-color 0.3s;
}
.box:hover {
  width: 500px;
  background-color: red;
}
```

![transition02](https://post-src.wyun521.top/images/transition02.gif)

> **transition 属性语法**
>
> transition: property duration timing-function delay;
>
> - property：要过渡的属性【必填】
>
> - duration：过渡持续时间，单位 s【必填】
>
> - timing-function：运动曲线（先慢后快，还是先快后慢）
>
> - delay：（过渡开始时的）延迟时间

**例 给卡卡西添加底部遮罩**

1.  先搭建元素基本结构和初始化样式

```html
<div class="box">
  <img src="./images/卡卡西.jpg" alt="卡卡西" />
  <!-- 底部遮罩 -->
  <div class="bottom-intro">我是卡卡西</div>
</div>
```

```css
.box {
  position: relative;
  width: 500px;
  height: 368px;
  margin: 100px auto;
}
/* 底部遮罩 */
.bottom-intro {
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 24px;
  line-height: 80px;
  text-align: center;
}
```

![image-20230724170012726](https://post-src.wyun521.top/images/image-20230724170012726.png)

2.  使用定位改变遮罩的位置，让它紧贴父元素的下边

```css
.bottom-intro {
  position: absolute;
  /* 因为遮罩的高度为80px，所以bottom下移80px正好出去 */
  bottom: -80px;
  left: 0;
}
```

![image-20230725142701114](https://post-src.wyun521.top/images/image-20230725142701114.png)

3.  先将遮罩隐藏掉，hover 时再上移

```css
.box {
  overflow: hidden;
}
.box:hover .bottom-intro {
  bottom: 0;
}
/* 添加0.3s的过渡 */
.bottom-intro {
  transition: all 0.3s;
}
```

![kakaxi](https://post-src.wyun521.top/images/kakaxi.gif)

> - 过渡效果只能对数字属性值的属性变化生效（background-color 会转换为数字值）
>
> - 谁做过渡谁加，而不是加在 hover 伪类中

> 关于过渡的详细用法，请参考 [CSS transition（过渡效果）详解](http://c.biancheng.net/css3/transition.html)

#### transform

`transform` 属性可以对元素进行移动、旋转和缩放

- transform: translate(X, Y)：移动元素，值为移动的距离，单位 px、百分比【百分比表示移动元素自身大小的百分比】
- transform: rotate(deg)： 旋转元素，值为旋转角度，单位 deg【正值顺时针旋转，负值逆时针旋转】
- transform: scale(sx, sy)：缩放元素，值为将元素放大或缩小的倍数

> 转换后的元素与绝对定位的元素类似，不会影响周围的元素（可以和周围的元素重叠）;不同的是，转换后的元素在页面中仍然会占用原来的空间

**例 hover 小米 logo**

1.  先搭建元素基本结构和初始化样式

```html
<div class="logo">
  <a href="https://www.mi.com"></a>
</div>
```

```css
.logo {
  width: 49px;
  height: 49px;
  background-color: #ff6a00;
  margin: 100px auto;
}
/* 使用伪元素显示要切换的两张图片 */
.logo a::before {
  content: "";
  display: block;
  width: 49px;
  height: 49px;
  background: red url(./mi-logo.png) no-repeat;
}
.logo a::after {
  content: "";
  display: block;
  width: 49px;
  height: 49px;
  background: green url(./mi-home.png) no-repeat;
}
/* 让两个伪元素并排显示 */
.logo a {
  display: flex;
  width: 98px;
}
```

![image-20230725143905549](https://post-src.wyun521.top/images/image-20230725143905549.png)

2.  给盒子添加溢出隐藏，在 hover 时，我们只需要移动 a 元素的位置，就能实现两张背景图的切换

```css
/* 添加圆角和溢出隐藏 */
.logo {
  border-radius: 16px;
  overflow: hidden;
}
.logo a:hover {
  /* 两张图片大小都是 49×49,所以将a左移49 */
  transform: translate(-49px, 0);
}
/* 添加0.3s的过渡 */
.logo a {
  transition: all 0.3s;
}
```

![mi-logo](https://post-src.wyun521.top/images/mi-logo.gif)

3.  最后，去除两张图片的背景色，让 box 显示自身的背景色

```css
.logo a::before,
.logo a::after {
  background-color: transparent;
}
```

![mi](https://post-src.wyun521.top/images/mi.gif)

> 我们移动的是外面的 a，而不是 a 中的两个伪元素

> 关于 transform 的详细用法，请参考 [CSS 动画详解](https://web.qianguyihao.com/02-CSS%E5%9F%BA%E7%A1%80/12-CSS3%E5%B1%9E%E6%80%A7%E8%AF%A6%E8%A7%A3%EF%BC%9A%E5%8A%A8%E7%94%BB%E8%AF%A6%E8%A7%A3.html#_2d-%E8%BD%AC%E6%8D%A2) [CSS 2D 转换](http://c.biancheng.net/css3/2d-3d-transform.html)

最后，附上一张图回顾一下今天的知识点：

![CSS第七天](https://post-src.wyun521.top/images/CSS第七天.png)
