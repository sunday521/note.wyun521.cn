## js-day04

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

#### 函数传参

生活中的榨汁机，添加不同的水果，可以做出不同口味的果汁。函数也一样，它可以接收不同的数据，从而返回不同的结果

函数中有两种参数：

- 形参：函数声明时的参数
- 实参：函数调用时传递的参数

> 在调用函数时，数据由实参传递给形参

在开发中，最好保证形参和实参个数一致。否则：

- 如果形参个数过多或未传参，多余的形参为 undefined

- 如果实参个数过多，多余的实参会被忽略

在声明函数时，可以给形参一个默认值，这个值会在缺少实参传递或者实参是 undefined 时在函数中生效，示例代码如下：

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

`return` 会把函数的处理结果返回给函数调用者

> 函数默认的返回值为 undefined

> return 后面的代码不会被执行

#### 作用域

js 中的变量有两种作用域：

- 全局变量：在整个 js 文件中有效
- 局部变量：只在块内部、函数内部有效

> 函数内部不声明直接赋值的变量会被当做全局变量，这会造成全局变量污染

> 当全局变量和局部变量冲突时，按照就近原则，局部变量优先

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

#### 匿名函数

匿名函数就是没有名字的函数，匿名函数有两种使用场景：

- 函数表达式
- 立即执行函数

函数表达式是将函数赋值给一个变量

```js
let fn = function () {
  alert("我是匿名函数");
};
fn();
```

立即执行函数不需要调用就会执行

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
