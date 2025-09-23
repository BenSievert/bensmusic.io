import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { sendEmail } from '../../backend_functions';

export const POST: RequestHandler = async ({ request }) => {
	const { numberCorrect, questionsAndAnswers } = await request.json();

	try {
		await sendEmail(
			`Quiz Submitted - Ben Rosset`,
			`
					Ben got ${numberCorrect} correct.
					
					${questionsAndAnswers.map(([question, answer]) => `${question}\n\n ${answer} \n\n\n\n`).join(``)}
         `
		);
		return json({ message: `Success` }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ message: `Error` }, { status: 500 });
	}
};
