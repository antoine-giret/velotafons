const now = new Date();
const nowFormatted = new Intl.DateTimeFormat('fr-FR').format(now).replaceAll('/', '-');

export class GeogroupService {
  static async getGeogroup() {
    const res = await fetch(`https://backend.geovelo.fr/api/v4/geogroups/2708`, {
      headers: [
        ['authorization', process.env.GATSBY_GEOVELO_AUTHORIZATION || ''],
        ['api-key', process.env.GATSBY_GEOVELO_API_KEY || ''],
        ['source', process.env.GATSBY_GEOVELO_SOURCE || ''],
      ],
    });

    if (res.status !== 200) throw new Error('Geogroup recovery failed');
    const { total_members, total_distance } = (await res.json()) as {
      total_distance: number;
      total_members: number;
    };

    return {
      members: total_members,
      distance: total_distance,
      saved_co2: Math.round((total_distance / 1000) * 0.2176),
    };
  }

  static async getChallenges() {
    const res = await fetch(
      `https://backend.geovelo.fr/api/v4/geogroups/2708/challenges?period=custom&date_start=01-01-2023&date_end=${nowFormatted}&query={id,title,start_datetime,end_datetime,photo,description,collaboration_type,target_type,progress_value,target_value}`,
      {
        headers: [
          ['authorization', process.env.GATSBY_GEOVELO_AUTHORIZATION || ''],
          ['api-key', process.env.GATSBY_GEOVELO_API_KEY || ''],
          ['source', process.env.GATSBY_GEOVELO_SOURCE || ''],
          ['Accept-Language', 'fr-FR'],
        ],
      },
    );

    if (res.status !== 200) throw new Error('Challenges recovery failed');
    const { results } = await res.json();

    return results;
  }

  static async getLeaderboard(challengeId: number, { page }: { page: number }) {
    const res = await fetch(
      `https://backend.geovelo.fr/api/v3/challenges/${challengeId}/leaderboard?page=${page}`,
      {
        headers: [
          ['authorization', process.env.GATSBY_GEOVELO_AUTHORIZATION || ''],
          ['api-key', process.env.GATSBY_GEOVELO_API_KEY || ''],
          ['source', process.env.GATSBY_GEOVELO_SOURCE || ''],
        ],
      },
    );

    if (res.status !== 200) throw new Error('Challenge leaderboard recovery failed');
    const { results, next_path } = await res.json();

    return { results, hasNext: Boolean(next_path) };
  }
}
