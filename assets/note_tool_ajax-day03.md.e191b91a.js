import{_ as a,o as e,c as t,Q as o}from"./chunks/framework.cc795e4d.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"note/tool/ajax-day03.md","filePath":"note/tool/ajax-day03.md"}'),i={name:"note/tool/ajax-day03.md"},p=o('<h2 id="ajax-day04" tabindex="-1">ajax-day04 <a class="header-anchor" href="#ajax-day04" aria-label="Permalink to &quot;ajax-day04&quot;">​</a></h2><h3 id="axios-代码优化" tabindex="-1">axios 代码优化 <a class="header-anchor" href="#axios-代码优化" aria-label="Permalink to &quot;axios 代码优化&quot;">​</a></h3><h4 id="回调函数地狱" tabindex="-1">回调函数地狱 <a class="header-anchor" href="#回调函数地狱" aria-label="Permalink to &quot;回调函数地狱&quot;">​</a></h4><p><code>回调函数地狱</code>：在回调函数中继续调用回调函数，这样层层嵌套就形成了回调函数地狱</p><p><code>存在的问题</code>: 代码可读性差、异常捕获困难</p><p><img src="https://post-src.wyun521.top/images/image-20230911093019409.png" alt="image-20230911093019409"></p><h4 id="then-的链式调用" tabindex="-1">then 的链式调用 <a class="header-anchor" href="#then-的链式调用" aria-label="Permalink to &quot;then 的链式调用&quot;">​</a></h4><p><code>then的链式调用</code>:</p><ul><li><p>每个 then 方法会返回一个新的 Promise 对象</p></li><li><p>then 中回调函数的返回值会影响新 Promise 对象的状态和结果</p></li><li><p>使用 then 的链式调用语法代替回调函数嵌套写法，提高代码的可读性</p></li></ul><blockquote><p>记得将结果 return 出去，以在下一个 then 中使用</p></blockquote><p><img src="https://post-src.wyun521.top/images/image-20230912102440353.png" alt="image-20230912102440353"></p><h4 id="async-await" tabindex="-1">async/await <a class="header-anchor" href="#async-await" aria-label="Permalink to &quot;async/await&quot;">​</a></h4><p><code>async函数</code> 是使用 async 关键字声明的函数，在 async 函数中能够使用 await 关键字</p><p><code>await</code> 用来取代 then 方法，等待获取 Promise 对象成功的结果</p><p><code>await</code> 只能获取成功结果，可以使用 try/catch 代码块捕获错误的结果</p><p><img src="https://post-src.wyun521.top/images/image-20230911182158647.png" alt="image-20230911182158647"></p><p><img src="https://post-src.wyun521.top/images/image-20230912102607177.png" alt="image-20230912102607177"></p><p><strong>三者的对比</strong></p><p><img src="https://post-src.wyun521.top/images/222.png" alt="222"></p><h3 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h3><h4 id="同步代码和异步代码" tabindex="-1">同步代码和异步代码 <a class="header-anchor" href="#同步代码和异步代码" aria-label="Permalink to &quot;同步代码和异步代码&quot;">​</a></h4><p><code>同步代码</code>: 逐行执行，需原地等待结果后，才能继续向下执行</p><p><code>异步代码</code>: 调用后耗时，不阻塞代码的继续执行，在将来完成后触发一个回调函数，接收异步代码的执行结果</p><p><img src="https://post-src.wyun521.top/images/111.png" alt="111"></p><blockquote><p>像定时器、事件监听、XHR 网络请求都是异步代码，Promise 的 then 回调也是异步的</p></blockquote><h4 id="宏任务和微任务" tabindex="-1">宏任务和微任务 <a class="header-anchor" href="#宏任务和微任务" aria-label="Permalink to &quot;宏任务和微任务&quot;">​</a></h4><p>异步代码的两大分类:</p><ul><li><code>宏任务</code>：浏览器管理的异步代码</li></ul><p><img src="https://post-src.wyun521.top/images/image-20230912104513049.png" alt="image-20230912104513049"></p><ul><li><code>微任务</code>：JS 引擎管理的异步代码</li></ul><p><img src="https://post-src.wyun521.top/images/image-20230912104537413.png" alt="image-20230912104537413"></p><blockquote><p>Promise 实例化时是同步的，then 回调、catch 回调是异步的</p></blockquote><h4 id="事件循环机制" tabindex="-1">事件循环机制 <a class="header-anchor" href="#事件循环机制" aria-label="Permalink to &quot;事件循环机制&quot;">​</a></h4><p>JavaScript 是单线程的，为了不让耗时代码阻塞其他代码的执行，设计了事件循环机制</p><p><code>事件循环（eventloop）</code>是 JavaScript 代码的执行机制：</p><ul><li>同步代码直接进入调用栈中执行，异步代码交给宿主环境（浏览器）</li><li>等待时机成熟后，浏览器将异步代码的回调送入任务队列中排队</li><li>当调用栈空闲时，反复查看并调用任务队列中的回调函数</li></ul><p><img src="https://post-src.wyun521.top/images/image-20230912105131092.png" alt="image-20230912105131092"></p><blockquote><p>代码的优先级：调用栈中的同步代码 &gt; 微任务 &gt; 宏任务</p></blockquote><blockquote><p>所谓时机成熟，指的是异步代码中的回调函数能够被调用时（如定时器到达指定时间，事件被触发，XHR 请求完成等）</p></blockquote><blockquote><p><a href="https://lamphc.github.io/fe-up/#/JavaScript/event_loop" target="_blank" rel="noreferrer">点击了解事件循环的详细执行过程</a></p></blockquote>',40),c=[p];function s(r,l,n,h,d,m){return e(),t("div",null,c)}const b=a(i,[["render",s]]);export{g as __pageData,b as default};