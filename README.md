# music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
### 1. 深度克隆数据
```javascript
function clone(obj) {
    var val;
    switch (typeof obj) {
        case "undefined":
            break;
        case "string":
            val = obj + '';
            break;
        case "number":
            val = obj - 0;
            break;
        case "object":
            if (isArray(obj)) {
                val = [];
                for (var i = 0; i < obj.length; i++) {
                    var tmp = obj[i];
                    val.push(clone(tmp));
                }
            } else if (typeof obj === "object") {
                val = {};
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var p = obj[key];
                        val[key] = clone(p);
                    }
                }
            }
            break;
        default:
            val = obj
            break;
    }
    return val;
};
// 判断是数组
function isArray(obj) {
    // Object.prototype.toString.call(obj).slice(8,-1)==='Array'
    return Object.prototype.toString.call(obj) === '[object Array]';
};
```
----------------------------
### 2. 请用Promise改写以下程序
有以下两个方法（callback 参数均为 ‘err,res’）<br>
`model.fetchUsers(skip, limit, callback);`<br>
`service.log(message, callback);`<br>

把以上两个方法用Promise改写，然后改下以下程序，解决回调嵌套问题。
```javascript
model.fetchUsers(0, 100, function(err, users) {
    if (err) {
        console.error('fetchUsers error:', err);
    } else {
        service.log('fetchUsers', function(err) {
            if (err) {
                console.error('log error:', err);
            } else {
                console.log('done');
            }
        });
    }
})
```
>改写
```javascript
var fetchUsers = function(skip, limit) {
    return new Promise((reslove, reject) => {
        model.fetchUsers(skip, limit, function(err, res) {
            if (err) return reject(err);
            reslove(res)
        })
    });
}

var log = function(message) {
    return new Promise((reslove, reject) => {
        service.log(message, function(err, res) {
            if (err) return reject(err);
            reslove(res)
        })
    });
}
fetchUsers().then(res => {
    return log('fetchUsers');
}, err => {
    console.log('fetchUsers error:', err)
}).then(res => {
    return log('done');
}, err => {
    console.log('log error:', err)
})
```
----------------------------
### 3. 数组去重
>方法一：
```javascript
Array.prototype.unit = function() {
    let me = this;
    let tmp = [],
        lice = [];
    var k = 0;
    for (var i = 0, len = me.length; i < len; i++) {
        let m = me[i];
        if (tmp.indexOf(m) == -1) {
            tmp.push(m)
        } else {
            // lice.push(me.splice(i, 1)[0]);
            lice = lice.concat(me.splice(i, 1));
            i--;
            len--;
        }
    }
    return lice;
}
```
>方法二：
```javascript
Array.prototype.$unit = function() {
    let me = this;
    let tmp = {},lice=[];
    var k = 0;
    for (var i = 0, len = me.length; i < len; i++) {
        let m = me[i];
        if (tmp[m] === undefined) {
            tmp[m] = true
        } else {
            // lice.push(me.splice(i, 1)[0]);
            lice = lice.concat(me.splice(i, 1));
            i--;
            len--;
        }
    }
    return lice;
}
```
----------------------------
### 4. jQuery事件绑定方法bind、 live、delegate和on的区别
*  `bind()` <br>
    会绑定事件类型和处理函数到DOM element上
* `live()` <br>
    绑定相应的事件到你所选择的元素的根元素上，即是document元素上
* `delegate()` <br>
    .delegate()有点像.live(),不同于.live()的地方在于，它不会把所有的event全部绑定到document,而是由你决定把它放在哪儿。而和.live()相同的地方在于都是用event delegation.
* `on()` <br>
    其实.bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate(),也是一样的都是通过.off()来实现的
>总结:<br>
- 用`.bind()`的代价是非常大的，它会把相同的一个事件处理程序hook到所有匹配的DOM元素上；<br>
- 不要再用`.live()`了，它已经不再被推荐了，而且还有许多问题；
- `.delegate()`会提供很好的方法来提高效率，同时我们可以添加一事件处理方法到动态添加的元素上；<br>
- 我们可以用`.on()`来代替上述的3种方法；
----------------------------
### 5. 你所了解到的Web攻击技术

* （1）XSS（Cross-Site Scripting，跨站脚本攻击）：指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或者JavaScript进行的一种攻击。 
* （2）SQL注入攻击 
* （3）CSRF（Cross-Site Request Forgeries，跨站点请求伪造）：指攻击者通过设置好的陷阱，强制对已完成的认证用户进行非预期的个人信息或设定信息等某些状态更新。
----------------------------
### 6. 清除浮动有哪些方式？比较好的方式是哪一种？
    （1）父级div定义height。
    （2）结尾处加空div标签clear:both。
    （3）父级div定义伪类:after和zoom。(较常用)
    （4）父级div定义overflow:hidden。
    （5）父级div定义overflow:auto。
    （6）父级div也浮动，需要定义宽度。
    （7）父级div定义display:table。
    （8）结尾处加br标签clear:both。
----------------------------
### 7. DOM怎样添加、移除、移动、复制、创建和查找节点
    // 创建新节点
    createDocumentFragment() //创建一个DOM片段
    createElement() //创建一个具体的元素
    createTextNode() //创建一个文本节点
    // 添加、移除、替换、插入
    appendChild()
    removeChild()
    replaceChild()
    insertBefore() //在已有的子节点前插入一个新的子节点
    // 查找
    getElementsByTagName() //通过标签名称
    getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    getElementById() //通过元素Id，唯一性
