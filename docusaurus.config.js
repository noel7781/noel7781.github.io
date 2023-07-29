// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "noel7781",
    // tagline: "Dinosaurs are cool",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://noel7781.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "noel7781", // Usually your GitHub org/user name.
    projectName: "noel7781.github.io", // Usually your repo name.
    trailingSlash: false,
    deploymentBranch: "gh-pages",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                // docs: {
                //     sidebarPath: require.resolve("./sidebars.js"),
                // },
                docs: false,
                blog: {
                    routeBasePath: "/",
                    blogSidebarTitle: "모든 포스트",
                    blogSidebarCount: "ALL",
                    blogTitle: "블로그",
                    showReadingTime: true,
                    readingTime: ({content, frontMatter, defaultReadingTime}) =>
                        defaultReadingTime({content, options: {wordsPerMinute: 300}}),
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/docusaurus-social-card.jpg",
            navbar: {
                title: "Blog",
                // logo: {
                //     alt: "My Site Logo",
                //     src: "img/logo.svg",
                // },
                items: [
                    // {
                    //     type: "docSidebar",
                    //     sidebarId: "tutorialSidebar",
                    //     position: "left",
                    //     label: "Tutorial",
                    // },
                    {to: "/books", label: "Books", position: "left"},
                    {
                        href: "https://github.com/noel7781",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            // footer: {
            //     style: "dark",
            //     links: [
            //         {
            //             title: "More",
            //             items: [
            //                 {
            //                     label: "GitHub",
            //                     href: "https://github.com/noel7781",
            //                 },
            //             ],
            //         },
            //     ],
            // },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
