import { HeadProps, PageProps } from 'gatsby';
import * as React from 'react';

function NotFoundPage({}: PageProps) {
  return <></>;
}

export default NotFoundPage;

export function Head({}: HeadProps) {
  return <title>Page introuvable</title>;
}
