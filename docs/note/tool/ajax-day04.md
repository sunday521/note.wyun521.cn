## JWT访问控制

```
本质：一个字符串
获取：服务器给的，我们只需要了解即可
作用：鉴定用户权限
分类：
1.页面访问控制 
  本地存储有token,允许访问；没有则不允许访问
2.接口访问控制 
  token有效，允许调用；token无效（过期/被篡改），不允许调用   
```

## axios拦截器配置

```
1：请求拦截器：
   作用：在请求到达服务器之前做一些统一的处理；比如说统一设置接口文档要求的请求头(token等) 
2：响应拦截器
   作用：在响应到达.then/.catch之前对响应做一些统一的处理；比如说统一处理token失效、数据剥离(将axios包裹的对象减少一层)
```

## echarts图表

```javascript
前提步骤：
  1. 下包+导包
  2. 准备一个定义了宽高的DOM容器
核心步骤：
  1. 初始化echarts实例对象
     const myChart = echarts.init(dom元素)
  2. 指定图表的配置项和数据: 可以影响图表的内容
     const option = {...}
  3. 显示图表
     myChart.setOption(option)

工作中使用echarts步骤
   1. 找示例（原则：找最类似的，找最简单的）
   2. 整合示例到自己代码中（echarts前提+核心五步骤）
   3. 调设置（查文档->慢慢调）
```
## Git版本控制

### Git基础概念

**什么是Git**

```
Git是一个分布式版本控制系统。功能：
- 记录文件的变化
- 查看记录信息
- 将文件切换到记录时的状态
```
**终端打开位置**

```
1. 如果是配置全局，随便在哪开
2. 如果是写项目的时候，必须在项目的根目录中的空白位置开启终端
```

**配置用户信息 (安装完Git后只需要配置一次即可)**

```bash
1.配置用户名和邮箱
git config --global user.name "用户名"
git config --global user.email "邮箱"
2.查看配置项
git config --list
```

>   每次 Git 提交时都会使用这些信息作为开发者标识

### Git本地操作

**初始化本地仓库**

```bash
作用：保存代码的变化
命令： git init
变化：多一个.git文件夹，这个.git文件夹就是Git的本地库（版本库）
```


**忽略文件及检查文件状态**

```bash
为什么要忽略文件？因为有些文件不希望提交到版本库中，比如说自动生成的文件(.vscode)
忽略文件：创建.gitignore文件 并在里面写需要被忽略文件名
工作中通常不需要我们配置.gitignore （因为默认就设置好了）

**检查文件状态（想用就用，通常想检查文件状态的时候用）
命令： git status

文件的三种状态：
1. 红色: 工作区的修改 
2. 绿色: 暂存区的修改 -> git add . 
3. nothing to commit：（版本库的修改 -> git commit -m "" ）或者 刚创建项目文件夹的时候
```

**记录每次更新到仓库**

```bash
什么时候需要记录？（想记录就记录，但是工作中一般完成一个小功能做记录）
1. 当初始化仓库后，分为工作区、暂存区、版本库
2. 把工作区代码提交到暂存区
   git add .
3. 把暂存区代码提交到版本库
   git commit -m "信息"   
```

**查看及切换历史版本**

```bash
1.查看历史版本
git log --oneline (查看简略信息：查看的是当前记录及之前的)
git log           (查看详细信息)
git reflog        (查看完整历史版本)
2.切换历史版本 git reset --hard 版本号(在历史记录最左边黄色字)
3.清屏 clear
```

### Git分支

**分支操作**

```bash
1. 查看分支
   git branch （查看本地所有分支）
   git branch -a  （查看远程所有分支）
2. 切换分支
   git checkout 分支名
3. 创建分支(①新分支内有所在分支的提交记录/内容 ②创建的新分支不会自动切换指针)
   git branch 新分支名
4. 合并分支  
   步骤：①切换到要合并的分支去 git checkout 分支名 
        ②合并要被合并的分支   git merge 要被合并的分支名
5. 删除分支
   git branch -d 要被删除的分支名 （只能删除已被合并的分支）
   git branch -D 要被删除的分支名  (可以删除未被合并的分支)
6. 创建及切换分支
   git checkout -b 新分支名
```

**分支合并冲突**

```bash
原因：不同分支+相同文件+相同位置+不同修改；在合并的时候一定会产生冲突(CONFLICT)

如何解决冲突？

根据VSCODE提示，手动修改冲突的文件
解决完后一定要记得记录
```

### Git远程操作

**操作远程仓库**

```bash
作用：本次仓库备份；多人协作

1.新建仓库和推送 (把本地仓库上传到远程做备份)
  ①：准备一个本地仓库
  ②：远程(Gitee)新建一个空的Git仓库
  ③： git remote add origin 远程仓库地址
  ④： git push -u origin 分支名 (本地有几个分支就推送几次)

2.开发及推送
  正常开发记录 add+commit
  命令： git push
  什么时候进行推送：想推就推，但是一般来说工作中完成了一个大功能做推送
  
3. 克隆
  什么时候克隆？刚进入公司/换电脑的时候，此时因为电脑中没有项目，所以需要从远处克隆一份
  命令： git clone 远程仓库地址
  
4. 拉取(想拉就拉，拉取会把远程仓库的代码合并到本地)
  命令： git pull
  注意：一定要先拉再推
  
5. 配置SSH
   原因：ssh比https更加安全，工作中常用
   配置步骤是固定的
   好处：不用再输密码；没有warning(警告)
```

