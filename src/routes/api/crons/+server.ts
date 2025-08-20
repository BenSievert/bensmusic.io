import type { RequestHandler } from './$types';
import sql from '../../../postgres.server';
import {
  CRON_SECRET
} from '$env/static/private';



export const GET = async ({request}) => {
  if (request.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
    return new Response('Unauthorized', {status: 401});
  }
  const [guitarist] = await sql`SELECT * FROM guitarists WHERE active = FALSE ORDER BY id LIMIT 1`
  await sql`UPDATE guitarists SET active = TRUE WHERE id = ${guitarist.id}`

  return new Response(`New Guitarist ${guitarist.name}`);

}






