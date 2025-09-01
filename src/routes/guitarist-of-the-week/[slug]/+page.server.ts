import sql from '../../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guitarist = (
		await sql`SELECT *, TO_CHAR(start,'Month DD, YYYY') date
			  FROM guitarists
			  WHERE id = ${params.slug}`
	)[0];

	const { start, ...rest } = guitarist;

	return {
		...rest,
		start: start.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	};
};
