import React from 'react';

export function CommonHead({
  title,
  description,
  url,
  imageUrl,
}: {
  description?: string | null;
  imageUrl?: string | null;
  title: string;
  url: string;
}) {
  return (
    <>
      <title>{title}</title>
      {description && <meta content={description} name="description" />}
      <meta content={title} property="og:title" />
      {description && <meta content={description} property="og:description" />}
      <meta content="website" property="og:type" />
      {url && <meta content={url} property="og:url" />}
      {imageUrl && <meta content={imageUrl} property="og:image" />}
    </>
  );
}
