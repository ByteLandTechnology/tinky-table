/**
 * @fileoverview TableCell component for rendering individual table cells.
 * @module tinky-table/TableCell
 */

import { Box, Text } from "tinky";
import { type TableCellProps } from "../types.js";

/**
 * TableCell renders an individual cell in the table.
 *
 * The cell width is handled by the parent Grid layout.
 * Text truncation is handled by tinky's Text component wrap property.
 *
 * @param props - Cell properties
 * @returns The rendered cell
 *
 * @example
 * ```tsx
 * <TableCell width={20} align="right" isLast={false} borderChar="│">
 *   123.45
 * </TableCell>
 * ```
 */
export function TableCell({
  children,
  align = "left",
  isLast = false,
  borderChar = "│",
}: TableCellProps) {
  // Map align to justifyContent
  const justifyContent =
    align === "right"
      ? "flex-end"
      : align === "center"
        ? "center"
        : "flex-start";

  return (
    <Box flexDirection="row">
      <Box flexGrow={1} justifyContent={justifyContent}>
        <Text wrap="truncate">{children}</Text>
      </Box>
      {!isLast && <Text>{borderChar}</Text>}
    </Box>
  );
}
