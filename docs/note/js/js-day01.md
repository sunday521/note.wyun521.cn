## js 第一天

### 什么是 js

js 是一种运行在客户端（浏览器）的脚本语言，常用来做一些页面交互效果或创建动态更新的内容

### js 书写位置

**1.行内 js**

将 js 代码直接书写在 html 标签内部，一个使用行内样式的例子：

```html
<button onclick="alert('逗你玩~')">点我月薪过万</button>
```

**2.内部 js**

在 `</body>` 结束标签的上方，先添加 script 标签，然后在标签中书写 js 代码：

```html
<script>
  alert("Hello World！");
</script>
```

> js 代码要放在 body 标签的末尾，以确保其在所有 html 元素加载完毕后再执行

**3.外部 js**

在 `</body>` 结束标签的上方，使用 script 标签引入一个外部 js 文件：

```html
<script src="./index.js"></script>
```

> 使用外部引入方式时，script 标签中间的代码会被忽略

### js 注释

```js
// 单行注释 Ctrl+/
/* 多行注释 Shift+Alt+A */
```

> 注释会在 html 源代码中显示

> ; 是 js 语句的结束符，在 js 代码中，结束符要么都加，要么都不加

### js 输入输出

在学习前期了解一些 js 的输入输出语句可以让我们更方便地调试代码：

- alert()：弹出一个带有提示信息的弹窗
- document.write()：输出 html 内容到网页上
- console.log()：输出内容到浏览器的控制台
- prompt()：弹出一个对话框来接收用户的输入

一个综合使用输入输出语句的例子：

```js
let username = prompt("请输入你的昵称：");
document.write("你输入的昵称是", username);
```

