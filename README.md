# translation

This template should help get you started developing with Vue 3 in Vite.

## 老项目国际化无压力

### 业务相关国际化， 通过Mutation Observer查找页面文本， 联合配置的页面关键字，找到对应的国际化文本，然后替换

#### 例如在用户页面， 有个标签显示"姓名"

`<span>姓名</span>`

#### 我们根据当前页面的关键字 ，比如'用户/信息',加上'姓名' 然后在国际化英文配置json文件中，找到'用户/信息/姓名'这句话对应的值: 'Name'

`{ '用户/信息/姓名': 'Name' }`

#### 我们在Mutation Observer中， 找到页面文本， 然后替换'姓名'

#### 最终结果

`<span>Name</span>`
`
