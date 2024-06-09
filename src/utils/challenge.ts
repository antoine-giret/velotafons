import { toDistance } from './units';

const now = new Date();

export function formatPeriod({
  startDatetime,
  endDatetime,
}: {
  endDatetime: Date;
  startDatetime: Date;
}) {
  const period =
    endDatetime.getTime() < now.getTime()
      ? 'past'
      : startDatetime.getTime() > now.getTime()
        ? 'future'
        : 'current';

  return period === 'past'
    ? `Terminé le ${new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
      }).format(new Date(endDatetime))}`
    : period === 'future'
      ? `Commence le ${new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'medium',
        }).format(new Date(startDatetime))}`
      : `Se termine le ${new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'medium',
        }).format(new Date(endDatetime))}`;
}

export function formatProgress({
  target_type,
  collaboration_type,
  target_value,
  progress_value,
}: {
  collaboration_type: string | null;
  progress_value: number | null;
  target_type: string | null;
  target_value?: number | null;
}) {
  if (!progress_value) return '';

  switch (target_type) {
    case 'TRAVELED_DISTANCE':
      return collaboration_type === 'INDIVIDUAL'
        ? toDistance(progress_value)
        : target_value
          ? `${toDistance(progress_value)} / ${toDistance(target_value)}`
          : '';
    case 'CYCLING_DAYS':
      return collaboration_type === 'INDIVIDUAL'
        ? progress_value > 1
          ? `${progress_value} jours`
          : `${progress_value} jour`
        : target_value
          ? `${progress_value} j / ${target_value}`
          : 0;
    case 'TRACES_COUNT':
      return collaboration_type === 'INDIVIDUAL'
        ? progress_value > 1
          ? `${progress_value} trajets`
          : `${progress_value} trajet`
        : target_value
          ? progress_value > 1
            ? `${progress_value} trajets / ${target_value}`
            : `${progress_value} trajet / ${target_value}`
          : '';
    default:
      return '';
  }
}

export function getPhotoURL(photo: string | null) {
  return photo
    ? `https://backend.geovelo.fr${photo}`
    : `https://geovelo.app/static/distance-89ece7e99501bd3fd41895a5409893e3.svg`;
}
