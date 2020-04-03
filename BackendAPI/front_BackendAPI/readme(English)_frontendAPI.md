# EPCC7 Job API Interface Document

## API V1 interface description
-Front end interface base address: `http://localhost:3000/api/frontend/v1/`

-Front end server has turned on CORS cross-domain support

 

-Use HTTP Status Code to identify status

-Uniform data return format using JSON

### Supported Request Methods

-GET (SELECT): Get the resource (one or more) from the server.

-POST (CREATE): Create a new resource on the server.

-PUT (UPDATE): Update the resource on the server (the client provides the complete resource after the change).

-PATCH (UPDATE): Update the resource on the server (the client provides changed attributes).

-DELETE (DELETE): delete resources from the server.

-HEAD: Get the metadata of the resource.

-OPTIONS: Get information about which attributes of the resource can be changed by the client.

### General return status description

|* Status Code *| * Meaning * |           * Description * |
| -------- | --------------------------- | ----------------------------------------------------- |
| 200 |    OK | Request Successful |
|201 |    CREATED | Created Successfully |
|204 |    DELETED | Delete successfully |
|400 |    BAD REQUEST | The requested address does not exist or contains an unsupported parameter |
| 401 |    UNAUTHORIZED | Unauthorized |
| 403 |    FORBIDDEN | Forbidden |
| 404 |    NOT FOUND | The requested resource does not exist |
|422 |    Unprocesable entity | [POST / PUT / PATCH] When creating an object, a validation error occurred |
|500    | INTERNAL SERVER ERROR | Internal error |
|          |                       |                                                     |

---

## log in

### Login authentication interface

* Request path: login
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | -------- | -------- |
username | username | cannot be empty |
password | password | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| -------- | ----------- | --------------- |
| user_id | User ID | |
| username | User Role ID | |
| username | username | |
| mobile | mobile number | |
| email | email | |
token | token | jwt-based token |

* Response data

```javascript
{
    "data": {
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
    },
    "meta": {
        "msg": "login successful",
        "status": 200
    }
}
 ```
## Community Management

### Community list

* Request path: communities
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | ------------------------------------------ |
| pagenum | current page | cannot be empty
| pagesize | per page | cannot be empty

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
| C_id | Community ID | |
| C_name | Community Name | |
G_id | Game ID | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | Introduction | |
 


* Response data
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




### Community posts list

* Request path: communities/:id/posts
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | ------------------------------------------ |
| id | community id | cannot be empty`carry in url`|
 | query | post theme keyword | can be empty|
 | pagenum | current page | cannot be empty|
| pagesize | per page | cannot be empty|

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
| p_id | post ID | |
| p_theme | post theme | |
post_belong | belonging Community ID | |
| p_createtime | Founded time | |
p_updatetime | Update time | |
p_introduction | Introduction | |
 


* Response data
```javascript
{
    "data": {
        "total": 4,
        "pagenum": 1,
        "communityposts": [
            {
                "p_id": 2,
                "p_theme": "What a great game!",
                "p_createtime": "2020-03-27T20:20:22.000Z",
                "p_updatetime": "2020-03-27T20:29:27.000Z",
                "post_belong": 4,
                "p_introduction": "sfegrhtgfnbgvd"
            },
            {
                "p_id": 5,
                "p_theme": "fsbdgbgasd",
                "p_createtime": "2020-03-27T18:20:00.000Z",
                "p_updatetime": "2020-03-27T18:20:00.000Z",
                "post_belong": 4,
                "p_introduction": "asxdcvfgbhnmjhngbfd"
            }
        ]
    },
    "meta": {
        "msg": "Get community post list successfully",
        "status": 200
    }
}
```



### Add community

* Request path: communities
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| --------- | --------- | -------- |
| C_name | Community Name | Cannot be empty |
|G_id | Game ID | Cannot be empty |
|Found_time | Create time | Can't be empty |
|Update_time | Update time | Can't be empty |
|Description | Introduction | Can be empty |

* Response data
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
### Query community details by id

* Request path: communities/:id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
|: id | Category ID | Cannot be empty `carry in url` |

