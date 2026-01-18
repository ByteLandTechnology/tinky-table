/**
 * @fileoverview Type definitions for tinky-table component.
 * @module tinky-table/types
 */

import { type ReactNode } from "react";
import { type Styles } from "tinky";

/**
 * Column alignment options.
 */
export type ColumnAlign = "left" | "center" | "right";

/**
 * Column width specification.
 * - `number`: Fixed width in characters
 * - `${number}%`: Percentage of table width
 * - `'auto'`: Automatically calculated based on content and available space
 */
export type ColumnWidth = number | `${number}%` | "auto";

/**
 * Sort direction for sortable columns.
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Border style options for the table.
 */
export type TableBorderStyle =
  | "single"
  | "double"
  | "round"
  | "bold"
  | "singleDouble"
  | "doubleSingle"
  | "classic"
  | "none";

/**
 * Column definition for the table.
 * @template T - The type of data in each row
 */
export interface ColumnDef<T> {
  /**
   * Unique identifier for the column.
   */
  readonly key: string;

  /**
   * Header title to display.
   */
  readonly title: ReactNode;

  /**
   * The key in the data object to extract the cell's value from.
   *
   * Useful when the column `key` does not match the property name in the data object.
   * If not specified, the column's `key` will be used as the property identifier.
   */
  readonly dataKey?: keyof T;

  /**
   * Column width.
   * @default 'auto'
   */
  readonly width?: ColumnWidth;

  /**
   * Minimum column width in characters.
   */
  readonly minWidth?: number;

  /**
   * Maximum column width in characters.
   */
  readonly maxWidth?: number;

  /**
   * Text alignment within the column.
   * @default 'left'
   */
  readonly align?: ColumnAlign;

  /**
   * Whether this column is sortable.
   * @default false
   */
  readonly sortable?: boolean;

  /**
   * Custom render function for the cell content.
   *
   * Allows rendering complex React nodes (components, styled text, etc.) instead of
   * just the raw value.
   *
   * @param value - The value extracted from the row using key/dataKey.
   * @param row - The complete data object for the current row.
   * @param rowIndex - The index of the row in the current page/dataset.
   * @returns A ReactNode to be rendered within the cell.
   */
  readonly render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
}

/**
 * Base type constraint for row data.
 */
export type RowData = Record<string, unknown>;

/**
 * Pagination configuration.
 */
export interface PaginationConfig {
  /**
   * Current page (1-indexed).
   */
  readonly page: number;

  /**
   * Number of rows per page.
   */
  readonly pageSize: number;

  /**
   * Total number of rows.
   */
  readonly total: number;

  /**
   * Callback when page changes.
   */
  readonly onChange?: (page: number) => void;
}

/**
 * Props for the Table component.
 * @template T - The type of data in each row
 */
export interface TableProps<T extends RowData> {
  /**
   * Array of data to display in the table.
   */
  readonly data: T[];

  /**
   * Column definitions.
   */
  readonly columns: ColumnDef<T>[];

  /**
   * The visual style of the table borders.
   *
   * Options:
   * - `'single'`: Thin single lines (default).
   * - `'double'`: Double lines.
   * - `'round'`: Rounded corners with single lines.
   * - `'bold'`: Thick/Bold lines.
   * - `'classic'`: ASCII characters (+, -, |).
   * - `'none'`: No visible borders.
   *
   * @default 'single'
   */
  readonly borderStyle?: TableBorderStyle;

  /**
   * The total width of the table.
   *
   * - `number`: Fixed width in characters.
   * - `'auto'`: Expands to fill the available terminal width.
   * - `${number}%`: Percentage of the parent container's width.
   *
   * @default 'auto'
   */
  readonly width?: number | `${number}%` | "auto";

  /**
   * Whether to show the table header.
   * @default true
   */
  readonly showHeader?: boolean;

  /**
   * Content to show when data is empty.
   * @default 'No data'
   */
  readonly emptyText?: ReactNode;

  /**
   * Sort state for the table.
   */
  readonly sortState?: {
    readonly key: string;
    readonly direction: SortDirection;
  };

  /**
   * Callback when sort state changes.
   */
  readonly onSortChange?: (key: string, direction: SortDirection) => void;

  /**
   * Pagination configuration.
   */
  readonly pagination?: PaginationConfig;

  /**
   * Custom style for the header row.
   */
  readonly headerStyle?: Partial<Styles>;

  /**
   * Custom style function for data rows.
   * @param row - The row data
   * @param index - The row index
   * @returns Style object for the row
   */
  readonly rowStyle?: (row: T, index: number) => Partial<Styles>;

  /**
   * Custom style for cells.
   */
  readonly cellStyle?: Partial<Styles>;
}

/**
 * Props for TableCell component.
 */
export interface TableCellProps {
  /**
   * Cell content.
   */
  readonly children: ReactNode;

  /**
   * Cell width in characters.
   */
  readonly width: number;

  /**
   * Text alignment.
   * @default 'left'
   */
  readonly align?: ColumnAlign;

  /**
   * Whether this is the last cell in the row.
   * @default false
   */
  readonly isLast?: boolean;

  /**
   * Border character for column separator.
   */
  readonly borderChar?: string;
}

/**
 * Props for TableRow component.
 */
export interface TableRowProps {
  /**
   * Row content (TableCell components).
   */
  readonly children: ReactNode;

  /**
   * Column widths for grid layout.
   */
  readonly columnWidths: number[];

  /**
   * Custom row style.
   */
  readonly style?: Partial<Styles>;
}

/**
 * Props for TableHeader component.
 */
export interface TableHeaderProps {
  /**
   * Column definitions.
   */
  readonly columns: ColumnDef<RowData>[];

  /**
   * Calculated column widths.
   */
  readonly columnWidths: number[];

  /**
   * Border character for column separator.
   */
  readonly borderChar?: string;

  /**
   * Current sort state.
   */
  readonly sortState?: {
    readonly key: string;
    readonly direction: SortDirection;
  };

  /**
   * Custom header style.
   */
  readonly style?: Partial<Styles>;
}

/**
 * Border characters for table rendering.
 */
export interface BorderChars {
  readonly top: string;
  readonly bottom: string;
  readonly left: string;
  readonly right: string;
  readonly topLeft: string;
  readonly topRight: string;
  readonly bottomLeft: string;
  readonly bottomRight: string;
  readonly cross: string;
  readonly topCross: string;
  readonly bottomCross: string;
  readonly leftCross: string;
  readonly rightCross: string;
  readonly horizontal: string;
  readonly vertical: string;
}
