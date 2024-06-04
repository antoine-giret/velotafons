import path from 'path';

import { CreatePagesArgs } from 'gatsby';

export async function createPages({ graphql, actions: { createPage } }: CreatePagesArgs) {
  const { data } = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allDatoCmsIllustration {
        nodes {
          slug
        }
      }
      allDatoCmsGoodAddress {
        nodes {
          slug
        }
      }
      allDatoCmsPortrait {
        nodes {
          slug
        }
      }
      allDatoCmsEvent {
        nodes {
          slug
        }
      }
    }
  `);

  for (const { slug } of data?.allDatoCmsIllustration.nodes || []) {
    if (slug) {
      createPage({
        path: `/blog/illustrations/${slug}/`,
        component: path.resolve(`./src/templates/illustration.tsx`),
        context: { slug },
      });
    }
  }

  for (const { slug } of data?.allDatoCmsGoodAddress.nodes || []) {
    if (slug) {
      createPage({
        path: `/blog/adresses/${slug}/`,
        component: path.resolve(`./src/templates/good-address.tsx`),
        context: { slug },
      });
    }
  }

  for (const { slug } of data?.allDatoCmsPortrait.nodes || []) {
    if (slug) {
      createPage({
        path: `/blog/portraits/${slug}/`,
        component: path.resolve(`./src/templates/portrait.tsx`),
        context: { slug },
      });
    }
  }

  for (const { slug } of data?.allDatoCmsEvent.nodes || []) {
    if (slug) {
      createPage({
        path: `/blog/evenements/${slug}/`,
        component: path.resolve(`./src/templates/event.tsx`),
        context: { slug },
      });
    }
  }
}
