### 安装：
`npm install`
### 环境部署
修改hosts `127.0.0.1   framework.bnq.com.cn`
- 本地开发环境： npm start <br>
- 线上开发环境： npm run dev <br>
- 线上测试环境： npm run test <br>
- 线上生产环境： npm run prod 

### 目录结构

`-build` ## webpack及devserver配置 <br>
`-config`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-index.js` ## 服务端各环境接口配置<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-config.js` ## 项目配置目录<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- routeType` ## 路由模式，默认browser => BrowserRouter，另外支持static => StaticRouter  memory => MemoryRouter '' => HashRouter <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- menuPosition` ## 菜单显示的位置，默认 'left'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- openPaths` ## 路由拦截时的白名单，[]，参数为Router中的地址<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- hasPermission` ## 是否启动路由拦截，默认不启动<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- hasLogin` ## 是否加载登录页，默认加载<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- projectName` ## 项目名称<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- menus` ## 菜单配置<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`- hasBreadcrum` ## 是否加载面包屑导航，默认不加载<br>
`-public` ## 打包之后生成的文件<br>
`-src` ## 代码目录<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-app` ## 业务代码目录<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Home` ## 布局模块组件<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Welcome` ## 欢迎页<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-components` ## 业务层公共组件目录（项目之间公共组件请通过组件库bnq-sys-react-component维护）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-SiderMenu` ## 菜单组件<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-models`<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-common.js` ## 公共models<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-index.js` ## 业务models统一出口<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-router`<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Router.jsx` ## 生成路由组件<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-RouterConfig.js` ## 路由配置（新增加页面时在这里添加配置）<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-service`<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-CommonService.js` ## 接口调用公共文件(业务层Service统一继承此类)<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-store` ## redux store组件，通过rematch包装<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-util` <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Deviec.js` ## 设备信息方法类<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-index.js` ## 工具类统一出口<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Remote.js` ## 远程访问类<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Tool.js` ## 工具类<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`-Treelterator.js` ## 数结构操作类<br>
&nbsp;&nbsp;&nbsp;&nbsp;`-index.js` ## 入口文件<br>
`-static` ## 静态文件目录<br>
`-.babelrc` ## babel配置文件<br>
`-.eslintignore`  ## eslint过滤配置文件<br>
`-.eslintrc`  ## eslint配置文件<br>
`-.gitignore`  ## git过滤配置文件<br>
`-index.template.html`  ## index模板入口<br>
`-package.json`<br>
### 主要特点
- 基于rematch管理redux,使用示例在/src/app/Rematch
    - 业务层model在业务文件夹中进行维护，统一出口在/src/models/index.js
    - store中默认附带loading插件，通过rematch中异步方法的名称自动注入loading状态
    - 附带logger插件
- 基于axios进行网络请求，核心类在/src/util/Remote中
- 引入eslint
- 使用exports-loader进行按需加载
