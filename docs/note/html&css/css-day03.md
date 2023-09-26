## CSS 第三天

### CSS 三大特性

#### 继承性

子标签可以继承父标签的特定样式。**在 CSS 中，文字属性、文本属性默认是可继承的，而关于盒子、定位、布局的属性，都不能够被继承**

![image-20230714103050983](https://post-src.wyun521.top/images/image-20230714103050983.png)

> 如果标签有默认样式，继承的属性就不会生效。像继承的 color 无法影响 a 标签，继承的 font-size、font-weight 无法影响 h1 标签等

#### 层叠性

层叠性主要是为了解决样式冲突的问题，它规定了当一个标签设置了多个相同的属性时，哪个属性会被覆盖，哪个属性最终会生效

![image-20230714114909085](https://post-src.wyun521.top/images/image-20230714114909085.png)

**隐藏属性问题**

在使用连写属性时，因为有一些默认的属性值，可能会把前面刚定义的单个属性覆盖：

```css
/* background连写，默认背景颜色是transparent，所以下面的background-color会被覆盖 */
background-color: pink;
background: url(./logo.png) no-repeat; /* 实际转换为 background: transparent url(./logo.png) no-repeat; */
```

![image-20230714114545601](https://post-src.wyun521.top/images/image-20230714114545601.png)

再比如：

```css
width: 200px;
height: 200px;
background-color: pink;
text-align: center;
line-height: 200px;
/* font连写，默认行高为normal，所以会把上面的line-height覆盖掉，导致文字并没有垂直居中 */
font: 16px 黑体;
```

![image-20230714114736678](https://post-src.wyun521.top/images/image-20230714114736678.png)

#### 优先级

对于简单选择器，优先级的基本规则是：【重要】

```html
!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 > 浏览器默认样式 >
继承（未选中）
```

对于复杂的选择器，可以通过计算权重来确定其优先级：[CSS 样式表的继承性和层叠性](https://web.qianguyihao.com/02-CSS%E5%9F%BA%E7%A1%80/05-CSS%E6%A0%B7%E5%BC%8F%E8%A1%A8%E7%9A%84%E7%BB%A7%E6%89%BF%E6%80%A7%E5%92%8C%E5%B1%82%E5%8F%A0%E6%80%A7.html)

举例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 【1】 0,1,2 */
      .nav li a {
        color: green;
      }
      /* 【2】 0,1,3 */
      /* 权重比【1】高，覆盖 */
      .nav ul li a {
        color: red;
      }
      /* 【3】 0,1,0 */
      /* 不生效，权重低 */
      .last {
        color: orange;
      }
      /* 【4】 0,2,0 */
      /* 生效，提高了权重 */
      .nav .last {
        color: purple;
      }
      /* 【5】 0,1,1 */
      /* 不生效，权重低 */
      a:hover {
        color: gray;
      }
      /* 【6】 0,2,1 */
      /* 生效，提高了权重 */
      /* 伪类也算一个类选择器 */
      .nav a:hover {
        color: blue;
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <ul>
        <li><a href="#">索隆</a></li>
        <li><a href="#">路飞</a></li>
        <li><a href="#" class="last">山治</a></li>
      </ul>
    </div>
  </body>
</html>
```

![image-20230714142250315](https://post-src.wyun521.top/images/image-20230714142250315.png)

hover：

![image-20230714142328052](https://post-src.wyun521.top/images/image-20230714142328052.png)

> 当我们添加的样式语法正确，样式却不生效时，就可以看看是否是选择器的权重太低了，如果是，提高一下权重就可以了

### CSS 选择器补充

#### 结构伪类选择器

我们可以根据 HTML 元素结构来选择元素：

```css
/* 选择第一个li（不是孩子） */
.mom ul li:first-child {
  background-color: pink;
}
/* 选择最后一个li（不是孩子） */
.mom ul li:last-child {
  background-color: blue;
}
```

![image-20230714145141775](https://post-src.wyun521.top/images/image-20230714145141775.png)

> 这里要求 ul 的第一个孩子必须是 li 标签才能选中，若写成 .mom ul :last-child 对第一个孩子是谁没有要求

为了能够选择更多的元素，CSS 还提供了 `:nth-child()` 结构伪类选择器：

```css
/* 【1】单词 */
/* even 表示偶数（元素从1开始） */
.dad ul li:nth-child(even) {
  background-color: skyblue;
}
/* odd 表示奇数（元素从1开始） */
.dad ul li:nth-child(odd) {
  background-color: pink;
}
/* 【2】数字*n */
/* 表示数字的0,1,2...倍，n表示0,1,2... */
/* 5*0 5*1 5*2... */
.dad ul li:nth-child(5n) {
  background-color: red;
}
/* 2*0+1 2*1+1 2*2+1... */
.dad ul li:nth-child(2n + 1) {
  background-color: purple;
}
/* 【3】数字 */
/* 表示第几个（元素从1开始） */
.dad ul li:nth-child(3) {
  background-color: blue;
}
```

![image-20230714151602350](https://post-src.wyun521.top/images/image-20230714151602350.png)

使用 `nth-child` 属性进行连选：

```css
/* 选择前5个 0+5 -1+5 -2+5 -3+5 -4+5 -5+5 */
.dad ul li:nth-child(-n + 5) {
  background-color: pink;
}

/* 选择从第5个开始后面所有的元素 0+5 1+5... */
.dad ul li:nth-child(n + 5) {
  background-color: gray;
}

/* 选择后5个 :nth-last-child从后往前数 */
.dad ul li:nth-last-child(-n + 5) {
  background-color: skyblue;
}
```

![image-20230714153140318](https://post-src.wyun521.top/images/image-20230714153140318.png)

> :nth-child 的功能非常强大，它支持数字、单词、表达式多种方式选择元素，唯一需要注意的是 html 元素是从 1 开始数的，n 是从 0 开始的

#### 伪元素选择器

伪元素用来摆放装饰性的内容，常用的伪元素有：

- ::before 在元素内部最前面添加一个伪元素
- ::after 在元素内部最后面添加一个伪元素

```css
.box::before {
  content: "锄禾";
}
.box::after {
  content: "当午";
}
```

![image-20230714160836925](https://post-src.wyun521.top/images/image-20230714160836925.png)

伪元素的几个注意点：:smile:

- **content 属性必填，用于设置伪元素的内容【可以为空】**
- 添加的伪元素是一个行内元素
- 在权重计算中，伪元素相当于一个标签

**伪元素拓展**

```css
/* 设置文本首行样式 */
p::first-line {
  background-color: pink;
}
/* 设置文本首字母样式 */
p::first-letter {
  color: red;
  font-size: 30px;
  font-weight: 700;
}
/* 设置选中时的样式 */
p::selection {
  color: #fff;
  background-color: skyblue;
}
/* 设置提示文本样式 */
input::placeholder {
  color: pink;
}
```

![image-20230714163227429](https://post-src.wyun521.top/images/image-20230714163227429.png)
