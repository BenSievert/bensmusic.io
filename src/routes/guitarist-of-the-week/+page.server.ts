import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarist = (
		await sql`SELECT *, TO_CHAR(start,'Month DD, YYYY') date
			  FROM guitarists
			  where start + INTERVAL '6 HOURS' <= NOW()
			  ORDER BY start DESC LIMIT 1`
	)[0];


	return guitarist
};
