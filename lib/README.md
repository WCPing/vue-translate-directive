# vue-translate-directive

### v1.0.8更新
1. 对已翻译过的节点进行标记，防止重复翻译，提高页面性能
2. 组件销毁前移除Observe观察

### v1.0.7更新

1. 改进节点筛选逻辑，提高了性能
2. 解决组件被加载到body导致检测不到的问题
3. 针对可能没有被自动国际化替换的部分，向外提供了翻译接口

## vue老项目国际化无压力

#### 实现原理
业务相关国际化，通过vue3生命周期钩子，在页面挂载前，对dom进行遍历，对于目标文本(即配置的页面关键字)，通过匹配预先传入的国际化对象，如果有匹配值，则将目标文本替换为匹配的国际化值，从而完成静态页面的国际化替换。再通过Mutation Observer监视dom, 对于页面中变化的dom，通过同样的方法，进行国际化转换

#### 安装
```
npm install vue-translate-directive
```

#### 在main文件中引入

```
import vueTranslateDirect from 'vue-translate-directive'

app.use(vueTranslateDirect)

```

#### 使用

使用时，在html页面根容器写加上`v-trans`, v-trans支持传入i18n的JSON数据对象。

国际化语言区分浏览器sessionStorage中存储的`currentLang`值，该值用于记录当前语言， 比如`zh`或者`en`。

```
<div class="content" v-trans="{i18n: i18n}">
```

如果直接使用指令，后面不传数据，会默认使用之前的数据，一般适用于子组件。
```
<div class="content" v-trans>
```

#### 实现过程

例如在原本的用户页面， 有个标签显示"姓名"

```
<span>姓名</span>
```

根据当前页面的关键字，比如'user/info',加上'name' 然后配置国际化英文配置json文件

en/i18n.json
```
{ 'user/info/name': 'Name' }
```

zh/i18n.json
```
{ 'user/info/name': '姓名' }
```

在页面中引入JSON对象，并将用户页面修改为

```
<span>user/info/name</span>
```

在用户页面的跟div加上
```
<div class="user-page" v-trans="{i18n: i18n}">
```

翻译指令会先根据sessionStorage中存储`currentLang`值，判断需要替换的那种语言，假设当前`currentLang`为`en`, 然后翻译指令将文本替换为`Name`

刷新浏览器，最终结果为
```
<span>Name</span>
```

#### 手动转换
对于可能没有自动转换的部分，也对外提供了转换接口

```
import { translateKey }  from 'vue-translate-directive'

const translatedStr = translateKey('home/form/successTip')
console.log(translatedStr)
```