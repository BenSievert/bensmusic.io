/*
import {PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { fromEnv } from "@aws-sdk/credential-providers";
import type { RequestHandler } from './$types';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from "$env/static/private";
process.env.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = AWS_REGION;

export const GET: RequestHandler = async (req) => {
  const client = new PinpointClient({
    credentials: fromEnv()
  });
  console.log(client)

  const message =
    "This message was sent through Amazon Pinpoint " +
    "using the AWS SDK for JavaScript in Node.js. Reply STOP to " +
    "opt out.";

  const command = new SendMessagesCommand({
    ApplicationId: `3047ba65a57646d890877439241f04f4`,
    MessageRequest: {
      Addresses: {
        [`+12173791821`]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: message,
          MessageType: `TRANSACTIONAL`,
        },
      },
    },
  });

  try {
    const data = await client.send(command);
    console.log(
      `Message sent! ${JSON.stringify(data)}`,
    );
  } catch (err) {
    console.log(err);
  }

  return new Response('Hello Cron!');

}


 */
