import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '$env/static/private';
import { fromEnv } from '@aws-sdk/credential-providers';

process.env.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = AWS_REGION;
export const sendEmail = (subject: string, body: string) => {
	const client = new SESClient({
		region: 'us-east-1',
		credentials: fromEnv()
	});

	const params = {
		Destination: {
			ToAddresses: ['sievertbenjamin@gmail.com']
		},
		Message: {
			Body: {
				Text: {
					Data: body
				}
			},
			Subject: {
				Data: subject
			}
		},
		Source: 'notifications@bensmusic.io' // must be a verified email in SES
	};

	const command = new SendEmailCommand(params);
	return client.send(command);
};
