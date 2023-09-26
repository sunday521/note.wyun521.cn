## HTML 第三天

### 表单补充

#### 多文件上传

添加 multiple 属性可以上传多个文件：

```html
<input type="file" multiple />
```

#### 下拉列表

`<select></select>` 用来定义一个下拉列表，`<option></option>` 定义每个列表项，声明了 `selected` 属性的列表项会默认被选中

下面是一个下拉列表的例子：

```html
你所在的城市：
<select>
  <option value="1">北京</option>
  <option value="2" selected>上海</option>
  <option value="3">广州</option>
  <option value="4">深圳</option>
</select>
```

![image-20230709152653938](https://post-src.wyun521.top/images/image-20230709152653938.png)

> value 属性是提交表单时给后台传递的数据

#### 多行文本域

`<textarea></textarea>` 定义一个多行文本域，可供用户输入一大段文本，像商品下面的评论区域就是它。例子：

```html
<textarea cols="30" rows="10"></textarea>
```

![image-20230709153351191](https://post-src.wyun521.top/images/image-20230709153351191.png)

textarea 默认是可以被拖拽的，这可能导致页面布局错乱，所以我们一般会禁用拖拽功能：

```html
<textarea style="resize: none"></textarea>
```

#### label 说明文本

我们可以用 `<label></label>` 包裹 input 控件前的说明文本，以便更好地设置说明文本的 CSS 样式

```html
<label>用户名：</label> <input type="text" />
```

label 的功能远不止这么简单，被它包裹的说明文本可以和 input 控件进行联动，提高用户体验：

```html
<!-- 方式一 -->
<input type="radio" name="gender" id="man" />
<label for="man">男</label>
<input type="radio" name="gender" id="women" />
<label for="women">女</label>
<br /><br />
<!-- 方式二 -->
<label> <input type="radio" name="gender" /> 男 </label>
<label> <input type="radio" name="gender" /> 女 </label>
```

当点击 label 包裹的文字时，因为 for 属性指定了相应的 input 控件，所以文字对应的 input 控件也会被点击

#### 按钮控件

`<button></button>` 定义一个按钮，按钮有好几种：

- submit: 提交全部表单数据到后台
- reset: 重置表单所有内容
- button: 普通按钮，可通过 js 添加功能

> - 使用提交按钮和重置按钮时，需要将它们和要操作的表单控件包裹在一个 form 标签中，否则不会生效
> - button 标签是 html5 新增的语义化标签，在这之前都是使用 input 控件定义按钮

```html
<form action="#">
  用户名：<input type="text" name="username" /><br /><br />
  密码：<input type="password" name="password" /><br /><br />
  <!-- html5 按钮实现方式 -->
  <button type="submit">提交</button>
  <button type="reset">重置</button>
  <button>普通按钮1</button>
  <button type="button">普通按钮2</button>
  <br /><br />
  <!-- xhtml1.0 按钮实现方式 -->
  <input type="submit" value="提交" />
  <input type="reset" value="重置" />
  <input type="button" value="普通按钮" />
</form>
```

![image-20230709162056370](https://post-src.wyun521.top/images/image-20230709162056370.png)

#### 表单综合案例

```html
<form action="#">
  <h1>青春不常在，抓紧谈恋爱</h1>
  <hr />
  <label>昵称：</label>
  <input type="text" placeholder="请输入昵称" />
  <br /><br />

  <!-- 1111 -->
  <label>性别：</label>
  <label> <input type="radio" name="sex" checked />男 </label>
  <label> <input type="radio" name="sex" />女 </label>
  <br /><br />

  <label>所在城市：</label>
  <select>
    <option value="1">上海</option>
    <option value="2">北京</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
  </select>
  <br /><br />

  <label>婚姻状况：</label>
  <input type="radio" name="gender" id="no" checked />
  <label for="no">未婚</label>
  <input type="radio" name="gender" id="yes" />
  <label for="yes">已婚</label>
  <input type="radio" name="gender" id="mimi" />
  <label for="mimi">保密</label>
  <br /><br />

  <label>喜欢的类型：</label>
  <label><input type="checkbox" checked />可爱</label>
  <label><input type="checkbox" checked />性感</label>
  <label><input type="checkbox" />御姐</label>
  <label><input type="checkbox" />萝莉</label>
  <label><input type="checkbox" />小鲜肉</label>
  <label><input type="checkbox" />大叔</label>
  <br /><br />

  <label>个人介绍：</label>
  <br /><br />
  <textarea cols="60" rows="10"></textarea>
  <br />

  <h3>Promise</h3>
  <ul>
    <li>年满18岁、单身</li>
    <li>抱着严肃的态度</li>
    <li>真诚寻找另一半</li>
  </ul>

  <input type="checkbox" id="agree" />
  <label for="agree">我同意所有条款</label>
  <br /><br />

  <button type="submit">免费注册</button>
  <button type="reset">重置</button>
</form>
```

效果：

![image-20230709200331431](https://post-src.wyun521.top/images/image-20230709200331431.png)

### 布局标签

![image-20230709162413706](https://post-src.wyun521.top/images/image-20230709162413706.png)

### 字符实体

| 字符实体 | 显示 |
| -------- | ---- |
| `&nbsp;` | 空格 |
| `&lt;`   | <    |
| `&gt;`   | >    |

> 浏览器会把 html 源代码中多余的空格、回车和空行替换为网页中的一个空格
