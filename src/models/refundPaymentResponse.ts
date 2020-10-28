import { array, lazy, object, optional, Schema } from '../schema';
import { Error, errorSchema } from './error';
import { PaymentRefund, paymentRefundSchema } from './paymentRefund';

/**
 * Defines the fields that are included in the response body of
 * a request to the [RefundPayment](#endpoint-refunds-refundpayment) endpoint.
 * Note: if there are errors processing the request, the refund field may not be
 * present, or it may be present in a FAILED state.
 */
export interface RefundPaymentResponse {
  /** Information on errors encountered during the request. */
  errors?: Error[];
  /**
   * Represents a refund of a payment made using Square. Contains information on
   * the original payment and the amount of money refunded.
   */
  refund?: PaymentRefund;
}

export const refundPaymentResponseSchema: Schema<RefundPaymentResponse> = object(
  {
    errors: ['errors', optional(array(lazy(() => errorSchema)))],
    refund: ['refund', optional(lazy(() => paymentRefundSchema))],
  }
);
