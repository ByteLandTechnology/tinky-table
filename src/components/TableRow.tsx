/**
 * @fileoverview TableRow component for rendering table rows.
 * @module tinky-table/TableRow
 */

import { Box } from "tinky";
import { type TableRowProps } from "../types.js";

/**
 * TableRow renders a single row in the table.
 *
 * Uses flexbox layout to arrange cells horizontally.
 *
 * @param props - Row properties
 * @returns The rendered row
 *
 * @example
 * ```tsx
 * <TableRow columnWidths={[20, 15, 10]}>
 *   <TableCell>Alice</TableCell>
 *   <TableCell>alice@example.com</TableCell>
 *   <TableCell>28</TableCell>
 * </TableRow>
 * ```
 */
export function TableRow({ children, style }: TableRowProps) {
  return (
    <Box flexDirection="row" {...style}>
      {children}
    </Box>
  );
}
