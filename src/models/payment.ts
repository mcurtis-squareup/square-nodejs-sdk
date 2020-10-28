import { array, lazy, object, optional, Schema, string } from '../schema';
import { Address, addressSchema } from './address';
import {
  CardPaymentDetails,
  cardPaymentDetailsSchema,
} from './cardPaymentDetails';
import { Money, moneySchema } from './money';
import { ProcessingFee, processingFeeSchema } from './processingFee';

/** Represents a payment processed by the Square API. */
export interface Payment {
  /** Unique ID for the payment. */
  id?: string;
  /** Timestamp of when the payment was created, in RFC 3339 format. */
  createdAt?: string;
  /** Timestamp of when the payment was last updated, in RFC 3339 format. */
  updatedAt?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amountMoney?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  tipMoney?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  totalMoney?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  appFeeMoney?: Money;
  /** Processing fees and fee adjustments assessed by Square on this payment. */
  processingFee?: ProcessingFee[];
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  refundedMoney?: Money;
  /** Indicates whether the payment is `APPROVED`, `COMPLETED`, `CANCELED`, or `FAILED`. */
  status?: string;
  /**
   * The duration of time after the payment's creation when Square automatically applies the
   * `delay_action` to the payment. This automatic `delay_action` applies only to payments that
   * don't reach a terminal state (COMPLETED, CANCELED, or FAILED) before the `delay_duration`
   * time period.
   * This field is specified as a time duration, in RFC 3339 format.
   * Notes:
   * This feature is only supported for card payments.
   * Default:
   * - Card Present payments: "PT36H" (36 hours) from the creation time.
   * - Card Not Present payments: "P7D" (7 days) from the creation time.
   */
  delayDuration?: string;
  /**
   * The action to be applied to the payment when the `delay_duration` has elapsed. This field
   * is read only.
   * Current values include:
   * `CANCEL`
   */
  delayAction?: string;
  /**
   * Read only timestamp of when the `delay_action` will automatically be applied,
   * in RFC 3339 format.
   * Note that this field is calculated by summing the payment's `delay_duration` and `created_at`
   * fields. The `created_at` field is generated by Square and may not exactly match the
   * time on your local machine.
   */
  delayedUntil?: string;
  /**
   * The source type for this payment
   * Current values include: `CARD`.
   */
  sourceType?: string;
  /** Reflects the current status of a card payment. */
  cardDetails?: CardPaymentDetails;
  /** ID of the location associated with the payment. */
  locationId?: string;
  /** ID of the order associated with this payment. */
  orderId?: string;
  /**
   * An optional ID that associates this payment with an entity in
   * another system.
   */
  referenceId?: string;
  /** The [Customer](#type-customer) ID of the customer associated with the payment. */
  customerId?: string;
  /** An optional ID of the employee associated with taking this payment. */
  employeeId?: string;
  /** List of `refund_id`s identifying refunds for this payment. */
  refundIds?: string[];
  /** The buyer's e-mail address */
  buyerEmailAddress?: string;
  /** Represents a physical address. */
  billingAddress?: Address;
  /** Represents a physical address. */
  shippingAddress?: Address;
  /** An optional note to include when creating a payment */
  note?: string;
  /**
   * Additional payment information that gets added on the customer's card statement
   * as part of the statement description.
   * Note that the `statement_description_identifier` may get truncated on the statement description
   * to fit the required information including the Square identifier (SQ *) and name of the
   * merchant taking the payment.
   */
  statementDescriptionIdentifier?: string;
  /**
   * The payment's receipt number.
   * The field will be missing if a payment is CANCELED
   */
  receiptNumber?: string;
  /**
   * The URL for the payment's receipt.
   * The field will only be populated for COMPLETED payments.
   */
  receiptUrl?: string;
}

export const paymentSchema: Schema<Payment> = object({
  id: ['id', optional(string())],
  createdAt: ['created_at', optional(string())],
  updatedAt: ['updated_at', optional(string())],
  amountMoney: ['amount_money', optional(lazy(() => moneySchema))],
  tipMoney: ['tip_money', optional(lazy(() => moneySchema))],
  totalMoney: ['total_money', optional(lazy(() => moneySchema))],
  appFeeMoney: ['app_fee_money', optional(lazy(() => moneySchema))],
  processingFee: [
    'processing_fee',
    optional(array(lazy(() => processingFeeSchema))),
  ],
  refundedMoney: ['refunded_money', optional(lazy(() => moneySchema))],
  status: ['status', optional(string())],
  delayDuration: ['delay_duration', optional(string())],
  delayAction: ['delay_action', optional(string())],
  delayedUntil: ['delayed_until', optional(string())],
  sourceType: ['source_type', optional(string())],
  cardDetails: ['card_details', optional(lazy(() => cardPaymentDetailsSchema))],
  locationId: ['location_id', optional(string())],
  orderId: ['order_id', optional(string())],
  referenceId: ['reference_id', optional(string())],
  customerId: ['customer_id', optional(string())],
  employeeId: ['employee_id', optional(string())],
  refundIds: ['refund_ids', optional(array(string()))],
  buyerEmailAddress: ['buyer_email_address', optional(string())],
  billingAddress: ['billing_address', optional(lazy(() => addressSchema))],
  shippingAddress: ['shipping_address', optional(lazy(() => addressSchema))],
  note: ['note', optional(string())],
  statementDescriptionIdentifier: [
    'statement_description_identifier',
    optional(string()),
  ],
  receiptNumber: ['receipt_number', optional(string())],
  receiptUrl: ['receipt_url', optional(string())],
});