![var](https://post-src.wyun521.top/images/var.gif)

> document.write() 中，如果要输出的内容包含 html 标签，会自动解析

> prompt() 总是返回一个字符串型的数据，在做运算时要注意

> prompt()、alert() 会阻塞程序的执行

### js 变量

**什么是变量**

变量是计算机用来存储数据的容器，变量中的数据是可变的，使用变量可以更方便地使用和修改数据

**变量的声明和赋值**

使用 let 关键字来声明一个变量：

```js
let myname;
```

此时变量 name 中还没有任何数据，接下来给它一个值：

```js
myname = "小明";
```

此时再在控制台输出 name 变量，就可以打印出 name 变量保存的值了

注意，我们声明的是一个变量，变量的值是可以更改的：

```js
myname = "小红";
```

> 变量声明是在内存中开辟一块空间，用来存储数据；变量赋值是把数据存储到变量中

> let 关键字声明的变量是唯一的，重复声明同一个变量会报错，就像下面这样

![image-20230815102420393](https://post-src.wyun521.top/images/image-20230815102420393.png)

**变量的初始化**

使用变量初始化可以更快地完成变量的声明和赋值：

```js
// 变量的初始化=变量声明+赋值
let myname = "小明";
```

### js 常量

**什么是常量**

常量和变量一样，也是用来保存数据的，只不过这个数据是不可变的

- 常量中的数据不允许修改

- 必须在声明后就赋值

如果强制修改常量的值，就会出现下面的错误：

![image-20230815105426226](https://post-src.wyun521.top/images/image-20230815105426226.png)

**常量的使用**

```js
const pi = 3.14;
console.log(pi);
```

### js 标识符

标识符可以作为变量名、常量名、函数名等

标识符的命名规则：

- 由字母、数字、下划线、美元符组成，不能以数字开头
- 不能使用 js 中的关键字或保留字
- 严格区分大小写

> 标识符不能使用中横线，因为 js 会把它当做减法处理

> 标识符要见名知意，最好采用驼峰命名法，如 userName

![image-20230815112340335](https://post-src.wyun521.top/images/image-20230815112340335.png)

### js 数据类型

#### 数据类型划分

为什么要对数据分门别类？

- 预分配空间，节省内存
- 分门别类更方便管理

#### 基本数据类型

- number 数值型（包含整数、小数和 NaN）
- string 字符串（引号包裹的一段文本）
- boolean 布尔型（只有 true 和 false 两个值）
- undefined 未定义型（变量只声明未赋值）
- null 空类型（变量已赋值但内容为空）

> 关于字符串的几个注意点：
>
> - 在 js 中，string 属于基本数据类型
> - 无论什么类型的数据，只要使用引号包裹，就会成为字符串
> - 双层嵌套引号时，采用 “外双内单，外单内双” 的写法

#### 引用数据类型

- Object 对象
- Function 函数
- Array 数组

#### 数据类型校验

`typeof ` 可以检验变量的数据类型：

```js
console.log(typeof 42);
// Expected output: "number"

console.log(typeof "blubber");
// Expected output: "string"

console.log(typeof true);
// Expected output: "boolean"

console.log(typeof undeclaredVariable);
// Expected output: "undefined"

console.log(typeof null);
// Expected output: "object"
```

> typeof null 返回 object 类型，这是 js 中一个远古的 bug

#### 模板字符串

模板字符串可以更方便地拼接字符串和变量，语法： `${变量名}`

一般的字符串拼接

```js
alert("你好！我是" + name + "，今年" + age + "岁了");
```

使用模板字符串后

```js
alert(`你好！我是${name}，今年${age}岁了`);
```

> 模板字符串外层必须使用反引号包裹，中间可以换行

> 模板字符串在之后学习 vue 时也会经常用到

### js 运算符

#### 算数运算符

js 提供了一些符号用来做数学运算：

- 加减乘除
- % 求余：常用来判断某个数字能否被整除

算数运算符存在隐式转换（加法除外），里面只有数字的字符串默认会被转换为 number 类型

```js
console.log(5 % 4); //1
console.log(5 % 5); //0
console.log(5 % 6); //5
console.log("5" + 1); //51，加法没有隐式转换
console.log("5" - 1); //4，js做了隐式转换
console.log("伍" - 3); //NaN
console.log(typeof NaN); //number
```

> 在计算失败时，显示的结果是 NaN （not a number）。有趣的是，NaN 是一个 number 型的数据

一个使用算数运算符的例子：

```js
let price = prompt("请输入商品单价：");
let num = prompt("请输入数量：");
let rst = num * price;
document.write(`小计：￥${rst}`);
```

![shop-jisuan](https://post-src.wyun521.top/images/shop-jisuan.gif)

#### 赋值运算符

使用赋值运算符可以简化代码，一步完成运算和赋值。比如：

```js
let num = 10;
num += 3; // num = num + 3
console.log(num);
```

> 其他的赋值运算符还有 `+=、-=、*=、/=、%=`

#### 自增自减运算符

自增、自减运算符的作用是让变量的值在原来的基础上加 1 或减 1，常配合 for 循环使用

在参与运算时，符号的位置不同，可能会导致不同的结果

```js
let a = 5;
let b = 5;
let num = a + b++; //num=5+5=10 b=6
let num2 = a + ++b; //num=5+7=12 b=7
console.log(num, num2); // 10 12
```

> ++i 先运算再赋值
>
> i++ 先赋值再参与运算

#### 比较运算符

比较运算符用来比较两个数据大小、是否相等，根据比较结果返回一个布尔值（true / false）

![image-20230815162028542](https://post-src.wyun521.top/images/image-20230815162028542.png)

![bijiao](https://post-src.wyun521.top/images/bijiao.png)

> 比较运算符和下面的逻辑运算符常用在流程控制语句中，比如 if-else 语句

> 关于 js 的数据类型和流程控制语句，接下来会看到

#### 逻辑运算符

逻辑运算符的使用场景是把多个布尔值放到一起运算，最终返回一个布尔值

![image-20230815162212235](https://post-src.wyun521.top/images/image-20230815162212235.png)

```js
// 判断是否为闰年
//年份能被4整除而不能被100整除的为闰年
let num = +prompt("请输入一个数：");
let rst = num % 4 === 0 && num % 100 !== 0;
```

**逻辑中断**

`&&` 左边的表达式为假时，不会再执行右边的表达式，直接返回左边表达式的计算结果

`||` 左边的表达式为真时，不会再执行右边的表达式，直接返回左边表达式的计算结果

```js
console.log(1 || 2);
console.log(0 || 2);
console.log(1 && 2);
console.log(0 && 2);
```

![image-20230819103014502](https://post-src.wyun521.top/images/image-20230819103014502.png)

逻辑中断的一个应用是在变量为 undefined 时返回右边的值

```js
// 如果x有值就用x，如果没有值就用0
x = x || 0;
```

> 如果没有短路，就会返回右边表达式的计算结果

#### 运算符优先级

![youxian](https://post-src.wyun521.top/images/youxian.png)

> 我们不应该依赖运算符优先级来判断计算的先后次序，表达式应清晰明了，最好使用小括号来决定运算顺序
