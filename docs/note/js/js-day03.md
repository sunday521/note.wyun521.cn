## js-day03

> 本章的学习目标是掌握数组、函数、对象三种引用数据类型的基本用法

### 数组

#### 什么是数组

数组是一种引用数据类型，它可以在单个变量名下存储多个数据，数组中的每个值称为数组元素

**数组的特点：**

- 数组是有序的，数组元素的索引从 0 开始
- 数组中可存储不同类型的数据，这些数据也可以是任何类型的

**数组的声明和使用**

```js
let arr = ["小明", 18, false];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
```

> 数组和变量类似，都需要先声明后使用

#### 遍历数组

遍历数组就是把数组中的每个元素都挨个访问一遍，我们可以使用 for 循环遍历数组

遍历数组会用到的两个方法：

- `arr.length`：获取数组的长度（数组中元素的个数）
- `arr[index]`：获取数组中指定元素的值

> 数组元素的索引是从 0 开始的，所以数组中最后一个元素的索引应该是 arr.length -1

> 通常在对数组进行操作时，都需要先遍历数组中的每个元素

**遍历数组**

```js
// 使用for循环遍历数组
let arr = ["迪丽热巴", "古力娜扎", "佟丽丫丫", "玛尔扎哈"];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// 反向遍历
for (let i = 0; i < arr.length; i++) {
  console.log(arr[arr.length - 1 - i]);
}
```

**遍历数组求值**

```js
let arr = [5, 4, 3, 2, 1];
let max = arr[0];
/* 这里的最小值不能直接给0 */
let min = arr[0];
let sum = 0;
let avg = 0;

for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
  if (arr[i] > max) {
    max = arr[i];
  }
  if (arr[i] < min) {
    min = arr[i];
  }
}

avg = sum / arr.length;

console.log("sum:", sum);
console.log("max:", max);
console.log("min:", min);
console.log("avg:", avg);
```

