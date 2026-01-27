import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';
import { isRoot, getSession } from "$lib/server/functions";

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await getSession(locals);
	if (!isRoot(session))
		return
	return ({students: await sql`SELECT *
						 FROM students`});

};
