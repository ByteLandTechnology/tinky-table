/**
 * @fileoverview Main Table component for tinky-table.
 * @module tinky-table/Table
 */

import React from "react";
import { Box, Text, Separator } from "tinky";
import {
  type TableProps,
  type RowData,
  type ColumnDef,
  type SortDirection,
} from "../types.js";
import { getBorderChars } from "../utils/border.js";
import {
  columnsToGridTemplate,
  type GridTemplateValue as GridCol,
} from "../utils/column-width.js";

/**
 * Get value from row data by column definition.
 */
/**
 * Retrieves the value of a specific cell from a data row using the column definition.
 *
 * @template T - The type of the row data object.
 * @param row - The data object for the current row.
 * @param col - The column definition containing the key or dataKey.
 * @returns The value extracted from the row.
 */
function getCellValue<T extends RowData>(row: T, col: ColumnDef<T>): unknown {
  const key = col.dataKey ?? (col.key as keyof T);
  return row[key];
}

/**
 * Render sort indicator for sortable columns.
 */
/**
 * Renders the visual indicator for the current sort direction.
 *
 * @param direction - The current sort direction ('asc', 'desc', or null).
 * @returns A string representing the sort arrow (e.g., " ▲", " ▼") or an empty string.
 */
function renderSortIndicator(direction: SortDirection): string {
  switch (direction) {
    case "asc":
      return " ▲";
    case "desc":
      return " ▼";
    default:
      return "";
  }
}

/**
 * Table component for terminal UI.
 *
 * Renders data in a structured table format with support for:
 * - Customizable columns with fixed/auto widths
 * - Multiple border styles
 * - Column sorting
 * - Custom cell rendering
 * - Pagination
 *
 * @template T - The row data type
 * @param props - Table properties
 * @returns The rendered table
 *
 * @example
 * ```tsx
 * import { Table } from 'tinky-table';
 *
 * const data = [
 *   { id: 1, name: 'Alice', age: 28 },
 *   { id: 2, name: 'Bob', age: 32 },
 * ];
 *
 * const columns = [
 *   { key: 'name', title: 'Name', width: 20 },
 *   { key: 'age', title: 'Age', width: 10, align: 'right' },
 * ];
 *
 * <Table data={data} columns={columns} borderStyle="single" />
 * ```
 *
 * Output:
 * ```
 * ┌────────────────────┬──────────┐
 * │ Name               │      Age │
 * ├────────────────────┼──────────┤
 * │ Alice              │       28 │
 * │ Bob                │       32 │
 * └────────────────────┴──────────┘
 * ```
 */
/**
 * Memoized table separator component.
 * Renders horizontal lines between header and body or at table boundaries.
 */
/**
 * Props for the TableSeparator component.
 * @internal
 */
interface TableSeparatorProps {
  /** Column definitions to determine separator segments. */
  columns: ColumnDef<RowData>[];
  /** Grid template configuration for column widths. */
  gridTemplate: (number | GridCol)[];
  /** Character set for drawing borders. */
  borderChars: ReturnType<typeof getBorderChars>;
  /** Whether to suppress border rendering (used for 'none' style). */
  noBorder: boolean;
  /** Vertical position of the separator in the table. */
  position: "top" | "middle" | "bottom";
}

/**
 * Internal component that renders horizontal separator lines.
 *
 * Used for:
 * - Top border of the table
 * - Separator between header and body
 * - Bottom border of the table
 *
 * Memoized to prevent unnecessary re-calculations of the separator string during re-renders.
 *
 * @internal
 * @param props - Component properties
 */
