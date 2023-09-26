## webapi-day05

### BOM 相关操作

#### location 对象

`location` 对象表示一个地址，它拆分并保存了浏览器 URL 地址的各个组成部分：

![image-20230829095825378](https://post-src.wyun521.top/images/image-20230829095825378.png)

下面是一个例子：

```js
console.log("href:", location.href);
console.log("search:", location.search);
console.log("hash:", location.hash);
```

![image-20230829145911224](https://post-src.wyun521.top/images/image-20230829145911224.png)

**支付成功自动跳转**

```html
<a href="#">支付成功！<span>5</span>秒后自动跳转到首页</a>
```

```js
const a = document.querySelector("a");
let num = 5;
let timer = setInterval(function () {
  num--;
  if (num <= 0) {
    clearInterval(timer);
    location.href = "https://www.jd.com";
  }
  a.innerHTML = `支付成功！<span>${num}</span>秒后自动跳转到首页`;
}, 1000);
```

![image-20230829124538298](https://post-src.wyun521.top/images/image-20230829124538298.png)

> 使用 location.href 跳转页面没有历史记录，不能前进和后退

#### navigator 对象

`navigator` 对象记录了用户浏览器的相关信息，其中的 `userAgent` 属性用来获取用户浏览器的版本及平台

```js
// 检测访问设备是否是手机端
(function () {
  const userAgent = navigator.userAgent;
  // 验证是否为Android或iPhone
  const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
  const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
  // 如果是Android或iPhone，则跳转至移动端站点
  if (android || iphone) {
    location.href = "https://m.jd.com";
  }
})();
```

![image-20230829125156849](https://post-src.wyun521.top/images/image-20230829125156849.png)

![image-20230829125412648](https://post-src.wyun521.top/images/image-20230829125412648.png)

#### history 对象

`history` 对象用来管理历史记录， 与浏览器地址栏的操作相对应，如前进、后退等

![image-20230829222802302](https://post-src.wyun521.top/images/image-20230829222802302.png)

```html
<button class="back">&lt;后退</button> <button class="forward">前进&gt;</button>
```

```js
// 1.前进
const forward = document.querySelector(".forward");
forward.addEventListener("click", function () {
  history.go(1); // 相当于history.forward()
});
// 2.后退
const back = document.querySelector(".back");
back.addEventListener("click", function () {
  history.go(-1); // 相当于history.back()
});
```

> history 对象一般在实际开发中比较少用，但是会在一些 OA 办公系统中见到

### 本地存储

`本地存储`：将数据直接存储在用户浏览器上。[一个使用 localStorage 进行本地存储的待办事项网站](https://todomvc.com/examples/vanilla-es6/)

`本地存储的两种方式`：

- `localStorage`：本地存储，刷新页面或关闭浏览器，数据永不丢失（除非手动删除）
- `sessionStorage`：会话存储，关闭标签页或浏览器后数据会被清除

操作数据的方法有：

- `setItem(key,value)`：在本地存储中添加数据
- `getItem(key)`：获取本地存储中的数据
- `removeItem(key)`：删除本地存储中的数据
- `clear()`：清空本地存储中的数据（慎用）

> 本地存储数据只能由字符串类型的键和值组成

**两种本地存储方式的对比**

先分别存储一个数据：

```js
localStorage.setItem("username", "王聪聪");
sessionStorage.setItem("age", 18);
```

在控制台打印它们：

```js
console.log(localStorage.getItem("username"));
console.log(sessionStorage.getItem("age"));
```

![image-20230829114249785](https://post-src.wyun521.top/images/image-20230829114249785.png)

关闭浏览器后重新打开：

![image-20230829114850815](https://post-src.wyun521.top/images/image-20230829114850815.png)

> 可以发现，sessionStorage 中的数据已经失效，而 localStorage 中的数据还在

**本地存储的控制台操作**

我们可以直接在控制台查看和操作本地存储中的数据：

![image-20230829114606969](https://post-src.wyun521.top/images/image-20230829114606969.png)

**复杂类型数据的本地存储**

本地存储只能存储字符串，无法存储复杂类型的数据。我们可以先将复杂类型数据转换成 json 字符串，然后再存储到本地

- `JSON.stringify()`：将复杂类型数据转换成 json 字符串
- `JSON.parse()`：将 json 字符串解析成对象

下面是一个例子：

```js
// 本地存储复杂数据类型
const mi = {
  name: "小米",
  price: 2998,
};
// 1. 把对象转换为JSON字符串  JSON.stringify()
localStorage.setItem("mi", JSON.stringify(mi));

// 2. 把JSON字符串解析为对象  JSON.parse()
console.log(JSON.parse(localStorage.getItem("mi")));
```

**渲染页面的新方式**

我们常使用下面两个方法渲染页面：

- `map(fn)`：将每个数组元素映射到一个函数中处理，并返回处理后的新数组

- `join(separator)`：将数组元素拼接成新的字符串，separator 分隔符

```js
const data = [{ uname: "张三" }, { uname: "李四" }, { uname: "王五" }];
let str = data
  .map(function (ele, i) {
    return `<div>${ele.uname}</div>`;
  })
  .join("");
document.body.innerHTML = str;
```

![image-20230829224519803](https://post-src.wyun521.top/images/image-20230829224519803.png)

> 这两个方法常和本地存储配合使用，共同完成动态页面的渲染
