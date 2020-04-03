# EPCC7 作业 API 接口文档

## API V1 接口说明
- 后台接口基准地址：`http://localhost:8888/api/private/v1/`
- 后端服务端已开启 CORS 跨域支持
- 后端API V1 认证统一使用 Token 认证
- 后台需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 通用返回状态说明

| *状态码* |         *含义*        |                        *说明*                       |
|----------|-----------------------|-----------------------------------------------------|
|      200 | OK                    | 请求成功                                            |
|      201 | CREATED               | 创建成功                                            |
|      204 | DELETED               | 删除成功                                            |
|      400 | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
|      401 | UNAUTHORIZED          | 未授权                                              |
|      403 | FORBIDDEN             | 被禁止访问                                          |
|      404 | NOT FOUND             | 请求的资源不存在                                    |
|      422 | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
|      500 | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

---

## 登录

### 登录验证接口

* 请求路径：login
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

* 响应参数

| 参数名   | 参数说明    | 备注            |
| -------- | ----------- | --------------- |
| id       | 用户 ID     |                 |
| rid      | 用户角色 ID |                 |
| username | 用户名      |                 |
| mobile   | 手机号      |                 |
| email    | 邮箱        |                 |
| token    | 令牌        | 基于 jwt 的令牌 |

* 响应数据

```javascript
{
    "data": {
        "id": 500,
        "rid": 0,
        "username": "admin",
        "mobile": "12345678",
        "email": "adsfad@qq.com",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODUxNzU4MDksImV4cCI6MTU4NTI2MjIwOX0.IJxXXdL6fcBlWPuw4bU8FuUBmO8h4Ttz7-s3YNE2H6Q"
    },
    "meta": {
        "msg": "login successful",
        "status": 200
    }
}
```

## 管理员用户管理

### 管理员用户数据列表

* 请求路径：users
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数--管理员名称     | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| totalpage | 总记录数     |      |
| pagenum   | 当前页码     |      |
| users     | 用户数据集合 |      |

* 响应数据

```javascript
{
    "data": {
        "total": 2,
        "pagenum": 1,
        "users": [
            {
                "id": 500,
                "role_name": "Super admin",
                "username": "admin",
                "create_time": 1486720211,
                "mobile": "12345678",
                "email": "adsfad@qq.com",
                "mg_state": true
            }
        ]
    },
    "meta": {
        "msg": "Successfully getting the administrator list",
        "status": 200
    }
}
```

### 添加用户

* 请求路径：users
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名称 | 不能为空 |
| password | 用户密码 | 不能为空 |
| email    | 邮箱     | 可以为空 |
| mobile   | 手机号   | 可以为空 |

* 响应参数

| 参数名   | 参数说明    | 备注 |
| -------- | ----------- | ---- |
| id       | 用户 ID     |      |
| rid      | 用户角色 ID |      |
| username | 用户名      |      |
| mobile   | 手机号      |      |
| email    | 邮箱        |      |

* 响应数据

```javascript
{
    "data": {
        "id": 511,
        "username": "admin1234",
        "mobile": "07807986793",
        "email": "S1925433@ed.ac.uk",
        "role_id": 1,
        "create_time": 1585180702
    },
    "meta": {
        "msg": "Create succeed",
        "status": 201
    }
}
```

### 修改用户状态

* 请求路径：users/:id/state/:state
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                                        |
| ------ | -------- | ------------------------------------------- |
| id    | 用户 ID  | 不能为空`携带在url中`                       |
| state   | 用户状态 | 不能为空`携带在url中`，值为 true 或者 false |

* 响应数据

```javascript
{
    "data": {
        "id": 511,
        "rid": 1,
        "username": "admin1234",
        "mobile": "07807986793",
        "email": "S1925433@ed.ac.uk",
        "mg_state": 1
    },
    "meta": {
        "msg": "Set status successfully",
        "status": 200
    }
}
```

### 根据 ID 查询用户信息

* 请求路径：users/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| rid | 角色 ID  |      |
| username | 用户名称  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

* 响应数据

```javascript
{
    "data": {
        "id": 500,
        "rid": 0,
        "username": "admin",
        "mobile": "12345678",
        "email": "adsfad@qq.com"
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```

### 编辑用户提交

* 请求路径：users/:id
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| id     | 用户 id  | 不能为空 `参数是url参数:id` |
| email  | 邮箱     | 可以为空                    |
| mobile | 手机号   | 可以为空                    |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| role_id | 角色 ID  |      |
| username | 用户名称  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
{
    "data": {
        "id": 511,
        "username": "admin1234",
        "role_id": 1,
        "mobile": "07801314798",
        "email": "S1925445@ed.ac.uk"
    },
    "meta": {
        "msg": "update completed",
        "status": 200
    }
}
```

### 删除单个用户

* 请求路径：users/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```

### 分配用户角色

* 请求路径：users/:id/role
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 ID  | 不能为空`参数是url参数:id` |
| rid    | 角色 id  | 不能为空`参数body参数`     |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| username | 用户名称  |      |
| rid | 角色 ID  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

* 响应数据

```javascript
{
    "data": {
        "id": 510,
        "rid": "2",
        "username": "admin123",
        "mobile": "07807986793",
        "email": "S1925433@ed.ac.uk"
    },
    "meta": {
        "msg": "Set up role successfully",
        "status": 200
    }
}
```

## 权限管理

### 所有权限列表

