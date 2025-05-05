import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { addUser, deleteUser, updateUser } from "@/actions/user.action";
import { UserInsert, UserUpdate } from "@/types";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const user: UserInsert = {
      id,
      email: email_addresses[0].email_address,
      firstName: first_name || "",
      lastName: last_name || "",
      photo: image_url,
      role: "USER",
    };
    try {
      await addUser(user);
      return NextResponse.json({ message: "New user created" });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const user: UserUpdate = {
      email: email_addresses[0].email_address,
      firstName: first_name || "",
      lastName: last_name || "",
      photo: image_url,
    };

    try {
      await updateUser(id, user);
      return NextResponse.json({ message: "User Updated Successfully" });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

  if (eventType === "user.deleted") {
    const { id, deleted } = evt.data;
    if (id && deleted) {
      try {
        await deleteUser(id);
        return NextResponse.json({ message: "User Updated Successfully" });
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
