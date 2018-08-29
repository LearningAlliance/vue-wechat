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

### 其他
> * ui样式参照ui图
> * 部分组件使用 Mint UI

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

# 接口请求地址配置路径
``` bash
# src/config/index.js
baseUrlDev: 'http://localhost:4020/', // 测试路径
baseUrlPro: 'http://localhost:4020/', // 正式路径
```

# 发布在ngnix
``` bash
# 待发布文件会生成在 dist文件夹下
npm run build
# 可以使用根目录下的 ngnix-1.15.1下的 nginx.exe
# 启动服务，进入到nginx.exe 的目录
# 相关命令
## 启动
start nginx.exe
## 停止
nginx.exe -s stop
## 修改配置后重启, 需要启动服务后才能reload
nginx.exe -s reload
```

# 配置文件参考
``` bash
# nginx-1.15.1/conf/nginx.conf
# http节点下
sendfile        off; // 默认为on  改为 off, 可清除缓存
# server节点下
listen       7090;					// 监听端口
server_name  localhost				// ip
location / {
    root   D:\D\vue-wechat\dist;	// 发布目录，请自行修改
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;  // vue-router用于 mode：'history'的配置
}
```

# 发布到其他服务器可参考
[guide](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

# vue修改微信中的title
[guide](https://www.npmjs.com/package/vue-wechat-title)

# 页面路径
> * /   模拟登录页面
> * /collection   收藏
> * /discovery    发现
> * /earning	  赚赚
> * /mine         我的