export function useHead({
  site,
  data: { title: _title, description: _description },
}: {
  data: { description?: string | null; title?: string | null };
  site: Queries.GatsbySiteFragment | null;
}) {
  const title = [_title, 'Vélotafons !'].filter(Boolean).join(' | ');
  const description =
    _description && _description.length > 160
      ? `${_description.substring(0, 157)}...`
      : _description;
  const url = site?.siteMetadata?.siteUrl || '';

  return { title, description, url };
}
