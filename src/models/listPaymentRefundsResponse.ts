import { array, lazy, object, optional, Schema, string } from '../schema';
import { Error, errorSchema } from './error';
import { PaymentRefund, paymentRefundSchema } from './paymentRefund';

/**
 * Defines the fields that are included in the response body of
 * a request to the [ListPaymentRefunds](#endpoint-refunds-listpaymentrefunds) endpoint.
 * One of `errors` or `refunds` is present in a given response (never both).
 */
export interface ListPaymentRefundsResponse {
  /** Information on errors encountered during the request. */
  errors?: Error[];
  /** The list of requested refunds. */
  refunds?: PaymentRefund[];
  /**
   * The pagination cursor to be used in a subsequent request. If empty,
   * this is the final response.
   * See [Pagination](https://developer.squareup.com/docs/basics/api101/pagination) for more information.
   */
  cursor?: string;
}

export const listPaymentRefundsResponseSchema: Schema<ListPaymentRefundsResponse> = object(
  {
    errors: ['errors', optional(array(lazy(() => errorSchema)))],
    refunds: ['refunds', optional(array(lazy(() => paymentRefundSchema)))],
    cursor: ['cursor', optional(string())],
  }
);