* Response data

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
### Edit Submit Community Information

* Request path: communities/:id
* Request method: put
* Request parameters


Parameter name | Parameter description | Remarks |
| --------- | --------- | -------- |
|id | Community ID | Cannot be empty `carry in url` |
| C_name | Community Name | Cannot be empty |
|G_id | Game ID | Cannot be empty |
|Update_time | Update time | Can't be empty |
|Description | Introduction | Can be empty |


* Response data

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
### Delete community

* Request path: communities/:id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
|: id | Community ID | Cannot be empty `carry in url` |

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```


# club Management

### club list

* Request path: clubs
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | ---------------------------------------- |
|pagenum | current page number | cannot be empty |
|pagesize | number of pages | cannot be empty |
 

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
| C_id | club ID | |
| C_name | club name | |
|G_id | Game ID | |
| Found_time | Founded time | |
|Update_time | Update time | |
|Description | Introduction | |
 

* Response data
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




### Club posts list

* Request path: clubs/:id/posts
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | ------------------------------------------ |
| id | clubs id | cannot be empty`carry in url`|
 | query | post theme keyword | can be empty|
 | pagenum | current page | cannot be empty|
| pagesize | per page | cannot be empty|

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
| p_id | post ID | |
| p_theme | post theme | |
post_belong | belonging clubs ID | |
| p_createtime | Founded time | |
p_updatetime | Update time | |
p_introduction | Introduction | |
 


* Response data
```javascript
{
    "data": {
        "total": 2,
        "pagenum": 1,
        "clubposts": [
            {
                "p_id": 1,
                "p_theme": "Through the Ages: A New Story of Civilization new version comes out",
                "p_createtime": "2020-03-27T18:20:00.000Z",
                "p_updatetime": "2020-03-27T00:00:00.000Z",
                "post_belong": 2,
                "p_introduction": "adfvgbhnmgj,mgn"
            },
            {
                "p_id": 3,
                "p_theme": "dgbdsascvs",
                "p_createtime": "2020-03-27T18:20:00.000Z",
                "p_updatetime": "2020-03-27T18:20:00.000Z",
                "post_belong": 2,
                "p_introduction": "fghgbvdcsasdfg"
            }
        ]
    },
    "meta": {
        "msg": "Get club post list successfully",
        "status": 200
    }
}
```

### Add club

* Request path: clubs
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| --------- | --------- | -------- |
|C_name | club name | cannot be empty |
| Founder_id | Founder ID | Cannot be empty |
|Found_time | Create time | Can't be empty |
|Update_time | Update time | Can't be empty |
|Description | Introduction | Can be empty |

* Response data

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
### Query clubs details by id

* Request path: clubs/:id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
: id | clubs ID | cannot be empty `carry in url` |

* Response data

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
### Edit submit clubs information

* Request path: clubs/:id
* Request method: put
* Request parameters


Parameter name | Parameter description | Remarks |
| --------- | --------- | -------- |
|: id | Community ID | Cannot be empty `carry in url` |
| C_name | Community Name | Cannot be empty |
| Founder_id | Founder ID | Cannot be empty |
|Update_time | Update time | Can't be empty |
|Description | Introduction | Can be empty |
* Response data

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
### remove clubs

* Request path: clubs/:id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
|: id | Community ID | Cannot be empty `carry in url` |

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```


## Game Type Management

### parameter list

* Request path: GameTypes/:id/types
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | ----------- | ------------------------------------------------------- |
|: id | Category ID | Cannot be empty `carry in url` |
 

* Response parameters

Parameter name | Parameter description | Remarks |
| ---------- | --------------------------------------------- | ---- |
| T_id | Category ID | |
| T_name | Category Name | |
| T_discription | Category Introduction | | 

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
### Add new game category information

* Request path: GameTypes/types
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| --------- | -------------------------------------- | --------------------- |
| T_name | Category Name | Cannot be empty |
| T_discription | Category Introduction | Can be empty |

* Response data

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
### Delete parameter

