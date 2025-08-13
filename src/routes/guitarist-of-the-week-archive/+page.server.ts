import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarists = await sql`SELECT name, date
			  FROM guitarists
			  WHERE active
			  ORDER BY date DESC`;

	return { guitarists };
};
