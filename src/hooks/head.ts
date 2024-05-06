export function useHead({
  site,
  data,
}: {
  data: Queries.MissionQueryFragment | Queries.BlogQueryFragment | null;
  site: Queries.GatsbySiteFragment | null;
}) {
  const title = [data?.hero?.title, 'Vélotafons !'].filter(Boolean).join(' | ');
  const _description = data?.hero?.subtitle;
  const description =
    _description && _description.length > 160
      ? `${_description.substring(0, 157)}...`
      : _description;
  const url = site?.siteMetadata?.siteUrl;
  const imageUrl = data?.hero?.backgroundImage?.url;

  return { title, description, url, imageUrl };
}
