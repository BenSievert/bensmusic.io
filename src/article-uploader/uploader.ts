import { config } from 'dotenv';
import { readFile } from 'fs/promises';

config({ path: '../../.env.development.local' });

import { neon } from '@neondatabase/serverless';

const connectionString: string = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

const [fileName, update] = process.argv.slice(2);
const name = fileName.replaceAll(`_`, ` `);
readFile(`./${fileName}.md`, 'utf8').then(async (content) => {
	const resp = await (update
		? sql`UPDATE articles SET content = ${content} WHERE name = ${name}`
		: sql`INSERT INTO articles (name, content) VALUES (${name}, ${content})`);

	console.log(resp);
});
