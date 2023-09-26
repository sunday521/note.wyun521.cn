## CSS 第一天

### 01-CSS 入门

#### 基础语法

CSS 的基础语法：

```css
选择器 {
  属性: 属性值;
}
```

常见的行内元素有：`<span>` `<label>` `<img>` `<i>` `<a>`

常见的块级元素有：`<div>` `<p>` `<h1>~<h6>` `<ul>`

#### 引入方式

CSS 样式有三种引入方式，分别是：

- 行内样式：通常通过 js 添加，最终效果如 ` <p style="color: gray; font-size: 16px">这是第二段文字</p>`
- 内部样式：直接在 style 标签中书写【学习使用】
- 外部样式：引入外部的 CSS 文件，如 `  <link rel="stylesheet" href="style.css" />`【开发使用】

#### 基础选择器

CSS 中选择器是一个很重要的概念，所有 html 元素都需要先选中，才能给它们添加或修改样式，这就是选择器的功能。CSS 基础选择器有以下几种：

- 标签选择器：如 `p{}` `span{}`
- 类选择器：如 `.nav{}` `.title{}` 【最常用】
- id 选择器：如 `#nav{}` `#title{}`
- 通配符选择器：即 `*{}` ，通常用来清除内外边距

PS：在实际开发中，这些选择器通常会配合使用

> - id 选择器和标签的关系是一对一的，类选择器多对多（一个类选择器可以对应多个标签，一个标签也可以有多个类名）
> - 类名要见名知意，可以使用-和\_符号，不能用中文，不能用数字开头，不要用拼音简写。

### 02-CSS 文字属性

#### 文字大小

`font-size` 属性用来设置文字的大小，文字大小使用 px 单位，一般设置为偶数

PS：`font-size: 0;`可以隐藏文字

> 谷歌浏览器默认文字大小为 16px

#### 文字粗细

`font-weight` 属性用来设置文字的粗细。它的属性值可以使纯数字，也可以是英文单词：

```css
/* 加粗文字的两种写法 */
span {
  font-weight: 700; /* 相当于font-weight:bold; */
}
```

我们也可以反其道行之：

```css
/* 将文字粗细恢复正常 */
strong {
  font-weight: 400; /* 相当于font-weight:normal; */
}
```

PS：如果将 `font-weight` 调到 100~300，文字就会变得比正常文字更细

> 在实际开发中，推荐使用纯数字的写法

#### 文字倾斜

`font-style` 属性指定文字是否倾斜：

```css
/* 将span文字倾斜显示 */
span {
  font-style: italic;
}
```

在实际开发中，由于我们经常使用 `<i></i>` 标签来显示图标，所以我们一般会先设置：

```css
/* i标签中的文字和图标正常显示，不倾斜 */
i {
  font-style: normal;
}
```

#### 文字行高

行高是两行文字基线之间的距离，也可以看做顶线的距离。行高会包括文字的高度

![image-20230711101210092](https://post-src.wyun521.top/images/image-20230711101210092.png)

`line-height` 属性用来设置文字的行高。我们常用行高属性来**垂直居中文字**：

```css
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* 当行高等于盒子高度时，盒子内的‘单行文本’会在盒子中垂直居中 */
  line-height: 200px;
}
```

如果我们在设置行高时没有指定单位，表示行高是当前文字大小的若干倍：

```css
.box {
	font-size: 16px
	line-height: 1.5;	/* 行高为32px */
}
```

#### 字体族

`font-family` 属性可以指定若干字体，浏览器会从前往后寻找，直到找到可用的字体应用：

```css
body {
  font-family: "黑体", "华文彩云", "幼圆", sans-serif;
}
```

![image-20230711105557775](https://post-src.wyun521.top/images/image-20230711105557775.png)

> sans-serif 是计算机默认的无衬线字体，这种字体没有笔锋，不容易造成视觉疲劳，在计算机上经常使用，如微软雅黑等

### 03-CSS 文本属性

#### 文本缩进

`text-indent` 属性用来使一段文本首行缩进显示：

```css
p {
  /* 首行缩进两个字符的大小 */
  text-indent: 2em;
}
```

> 1em 等于当前文字的大小

#### 文本修饰

`text-decoration` 属性用来修饰文本，就是加下划线什么的。一个常用用法是去除 a 标签的下划线修饰：

```css
/* 清除a标签默认的下划线 */
a {
  text-decoration: none;
}
span {
  /* 添加上划线 */
  /* text-decoration: overline; */
  /* 添加删除线 */
  /* text-decoration: line-through; */
  /* 添加下划线 */
  text-decoration: underline;
}
```

#### 文本水平对齐

`text-align` 属性用来定义文本在水平方向上的对齐方式，属性值可以是 left、center、right 其中之一

```html
<div class="one">Promise</div>
<div class="two">
  <a href="#">百度</a>
  <a href="#">百度</a>
  <a href="#">百度</a>
</div>
```

```css
.one {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* 垂直居中 */
  line-height: 200px;
  /* 水平居中 */
  text-align: center;
}
.two {
  text-align: center;
}
```

![image-20230711151123443](https://post-src.wyun521.top/images/image-20230711151123443.png)

> text-align 是给父元素添加，让**子元素（可以是文本，行内元素，图片、表单控件等）**在父元素中水平对齐。这个父元素通常是 div 充当的

> text-align 不能控制块级元素的水平对齐方式！
