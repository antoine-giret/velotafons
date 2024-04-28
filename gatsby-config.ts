import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Vélotafons`,
    siteUrl: `https://velotafons.fr`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: '313c8a869b6e59eb3e07a88b17e580',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.svg',
      },
    },
  ],
};

export default config;
