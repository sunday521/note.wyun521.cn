## ajax-day03

### XMLHttpRequest 对象

> 浏览器默认通过 XMLHttpRequest(XHR) 对象与服务器通信，axios 是第三方库对原生的 XMLHttpRequest 对象进行了封装，能够更方便地发起网络通信

> 了解原生 XHR 网络请求的用法，可以更好地理解 axios 的内部原理

**XHR 获取数据的基础语法**

```js
// 需求：获取省份数据
// 1.创建一个XMLHttpRequest对象
const xhr = new XMLHttpRequest();
// 2.设置请求方法和请求地址
xhr.open("GET", "https://hmajax.itheima.net/api/province");
// 3.添加loadend事件，用来接收响应结果
xhr.addEventListener("loadend", function () {
  // 接收服务器返回数据，是一个字符串
  console.log(xhr.response);
  // 将结果转为对象渲染到页面上
  const data = JSON.parse(xhr.response);
  document.querySelector(".list").innerHTML = data.list.join(",");
});
// 4.发起网络请求
xhr.send();
```

> 如果需要查询参数，直接拼接在 url 地址后面，使用 `?` 分隔即可

> 如果需要提交数据，先设置 `Content-Type` 请求头信息，然后在 `send` 方法中传入指定格式的数据

**eg.地区数据查询**

```js
//  需求：输入省份和城市，查询出对应的地区列表
document.querySelector(".sel-btn").addEventListener("click", function () {
  // 点击查询后再获取输入框的值
  const pname = document.querySelector(".province").value;
  const cname = document.querySelector(".city").value;
  // 利用URLSearchParams对象动态生成查询参数
  const params = new URLSearchParams({ pname, cname });
  const queryStr = params.toString();
  // 每次提交重新创建XHR对象，用来发送查询请求
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://hmajax.itheima.net/api/area?${queryStr}`);
  xhr.addEventListener("loadend", function () {
    const data = JSON.parse(xhr.response);
    // 将响应的地区列表渲染到页面上
    document.querySelector(".area-group").innerHTML = data.list
      .map((ele) => {
        return `
                <li class="list-group-item">${ele}</li>
              `;
      })
      .join("");
  });
  xhr.send();
});
```

![image-20230910104912598](https://post-src.wyun521.top/images/image-20230910104912598.png)

**eg.用户注册**

```js
// 需求：完成用户注册
// 点击注册按钮，发起网络请求，向服务器提交用户数据
document.querySelector(".btn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://hmajax.itheima.net/api/register");
  xhr.addEventListener("loadend", function () {
    console.log(xhr.response);
  });
  // 设置请求头信息
  xhr.setRequestHeader("Content-Type", "application/json");
  const user = {
    username: "admin666",
    password: "123456",
  };
  // 必须按指定的格式发送数据
  xhr.send(JSON.stringify(user));
});
```

### Promise 对象

`Promise` 是浏览器内置的一个对象，用来管理异步操作或异步请求，并且能够接收成功或失败的结果。我们可以使用 Promise 来管理 XHR 对象

```js
const p = new Promise((resolve, reject) => {
  // 执行异步操作
  // resolve(成功结果) 返回成功结果，同时将Promise对象的状态改为fullfilled
  // reject(失败结果) 返回失败结果，同时将Promise对象的状态改为rejected
});
p.then((res) => {
  // 接收成功后的结果
});
p.catch((err) => {
  // 接收失败后的结果
});
```

**Promise 的三种状态**

`Promise` 对象有三种状态：

- `pending`：待定状态，Promise 对象实例化完成时的状态
- `fullfilled`：已兑现状态，调用 resolve 后的结果
- `rejected`：已拒绝状态，调用 reject 后的结果

![image-20230910120316365](https://post-src.wyun521.top/images/image-20230910120316365.png)

> Promise 对象的状态一旦被更改（已兑现/已拒绝），就无法再改变

**Promise 整合**

[Promise.all() 静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 用来将多个 Promise 对象包装成一个新的 Promise 对象，以获取所有成功结果，或某一个的失败原因

**eg.封装简易 axios**

```js
//*****axios.js内部实现原理*****
// 封装简易axios（这里仅做了获取数据，其他如params、data也是一样的）
// 1.接收一个配置对象，供调用者自定义
// 2.返回一个Promise对象，以调用then()或catch()
function myAxios(config) {
  return new Promise((resolve, reject) => {
    // 使用XHR发起网络请求
    const xhr = new XMLHttpRequest();
    xhr.open(config.metnod || "GET", config.url);
    xhr.addEventListener("loadend", function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 传递请求成功的结果
        resolve(JSON.parse(xhr.response));
      } else {
        // 传递请求失败的结果
        reject(new Error(xhr.response));
      }
    });
    xhr.send();
  });
}
// 使用myAxios获取省份数据
myAxios({
  url: "https://hmajax.itheima.net/api/province",
})
  .then((res) => {
    document.querySelector(".province").innerHTML = res.list.join(",");
  })
  .catch((err) => {
    document.querySelector(".province").innerHTML = err.message;
  });
```

![image-20230910201411461](https://post-src.wyun521.top/images/image-20230910201411461.png)

> 作业：使用自己封装的 axios 函数，完成天气预报案例。[点此查看 Promise 对象的详细用法](https://lamphc.github.io/fe-up/#/es6/promise)
