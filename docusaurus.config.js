// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dylan Player',
  tagline: '',
  url: 'https://dylanplayer.com',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dylanplayer',
  projectName: 'devfolio',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/tutorials',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Dylan Player',
        logo: {
          alt: 'Dylan Player Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/portfolio', label: 'Portfolio', position: 'left'},
          {to: '/education', label: 'Education', position: 'left'},
          {to: '/work', label: 'Work', position: 'left'},
          {to: '/contact', label: 'Contact', position: 'left'},
          {to: '/news', label: 'News', position: 'right'},
          {to: 'blog', label: 'Blog', position: 'right'},
          {to: 'tutorials', label: 'Tutorials', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {href: 'https://github.com/dylanplayer', label: 'GitHub', position: 'right'},
          {href: 'https://www.linkedin.com/in/dylan-player/', label: 'LinkedIn', position: 'right'},
          {href: 'https://twitter.com/dylanplayer', label: 'Twitter', position: 'right'},
        ],
        copyright: `© ${new Date().getFullYear()}, Dylan Player`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
      },
      hideableSidebar: true,
    }),
    plugins: [
      [
        '@docusaurus/plugin-google-gtag',
        {
          trackingID: 'G-H6VP97KX1J',
          anonymizeIP: true,
        },
      ],
    ],
};

module.exports = config;
