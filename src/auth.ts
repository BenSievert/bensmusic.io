import { SvelteKitAuth } from "@auth/sveltekit"
import Cognito from "@auth/sveltekit/providers/cognito"
import { config } from 'dotenv';
config({ path: '.env.local' });

import {
  AUTH_COGNITO_ID,
  AUTH_COGNITO_SECRET,
  AUTH_COGNITO_ISSUER
} from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  debug:true,
  providers: [Cognito({
    AUTH_COGNITO_ID,
    AUTH_COGNITO_SECRET,
    AUTH_COGNITO_ISSUER})],
})