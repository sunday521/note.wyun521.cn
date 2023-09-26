## CSS3 移动端适配

### 前置知识

#### 屏幕分辨率

屏幕分辨率：设备屏幕纵横上的像素点数

设备有两种分辨率：

- 物理分辨率：在出厂时就已经固定了
- 逻辑分辨率：可自行设置调节

缩放可以改变屏幕的逻辑分辨率：

- 放大屏幕：分辨率减小（可包含的像素点数变少）

- 缩小屏幕：分辨率增大

我们在开发网页时，要参考设备的逻辑分辨率进行开发

#### 视口

视口：显示 html 网页的区域

PC 端网页的视口宽度默认和设备的逻辑分辨率相等（总是 100%），移动端网页的默认宽度一般是 980px

设置视口宽度等于设备屏幕宽度:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

设置成功后，网页的宽度和手机屏幕尺寸大小相同，和手机逻辑分辨率尺寸也相同

#### 二倍图

设计稿和其中的图片采用二倍大小设计可以防止图片在高分辨率屏幕下失真

> 实际开发中，最常用的一个参考设备是 ipone 6/7/8 ，尺寸是 375×667 ，二倍图尺寸 750×1334

### 适配方案

#### 适配方案对比

PC 端常用适配方案：

- 百分比适配
- flex 适配

> 高度固定，宽度自适应

移动端常用适配方案：

- rem 适配：相对于 html 根字号适配
- vw 适配：相对于视口宽度适配

> 宽高等比缩放

#### rem 适配

rem 是一个相对单位，你可能听说过，它是相对于某个字号的大小。下面来测试一下：

```less
// 测试 rem 单位的基准字号
html {
  font-size: 10px;
}
body {
  font-size: 15px;
}
.box {
  font-size: 20px;
  width: 20rem;
  height: 20rem;
  background-color: pink;
}
```

