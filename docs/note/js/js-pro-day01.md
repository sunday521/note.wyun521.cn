## js 高级第一天

### 作用域

#### 什么是作用域

作用域规定了变量能够被访问的范围

- 全局变量：可以在任何位置访问
- 局部变量：只能在函数内部或块内部访问

注意函数中未使用任何关键字声明的变量将成为全局变量：

```js
if (true) {
  uname = "zs";
}
console.log(uname); // zs
```

#### 作用域链

层层嵌套的代码会形成一条作用域链，此时变量的查找遵循 `就近原则`：

- 优先在当前作用域中查找
- 查找不到继续向上一级作用域查找，直到全局作用域
- 如果全局作用域中也没有这个变量，将返回 undefined

#### 闭包

`闭包 = 内层函数 + 外层函数的变量`

`闭包的作用`：实现数据的私有化，避免全局变量污染

`闭包可能引起的问题`：内存泄漏，局部变量可能不会释放

```js
// 统计函数的调用次数
// 不使用闭包
// let count = 1
// function fn() {
//   count++
//   console.log(`函数被调用${count}次`)
// }

// 使用闭包
function outer() {
  let count = 1;
  function fn() {
    count++;
    console.log(`函数被调用${count}次`);
  }
  return fn;
}
// 把fn函数赋值给re
const re = outer();
re();
re();
```

#### 变量提升

使用 `var` 声明的变量存在变量提升，会把变量的声明提升到当前作用域的最前面

```js
// 例1
if (true) {
  var a = 10;
}
console.log(a); //10
if (false) {
  var b = 10;
}
console.log(b); //undefined
// 例2
if (true) {
  a = 10;
}
console.log(a); //10
if (false) {
  a = 10;
}
console.log(a); //a is not defined
```

> 只有 var 声明的变量会提升，只提升声明， 不提升赋值

#### 垃圾回收

