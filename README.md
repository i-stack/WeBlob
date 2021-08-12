# WeBlog
**WeBlog**是一个呈现Hexo博客文章的微信小程序。可帮助Hexo博主更方便的展示博客，~~Do you guys not have phones?~~

该项目采用**云开发**的方式，因为GitHub Pages无法添加到request合法域名，我也没有个人网站。有个人网站的小伙伴可自行修改成非云开发，具体可借鉴参考文档中的**WeHexo**小程序。

因云开发的后端资源有调用限制（╯‵□′）╯︵┴─┴，所以将同步时间定为了每日的8/12/16/20点，这会导致博客信息不一致。

用到的第三方库有WeUI、Towxml。踩了不少坑，甚至改动源码，之后有时间整理个文档〒_〒。

## 如何使用？

克隆本项目至磁盘，导入微信开发者工具后，再做如下修改(●'◡'●)ﾉ♥：

- 全局搜索`huangruoqiu`语句，换成自己的网站信息
- 全局搜索`cloud.init`语句，换成自己的云环境ID
- 云开发控制台中新建`postList`、`tagList`集合，并将数据权限设置为**所有用户可读**
- 开启本地调试云函数，或者将云函数上传部署至云端

## Hexo配置

项目中使用的接口均由`hexo-generator-restful`插件提供，请先在Hexo博客目录安装插件，使用方法见参考文档。
```shell
npm install hexo-generator-restful --save
```
附上我的restful配置
```yml
restful:
  # site 可配置为数组选择性生成某些属性
  # site: ['title', 'subtitle', 'description', 'author', 'since', email', 'favicon', 'avatar']
  site: false        # hexo.config mix theme.config
  posts_size: 0    # 文章列表分页，0 表示不分页
  posts_props:      # 文章列表项的需要生成的属性
    title: true
    slug: false
    date: true
    updated: true
    comments: false
    path: true
    excerpt: false
    cover: true      # 封面图，取文章第一张图片
    content: false
    keywords: false
    categories: true
    tags: true
  categories: true         # 分类数据
  use_category_slug: false # Use slug for filename of category data
  tags: true               # 标签数据
  use_tag_slug: false      # Use slug for filename of tag data
  post: true               # 文章数据
  pages: false             # 额外的 Hexo 页面数据, 如 About
```

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

- [hexo-generator-restful说明](https://github.com/yscoder/hexo-generator-restful)

- [Towxml](https://github.com/sbfkcel/towxml)

- [WeUI组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)

- [WeHexo-非云开发Hexo博客小程序](https://github.com/CryFeiFei/WeHexo)