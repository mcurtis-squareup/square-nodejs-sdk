import { array, lazy, object, optional, Schema } from '../schema';
import { BreakType, breakTypeSchema } from './breakType';
import { Error, errorSchema } from './error';

/**
 * A response to a request to update a `BreakType`. Contains
 * the requested `BreakType` objects. May contain a set of `Error` objects if
 * the request resulted in errors.
 */
export interface UpdateBreakTypeResponse {
  /**
   * A defined break template that sets an expectation for possible `Break`
   * instances on a `Shift`.
   */
  breakType?: BreakType;
  /** Any errors that occurred during the request. */
  errors?: Error[];
}

export const updateBreakTypeResponseSchema: Schema<UpdateBreakTypeResponse> = object(
  {
    breakType: ['break_type', optional(lazy(() => breakTypeSchema))],
    errors: ['errors', optional(array(lazy(() => errorSchema)))],
  }
);
