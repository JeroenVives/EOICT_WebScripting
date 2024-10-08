import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'


module.exports = {
  bundler: viteBundler(),
  lang: 'en-US',
  title: 'Course Web Scripting - Professional Bachelor Elektronica-ICT',
  description: 'Course Web Scripting',
  
  theme: defaultTheme({
    logo: '/files/afbeelding1.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Organization', link: 'https://www.vives.be' },      
      { text: 'Contact', link: 'mailto:jeroen.reinenbergh@vives.be' }
    ],
    sidebar: [
      {
        text: 'Development tools',
        collapsible: true,
        children: [
          '/01_developmenttools/README.md',          
        ]
      },{
        text: 'Backend databases',
        collapsible: true,
        children: [
          '/41_databases/README.md',
          '/42_setup_mysql/README.md',
          '/43_setup_mariadb/README.md',
          //'/44_install_phpmyadmin/README.md',
          '/45_create_db_user/README.md',
          '/46_crud_db/README.md',
        ]
      },{
        text: 'Backend scripting',
        collapsible: true,
        children: [
          '/51_advanced_js/README.md',
          '/52_intro_express/README.md',
          '/53_rest_api_crud/README.md',
          '/54_rest_api_fileupload/README.md',
          '/55_security/README.md',
        ]
      },{
        text: 'Frontend development',
        collapsible: true,
        children: [
          '/61_frontend_vue/README.md',
          '/66_routes/README.md',
          '/62_restfull_apis/README.md',
          '/63_crud/README.md',
          '/64_axios/README.md',
          '/65_vuetify/README.md',
        ]
      },{
        text: 'Privacy regulations',
        collapsible: true,
        children: [
          '/73_privacy/README.md',
          //'/72_login/README.md',
          //'/71_secure_api/README.md',          
        ],
      },{
        text: 'Deployment',
        collapsible: true,
        children: [
          '/83_docker_full/README.md',
          //'/72_login/README.md',
          //'/71_secure_api/README.md',          
        ],
      }
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/JeroenVives/EOICT_WebScripting',
    docsDir: 'docs',
    docsBranch: 'master',
  }),
  serviceWorker: true,
  plugins: [
    copyCodePlugin({
      locales: {
        '/': {
          copy: 'Copy code',
          copied: 'Copied',
        },
      },
    }),
  ],
}