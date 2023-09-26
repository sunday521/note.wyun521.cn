## js-day05

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
