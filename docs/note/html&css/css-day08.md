## CSS第八天

### 过渡与变换

之前写了一篇笔记：[【CSS第七天】CSS隐藏元素、字体图标和精灵图、变换和过渡效果](https://juejin.cn/post/7259595485089873957#heading-6)

### 小案例

**例一 开关门案例**

>   技术点：translate 平移，transition 过渡

1.   先搭建元素基础结构和样式

```html
<div class="box"></div>
```

```css
.box {
    width: 1366px;
    height: 600px;
    background: url(./images/bg.jpg);
    margin: 100px auto;
}
```

2.   使用伪元素创建 box 的两个子元素

```css
/* 使用一张图片的不同部分 */
.box::before {
    content: "";
    width: 50%;
    height: 100%;
    background: url(./images/fm.jpg);
}
.box::after {
    content: "";
    width: 50%;
    height: 100%;
    background: url(./images/fm.jpg);
    background-position: right center;
}
/* 让两个子伪元素横排，可设置宽高 */
.box {
    display: flex;
}
```

3.   hover 盒子时，移出两个子伪元素

```css
.box:hover::before {
    transform: translateX(-100%);
}
.box:hover::after {
    transform: translateX(100%);
}
/* 添加过渡效果 */
.box::before {
    transition: all 0.5s;
}
.box::after {
    transition: all 0.5s;
}
```

4.   最后将超出盒子的部分隐藏掉

```css
.box {
    overflow: hidden;
}
```

【图片】

**例二 旋转扑克牌**

>   技术点：rotate 旋转，transition 过渡

1.   先搭建元素基础结构和样式

```html
<div class="box">
    
    <img src="./images/pk1.png" alt="" />
    <img src="./images/pk2.png" alt="" />
    <img src="./images/pk1.png" alt="" />
    <img src="./images/pk2.png" alt="" />
    <img src="./images/pk1.png" alt="" />
    <img src="./images/pk2.png" alt="" />
</div>
```

```css
.box {
    width: 250px;
    height: 350px;
    margin: 400px auto 0;
}
.box img {
    width: 100%;
    height: 100%;
}
```

2.   利用定位把图片全部定在一个位置

```css
.box img {
    position: absolute;
    top: 0;
    left: 0;
}
.box {
    position: relative;
}
```

3.   hover box 时旋转每张图片

```css
.box img {
    /* origin 默认在中心点，这里移到左上角 */
    transform-origin: 0 0;
    transition: all 1s;
}
.box:hover img:nth-child(1) {
    transform: rotate(60deg);
}
.box:hover img:nth-child(2) {
    transform: rotate(120deg);
}
.box:hover img:nth-child(3) {
    transform: rotate(180deg);
}
.box:hover img:nth-child(4) {
    transform: rotate(240deg);
}
.box:hover img:nth-child(5) {
    transform: rotate(300deg);
}
.box:hover img:nth-child(6) {
    transform: rotate(360deg);
}
```

