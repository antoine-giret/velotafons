import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({ path: `.env` });

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
        apiToken: process.env.GATSBY_SOURCE_DATOCMS_API_TOKEN,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
