## ajax 第一天

### 什么是 axios

> [ajax](https://www.w3school.com.cn/js/js_ajax_intro.asp) 是浏览器与服务器进行数据通信的技术，它可以在不刷新页面的情况下，动态更新页面上的数据

> [axios](https://www.axios-http.cn/docs/intro) 是一个基于 promise 的网络请求库，对 ajax 原生的 XMLHttpRequest 对象进行了封装，可以更方便地发出请求

> [http(s) 协议](https://www.runoob.com/http/http-messages.html) 是网络数据传输的主要协议，规定了数据传输的格式等，在学习 ajax 前最好有一个了解

```js
// axios 网络请求的基本语法
axios({
  //请求配置
})
  .then((res) => {
    //处理数据 res.data是服务器返回的数据
  })
  .catch((err) => {
    //处理错误 err.response.data是服务器返回的错误信息
  });
```

### axios 获取数据

> 使用场景：获取数据，渲染页面

```js
// axios 获取数据的语法
axios({
    url: 接口地址,
    method: 请求方法（GET可省略）,
    params: 查询参数对象
}).then((res)=>{
    处理服务器返回的数据
})
```

**eg.获取城市数据**

```html
<button>获取河北省所有城市列表</button>
<p class="city"></p>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>  document.querySelector("button").addEventListener("click", () => {
    // 发起网络请求
    axios({
        url: "http://hmajax.itheima.net/api/city",
        params: {
            pname: "河北省",
        },
    }).then((res) => {
        // 如果请求成功，就渲染页面
        document.querySelector(".city").innerHTML = res.data.list.join(",");
    });
});
```

![image-20230907124013793](https://post-src.wyun521.top/images/image-20230907124013793.png)

### axios 提交数据

> 使用场景：注册登录、添加或修改表单数据

```js
// axios 提交数据的语法
axios({
    url: 接口地址,
    method: 请求方法（提交为POST）,
    data: 提交的数据对象
}).then((res)=>{
    处理服务器返回的数据
})
```

**eg.新用户注册**

```js
const registerBtn = document.querySelector(".register");
registerBtn.addEventListener("click", function () {
  const username = document.querySelector("input[name=username]").value;
  const password = document.querySelector("input[name=password]").value;
  axios({
    url: "http://hmajax.itheima.net/api/register",
    method: "POST",
    data: {
      username,
      password,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(error.response.data);
    });
});
```

![image-20230907141542605](https://post-src.wyun521.top/images/image-20230907141542605.png)

### axios 案例实战

> 参照 [接口文档](https://apifox.com/apidoc/project-1937884/api-49760214) 完成图书管理案例、个人信息管理案例

**增删改查的核心业务**

- `查询(GET)`：请求查询数据，渲染到页面

- `添加(POST)`：收集数据，请求提交

- `修改(PUT)`：请求数据并回显，收集数据，请求修改

- `删除(DELETE)`：绑定点击事件，请求删除

**头像上传的一般步骤**

1.  给上传文件的标签绑定 `change` 事件
2.  封装 `FormData` 对象，在网络上传输图片
3.  使用 `axios` 发起提交请求
4.  如果上传成功，将服务器返回的在线图片地址设为头像

![image-20230909160249042](https://post-src.wyun521.top/images/image-20230909160249042.png)

![image-20230909155912697](https://post-src.wyun521.top/images/image-20230909155912697.png)
