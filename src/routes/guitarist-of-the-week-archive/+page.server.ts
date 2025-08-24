import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarists = await sql`SELECT name, id, TO_CHAR(start,'Month DD, YYYY') date
			  FROM guitarists
			  WHERE start + INTERVAL '6 HOURS' <= NOW()
			  ORDER BY start DESC`;

	return { guitarists };
};
