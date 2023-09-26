## js 高级第二天

### 对象深入

#### 一切皆对象

为什么字符串也会有属性和方法？方法不是对象才有的吗？

```js
const str = "hello";
console.log(str.length);
console.log(str.substring(0, 1)); //h
```

> 实际上，js 中所有数据都可以看做一个对象，使用不同的构造函数创建出来的对象拥有不同的属性和方法

#### 面向对象的概念

**两种编程思想**

`面向过程`：按照分析好的步骤，一步一步地的去解决问题。特点：性能较高、不灵活

`面向对象`：按功能划分对象，各个对象之间相互调用，共同解决问题。特点：性能较低、更灵活

> 封装、继承和多态是面向对象的三个特性

> js 中还是以面向过程编程为主，更符合开发习惯

#### 创建对象的两种方式

js 中有两种创建对象的方式：

- 使用字面量直接创建
- 使用构造函数创建多个对象

```js
// 1.使用字面量直接创建
const pq = {
  pname: "佩奇",
  age: 6,
};
// 2.使用构造函数实例化
// 构造函数是一个特殊的函数，用来创建对象
function Pig(pname, age) {
  // this代指要创建的实例对象
  this.pname = pname;
  this.age = age;
}
// 实例化两个对象
const pq = new Pig("佩奇", 6);
const qz = new Pig("乔治", 4);
```

> 构造函数的首字母一般大写

> 构造函数中没有 return，默认返回创建的实例对象

**使用 new 创建对象的过程**

1.  先在内存中创建一个空的对象
2.  让 this 指向这个空对象
3.  执行构造函数中的代码，给空对象添加属性和值
4.  将创建好的对象返回

#### 静态成员和实例成员

`静态成员`：构造函数本身的属性或方法

```js
function Pig(name) {
  this.name = name;
}
Pig.eyes = 2; // 静态属性
Pig.print = function () {
  // 静态方法
  console.log(this);
};
```

`实例成员`：实例对象中的属性或方法

```js
const pq = new Pig("佩奇");
pq.name = "小猪佩奇"; // 实例属性
pq.sayHi = function () {
  // 实例方法
  console.log("Hi~");
};
// **实例对象不能访问静态成员**
pq.print(); // Uncaught TypeError: pq.print is not a function
```

```js
const arr = new Array();
console.log(arr.length); //实例属性
const arr2 = [1, 2, 3];
console.log(arr2.length); //也是实例属性
```

> 静态方法中的 this 指向构造函数，实例方法中的 this 指向实例对象（箭头函数除外）

### 内置构造函数

#### Object 类

- `Object.keys(obj)`：获取对象中所有键的集合，返回一个数组
- `Object.values(obj)`：获取对象中所有值的集合，返回一个数组
- `Object.assign(newobj,obj)`：拷贝/合并对象，返回一个新对象

```js
const pig = {
  pname: "佩奇",
  age: 6,
};
console.log(Object.keys(pig));
console.log(Object.values(pig));
```

