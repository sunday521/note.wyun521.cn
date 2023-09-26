## CSS 第四天

### CSS 盒模型

#### 盒模型分类

网页是由一个一个盒子组成的，盒子的作用是布局网页，摆放盒子和内容。一个盒子由四部分组成：

1.  content 内容
2.  padding 内边距
3.  border 边框
4.  margin 外边框

盒模型有两种：1. 标准盒模型 2. IE 盒模型

**标准盒模型**

标准盒模型是现代浏览器默认的盒模型，**盒子的实际尺寸=内容（设置的宽高）+内边距+边框**，也就是说，盒子的大小会受到内边距和边框的影响【可能撑大盒子】

```css
box-sizing: content-box; /* 默认就是标准盒模型 */
```

![image-20230714202047842](https://post-src.wyun521.top/images/image-20230714202047842.png)

添加内边距和边框后，盒子尺寸被撑大了（虽然我们设置的宽高是 200px，但盒子大小已经是 242px 了）

**IE 盒模型**

IE 盒模型是另一种盒模型，这种盒模型下，**盒子的实际尺寸=设置的宽高=内容内边距+边框**，也就是说，盒子的大小固定，宽高设多少就一定是多少

转换为 IE 盒模型：

```css
box-sizing: border-box;
```

![image-20230714202143029](https://post-src.wyun521.top/images/image-20230714202143029.png)

转换为 IE 盒模型后，盒子的宽高就固定了，此时再添加内边距和边框，盒子大小也不会被改变，只是会向内挤压内容区域

#### 边框

`border` 属性用来给元素添加边框，例如：

```csss
border: 1px solid red;
```

border 属性其实是下面三个属性的连写：

- border-width: 边框粗细，默认 3px
- border-style: 边框样式（solid 实线，dashed 虚线，dotted 点线）【必填】
- border-color：边框颜色，默认黑色

> - 如果没有设置边框样式，那么另外两个属性将不会生效
> - 盒子要有大小，边框才能够正常显示

**清除边框：**

```css
border: 0; /* 或 border: none; */
```

#### 内边距

`padding` 属性用来设置内边距，即内容和边框之间的距离。它可以接受多个值：

![image-20230714203746370](https://post-src.wyun521.top/images/image-20230714203746370.png)

> 记忆口诀：上右下左填值，没值看对面

> 给盒子设置背景颜色，会填充内容区域和 padding 区域

#### 外边距

`margin` 属性用来设置外边距，外边距是两个元素之间的距离（在元素边框之外）。当子元素是一个块元素并且宽度小于父元素宽度时，剩余宽度会被 margin 占据

外边距的用法和内边距基本相同，其中外边距的一个常见用法是**使块元素水平居中：**

```css
body {
  background-color: #eee;
}
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* 行内元素、行内块元素水平居中 */
  text-align: center;
  /* 块元素水平居中 */
  /* 方式一 */
  margin-left: auto;
  margin-right: auto;
  /* 方式二 */
  margin: 0 auto;
  /* 方式三 */
  margin: auto;
}
```

![image-20230715102505482](https://post-src.wyun521.top/images/image-20230715102505482.png)

> 块元素水平居中的前提是，这个块元素要有自定义的宽度！

**使用外边距可能会有一些意想不到的问题：**

**问题一 外边距合并**

垂直方向上并列的两个盒子，如果它们都设置了 margin，那么它们之间的外边距会合并【取较大值】

![image-20230715142940215](https://post-src.wyun521.top/images/image-20230715142940215.png)

![image-20230715142902734](https://post-src.wyun521.top/images/image-20230715142902734.png)

两个盒子之间的距离不是两者上下 margin 之和 150px，而是其中的较大值 100px

> margin 在水平方向上叠加，在垂直方向上合并

**问题二 外边距塌陷**

嵌套的两个元素，给子元素设置 `marign-top `，会把父元素一起带下去：

![image-20230715153059901](https://post-src.wyun521.top/images/image-20230715153059901.png)

解决方法（BFC）：

- 改为给父元素设置 padding-top 代替
- 给父元素设置 overflow: hidden;
- 给父元素设置 border-top

### 盒模型补充

#### 溢出隐藏

使用 `overflow` 属性可以改变内容超出元素尺寸时的处理方式

![image-20230715154254363](https://post-src.wyun521.top/images/image-20230715154254363.png)

![image-20230715154344610](https://post-src.wyun521.top/images/image-20230715154344610.png)

添加 overflow: hidden 后

![image-20230715154407248](https://post-src.wyun521.top/images/image-20230715154407248.png)

#### 清除默认边距

html 中大多数块元素都有默认的边距，为了消除对布局的影响，一般在开发前期就要清除默认边距：

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

![image-20230715161819063](https://post-src.wyun521.top/images/image-20230715161819063.png)

清除默认边距后：

![image-20230715161900764](https://post-src.wyun521.top/images/image-20230715161900764.png)

#### 行内元素设置边距

**行内元素只能设置水平方向上的边距，设置垂直边距会有问题：**

![image-20230715153717819](https://post-src.wyun521.top/images/image-20230715153717819.png)

结果：垂直外边距没有生效

![image-20230715153823209](https://post-src.wyun521.top/images/image-20230715153823209.png)

结果：垂直内边距上下不一致，并且布局错乱

> 我们一般不会被行内元素设置上下边距，只会设置左右边距

#### 结构选择器补充

![image-20230715094004038](https://post-src.wyun521.top/images/image-20230715094004038.png)

```css
/* 只看li元素，对第一个元素没有要求 */
.nav ul li:first-of-type {
  background-color: skyblue;
}
.nav ul li:last-of-type {
  background-color: red;
}
```

![image-20230715161031821](https://post-src.wyun521.top/images/image-20230715161031821.png)
