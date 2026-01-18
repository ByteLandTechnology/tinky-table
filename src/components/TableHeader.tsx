/**
 * @fileoverview TableHeader component for rendering table headers.
 * @module tinky-table/TableHeader
 */

import { Box, Text } from "tinky";
import { type TableHeaderProps, type SortDirection } from "../types.js";

/**
 * Renders the sort indicator arrow.
 *
 * @param direction - Current sort direction
 * @returns Sort indicator string
 */
/**
 * Returns the visual character for the sort direction.
 *
 * @param direction - The current direction of sorting ('asc', 'desc', or null).
 * @returns The character representing the sort order (e.g. " ▲" or " ▼").
 */
function getSortIndicator(direction: SortDirection): string {
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
 * TableHeader renders the header row of the table.
 *
 * Displays column titles with optional sort indicators.
 * Column widths are handled by the parent Grid layout.
 *
 * @param props - Header properties
 * @returns The rendered header row
 *
 * @example
 * ```tsx
 * <TableHeader
 *   columns={columns}
 *   columnWidths={[20, 15, 10]}
 *   borderChar="│"
 *   sortState={{ key: 'name', direction: 'asc' }}
 * />
 * ```
 */
export function TableHeader({
  columns,
  borderChar = "│",
  sortState,
  style,
}: TableHeaderProps) {
  return (
    <Box flexDirection="row" {...style}>
      {columns.map((col, index) => {
        const isLast = index === columns.length - 1;

        // Get title as string
        const titleText = String(col.title ?? col.key);

        // Add sort indicator if this column is sorted
        const sortIndicator =
          sortState?.key === col.key
            ? getSortIndicator(sortState.direction)
            : "";

        // Map align to justifyContent
        const justifyContent =
          col.align === "right"
            ? "flex-end"
            : col.align === "center"
              ? "center"
              : "flex-start";

        return (
          <Box key={col.key} flexDirection="row" flexGrow={1}>
            <Box flexGrow={1} justifyContent={justifyContent}>
              <Text bold wrap="truncate">
                {titleText}
                {sortIndicator}
              </Text>
            </Box>
            {!isLast && <Text>{borderChar}</Text>}
          </Box>
        );
      })}
    </Box>
  );
}
