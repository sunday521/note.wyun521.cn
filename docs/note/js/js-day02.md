## js 第二天

> 在 js 基础阶段，不需要记住全部语法，最好理解他们的使用场景

### 类型转换

#### 什么是类型转换

类型转换是把数据从一种原始的数据类型转换成另一种新的数据类型的过程

类型转换的分类：

- 强制类型转换（显式）
- 隐式类型转换

> 详细用法请参考：[JS 类型转换（强制类型转换+隐式类型转换）](http://c.biancheng.net/view/9378.html)

#### 强制类型转换

##### 转为数值型

将数据转换为数值类型：

- Number()：把字符串转换为数字
- parseInt()：解析字符串并返回一个整数
- parseFloat()：解析字符串并返回一个浮点数

将字符串转为数值类型的例子：

```js
// Number() 仅转换纯字符串
console.log(Number("123"));
console.log(Number("123px"));
// parseInt() 仅转换数字开头的字符串，并且只保留整数部分
console.log(parseInt("123px"));
console.log(parseInt("123.4px"));
console.log(parseInt("px123.4"));
// parseFloat() 仅转换数字开头的字符串，并且可以保留小数部分
console.log(parseFloat("123px"));
console.log(parseFloat("123.4px"));
console.log(parseFloat("px123.4"));
```

![image-20230816092616824](https://post-src.wyun521.top/images/image-20230816092616824.png)

特殊类型转为数值类型的例子：

```js
// 特殊转换
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined)); //NaN
```

![image-20230816092746330](https://post-src.wyun521.top/images/image-20230816092746330.png)

##### 转为字符串

将数据转换为字符串值：

- String()：将数据转为字符串
- toString()：可以带进制的字符串转换

```js
// String() 将数据转为字符串型
console.log(String(123), typeof String(123));
console.log(String(true), typeof String(true));
// toString() 可以带进制的转换
let num = 10;
console.log(num.toString(), typeof num.toString());
console.log(num.toString(8), typeof num.toString(8));
```

![image-20230816094704075](https://post-src.wyun521.top/images/image-20230816094704075.png)

> toString(进制) 是先将数字的进制进行转换，然后再转为字符串

##### 转为布尔型

`Boolean()` 用于将数据转为布尔值：

```js
// Boolean() 将数据转为布尔型
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(false));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean("其他随便什么值666")); //true
```

![image-20230816094716990](https://post-src.wyun521.top/images/image-20230816094716990.png)

> Boolean() 返回 false 的情况有：0、空字符串、false、null、undefined、NaN

#### 隐式类型转换

一些运算符在执行时，可以自动转换数据类型

![image-20230816095356334](https://post-src.wyun521.top/images/image-20230816095356334.png)

下面是隐式转换的例子：

```js
// 转为数值型
console.log(+"123");
console.log("123" - 3);
// 转为字符串
console.log(123 + "");
// 转为布尔值
console.log(!!123);
```

![image-20230816151921781](https://post-src.wyun521.top/images/image-20230816151921781.png)

正号的一个使用场景是把字符串转为数值型：

```js
let age = +prompt("请输入你的年龄：");
console.log(typeof age); //number
```

> 隐式转换类型不明确，靠经验才能总结，所以我们最好在计算前先将数据类型统一

### 流程控制

#### 表达式和语句

大部分代码都由表达式和语句组成，区别：

- 表达式：可以被求值的代码
- 语句：一段可以被执行的代码，不一定有返回值

js 中有三大流程控制语句：

- 顺序语句（从上往下依次执行）
- 分支语句（选择执行）
- 循环语句（重复执行）

#### 分支语句

##### 什么是分支语句

分支语句可以让我们有选择性的执行某段代码

js 中常用的分支语句有：

- 三元运算符
- if 条件判断语句
- switch-case 选择语句

##### 三元运算符

对于简单的双条件判断，可以使用三元运算符。三元运算符的基础语法是

```js
判断条件 ? 表达式1 : 表达式2;
```

> 如果条件为真，则执行表达式 1 并返回执行结果；如果条件为假，则执行表达式 2 并返回执行结果

一个求最大值的例子：

```js
let a = +prompt("请输入第一个数：");
let b = +prompt("请输入第二个数：");
let max = a > b ? a : b;
alert(`较大的数是：${max}`);
let c = +prompt("请输入第三个数：");
let max2 = a > b ? (a > c ? a : c) : b > c ? b : c;
alert(`最大的数是：${max2}`);
```

![max](https://post-src.wyun521.top/images/max.gif)

一个给数字补 0 的例子：

```js
let num = +prompt("请输入一个数字：");
let rst = num < 10 ? "0" + num : num;
alert(rst);
console.log(typeof +rst); //number
```

![full0](https://post-src.wyun521.top/images/full0-16921922042334.gif)

##### if-else 语句

if-else 语句的写法是

```js
if (条件1) {
    满足条件1执行的代码
} else if (条件2) {
    满足条件2执行的代码
} else if (条件3) {
    满足条件3执行的代码
}
	... ...
} else {
    所有条件都不满足时执行的代码
}
```

下面是一个使用 if-else 语句的例子：

```js
let num = +prompt("请输入高考成绩：");
if (num >= 700) {
  alert("牛牛牛！");
} else if (num >= 500) {
  alert("哎呦，不错哦");
} else {
  alert("菜的抠脚~");
}
```

![score](https://post-src.wyun521.top/images/score.gif)

有时我们给的不是布尔值，但也可以执行满足条件的代码，比如

```js
if ("test") {
  alert("条件为真"); //这段代码会被成功执行
}
```

> if-else 语句中的条件带有隐式的类型转换，相当于内置了 Boolean()

##### switch-case 语句

switch-case 语句的写法是

```js
switch (条件表达式) {
    case 值1:
        代码块1
        break
    case 值2:
        代码块2
        break
        ... ...
    default:
        默认执行的代码块
}
```

下面是一个使用 switch-case 语句的例子：

```js
let fruit = prompt("Your favorite fruit is?");
switch (fruit) {
  case "apple":
    alert("I like apple.");
    break;
  case "banana":
    alert("I like banana.");
    break;
  case "orange":
    alert("I like orange.");
    break;
  default:
    alert("I don't love anything!");
}
```

![fruit](https://post-src.wyun521.top/images/fruit.mp4)

switch-case 和 if-else 语句的对比：

- switch-case 语句一般用于等值判断， if 一般用于区间判断

- switch-case 需要配合 break 关键字使用，没有 break 会造成 case 穿透

> switch-case 使用的是 === 全等比较，只有数据值和数据类型都相同才会匹配成功

> 关于 switch 选择语句的详细用法，参考：[JS switch case 语句详解](http://c.biancheng.net/view/5526.html)

#### 循环语句

##### 什么是循环语句

我们可以利用循环语句重复执行某段代码

js 中常用的循环语句有：

- while 循环
- for 循环

完成一个循环必备的三个要素：

- 初始值
- 循环条件
- 自增/自减语句

![image-20230816193810225](https://post-src.wyun521.top/images/image-20230816193810225.png)

> 利用谷歌的调试工具，可以方便地了解程序的执行过程，帮助我们理解循环的执行过程

##### while 循环

while 循环的一般写法是：

```js
初始值;
while (循环条件) {
  // 循环体
  自增 / 自减语句;
}
```

一个使用 while 循环的例子：

```js
let i = 0;
while (i < 10) {
  document.write(i + 1, "我学的棒棒哒~<br>");
  i++;
}
```

![image-20230816194604240](https://post-src.wyun521.top/images/image-20230816194604240.png)

> 小故事：在使用 while 循环时，小马虎经常会忘记写自增/自减语句，以至于经常出现死循环

##### for 循环

for 循环的一般写法是：

```js
for (初始值; 循环条件; 自增 / 自减语句) {
  // 循环体
}
```

一个使用 for 循环的例子：

```js
// 输出5个小星星;
for (let i = 0; i < 5; i++) {
  document.write("☆");
}
// 输出1-100之间所有偶数的累加和
let sum = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}
console.log(sum); //2550
```

> for 循环把声明初始值、循环条件、变量计数写到一起，让人一目了然，可以最大程度避免忘记写自增自减语句导致的死循环

##### 终止循环

- break：结束循环

- continue：结束本次循环，一般用于排除或者跳过某一个选项

> break 和 continue 会立即跳出循环，后面所有的代码都不会被执行

while 循环和 continue 连用时，可能导致死循环：

```js
// 循环输入1-10，在i=5时跳出本次循环
let i = 1;
while (i <= 10) {
  if (i === 5) {
    // 如果没有下面这行代码会造成死循环 i恒等于5
    i++;
    continue;
  }
  document.write(i, " 我学的棒棒哒~<br>");
  i++;
}
```

同样的使用场景，for 循环就不会有这个问题：

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  document.write(i, " 我学的棒棒哒~<br>");
}
```

实际上，这是由 continue 的特性决定的

while 循环时，遇到 continue 会忽略后面所有语句（包括自增/自减语句）

for 循环时，遇到 continue 后会跳出到自增/自减语句继续向下执行

##### 无限循环

构造无限循环的两种方式：

- while(true)

- for(;;)

> 请务必在其中使用 break 退出循环，否则将成为死循环

##### 循环嵌套

循环嵌套: 一个循环语句里面又包含另一个循环语句

> 嵌套循环的特点：外部循环每执行一次，内部循环执行所有次

**打印一个三角形**

```js
for (let i = 0; i < 5; i++) {
  for (let j = 0; j <= i; j++) {
    document.write("★");
  }
  document.write("<br>");
}
```

![image-20230818105832269](https://post-src.wyun521.top/images/image-20230818105832269.png)

> 外层循环控制行数，内层循环控制每行打印星星的个数

**打印九九乘法表**

```js
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= i; j++) {
    document.write(`<span>${j}*${i}=${j * i}</span>`);
  }
  document.write("<br>");
}
```

```css
/* 美化样式 */
span {
  display: inline-block;
  width: 80px;
  padding: 5px;
  margin: 2px;
  border: 1px solid pink;
  text-align: center;
  color: hotpink;
  border-radius: 5px;
  background-color: rgba(255, 20, 147, 0.2);
  box-shadow: 2px 2px 2px rgba(255, 20, 147, 0.2);
}
```

![image-20230818103425206](https://post-src.wyun521.top/images/image-20230818103425206.png)

> 先理清思路，找到内层循环和外层循环的关系，再编码会事半功倍

#### 综合案例-ATM 取款机

![image-20230816200143712](https://post-src.wyun521.top/images/image-20230816200143712.png)

```js
// 假定账户初始余额 1000 元
let money = 1000;
for (;;) {
  let code = +prompt(`请输入要执行的操作:
            1.取款
            2.存款
            3.查看余额
            4.退出
            `);
  if (code === 4) {
    document.write(`<h4>滴~你的银行卡余额还有${money},欢迎下次光临！</h4>`);
    break;
  } else if (code === 1) {
    let getMoney = +prompt("请输入你的取款金额：");
    if (money - getMoney >= 0) {
      money -= getMoney;
    } else {
      alert("你的账户余额不足~");
    }
  } else if (code === 2) {
    let setMoney = +prompt("请输入你的存款金额：");
    money += setMoney;
  } else if (code === 3) {
    alert(`你的账户余额为：${money} 元`);
  }
}
```

![atm](https://post-src.wyun521.top/images/atm.mp4)