* Request path: GameTypes/:id/types
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | --------------------- |
|: id | GameTypes ID | Cannot be empty `carry in url` |


* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed",
        "status": 200
    }
}
```

 ## Game Management

### Game list data

* Request path: games
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | ------------ | -------- |
|query | query parameter--game name keyword | can be empty |
|pagenum | current page number | cannot be empty |
|pagesize | number of pages per page | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------------ | ------------ | ------------------------------------- |
| total | Total games | |
|pagenum | Pages | |
|G_id | Game ID | |
| T_id | Game Category ID | |
| M_id | Vendor ID | |
G_name | Game Name | |
| G_price | Price | |
| G_discription | Introduction | |
| G_rating | Rating | Can't be empty |
| Num_of_player | Number of participants | Cannot be empty |
|playing_time | Approximate game play time | |
|age_limit | minimum age limit | |
| official_web | Official URL | |

* Response Data

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

### Add game

* Request path: games
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| --------------- | -------------------------- | -------|
T_id | Game Category ID | Cannot be empty |
| M_id | Vendor ID | Cannot be empty |
|G_name | Game Name | Cannot be empty |
| G_price | Price | Cannot be empty |
|G_discription | Introduction | Can be empty |
| G_rating | Rating | Can't be empty |
| Num_of_player | Number of participants | Cannot be empty |
|playing_time | game play time | cannot be empty |
|age_limit | minimum age limit | cannot be empty |
|official_web | official URL | cannot be empty |

* Response data

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
 
### Querying games by ID

* Request path: games/:id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | product ID | cannot be empty `carry in url` |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------------ | -------------------------- | ----------------------------------------- |
| total | total number of products | |
|pagenum | current product pages | |
|G_id | Game ID | |
| T_id | Game Category ID | |
| M_id | Vendor ID | |
|G_name | Game Name | |
| G_price | Price | |
| G_discription | Introduction | |
| G_rating | Rating | |
| Num_of_player | Number of participants | |
|playing_time | Approximate game play time | |
|age_limit | minimum age limit | |
| official_web | Official URL | |
* Response data

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
### Edit Submit Game

* Request path: games/:id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| --------------- | -------------------------- | ----------------- |
|T_id | Game Category ID | Cannot be empty |
| M_id | Vendor ID | Cannot be empty |
|G_name | Game Name | Cannot be empty |
| G_price | Price | Cannot be empty |
|G_discription | Introduction | Can be empty |
| G_rating | Rating | Can't be empty |
|Num_of_player | Number of participants | Product status 0: Failed 1: Under review 2: Reviewed |
|playing_time | game play time | cannot be empty |
|age_limit | minimum age limit | cannot be empty |
|official_web | official URL | cannot be empty |
* Response data

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
### Delete game

* Request path: games/:id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | game ID | cannot be empty `carry in url` |

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delte succeed",
        "status": 200
    }
}
```
### Sync games pictures

* Request path: games/:id/pics
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | ------------ | -------------------------------------------------------- |
| id | games ID | cannot be empty `carry in url` |
| pics | games picture collection | If there is a pics_id field, the picture will be retained, if there is no pics_id but there is a pic field, new picture data will be generated |

* Request data
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
 ### Game image processing must have GraphicsMagick installed
* linux

```
apt-get install GraphicsMagick
```

* Mac OS X

```
brew install GraphicsMagick
```

* Windows
  [click to download](https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick-binaries/1.3.27/GraphicsMagick-1.3.27-Q8-win64-dll.exe/download)



## upload picture

* Request path: upload
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | ---- |
file | upload file | |

* Response data
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
## Post Management

### Post data list

* Request path: posts
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
query | query parameters--post subject keywords | can be empty |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |
 
* Response data

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
| total | Eligible Records | |
query | query parameters--post subject keywords |
pagenum | current page number | |
pagesize | Number of Pages | |
| p_id | Post ID | |
| p_theme | Post Subject | |
| p_createtime | creation time | |
| p_updatetime | Update time | |
| p_owner | Post Creation User ID | |
post_belong | The specific club / community ID to which the post belongs | |
pt_id | Post Category `[1: Community Post, 2: Club Post, 3: Image Posts]` | |
| p_status | Post Status | |
| p_introduction | Post Introduction | |
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

