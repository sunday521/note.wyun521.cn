## webapi-day06

### 什么是正则

`正则表达式（Regular Expression）` 用于定义一种匹配字符串的规则。使用场景：

- 表单输入校验
- 敏感词过滤（替换）
- 在字符串中提取部分字符

### 定义正则

定义正则的两种方式：

- 字面量
- new 实例化

修饰符（可选）：

- `i`：单词 ignore 的缩写，匹配时不区分大小写
- `g`：单词 global 的缩写，匹配所有满足正则表达式的结果
- `m`：单词 multiline 的缩写，匹配多行

**定义正则的两种方式**

```js
// 检查一个字符串中是否含有 a，忽略大小写
// 1.let 变量 = /正则表达式/修饰符;  // 注意没有引号
let reg = /A/i;
let str = "qiangu";
console.log(typeof reg); //object
console.log(reg.test(str)); //true

// 2.let 变量 = new RegExp("正则表达式", "修饰符"); // 注意两个参数都是字符串
let reg2 = new RegExp("A", "i");
let str2 = "qiangu";
console.log(reg2.test(str2)); //true
```

### 使用正则

正则表达式是一个对象，包含了一些预定义属性和方法：

- `test()`：使用正则去匹配一个字符串，根据匹配结果返回 true 或 false
- `exec()`：使用正则去匹配一个字符串，返回匹配的所有字符（一个数组）

String 中也提供了一些方法来执行正则表达式：

- `replace()`：替换字符串中与正则表达式相匹配的部分
- `search()`：在字符串中搜索匹配项，并返回第一个匹配的结果，没有找到返回 -1
- `match()`：在字符串搜索匹配项，并返回一个数组，若没有匹配项则返回 null

> 正则表达式还提供了一些元字符，[点击查看](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

**元字符的使用**

```js
// 1.边界符
// ^匹配开头
console.log(/^汪/.test("修勾汪汪")); //false
console.log(/^汪/.test("汪汪修勾")); //true
// $匹配结尾
console.log(/汪$/.test("修勾汪汪")); //true
console.log(/汪$/.test("汪汪修勾")); //false
// 精确匹配，只能是那一个字符
console.log(/^汪$/.test("汪修勾汪")); //false
console.log(/^汪$/.test("汪")); //true

// 2.量词
// * 重复零次或多次
console.log(/^汪*$/.test("汪汪汪")); //true
console.log(/^汪*$/.test("")); //true
// + 重复一次或多次
console.log(/^汪+$/.test("汪汪汪")); //true
console.log(/^汪+$/.test("")); //false
// ? 重复零次或一次
console.log(/^汪?$/.test("汪汪汪")); //false
console.log(/^汪?$/.test("")); //true
// {n} 重复n次
console.log(/^汪{2}$/.test("汪汪汪")); //false
console.log(/^汪{2}$/.test("")); //false
console.log(/^汪{2}$/.test("汪汪")); //true
// {n,} 重复n次及以上
console.log(/^汪{2,}$/.test("汪汪汪")); //true
console.log(/^汪{2,}$/.test("")); //false
console.log(/^汪{2,}$/.test("汪汪")); //true
// {n,m} 重复n次到m次
console.log(/^汪{2,3}$/.test("汪汪汪")); //true
console.log(/^汪{2,3}$/.test("")); //false
console.log(/^汪{2,3}$/.test("汪汪")); //true

// 3.方括号
// [] 匹配单个字符
console.log(/^[修勾汪]$/.test("修勾汪汪")); //false
console.log(/^[修勾汪]$/.test("修")); //true
console.log(/^[修勾汪]$/.test("勾")); //true
// -连字符，匹配范围内的单个字符
console.log(/^[a-z]$/.test("汪")); //false
console.log(/^[a-z]$/.test("z")); //true
// 可与量词连用
console.log(/^[a-z]{2}$/.test("xyz")); //false
console.log(/^[a-z]{2,}$/.test("xyz")); //true

// 4.特殊字符（字母大写就是取反]
// \d 匹配0-9之间的数字，相当于[0-9]
// \w 匹配任意的字符、数组或下划线，相当于[A-Za-z0-9]
// \s 匹配空格、换行符、制表符等，相当于[\t\r\n\v\f]
```

**用户名校验**

```js
// 需求：用户名要求由英文字母,数字或下划线组成，长度为6~16位
const reg = /^[a-zA-Z0-9_]{6,16}$/;
const input = document.querySelector(".uname");
// change事件：输入框内容改变，并且失去了焦点时触发，相当于input&blur
input.addEventListener("change", function () {
  // 验证是否符合规范
  // console.log(reg.test(this.value));
  if (reg.test(this.value)) {
    document.querySelector(".tip").style.display = "none"; //隐藏提示文本
    document.querySelector("dd span").className = "right"; //改变背景图片
  } else {
    document.querySelector(".tip").style.display = "block"; //显示提示文本
    document.querySelector("dd span").className = "wrong"; //改变背景图片
  }
});
```

![reg-input](https://post-src.wyun521.top/images/reg-input.gif)

**隐藏手机号**

```js
const tel = "13758945871";
// 1.隐藏中间4位
// 使用()分组，然后$i获取分组中的数据；repeat()方法可以将一个字符串重复多次
// const rst = tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
const rst = tel.replace(/(\d{3})(\d{4})(\d{4})/, `$1${"*".repeat(4)}$3`);
console.log(rst);
// 2.只显示后4位
const rst2 = tel.replace(/(\d{3})(\d{4})(\d{4})/, `${"*".repeat(7)}$3`);
console.log(rst2);
```

![image-20230830112843054](https://post-src.wyun521.top/images/image-20230830112843054.png)

> 关于正则的详细用法，参考 [正则表达式](https://web.qianguyihao.com/04-JavaScript%E5%9F%BA%E7%A1%80/34-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html)