![image-20230811160701588](https://post-src.wyun521.top/images/image-20230811160701588.png)

现在我们知道了，rem 总是以 html 根字号为基准，**1rem = 1 html 根字号大小**

接下来，有两个问题：

**1. 手机的屏幕尺寸不同，分辨率不同，如何设置不同的 html 字号大小以适配所有设备？**

- @media 媒体查询
- flexiable.js（自动设置根字号）

**2. 既然 rem 总是以 html 根字号为基准，那么 html 根字号设置多大才合适？**

![image-20230811162814626](https://post-src.wyun521.top/images/image-20230811162814626.png)

```less
@baseSize: 37.5rem;
// 一个在 iphone6/7/8 上，大小为 68×29 的盒子
.box {
  width: (68 / @baseSize);
  height: (29 / @baseSize);
  background-color: pink;
}
```

> 这里使用了 less 语法，接下来会讲到

> 实际开发时，移动端网页开发人员经常参考的设备是 ipone 6/7/8，它的尺寸是 375 × 667px
>
> 使用 rem 布局的一个规范是将网页均分为 10 等份，html 字号设置为视口宽度的 1/10

##### @media 媒体查询

@media 媒体查询可以检测视口宽度的变化，同时执行差异化的 CSS 样式

利用媒体查询给不同视口宽度的屏幕设置不同的 html 字号大小，然后转换为 rem 单位的尺寸：

```css
/* 这里的 width 指的是视口的宽度 */
@media (width: 320px) {
  html {
    font-size: 32px;
  }
}
@media (width: 375px) {
  html {
    font-size: 37.5px;
  }
}
@media (width: 414px) {
  html {
    font-size: 41.4px;
  }
}
.box {
  width: 10rem;
  height: 10rem;
  background-color: #8df;
}
```

![image-20230811171238483](https://post-src.wyun521.top/images/image-20230811171238483.png)

关于媒体查询的详细用法，请参考：[CSS 媒体查询（@media）全面解析](http://c.biancheng.net/css3/media.html)

##### flexible.js

[flexible.js](https://github.com/amfe/lib-flexible/) 是手淘开发出的一个用来适配移动端的 js 库，它可以根据视口宽度的大小自动调整 html 根字号的大小：

![image-20230811163655037](https://post-src.wyun521.top/images/image-20230811163655037.png)

![image-20230811163622182](https://post-src.wyun521.top/images/image-20230811163622182.png)

![image-20230811163721591](https://post-src.wyun521.top/images/image-20230811163721591.png)

> 相比手动调整媒体查询，flexible.js 方便便捷，需要注意的是在使用前，不要忘了先引入

##### less 基础语法

**什么是 less**

less 是一个 CSS 预处理器，拓展了 CSS 语法，提供了逻辑计算能力

> VS Code 插件：Easy LESS，保存 less 文件后自动生成对应的 CSS 文件

**less 注释**

```less
// 单行注释（不会出现在转换后的CSS中）
/* 多行注释 */
```

**less 嵌套**

在 less 中，可以使用嵌套语法选择相互嵌套的两个 html 元素，这将生成后代选择器：

```less
.father {
  .son {
    color: red;
    &:hover {
      color: green;
    }
  }
}
```

在转换后的 CSS 文件中显示：

```css
.father .son {
  color: red;
}
.father .son:hover {
  color: green;
}
```

> less 用 & 表示当前选择器，不会生成后代选择器，通常配合伪类或伪元素使用

**less 变量**

在做移动端适配时，常常需要将重复书写的多个属性值提取到一个变量中：

```less
@rootSize: 37.5rem;
@myColor: pink;

.box {
  width: (68 / @rootSize);
  height: (29 / @rootSize);
  background-color: pink;
}
```

> 变量需要先定义后使用
>
> - 定义变量：@变量名: 变量值;
> - 使用变量：@变量名

**less 运算**

less 提供了数学运算能力：

```less
.box {
  width: 100+20px;
  width: 100-80px;
  width: 100 * 2px;
  width: (68 / 37.5rem);
}
```

> 加、减、乘直接书写计算表达式，除法需要添加小括号

**less 导入**

在 less 文件中可以导入公共的 less 文件

```less
@import "./base.less";
@import "./base";
```

也可以这样导入

```less
@import url(./base.less);
@import url(./base);
```

**less 导出**

保存时，默认会把 less 文件转换为同名的 css 文件，保存在当前目录下

我们可以控制 css 文件的导出地址

```less
// out: ../css/  /* 将转换后的 css 文件保存在上一级目录下的 css 文件夹中 */
```

> 上面的代码必须在 less 文件首行添加，否则不会生效！

有时，我们不想让 less 文件导出为 css （比如书写公共样式的 less 文件） ，那么可以在首行添加：

```less
// out: false	/* 禁止导出 */
```

> 只是禁止导出，不妨碍它被其他 less 文件导入！

#### vw 适配

vw 是一个相对单位，它是相对于视口宽度计算大小的

- 1vw：1/100 视口宽度
- 1vh：1/100 视口高度
- 1vmin：1/100 视口宽度或高度（取最小值）
- 1vmax：1/100 视口宽度或高度（取最大值）

> 不要混用这几个单位，否则可能导致盒子变形

> 如果需要适配横屏移动设备，推荐使用 vmin 单位

**如何确定盒子 vw 单位的尺寸呢？**

![image-20230811171413126](https://post-src.wyun521.top/images/image-20230811171413126.png)

```less
@vw: 3.75vw;

// 一个在 iphone6/7/8 上，大小为 68×29 的盒子
.box {
  width: (68 / @vw);
  height: (29 / @vw);
  background-color: pink;
}
```

[一个使用 vw 做了移动端适配的智慧商城](https://smart-mall.wyun521.cn/)

#### 响应式布局

[bootstrap](https://v5.bootcss.com/docs/getting-started/introduction/) 是一个快速简洁的 CSS 框架，提供了一些全局样式和响应式布局能力，引入 bootstrap 后，我们只需要添加类名就可以调整页面的样式和布局

> bootstrap 实现响应式布局的底层还是使用的媒体查询

![image-20230815150135530](https://post-src.wyun521.top/images/image-20230815150135530.png)

![image-20230815152915861](https://post-src.wyun521.top/images/image-20230815152915861.png)

一个响应式布局的例子：

```css
.container {
  height: 100px;
  background-color: pink;
}
```

```html
<div class="container">
  <div class="row">
    <!-- 在不同的页面大小下，占有不同的份数 -->
    <div class="col-lg-3 col-md-6 col-sm-12">1</div>
    <div class="col-lg-3 col-md-6 col-sm-12">2</div>
    <div class="col-lg-3 col-md-6 col-sm-12">3</div>
    <div class="col-lg-3 col-md-6 col-sm-12">4</div>
  </div>
</div>
```

![bootstrap](https://post-src.wyun521.top/images/bootstrap.gif)

可以看到，随着页面大小的变化，页面的布局也相应地进行了一些调整，这就是 bootstrap 的响应式布局能力
