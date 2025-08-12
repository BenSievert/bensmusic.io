import sql from '../../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarist = (
		await sql`SELECT *
			  FROM guitarists
			  WHERE date = ${params.slug}`
	)[0];

	return guitarist;
};
