## Hexo配置

项目中使用的接口由 `hexo-generator-restful` 插件提供，请先在Hexo博客目录安装插件，使用方法见参考文档。

```shell
npm install hexo-generator-restful --save
```

## restful 配置

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