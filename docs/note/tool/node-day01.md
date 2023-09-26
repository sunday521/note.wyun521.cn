## Node 第一天

### Node.js 介绍

**Node.js 是什么**

`Node.js` 是一个跨平台的 JavaScript 运行环境，主要使用场景有：

- 编写后端程序：充当服务器，对外提供 Web 服务（接口、数据、网页资源等）
- 前端工程化：对代码进行压缩，转译和整合

**浏览器和 Node 环境的对比**

`Node.js` 内部封装了 `Chrome V8` 引擎，因此可以像浏览器一样运行 JS 代码：

```bash
node xxx.js
```

![image-20230919093336365](https://post-src.wyun521.top/images/image-20230919093336365.png)

> 浏览器和 Node.js 都支持 ECMAScript 标准语法，Node 中没有 DOM 对象和 BOM 对象，但自身又封装了一些特殊的 API

**Node 常见内置模块**

- `fs 模块`：用来读写文件
- `path 模块`：用来处理文件路径
- `http 模块`：对外提供 Web 服务

**Node 中相对路径的问题**

在 Node 中运行 JavaScript 代码时，代码中的相对路径总是根据 `运行命令的终端` 所在路径来查找的，在不同的终端下可能会无法找到目标文件

Node 推荐使用绝对路径，在 JS 代码中，先使用 `__dirname__` 获取当前文件所在绝对路径，然后调用 `path.join(__dirname__,相对路径)` 方法拼接成目标文件的真实绝对路径

**eg.使用 Node 对外提供 web 服务**

```js
// 1.引入相关内置模块
const http = require("http");
const fs = require("fs");
const path = require("path");
// 2.创建server对象，用来对外提供web服务
const server = http.createServer();
// 3.监听请求并处理
server.on("request", (req, res) => {
  if (req.url === "/api/province") {
    fs.readFile(path.join(__dirname, "./data/province.json"), (err, data) => {
      // 解决中文乱码
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      // 返回响应数据
      res.end(data.toString());
    });
  } else {
    res.end("<h1>404</h1>");
  }
});
// 4.启动web服务
server.listen(3000, () => {
  console.log("web服务已启动...");
});
```

**eg.模拟前端工程化**

```js
// 模拟前端工程化中的代码压缩
// 把 public/index.html 里的回车/换行符去掉，写入到 dist/index.html 中
const fs = require("fs");
const path = require("path");
// 1.读取原文件，利用replace方法替换代码中的回车和换行
fs.readFile(path.join(__dirname, "./public/index.html"), (err, data) => {
  if (err) return console.error(err);
  // 读取的文件内容
  const htmlStr = data.toString();
  // 压缩后的字符串
  const str = htmlStr.replace(/[\r\n]/g, "");
  // 2.将压缩后的代码写入一个新文件中
  fs.writeFile(path.join(__dirname, "./dist/index.html"), str, (err) => {
    if (err) return console.error(err);
    console.log("压缩成功");
  });
});
```
