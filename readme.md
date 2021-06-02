# 接口简介

>**1.用户注册接口:**

* **请求方式:POST**

* **需要携带的数据:用户名,密码**

* **携带数据的方式:Body:json**

* **示例: **

```js
{{baseURL}}/users
携带的数据: body:json:{
    "name":"username",
    "password":"****"    
}
```

>**2.用户登录接口:**

* **请求方式:POST**

* **需要携带的数据:用户名,密码**

* **携带数据的方式:Body:json**

* **示例:**

```js
{{baseURL}}/login
携带的数据: body:json:{
    "name":"username",
    "password":"****"    
}
```

>**3.验证Token接口:**

* **请求方式:POST**

* **需要携带的数据:Token**

* **携带数据的方式Authorization:Type=Bearer**

* **示例:**

```js
{{baseURL}}/login/verify
携带的数据: Authorization:Type=Bearer,Token=Token
```

>**4.用户发表动态接口:**

* **请求方式:POST**

* **需要携带的数据:动态内容content**

* **携带数据的方式:Body:json**

* **示例:**

```js
{{baseURL}}/moment
携带的数据: body:json:{
   "content":"" 
}
```

>**5.获取单个动态的接口:**

* **请求方式:GET**

* **需要携带的数据:momentId**

* **携带数据的方式:params**

* **示例:**

```js
{{baseURL}}/moment/1
```

>**6.获取动态列表:**

* **请求方式:GET**

* **需要携带的数据:offset&size**

* **携带数据的方式:query**

* **示例:**

```js
{{baseURL}}/moment?offset=0&size=10
```

>**7.修改动态接口:**

* **请求方式:PATCH**

* **需要携带的数据:momentId+content**

* **携带数据的方式:params+body:json**

* **示例:**

```js
{{baseURL}}/moment/1
携带的数据: body:json:{
   "content":"" 
}
```

>**8.删除动态接口:**

* **请求方式:DELETE**

* **需要携带的数据:momentId**

* **携带数据的方式:params**

* **示例:**

```js
{{baseURL}}/moment/1
```

>**9.回复动态接口:**

* **请求方式:POST**

* **需要携带的数据:momentId+content**

* **携带数据的方式:body:json**

* **示例:**

```js
{{baseURL}}/comment
携带的数据: body:json:{
   "content":"",
   "momentId":1    
}
```

>**10.回复评论接口:**

* **请求方式:POST**

* **需要携带的数据:momentId+commentId+content**

* **携带数据的方式:params+body:json**

* **示例:**

```js
{{baseURL}}/comment/10/reply
携带的数据: body:json:{
   "content":"",
   "momentId":1    
}
```

>**11.修改评论接口:**

* **请求方式:PATCH**

* **需要携带的数据:commentId+content**

* **携带数据的方式:params+body:json**

* **示例:**

```js
{{baseURL}}/comment/10
携带的数据: body:json:{
   "content":"",
}
```

>**12.删除评论接口:**

* **请求方式:DELETE**

* **需要携带的数据:commentId**

* **携带数据的方式:params**

* **示例:**

```js
{{baseURL}}/comment/1
```

>**13.获取评论列表接口:**

* **请求方式:GET**

* **需要携带的数据:momentId**

* **携带数据的方式:query**

* **示例:**

```js
{{baseURL}}/comment?momentId=1
```

>**14.创建标签接口:**

* **请求方式:POST**

* **需要携带的数据:labelName**

* **携带数据的方式:body:json**

* **示例:**

```js
{{baseURL}}/labels
携带的数据: body:json:{
   "labelName":"",
}
```

>**15.动态添加(多个)标签接口:**

* **请求方式:POST**

* **需要携带的数据:momentId+labels**

* **携带数据的方式:body:json+params**

* **示例:**

```js
{{baseURL}}/moment/1/labels
携带的数据: body:json:{
   "labels":[],
}
```

>**16.获取标签列表接口:**

* **请求方式:GET**

* **需要携带的数据:offset+size**

* **携带数据的方式:query**

* **示例:**

```js
{{baseURL}}/labels?offset=0&size=10
```

>**17.用户上传头像接口:**

* **请求方式:POST**

* **需要携带的数据:图片**

* **携带数据的方式:form-data:{keyType:file,value:图片}**

* **示例:**

```js
{{baseURL}}/upload/avatar
form-data{
    key:'avatar',
    value:图片    
}
```

>**18.展示用户头像接口:**

* **请求方式:GET**

* **需要携带的数据:用户id**

* **携带数据的方式:params**

* **示例:**

```js
{{baseURL}}/users/1/avatar
// 为了符合restful风格的接口设计原则,把用户头像展示定义在users接口下
```

>**19.上传用户动态配图接口**

* **请求方式:POST**

* **需要携带的数据:图片+动态id**

* **携带数据的方式:query+fromdata:{keyType:file,value:图片}**

* **示例:**

```js
{{baseURL}}/upload/picture?momentId=1
form-data{
    key:'picture',// 文件类型
    value:''    
}
```

>**20.展示用户配图接口**

* **请求方式:GET**

* **需要携带的数据:filename**

* **携带数据的方式:params+query**

* **示例:**

```js
{{baseURL}}/moment/pictures/1622567094435.jpg?type=small // 通过query参数可以设置请求的配图的规格

// 这里表示的是展示一个动态对应的其中一个配图
```













