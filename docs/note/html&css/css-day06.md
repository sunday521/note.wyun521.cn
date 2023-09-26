## CSS 第六天

### 光标样式

` cursor` 属性可以更改鼠标经过某元素时的光标样式，它的属性值有：

- default：箭头（默认）
- pointer：小手形状
- text：文本输入
- not-allowed：禁止点击
- wait：等待完成

### 定位

#### 定位的作用

定位的使用场景有：

- 改变盒子在网页中的位置
- 将盒子固定在网页的某一位置
- 让盒子在其他盒子上方显示

![image-20230723195955522](https://post-src.wyun521.top/images/image-20230723195955522.png)

![image-20230723195422076](https://post-src.wyun521.top/images/image-20230723195422076.png)

![image-20230723195648254](https://post-src.wyun521.top/images/image-20230723195648254.png)

#### 定位模式

`position` 属性用来指定定位模式，属性值：

- static：静态定位，**盒子按页面正常文档流显示**，不进行任何移动（默认）
- relative：相对定位，**以盒子原本的位置为基准**，使用方位属性进行移动
- absolute：绝对定位，**以最近的非 static 定位祖先元素为基准**，使用方位属性进行移动
- fixed：固定定位，**以浏览器视口为基准**，使用方位属性进行移动，并且固定盒子位置，不随页面滚动而滚动

**三种定位模式的对比**

| 定位模式 | 是否脱标                     | 是否转换显示模式                         |
| -------- | ---------------------------- | ---------------------------------------- |
| relative | 盒子不脱标                   | 盒子显示模式不变                         |
| absolute | 盒子脱标，不再占有标准流空间 | 盒子显示模式转换为行内块，可直接设置宽高 |
| fixed    | 盒子脱标，不再占有标准流空间 | 盒子显示模式转换为行内块，可直接设置宽高 |

> - 一般脱标的元素都具备行内块的特点，像绝对定位，固定定位，浮动等（flex 不脱标）
>
> - 我们在布局时，要遵循一个原则：**子绝父相** （父元素使用相对定位不会影响后面的元素，子元素使用绝对定位方便移动）

#### 边偏移

设置定位模式后，可以使用边偏移属性移动盒子位置

- top：距离基准顶部的距离
- bottom：距离基准底部的距离
- left：距离基准左侧的距离
- right：距离基准右侧的距离

> - 四个方位的属性值可以是 px、百分比单位的，正值往里走，负值往外走
> - top 和 bottom、left 和 right 相反方向只能设置一个，如果都设置，以 top 和 left 为准
> - 除非设置了 position 定位属性，否则设置任何边偏移都不会有效果

#### 堆叠层级

定位后的元素层级提高，在普通元素上方显示

在 html 结构中，后定义的定位元素在先定义的定位元素上方显示

要改变定位元素之间的层叠顺序，可以使用 `z-index` 属性，该属性接受一个整数数字用来表明定位元素的层级，数值越大越靠上

![image-20230723200316579](https://post-src.wyun521.top/images/image-20230723200316579.png)

![image-20230723200402173](https://post-src.wyun521.top/images/image-20230723200402173.png)

#### 定位居中

假设有这样的 html 结构：

```html
<!-- css -->
<style>
  .dad {
    position: relative;
    width: 800px;
    height: 500px;
    background-color: skyblue;
    margin: 100px auto;
  }
  .son {
    width: 300px;
    height: 150px;
    background-color: pink;
  }
</style>

<!-- html -->
<div class="dad">
  <div class="son"></div>
</div>
```

![image-20230723174512384](https://post-src.wyun521.top/images/image-20230723174512384.png)

现在，我们想让粉色盒子在父元素中水平垂直居中，可以先将子元素向右、向下移动父元素宽高的一半，再将子元素向左、向上移动自身宽高的一半，此时子元素刚好在父元素中水平垂直居中

写法一

```css
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
}
```

写法二

```css
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  /* 这里的百分比，是子元素自身的百分比 */
  transform: translate(-50%, -50%);
}
```

写法三

```css
.son {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

![image-20230723180003084](https://post-src.wyun521.top/images/image-20230723180003084.png)

> 三种方式都要先设置父元素为相对定位，给子元素一个基准

> 关于更多 CSS 水平垂直居中的方式，请参考 [CSS 实现水平垂直居中的 6 种方式](https://blog.csdn.net/weixin_44370837/article/details/116602151)
>
> 有关定位的详细介绍，请参考 [CSS 的浮动和定位布局详细（全）](https://juejin.cn/post/6886247611318140942#heading-11)