### Create posts

* Request path: posts
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| ------------ | ------------ | -------------------------------------- |
| p_theme | Post Subject | Can't be empty |
| p_createtime | creation time | cannot be empty |
| p_updatetime | update time | cannot be empty |
| p_owner | post creation user ID | cannot be empty |
|post_belong | specific club / community ID to which the post belongs | can be empty |
|pt_id | post category `[1: community post, 2: club post, 3: Image posts]` | cannot be empty |
| p_status | Post Status | Can't be empty |
| p_introduction | Post introduction | Can be empty |

* Request data description

   * All request data is updated incrementally. If the parameter is not filled, this field will not be updated

* Response data

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

### Modify posts status

* Request path: posts /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------------ | ------------ | --------------------------------- |
| id | posts ID | cannot be empty `carry in url` |
| p_theme | Post Subject | Can't be empty |
| p_updatetime | update time | cannot be empty |
| p_owner | post creation user ID | cannot be empty |
|post_belong | specific club / community ID to which the post belongs | can be empty |
|pt_id | post category `[1: community post, 2: club post, 3: Image posts]` | cannot be empty |
| p_status | Post Status | Can't be empty |
| p_introduction | Post introduction | Can be empty |

* Request data description

   * All request data is updated incrementally. If the parameter is not filled, this field will not be updated

* Response data

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
### View post details

* Request path: posts /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | post ID | cannot be empty `carry in url` |

* Response data

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

### Delete post

* Request path: posts /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | post ID | cannot be empty `carry in url` |

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```



## market Management

### market data list

* Request path: markets
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |
| Selldetail_id | ID of the market record | can be empty |
|G_id | ID of the selling game | can be empty |
| U_id | Seller user ID | Can be empty |
| website_url | Selling website | Can be empty |
price | Price for the product | can be empty |
| game_condition | product condition | can be empty |
location | product location | can be empty |
| sending_areas | allowing sending areas | can be empty |
| description | product discription | can be empty |

* Response data

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
| total | Eligible Records | |
pagenum | current page number | |
pagesize | Number of Pages | |
| Selldetail_id | market ID | |
| G_id | ID of the selling game | |
| U_id | Seller user ID | Can be empty |
| website_url | Selling website | |
| price | Price for the product | |
| game_condition | product condition | |
location | product location | |
| sending_areas | allowing sending areas | |
| description | product discription | |


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

### create market
* Request path: markets
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
| G_id | ID of the selling game | cannot be empty |
| U_id | Seller user ID | Can be empty |
| website_url | Selling website | cannot be empty |
price | Price for the product | cannot be empty |
| game_condition | product condition | cannot be empty |
location | product location | cannot be empty |
sending_areas | allowing sending areas | cannot be empty |
| description | product discription | can be empty |

* Response data

Parameter name | Parameter description | Remarks |
| -------------------- | --------------- | -------- |
| total | Eligible Records | |
pagenum | current page number | |
pagesize | Number of Pages | |
| Selldetail_id | market ID | |
| G_id | ID of the selling game | |
| U_id | Seller user ID | Can be empty |
| website_url | Selling website | |
| price | Price for the product | |
| game_condition | product condition | |
location | product location | |
| sending_areas | allowing sending areas | |
| description | product discription | |

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


### Modify market

* Request path: markets /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------------ | ------------ | --------------------------------------- |
| G_id | ID of the selling game | can be empty |
| U_id | Seller user ID | Can be empty |
| website_url | Selling website | Can be empty |
price | Price for the product | can be empty |
| game_condition | product condition | can be empty |
location | product location | can be empty |
| sending_areas | allowing sending areas | can be empty |
| description | product discription | can be empty |
 

* Request data description

  * All request data is updated incrementally. If the parameter is not filled, this field will not be updated

* Response data
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
### View market details

* Request path: markets /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | market ID | cannot be empty `carry in url` |

* Response data

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

### delete market

* Request path: markets /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
| id | market ID | cannot be empty `carry in url` |

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "Delete succeed!",
        "status": 200
    }
}
```




