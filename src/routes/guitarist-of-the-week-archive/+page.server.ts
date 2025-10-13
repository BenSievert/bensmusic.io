import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.auth()
	console.log({session})

	const guitarists = (await sql`SELECT name, id,
				TO_CHAR(start,'Month') start_month,
				TO_CHAR(start,'YYYY') start_year
			  FROM guitarists
			  WHERE start + INTERVAL '6 HOURS' <= NOW()
			  ORDER BY start DESC`) as { name: string; id: string; start_month: string; start_year: string }[];

	const byYear = Object.groupBy(guitarists, ({ start_year }) => start_year);
	const groupedGuitarists = Object.entries(byYear).map(([year, guitaristsByYear]) => [
		year,
		Object.groupBy(guitaristsByYear!, ({ start_month }) => start_month)
	]);
	return { groupedGuitarists };
};