![image-20230818114956539](https://post-src.wyun521.top/images/image-20230818114956539.png)

**拼接字符串**

```js
let arr = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
    "./images/7.jpg",
     ... ...
];
let str = "";
let num = +prompt("请输入渲染图片的个数：");
for (let i = 0; i < num; i++) {
    str += `<div><img src="${arr[i]}" alt=""></div>`;
}
document.write(`
   <div class="box">
      ${str}
   </div>
`);
```

> 数组+for 循环+模板字符串，用 js 动态渲染出页面的结构

#### 数组操作

js 定义了一系列方法来操作数组中的元素，包括对数组元素的增删改查等操作

> 下面的方法都是直接操作原数组，所以不需要再对数组重新赋值！

**新增元素**

`push()`：在数组末尾添加新的元素，返回新数组的长度

`unshift()`：在数组开头添加新的元素，返回新数组的长度

**删除元素**

`pop()`：删除数组中最后一个元素，同时返回删除的那个元素

`shift()`：删除数组中第一个元素，同时返回删除的那个元素

```js
let names = ["小明", "小红", "小刚"];
console.log(names);

console.log(names.push("小猪猪", "小呆呆"));
console.log(names);

console.log(names.unshift("小李", "小王"));
console.log(names);

console.log(names.pop());
console.log(names);

console.log(names.shift());
console.log(names);
```

![image-20230818150704954](https://post-src.wyun521.top/images/image-20230818150704954.png)

**修改元素**

`arr[index]=*` ：修改某个数组元素的值

> index 如果超出了数组长度，就会变成新增，可能会创建空的索引

**查找元素**

`arr[index]` ：返回指定索引处的元素，如果超出数组长度返回 undefined

**使用 splice 操作数组**

1.  `splice(start,deleteCount)`：从指定位置开始删除若干数组元素

- `start`：起始索引
- `deleteCount`：要删除的元素个数（如果省略则默认从指定的起始位置删除到最后）

```js
let arr = ["第一项", "第二项", "第三项", "第四项"];
// 删除元素
console.log(arr.splice(1, 1));
console.log(arr);
console.log(arr.splice(1));
console.log(arr);
```

![image-20230819100605869](https://post-src.wyun521.top/images/image-20230819100605869.png)

2.  `splice(start,deleteCount,item1,item2...)`：从指定位置开始新增若干数组元素

- `start`：起始索引
- `deleteCount`：要删除的元素个数（新增元素时不能省略，需要补一个 0）

- `items`：新增的元素，可以有多个

```js
let arr = ["第一项", "第二项", "第三项", "第四项", "第五项"];
// 新增
console.log(arr.splice(10, 0, "哈哈", "嘿嘿", "呵呵"));
console.log(arr);
```

![image-20230819100757564](https://post-src.wyun521.top/images/image-20230819100757564.png)

> splice() 总是返回一个数组，里面是删除的所有元素

#### 数组排序

`sort()` 可以对数组进行选择排序

选择排序的执行过程是，从第一个数开始，依次与后面所有的数相比较，找出最小（最大）的数， 放在第一个位置，如此循环直到排序完成

```js
// 升序排序
arr.sort(function (a, b) {
  return a - b;
});
// 降序排序
arr.sort(function (a, b) {
  return b - a;
});
```

### 函数

#### 什么是函数

封装函数可以更好地实现代码的复用。语法:

```js
// 第一步，声明函数
function add() {
  let a = 12;
  let b = 13;
  console.log(a + b);
}
// 第二步，调用函数
add();
```

> 函数必须先定义再使用

> 函数中的代码在调用函数时才会被执行

> 重复多次调用同一个函数，就能实现代码的复用

#### 函数传参和返回值

**函数传参**

生活中的榨汁机，添加不同的水果，可以做出不同口味的果汁。函数也一样，它可以接收不同的数据，从而返回不同的结果

函数中有两种参数：

- 形参：函数声明时的参数
- 实参：函数调用时传递的参数

> 在调用函数时，数据由实参传递给形参

在开发中，最好保证形参和实参个数一致。否则：

- 如果形参个数过多或未传参，多余的形参为 undefined

- 如果实参个数过多，多余的实参会被忽略

在声明函数时，可以给形参一个默认值，这个值会在缺少实参传递或者实参是 `undefined` 时在函数中生效，示例代码如下：

```js
function getSum(arr = []) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(getSum([1, 2, 3, 4, 5])); //15
console.log(getSum()); //0,没有报错
```

**return 返回值**

函数中的 `return` 语句会把函数的处理结果返回给函数调用者

> 如果没有 return ，函数默认的返回值为 undefined

> return 后面的代码不会被执行

#### 作用域

变量有两种作用域：

- 全局变量：在整个 js 文件中有效
- 局部变量：只在块内部、函数内部有效

> 函数内部不声明就直接赋值的变量会被当做全局变量，可能造成全局变量污染

> 当全局变量和局部变量冲突时，按照就近原则，局部变量优先

局部变量不能在作用域外使用：

```JS
function add() {
    let num = 10;
}
add();
console.log(num);
```

![image-20230819160709934](https://post-src.wyun521.top/images/image-20230819160709934.png)

```js
for (let i = 0; i < 5; i++) {
  console.log("-----");
}
console.log(i);
```

![image-20230819161425049](https://post-src.wyun521.top/images/image-20230819161425049.png)

分析下列代码打印结果：

```js
let num = 1;
console.log(num); //1
function fn(a) {
  console.log(num); //3
  num = 2;
  console.log(num); //2
}
num = 3;
console.log(num); //3
fn(num);
console.log(num); //2
```

![image-20230819195323094](https://post-src.wyun521.top/images/image-20230819195323094.png)

> 上面函数中的 num 没有声明，所以它是全局的，也就修改了全局变量 num 的值

> 普通函数只有在被调用时才会执行

#### 匿名函数

匿名函数就是没有名字的函数，匿名函数有两种使用场景：

- 函数表达式
- 立即执行函数

`函数表达式`是将函数赋值给一个变量：

```js
let fn = function () {
  alert("我是匿名函数");
};
fn();
```

`立即执行函数`不需要调用就会执行：

```js
/* 写法一 (匿名函数)() */
(function () {
  let num = 10;
  console.log(num);
})();
/* 写法二 (匿名函数()) */
(function () {
  let num = 20;
  console.log(num);
})();
```

> 多个立即执行函数之间需要使用 ; 隔开

> 使用立即执行函数可以避免全局变量污染问题

**求任意数组的和或平均值**

```js
// - 参数一： 接受实参传递过来的数组
// - 参数二:  如果是true或者不传递参数是求和操作;如果传递过来的参数是false则是求平均值
let handleData = function (arr = [], flag = true) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return flag ? sum : sum / arr.length;
};

console.log(handleData([1, 2, 3]));
console.log(handleData([1, 2, 3, 4, 5], true));
console.log(handleData([1, 2, 3, 4, 5], false));
```

请注意函数表达式的用法，不能在声明前就调用

```js
fn(1);
let fn = function (a) {
  alert(a);
};
```

![image-20230819194005398](https://post-src.wyun521.top/images/image-20230819194005398.png)

> 函数表达式必须声明在前，使用在后，这和变量类似，但和普通的函数不同

### 对象

#### 什么是对象

对象是 JavaScript 里的一种引用数据类型，用来描述一个事物

对象的组成：

- 属性：事物的特征
- 方法：事物的行为

> 对象中的函数叫做方法，方法必须通过对象本身来调用

对象和数组的区别：

- 对象没有长度，并且对象中的数据是无序的
- 对象采用键值对的形式存储数据

下面是一个简单的对象实例：

```js
const pig = {
  uname: "佩奇",
  age: 4,
  sex: "女",
  sing: function () {
    console.log("哼~");
  },
};
// 访问对象的属性
console.log(pig.uname);
// 调用对象的方法
pig.sing();
```

#### 操作对象

**1.点语法**

操作对象非常简单，只需要 `对象.属性名` 或 `对象.方法`

```js
// 操作对象中的属性
// 查
console.log(pig.uname);
// 改
pig.age = 5;
// 增（一个新的属性）
pig.weight = 12;
// 删
delete pig.weight;
```

```js
// 操作对象中的方法（不要加小括号，不然就成了方法调用）
// 查
console.log(pig.sing);
// 改
pig.sing = function () {
  console.log("哼哼哼~");
};
// 增（一个新的方法）
pig.dance = function () {
  console.log("跳舞。。。");
};
// 删
delete pig.dance;
```

> const 声明的数组、对象等引用数据类型本身不能修改，但其中的元素可以重新赋值

**2.方括号语法**

获取对象中属性、方法的另一种形式是使用中括号语法

```js
const pig = {
  "user-name": "佩奇",
  age: 4,
};
console.log(pig["user-name"]);
// 修改对象中的属性
pig["age"] = 6;
console.log(pig["age"]);
```

> 多词属性或者需要解析变量的时候使用中括号语法，其余的直接使用点语法更方便

> 如果中括号中没有引号，就会变成访问当前作用域下的变量

#### 遍历对象

对象没有长度，并且是无序的，所以不能用遍历数组的方式去遍历一个对象

遍历对象请使用 `for-in` 语法：

```js
for (let key in pig) {
  // console.log(pig.key); //undefined，pig对象中没有一个叫key的属性
  console.log(key, typeof key);
  console.log(pig[key]);
}
```

![image-20230821110252602](https://post-src.wyun521.top/images/image-20230821110252602.png)

> key 是一个字符串类型的变量，所以遍历时只能使用中括号语法

**遍历对象数组渲染动态页面**

对象数组的结构是：外层是一个数组，数组中的每个元素都是一个对象

因为外层是一个数组，所以可以直接使用 for 循环遍历

```js
let students = [
  { name: "小明", age: 18, sex: "男", hometown: "河北省" },
  { name: "小红", age: 19, sex: "女", hometown: "河南省" },
  { name: "小刚", age: 17, sex: "男", hometown: "山西省" },
  { name: "小丽", age: 18, sex: "女", hometown: "山东省" },
];

let str = "";
for (let i = 0; i < students.length; i++) {
  // students[i] 数组中每一个对象
  str += `
          <tr>
            <td>${i + 1}</td>
            <td>${students[i].name}</td>
            <td>${students[i].age}</td>
            <td>${students[i].sex}</td>
            <td>${students[i].hometown}</td>
          </tr>`;
}

const tbody = document.querySelector("tbody");
tbody.innerHTML = str;
```

#### 内置对象

内置对象是 JavaScript 内部提供的对象，包含各种属性和方法给开发者调用

其实我们之前使用过内置对象，比如：

- document.write()

- console.log()

##### Math 对象

`Math` 对象是 JavaScript 提供的一个“数学”对象，它提供了一系列做数学运算的方法

```js
// 内置对象Math
// 1. PI 圆周率
console.log(Math.PI);

// 2. max 找最大值
console.log(Math.max(8, 4, 2)); // 8

// 3. min 找最小值
console.log(Math.min(8, 4, 2)); // 2

// 4. abs 取绝对值
console.log(Math.abs(-1)); // 1

// 5. ceil 向上取整
console.log(Math.ceil(1.1)); // 2
console.log(Math.ceil(1.5)); // 2
console.log(Math.ceil(1.8)); // 2
console.log(Math.ceil(-1.1)); //  -1
console.log(Math.ceil(-1.5)); //  -1
console.log(Math.ceil(-1.8)); //  -1

// 6. floor 向下取整
console.log(Math.floor(1.1)); // 1
console.log(Math.floor(1.5)); // 1
console.log(Math.floor(1.8)); // 1
console.log(Math.floor(-1.1)); //  -2
console.log(Math.floor(-1.5)); //  -2
console.log(Math.floor(-1.8)); //  -2

// 7. round 四舍五入取整 .5取正方向
console.log(Math.round(1.1)); // 1
console.log(Math.round(1.5)); // 2
console.log(Math.round(1.8)); // 2
console.log(Math.round(-1.1)); // -1
console.log(Math.round(-1.8)); // -2
console.log(Math.round(-1.5)); // -1
```

**生成随机数**

在 Math 对象中，我们最常用的其实是下面这个方法

`Math.random()`：返回一个 0-1 之间，包括 0 但不包括 1 的随机小数 [0, 1)

```js
// 0-0.99999
console.log(Math.random());
// 生成一个 0-10之间的随机整数
console.log(Math.floor(Math.random() * (10 + 1)));
// 生成一个 5-15之间的随机整数
console.log(Math.floor(Math.random() * (10 + 1)) + 5);
// 生成一个 n-m之间的随机整数
console.log(Math.floor(Math.random() * (m - n + 1)) + n);
// 随机生成一个合法的数组索引
let random = Math.floor(Math.random() * arr.length);
```

**随机点名案例**

```js
let arr = ["关羽", "张飞", "赵云", "马超", "黄忠"];
let random = Math.floor(Math.random() * arr.length);
document.write(arr[random]);
```

**猜数字案例**

```js
// 生成一个1-10之间的随机数
const random = Math.floor(Math.random() * 10) + 1;
let flag = true;
for (let i = 0; i < 3; i++) {
  const num = +prompt("请输入一个数：");
  if (num > random) {
    alert("你猜大了！");
  } else if (num < random) {
    alert("你猜小了！");
  } else if (num === random) {
    flag = false;
    alert("猜对了，你真棒！");
    break;
  }
}
if (flag) {
  alert("真遗憾，你的次数已经用完了~");
}
```

注意，使用正号转换为数值型时，如果用户输入非数字，则会返回 NaN。比如：

```js
// 如果输入非数字，返回NaN
const num = +prompt("请输入一个数字：");
```

**生成随机颜色案例**

```js
// 生成随机颜色
// 如果参数传递的是 true 或者无参数，则输出一个随机十六进制的颜色
// 如果参数传递的是 false ，则输出一个随机rgb的颜色
function getRandomColor(flag = true) {
  if (flag) {
    let arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    let str = "#";
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * arr.length);
      str += arr[random];
    }
    return str;
  } else {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
}

console.log(getRandomColor(true)); //#7de334
console.log(getRandomColor(false)); //rgb(253,46,134)
console.log(getRandomColor()); //#525661
```

#### 数据类型存储

内存空间划分为两大类：

- 栈内存：容量小，但访问速度快

- 堆内存：容量大，但访问速度慢

![image-20230821170940460](https://post-src.wyun521.top/images/image-20230821170940460.png)

```js
// 基本数据类型赋值
let x = 10;
let y = x;
x = 20;
console.log(y); //10

// 引用数据类型赋值
let obj = {
  age: 18,
};
let obj2 = obj;
obj.age = 20;
console.log(obj2.age); //20
```

> 对于基本数据类型的变量，变量的值直接存放在栈内存中；对于引用数据类型的变量，栈内存中存放的是地址，真正的数据存放在堆内存中

> 所以基本数据类型赋值的是值，引用数据类型赋值的是地址
