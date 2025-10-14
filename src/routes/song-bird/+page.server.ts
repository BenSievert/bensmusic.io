import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';
import { getSession } from '../../backend_functions';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await getSession(locals);

	const songs =
		await sql`SELECT title, id, TO_CHAR(date_created,'Month DD, YYYY') date_created, TO_CHAR(last_updated,'Month DD, YYYY') last_updated
			  FROM songs
			  WHERE email=${session.user.email}`;

	return {
		songs
	};
};