----------------------------
### 8. call() 和 apply() 的区别和作用
    apply()函数有两个参数：第一个参数是上下文，第二个参数是参数组成的数组。如果上下文是null，则使用全局对象代替。
    如：function.apply(this,[1,2,3]);
    call()的第一个参数是上下文，后续是实例传入的参数序列。
    如：function.call(this,1,2,3);
----------------------------
### 9.性能优化的方法
    （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
    （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
    （3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
    （4） 当需要设置的样式很多时设置className而不是直接操作style。
    （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
    （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
    （7） 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。
------------
### 10. 已知有字符串foo="get-element-by-id",写一个function将其转化成驼峰表示法"getElementById"
```javascript
function combo(msg){
    var arr = msg.split("-");
    var len = arr.length;    //将arr.length存储在一个局部变量可以提高for循环效率
    for(var i=1;i<len;i++){
        arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length-1);
    }
    msg=arr.join("");
    return msg;
}
```
--------------
### 11.原生JS的`window.onload`与Jquery的`$(document).ready``(function(){})`有什么不同
`window.onload()`方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。<br>
`$(document).ready()`是DOM结构绘制完毕后就执行，不必等到加载完毕。 <br>
执行顺序->`$(document).ready()`->`window.onload()`　
>用原生JS实现Jq的ready方法
```javascript
function ready(fn){
    if(document.addEventListener) { //标准浏览器
        document.addEventListener('DOMContentLoaded', function() {
            //注销事件, 避免反复触发22222
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            fn(); //执行函数
        }, false);
    }else if(document.attachEvent) { //IE
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();        //函数执行
            }
        });
    }
};
```
---------------
### 12. JS如何实现面向对象和继承机制
>构造器继承
```javascript
function Super(a){
    this.a = a;
    this.func = function(){};
}
function Sub(a){
    Super.call(this,a);
}
var obj = new Sub();
```
>原型继承
```javascript
function Super(a){
    this.a = a;
    this.func = function(){};
}
function Sub(){
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
var obj = new Sub();
```
>混合继承
```javascript
function Super(a){
    this.a = a;
    this.func = function(){};
}
function Sub(a){
    Super.call(this,a);
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
var obj = new Sub();
```
>寄生继承
```javascript
function Super(a){
    this.a = a;
    this.func = function(){};
}
Super.prototype.talk = function(){console.log('talk');}
function Sub(a){
    Super.call(this,a);
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
var obj = new Sub();
```
---------------
## 13.移动设备忽略将页面中的数字识别为电话号码的方法
```html
<meta name="format-detection" content="telephone=no"> 
<meta name="format-detection" content="email=no">  
<meta name="format-detection" content="adress=no"> 
<!--telephone=禁止数字拨号 email=不识别邮箱，点击之后不自动发送 adress=跳转至地图-->  
<meta name="format-detection" content="telephone=no,email=no,adress=no">  
```
---------------
### 14. 事件委托
    利用事件冒泡的原理，使自己的所触发的事件，让它的父元素代替执行！
    这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发
    Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的
```javascript
window.onload = function(){
    var oUl = document.getElementById("ul1");
    oUl.onclick = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            alert(123);
            alert(target.innerHTML);
        }
    }
}
```
---------------
### 15. 原生js封装一个添加监听事件
```javascript
functionaddEvent(obj,event,fn){
        //现代：addEventLister 不用加on
        //ie：touchEvent 需要加on
        if (window.addEventListener){
                obj.addEventListener(event,fn);
        }else{
                obj.attachEvent("on"+event, fn);
        }
}
```
---------------
### 16. JSONP 的工作原理
利用`<script>`标签没有跨域限制的“漏洞”来达到与第三方通讯的目的。当需要通讯时，通过js创建一个`<script>`元素，地址指向第三方的API网址，形如：<br>
`<script src="http://www.example.net/api?param1=1&param2=2"></script>`<br>并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：<br>`callback({"name":"hax","gender":"Male"})`<br>这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。
### 17. 如何阻止事件冒泡和默认事件

    阻止冒泡:
    现代浏览器:e.stopPropagation
    低版本浏览器:e.cancelBubble=true
    阻止默认事件:
    现代浏览器:e.preventDefult()
    低版本浏览器:return false
---------------
### 18. GET/POST的区别
>GET请求:
>>请求的数据会附加在URL之后，以?分割URL和传输数据，多个参数用&连接。URL的编码格式采用的是ASCII编码，而不是uniclde，即是说所有的非ASCII字符都要编码之后再传输。

>POST请求：
>>POST请求会把请求的数据放置在HTTP请求包的包体中。

>关于传输数据的大小
>>在HTTP规范中，没有对URL的长度和传输的数据大小进行限制。但是在实际开发过程中，对于GET，特定的浏览器和服务器对URL的长度有限制。因此，在使用GET请求时，传输数据会受到URL长度的限制。对于POST，由于不是URL传值，理论上是不会受限制的，但是实际上各个服务器会规定对POST提交数据大小进行限制，Apache、IIS都有各自的配置。
---------------
![asfas](./static/img/1.png)
