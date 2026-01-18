/**
 * tinky-table - A feature-rich Table component for tinky.
 *
 * @packageDocumentation
 * @module tinky-table
 *
 * @example
 * ```tsx
 * import { Table } from 'tinky-table';
 *
 * const data = [
 *   { name: 'Alice', age: 28 },
 *   { name: 'Bob', age: 32 },
 * ];
 *
 * const columns = [
 *   { key: 'name', title: 'Name', width: 20 },
 *   { key: 'age', title: 'Age', width: 10, align: 'right' },
 * ];
 *
 * <Table data={data} columns={columns} />
 * ```
 */

// Main component
export { Table } from "./components/Table.js";

// Sub-components
export { TableCell } from "./components/TableCell.js";
export { TableRow } from "./components/TableRow.js";
export { TableHeader } from "./components/TableHeader.js";

// Types
export type {
  TableProps,
  ColumnDef,
  ColumnAlign,
  ColumnWidth,
  SortDirection,
  TableBorderStyle,
  RowData,
  PaginationConfig,
  TableCellProps,
  TableRowProps,
  TableHeaderProps,
  BorderChars,
} from "./types.js";

// External Types
export type { Styles } from "tinky";

// Utilities
export { getBorderChars, renderSeparator } from "./utils/border.js";
export {
  columnsToGridTemplate,
  type GridTemplateValue,
} from "./utils/column-width.js";
