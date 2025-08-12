import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarist = (
		await sql`SELECT *
			  FROM guitarists
			  ORDER BY id DESC LIMIT 1`
	)[0];

	return guitarist;
};
