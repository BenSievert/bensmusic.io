import { config } from 'dotenv';
import  fs from 'fs';
import { readFile } from 'fs/promises';

import * as readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const askQuestion = async (question: string) => {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
	});
};

config({ path: '../../.env.development.local' });

import { neon } from '@neondatabase/serverless';

const connectionString: string = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

fs.readdir('./articles', async (_: NodeJS.ErrnoException | null, files: string[]) => {
	files.forEach((file, i) => console.log(`${i + 1}) ${file.slice(0, -3)}`))

	const input = await askQuestion(`\nEnter article number: `)
	const chosenFile = files[input as number - 1]
	const chosenName = chosenFile.slice(0, -3)

	readFile(`./articles/${chosenFile}`, 'utf8').then(async (content: string) => {
 console.log({chosenName})
		const exists = +(((await sql`SELECT COUNT(*) FROM articles WHERE name = ${chosenName}` as { count: number}[])[0])).count;
 console.log({exists})
		if (exists) {
			console.log(`Updating Article`)
			await sql`UPDATE articles SET content = ${content} WHERE name = ${chosenName}`
		}
		else {
			console.log(`Creating Article`)
			await sql`INSERT INTO articles (name, content) VALUES (${chosenName}, ${content})`;
		}

		process.exit(0);

	});

});



