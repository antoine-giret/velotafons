import { useState } from 'react';

import Hero from '../components/hero';
import KeyNumbers from '../components/key-numbers';

type TEle = {
  data: { id: string };
  Ele: (props: { data: { id: string } }) => JSX.Element;
  index: number;
};

function getElement(
  block: Queries.HeroFragment | Queries.KeyNumbersFragment,
): { data: { id: string }; Ele: (props: { data: { id: string } }) => JSX.Element } | null {
  switch (block.internal.type) {
    case 'DatoCmsHero':
      return { Ele: Hero as never, data: block };
    case 'DatoCmsKeyNumbersBlock':
      return { Ele: KeyNumbers as never, data: block };
    default:
      return null;
  }
}

export function useContent({ data }: { data: Queries.HomeQueryFragment | null }) {
  const [elements] = useState<Array<TEle>>(() => {
    const _elements = Object.values(data || {})
      .reduce<Array<TEle>>((res, block) => {
        if (block) {
          if (Array.isArray(block)) {
            res.push(
              ...block.reduce<Array<TEle>>((res2, subBlock) => {
                const ele = getElement(subBlock);
                if (ele)
                  res2.push({
                    ...ele,
                    index: 'order' in block && typeof block.order === 'number' ? block.order : 1001,
                  });

                return res2;
              }, []),
            );
          } else if ('id' in block) {
            const ele = getElement(block);
            if (ele)
              res.push({
                ...ele,
                index:
                  block.internal.type === 'DatoCmsHero'
                    ? 0
                    : 'order' in block && typeof block.order === 'number'
                      ? block.order
                      : 1001,
              });
          }
        }

        return res;
      }, [])
      .sort((a, b) => a.index - b.index);

    return _elements;
  });

  return { elements };
}
