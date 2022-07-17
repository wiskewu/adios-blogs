### Intro
Simple template of static blog system, using [`adios-blog-cli`](https://github.com/wiskewu/adios-blog-cli) as cli to compile and preview.

### Features
- Dark-mode and light-mode toggles
- articles filtering on Indexpage
- Categories of articles supports
- Tags of articles supports
- About page supports
- Custom page supports
- Public path supports
- markdown(`*.md`) file parsing
- ...

### Architecture
`Markdown` + `Pug` + `Nodejs`

### Design
##### Solution
the process could be described by following steps:
1. read `adios.config.json`
2. goto `build` function
3. read `*.md` files
4. parse md's information(title、date、categories、tags, etc.)
5. data collections
6. split pages
7. compiling markdown content with pug templates and some data into html files
7. write html files to dist dir
8. done.

##### Usage
you can just clone it:
```bash
git clone https://github.com/wiskewu/adios-blog-template.git

cd adios-blog-template

yarn && yarn build && yarn dev
```
then open `localhost:3000` in the browser to see the blog content.

---

Or you can use the `adios-blog-cli` to get started:
```bash
yarn global add adios-blog-cli

adios
```
### Project Layout
explanation of project.
- adios.config.json
    > the configuration of your site, see details in [adios-blog-cli](https://github.com/wiskewu/adios-blog-cli)

- assets
    > the images where you used in the source markdown files should be placed under this directory. Durring compiling stage, this directory will be totally copied under directory `public`.

- public
    > the output directory of your blog site content.

- theme
    > the directory of the template files and static resources.

- theme/layout
    > the directory of the pages templates.

- theme/statics
    > the directory of the static resources used by templates, this directory will be totally copied under directory `public`.

- source
    > where you update your new blog posts or other contents.

- source/_about
    > the source md file, consumed by 'theme/layout/about.pug'.

- source/_posts
    > create your new post here, consumed by 'theme/layout/post.pug'.

- source/_extra
    > where you placed your independent pages.

- scripts
    > the entry of compile stage and preview stage.

### Templates
the description of source template file and its output routes.
- theme/layout/index.pug
    > corresponding to local file: `{publicpath}/index.html`
    > corresponding to route: `{publicpath}/`, the homepage, and the first page.
    > corresponding to route: `{publicpath}/list/{n}.html`, n represents to `pageNum` of homepage list, start from `2`.

- theme/layout/categories.pug
    > corresponding to local file: `{publicpath}/categories/index.html`
    > corresponding to route: `{publicpath}/categories/`

- theme/layout/tags.pug
    > corresponding to local file: `{publicpath}/tags/index.html`
    > corresponding to route: `{publicpath}/tags/`

- theme/layout/about.pug
    > corresponding to local file: `{publicpath}/about/index.html`
    > corresponding to route: `{publicpath}/about/`

- theme/layout/post.pug
    > corresponding to local file: `{publicpath}/posts/{your-post-filename}.html`
    > corresponding to route: `{publicpath}/posts/{your-post-filename}`

- theme/layout/category-list.pug
    > corresponding to local file: `{publicpath}/categories/{catename}/{n}.html`, catename represents to specific category name; n represents to `pageNum` of list of this category name, start from `1`.
    > corresponding to route: `{publicpath}/categories/{catename}/{n}`

- theme/layout/tag-list.pug
    > corresponding to local file: `{publicpath}/tags/{tagname}/{n}.html`, tagname represents to specific tag name; n represents to `pageNum` of list of this tag name, start from `1`.
    > corresponding to route: `{publicpath}/tags/{tag}/{n}`

- theme/layout/{extra}.pug -- advanced features
    > corresponding to local file: `{publicpath}/extra/{extraname}.html`, extraname can be specified under field `config.settings.extraPages` in `adios.config.json`, usually work with `source/_extra/{extraname}.md`
    > corresponding to route: `{publicpath}/extra/{extraname}`

### Rules of post
at the begininng of your post md file, you can specify some fields to describe your post information.
content should be nested by one pair of `---`.
> --- # beginning of informations
> title: the title of your post.
> layout: the post template name, default to 'post'
> createDate: the date when you write this blog, goes by the format `YYYY-MM-DD HH:mm`
> updateDate: the date when you update this blog, goes by the format `YYYY-MM-DD HH:mm`
> author: the author's name of this post.
> categories: the categories which this post belongs to, goes by the format `categoryA, categoryB`
> tags: the tags which this post belongs to, goes by the format `tagA, tagB`
> summary: the summary of this post
> draft: if set to `false`, then this post will not be complied into your site temporarily。
> top: specify wheather this post ranked first of all other posts. `true` or `false`
> --- # end of informations 

see the demo below:
```md
---
title: 我的第一篇博客
layout: post
createDate: 2022-07-08 20:22
updateDate: 2022-07-08 21:22
author: wiskewu
categories: 前端
tags: JS, React
summary: 随着前端的发展，越来越多的工具库、方法被用在日常研发流程中，这大大提升了业务开发的效率，而随着各类自动化流程的建设。
draft: false
top: false
---

your post content starts from here.
```

### Image Reference
we strongly recommend you  refering local image urls other than remote url addresses(remote url is still usable).

Assume that you have an post named `2022-07-09-this-is-my-first-blog.md`, and refering to an image named `JavaScript进阶指南`, then you can put this image info `assets/posts` directory like this:
```
aseets
 |- posts
 |- |- JavaScript进阶指南.png

source
 |- _posts
 |- |- 2022-07-09-this-is-my-first-blog.md
```
and your md file will goes like this:
```md
![JavaScript进阶指南](/assets/posts/JavaScript进阶指南.png)
```
And it's done! You don't have to worry about your image can't be found one day in the future.

### Deploy
We support CI with the `Github Action`.
We'll take user `wiskewu`(That's me) as an example, Say that we want to deploy the blog with the homepage gose like ['wiskewu.github.io/adios-blog-site/'](wiskewu.github.io/adios-blog-site/):
1. Init project
    ```bash
    git clone git@github.com:wiskewu/adios-blog-template.git adios-blog-site

    cd adios-blog-site
    ```
2. Update Project Name
    edit package.json: 
    ```json
    {
        "name": "adios-blog-site"
    }
    ```
3. Update Config
    edit adios.config.json
    ```json
    {
        "siteinfo": {
            "publicPath": "/adios-blog-site/"
        }
    }
    ```
    > the publicPath is the pathname of 'wiskewu.github.io/adios-blog-site/'
4. Save changes and Init Git Repo
    make sure you have added new repository on github, then:
    ```bash
    rm -rf .git
    git init
    git add .
    git commit -m "Init"
    git remote add origin git@github.com:wiskewu/adios-blog-site.git
    git push
    ```
5. Check the Github Action on Github Repo
    > https://github.com/wiskewu/adios-blog-site/actions

    make sure the action excute successfully.
    > Once succeed, you will have an repo branch named `gh-pages` created by Bot.
6. Config Github Pages
    > https://github.com/wiskewu/adios-blog-site/settings/pages
    select `gh-pages` as an source. then all works done.
7. Wait a moment and your blogs will be deployed on ['wiskewu.github.io/adios-blog-site/'](wiskewu.github.io/adios-blog-site/)

8. Add new posts and Enjoy it.

### Markdown parse
Once you start up the preview mode by running `yarn dev`, you can open the url `localhost:3000/extra/demo` and the url `https://markdown-it.github.io/` to see the difference and support between them.

### Thanks List
this project uses or refers to some awesome repositories below:
- [yohe](https://github.com/laoqiren/yohe): the idea of `adios-blog-cli`
- [heroicons](https://github.com/tailwindlabs/heroicons): beautiful svg icons
- [pure-css](https://github.com/pure-css/pure/): A set of small, responsive CSS modules
- [markdown-it](https://github.com/markdown-it/markdown-it): markdown parser, done right
- [pugjs](https://github.com/pugjs/pug): robust, elegant, feature rich template engine for Node.js

### License
MIT.