## manufacturer management

### manufacturers data list

* Request path: manufacturer facts
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | ------------ | -------- |
query | query parameters--manufacturers name keywords | can be empty |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
pagenum | current page number | |
users | manufacturers name keyword data collection | |

* Response data

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
### Add manufacturers

* Request path: manufacturer facts
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | -------- | -------- |
| M_name | manufacturer name | cannot be empty |
password | manufacturer password | cannot be empty |
| M_address | manufacturer address | cannot be empty |
| M_contact | manufacturer phone number | cannot be empty |
| M_discription | manufacturer introduction | can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| -------- | ----------- | ---- |
| M_id | manufacturer name ID | |
| M_name | manufacturer name | |
| M_address | manufacturer address | |
| M_contact | manufacturer mobile number | |
| M_discription | manufacturer introduction | |

* Response data

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

 
### Query manufacturers user information by ID

* Request path: manufacturers /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
id | user ID | cannot be empty `carry in url` |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| M_id | manufacturer name ID | |
| M_name | manufacturer name | |
| M_address | manufacturer address | |
| M_contact | manufacturer mobile number | |
| M_discription | manufacturer introduction | |

* Response data

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
### Edit manufacturers commit

* Request path: manufacutuers /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------------- |
| M_name | manufacturer name | cannot be empty |
| M_address | manufacturer address | cannot be empty |
| M_contact | manufacturer phone number | cannot be empty |
| M_discription | manufacturer introduction | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| M_name | manufacturer name | |
| M_address | manufacturer address | |
| M_contact | manufacturer mobile number | |
| M_discription | manufacturer introduction | |

* Response data

```javascript
/ * 200 means success, 500 means failure * /
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
### Delete individual manufacturing workers

* Request path: manufacturers /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | -------------------------- |
id | manufacturers id | cannot be empty` parameter is url parameter: id` |

* Response parameters

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```

## Front-end user management

### List of foreground user data

* Request path: frontendUsers
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | ------------ | -------- |
query | Query parameter--Foreground user name keyword | Can be empty |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| totalpage | total records | |
pagenum | current page number | |
users | user data collection | |

* Response data

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
### Add user

* Request path: frontendUsers
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | -------- | -------- |
username | username | cannot be empty |
password | user password | cannot be empty |
user_sex | user gender | cannot be empty
birthday | user birthday | can be empty |
U_livingplace | User's current place of residence | Cannot be empty |
register_time | user registration time | cannot be empty |
update_time | user's last login time | cannot be empty |
| image_url | User avatar | can be empty |
| user_email | Email | cannot be empty |
| user_tel | Mobile number | Can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| -------- | ----------- | ---- |
| username | username | |
user_sex | User Gender | |
| birthday | user birthday | |
U_livingplace | User's current place of residence | |
register_time | User registration time | |
update_time | User last login time | |
| image_url | User avatar | |
| user_email | Email | |
| user_tel | Mobile number | |
* Response data

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
 
### Query user information by ID

* Request path: frontendUsers /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
id | user ID | cannot be empty `carry in url` |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| username | username | |
user_sex | User Gender | |
| birthday | user birthday | |
U_livingplace | User's current place of residence | |
register_time | User registration time | |
update_time | User last login time | |
| image_url | User avatar | |
| user_email | Email | |
| user_tel | Mobile number | |
* Response data

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
### Edit user submission

* Request path: frontendUsers /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------------- |
username | username | cannot be empty |
user_sex | user gender | cannot be empty
birthday | user birthday | can be empty |
U_livingplace | User's current place of residence | Cannot be empty |
update_time | user's last login time | cannot be empty |
| image_url | User avatar | can be empty |
| user_email | Email | cannot be empty |
| user_tel | Mobile number | Can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| username | username | |
user_sex | User Gender | |
| birthday | user birthday | |
U_livingplace | User's current place of residence | |
register_time | User registration time | |
update_time | User last login time | |
| image_url | User avatar | |
| user_email | Email | |
| user_tel | Mobile number | |