* 请求路径：rights/:type
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                                                                         |
| ------ | -------- | ---------------------------------------------------------------------------- |
| type   | 类型     | 值: list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type` |

* 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| id       | 权限 ID      |      |
| authName | 权限说明     |      |
| level    | 权限层级     |      |
| pid      | 权限父 ID    |      |
| path     | 对应访问路径 |      |

* 响应数据
  type=list

```javascript
  {
    "data": [
        {
            "id": 101,
            "authName": "商品管理",
            "level": "0",
            "pid": 0,
            "path": null
        },
        {
            "id": 102,
            "authName": "订单管理",
            "level": "0",
            "pid": 0,
            "path": null
        }
    ],
    "meta": {
        "msg": "获取权限列表成功",
        "status": 200
    }
}
```

type=tree

```javascript
;[
  {
    data: [
      {
        id: 101,
        authName: '商品管理',
        path: null,
        pid: 0,
        children: [
          {
            id: 104,
            authName: '商品列表',
            path: null,
            pid: 101,
            children: [
              {
                id: 105,
                authName: '添加商品',
                path: null,
                pid: '104,101'
              }
            ]
          }
        ]
      }
    ],
    meta: {
      msg: '获取权限列表成功',
      status: 200
    }
  }
]
```

### 左侧菜单权限

* 请求路径：menus
* 请求方法：get
* 响应数据

```javascript
{
    "data":
        {
            "id": 101,
            "authName": "商品管理",
            "path": null,
            "children": [
                {
                    "id": 104,
                    "authName": "商品列表",
                    "path": null,
                    "children": []
                }
            ]
        }
    "meta": {
        "msg": "获取菜单列表成功",
        "status": 200
    }
}
```

## 角色管理

### 角色列表

* 请求路径：roles
* 请求方法：get
* 响应数据说明
  * 第一层为角色信息
  * 第二层开始为权限说明，权限一共有 3 层权限
* 响应数据

```javascript
{
    "data": [
        {
            "id": 30,
            "roleName": "主管",
            "roleDesc": "技术负责人",
            "children": [
                {
                    "id": 101,
                    "authName": "商品管理",
                    "path": null,
                    "children": [
                        {
                            "id": 104,
                            "authName": "商品列表",
                            "path": null,
                            "children": [
                                {
                                    "id": 105,
                                    "authName": "添加商品",
                                    "path": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 添加角色

* 请求路径：roles
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| roleName | 角色名称 | 不能为空 |
| roleDesc | 角色描述 | 可以为空 |

* 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| roleId   | 角色 ID  |      |
| roleName | 角色名称 |      |
| roleDesc | 角色描述 |      |

* 响应数据

```javascript
{
    "data": {
        "roleId": 40,
        "roleName": "admin2",
        "roleDesc": "admin2Desc"
    },
    "meta": {
        "msg": "创建成功",
        "status": 201
    }
}
```

### 根据 ID 查询角色

* 请求路径：roles/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 角色 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| roleId   | 角色 ID  |      |
| roleName | 角色名称 |      |
| roleDesc | 角色描述 |      |

* 响应数据

```javascript
{
    "data": {
        "roleId": 31,
        "roleName": "测试角色",
        "roleDesc": "测试负责人"
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 编辑提交角色

* 请求路径：roles/:id
* 请求方法：put
* 请求参数

| 参数名   | 参数说明 | 备注                  |
| -------- | -------- | --------------------- |
| :id      | 角色 ID  | 不能为空`携带在url中` |
| roleName | 角色名称 | 不能为空              |
| roleDesc | 角色描述 | 可以为空              |

* 响应数据

```javascript
{
    "data": {
        "roleId": 31,
        "roleName": "测试角色",
        "roleDesc": "测试角色描述"
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 删除角色

* 请求路径：roles/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 角色 ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

### 角色授权

* 请求路径：roles/:roleId/rights
* 请求方法：post
* 请求参数

| 参数名  | 参数说明     | 备注                      |
| ------- | ------------ | ------------------------- |
| :roleId | 角色 ID      | 不能为空`携带在url中`     |
| rids    | 权限 ID 列表 | 以 `,` 分割的权限 ID 列表 |

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 删除角色指定权限

* 请求路径：roles/:roleId/rights/:rightId
* 请求方法：delete
* 请求参数

| 参数名   | 参数说明 | 备注                  |
| -------- | -------- | --------------------- |
| :roleId  | 角色 ID  | 不能为空`携带在url中` |
| :rightId | 权限 ID  | 不能为空`携带在url中` |

* 响应数据说明
  * 返回当前所有拥有的角色信息
* 响应数据

```javascript
{
    "data": [
        {
            "id": 101,
            "authName": "商品管理",
            "path": null,
            "children": [
                {
                    "id": 104,
                    "authName": "商品列表",
                    "path": null,
                    "children": [
                        {
                            "id": 105,
                            "authName": "添加商品",
                            "path": null
                        },
                        {
                            "id": 116,
                            "authName": "修改",
                            "path": null
                        }
                    ]
                }
            ]
        }
    ],
    "meta": {
        "msg": "取消权限成功",
        "status": 200
    }
}
```

## 社区管理

### 社区列表

* 请求路径：communities
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                                         |
| ------ | -------- | -------------------------------------------- |
| pagenum  | 当前页数    |不能为空
| pagesize  | 每页个数   |不能为空

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| total    | 总记录数     |      |
| C_id    | 社区 ID      |      |
| C_name  | 社区名称     |      |
| G_id   | 所属游戏ID   |      |
| Found_time | 创建时间 |      |
| Update_time | 更新时间 |      |
| Description | 介绍说明 |      |
 


* 响应数据

```javascript
{
    "data": {
        "total": 10,
        "pagenum": "1",
        "communities": [
            {
                "C_id": 1,
                "C_name": "aaaaaaaa",
                "G_id": "1",
                "Found_time": "2020-03-23T18:20:22.000Z",
                "Update_time": "2020-03-23T18:23:27.000Z",
                "Description": "agsfagvg"
            }
        ]
    },
    "meta": {
        "msg": "Succeed!",
        "status": 200
    }
}
```

### 添加社区

* 请求路径：communities
* 请求方法：post
* 请求参数

| 参数名    | 参数说明  | 备注     |
| --------- | --------- | -------- |
| C_name   | 社区 名称 | 不能为空 |
| G_id  | 所属游戏ID  | 不能为空 |
| Found_time | 创建时间  | 不能为空 |
| Update_time | 更新时间  | 不能为空 |
| Description | 介绍  | 可以为空 |

* 响应数据

```javascript
{
    "data": {
        "C_id": 11,
        "C_name": "Dreamers (2020)",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-25",
        "Update_time": "2020-03-27",
        "Description": null
    },
    "meta": {
        "msg": "Create succeed",
        "status": 201
    }
}
```

### 根据 id 查询社区详细信息

* 请求路径：communities/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 分类 ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": {
        "C_id": 11,
        "C_name": "Dreamers (2020)",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-25T00:00:00.000Z",
        "Update_time": "2020-03-27T00:00:00.000Z",
        "Description": null
    },
    "meta": {
        "msg": "Obtain Succeed!",
        "status": 200
    }
}
```

### 编辑提交社区信息

* 请求路径：communities/:id
* 请求方法：put
* 请求参数

 
| 参数名    | 参数说明  | 备注     |
| --------- | --------- | -------- |
| :id      | 社区 ID  | 不能为空`携带在url中` |
| C_name   | 社区 名称 | 不能为空 |
| G_id  | 所属游戏ID  | 不能为空 |
| Update_time | 更新时间  | 不能为空 |
| Description | 介绍  | 可以为空 |
* 响应数据

```javascript
{
    "data": {
        "C_id": 6,
        "C_name": "Transformers(2020)",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-23T18:20:22.000Z",
        "Update_time": "2020-03-27",
        "Description": null,
        " Description": "Transformers new version comes out"
    },
    "meta": {
        "msg": "Update Succeed!",
        "status": 200
    }
}
```

### 删除社区

* 请求路径：communities/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 社区 ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```



# club管理

### club列表

* 请求路径：clubs
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                                         |
| ------ | -------- | -------------------------------------------- |
| query |  club名称关键字  |  不能为空|
| pagenum |  当前页数  |  不能为空|
| pagesize |  每页个数  | 不能为空|
pagesize

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| total    | 总记录数     |      |
| C_id    | club ID      |      |
| C_name  | club名称     |      |
| G_id   | 所属游戏ID   |      |
| Found_time | 创建时间 |      |
| Update_time | 更新时间 |      |
| Description | 介绍说明 |      |
 


* 响应数据

```javascript
{
    "data": {
        "total": 2,
        "pagenum": "1",
        "clubs": [
            {
                "C_id": 1,
                "C_name": "Welcome to gamer club Edinburgh!",
                "Founder_id": 1,
                "Found_time": "2020-03-22T00:00:00.000Z",
                "Update_time": "2020-03-26T00:00:00.000Z",
                "Description": "Welcome"
            }
        ]
    },
    "meta": {
        "msg": "Obtain succeed!",
        "status": 200
    }
}
```


### 添加club

* 请求路径：clubs
* 请求方法：post
* 请求参数

| 参数名    | 参数说明  | 备注     |
| --------- | --------- | -------- |
| C_name   | club 名称 | 不能为空 |
| Founder_id  | 创建者ID  | 不能为空 |
| Found_time | 创建时间  | 不能为空 |
| Update_time | 更新时间  | 不能为空 |
| Description | 介绍  | 可以为空 |

* 响应数据

```javascript
{
    "data": {
        "C_id": 4,
        "C_name": "Transformers group edinburgh",
        "Founder_id": "3",
        "Isdel": "0",
        "Found_time": "2020-03-24",
        "Update_time": "2020-03-27",
        "Description": null
    },
    "meta": {
        "msg": "Succeed creating",
        "status": 201
    }
}
```

### 根据 id 查询clubs详细信息

* 请求路径：clubs/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | clubs ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": {
        "C_id": 4,
        "C_name": "Transformers group edinburgh",
        "Founder_id": 3,
        "Isdel": "0",
        "Found_time": "2020-03-24T00:00:00.000Z",
        "Update_time": "2020-03-27T00:00:00.000Z",
        "Description": null
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```

### 编辑提交clubs信息

* 请求路径：clubs/:id
* 请求方法：put
* 请求参数

 
| 参数名    | 参数说明  | 备注     |
| --------- | --------- | -------- |
| :id      | 社区 ID  | 不能为空`携带在url中` |
| C_name   | 社区 名称 | 不能为空 |
| Founder_id  | 创建者ID  | 不能为空 |
| Update_time | 更新时间  | 不能为空 |
| Description | 介绍  | 可以为空 |
* 响应数据

```javascript
{
    "data": {
        "C_id": 4,
        "C_name": "Transformers group edinburgh",
        "Founder_id": "2",
        "Isdel": "0",
        "Found_time": "2020-03-24T00:00:00.000Z",
        "Update_time": "2020-03-28",
        "Description": null,
        " Description": "Transformers new version comes out"
    },
    "meta": {
        "msg": "update completed",
        "status": 200
    }
}
```

### 删除clubs

* 请求路径：clubs/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 社区 ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```




## Game Type管理
### Game Type 列表

* 请求路径：GameTypes
* 请求方法：get
* 请求参数

| 参数名 | 参数说明    | 备注                                                      |
| ------ | ----------- | --------------------------------------------------------- |
| query    | 游戏类别关键字    | 可以为空                             |
| pagenum    | 当前页码    | 不能为空                             |
| pagesize    | 每页记录数    | 不能为空                             |
 

* 响应参数

| 参数名     | 参数说明                                       | 备注 |
| ---------- | ---------------------------------------------- | ---- |
| T_id    | 分类  ID                                    |      |
| T_name  | 分类 名称                                   |      |
| T_discription     |分类介绍                             |      |
 

* 响应数据

```javascript
{
    "data": [
        {
            "T_id": 1,
            "T_name": "qwqw",
            "T_discription": "qwqwqw"
        }
    ],
    "meta": {
        "msg": "obtain succeed!",
        "status": 200
    }
}
```


### 参数列表

* 请求路径：GameTypes/:id/types
* 请求方法：get
* 请求参数

| 参数名 | 参数说明    | 备注                                                      |
| ------ | ----------- | --------------------------------------------------------- |
| :id    | 分类 ID     | 不能为空`携带在url中`                                     |
 

* 响应参数

| 参数名     | 参数说明                                       | 备注 |
| ---------- | ---------------------------------------------- | ---- |
| T_id    | 分类  ID                                    |      |
| T_name  | 分类 名称                                   |      |
| T_discription     |分类介绍                             |      |
 

* 响应数据

```javascript
{
    "data": [
        {
            "T_id": 1,
            "T_name": "qwqw",
            "T_discription": "qwqwqw"
        }
    ],
    "meta": {
        "msg": "obtain succeed!",
        "status": 200
    }
}
```

### 添加新的游戏类别信息

* 请求路径： GameTypes/types
* 请求方法：post
* 请求参数

| 参数名    | 参数说明                                   | 备注                  |
| --------- | ------------------------------------------ | --------------------- |
| T_name | 分类 名称                                     | 不能为空              |
| T_discription  |分类 介绍                          | 可以为空             |

* 响应数据

```javascript
{
    "data": {
        "T_id": 1,
        "T_name": "Entertainment game",
        "T_discription": "Entertainment"
    },
    "meta": {
        "msg": "Update succeed!",
        "status": 200
    }
}
```

### 删除参数

* 请求路径：GameTypes/:id/types 
* 请求方法：delete
* 请求参数

| 参数名  | 参数说明 | 备注                  |
| ------- | -------- | --------------------- |
| :id     | GameTypes ID  | 不能为空`携带在url中` |


* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed",
        "status": 200
    }
}
```

 
## 游戏管理

### 游戏列表数据

* 请求路径：games
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数--游戏名称关键字     | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名       | 参数说明     | 备注                                   |
| ------------ | ------------ | -------------------------------------- |
| total        | 总共游戏条数 |                                        |
| pagenum      | 当前游戏页数 |                                        |
| G_id     | 游戏 ID      |                                        |
| T_id     | 游戏类别 ID      |                                        |
| M_id     | 厂商 ID      |                                        |
| G_name   | 游戏名称     |                                        |
| G_price  | 价格         |                                        |
| G_discription | 介绍         |                                        |
| G_rating | 评分         | 不能为空                               |
| Num_of_player  | 参与人数     |不能为空|
| playing_time     | 游戏大约娱乐时间     |                                        |
| age_limit     | 最小年龄限制     |                                        |
| official_web   | 官方URL   |                                        |
 

* 响应数据

```javascript
{
    "data": {
        "total": 5,
        "pagenum": "1",
        "games": [
            {
                "G_id": 1,
                "T_id": 1,
                "M_id": 1,
                "G_name": "aaaa",
                "G_price": 233,
                "G_discription": null,
                "G_rating": "2.5",
                "Num_of_player": 14,
                "playing_time": 12,
                "age_limit": 11,
                "official_web": "gefagagaga.com"
            }
        ]
    },
    "meta": {
        "msg": "obtain succeed",
        "status": 200
    }
}
```

 
### 添加游戏

* 请求路径：games
* 请求方法：post
* 请求参数

| 参数名          | 参数说明                   | 备注     |
| --------------- | -------------------------- | -------- |
| T_id     | 游戏类别 ID      |       不能为空                      |
| M_id     | 厂商 ID      |           不能为空                      |
| G_name   | 游戏名称     |           不能为空                  |
| G_price  | 价格         |           不能为空                  |
| G_discription | 介绍         |         可以为空                               |
| G_rating | 评分         | 不能为空                               |
| Num_of_player  | 参与人数     | 不能为空  |
| playing_time     | 游戏大约娱乐时间     |    不能为空                                    |
| age_limit     | 最小年龄限制     |        不能为空                                |
| official_web   | 官方URL   |         不能为空                               |

* 响应数据

```javascript
{
    "data": {
        "G_id": 7,
        "T_id": 1,
        "M_id": 2,
        "is_del": "0",
        "G_name": "Gloomhaven ",
        "G_price": 178,
        "G_discription": null,
        "G_rating": "4.82",
        "Num_of_player": 10,
        "playing_time": 10,
        "age_limit": 13,
        "official_web": null,
        "G_pic": "",
        "pics": []
    },
    "meta": {
        "msg": "Create game info succeed!",
        "status": 201
    }
}
```
 

### 根据 ID 查询 games

* 请求路径：games/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 商品 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名       | 参数说明                   | 备注                                                                                                                  |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| total        | 总共商品条数               |                                                                                                                       |
| pagenum      | 当前商品页数               |                                                                                                                       |
| G_id     | 游戏 ID      |                                        |
| T_id     | 游戏类别 ID      |                          |
| M_id     | 厂商 ID      |                               |
| G_name   | 游戏名称     |                            |
| G_price  | 价格         |                            |
| G_discription | 介绍         |                                     |
| G_rating | 评分         |                             |
| Num_of_player  | 参与人数     |   |
| playing_time     | 游戏大约娱乐时间     |                    |
| age_limit     | 最小年龄限制     |                    |
| official_web   | 官方URL   |                          |
* 响应数据

```javascript
 {
    "data": {
        "G_id": 7,
        "T_id": 1,
        "M_id": 2,
        "is_del": "0",
        "G_name": "Gloomhaven ",
        "G_price": 178,
        "G_discription": null,
        "G_rating": "4.82",
        "Num_of_player": 10,
        "playing_time": 10,
        "age_limit": 13,
        "official_web": null,
        "G_pic": "",
        "pics": []
    },
    "meta": {
        "msg": "Obtain succeed!",
        "status": 200
    }
}
```

### 编辑提交游戏

* 请求路径：games/:id
* 请求方法：put
* 请求参数

| 参数名          | 参数说明                   | 备注                  |
| --------------- | -------------------------- | --------------------- |
| T_id     | 游戏类别 ID      |       不能为空                      |
| M_id     | 厂商 ID      |           不能为空                      |
| G_name   | 游戏名称     |           不能为空                  |
| G_price  | 价格         |           不能为空                  |
| G_discription | 介绍         |         可以为空                               |
| G_rating | 评分         | 不能为空                               |
| Num_of_player  | 参与人数     | 商品状态 0: 未通过 1: 审核中 2: 已审核 |
| playing_time     | 游戏大约娱乐时间     |    不能为空                                    |
| age_limit     | 最小年龄限制     |        不能为空                                |
| official_web   | 官方URL   |         不能为空                               |
* 响应数据

```javascript
{
    "data": {
        "G_id": 3,
        "T_id": "1",
        "M_id": "1",
        "is_del": "0",
        "G_name": "Terraforming Mars",
        "G_price": "178",
        "G_discription": "The game uses six types determine the winning corporation!",
        "G_rating": "4.82",
        "Num_of_player": "10",
        "playing_time": "10",
        "age_limit": "13",
        "official_web": "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
        "G_pic": "",
        "pics": []
    },
    "meta": {
        "msg": "Update game succeed!",
        "status": 200
    }
}
```
  
### 删除游戏

* 请求路径：games/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | game ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delte succeed",
        "status": 200
    }
}
```

###同步games图片

* 请求路径：games/:id/pics
* 请求方法：put
* 请求参数

| 参数名 | 参数说明     | 备注                                                                                |
| ------ | ------------ | ----------------------------------------------------------------------------------- |
| id     | games ID      | 不能为空`携带在url中`                                                               |
| pics   | games图片集合 | 如果有 pics_id 字段会保留该图片，如果没有 pics_id 但是有 pic 字段就会新生成图片数据 |

* 请求数据

```javascript
;[
  { pic: 'tmp_uploads/db28f6316835836e97653b5c75e418be.png' },
  {
    pics_id: 397,
    goods_id: 145,
    pics_big: 'uploads/goodspics/big_30f08d52c551ecb447277eae232304b8',
    pics_mid: 'uploads/goodspics/mid_30f08d52c551ecb447277eae232304b8',
    pics_sma: 'uploads/goodspics/sma_30f08d52c551ecb447277eae232304b8'
  }
]
```
 
###游戏图片处理必须安装 GraphicsMagick

* linux

```
apt-get install GraphicsMagick
```

* Mac OS X

```
brew install GraphicsMagick
```

* Windows
  [点击下载](https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick-binaries/1.3.27/GraphicsMagick-1.3.27-Q8-win64-dll.exe/download)

## 图片上传

* 请求路径：upload
* 请求方法：post
* 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| file   | 上传文件 |      |

* 响应数据

```javascript
{
    "data": {
        "tmp_path": "tmp_uploads/ccfc5179a914e94506bcbb7377e8985f.png",
        "url": "http://127.0.0.1:8888tmp_uploads/ccfc5179a914e94506bcbb7377e8985f.png"
    },
    "meta": {
        "msg": "Upload succeed",
        "status": 200
    }
}
```

## 帖子管理

### 帖子数据列表

* 请求路径：posts
* 请求方法：get
* 请求参数

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
| query                | 查询参数--帖子主题关键字        | 可以为空 |
| pagenum              | 当前页码        | 不能为空 |
| pagesize             | 每页显示条数    | 不能为空 |
 
* 响应数据

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
| total                | 符合条件的记录总数  |   |
| query                | 查询参数--帖子主题关键字    |   |
| pagenum              | 当前页码   |   |
| pagesize             | 每页显示条数  |   |
| p_id              | 帖子ID      |   |
| p_theme           | 帖子主题        |   |
| p_createtime   | 创建时间 |   |
| p_updatetime | 更新时间        |   |
| p_owner | 帖子创建用户ID        |   |
| post_belong       | 帖子所属具体的club/community的ID        |   |
| pt_id       | 帖子类别 `[1:社区帖子,2: club post,3:Image posts] ` |   |
| p_status       | 帖子状态        |   |
| p_introduction       | 帖子介绍        |   |
```javascript
{
    "data": {
        "total": 7,
        "pagenum": "3",
        "posts": [
            {
                "p_id": 4,
                "p_owner": 2,
                "p_theme": "wfgebrfgsfad",
                "p_createtime": "18:20:00",
                "p_updatetime": "18:20:00",
                "post_belong": 3,
                "pt_id": 2,
                "p_status": "1",
                "P_introduction": "gfvdscvfgbhn"
            }
        ]
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```


### 创建posts

* 请求路径：posts
* 请求方法：post
* 请求参数

| 参数名       | 参数说明     | 备注                                       |
| ------------ | ------------ | ------------------------------------------ |
| p_theme           | 帖子主题        | 不能为空 |
| p_createtime | 创建时间        | 不能为空 |
| p_updatetime | 更新时间        | 不能为空 |
| p_owner | 帖子创建用户ID        | 不能为空 |
| post_belong       | 帖子所属具体的club/community的ID        | 可以为空 |
| pt_id       | 帖子类别 `[1:社区帖子,2: club post,3:Image posts] `  | 不能为空 |
| p_status       | 帖子状态        | 不能为空 |
| p_introduction       | 帖子介绍        | 可以为空 |

* 请求数据说明

  * 所有请求数据都是增量更新，如果参数不填写，就不会更新该字段

* 响应数据

```javascript
{
    "data": {
        "p_id": 1,
        "p_owner": "2",
        "p_theme": "Through the Ages: A New Story of Civilization new version comes out",
        "p_createtime": "2020-03-27T18:20:00.000Z",
        "p_updatetime": "2020-03-27",
        "post_belong": "2",
        "pt_id": "2",
        "p_status": "1",
        "P_introduction": "adfvgbhnmgj,mgn",
        "p_introduction": "Through the Ages: A New Story of Civilization new version comes out",
        "reply": []
    },
    "meta": {
        "msg": "Create post successfully",
        "status": 201
    }
}
```


### 修改posts状态

* 请求路径：posts/:id
* 请求方法：put
* 请求参数

| 参数名       | 参数说明     | 备注                                       |
| ------------ | ------------ | ------------------------------------------ |
| id     | posts ID  | 不能为空`携带在url中` |
| p_theme           | 帖子主题        | 不能为空 |
| p_updatetime | 更新时间        | 不能为空 |
| p_owner | 帖子创建用户ID        | 不能为空 |
| post_belong       | 帖子所属具体的club/community的ID        | 可以为空 |
| pt_id       | 帖子类别 `[1:社区帖子,2: club post,3:Image posts] `  | 不能为空 |
| p_status       | 帖子状态        | 不能为空 |
| p_introduction       | 帖子介绍        | 可以为空 |

* 请求数据说明

  * 所有请求数据都是增量更新，如果参数不填写，就不会更新该字段

* 响应数据

```javascript
{
    "data": {
        "p_id": 1,
        "p_owner": "2",
        "p_theme": "Through the Ages: A New Story of Civilization new version comes out",
        "p_createtime": "2020-03-27T18:20:00.000Z",
        "p_updatetime": "2020-03-27",
        "post_belong": "2",
        "pt_id": "2",
        "p_status": "1",
        "P_introduction": "adfvgbhnmgj,mgn",
        "p_introduction": "Through the Ages: A New Story of Civilization new version comes out",
        "reply": []
    },
    "meta": {
        "msg": "Update post successfully",
        "status": 201
    }
}
```

### 查看帖子详情

* 请求路径：posts/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | post ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": {
        "p_id": 1,
        "p_owner": 2,
        "p_theme": "Through the Ages: A New Story of Civilization new version comes out",
        "p_createtime": "2020-03-27T18:20:00.000Z",
        "p_updatetime": "2020-03-27T00:00:00.000Z",
        "post_belong": 2,
        "pt_id": 2,
        "p_status": "1",
        "P_introduction": "adfvgbhnmgj,mgn",
        "reply": []
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```


### 刪除帖子

* 请求路径：posts/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | post ID  | 不能为空`携带在url中` |

* 响应数据


```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```





## market 管理

### market数据列表

* 请求路径：markets
* 请求方法：get
* 请求参数  

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
| pagenum              | 当前页码        | 不能为空 |
| pagesize             | 每页显示条数    | 不能为空 |
 | Selldetail_id           | ID of the market record       | 可以为空 |
 | G_id           | ID of the selling game        | 可以为空 |
| U_id   | Seller user ID | 可以为空 |
| website_url | Selling website        | 可以为空 |
| price | Price for the product        | 可以为空 |
| game_condition       | product condition      | 可以为空 |
| location       | product location  | 可以为空 |
| sending_areas       | allowing sending areas        | 可以为空 |
| description       | product discription        | 可以为空 |
 
* 响应数据

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
| total                | 符合条件的记录总数      |   |
| pagenum              | 当前页码        |   |
| pagesize             | 每页显示条数    |   |
| Selldetail_id              | market ID      |    |
| G_id           | ID of the selling game        |   |
| U_id   | Seller user ID | 可以为空 |
| website_url | Selling website        |     |
| price | Price for the product        |   |
| game_condition       | product condition      |   |
| location       | product location  |   |
| sending_areas       | allowing sending areas        |   |
| description       | product discription        |   |


```javascript
{
    "data": {
        "total": 7,
        "pagenum": "3",
        "posts": [
            {
                "p_id": 4,
                "p_owner": 2,
                "p_theme": "wfgebrfgsfad",
                "p_createtime": "18:20:00",
                "p_updatetime": "18:20:00",
                "post_belong": 3,
                "pt_id": 2,
                "p_status": "1",
                "P_introduction": "gfvdscvfgbhn"
            }
        ]
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```

### 创建market 
* 请求路径：markets
* 请求方法：post
* 请求参数  

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
 | G_id           | ID of the selling game        | 不能为空 |
| U_id   | Seller user ID | 可以为空 |
| website_url | Selling website        | 不能为空 |
| price | Price for the product        | 不能为空 |
| game_condition       | product condition      | 不能为空 |
| location       | product location  | 不能为空 |
| sending_areas       | allowing sending areas        | 不能为空 |
| description       | product discription        | 可以为空 |
 
* 响应数据

| 参数名               | 参数说明        | 备注     |
| -------------------- | --------------- | -------- |
| total                | 符合条件的记录总数      |   |
| pagenum              | 当前页码        |   |
| pagesize             | 每页显示条数    |   |
| Selldetail_id              | market ID      |    |
| G_id           | ID of the selling game        |   |
| U_id   | Seller user ID | 可以为空 |
| website_url | Selling website        |     |
| price | Price for the product        |   |
| game_condition       | product condition      |   |
| location       | product location  |   |
| sending_areas       | allowing sending areas        |   |
| description       | product discription        |   |


```javascript
{
    "data": {
        "Selldetail_id": 3,
        "G_id": "3",
        "U_id": "3",
        "price": "175",
        "game_condition": "Brand new",
        "location": "UK",
        "sending_areas": "Europe",
        "website_url": "https://boardgamegeek.com/boardgamepublisher/538/z-man-games-inc",
        "description": ""
    },
    "meta": {
        "msg": "Create new Market successfully",
        "status": 201
    }
}
```



### 修改market

* 请求路径：markets/:id
* 请求方法：put
* 请求参数

| 参数名       | 参数说明     | 备注                                       |
| ------------ | ------------ | ------------------------------------------ |
 | G_id           | ID of the selling game        | 可以为空 |
| U_id   | Seller user ID | 可以为空 |
| website_url | Selling website        | 可以为空 |
| price | Price for the product        | 可以为空 |
| game_condition       | product condition      | 可以为空 |
| location       | product location  | 可以为空 |
| sending_areas       | allowing sending areas        | 可以为空 |
| description       | product discription        | 可以为空 |
 

* 请求数据说明

  * 所有请求数据都是增量更新，如果参数不填写，就不会更新该字段

* 响应数据

```javascript
{
    "data": {
        "p_id": 1,
        "p_owner": "2",
        "p_theme": "Through the Ages: A New Story of Civilization new version comes out",
        "p_createtime": "2020-03-27T18:20:00.000Z",
        "p_updatetime": "2020-03-27",
        "post_belong": "2",
        "pt_id": "2",
        "p_status": "1",
        "P_introduction": "adfvgbhnmgj,mgn",
        "p_introduction": "Through the Ages: A New Story of Civilization new version comes out",
        "reply": []
    },
    "meta": {
        "msg": "Update post successfully",
        "status": 201
    }
}
```

### 查看market详情

* 请求路径：markets/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | market ID  | 不能为空`携带在url中` |

* 响应数据

```javascript
{
    "data": {
        "Selldetail_id": 3,
        "G_id": 3,
        "U_id": 3,
        "price": 175,
        "game_condition": "Brand new",
        "location": "UK",
        "sending_areas": "Europe",
        "website_url": "https://boardgamegeek.com/boardgamepublisher/538/z-man-games-inc",
        "description": ""
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
```


### 刪除market

* 请求路径：markets/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | market ID  | 不能为空`携带在url中` |

* 响应数据


```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```





## manufacturer 管理

### manufacturers数据列表

* 请求路径：manufacturers
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数--manufacturers名称关键字  | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| total     | 总记录数     |      |
| pagenum   | 当前页码     |      |
| users     | manufacturers名称关键字数据集合 |      |

* 响应数据

```javascript
 {
    "data": {
        "total": 1,
        "pagenum": 1,
        "manufacturers": [
            {
                "M_id": 1,
                "M_name": "Z-Man Games, Inc.",
                "M_address": "EH8 9DB Edinburgh, Scotland, UK",
                "M_contact": "07801359878",
                "M_discription": "At Z-Man Games, we create innovative games that become modern essentials."
            }
        ]
    },
    "meta": {
        "msg": "Get manufacturer list successfully",
        "status": 200
    }
}
```

### 添加manufacturers

* 请求路径：manufacturers  
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| M_name | manufacturer名称 | 不能为空 |
| password |manufacturer密码 | 不能为空 |
| M_address    | manufacturer 地址     | 不能为空 |
| M_contact   | manufacturer手机号   | 不能为空 |
| M_discription   | manufacturer 介绍   | 可以为空 |

* 响应参数

| 参数名   | 参数说明    | 备注 |
| -------- | ----------- | ---- |
| M_id       | manufacturer名称 ID     |      |
| M_name | manufacturer名称 |   |
| M_address    | manufacturer 地址     |   |
| M_contact   | manufacturer手机号   |   |
| M_discription   | manufacturer 介绍   |   |

* 响应数据

```javascript
{
    "data": {
        "total": 1,
        "pagenum": 1,
        "manufacturers": [
            {
                "M_id": 1,
                "M_name": "Z-Man Games, Inc.",
                "M_address": "EH8 9DB Edinburgh, Scotland, UK",
                "M_contact": "07801359836",
                "M_discription": "At Z-Man Games, we create innovative games that become modern essentials."
            }
        ]
    },
    "meta": {
        "msg": "Get manufacturer list successfully",
        "status": 200
    }
}
```

 

### 根据 ID 查询用户信息

* 请求路径：manufacturers/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| M_id       | manufacturer名称 ID     |      |
| M_name | manufacturer名称 |   |
| M_address    | manufacturer 地址     |   |
| M_contact   | manufacturer手机号   |   |
| M_discription   | manufacturer 介绍   |   |

* 响应数据

```javascript
 {
    "data": {
        "M_id": 1,
        "M_name": "Z-Man Games, Inc.",
        "M_address": "EH8 9DB Edinburgh, Scotland, UK",
        "M_contact": "07801359836",
        "M_discription": "At Z-Man Games, we create innovative games that become modern essentials."
    },
    "meta": {
        "msg": "Obtain Succeed!",
        "status": 200
    }
}
 
```

### 编辑manufacturers提交

* 请求路径：manufacutuers/:id
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| M_name | manufacturer名称 | 不能为空 |
| M_address    | manufacturer 地址     | 不能为空 |
| M_contact   | manufacturer手机号   | 不能为空 |
| M_discription   | manufacturer 介绍   | 不能为空 |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| M_name | manufacturer名称 |   |
| M_address    | manufacturer 地址     |   |
| M_contact   | manufacturer手机号   |   |
| M_discription   | manufacturer 介绍   |   |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
 {
    "data": {
        "M_name": "Z-Man Games, Inc.",
        "M_address": "EH8 9DB Edinburgh, Scotland, UK",
        "M_contact": "07801359878",
        "M_discription": "At Z-Man Games, we create innovative games that become modern essentials."
    },
    "meta": {
        "msg": "Update Succeed",
        "status": 200
    }
}
```

### 删除单个manufacturers

* 请求路径：manufacturers/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | manufacturers id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```


## 前台用户管理

### 前台用户数据列表

* 请求路径：frontendUsers
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数--前台用户名称关键字  | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| totalpage | 总记录数     |      |
| pagenum   | 当前页码     |      |
| users     | 用户数据集合 |      |

* 响应数据

```javascript
{
    "data": {
        "total": 3,
        "pagenum": 3,
        "users": [
            {
                "user_id": 3,
                "username": "StarWarFan",
                "user_sex": "M",
                "user_tel": "07801317839",
                "user_email": "s1925583@ed.ac.uk",
                "is_active": "Y",
                "birthday": "2019-01-01T00:00:00.000Z",
                "U_livingplace": "Scotland",
                "U_hometown": "Scotland",
                "register_time": "2020-03-24T00:00:00.000Z",
                "update_time": "2020-03-24T00:00:00.000Z",
                "image_url": "sdfghj"
            }
        ]
    },
    "meta": {
        "msg": "Get user list successfully",
        "status": 200
    }
}
```

### 添加用户

* 请求路径：frontendUsers
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名称 | 不能为空 |
| password | 用户密码 | 不能为空 |
| user_sex | 用户性别 | 不能为空`['Secret','F','M']三者选一` |
| birthday | 用户生日 | 可以为空 |
| U_livingplace | 用户现居地 | 不能为空 |
| register_time | 用户注册时间 | 不能为空 |
| update_time | 用户最近登录时间 | 不能为空 |
| image_url | 用户头像 | 可以为空 |
| user_email    | 邮箱     | 不能为空 |
| user_tel   | 手机号   | 可以为空 |

* 响应参数

| 参数名   | 参数说明    | 备注 |
| -------- | ----------- | ---- |
| username | 用户名称 |   |
| user_sex | 用户性别 |   |
| birthday | 用户生日 |   |
| U_livingplace | 用户现居地 |   |
| register_time | 用户注册时间 |   |
| update_time | 用户最近登录时间 |   |
| image_url | 用户头像 |   |
| user_email    | 邮箱     |   |
| user_tel   | 手机号   |   |
* 响应数据

```javascript
{
    "data": {
        "user_id": 14,
        "username": "Alicia2020",
        "user_sex": "F",
        "user_tel": "07803147824",
        "user_email": "AliciaGreen@gmail.com",
        "is_active": "Y",
        "birthday": "1998-02-02",
        "U_livingplace": "Scotland",
        "U_hometown": "Scotland",
        "register_time": "2020-03-26",
        "update_time": "2020-03-26",
        "image_url": "wdgthgfjmk.com"
    },
    "meta": {
        "msg": "Create succeed",
        "status": 201
    }
}
```
 

### 根据 ID 查询用户信息

* 请求路径：frontendUsers/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| username | 用户名称 |   |
| user_sex | 用户性别 |   |
| birthday | 用户生日 |   |
| U_livingplace | 用户现居地 |   |
| register_time | 用户注册时间 |   |
| update_time | 用户最近登录时间 |   |
| image_url | 用户头像 |   |
| user_email    | 邮箱     |   |
| user_tel   | 手机号   |   |
* 响应数据

```javascript
{
    "data": {
        "user_id": 14,
        "username": "Alicia2020",
        "user_sex": "F",
        "user_tel": "07803147824",
        "user_email": "AliciaGreen@gmail.com",
        "is_active": "Y",
        "birthday": "1998-02-02T00:00:00.000Z",
        "U_livingplace": "Scotland",
        "U_hometown": "Scotland",
        "register_time": "2020-03-26T00:00:00.000Z",
        "update_time": "2020-03-26T00:00:00.000Z",
        "image_url": "wdgthgfjmk.com"
    },
    "meta": {
        "msg": "Obtain Succeed!",
        "status": 200
    }
}
```

### 编辑用户提交

* 请求路径：frontendUsers/:id
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| username | 用户名称 | 不能为空 |
| user_sex | 用户性别 | 不能为空`['Secret','F','M']三者选一` |
| birthday | 用户生日 | 可以为空 |
| U_livingplace | 用户现居地 | 不能为空 |
| update_time | 用户最近登录时间 | 不能为空 |
| image_url | 用户头像 | 可以为空 |
| user_email    | 邮箱     | 不能为空 |
| user_tel   | 手机号   | 可以为空 |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| username | 用户名称 |   |
| user_sex | 用户性别 |   |
| birthday | 用户生日 |   |
| U_livingplace | 用户现居地 |   |
| register_time | 用户注册时间 |   |
| update_time | 用户最近登录时间 |   |
| image_url | 用户头像 |   |
| user_email    | 邮箱     |   |
| user_tel   | 手机号   |   |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
{
    "data": {
        "username": "Alicia2021",
        "user_sex": "F",
        "user_tel": "07803147878",
        "user_email": "AliciaGreen@gmail.com",
        "is_active": "Y",
        "birthday": "1998-02-02",
        "U_livingplace": "Scotland",
        "U_hometown": "Scotland",
        "update_time": "2020-03-26",
        "image_url": "wdgthgfjmk.com"
    },
    "meta": {
        "msg": "Update Succeed",
        "status": 200
    }
}
```

### 删除单个用户

* 请求路径：frontendUsers/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```







## clubs 管理

### clubs数据列表

* 请求路径：clubs
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| total     | 总记录数     |      |
| pagenum   | 当前页码     |      |
| clubs     | clubs名称关键字数据集合 |      |

* 响应数据

```javascript
{
    "data": {
        "total": 5,
        "pagenum": "2",
        "clubs": [
            {
                "C_id": 3,
                "C_name": "Transformers offline group",
                "Founder_id": 3,
                "Found_time": "2020-03-24T00:00:00.000Z",
                "Update_time": "2020-03-27T00:00:00.000Z",
                "Description": null
            },
            {
                "C_id": 4,
                "C_name": "Transformers group edinburgh",
                "Founder_id": 2,
                "Found_time": "2020-03-24T00:00:00.000Z",
                "Update_time": "2020-03-28T00:00:00.000Z",
                "Description": null
            }
        ]
    },
    "meta": {
        "msg": "Obtain succeed!",
        "status": 200
    }
}
```

### 添加clubs

* 请求路径：clubs   
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| C_name | club名称 | 不能为空 |
| Founder_id |创建用户ID | 不能为空 |
| Found_time    | 创建时间    | 不能为空 |
| Update_time   |  更新时间   | 不能为空 |
| Description   |   club 介绍   | 可以为空 |

* 响应参数

| 参数名   | 参数说明    | 备注 |
| -------- | ----------- | ---- |
| C_name | club名称 |   |
| Founder_id |创建用户ID |   |
| Isdel |是否删除 |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   club 介绍   |   |

* 响应数据

```javascript
{
    "data": {
        "C_id": 5,
        "C_name": "Gloomhaven group edinburgh",
        "Founder_id": "2",
        "Isdel": "0",
        "Found_time": "2020-03-26",
        "Update_time": "2020-03-28",
        "Description": null
    },
    "meta": {
        "msg": "Succeed creating",
        "status": 201
    }
}
```

 

### 根据 ID 查询clubs信息

* 请求路径：clubs/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | club ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| C_name | club名称 |   |
| Founder_id |创建用户ID |   |
| Isdel |是否删除 |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   club 介绍   |   |

* 响应数据

```javascript
{
    "data": {
        "C_id": 4,
        "C_name": "Transformers group edinburgh",
        "Founder_id": 2,
        "Isdel": "0",
        "Found_time": "2020-03-24T00:00:00.000Z",
        "Update_time": "2020-03-28T00:00:00.000Z",
        "Description": null
    },
    "meta": {
        "msg": "Get success",
        "status": 200
    }
}
 
```

### 编辑clubs提交

* 请求路径：clubs/:id
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| C_name | club名称 | 不能为空 |
| Founder_id |创建用户ID | 不能为空 |
| Update_time   |  更新时间   | 不能为空 |
| Description   |   club 介绍   | 可以为空 |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| C_name | club名称 |   |
| Founder_id |创建用户ID |   |
| Isdel |是否删除 |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   club 介绍   |   |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
 {
    "data": {
        "C_id": 4,
        "C_name": "Gloomhaven group UK",
        "Founder_id": "2",
        "Isdel": "0",
        "Found_time": "2020-03-24T00:00:00.000Z",
        "Update_time": "2020-03-28",
        "Description": null,
        " Description": "Gloomhaven new version comes out"
    },
    "meta": {
        "msg": "update completed",
        "status": 200
    }
}
```

### 删除单个clubs

* 请求路径：clubs/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | clubs id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```





## communities 管理

### communities 数据列表

* 请求路径：communities
* 请求方法：get
* 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query |  communities名称关键字  |  不能为空|
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

* 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| total     | 总记录数     |      |
| pagenum   | 当前页码     |      |
| communities     | community名称关键字数据集合 |      |

* 响应数据

```javascript
{
    "data": {
        "total": 11,
        "pagenum": "3",
        "communities": [
            {
                "C_id": 3,
                "C_name": "vsvdsd",
                "G_id": "1",
                "Found_time": "2020-03-23T18:20:22.000Z",
                "Update_time": "2020-03-23T18:23:27.000Z",
                "Description": "sdtfyjhgmnfb"
            }
        ]
    },
    "meta": {
        "msg": "Succeed!",
        "status": 200
    }
}
```

### 添加 communities

* 请求路径：communities    
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| C_name | community名称 | 不能为空 |
| G_id |所属游戏ID | 不能为空 |
| Found_time    | 创建时间    | 不能为空 |
| Update_time   |  更新时间   | 不能为空 |
| Description   |   community 介绍   | 可以为空 |

* 响应参数

| 参数名   | 参数说明    | 备注 |
| -------- | ----------- | ---- |
| C_name | community名称 |   |
| G_id |所属游戏ID |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   community 介绍   |   |

* 响应数据

```javascript
{
    "data": {
        "C_id": 12,
        "C_name": "Gloomhaven group UK",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-26",
        "Update_time": "2020-03-28",
        "Description": null
    },
    "meta": {
        "msg": "Create succeed",
        "status": 201
    }
}
```

 

### 根据 ID 查询communities信息

* 请求路径：communities/:id
* 请求方法：get
* 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | community ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| C_name | community名称 |   |
| G_id |所属游戏ID |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   community 介绍   |   |

* 响应数据

```javascript
{
    "data": {
        "C_id": 12,
        "C_name": "Gloomhaven group UK",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-26T00:00:00.000Z",
        "Update_time": "2020-03-28T00:00:00.000Z",
        "Description": null
    },
    "meta": {
        "msg": "Obtain Succeed!",
        "status": 200
    }
}
 
```

### 编辑communities提交

* 请求路径：communities/:id
* 请求方法：put
* 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| C_name | community名称 | 不能为空 |
| G_id |所属游戏ID | 不能为空 |
| Update_time   |  更新时间   | 不能为空 |
| Description   |   community 介绍   | 可以为空 |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| C_name | community名称 |   |
| G_id |所属游戏ID |   |
| Found_time    | 创建时间    |   |
| Update_time   |  更新时间   |   |
| Description   |   community 介绍   |   |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
{
    "data": {
        "C_id": 12,
        "C_name": "Gloomhaven group Wales",
        "G_id": "3",
        "Commu_del": "0",
        "Found_time": "2020-03-26T00:00:00.000Z",
        "Update_time": "2020-03-28",
        "Description": null,
        " Description": "Gloomhaven group "
    },
    "meta": {
        "msg": "Update Succeed!",
        "status": 200
    }
}
```

### 删除单个community

* 请求路径：communities/:id
* 请求方法：delete
* 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | communities id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```



## 数据统计

### 基于类型统计（饼图）

* 请求路径：reports/:type
* 请求方法：get
* 响应数据

### 基于时间统计（折线图）

* 请求路径：reports/:type
* 请求方法：get
* 响应数据

### 基于销量统计（柱状图）

* 请求路径：reports/:type
* 请求方法：get
* 响应数据
