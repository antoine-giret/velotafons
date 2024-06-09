import path from 'path';

import { CreatePagesArgs, SourceNodesArgs } from 'gatsby';

import { GeogroupService } from './src/services';

export async function sourceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  try {
    const challenges: Array<{ id: number }> = await GeogroupService.getChallenges();

    for (const challenge of challenges) {
      const nodeId = createNodeId(`challenge.${challenge.id}`);
      const nodeContent = JSON.stringify(challenge);
      const node = Object.assign(
        {},
        { data: challenge },
        {
          id: nodeId,
          originalId: challenge.id,
          parent: null,
          children: [],
          internal: {
            type: 'challenge',
            content: nodeContent,
            contentDigest: createContentDigest(challenge),
          },
        },
      );
      createNode(node);
    }
  } catch (err) {
    console.error(err);
  }
}

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
      allChallenge {
        nodes {
          data {
            id
          }
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

  for (const node of data?.allChallenge.nodes || []) {
    if (node.data?.id) {
      createPage({
        path: `/challenges/${node.data.id}/`,
        component: path.resolve(`./src/templates/challenge.tsx`),
        context: { id: node.data.id },
      });
    }
  }
}
