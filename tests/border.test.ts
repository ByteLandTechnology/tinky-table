/**
 * @fileoverview Tests for border utility functions.
 */

import { describe, test, expect } from "bun:test";
import { getBorderChars, renderSeparator } from "../src/utils/border.js";
import type { TableBorderStyle } from "../src/types.js";

describe("getBorderChars", () => {
  test("returns single border characters by default", () => {
    const chars = getBorderChars("single");
    expect(chars.topLeft).toBe("┌");
    expect(chars.topRight).toBe("┐");
    expect(chars.bottomLeft).toBe("└");
    expect(chars.bottomRight).toBe("┘");
    expect(chars.horizontal).toBe("─");
    expect(chars.vertical).toBe("│");
    expect(chars.cross).toBe("┼");
    expect(chars.topCross).toBe("┬");
    expect(chars.bottomCross).toBe("┴");
    expect(chars.leftCross).toBe("├");
    expect(chars.rightCross).toBe("┤");
  });

  test("returns double border characters", () => {
    const chars = getBorderChars("double");
    expect(chars.topLeft).toBe("╔");
    expect(chars.topRight).toBe("╗");
    expect(chars.bottomLeft).toBe("╚");
    expect(chars.bottomRight).toBe("╝");
    expect(chars.horizontal).toBe("═");
    expect(chars.vertical).toBe("║");
    expect(chars.cross).toBe("╬");
  });

  test("returns round border characters", () => {
    const chars = getBorderChars("round");
    expect(chars.topLeft).toBe("╭");
    expect(chars.topRight).toBe("╮");
    expect(chars.bottomLeft).toBe("╰");
    expect(chars.bottomRight).toBe("╯");
    // Other chars same as single
    expect(chars.horizontal).toBe("─");
    expect(chars.vertical).toBe("│");
  });

  test("returns bold border characters", () => {
    const chars = getBorderChars("bold");
    expect(chars.topLeft).toBe("┏");
    expect(chars.topRight).toBe("┓");
    expect(chars.bottomLeft).toBe("┗");
    expect(chars.bottomRight).toBe("┛");
    expect(chars.horizontal).toBe("━");
    expect(chars.vertical).toBe("┃");
    expect(chars.cross).toBe("╋");
  });

  test("returns classic ASCII border characters", () => {
    const chars = getBorderChars("classic");
    expect(chars.topLeft).toBe("+");
    expect(chars.topRight).toBe("+");
    expect(chars.bottomLeft).toBe("+");
    expect(chars.bottomRight).toBe("+");
    expect(chars.horizontal).toBe("-");
    expect(chars.vertical).toBe("|");
    expect(chars.cross).toBe("+");
  });

  test("returns space characters for none style", () => {
    const chars = getBorderChars("none");
    expect(chars.topLeft).toBe(" ");
    expect(chars.topRight).toBe(" ");
    expect(chars.horizontal).toBe(" ");
    expect(chars.vertical).toBe(" ");
    expect(chars.cross).toBe(" ");
  });

  test("handles all defined border styles", () => {
    const styles: TableBorderStyle[] = [
      "single",
      "double",
      "round",
      "bold",
      "singleDouble",
      "doubleSingle",
      "classic",
      "none",
    ];

    for (const style of styles) {
      const chars = getBorderChars(style);
      expect(chars).toBeDefined();
      expect(typeof chars.topLeft).toBe("string");
      expect(typeof chars.horizontal).toBe("string");
    }
  });
});

describe("renderSeparator", () => {
  test("renders top separator correctly", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([5, 10, 3], chars, "top");
    expect(separator).toBe("┌─────┬──────────┬───┐");
  });

  test("renders middle separator correctly", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([5, 10, 3], chars, "middle");
    expect(separator).toBe("├─────┼──────────┼───┤");
  });

  test("renders bottom separator correctly", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([5, 10, 3], chars, "bottom");
    expect(separator).toBe("└─────┴──────────┴───┘");
  });

  test("renders separator with single column", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([10], chars, "top");
    expect(separator).toBe("┌──────────┐");
  });

  test("renders separator with double border style", () => {
    const chars = getBorderChars("double");
    const separator = renderSeparator([5, 5], chars, "top");
    expect(separator).toBe("╔═════╦═════╗");
  });

  test("renders separator with classic ASCII style", () => {
    const chars = getBorderChars("classic");
    const separator = renderSeparator([5, 5], chars, "middle");
    expect(separator).toBe("+-----+-----+");
  });

  test("handles empty column widths array", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([], chars, "top");
    expect(separator).toBe("┌┐");
  });

  test("handles zero width column", () => {
    const chars = getBorderChars("single");
    const separator = renderSeparator([0, 5], chars, "top");
    expect(separator).toBe("┌┬─────┐");
  });
});
