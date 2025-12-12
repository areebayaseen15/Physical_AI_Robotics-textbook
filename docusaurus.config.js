import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline:
    'An open-source, AI-augmented textbook for physical AI and humanoid robotics.',

  // ⭐ CORRECT GitHub Pages URL + baseUrl
  url: "https://areebayaseen15.github.io",
  baseUrl: "/Physical_AI_Robotics-textbook/",
  trailingSlash: false,

  onBrokenLinks: 'ignore',

  favicon: 'img/favicon.webp',

  // ⭐ CORRECT GitHub repo settings
  organizationName: 'areebayaseen15', 
  projectName: 'Physical_AI_Robotics-textbook', 

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/areebayaseen15/Physical_AI_Robotics-textbook/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/areebayaseen15/Physical_AI_Robotics-textbook/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
      image: 'img/logo.webp',
      navbar: {
        title: 'Physical AI & Humanoid Robotics Textbook',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.webp',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Textbook',
          },
          {
            href: 'https://github.com/areebayaseen15',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
