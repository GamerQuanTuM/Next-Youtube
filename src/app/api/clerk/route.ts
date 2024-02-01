import { prismadb } from "@/utils/prismadb";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  const payload = await validateRequest(request);

  const data = payload.data as UserJSON;

  console.log(data);

  const user = await prismadb.user.upsert({
    where: { clerk_id: payload.data.id as string },
    create: {
      clerk_id: data.id as string,
      first_name: data.first_name,
      last_name: data.last_name,
      clerk_createdAt: String(data.created_at),
      clerk_updatedAt: String(data.updated_at),
      email_address: data.email_addresses[0].email_address,
      phone_number: data.phone_numbers[0].phone_number,
    },
    update: {
      first_name: data.first_name,
      last_name: data.last_name,
      clerk_createdAt: String(data.created_at),
      clerk_updatedAt: String(data.updated_at),
      email_address: data.email_addresses[0].email_address,
      phone_number: data.phone_numbers[0].phone_number,
    },
  });

  await prismadb.channel.create({
    data: {
      name: data.first_name + " " + data.last_name,
      image_url: data.image_url,
      userId: user.id,
      subscribe: [],
      unsubscribe: [],
    },
  });

  return Response.json({ message: "Received" });
}

// {
//   data: {
//     backup_code_enabled: false,
//     banned: false,
//     create_organization_enabled: true,
//     created_at: 1706429105691,
//     delete_self_enabled: true,
//     email_addresses: [
//       {
//         email_address: 'santrashuvam@gmail.com',
//         id: 'idn_2bZiePN9B5SVZXRuqSdMBFClohO',
//         linked_to: [],
//         object: 'email_address',
//         reserved: false,
//         verification: {
//           attempts: 1,
//           expire_at: 1706429697356,
//           status: 'verified',
//           strategy: 'email_code'
//         }
//       }
//     ],
//     external_accounts: [],
//     external_id: null,
//     first_name: null,
//     has_image: false,
//     id: 'user_2bZifXYvQ6bVbwWugjociQcpSmD',
//     image_url:
//       'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yYlhwN0VTeWFhTzZONWRmbmlFeUVjWG1GOWwiLCJyaWQiOiJ1c2VyXzJiWmlmWFl2UTZiVmJ3V3Vnam9jaVFjcFNtRCJ9',
//     last_active_at: 1706429105689,
//     last_name: null,
//     last_sign_in_at: null,
//     locked: false,
//     lockout_expires_in_seconds: null,
//     object: 'user',
//     password_enabled: true,
//     phone_numbers: [],
//     primary_email_address_id: 'idn_2bZiePN9B5SVZXRuqSdMBFClohO',
//     primary_phone_number_id: null,
//     primary_web3_wallet_id: null,
//     private_metadata: {},
//     profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
//     public_metadata: {},
//     saml_accounts: [],
//     totp_enabled: false,
//     two_factor_enabled: false,
//     unsafe_metadata: {},
//     updated_at: 1706429105732,
//     username: null,
//     verification_attempts_remaining: 100,
//     web3_wallets: []
//   },
//   object: 'event',
//   type: 'user.created'
// }
