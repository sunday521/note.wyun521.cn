## ajax-day04

### axios 代码优化

#### 回调函数地狱

`回调函数地狱`：在回调函数中继续调用回调函数，这样层层嵌套就形成了回调函数地狱

`存在的问题`: 代码可读性差、异常捕获困难

![image-20230911093019409](https://post-src.wyun521.top/images/image-20230911093019409.png)

#### then 的链式调用

`then的链式调用`:

- 每个 then 方法会返回一个新的 Promise 对象

- then 中回调函数的返回值会影响新 Promise 对象的状态和结果
- 使用 then 的链式调用语法代替回调函数嵌套写法，提高代码的可读性

> 记得将结果 return 出去，以在下一个 then 中使用

![image-20230912102440353](https://post-src.wyun521.top/images/image-20230912102440353.png)

#### async/await

`async函数` 是使用 async 关键字声明的函数，在 async 函数中能够使用 await 关键字

`await` 用来取代 then 方法，等待获取 Promise 对象成功的结果

`await` 只能获取成功结果，可以使用 try/catch 代码块捕获错误的结果

![image-20230911182158647](https://post-src.wyun521.top/images/image-20230911182158647.png)

![image-20230912102607177](https://post-src.wyun521.top/images/image-20230912102607177.png)

**三者的对比**

![222](https://post-src.wyun521.top/images/222.png)

### 事件循环

#### 同步代码和异步代码

`同步代码`: 逐行执行，需原地等待结果后，才能继续向下执行

`异步代码`: 调用后耗时，不阻塞代码的继续执行，在将来完成后触发一个回调函数，接收异步代码的执行结果

![111](https://post-src.wyun521.top/images/111.png)

> 像定时器、事件监听、XHR 网络请求都是异步代码，Promise 的 then 回调也是异步的

#### 宏任务和微任务

异步代码的两大分类:

- `宏任务`：浏览器管理的异步代码

![image-20230912104513049](https://post-src.wyun521.top/images/image-20230912104513049.png)

- `微任务`：JS 引擎管理的异步代码

![image-20230912104537413](https://post-src.wyun521.top/images/image-20230912104537413.png)

> Promise 实例化时是同步的，then 回调、catch 回调是异步的

#### 事件循环机制

JavaScript 是单线程的，为了不让耗时代码阻塞其他代码的执行，设计了事件循环机制

`事件循环（eventloop）`是 JavaScript 代码的执行机制：

- 同步代码直接进入调用栈中执行，异步代码交给宿主环境（浏览器）
- 等待时机成熟后，浏览器将异步代码的回调送入任务队列中排队
- 当调用栈空闲时，反复查看并调用任务队列中的回调函数

![image-20230912105131092](https://post-src.wyun521.top/images/image-20230912105131092.png)

> 代码的优先级：调用栈中的同步代码 > 微任务 > 宏任务

> 所谓时机成熟，指的是异步代码中的回调函数能够被调用时（如定时器到达指定时间，事件被触发，XHR 请求完成等）

> [点击了解事件循环的详细执行过程](https://lamphc.github.io/fe-up/#/JavaScript/event_loop)
