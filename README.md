# vue-wechat

### 技术栈

#### 前台
> * vue
> * vue-router
> * vuex
> * axios
> * es6
> * localStorage
> * webpack

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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 搭建测试服务器
``` bash
# npm 地址
https://www.npmjs.com/package/json-server

# install dependencies
npm install -g json-server

# 模拟数据放在 db.json 中

# 运行并监听4020端口
json-server --watch db.json --port 4020

#访问方式
> * http://localhost:4020/posts
> * http://localhost:4020/posts?id=1
```

# vue修改微信中的title
https://www.npmjs.com/package/vue-wechat-title

# 页面路径
> * /collection   收藏
> * /discovery    发现
> * /earning	  赚赚
> * /mine         我的