import sql from '../../postgres.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const articles = (await sql`SELECT name, id,
				TO_CHAR(created,'Month') start_month,
				TO_CHAR(created,'YYYY') start_year
			  FROM articles
			  ORDER BY created DESC`) as { name: string; id: string; start_month: string; start_year: string }[];


	const byYear = Object.groupBy(articles, ({ start_year }) => start_year);
	const groupedArticles = Object.entries(byYear).map(([year, articlesByYear]) => [
		year,
		Object.groupBy(articlesByYear!, ({ start_month }) => start_month)
	]);
	return { groupedArticles };
};
