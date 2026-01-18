/**
 * @fileoverview Column width utilities for tinky-table.
 * @module tinky-table/utils/column-width
 *
 * Provides utilities for converting column definitions to grid template format.
 */

import { type ColumnDef, type RowData } from "../types.js";

/**
 * Grid template value type compatible with tinky's gridTemplateColumns.
 * Uses taffy-layout's TrackSizingFunction format.
 */
export type GridTemplateValue =
  | number
  | { min: number | "auto"; max: number | `${number}fr` | "auto" };

/**
 * Creates a fractional unit value for grid templates.
 *
 * @param value - The fr value (e.g., 1 for 1fr)
 * @returns A TrackSizingFunction object
 */
function fr(value: number): { min: "auto"; max: `${number}fr` } {
  return { min: "auto", max: `${value}fr` as `${number}fr` };
}

/**
 * Converts column width definitions to grid template format.
 *
 * Maps ColumnDef widths to taffy-layout's GridTemplateComponent:
 * - `number` → fixed size
 * - `'auto'` → fr(1) (flexible)
 * - `'${number}%'` → percentage as fr units
 *
 * @template T - Row data type
 * @param columns - Column definitions
 * @returns Array of values for use with gridTemplateColumns
 *
 * @example
 * ```ts
 * const template = columnsToGridTemplate([
 *   { key: 'name', width: 20 },
 *   { key: 'email', width: 'auto' },
 *   { key: 'age', width: 10 }
 * ]);
 * // Returns: [20, fr(1), 10]
 * ```
 */
export function columnsToGridTemplate<T extends RowData>(
  columns: ColumnDef<T>[],
): GridTemplateValue[] {
  return columns.map((col) => {
    const width = col.width ?? "auto";

    if (typeof width === "number") {
      return width;
    }

    if (width === "auto") {
      // Use fr(1) for flexible columns
      return fr(1);
    }

    if (typeof width === "string" && width.endsWith("%")) {
      // For percentage, use fr with the percentage value as relative weight
      const percent = parseInt(width, 10);
      return fr(percent);
    }

    return fr(1);
  });
}
