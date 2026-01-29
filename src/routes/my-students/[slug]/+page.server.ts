import sql from '../../../postgres.server';
import type { PageServerLoad } from './$types';
import { getSession, isRoot } from '$lib/server/functions';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await getSession(locals);
	if (!isRoot(session)) return {};

	const [[student], notes] = await Promise.all([
		sql`SELECT *
			  FROM students
			  WHERE id = ${params.slug}`,
		sql`SELECT notes,
       	internal,
				TO_CHAR(created,'Month DD, YYYY') date_created
       FROM student_notes WHERE student_id = ${params.slug} ORDER BY created DESC`
	]);
	return {
		student: student,
		notes
	};
};
