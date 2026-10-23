import { defineTool } from '@usemcpkit/core';

export const usersUsersUpdateUserCreditCardValidation = defineTool({
  name: 'users:users:update_user_credit_card_validation',
  description: "[Deprecated] Update a user's credit_card_validation. Deprecated in 17.7",
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'ID or username of the user.',
      },
      credit_card_validated_at: {
        type: 'string',
        description: "Time when the user's credit card was validated.",
      },
      credit_card_expiration_month: {
        type: 'integer',
        description: 'Month the credit card expires.',
      },
      credit_card_expiration_year: {
        type: 'integer',
        description: 'Year the credit card expires.',
      },
      credit_card_holder_name: {
        type: 'string',
        description: 'Name of the credit card holder.',
      },
      credit_card_mask_number: {
        type: 'string',
        description: 'Last 4 digits of the credit card number.',
      },
      credit_card_type: {
        type: 'string',
        description: 'Name of the credit card network.',
      },
      zuora_payment_method_xid: {
        type: 'string',
        description: 'ID of the Zuora payment method.',
      },
      stripe_setup_intent_xid: {
        type: 'string',
        description: 'ID of the Stripe setup intent.',
      },
      stripe_payment_method_xid: {
        type: 'string',
        description: 'ID of the Stripe payment method.',
      },
      stripe_card_fingerprint: {
        type: 'string',
        description: 'Stripe credit card fingerprint.',
      },
    },
    required: [
      'user_id',
      'credit_card_validated_at',
      'credit_card_expiration_month',
      'credit_card_expiration_year',
      'credit_card_holder_name',
      'credit_card_mask_number',
      'credit_card_type',
    ],
  },
  request: {
    method: 'PUT',
    path: '/user/{user_id}/credit_card_validation',
    body: [
      'credit_card_validated_at',
      'credit_card_expiration_month',
      'credit_card_expiration_year',
      'credit_card_holder_name',
      'credit_card_mask_number',
      'credit_card_type',
      'zuora_payment_method_xid',
      'stripe_setup_intent_xid',
      'stripe_payment_method_xid',
      'stripe_card_fingerprint',
    ],
  },
});
