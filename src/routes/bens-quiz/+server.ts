import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '$env/static/private';
import { fromEnv } from '@aws-sdk/credential-providers';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

process.env.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = AWS_REGION;

export const POST: RequestHandler = async ({ request }) => {
	const { numberCorrect, questionsAndAnswers } = await request.json();

	console.log(numberCorrect, questionsAndAnswers);

	const client = new SESClient({
		region: 'us-east-1',
		credentials: fromEnv()
	});

	// Email details
	const params = {
		Destination: {
			ToAddresses: ['sievertbenjamin@gmail.com']
		},
		Message: {
			Body: {
				Text: {
					Data: `
					Ben got ${numberCorrect} correct.
					
					${questionsAndAnswers.map(([question, answer]) => `${question}\n\n ${answer} \n\n\n\n`).join(``)}
         `
				}
			},
			Subject: {
				Data: `Quiz Submitted - Ben Rosset`
			}
		},
		Source: 'notifications@bensmusic.io' // must be a verified email in SES
	};

	// Send the email

	try {
		const command = new SendEmailCommand(params);
		await client.send(command);
		return json({ message: `Success` }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ message: `Error` }, { status: 500 });
	}
};
