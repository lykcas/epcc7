#### Project overall file description
-`config` configuration file directory
   -`default.json` default configuration file (which contains database configuration, jwt configuration)
-`dao` data access layer, which stores additions, deletions, changes, and queries to the database
   -Public access methods provided by `DAO.js`
-`models` stores specific database ORM model files
-`modules` current project modules
   -`authorization.js` API permission verification module
   -`database.js` database module (database loading is based on nodejs-orm2 library loading)
   -`passport.js` login framework based on passport module
   -`resextra.js` API uniform return result interface
-`node_modules` third-party modules that the project depends on
-`routes` unified routing
   -`api` provides api interface
   -`mapp` provides mobile APP interface
   -`mweb` provides mobile web sites
-`services` service layer. Business logic code is written in this layer. Data obtained through different interfaces is converted into data required by a unified front end.
-`app.js` main project entry file
-`package.json` project configuration file









#### 项目整体文件说明
- `config` 配置文件目录
  - `default.json` 默认配置文件（其中包含数据库配置，jwt配置）
- `dao` 数据访问层，存放对数据库的增删改查操作
  - `DAO.js` 提供的公共访问数据库的方法
- `models` 存放具体数据库 ORM 模型文件
- `modules` 当前项目模块
  - `authorization.js` API权限验证模块
  - `database.js` 数据库模块（数据库加载基于 nodejs-orm2 库加载）
  - `passport.js` 基于 passport 模块的登录搭建
  - `resextra.js` API 统一返回结果接口
- `node_modules` 项目依赖的第三方模块
- `routes` 统一路由
  - `api` 提供 api 接口
  - `mapp` 提供移动APP界面
  - `mweb` 提供移动web站点
- `services` 服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据
- `app.js` 主项目入口文件
- `package.json` 项目配置文件