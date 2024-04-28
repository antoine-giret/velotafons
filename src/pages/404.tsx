import * as React from "react"
import { PageProps, HeadProps } from "gatsby"

function NotFoundPage({}: PageProps) {
  return (
    <></>
  );
}

export default NotFoundPage;

export function Head({}: HeadProps) {
  return (
    <title>Page introuvable</title>
  );
}
