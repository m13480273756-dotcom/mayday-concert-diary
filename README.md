# 五月天演唱会手账

一个记录演唱会现场的在线手账：日期、城市、场馆、座位、歌单，以及当时的心情。

在线访问：**https://m13480273756-dotcom.github.io/mayday-concert-diary/**

影像作品集：**https://m13480273756-dotcom.github.io/mayday-concert-diary/portfolio/**

## 功能

- 按演出名称自动填充日期、城市、场馆和歌单
- 按演出、城市、场馆、心情或歌单关键词搜索
- 添加、编辑、删除演出记录
- 导出和导入 JSON 备份
- 数据只保存在访客自己的浏览器中，无需注册账号

## 本地运行

直接双击 `index.html`，或在项目目录启动任意静态文件服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 公开访问与搜索

站点通过 GitHub Pages 发布。`robots.txt`、`sitemap.xml`、页面描述和 Open Graph 信息用于帮助搜索引擎与社交平台识别页面。公开网址稳定后，可在 Google Search Console、Bing Webmaster Tools 和百度搜索资源平台提交站点地图，以加快收录。

## 隐私

项目没有后端数据库，也不会上传手账记录。每位访客的记录保存在其浏览器的 `localStorage` 中；清理浏览器数据或换设备前，需要先导出备份。

## 图片来源

`assets/` 中的舞台、荧光棒、纸花、麦克风和气球图片为页面氛围素材；徽章为项目自绘 SVG。
