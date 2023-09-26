export default {
  // 默认网站标题
  title: "EvanNotFound5",
  // 默认网站描述
  description: "这是我记录学习笔记的地方",
  // =====主题相关配置=====
  themeConfig: {
    // 【自定义网站logo】
    logo: "https://mysource-hexo.wyun521.top/img/avatar/7.jpg",
    // 【自定义网站标题】
    // siteTitle: "EvanNotFound5",
    // 【上次更新显示文本】
    lastUpdatedText: "上次更新",
    // 【编辑链接】
    // editLink: {
    //   pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    //   text: "Edit this page on GitHub",
    // },
    // 【目录标题】
    outlineTitle: "目录",
    // 【上一页/下一页标题】
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    // 【页脚】
    // 当侧边栏可见时，不会显示页脚
    footer: {
      message: "清心寡欲，专一守恒",
      copyright: "Copyright © 2023-present Evan Luo",
    },
    // 【导航栏】
    nav: [
      { text: "笔记", link: "/note/" },
      {
        text: "分类",
        items: [
          { text: "HTML5&CSS3", link: "/note/html&css/html-day01" },
          { text: "JavaScript", link: "/note/js/js-day01" },
          { text: "Tool", link: "/note/tool/ajax-day01" },
        ],
      },
    ],
    // 【社交链接】
    // 在页面导航栏右上角显示
    socialLinks: [
      { icon: "github", link: "https://github.com/sunday521" },
      { icon: "twitter", link: "https://juejin.cn/user/981236373005534" },
    ],
    // 【侧边栏】
    // 侧边栏菜单的最简单形式是传入一个链接数组。 第一级项目定义了侧边栏部分。 它应该包含text，即该部分的标题，以及 items ，即实际的导航链接。
    // 每个 link 都应该指定以 / 开头的实际文件的路径。 如果在链接末尾添加斜杠，它将显示相应目录的index.md。
    // sidebar: [
    //   {
    //     text: "Guide",
    //     items: [
    //       { text: "Introduction", link: "/introduction" },
    //       { text: "Getting Started", link: "/getting-started" },
    //     ],
    //   },
    // ],
    // 您可能会根据页面路径显示不同的侧边栏。 例如，如本网站所示，您可能希望在文档中创建单独的内容部分，例如“指南”页面和“配置”页面。
    // 为了定义每个部分的侧边栏，这次配置的是一个对象而不是数组
    sidebar: {
      // 当用户在 `指南` 目录页面下将会展示这个侧边栏
      "/note/": [
        {
          text: "HTML5&CSS3",
          // 可折叠
          collapsible: true,
          // 默认折叠
          collapsed: true,
          items: [
            // This shows `/guide/index.md` page.
            { text: "HTML5笔记（一）", link: "/note/html&css/html-day01" },
            { text: "HTML5笔记（二）", link: "/note/html&css/html-day02" },
            { text: "HTML5笔记（三）", link: "/note/html&css/html-day03" },
            { text: "CSS3笔记（一）", link: "/note/html&css/css-day01" },
            { text: "CSS3笔记（二）", link: "/note/html&css/css-day02" },
            { text: "CSS3笔记（三）", link: "/note/html&css/css-day03" },
            { text: "CSS3笔记（四）", link: "/note/html&css/css-day04" },
            { text: "CSS3笔记（五）", link: "/note/html&css/css-day05" },
            { text: "CSS3笔记（六）", link: "/note/html&css/css-day06" },
            { text: "CSS3笔记（七）", link: "/note/html&css/css-day07" },
            { text: "CSS3笔记（八）", link: "/note/html&css/css-day08" },
            { text: "CSS3笔记（九）", link: "/note/html&css/css-mobile" },
          ],
        },
        {
          text: "JavaScript",
          // 可折叠
          collapsible: true,
          // 默认折叠
          collapsed: true,
          items: [
            // This shows `/guide/index.md` page.
            { text: "JavaScript笔记（一）", link: "/note/js/js-day01" },
            { text: "JavaScript笔记（二）", link: "/note/js/js-day02" },
            { text: "JavaScript笔记（三）", link: "/note/js/js-day03" },
            { text: "JavaScript笔记（四）", link: "/note/js/js-day04" },
            { text: "JavaScript笔记（五）", link: "/note/js/js-day05" },
            { text: "Web API笔记（一）", link: "/note/js/webapi-day01" },
            { text: "Web API笔记（二）", link: "/note/js/webapi-day02" },
            { text: "Web API笔记（三）", link: "/note/js/webapi-day03" },
            { text: "Web API笔记（四）", link: "/note/js/webapi-day04" },
            { text: "Web API笔记（五）", link: "/note/js/webapi-day05" },
            { text: "Web API笔记（六）", link: "/note/js/webapi-day06" },
            { text: "JavaScript高级笔记（一）", link: "/note/js/js-pro-day01" },
            { text: "JavaScript高级笔记（二）", link: "/note/js/js-pro-day02" },
            { text: "JavaScript高级笔记（三）", link: "/note/js/js-pro-day03" },
          ],
        },
        {
          text: "Tool",
          // 可折叠
          collapsible: true,
          // 默认折叠
          collapsed: true,
          items: [
            // This shows `/guide/index.md` page.
            { text: "Ajax笔记（一）", link: "/note/tool/ajax-day01" },
            { text: "Ajax笔记（二）", link: "/note/tool/ajax-day02" },
            { text: "Ajax笔记（三）", link: "/note/tool/ajax-day03" },
            { text: "Ajax笔记（四）", link: "/note/tool/ajax-day04" },
            { text: "Node笔记（一）", link: "/note/tool/node-day01" },
            { text: "Node笔记（二）", link: "/note/tool/node-day02" },
            { text: "Git笔记（一）", link: "/note/tool/git-day01" },
          ],
        },
      ],
    },
  },
};