![image-20230901223702254](https://post-src.wyun521.top/images/image-20230901223702254.png)

> js 中内存的分配和回收都是自动完成的，其中引用计数法和标记清除法是两种常见的浏览器垃圾回收算法

### 函数高级

#### 函数提升

函数提升与变量提升类似，函数提升会将函数的定义提升到当前作用域的最前面

```js
// 普通函数存在提升，foo函数正常调用
foo();
function foo() {
  console.log("普通函数调用");
}
//   函数表达式不会提升，报错
//   bar(); //Uncaught ReferenceError: Cannot access 'bar' before initialization
//   const bar = function () {
//     console.log("函数表达式调用");
//   };

//   箭头函数不会提升，报错
//   bar(); ////Uncaught ReferenceError: Cannot access 'bar' before initialization
//   const bar = () => {
//     console.log("箭头函数调用");
//   };
```

> 只有普通函数会被提升，函数表达式和箭头函数不会被提升

#### 展开运算符

展开运算符 `...` 用来展开一个数组/对象，得到里面的所有值

```js
// 使用场景1：求数组最大最小值
const arr = [1, 2, 3];
console.log("arr:", arr);
console.log("arr展开:", ...arr);
console.log("max:", Math.min(...arr));
console.log("min:", Math.max(...arr)); //相当于 console.log(Math.max(1, 2, 3));

// 使用场景2：合并两个数组
const newArr = [...arr, 4, 5, 6];
console.log("newArr:", newArr);

// 使用场景3：合并两个对象
const obj1 = {
  uname: "小张",
  gender: "男",
  age: 18,
};
const obj2 = {
  height: "175cm",
  weight: "65kg",
};
const obj3 = {
  ...obj1,
  ...obj2,
};
console.log("obj3:", obj3);
```

![image-20230901115706138](https://post-src.wyun521.top/images/image-20230901115706138.png)

#### 全部参数

`arguments` 是所有函数内置的伪数组，用来获取调用函数时传入的所有实参

```js
function getSum() {
  console.log(arguments);
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  console.log(sum);
}
getSum();
getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);
```

![image-20230901104909869](https://post-src.wyun521.top/images/image-20230901104909869.png)

#### 剩余参数

使用 `...` 开头的函数形参被称为函数的剩余参数，用来接收多余的实参，形成一个数组保存起来

```js
function getSum(...num) {
  console.log(num);
  let sum = 0;
  num.forEach(function (ele) {
    sum += ele;
  });
  console.log(sum);
}
getSum();
getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);
```

![image-20230901110058527](https://post-src.wyun521.top/images/image-20230901110058527.png)

> 剩余参数必须写在所有函数形参的末尾，否则会出错

剩余参数与 arguments 的区别：

- 两者功能相同
- arguments 是一个伪数组，剩余参数是一个真数组
- 箭头函数中可以使用剩余参数，但不能使用 arguments

剩余参数和展开运算符的区别：

- 两者功能不同
- 剩余参数是一个函数形参，它是把多个实参值收集成一个数组
- 展开运算符是将数组或对象展开，得到其中的每个元素

#### 箭头函数

我们可以使用箭头函数代替所有的匿名函数。语法：

```js
const fn = () => {
  //函数体
};
```

**箭头函数的简写**

在某些情况下，箭头函数可以进行简写：

- 只有一个形参时，可以省略小括号

```js
const printNum = (num) => {
  console.log(num);
};
printNum(10);
```

- 若函数体只有一个语句，花括号可以省略，此时语句的执行结果会被当做函数的返回值

```js
const getSum = (a, b) => a + b;
console.log(getSum(1, 2));
```

- 如果要返回一个对象，必须使用小括号包裹

```js
const getUser = () => ({ uname: "admin" });
console.log(getUser());
```

**箭头函数的 this 指向问题**

```js
// 点击按钮禁用，3秒后启用
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  this.disabled = true;
  setInterval(() => {
    this.disabled = false; //this指向btn
  }, 3000);
});
```

> 箭头函数没有自己的 this，沿用上一级作用域中的 this

### 解构赋值

#### 对象的简写

在 H5 中，属性名和属性值相同时，可以只写属性名，如

```html
<input type="radio" checked />
```

从 ES6 开始，对象中的属性和方法也可以简写：

```js
// 当对象的属性值是一个变量并且和属性名相同时，可以只写属性名
const student = {
  uname,
  age,
  gender,
  sing() {
    console.log("小张开始唱歌");
  },
};
//上面的代码相当于
//   const student = {
//     uname: uname,
//     age: age,
//     gender: gender,
//     sing: function () {
//       console.log("小张开始唱歌");
//     },
//   };
```

#### 数组的解构赋值

使用解构赋值可以解构数组，让代码书写更简洁：

```js
const arr = [100, 60, 80];
const [max, min, avg] = arr;
// 相当于
// const arr = [100, 60, 80];
// const max = arr[0]
// const min = arr[0]
// const avg = arr[2]
```

解构赋值和函数传参类似：

- 当变量多值少时，多余的变量是 undefined（解决：设置默认值）
- 当变量少值多时，多余的值会被忽略（解决：使用剩余参数）

> 变量的个数和值的个数应该保持一致，这是解构赋值最规范的写法

**多维数组的解构**

```js
const [a, [b, c]] = ["小米", ["华为", "苹果"]];
console.log(a, b, c);
```

**交换两个变量的值**

```js
// 利用数组的解构赋值交换两个变量的值
let a = 10;
let b = 20;
[b, a] = [a, b];
console.log(a, b); //20 10
```

#### 对象的解构赋值

和数组的解构赋值类似，对象也可以进行解构赋值：

```js
const user = {
  username: "admin",
  password: "123456",
};
const { username, password } = user;
console.log(username, password);
```

为了防止变量名冲突，可以在解构时对变量名进行修改

```js
const { username: uname, password: pwd } = user;
```

> 对象进行解构赋值时，左侧的变量名和右侧的属性名必须相同，才能解构成功。如果需要，我们可以在解构时重命名这个变量

**对象数组的解构赋值**

```js
const goods = [
  {
    goodsName: "小米",
    price: 1999,
  },
];
const [{ goodsName, price }] = goods;
console.log(goodsName, price);
```

**多级对象的解构赋值**

```js
const pig = {
  name: "佩奇",
  age: 6,
  family: {
    mother: "猪妈妈",
    father: "猪爸爸",
    sister: "乔治",
  },
};
const {
  name,
  age,
  family: { mother, father, sister },
} = pig;
console.log(name, age, mother, father, sister);
```