* Response data

```javascript
/ * 200 means success, 500 means failure * /
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
### Delete a single user

* Request path: frontendUsers /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | -------------------------- |
| id | user id | cannot be empty` parameter is url parameter: id` |

* Response parameters

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```




## clubs Management

### clubs Data list

* Request path: clubs
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | ------------ | -------- |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
pagenum | current page number | |
clubs | clubs name keyword data collection | |

* Response data
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
### Add clubs

* Request path: clubs
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | -------- | -------- |
C_name | club name | cannot be empty |
| Founder_id | Create User ID | Cannot be empty |
Found_time | Create time | Can't be empty |
Update_time | Update time | Can't be empty |
Description | club introduction | can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| -------- | ----------- | ---- |
| C_name | club name | |
| Founder_id | Create User ID | |
| Isdel | Delete | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | club introduction | |

* Response data

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

 ### Query clubs information by ID

* Request path: clubs /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
id | club ID | cannot be empty `carry in url` |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| C_name | club name | |
| Founder_id | Create User ID | |
| Isdel | Delete | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | club introduction | |

* Response data

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
### Edit clubs submission

* Request path: clubs /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------------- |
C_name | club name | cannot be empty |
| Founder_id | Create User ID | Cannot be empty |
Update_time | Update time | Can't be empty |
Description | club introduction | can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
| C_name | club name | |
| Founder_id | Create User ID | |
| Isdel | Delete | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | club introduction | |

* Response data

```javascript
/ * 200 means success, 500 means failure * /
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
### Remove individual clubs

* Request path: clubs /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | -------------------------- |
id | clubs id | cannot be empty` parameter is url parameter: id` |

* Response parameters

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```



## communities management

### communities data list

* Request path: communities
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | ------------ | -------- |
pagenum | current page number | cannot be empty |
pagesize | number of pages per page | cannot be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| --------- | ------------ | ---- |
| total | Total records | |
pagenum | current page number | |
communities | community name keyword data collection | |

* Response data

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
### Add communities

* Request path: communities
* Request method: post
* Request parameters

Parameter name | Parameter description | Remarks |
| -------- | -------- | -------- |
C_name | community name | cannot be empty |
G_id | Game ID | Cannot be empty |
Found_time | Create time | Can't be empty |
Update_time | Update time | Can't be empty |
Description | community introduction | can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| -------- | ----------- | ---- |
C_name | community name | |
G_id | Game ID | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | community introduction | |

* Response data

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

 
### Querying Communities by ID

* Request path: communities /: id
* Request method: get
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------- |
id | community ID | cannot be empty `carry in url` |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
C_name | community name | |
G_id | Game ID | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | community introduction | |

* Response data
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
### Editing Communities

* Request path: communities /: id
* Request method: put
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | --------------------------- |
C_name | community name | cannot be empty |
G_id | Game ID | Cannot be empty |
Update_time | Update time | Can't be empty |
Description | community introduction | can be empty |

* Response parameters

Parameter name | Parameter description | Remarks |
| ------- | -------- | ---- |
C_name | community name | |
G_id | Game ID | |
| Found_time | Founded time | |
Update_time | Update time | |
Description | community introduction | |

* Response data

```javascript
/ * 200 means success, 500 means failure * /
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
### Delete a single community

* Request path: communities /: id
* Request method: delete
* Request parameters

Parameter name | Parameter description | Remarks |
| ------ | -------- | -------------------------- |
| id | communities id | cannot be empty` parameter is url parameter: id` |

* Response parameters

* Response data

```javascript
{
    "data": null,
    "meta": {
        "msg": "successfully deleted",
        "status": 200
    }
}
```


## Statistics

### Based on type statistics (pie chart)

* Request path: reports /: type
* Request method: get
* Response data

### Based on time statistics (line chart)

* Request path: reports /: type
* Request method: get
* Response data

### Based on sales statistics (histogram)

* Request path: reports /: type
* Request method: get
* Response data