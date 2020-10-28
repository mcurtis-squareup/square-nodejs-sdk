import {
  array,
  boolean,
  lazy,
  number,
  object,
  optional,
  Schema,
  string,
} from '../schema';
import { CatalogQuery, catalogQuerySchema } from './catalogQuery';

export interface SearchCatalogObjectsRequest {
  /**
   * The pagination cursor returned in the previous response. Leave unset for an initial request.
   * See [Pagination](https://developer.squareup.com/docs/basics/api101/pagination) for more information.
   */
  cursor?: string;
  /**
   * The desired set of object types to appear in the search results.
   * The legal values are taken from the CatalogObjectType enum: `"ITEM"`, `"ITEM_VARIATION"`, `"CATEGORY"`,
   * `"DISCOUNT"`, `"TAX"`, `"MODIFIER"`, or `"MODIFIER_LIST"`.
   * See [CatalogObjectType](#type-catalogobjecttype) for possible values
   */
  objectTypes?: string[];
  /**
   * If `true`, deleted objects will be included in the results. Deleted objects will have their
   * `is_deleted` field set to `true`.
   */
  includeDeletedObjects?: boolean;
  /**
   * If `true`, the response will include additional objects that are related to the
   * requested object, as follows:
   * If a CatalogItem is returned in the object field of the response,
   * its associated CatalogCategory, CatalogTax objects,
   * CatalogImage objects and CatalogModifierList objects
   * will be included in the `related_objects` field of the response.
   * If a CatalogItemVariation is returned in the object field of the
   * response, its parent CatalogItem will be included in the `related_objects` field of
   * the response.
   */
  includeRelatedObjects?: boolean;
  /**
   * Return objects modified after this [timestamp](https://developer.squareup.com/docs/build-basics/working-with-dates), in RFC 3339
   * format, e.g., `2016-09-04T23:59:33.123Z`. The timestamp is exclusive - objects with a
   * timestamp equal to `begin_time` will not be included in the response.
   */
  beginTime?: string;
  /**
   * A query composed of one or more different types of filters to narrow the scope of targeted objects when calling the `SearchCatalogObjects` endpoint.
   * Although a query can have multiple filters, only one query is allowed per call to [SearchCatalogObjects](#endpoint-Catalog-SearchCatalogObjects).
   * When a query filter is based on an attribute, the attribute must be searchable.
   * Searchable attributes are listed as follows, along their parent types that can be searched for with applicable query filters.
   * Searchable attribute and objects queryable by searchable attributes **
   * - `name`:  `CatalogItem`, `CatalogItemVariation`, `CatelogCatogry`, `CatalogTax`, `CatalogDiscount`, `CatalogModifier`, 'CatalogModifierList`, `CatalogItemOption`, `CatalogItemOptionValue`
   * - `description`: `CatalogItem`, `CatalogItemOptionValue`
   * - `abbreviation`: `CatalogItem`
   * - `upc`: `CatalogItemVariation`
   * - `sku`: `CatalogItemVariation`
   * - `caption`: `CatalogImage`
   * - `display_name`: `CatalogItemOption`
   * For example, to search for [CatalogItem](#type-CatalogItem) objects by searchable attributes, you can use
   * the `"name"`, `"description"`, or `"abbreviation"` attribute in an applicable query filter.
   */
  query?: CatalogQuery;
  /**
   * A limit on the number of results to be returned in a single page. The limit is advisory -
   * the implementation may return more or fewer results. If the supplied limit is negative, zero, or
   * is higher than the maximum limit of 1,000, it will be ignored.
   */
  limit?: number;
}

export const searchCatalogObjectsRequestSchema: Schema<SearchCatalogObjectsRequest> = object(
  {
    cursor: ['cursor', optional(string())],
    objectTypes: ['object_types', optional(array(string()))],
    includeDeletedObjects: ['include_deleted_objects', optional(boolean())],
    includeRelatedObjects: ['include_related_objects', optional(boolean())],
    beginTime: ['begin_time', optional(string())],
    query: ['query', optional(lazy(() => catalogQuerySchema))],
    limit: ['limit', optional(number())],
  }
);
