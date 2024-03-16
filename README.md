# vue-translate-directive

### v1.1.0更新

1. 新增`v-trans-ignore`指令，添加该指令的节点不会被检测
2. 支持初始化设定默认默认i18n数据和默认语言
3. 翻译接口支持传入变量

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

...

app.use(vueTranslateDirective, {
  data: i18nData,
  locale: 'en'
})


```

### 入参说明

| 参数 | 说明 |
| ------- | ------- |
| data   | 国际化数据，结构要求为{ en: {}, zh: {} }  |
| locale | 默认语言, 默认`en`, 同时会在浏览器sessionStorage中存储`currentLang`值，用于记录当前语言，如果要切换语言，请修改`currentLang`值 |



#### 使用

使用时，在html页面根容器写加上`v-trans`, v-trans支持传入i18n的JSON数据对象。

国际化语言区分浏览器sessionStorage中存储的`currentLang`值，该值用于记录当前语言， 比如`zh`或者`en`。

支持在指令中传参

```
<div class="content" v-trans="{i18n: i18n}">
```


但是强烈建议在初始化时传入data对象，直接使用指令，后面不接数据，会默认使用初始化传入的数据。
```
<div class="content" v-trans>
```

#### 实现过程

例如在原本的用户页面， 有个标签显示"姓名"

```
<span>姓名</span>
```

根据当前页面的关键字，比如'user',加上'name' 然后配置国际化JSON类型数据

```
// @/i18n/en/user.js
...

{ user: { name: 'Name' } }
```

```
// @/i18n/zh/user.js
...

{ user: { name: '姓名' } }
```

接在在页面中合入国际化对象

```
// @/i18n/locale.js
import en from '@/i18n/en/user.js'
import zh from '@/i18n/zh/user.js'

export const i18nData = {
    en: en,
    zh: zh
}
```

然后在main.js中引入并初始化
```
app.use(vueTranslateDirective, {
  data: i18nData,
  locale: 'en'
})
```

现在将用户页面修改为

```
<span>user/name</span>
```

并在用户页面的根节点div加上v-trans
```
<div class="user-page" v-trans>
```

翻译指令会先根据sessionStorage中存储`currentLang`值，判断需要替换的那种语言，假设当前`currentLang`为`en`, 然后翻译指令将文本替换为`Name`

刷新浏览器，最终结果为
```
<span>Name</span>
```

当然，也可以不需要在main.js中初始化，直接在页面中传参, 效果一样
```
<div class="user-page"  v-trans="{i18n: i18nData}">
```

#### v-trans-ignore 

如果不想翻译当前元素节点，或者忽略当前元素，可以在元素内加上v-trans-ignore指令，那么当前元素及其子节点都将被翻译指令忽略
```
<div class="page-path" v-trans-ignore>
```

#### 手动转换
对于需要在js中转换的文本，我们也对外提供了转换接口

```
import { translateKey }  from 'vue-translate-directive'

const translatedStr = translateKey('home/form/successTip')
console.log(translatedStr) // Added successfully

```

同时该接口也支持变量

```
// { common: { CUR_LANG_IS: '当前语言是{0}' } }

const language = '中文'
const translatedStr = translateKey('common/CUR_LANG_IS', language)
console.log(translatedStr); // 当前语言是中文

```
