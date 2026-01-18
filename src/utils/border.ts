/**
 * @fileoverview Border character mappings for different table styles.
 * @module tinky-table/utils/border
 */

import { type BorderChars, type TableBorderStyle } from "../types.js";

/**
 * Border characters for the 'single' style (thin lines).
 */
const SINGLE_BORDER: BorderChars = {
  top: "─",
  bottom: "─",
  left: "│",
  right: "│",
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  cross: "┼",
  topCross: "┬",
  bottomCross: "┴",
  leftCross: "├",
  rightCross: "┤",
  horizontal: "─",
  vertical: "│",
};

/**
 * Border characters for the 'double' style (double lines).
 */
const DOUBLE_BORDER: BorderChars = {
  top: "═",
  bottom: "═",
  left: "║",
  right: "║",
  topLeft: "╔",
  topRight: "╗",
  bottomLeft: "╚",
  bottomRight: "╝",
  cross: "╬",
  topCross: "╦",
  bottomCross: "╩",
  leftCross: "╠",
  rightCross: "╣",
  horizontal: "═",
  vertical: "║",
};

/**
 * Border characters for the 'round' style (rounded corners).
 */
const ROUND_BORDER: BorderChars = {
  top: "─",
  bottom: "─",
  left: "│",
  right: "│",
  topLeft: "╭",
  topRight: "╮",
  bottomLeft: "╰",
  bottomRight: "╯",
  cross: "┼",
  topCross: "┬",
  bottomCross: "┴",
  leftCross: "├",
  rightCross: "┤",
  horizontal: "─",
  vertical: "│",
};

/**
 * Border characters for the 'bold' style (thick lines).
 */
const BOLD_BORDER: BorderChars = {
  top: "━",
  bottom: "━",
  left: "┃",
  right: "┃",
  topLeft: "┏",
  topRight: "┓",
  bottomLeft: "┗",
  bottomRight: "┛",
  cross: "╋",
  topCross: "┳",
  bottomCross: "┻",
  leftCross: "┣",
  rightCross: "┫",
  horizontal: "━",
  vertical: "┃",
};

/**
 * Border characters for the 'classic' style (ASCII only).
 */
const CLASSIC_BORDER: BorderChars = {
  top: "-",
  bottom: "-",
  left: "|",
  right: "|",
  topLeft: "+",
  topRight: "+",
  bottomLeft: "+",
  bottomRight: "+",
  cross: "+",
  topCross: "+",
  bottomCross: "+",
  leftCross: "+",
  rightCross: "+",
  horizontal: "-",
  vertical: "|",
};

/**
 * Empty border (no visible border characters).
 */
const NO_BORDER: BorderChars = {
  top: " ",
  bottom: " ",
  left: " ",
  right: " ",
  topLeft: " ",
  topRight: " ",
  bottomLeft: " ",
  bottomRight: " ",
  cross: " ",
  topCross: " ",
  bottomCross: " ",
  leftCross: " ",
  rightCross: " ",
  horizontal: " ",
  vertical: " ",
};

/**
 * Map of border styles to their character sets.
 */
const BORDER_STYLES: Record<TableBorderStyle, BorderChars> = {
  single: SINGLE_BORDER,
  double: DOUBLE_BORDER,
  round: ROUND_BORDER,
  bold: BOLD_BORDER,
  singleDouble: SINGLE_BORDER, // Use single for now
  doubleSingle: DOUBLE_BORDER, // Use double for now
  classic: CLASSIC_BORDER,
  none: NO_BORDER,
};

/**
 * Gets the border characters for a given table border style.
 *
 * @param style - The border style name
 * @returns The corresponding border character set
 *
 * @example
 * ```ts
 * const chars = getBorderChars('single');
 * console.log(chars.topLeft); // '┌'
 * ```
 */
export function getBorderChars(style: TableBorderStyle): BorderChars {
  return BORDER_STYLES[style] ?? SINGLE_BORDER;
}

/**
 * Renders a horizontal separator line for the table.
 *
 * @param columnWidths - Array of column widths
 * @param chars - Border character set
 * @param position - Position of the separator ('top' | 'middle' | 'bottom')
 * @returns The formatted separator string
 *
 * @example
 * ```ts
 * const sep = renderSeparator([10, 15, 8], chars, 'top');
 * // Returns: '┌──────────┬───────────────┬────────┐'
 * ```
 */
export function renderSeparator(
  columnWidths: number[],
  chars: BorderChars,
  position: "top" | "middle" | "bottom",
): string {
  const leftChar =
    position === "top"
      ? chars.topLeft
      : position === "bottom"
        ? chars.bottomLeft
        : chars.leftCross;

  const rightChar =
    position === "top"
      ? chars.topRight
      : position === "bottom"
        ? chars.bottomRight
        : chars.rightCross;

  const crossChar =
    position === "top"
      ? chars.topCross
      : position === "bottom"
        ? chars.bottomCross
        : chars.cross;

  const segments = columnWidths.map((width) => chars.horizontal.repeat(width));

  return leftChar + segments.join(crossChar) + rightChar;
}
