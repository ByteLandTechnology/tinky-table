/**
 * @fileoverview Tests for column-width utility functions.
 */

import { describe, test, expect } from "bun:test";
import { columnsToGridTemplate } from "../src/utils/column-width.js";
import type { ColumnDef, RowData } from "../src/types.js";

describe("columnsToGridTemplate", () => {
  interface TestRow extends RowData {
    name: string;
    age: number;
  }

  test("converts fixed width columns", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name", width: 20 },
      { key: "age", title: "Age", width: 10 },
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([20, 10]);
  });

  test("converts auto width columns to fr units", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name", width: "auto" },
      { key: "age", title: "Age", width: "auto" },
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([
      { min: "auto", max: "1fr" },
      { min: "auto", max: "1fr" },
    ]);
  });

  test("converts percentage width columns to fr units", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name", width: "50%" },
      { key: "age", title: "Age", width: "25%" },
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([
      { min: "auto", max: "50fr" },
      { min: "auto", max: "25fr" },
    ]);
  });

  test("handles mixed width types", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name", width: 20 },
      { key: "age", title: "Age", width: "auto" },
      { key: "other", title: "Other", width: "30%" },
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([
      20,
      { min: "auto", max: "1fr" },
      { min: "auto", max: "30fr" },
    ]);
  });

  test("defaults to auto when width is not specified", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name" }, // No width
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([{ min: "auto", max: "1fr" }]);
  });

  test("handles empty columns array", () => {
    const columns: ColumnDef<TestRow>[] = [];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([]);
  });

  test("handles single column", () => {
    const columns: ColumnDef<TestRow>[] = [
      { key: "name", title: "Name", width: 15 },
    ];
    const template = columnsToGridTemplate(columns);
    expect(template).toEqual([15]);
  });

  test("handles many columns", () => {
    const columns: ColumnDef<TestRow>[] = Array.from(
      { length: 10 },
      (_, i) => ({
        key: `col${i}`,
        title: `Column ${i}`,
        width: 5,
      }),
    );
    const template = columnsToGridTemplate(columns);
    expect(template.length).toBe(10);
    expect(template.every((t) => t === 5)).toBe(true);
  });
});
