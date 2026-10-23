import { defineTool } from "@usemcpkit/core";

export const usersMobilePushSubscriptionsCreateUserPushSubscriptions = defineTool({
  name: "users:mobile_push_subscriptions:create_user_push_subscriptions",
  description:
    "Register a mobile device for push notifications. Idempotently registers the calling user's device token for APNs push notifications. Re-registering an existing token refreshes its attributes; a token previously owned by another user is reassigned to the calling user.",
  input: {
    type: "object",
    properties: {
      device_token: {
        type: "string",
        description: "The hexadecimal APNs device token",
      },
      platform: {
        type: "string",
        description: "The device platform",
        enum: ["ios", "macos"],
      },
      apns_environment: {
        type: "string",
        description: "The APNs environment the token was issued for",
        default: "production",
        enum: ["production", "sandbox"],
      },
      bundle_id: {
        type: "string",
        description: "The application bundle identifier",
      },
      device_name: {
        type: "string",
        description: "A human-readable device name",
      },
      app_version: {
        type: "string",
        description: "The installed application version",
      },
      locale: {
        type: "string",
        description: "The device locale",
      },
      payload_mode: {
        type: "string",
        description: "Whether notifications carry the full content or only identifiers",
        enum: ["full", "id_only"],
      },
    },
    required: ["device_token"],
  },
  request: {
    method: "POST",
    path: "/user/push_subscriptions",
    body: [
      "device_token",
      "platform",
      "apns_environment",
      "bundle_id",
      "device_name",
      "app_version",
      "locale",
      "payload_mode",
    ],
  },
});
