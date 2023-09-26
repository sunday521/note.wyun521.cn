## js 高级第三天

### 原型对象

**实例方法的问题**

```js
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log("hi~");
  };
}
// 实例化对象
const zs = new Person("张三", 18);
const ls = new Person("李四", 19);
// 内存中保存了两个不同的实例对象
console.log(zs === ls); //false
// 两个实例对象中的实例方法也不是同一个
console.log(zs.sayHi === ls.sayHi); //false
```

![image-20230904193622246](https://post-src.wyun521.top/images/image-20230904193622246.png)

> 实例方法在每次创建新的实例对象时都会重新创建，占用内存空间

**原型对象的用途**

构造函数有一个 `prototype` 属性，指向它包含的原型对象

原型对象用来保存公共的属性和方法，这些属性和方法不会随实例对象多次创建，从而节省内存

实例对象可以直接访问原型对象中的属性和方法

```js
// 一般将公共属性写到构造函数内部，公共方法挂载到原型对象上
function Person(uname, age) {
  this.uname = uname;
  this.age = age;
}
Person.prototype.sayHi = function () {
  console.log("你好！");
};
const mark = new Person("马克", 18);
const lisa = new Person("丽萨", 15);
// 原型对象上的方法，实例对象可以直接调用
mark.sayHi();
lisa.sayHi();
console.log(mark === lisa);
console.log(mark.sayHi === lisa.sayHi); //true 原型对象中的方法是唯一的
```

**原型对象中的 this 指向**

- 构造函数中的 this 指向实例对象
- 原型对象中的 this 也指向实例对象（由实例对象调用）

```js
// 构造函数中的this指向实例对象
function Person(uname, age) {
  this.uname = uname;
  this.age = age;
}
// 原型对象中的this指向实例对象
Person.prototype.sayHi = function () {
  console.log("你好！");
  console.log(this); // mark
};
const mark = new Person("马克", 18);
mark.sayHi();
```

**eg.拓展数组方法**

![image-20230904100114919](https://post-src.wyun521.top/images/image-20230904100114919.png)

```js
// 给数组拓展求最大值、最小值、求和方法
// 在原型对象上添加方法，确保所有数组实例都能调用
Array.prototype.max = function () {
  return Math.max(...this); //this指向调用方法的实例对象
};
Array.prototype.min = function () {
  return Math.min(...this);
};
Array.prototype.sum = function () {
  return this.reduce((prev, ele) => prev + ele);
};
// 实例对象可直接调用原型对象上的方法
const arr = [1, 2, 3, 4, 5];
console.log(arr.max()); //5
console.log(arr.min()); //1
console.log(arr.sum()); //15
```

### 构造器

每个原型对象中都有一个 `constructor` 属性，指向外层的构造函数（表明这个原型对象属于谁）

```js
function Person(uname, age) {
  this.uname = uname;
  this.age = age;
}
// **新增方式操作原型对象，不会覆盖原有属性和方法**
Person.prototype.sayHi = function () {
  console.log("你好！");
};
console.dir(Person.prototype);

// **给原型对象直接赋值，会覆盖其原有属性和方法（包括constructor）**
Person.prototype = {
  sayHi() {
    console.log("你好！");
  },
};
console.dir(Person.prototype);
```

![image-20230908095008923](https://post-src.wyun521.top/images/image-20230908095008923.png)

给原型对象直接赋值会覆盖 constructor 属性，记得要手动添加上：

```js
Person.prototype = {
  sayHi() {
    console.log("你好！");
  },
  // 手动添加constructor属性
  constructor: Person,
};
console.log(Person.prototype);
```

![image-20230908095316132](https://post-src.wyun521.top/images/image-20230908095316132.png)

### 原型

每个实例对象都会有一个 ` __proto__` 属性指向其构造函数的原型对象，正因如此，实例对象才可以调用原型对象中的属性和方法

```js
console.log(mark.__proto__ == Person.prototype); //true
```

### 三者的关系

**构造函数、原型对象和实例对象的关系**

![image-20230904211601038](https://post-src.wyun521.top/images/image-20230904211601038.png)

> 所有的构造函数中有一个 `prototype` 属性，指向它的的原型对象
>
> 所有的原型对象中有一个 `constructor` 属性指向外层的构造函数
>
> 所有的实例对象中有一个 `__proto__` 原型指向其构造函数的原型对象

### 原型对象补充

#### 原型链

![image-20230904114554878](https://post-src.wyun521.top/images/image-20230904114554878.png)

![image-20230904114622146](https://post-src.wyun521.top/images/image-20230904114622146.png)

```js
// 我们可以验证原型链的存在
console.log(mark.__proto__ == Person.prototype); //true
console.log(mark.__proto__.__proto__ == Object.prototype); //true
console.log(mark.__proto__.__proto__.__proto__ == null); //true
```

> 作用域链是变量的查找规则，而原型链是对象属性和方法的查找规则
>
> - 如果最终找不到属性，返回 undefined
> - 如果最终找不到方法，会报错

**instanceof 关键字**

`instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，以此判断复杂数据的类型

![image-20230904212329191](https://post-src.wyun521.top/images/image-20230904212329191.png)

```js
const arr = [1, 2, 3];
console.log(arr instanceof Array); //  true
console.log(arr instanceof Object); //  true
// 我们可以将原型链和构造函数的prototype属性作对比
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
```

> instanceof 的判断可能是不准确的，因为只要在原型链上，就会返回 true

#### 原型继承

`原型继承`：将父代的一个实例对象，添加到子代的原型对象中，子代就继承了父代的公共属性和方法

```js
// 父代
function Person() {
  this.eyes = 2;
}
Person.prototype.eat = function () {
  console.log("我会吃饭");
};
// 子代
function Man() {}
// ***原型继承***
// 使用新创建的父级实例，可以避免子代间的相互影响
Man.prototype = new Person();
// 注意要把被覆盖的constructor加回来
Man.prototype.constructor = Man;
// 子代可以调用父代中的公共属性和方法
const m1 = new Man();
m1.eat();
```