**使用 vscode 简化命令操作**

```
可以简化Git常用操作

使用：左侧第三个分叉的图标

1. 记录
   + - 对应add .
   √(注意:点√前需要输入提交的信息)   对应commit -m "信息" 
2. 分支
   查看->外观->状态栏 底部可以查看当前分支及切换分支
   其余都在 ... -> 分支 中
3. 推送代码到远程
   同步更改(会自动先拉再推)
```
## 事件循环面试题

### 选择题

>   在线答题：https://ks.wjx.top/vm/miNp0Vr.aspx#

>   参考答案：DBDDC  DBCDB

### 代码题

判断下列代码的输出顺序：

```js
setTimeout(() => {
    console.log(1);
    new Promise((resolve, reject) => {
        resolve(2);
    }).then((res) => {
        console.log(res);
        // 3比5先进入宏队列
        setTimeout(() => {
            console.log(3);
        }, 1000);
    });
}, 0);
console.log(4);
setTimeout(() => {
    console.log(5);
}, 5000);
console.log(6);
```
> 代码一输出结果：4 6 1 2 3 5

```js
new Promise((resolve, reject) => {
    console.log(1);
    new Promise((resolve, reject) => {
        console.log(2);
        setTimeout(() => {
            console.log(3);
        }, 0);
        console.log(4);
    });
    console.log(5);
});
setTimeout(() => {
    console.log(6);
}, 1000);
console.log(7);
```
> 代码二输出结果：1 2 4 5 7 3 6

```html
<script>
    console.log(1);
    // 后于第二个script脚本进入宏任务队列
    setTimeout(() => {
        console.log(2);
    }, 0);
    console.log(3);
</script>
<script>
    console.log(4);
    // 后于第一个定时器进入宏任务队列
    setTimeout(() => {
        console.log(5);
    }, 0);
    console.log(6);
</script>
```
> 代码三输出结果：1 3 4 6 2 5

```js
console.log(1);
async function fnOne() {
    console.log(2);
    await fnTwo(); // await会阻塞后面代码的执行
    console.log(3); // 这里要等到await拿到结果，进入微任务队列，然后等待被执行，相当于then
}
async function fnTwo() {
    console.log(4);
}
fnOne();
setTimeout(() => {
    console.log(5);
}, 2000);
let p = new Promise((resolve, reject) => {
    console.log(6);
    resolve();
    console.log(7);
});
// 8比5先进入宏任务队列，所以先执行
setTimeout(() => {
    console.log(8);
}, 0);
p.then(() => {
    console.log(9);
});
console.log(10);
// output: 1 2 4（3进入微任务队列）6 7 10（同步代码执行完毕）3 9（微任务执行完毕） 8 5
```
> 代码四输出结果：1 2 4 6 7 10 3 9 8 5

> 代码四执行过程：1 2 4（3进入微任务队列）6 7 10（同步代码执行完毕）3 9（微任务执行完毕） 8 5

```js
// addEventListener注册的两个相同事件先后执行
// 点击事件是宏任务，在触发点击后进入宏任务队列
document.body.addEventListener("click", () => {
    let p = new Promise((resolve) => resolve(1));
    p.then((result) => console.log(result));
    console.log(2);
});
// 微任务>宏任务，只要有微任务，任何宏任务都不会被执行
// 所以先执行上一个点击事件中的微任务then，再执行第二个点击事件
document.body.addEventListener("click", () => {
    let p = new Promise((resolve) => resolve(3));
    p.then((result) => console.log(result));
    console.log(4);
});
```
> 代码五输出结果：2 1 4 3

>   事件循环机制总结：
>
>   -   JS代码的执行顺序是：同步代码 > 微任务 > 宏任务
>   -   Promise 中的代码是同步执行的，then 回调和 catch 回调是异步的（微任务）
>   -   script 标签本身也是一个宏任务，在网页加载时就会进入宏任务队列

>   async/await 梳理：
>
>   -   await 关键字只能在 async 函数内部使用
>   -   await 会阻塞代码的执行，等待 Promise 对象返回成功/失败的结果，然后将后面的代码放入微任务队列中（阻塞的范围限制在 async 函数中）
>   -   await 只能获取 Promise 成功的结果，如果想要获取失败的结果，只能在外层使用 try...catch 捕获
>   -   await 后面一般跟一个 Promise 对象，如果后面是一个值，会直接把值当做 Promise 对象的成功结果
>   -   async 的书写位置：修饰箭头函数时，写在小括号前面；修饰普通函数时，写在 function 前面
