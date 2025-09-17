import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '$env/static/private';
import { fromEnv } from '@aws-sdk/credential-providers';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

process.env.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = AWS_REGION;

export const POST: RequestHandler = async ({ request }) => {
	const {
		name,
		teacherExpectations,
		level,
		myGoals,
		practiceIntent,
		misc,
		selectedAreasOfInterest,
		favorites
	} = await request.json();
	console.log(
		name,
		teacherExpectations,
		level,
		myGoals,
		practiceIntent,
		misc,
		selectedAreasOfInterest,
		favorites
	);

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
          Name: ${name}
          
          Ability: ${level}
          
          Provide: ${teacherExpectations}
          
          Direction: ${myGoals}
          
          Practice Time: ${practiceIntent}
          
          Interests: ${selectedAreasOfInterest}
          
          Favorites: ${favorites}
          
          Comments: ${misc}
          `
				}
			},
			Subject: {
				Data: `New Student - ${name}`
			}
		},
		Source: 'notifications@bensmusic.io' // must be a verified email in SES
	};

	// Send the email

	try {
		const command = new SendEmailCommand(params);
		const response = await client.send(command);
		return json({ message: `Success` }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ message: `Error` }, { status: 500 });
	}
};
