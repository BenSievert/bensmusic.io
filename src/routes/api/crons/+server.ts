
import sql from '../../../postgres.server';
import {
  CRON_SECRET
} from '$env/static/private';



export const GET = async ({req, res}) => {
  if (req.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  const [guitarist] = await sql`SELECT * FROM guitarists WHERE active = FALSE ORDER BY id LIMIT 1`
  console.log(guitarist)
  return new Response('Hello Cron!');

}






