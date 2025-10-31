import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { sendEmail } from '../../backend_functions';

export const POST: RequestHandler = async ({ request }) => {
	const {
		name,
		teacherExpectations,
		experience,
		myGoals,
		practiceIntent,
		misc,
		selectedAreasOfInterest,
		favorites
	} = await request.json();
	console.log(
		name,
		teacherExpectations,
		experience,
		myGoals,
		practiceIntent,
		misc,
		selectedAreasOfInterest,
		favorites
	);

	try {
		await sendEmail(
			`New Student - ${name}`,
			`
          Name: ${name}
          
          Experience: ${experience}
          
          Provide: ${teacherExpectations}
          
          Direction: ${myGoals}
          
          Practice Time: ${practiceIntent}
          
          Interests: ${selectedAreasOfInterest}
          
          Favorites: ${favorites}
          
          Comments: ${misc}
          `
		);
		return json({ message: `Success` }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ message: `Error` }, { status: 500 });
	}
};
