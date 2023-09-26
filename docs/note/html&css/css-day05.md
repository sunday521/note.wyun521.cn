## CSS 第五天

### 边框圆角

`border-radius` 属性用来设置元素的外边框为圆角。可以设置多个方位的属性值，属性值可以是 px、百分比形式的圆角半径

![image-20230718105718748](https://post-src.wyun521.top/images/image-20230718105718748.png)

> 记忆口诀：从左上角开始顺时针赋值，没值看对角

**实现正圆头像**

给方形容器设置边框圆角值为宽高的一半或 50%

```css
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  border-radius: 50%; /* 或 border-radius: 100px; */
}
```

**实现胶囊按钮**

给长方形容器设置边框圆角属性值为容器高度的一半

```css
.box2 {
  width: 100px;
  height: 40px;
  background-color: pink;
  border-radius: 20px;
}
```

### 盒子阴影

`box-shadow` 用来给容器添加阴影效果，让界面更生动：

```css
.box:hover {
  width: 234px;
  height: 300px;
  background-color: #fff;
  box-shadow: 2px 15px 30px rgba(0, 0, 0, 0.1);
}
```

属性值书写顺序：**X 轴偏移 Y 轴偏移 模糊半径 扩散半径 颜色 内/外阴影**

- X 轴偏移、Y 轴偏移必填
- 扩散半径为 0、不填都表示和容器大小一致
- 默认是外阴影，内阴影要加 inset

### 浮动

#### 浮动的特点

浮动常用来做 PC 端网站布局。语法：

- `float: left` 左浮动
- `float: right` 右浮动

**浮动的作用：让块元素水平排列**

**浮动的特点：【重要】**

- **浮动元素之间顶部对齐**
- **浮动元素具备行内块的特点（宽高可设置&在一行内显示）**
- **浮动元素不会超出父元素的范围**
- **浮动元素不会影响前面的元素**
- **浮动元素不会遮挡文字和内容**
- **浮动元素脱标，不占空间【在普通元素上方显示】**
- **如果子元素都浮动，并且父元素没有固定高度，那么需要给父元素清除浮动**

浮动解决了直接使用行内块布局的一些问题：

- 块元素换行有空格
- 块内容可能非顶线对齐
- 屏幕适配差

> 浮动原本是用来做文字环绕图片效果的（给图片加浮动），后来才被用于网页布局

#### 清除浮动

默认在 html 标准流中，父元素大小可以由子元素撑开

然而，一旦子元素全部设置了浮动，就不能再撑开父元素

如果父元素没有设置高度，那么高度就是 0，这将导致后面的元素上移，页面布局错乱

这时就要用到清除浮动**（清除浮动带来的影响，让父元素高度可以由内容撑开）**

**清除浮动的三种方法**

**1. 额外标签法**

在父元素末尾添加新的块级子元素：

```html
<div style="clear: both"></div>
```

**2. overflow 属性**

给父元素添加 `overflow: hidden;` 属性，实现 BFC

**3. 单双伪元素法【常用】**

给父元素添加 `clearfix` 类，然后利用伪元素清除浮动：

```css
/* 单伪元素法 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

```css
/* 双伪元素法 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
```

> 问：为什么不直接给父元素加一个高度呢？
>
> 答：因为有时父元素中的内容多少无法确定，父元素的高度也就没办法固定

#### 浮动布局案例

使用浮动布局小米商城导航栏：

```html
<div class="nav">
  <!-- 版心区域 -->
  <div class="nav-main w clearfix">
    <!-- 左导航 -->
    <ul class="nav-left clearfix">
      <li><a href="#">小米官网</a><span>|</span></li>
      <li><a href="#">小米商城</a><span>|</span></li>
      <li><a href="#">MIUI</a><span>|</span></li>
      <li><a href="#">IoT</a><span>|</span></li>
      <li><a href="#">云服务</a><span>|</span></li>
      <li><a href="#">天星数科</a><span>|</span></li>
      <li><a href="#">有品</a><span>|</span></li>
      <li><a href="#">小爱开放平台</a><span>|</span></li>
      <li><a href="#">企业团购</a><span>|</span></li>
      <li><a href="#">资质证照</a><span>|</span></li>
      <li><a href="#">协议规则</a><span>|</span></li>
      <li><a href="#">下载app</a><span>|</span></li>
      <li><a href="#">Select Location</a><span>|</span></li>
    </ul>
    <!-- 右导航 -->
    <ul class="nav-right clearfix">
      <li><a href="#">登录</a><span>|</span></li>
      <li><a href="#">注册</a><span>|</span></li>
      <li><a href="#">消息通知</a></li>
    </ul>
  </div>
</div>
```

```css
/* 清除默认样式和边距... */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
/* 通栏 不设置宽度 */
.nav {
  /* 这里设置了高度，所以无论里面元素是否浮动，都不会对下面内容产生影响 */
  height: 40px;
  background-color: #333;
}
/* 版心 */
.w {
  width: 1226px;
  margin: 0 auto;
}
.nav-left {
  float: left;
}
.nav-right {
  float: right;
}
.nav li {
  /* 让每个li水平排列 */
  float: left;
  line-height: 40px;
}
.nav li a {
  color: #b0b0b0;
  font-size: 12px;
}
.nav li span {
  color: #424242;
  margin: 0 4px;
}
```

![image-20230717153044888](https://post-src.wyun521.top/images/image-20230717153044888.png)

### Flex 布局

#### 定义

flex 是一种新兴的网页布局方式，与浮动相比，使用 flex 布局网页更简单更灵活，而且也不会有因元素脱标而导致的页面布局错乱问题

> 使用 flex 布局的元素可以自适应屏幕尺寸大小，这在移动端网页布局中很常见

#### 属性

[flex 弹性布局 动画详解](https://b23.tv/1mQ3zfO)

掌握 flex 布局的第一步是了解它的一系列相关属性，一起来看看吧~

##### display

`display: flex` 创建一个 flex 容器，直接子元素成为弹性元素，可以自动拉伸或被父元素挤压

> - 弹性容器的主轴默认在水平方向，侧轴默认在垂直方向
> - 如果子元素没有设置高度，默认会占满父元素高度
> - 父元素设置 display: flex 成为弹性容器后，所有子元素的 display 属性会失效
>
> - 弹性元素就像行内块一样，可以直接设置宽高

##### justify-content

设置弹性元素沿弹性容器主轴的对齐方式，属性值有：

| 属性值            | 特点                                            |
| ----------------- | ----------------------------------------------- |
| flex-start        | 从起点开始依次向后排列【默认】                  |
| flex-end          | 依次向后排列到终点结束                          |
| **center**        | 弹性元素整体居中排列                            |
| **space-between** | 弹性元素两端对齐，然后均分中间空白区域 【常用】 |
| space-around      | 弹性元素两边均分空白区域                        |
| space-evenly      | 弹性元素等分空白区域                            |

看一下它们各自的效果：

![image-20230720164055292](https://post-src.wyun521.top/images/image-20230720164055292.png)

![image-20230720164125621](https://post-src.wyun521.top/images/image-20230720164125621.png)

![image-20230720164154261](https://post-src.wyun521.top/images/image-20230720164154261.png)

![image-20230720164243074](https://post-src.wyun521.top/images/image-20230720164243074.png)

![image-20230720164313351](https://post-src.wyun521.top/images/image-20230720164313351.png)

![image-20230720164344445](https://post-src.wyun521.top/images/image-20230720164344445.png)

##### align-content

设置弹性元素的侧轴对齐方式（多行），它的属性值和 `justify-content` 完全相同：

| 属性值            | 特点                                            |
| ----------------- | ----------------------------------------------- |
| flex-start        | 从起点开始依次向后排列【默认】                  |
| flex-end          | 依次向后排列到终点结束                          |
| **center**        | 弹性元素整体居中排列                            |
| **space-between** | 弹性元素两端对齐，然后均分中间空白区域 【常用】 |
| space-around      | 弹性元素两边均分空白区域                        |
| space-evenly      | 弹性元素等分空白区域                            |

##### align-items

设置弹性元素的侧轴对齐方式（单行)

| 属性值     | 特点                                                   |
| ---------- | ------------------------------------------------------ |
| flex-start | 从起点开始依次向后排列【默认】                         |
| flex-end   | 依次向后排列到终点结束                                 |
| **center** | 弹性元素整体居中排列                                   |
| stretch    | 弹性元素拉伸铺满弹性容器（在元素没有设置侧轴方向尺寸） |

> 默认情况下，父元素必须有高度，align-items 属性值才会生效！

##### align-self

给某一个弹性元素设置其侧轴对齐方式（单个元素）

| 属性值     | 特点                                                   |
| ---------- | ------------------------------------------------------ |
| flex-start | 从起点开始依次向后排列【默认】                         |
| flex-end   | 依次向后排列到终点结束                                 |
| **center** | 弹性元素整体居中排列                                   |
| stretch    | 弹性元素拉伸铺满弹性容器（在元素没有设置侧轴方向尺寸） |

> align-self 属性和下面的 flex 属性都是直接作用于弹性子元素的！

##### flex

`flex` 弹性伸缩比，用于控制主轴方向上，弹性元素占父元素**剩余空间**的份数。属性值为整数数字

使用 flex 属性实现圣杯布局：

```css
.container {
  width: 800px;
  height: 500px;
  border: 1px solid #333;
  margin: 100px auto;
  text-align: center;
  display: flex;
}
/* 圣杯布局：中间内容区域随父元素弹性伸缩 */
/* 1. 左右固定宽度 */
/* 2. 内容区域弹性伸缩 */
.left,
.right {
  width: 200px;
  background-color: skyblue;
}
.content {
  flex: 1;
  background-color: pink;
}
```

```html
<div class="container">
  <div class="left">left</div>
  <div class="content">content</div>
  <div class="right">right</div>
</div>
```

![image-20230720201638739](https://post-src.wyun521.top/images/image-20230720201638739.png)

##### flex-wrap

flex 是一个弹性容器，当子元素大小超出弹性容器大小时，默认会被挤压

想让子元素在超出时换行显示，就要指定 `flex-wrap: wrap;` 属性

一个使用 `flex-wrap` 属性的例子：

![image-20230720175431515](https://post-src.wyun521.top/images/image-20230720175431515.png)

设置 `display: flex;` 后，可以看到，父元素宽度不够，子元素宽度默认被挤压了：![image-20230720175401617](https://post-src.wyun521.top/images/image-20230720175401617.png)

给父元素添加 `flex-wrap: wrap;` 属性，子元素在超出时会自动换行：

![image-20230720175454126](https://post-src.wyun521.top/images/image-20230720175454126.png)

##### flex-direction

我们知道，flex 布局的主轴默认在水平方向，相对应的侧轴在垂直方向。

使用 `flex-direction` 属性可以修改主轴方向：

![image-20230720114029922](https://post-src.wyun521.top/images/image-20230720114029922.png)

下面是一个使用该属性的例子：

```css
/* 让上下排列的多个子元素垂直水平居中 */
.box {
  /* ... */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

```html
<div class="box">
  <img src="./img/3.webp" alt="" />
  <h4>Redmi Note 12T Pro</h4>
  <p>年度LCD屏幕之光</p>
</div>
```

![image-20230720195505861](https://post-src.wyun521.top/images/image-20230720195505861.png)

如果不改变主轴方向，就不能竖着排，而是会变成横着排：

![image-20230720195731487](https://post-src.wyun521.top/images/image-20230720195731487.png)

> 主轴为水平方向时，弹性元素默认高度为弹性容器高度；主轴为垂直方向时，弹性元素默认宽度是弹性容器宽度

关于 flex 布局的详细用法，请参照：[Flex 布局图文详解](https://web.qianguyihao.com/02-CSS%E5%9F%BA%E7%A1%80/13-CSS3%E5%B1%9E%E6%80%A7%EF%BC%9AFlex%E5%B8%83%E5%B1%80%E5%9B%BE%E6%96%87%E8%AF%A6%E8%A7%A3.html) [原来 flex 布局还能那么细？](https://juejin.cn/post/7033420158685151262?searchId=20230720100501B0F91701E1B778E3AA26)
