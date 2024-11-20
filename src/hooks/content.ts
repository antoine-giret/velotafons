import { useState } from 'react';

import Cards from '../components/cards';
import Hero from '../components/hero';
import HighlightedEvent from '../components/highlighted-event';
import HighlightedIllustration from '../components/highlighted-illustration';
import HighlightedPortrait from '../components/highlighted-portrait';
import ImageCard from '../components/image-card';
import KeyNumbers from '../components/key-numbers';

type TEle = {
  data: { id: string };
  Ele: (props: { data: { id: string } }) => JSX.Element;
};

function getElement(
  block: Queries.HeroFragment | Queries.KeyNumbersFragment,
): { data: { id: string }; Ele: (props: { data: { id: string } }) => JSX.Element } | null {
  switch (block.internal?.type) {
    case 'DatoCmsHero':
      return { Ele: Hero as never, data: block };
    case 'DatoCmsKeyNumbersBlock':
      return { Ele: KeyNumbers as never, data: block };
    case 'DatoCmsHighlightedIllustration':
      return { Ele: HighlightedIllustration as never, data: block };
    case 'DatoCmsHighlightedPortrait':
      return { Ele: HighlightedPortrait as never, data: block };
    case 'DatoCmsImageCard':
      return { Ele: ImageCard as never, data: block };
    case 'DatoCmsHighlightedEvent':
      return { Ele: HighlightedEvent as never, data: block };
    case 'DatoCmsCardsBlock':
      return { Ele: Cards as never, data: block };
    default:
      return null;
  }
}

export function useContent({
  data,
}: {
  data:
    | Queries.HomeQueryFragment
    | Queries.MissionQueryFragment
    | Queries.BlogQueryFragment
    | Queries.ContactQueryFragment
    | Queries.ChallengesQueryFragment
    | null;
}) {
  const [elements] = useState<Array<TEle>>(() => {
    const _elements = Object.values(data || {}).reduce<Array<TEle>>((res, block) => {
      if (block) {
        if (Array.isArray(block)) {
          res.push(
            ...block.reduce<Array<TEle>>((res2, subBlock) => {
              const ele = getElement(subBlock);
              if (ele) res2.push(ele);

              return res2;
            }, []),
          );
        } else if ('id' in block) {
          const ele = getElement(block);
          if (ele) res.push(ele);
        }
      }

      return res;
    }, []);

    return _elements;
  });

  return { elements };
}
