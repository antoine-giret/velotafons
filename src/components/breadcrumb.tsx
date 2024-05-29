import { BreadcrumbItem, BreadcrumbLink, Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';

export function Breadcrumb({
  items,
}: {
  items: Array<{ key: string; label: string; to: string }>;
}): JSX.Element {
  return (
    <ChakraBreadcrumb>
      {items.map(({ key, to, label }) => (
        <BreadcrumbItem key={key}>
          <BreadcrumbLink as={Link} fontSize="0.9rem" to={to}>
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
}
