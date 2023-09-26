## js 高级第四天

### 浅拷贝和深拷贝

#### 直接赋值的问题

直接赋值存在一些问题：

```js
const obj = {
  name: "佩奇",
  age: 18,
};
const newObj = obj;
obj.name = "乔治";
console.log(obj.name);
console.log(newObj.name); // 乔治
```

![image-20230905090725783](https://post-src.wyun521.top/images/image-20230905090725783.png)

> 对于赋值操作，虽然基本类型是复制值，但引用类型复制的是对象的引用（地址），修改任何一个对象，另一个对象也会被修改

> 我们可以使用对象的深浅拷贝代替直接赋值，避免出错

#### 浅拷贝

> 浅拷贝：只拷贝单层，在多层下的属性仍拷贝的是对象的引用

实现浅拷贝的方式有：

- `{...obj}` 或 `Object.assign(newObj,obj)`：浅拷贝一个对象
- `[...arr]` 或 `Array.prototype.concat()`：浅拷贝一个数组

```js
const obj = {
  name: "佩奇",
  age: 18,
};
// 展开运算符浅拷贝
const newObj = { ...obj };
obj.name = "乔治";
console.log(obj.name); //乔治
console.log(newObj.name); //佩奇

// Object.assign() 浅拷贝
const newObj2 = {};
Object.assign(newObj2, obj);
obj.name = "卡卡西";
console.log(obj.name); //卡卡西
console.log(newObj2.name); //乔治
```

**浅拷贝的问题**

浅拷贝只能拷贝单层，如果多层属性值是引用类型的数据，拷贝的还是对象的引用

```js
const obj = {
  name: "佩奇",
  age: 18,
  family: {
    father: "猪爸爸",
  },
};
// 浅拷贝只能复制第一层的值，多层还是复制的引用
const newObj = { ...obj };
obj.name = "乔治";
obj.family.father = "猪猪";
console.dir(obj);
console.dir(newObj); //也变成了猪猪
```

![image-20230905092926652](https://post-src.wyun521.top/images/image-20230905092926652.png)

![image-20230905093034441](https://post-src.wyun521.top/images/image-20230905093034441.png)

#### 深拷贝

> 深拷贝：全部拷贝对象的值，无论层级有多深，是真正意义上的完全复制

实现深拷贝的方式有：

- `JSON.parse(JSON.stringify(obj))`：先把对象转为字符串，再把这个字符串转回对象返回，这样就得到了一个全新的对象
- `_.cloneDeep(obj)`：传入一个对象，返回一个完全拷贝的新对象，需要先引入 [lodash.js](https://www.lodashjs.com/docs/lodash.cloneDeep)

```js
const obj = {
  name: "佩奇",
  age: 18,
  gender: undefined,
  family: {
    father: "猪爸爸",
  },
  sing: function () {
    console.log("我会唱歌");
  },
};
```

```js
// 1.JSON序列化实现深拷贝
// 问题：不能识别对象中的undefined和function，默认会被忽略
const newObj = JSON.parse(JSON.stringify(obj));
obj.name = "乔治";
obj.family.father = "猪猪";
console.dir(obj);
console.dir(newObj);
```

![image-20230905095746471](https://post-src.wyun521.top/images/image-20230905095746471.png)

```js
// 2.利用lodash库实现深拷贝
const newObj = _.cloneDeep(obj);
obj.name = "乔治";
obj.family.father = "猪猪";
console.dir(obj);
console.dir(newObj);
```

![image-20230905095944778](https://post-src.wyun521.top/images/image-20230905095944778.png)

**手动递归（了解）**

手动递归也可以实现深拷贝，不过会很麻烦，理解思想就可以了

```js
// 递归就是自己调自己
// 核心是利用函数递归实现深拷贝
const obj = {
  name: "佩奇",
  age: 18,
  family: {
    father: "猪爸爸",
  },
};
function cloneDeep(obj) {
  // 判断拷贝的是数组还是对象
  const newObj = Array.isArray(obj) ? [] : {};
  // 遍历复制其中的每个元素
  for (key in obj) {
    // newObj[key] = obj[key];
    // 如果元素的属性值是复杂类型数据，就再次执行递归
    // 如果是基本类型数据，直接赋值即可
    if (typeof obj[key] === "object") {
      newObj[key] = cloneDeep(obj[key]); //递归：自己调自己
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
const newObj = cloneDeep(obj);
obj.name = "乔治";
obj.family.father = "猪猪";
console.dir(obj);
console.dir(newObj);
```

![image-20230905110229093](https://post-src.wyun521.top/images/image-20230905110229093.png)

### 异常处理

#### 捕获异常

> 异常处理：我们可以预估代码执行过程中可能发生的错误，然后进行相应的处理，以最大程度的避免错误的发生致使的程序崩溃

`try...catch` 语句用来捕获异常：

```js
try {
  // 供测试的代码
} catch (err) {
  // 处理错误的代码（默认不会中断程序）
} finally {
  // 无论结果如何都执行的代码
}
```

#### 抛出异常

`throw` 关键字用来手动抛出一个异常/错误，并中断程序的执行

```js
try {
  debugger; //debugger关键字用来在代码中添加一个断点，在刷新页面后程序会停在断点位置
  document.querySelector(".box").style.background = "skyblue";
} catch (err) {
  throw new Error(err); //手动抛出错误，程序将停止运行
} finally {
  console.log("总会执行的代码");
}
```

![image-20230905114145466](https://post-src.wyun521.top/images/image-20230905114145466.png)

> [点击查阅异常处理的全部用法](https://www.w3school.com.cn/js/js_errors.asp)

### 更改 this 指向

> 普通函数中的 this 默认指向 window 顶级对象

> 箭头函数没有自己的 this，下列方法不能用来操作箭头函数

更改 this 指向的方式有：

- `函数.call(this,args)`：调用函数，同时更改函数中的 this 指向
- `函数.apply(this,argArr)`：调用函数，同时更改函数中的 this 指向
- `函数.bind(this,args)`：不会调用函数，仅更改函数中的 this 指向，同时返回原函数的拷贝

**call 方法**

```js
const obj = {
  uname: "佩奇",
};
function fn(msg) {
  console.log(this, msg);
}
// call方法可以调用函数并更改函数中的this指向
// 语法：普通函数.call(this指向的对象，原函数的参数...)
fn.call(obj, "你好！");

// Object.prototype.toString.call()可以检测数据的真实类型
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(""));
console.log(Object.prototype.toString.call("") === "[object String]");
```

![image-20230905145635255](https://post-src.wyun521.top/images/image-20230905145635255.png)

**apply 方法**

```js
const obj = {
  uname: "乔治",
};
function fn(msg) {
  console.log(this, msg);
}
// apply方法可以调用函数并更改函数中的this指向
// 语法：普通函数.apply(this指向的对象，原函数的参数数组)
fn.apply(obj, ["你也好呀！"]);

// apply经常用在和数组相关的操作
console.log(Math.max.apply(Math, [1, 2, 3, 4, 5]));
```

![image-20230905145650595](https://post-src.wyun521.top/images/image-20230905145650595.png)

**bind 方法**

```js
const obj = {
  uname: "猪爸爸",
};
function fn(msg) {
  console.log(this, msg);
}
// bind方法可以更改函数中的this指向，然后返回原函数的拷贝（不会调用原函数）
// 语法：普通函数.bind(this指向的对象，原函数的参数...)
const fn2 = fn.bind(obj, "长的真壮实！");
fn2();

// **改变定时器内部的this指向,控制按钮禁用状态**
// 当我们只是想改变 this 指向，并且不想调用这个函数时，可以使用bind
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  this.disabled = true;
  setTimeout(
    function () {
      console.log(this); //this改为指向btn
      this.disabled = false;
    }.bind(btn),
    3000
  );
});
```

![image-20230905151521853](https://post-src.wyun521.top/images/image-20230905151521853.png)

![image-20230905152314178](https://post-src.wyun521.top/images/image-20230905152314178.png)

### 防抖与节流

> 防抖与节流是前端性能优化的重点，面试常问，必须掌握它的使用场景

![image-20230905162531107](https://post-src.wyun521.top/images/image-20230905162531107.png)

![image-20230905162547162](https://post-src.wyun521.top/images/image-20230905162547162.png)

**原始事件**

```js
// move()：当鼠标移动时，盒子中的文字+1
// 没有做任何的性能优化，数字增长特别快
box.addEventListener("mousemove", move);
```

![lodash-no](https://post-src.wyun521.top/images/lodash-no.gif)

**添加事件防抖**

```js
// 使用lodash实现防抖（需要先引入lodash.js）
box.addEventListener("mousemove", _.debounce(move, 300));
```

![lodash-debounce](https://post-src.wyun521.top/images/lodash-debounce.gif)

> 只要事件还在触发，防抖后的事件处理函数就不会被执行

**添加事件节流**

```js
// 使用lodash实现节流（需要先引入lodash.js）
box.addEventListener("mousemove", _.throttle(move, 300));
```

![lodash-throttle](https://post-src.wyun521.top/images/lodash-throttle.gif)

> 频繁触发事件，节流后的事件处理函数调用次数会大大减少

**eg.视频续播案例**

- `mediaEle.currentTime`：以秒为单位返回当前媒体元素的播放位置（可读写）
- `timeupdate事件`：在媒体元素的播放位置发生改变时触发

```js
// 需求：当重新打开页面时，视频从上次离开的位置开始播放
// 1.给视频元素绑定timeupdate事件，当视频开始播放时，采用节流的方式每隔一段时间获取一下当前视频的播放位置，同时把它保存在本地存储中
const video = document.querySelector("video");
video.addEventListener(
  "timeupdate",
  _.throttle(function () {
    // video.currentTime 获取视频播放的时间（单位s）
    localStorage.setItem("playTime", video.currentTime);
  }, 1000)
);
// 2.在页面加载完成后，获取本地存储中的时间，把它设置给视频元素的currentTime属性
window.onload = () => {
  // 修改currentTime属性改变视频当前的播放位置
  const playTime = localStorage.getItem("playTime");
  video.currentTime = playTime;
};
```

**eg.自定义函数实现节流**

```js
// 先判断是否已有定时器，如果没有才会开启一个定时器
// 在定时器里面调用执行的函数
function throttle(fn, t) {
  let timerId;
  return function () {
    if (!timerId) {
      timerId = setTimeout(function () {
        //调用事件处理函数
        fn();
        // 本次事件处理完毕，清空定时器
        timerId = null;
      }, t);
    }
  };
}
box.addEventListener("mousemove", throttle(move, 300));
```

![image-20230905162508819](https://post-src.wyun521.top/images/image-20230905162508819.png)