![image-20230902115242059](https://post-src.wyun521.top/images/image-20230902115242059.png)

```js
// Object.assign(新对象, 已有对象) 拷贝/合并一个对象
const pig = {
  pname: "佩奇",
  age: 6,
};
const newPig = { gender: "女" };
Object.assign(newPig, pig);
console.log(newPig);
```

![image-20230902115509486](https://post-src.wyun521.top/images/image-20230902115509486.png)

> assign 拷贝的对象与原对象无关，不会相互影响（拷贝的是对象的值，而不是引用）

#### Array 类

> [点击查阅 Array 的详细用法](http://c.biancheng.net/view/9356.html)

**会改变原数组的实例方法**

| 方法    | 作用                 | 返回值                         |
| ------- | -------------------- | ------------------------------ |
| pop     | 删除最后一个数组元素 | 返回删除的那个元素             |
| shift   | 删除第一个数组元素   | 返回删除的那个元素             |
| push    | 在数组末尾添加元素   | 返回新数组的长度               |
| unshift | 在数组开头添加元素   | 返回新数组的长度               |
| splice  | 删除或替换数组元素   | 返回删除的所有元素（一个数组） |
| reverse | 反转数组             | 返回操作后的原数组             |
| sort    | 对数组进行排序       | 返回操作后的原数组             |

**不改变原数组的实例方法**

| 方法      | 作用                                   | 返回值                                   |
| --------- | -------------------------------------- | ---------------------------------------- |
| forEach   | 遍历数组，用来代替 for 循环            | 无返回值                                 |
| map       | 映射数组，处理数组中的每个数组元素     | 返回一个新数组                           |
| filter    | 筛选数组，筛选出所有满足条件的数组元素 | 返回一个新数组                           |
| reduce    | 累加所有数组元素（从左到右）           | 返回累加后的结果（单个值）               |
| concat    | 合并两个数组                           | 返回一个新数组                           |
| join      | 将数组元素拼接为字符串                 | 返回一个字符串                           |
| find      | 查找数组元素                           | 返回满足条件的第一个数组元素或 undefined |
| findIndex | 查找满足条件的数组元素的索引           | 返回满足条件的第一个数组元素的索引或-1   |
| indexOf   | 查找某个数组元素的索引                 | 返回数组元素第一次出现的索引或-1         |
| includes  | 查找数组中是否存在某个值               | 返回一个布尔值                           |
| every     | 检查是否所有数组元素都满足条件         | 返回一个布尔值                           |
| some      | 检查是否有一个数组元素满足条件         | 返回一个布尔值                           |

下图是对一些数组方法的生动表述：

![image-20230902223428622](https://post-src.wyun521.top/images/image-20230902223428622.png)

**将伪数组转为真数组**

数组的静态方法 `Array.from()` 可以将伪数组转换为真数组，返回的真数组能够调用数组中的方法

```js
// Array.from(伪数组)
function fn() {
  Array.from(arguments).forEach((ele) => {
    console.log(ele);
  });
}
fn(1, 2, 3, 4, 5);
```

**reduce 累加求和**

```js
const arr = [5, 4, 3, 2, 1];
// prev 上一次return的结果
// ele 数组中的每个元素
// 0 指定的prev的初始值
const sum = arr.reduce((prev, ele) => {
  console.log(prev, "+", ele, "=", prev + ele);
  return prev + ele;
}, 0); //15
```

![image-20230902152538072](https://post-src.wyun521.top/images/image-20230902152538072.png)

**计算总薪资**

```js
const arr = [
  {
    name: "张三",
    salary: 10000,
  },
  {
    name: "李四",
    salary: 15000,
  },
  {
    name: "王五",
    salary: 20000,
  },
];
// 需求1：计算所有人总薪资
// 可以使用数组的reduce方法求和
const sum = arr.reduce((prev, ele) => prev + ele.salary, 0);
console.log(sum); // 45000
// 需求2：若每人涨薪30%，老板每月要多支出多少
// 还是求和
const sum2 = arr.reduce((prev, ele) => prev + ele.salary * 0.3, 0);
console.log(sum2); // 13500
```

#### String 类

> [点击查阅 String 的详细用法](https://www.w3school.com.cn/jsref/jsref_obj_string.asp)

| 方法        | 作用                             | 返回值                       |
| ----------- | -------------------------------- | ---------------------------- |
| trim        | 移除字符串两端的空格             | 返回一个新字符串             |
| split       | 将字符串拆分为数组               | 返回一个数组                 |
| substring   | 截取字符串的部分                 | 返回一个新字符串             |
| slice       | 提取字符串的部分                 | 返回一个新字符串             |
| repeat      | 将字符串重复若干次               | 返回一个新字符串             |
| replace     | 替换部分字符串，支持正则匹配     | 返回一个新字符串             |
| match       | 查找字符串，支持正则匹配         | 返回一个数组                 |
| toUpperCase | 将字符串中所有字符转换为大写形式 | 返回一个新字符串             |
| toLowerCase | 将字符串中所有字符转换为小写形式 | 返回一个新字符串             |
| charAt      | 根据索引查找某个字符             | 返回一个字符                 |
| indexOf     | 查找字符的索引                   | 返回字符第一次出现的索引或-1 |
| startsWith  | 检测字符串是否以某字符开头       | 返回一个布尔值               |
| endsWith    | 检测字符串是否以某字符结尾       | 返回一个布尔值               |
| includes    | 检测字符串是否包含某个字符       | 返回一个布尔值               |

**字符串基础方法示例**

```js
const str = "Hello World!";
// split 将字符串拆分为数组
console.log(str.split()); // ['Hello World!']
console.log(str.split("")); // ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!']
console.log(str.split(" ")); // ['Hello', 'World!']

// substring 截取字符串
console.log(str.substring()); // Hello World!
console.log(str.substring(6)); // World!
console.log(str.substring(6, 11)); // World

// startsWith 检查字符串是否以指定字符开头
console.log(str.startsWith("H")); //true
console.log(str.startsWith("Hello")); //true

// includes 检查字符串是否包含指定字符
console.log(str.includes("el")); //true
console.log(str.includes("or")); //true
```

**翻转字符串**

```js
// 先将字符串转为数组，再调用数组的 reverse 方法进行翻转
function reverseStr(str) {
  return str.split("").reverse().join("");
}
console.log(reverseStr("今天天气真好！"));
```

**显示赠品案例**

```js
const gift = "50g茶叶,清洗球";
document.querySelector(".zeng").innerHTML = gift
  .split(",")
  .map((ele) => {
    return `<p>【赠品】${ele}</p>`;
  })
  .join("");
```

![image-20230902170850980](https://post-src.wyun521.top/images/image-20230902170850980.png)

#### Number 类

> [点击查阅 Number 的详细用法](http://c.biancheng.net/view/9354.html)

- `toFixed(n)`：保留几位小数

```js
var num = 99;
num.toFixed(2); // 99.00
```
