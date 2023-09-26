## node-day02-模块化

### 模块化

#### 什么是模块化

`模块化`：可以把项目中的每个文件都看做是一个模块。模块之间彼此独立，使用特定语法进行导入导出

`模块化的好处`：

- 提高代码复用性
- 实现按需加载
- 作用域独立

`CommonJS标准` 和 `ECMAScript标准` 是两种常见的模块导入导出的语法标准

#### CommonJS 标准

`CommonJS标准` 是 Node 默认的导入导出语法规范

```js
const checkUsername = (uname) => uname.length >= 8;
const checkPwd = (pwd) => pwd.length >= 6;
// 导出一个对象
module.exports = {
  checkUsername,
  checkPwd,
};
```

```js
// 对于导入的对象，可以直接解构赋值
const { checkUsername, checkPwd } = require("./utils/check.js");
console.log(checkUsername("pc666888"));
console.log(checkPwd("123456"));
```

> 对于内置模块，导入时只写模块名就行；对于自定义模块，导入时需要写文件完整路径（包括文件后缀）

#### ECMAScript 标准

`ECMAScript标准` 是 ES6 新增的导入导出语法，在现代前端工程化中最为常用

ES6 模块的设计思想是尽量的静态化，使得 `编译时` 就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 模块 和 AMD 模块，都只能在 `运行时` 确定这些东西

![image-20230920121006166](https://post-src.wyun521.top/images/image-20230920121006166.png)

> 要在 Node.js 中使用 ECMAScript 标准语法，需要在项目根目录中新建 `package.json` 文件，并设置 `{"type":"module"}` 属性

##### 默认导入导出

```js
const checkUsername = (uname) => uname.length >= 8;
const checkPwd = (pwd) => pwd.length >= 6;
// 导出一个对象
export default { checkUsername, checkPwd };
```

```js
// 对于导入的对象，必须先用一个变量接收
import check from "./utils/check.js";
const { checkUsername, checkPwd } = check;
console.log(checkUsername("pc666888"));
console.log(checkPwd("123456"));
```

> 一个模块只能有一个默认导出语句

> 默认导出不能直接解构赋值，必须用一个变量接收，变量名是可以自定义的

##### 命名导入与导出

使用 `命名导入/导出` 可以实现模块的按需加载：

```js
// 写法一：单独导出
// export后的修饰定义语句可以是：函数、类或普通变量
export const checkUsername = (uname) => uname.length >= 8;
export const checkPwd = (pwd) => pwd.length >= 6;
// 写法二：统一导出为对象
const checkUsername = (uname) => uname.length >= 8;
const checkPwd = (pwd) => pwd.length >= 6;
export { checkUsername, checkPwd };
```

```js
// 对于导入的对象，可以直接解构赋值
import { checkUsername, checkPwd } from "./utils/check.js";
console.log(checkUsername("pc666888"));
console.log(checkPwd("123456"));
```

**在 html 引入 js 模块**

```html
<!-- defer （默认）异步模块加载模式，等待html全部渲染完再执行 -->
<script type="module" src="./foo.js" defer></script>
<!-- async 异步模块加载模式，加载完就执行 -->
<script type="module" src="./foo.js" async></script>
```

![image-20230919220549395](https://post-src.wyun521.top/images/image-20230919220549395.png)

### 包管理

#### 什么是软件包

`软件包`：本质就是一个文件夹，内部封装了工具和方法供开发者使用。根目录中必须要有 `package.json` 文件（记录软件包的名字，作者，入口文件，依赖包等信息）

`软件包的分类`：

- `本地软件包`：仅在当前项目内使用，封装属性和方法，存在于项目根目录下的 `node_modules` 中
- `全局软件包`：本机所有项目都可能会使用，封装命令和工具，存在于系统全局位置（如 hexo 命令）

> 在导入三方软件包时，默认入口文件是 index.js，我们也可以在 `package.json` 中使用 `main` 属性自定义入口文件的位置

#### 使用 npm 管理软件包

| 命令                   | 功能                           | 备注                                       |
| ---------------------- | ------------------------------ | ------------------------------------------ |
| `npm init -y`          | 初始化一个 `package.json` 文件 | -y 跳过填写信息                            |
| `npm install <module>` | 安装指定依赖包                 | -g 全局安装 \| --save-dev 安装开发时的依赖 |
| `npm install`          | 安装所有依赖包                 | 通常用来生成 node_modules                  |

> [点击查看更多 npm 命令](https://blog.csdn.net/qq575792372/article/details/122150069)

### 同源和跨域

#### 什么是同源策略

`同源策略` 是浏览器中的一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何才能与另一个源的资源进行交互，从而帮助阻隔恶意文档，减少被攻击的可能性

`源`：特指 URL 中的 `协议、域名和端口号` 部分

`同源`：如果两个 URL 的 `协议、域名和端口号` 都相同，那么这两个 URL 就是同源的

![image-20230920162923656](https://post-src.wyun521.top/images/image-20230920162923656.png)

#### 什么是跨域访问

在浏览器中，一个网页的脚本通过 ajax 请求另一个源的资源时，如果 `网页所在源` 和 `ajax 请求的源`（协议、域名或端口号）不完全相同，就会发生 `跨域访问`，导致请求失败

![image-20230920211017860](https://post-src.wyun521.top/images/image-20230920211017860.png)

![image-20230920164227063](https://post-src.wyun521.top/images/image-20230920164227063.png)

#### 解决跨域问题

**开发中-CORS 跨域资源共享**

前后端分离的项目，不在同一个源开发，为了保证正常的数据通信，可以采用 `CORS（Cross-Origin Resource Sharing）跨域资源共享` 机制

`CORS的实现过程`：通过在服务端设置 `Access-Control-Allow-Origin` 响应头字段，标识允许跨域访问的源地址；浏览器在收到这个响应头后，就会允许跨域访问并将响应数据返回给前端页面

![image-20230920165525510](https://post-src.wyun521.top/images/image-20230920165525510.png)

**上线后-同源访问**

把前端项目和后端项目部署到同一个源下，在保证安全性的前提下直接避免跨域访问的问题

> [良苦用心啊！我把 7 大跨域解决方法原理画成 10 张图，做成图解！](https://juejin.cn/post/7017614708832206878)

> [三分钟，带你理解并解决前端跨域](https://juejin.cn/post/7252589598152458301)