const TableSeparator = React.memo(function TableSeparator({
  columns,
  gridTemplate,
  borderChars,
  noBorder,
  position,
}: TableSeparatorProps) {
  const leftChar =
    position === "top"
      ? borderChars.topLeft
      : position === "bottom"
        ? borderChars.bottomLeft
        : borderChars.leftCross;
  const rightChar =
    position === "top"
      ? borderChars.topRight
      : position === "bottom"
        ? borderChars.bottomRight
        : borderChars.rightCross;
  const crossChar =
    position === "top"
      ? borderChars.topCross
      : position === "bottom"
        ? borderChars.bottomCross
        : borderChars.cross;

  // Memoize the horizontal line to avoid recreating on each render

  return (
    <Box display="grid" gridTemplateColumns={gridTemplate}>
      {!(noBorder as boolean) && <Text>{leftChar}</Text>}
      {columns.map((_, i) => (
        <React.Fragment key={i}>
          <Separator char={borderChars.horizontal} />
          {!(noBorder as boolean) && (
            <Text>{i === columns.length - 1 ? rightChar : crossChar}</Text>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
});
/**
 * Props for the memoized TableRow component.
 */
/**
 * Props for the internal TableRow component.
 * @internal
 * @template T - The row data type.
 */
interface TableRowInnerProps<T extends RowData> {
  /** The data object for this row. */
  row: T;
  /** The zero-based index of this row in the data array. */
  rowIndex: number;
  /** Array of column definitions. */
  columns: ColumnDef<T>[];
  /** Calculated grid template for layout. */
  gridTemplate: (number | GridCol)[];
  /** Border characters to use. */
  borderChars: ReturnType<typeof getBorderChars>;
  /** Whether to suppress borders. */
  noBorder: boolean;
  /** Optional function to calculate dynamic row styles. */
  rowStyle?: TableProps<T>["rowStyle"];
}

/**
 * Memoized row component to prevent unnecessary re-renders.
 * Each row is only re-rendered when its props change.
 */
/**
 * Internal memoized component for rendering a single data row.
 *
 * Performance optimization:
 * - Only re-renders if the specific row data, index, or table configuration changes.
 * - Prevents rerendering all rows when unrelated state changes (e.g. only one row updates).
 *
 * @internal
 * @template T - The row data type.
 */
const MemoizedTableRow = React.memo(function TableRowInner<T extends RowData>({
  row,
  rowIndex,
  columns,
  gridTemplate,
  borderChars,
  noBorder,
  rowStyle,
}: TableRowInnerProps<T>) {
  const customRowStyle = rowStyle?.(row, rowIndex);
  return (
    <Box display="grid" gridTemplateColumns={gridTemplate} {...customRowStyle}>
      {!(noBorder as boolean) && <Text>{borderChars.vertical}</Text>}
      {columns.map((col) => {
        const value = getCellValue(row, col);
        const content = col.render
          ? col.render(value, row, rowIndex)
          : String(value ?? "");
        const align =
          col.align === "right"
            ? "flex-end"
            : col.align === "center"
              ? "center"
              : "flex-start";

        return (
          <React.Fragment key={col.key}>
            <Box flexGrow={1} justifyContent={align}>
              {typeof content === "string" ? (
                <Text wrap="truncate">{content}</Text>
              ) : (
                content
              )}
            </Box>
            {!(noBorder as boolean) && <Text>{borderChars.vertical}</Text>}
          </React.Fragment>
        );
      })}
    </Box>
  );
}) as <T extends RowData>(props: TableRowInnerProps<T>) => React.ReactElement;

export function Table<T extends RowData>({
  data,
  columns,
  borderStyle = "single",
  showHeader = true,
  emptyText = "No data",
  sortState,
  pagination,
  headerStyle,
  rowStyle,
}: TableProps<T>) {
  const borderChars = getBorderChars(borderStyle);
  const contentWidths = React.useMemo(
    () => columnsToGridTemplate(columns),
    [columns],
  );
  const noBorder = borderStyle === "none";

  // Build grid template: border, col, border, col, ..., border
  const gridTemplate = React.useMemo(() => {
    const gt: (number | GridCol)[] = [];
    if (!noBorder) gt.push(1); // Left border
    contentWidths.forEach((w) => {
      gt.push(w);
      if (!noBorder) gt.push(1); // Right/Sep border
    });
    return gt;
  }, [contentWidths, noBorder]);

  // Pagination logic
  let displayData = data;
  if (pagination) {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    displayData = data.slice(start, end);
  }

  return (
    <Box flexDirection="column">
      {/* Top Border */}
      {!noBorder && (
        <TableSeparator
          position="top"
          columns={columns as ColumnDef<RowData>[]}
          gridTemplate={gridTemplate}
          borderChars={borderChars}
          noBorder={noBorder}
        />
      )}

      {/* Header */}
      {showHeader && (
        <>
          <Box
            display="grid"
            gridTemplateColumns={gridTemplate}
            {...headerStyle}
          >
            {!(noBorder as boolean) && <Text>{borderChars.vertical}</Text>}
            {columns.map((col) => {
              const sortIndicator =
                sortState?.key === col.key
                  ? renderSortIndicator(sortState.direction)
                  : "";

              const align =
                col.align === "right"
                  ? "flex-end"
                  : col.align === "center"
                    ? "center"
                    : "flex-start";

              return (
                <React.Fragment key={col.key}>
                  <Box flexGrow={1} justifyContent={align}>
                    <Text bold wrap="truncate">
                      {String(col.title ?? col.key)}
                      {sortIndicator}
                    </Text>
                  </Box>
                  {!(noBorder as boolean) && (
                    <Text>{borderChars.vertical}</Text>
                  )}
                </React.Fragment>
              );
            })}
          </Box>

          {/* Header separator */}
          {!noBorder && (
            <TableSeparator
              position="middle"
              columns={columns as ColumnDef<RowData>[]}
              gridTemplate={gridTemplate}
              borderChars={borderChars}
              noBorder={noBorder}
            />
          )}
        </>
      )}

      {/* Body */}
      {displayData.length === 0 ? (
        <Box
          justifyContent="center"
          borderStyle={!noBorder ? borderStyle : undefined}
        >
          <Text>{emptyText}</Text>
        </Box>
      ) : (
        displayData.map((row, rowIndex) => (
          <MemoizedTableRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            columns={columns as ColumnDef<RowData>[]}
            gridTemplate={gridTemplate}
            borderChars={borderChars}
            noBorder={noBorder}
            rowStyle={rowStyle as TableProps<RowData>["rowStyle"]}
          />
        ))
      )}

      {/* Bottom Border */}
      {!noBorder && displayData.length > 0 && (
        <TableSeparator
          position="bottom"
          columns={columns as ColumnDef<RowData>[]}
          gridTemplate={gridTemplate}
          borderChars={borderChars}
          noBorder={noBorder}
        />
      )}

      {/* Pagination info */}
      {pagination && (
        <Box marginTop={1} justifyContent="center">
          <Text dimColor>
            Page {pagination.page} of{" "}
            {Math.ceil(pagination.total / pagination.pageSize)}
          </Text>
        </Box>
      )}
    </Box>
  );
}
