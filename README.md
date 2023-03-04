# 🚀 毕业实训后端CMS



`develop`

```
npm run develop
```



`start`

```
npm run start
```



`build`

```
npm run build
```



`登录信息`

```
Email:1255163756@qq.com
Password:Leizhiyuan127
```



## 数据结构设计

注：

1、所有表默认添加以下三个字段，不再赘述

- id（主键）
- createdAt（数据创建时间）
- updatedAt（数据更新时间）

2、所有类型依据Strapi类型定义

3、所有relation关系置底

4、get获取relation需要在url上加populate参数，多个relation字段用逗号连接，例如

- ```js
  url: '/retreats/?populate=commodity,city',
  ```

5、调用Strapi提供的api接口时，post参数必须完整，data需要嵌套获取，例如

- ```js
  export const retreatAdd = (params) => {
  	return axios({
  		url: '/retreats',
  		method: 'post',
  		data: {
  			data: {
  				commodity: params.commodity,
  				retreat_date: params.retreat_date,
  				retreat_num: params.retreat_num,
  				reason: params.reason,
  				is_quality: params.is_quality,
  			}
  		}
  	})
  }
  ```

6、权限添加

- 公用数据（例如：轮播图、地区、景点等）都可以find、findone
- 个人收藏记录，个人更新或创建留言等需要登录才可以获取权限



### 用户表

user

| 字段     | 类型         | 说明                        | 约束 |
| -------- | ------------ | --------------------------- | ---- |
| username | short text   | 用户姓名                    |      |
| password | passward     | 用户密码                    |      |
| use_tel  | short text   | 手机                        |      |
| gender   | short text   | 性别                        |      |
| email    | email        | 邮箱                        |      |
| identity | short text   | 身份证                      |      |
| avatar   | single media | 头像                        |      |
| orders   | relation     | User belongs to many orders |      |



### 管理员

charger

| 字段         | 类型       | 说明       | 约束 |
| ------------ | ---------- | ---------- | ---- |
| cha_name     | short text | 管理员名称 |      |
| cha_tel      | short text | 管理员电话 |      |
| cha_password | passward   | 管理员密码 |      |



### 订单

order

| 字段                   | 类型       | 说明                 | 约束 |
| ---------------------- | ---------- | -------------------- | ---- |
| ord_ref                | short text | 订单编号             |      |
| price                  | integer    | 订单价格             |      |
| status                 | short text | 订单状态             |      |
| note                   | short text | 订单备注             |      |
| paid                   | boolean    | 是否支付             |      |
| users_permissions_user | relation   | User has many orders |      |
| line                   | relation   | order has one line   |      |



### 地区

region

| 字段     | 类型       | 说明                          | 约束 |
| -------- | ---------- | ----------------------------- | ---- |
| reg_name | short text | 地区名称                      |      |
| places   | relation   | region belongs to many places |      |
| foods    | relation   | region belongs to many foods  |      |



### 景点

place

| 字段        | 类型       | 说明                   | 约束 |
| ----------- | ---------- | ---------------------- | ---- |
| pla_ref     | short text | 景点编号               |      |
| pla_name    | short text | 景点名称               |      |
| address     | short text | 景点地址               |      |
| pla_cover   | media      | 景点封面               |      |
| description | long text  | 景点描述               |      |
| view        | integer    | 浏览量                 |      |
| duration    | short text | 开放时间               |      |
| price       | integer    | 单日票价               |      |
| region      | relation   | region has many places |      |



### 旅游路线

line

| 字段         | 类型       | 说明                        | 约束 |
| ------------ | ---------- | --------------------------- | ---- |
| lin_ref      | short text | 路线编号                    |      |
| lin_name     | short text | 路线名称                    |      |
| lin_cover    | media      | 封面                        |      |
| feature      | short text | 路线特色                    |      |
| introduction | long text  | 路线简介                    |      |
| view         | integer    | 浏览量                      |      |
| price        | integer    | 价格                        |      |
| start_point  | relation   | 出发地 line has one place   |      |
| pass_point   | relation   | 途径地 line has many places |      |
| end_point    | relation   | 终点地 line has one place   |      |



### 美食分类

cate

| 字段     | 类型       | 说明                       | 约束 |
| -------- | ---------- | -------------------------- | ---- |
| cat_name | short text | 类别名称                   |      |
| foods    |            | cate belongs to many foods |      |



### 美食

food

| 字段         | 类型       | 说明                  | 约束 |
| ------------ | ---------- | --------------------- | ---- |
| foo_ref      | short text | 美食编号              |      |
| foo_name     | short text | 美食名称              |      |
| food_cover   | media      | 美食封面              |      |
| introduction | long text  | 美食简介              |      |
| price        | integer    | 价格                  |      |
| region       | relation   | region has many foods |      |
| cate         | relation   | cate has many foods   |      |



### 新闻分类

sort

| 字段     | 类型       | 说明                         | 约束 |
| -------- | ---------- | ---------------------------- | ---- |
| sor_name | short text | 类别名称                     |      |
| presses  | relation   | sort belongs to many presses |      |



### 新闻

press

| 字段                   | 类型       | 说明                  | 约束 |
| ---------------------- | ---------- | --------------------- | ---- |
| title                  | short text | 标题                  |      |
| pre_cover              | media      | 新闻封面              |      |
| view                   | integer    | 浏览量                |      |
| content                | long text  | 内容                  |      |
| sort                   | relation   | sort has many presses |      |
| users_permissions_user | relation   | press has one User    |      |



### 留言

comment

| 字段                   | 类型       | 说明                 | 约束 |
| ---------------------- | ---------- | -------------------- | ---- |
| title                  | short text | 标题                 |      |
| content                | long text  | 留言内容             |      |
| reply                  | long text  | 回复内容             |      |
| users_permissions_user | relation   | comment has one User |      |



### 轮播图

carousel

| 字段    | 类型       | 说明     | 约束 |
| ------- | ---------- | -------- | ---- |
| title   | short text | 标题     |      |
| content | media      | 图片     |      |
| url     | short text | 链接地址 |      |



### 收藏记录

record

（收藏景点）

| 字段                   | 类型       | 说明                 | 约束 |
| ---------------------- | ---------- | -------------------- | ---- |
| title                  | short text | 标题                 |      |
| place                  | relation   | record has one place |      |
| users_permissions_user | relation   | record has one User  |      |



### 友情链接

link

| 字段      | 类型       | 说明     | 约束 |
| --------- | ---------- | -------- | ---- |
| lin_name  | short text | 网站名称 |      |
| lin_url   | short text | 网址     |      |
| lin_cover | media      | 网站icon |      |

























