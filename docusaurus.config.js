// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dylan Player',
  tagline: '',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Dylan Player', // Usually your GitHub org/user name.
  projectName: 'devfolio', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
          {href: 'https://github.com/dylanplayer', label: 'GitHub', position: 'right'},
          {href: 'https://www.linkedin.com/in/dylan-player/', label: 'LinkedIn', position: 'right'},
          {href: 'https://twitter.com/dylanplayer', label: 'Twitter', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          
        ],
        copyright: `© ${new Date().getFullYear()}, Dylan Player`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
