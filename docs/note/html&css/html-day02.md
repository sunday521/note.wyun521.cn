## HTML 第二天

### 01-音频标签

`<audio></audio>` 用来在网页中添加一段音频，属性有：

- src: 指定音频文件路径【必选】
- controls: 显示音频控制面板
- loop: 循环播放音频
- autoplay: 自动播放

> - 为了提升用户体验，浏览器默认都会禁止音频的自动播放，所以说 autoplay 定义了个寂寞
>
> - 在 HTML5 中，属性名和属性值相同时可以只写属性名

```html
<audio src="./BEYOND - 光辉岁月.mp3" controls autoplay loop></audio>
```

### 02-视频标签

和音频标签类似，我们使用 `<video></video>` 在网页中添加一段视频，它的属性有：

- src: 指定视频文件路径【必选】
- controls: 显示视频控制面板
- loop: 循环播放视频
- muted: 静音播放
- autoplay: 自动播放

> 浏览器允许视频在静音状态下自动播放，即 autoplay 属性必须配合 muted 属性使用

```html
<video src="./囍fin.mp4" controls loop muted autoplay width="600px"></video>
```

### 03-列表

HTML 中的列表用来展示结构相似的一组数据，共有三类列表：

- 无序列表 ul【常用】
- 有序列表 ol
- 自定义列表 dl

使用列表的例子：

```html
<!-- 无序列表 -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
<!-- 有序列表 -->
<ol>
  <li>这是第一步</li>
  <li>这是第二步</li>
  <li>这是第三步</li>
</ol>
<!-- 自定义列表 -->
<dl>
  <dt>友情链接</dt>
  <dd>百度</dd>
  <dd>谷歌</dd>
  <dd>搜狐</dd>
</dl>
```

> 列表的直接子元素只能是 li 元素、dt 元素或 dd 元素，其他元素可以嵌套在他们里面。这是一个基本的规范

### 04-表格

表格用来展示相关的一组数据，一个表格的例子：

```html
<table border="1">
  <thead>
    <tr>
      <th>姓名</th>
      <th>语文</th>
      <th>数学</th>
      <th>英语</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>小明</td>
      <td>99</td>
      <td>98</td>
      <td>95</td>
    </tr>
    <tr>
      <td>小红</td>
      <td>99</td>
      <td>99</td>
      <td>100</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>总结</td>
      <td>非常非常优秀</td>
      <td>非常非常优秀</td>
      <td>非常非常优秀</td>
    </tr>
  </tfoot>
</table>
```

![image-20230708151818244](https://post-src.wyun521.top/images/image-20230708151818244.png)

这里使用了表格的结构化语义标签，让表格的结构更清晰，这也是推荐的写法

> **表格用来统计和展示数据，而不是做网站布局**（在 2005 年之前，国内大多数网站确实是使用表格来做网站布局的，这样做的缺点是，浏览器读完整个表格才会加载显示，严重影响用户体验）。现在常用的网页布局方式是 `div+css`

**合并单元格步骤**

1.  明确要合并的单元格

2.  保留最左最上的单元格，并添加 rowspan 或 colspan 属性

3.  删除多余单元格
4.  注意不能跨表格结构化语义标签合并单元格

```html
<table border="1">
  <thead>
    <tr>
      <th>姓名</th>
      <th>语文</th>
      <th>数学</th>
      <th>英语</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>小明</td>
      <td rowspan="2">99</td>
      <td>98</td>
      <td>95</td>
    </tr>
    <tr>
      <td>小红</td>
      <!-- <td>99</td> -->
      <td>99</td>
      <td>100</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>总结</td>
      <td colspan="3">非常非常优秀</td>
      <!-- <td>非常非常优秀</td> -->
      <!-- <td>非常非常优秀</td> -->
    </tr>
  </tfoot>
</table>
```

![image-20230708152529491](https://post-src.wyun521.top/images/image-20230708152529491.png)

### 05-用户输入

在登录注册页面、表单、搜索页面，我们常常使用 `<input>` 来获取用户输入

input 标签的常用属性有：

- type: 输入类型
  - text: 文本框
  - password: 密码框
  - radio: 单选按钮【使用 name 属性分组，同一组只能选择一个】
  - checkbox: 多选按钮
  - file: 文件上传按钮
- placeholder: 提示文本
- checked: 默认选中

```html
文本框：<input type="text" placeholder="请输入用户名" /><br /><br />
密码框：<input type="password" placeholder="请输入密码" /><br /><br />
单选框：<input type="radio" name="sex" checked />男
<input type="radio" name="sex" />女<br /><br />
多选框：<input type="checkbox" checked />篮球 <input type="checkbox" />足球
<input type="checkbox" />羽毛球<br /><br />
上传文件: <input type="file" /><br /><br />
```

![image-20230708153645532](https://post-src.wyun521.top/images/image-20230708153645532.png)
