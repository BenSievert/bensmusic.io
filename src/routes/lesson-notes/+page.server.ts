import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';
import { getSession, getStudentByEmail } from '$lib/server/functions';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await getSession(locals);
	if (!session) return {};
	const student = await getStudentByEmail(session);

	const notes = await sql`SELECT notes,
       	internal,
				TO_CHAR(created,'Month DD, YYYY') date_created
       FROM student_notes WHERE student_id = ${student.id} AND internal = FALSE ORDER BY created DESC`;

	return {
		student,
		notes
	};
};
