/**
 * @fileoverview Comprehensive tests for tinky-table components.
 */

import { describe, test, expect } from "bun:test";
import { Table } from "../src/components/Table.js";
import { renderToString } from "./helpers/render-to-string.js";

/**
 * Helper to render component to string for testing.
 */
function render(element: React.ReactElement, columns?: number): string {
  return renderToString(element, { columns });
}

// =============================================================================
// Basic Rendering Tests
// =============================================================================

describe("Table - Basic Rendering", () => {
  test("renders basic table with data", () => {
    const data = [
      { name: "Alice", age: 28 },
      { name: "Bob", age: 32 },
    ];

    const columns = [
      { key: "name", title: "Name", width: 10 as const },
      { key: "age", title: "Age", width: 5 as const },
    ];

    const output = render(<Table data={data} columns={columns} />);

    // Should contain header and data
    expect(output).toContain("Name");
    expect(output).toContain("Age");
    expect(output).toContain("Alice");
    expect(output).toContain("Bob");
    expect(output).toContain("28");
    expect(output).toContain("32");
  });

  test("renders empty table with default emptyText", () => {
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(<Table data={[]} columns={columns} />);

    expect(output).toContain("No data");
  });

  test("renders empty table with custom emptyText", () => {
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(
      <Table data={[]} columns={columns} emptyText="No items found" />,
    );

    expect(output).toContain("No items found");
  });

  test("renders table without header when showHeader=false", () => {
    const data = [{ name: "Alice" }];
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(
      <Table data={data} columns={columns} showHeader={false} />,
    );

    expect(output).toContain("Alice");
    expect(output).not.toContain("Name");
  });
});

// =============================================================================
// Border Style Tests
// =============================================================================

describe("Table - Border Styles", () => {
  const data = [{ name: "Test" }];
  const columns = [{ key: "name", title: "Name", width: 10 as const }];

  test("renders table with single border (default)", () => {
    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("│");
    expect(output).toContain("─");
  });

  test("renders table with double border", () => {
    const output = render(
      <Table data={data} columns={columns} borderStyle="double" />,
    );
    expect(output).toContain("║");
    expect(output).toContain("═");
  });

  test("renders table with round border", () => {
    const output = render(
      <Table data={data} columns={columns} borderStyle="round" />,
    );
    expect(output).toContain("│");
    // Round style uses same vertical as single
  });

  test("renders table with bold border", () => {
    const output = render(
      <Table data={data} columns={columns} borderStyle="bold" />,
    );
    expect(output).toContain("┃");
    expect(output).toContain("━");
  });

  test("renders table with classic ASCII border", () => {
    const output = render(
      <Table data={data} columns={columns} borderStyle="classic" />,
    );
    expect(output).toContain("|");
    expect(output).toContain("-");
  });

  test("renders table without border when borderStyle=none", () => {
    const output = render(
      <Table data={data} columns={columns} borderStyle="none" />,
    );
    expect(output).not.toContain("│");
    expect(output).not.toContain("║");
    expect(output).not.toContain("|");
  });
});

// =============================================================================
// Column Alignment Tests
// =============================================================================

describe("Table - Column Alignment", () => {
  test("renders left-aligned column (default)", () => {
    const data = [{ value: "test" }];
    const columns = [{ key: "value", title: "Value", width: 20 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("test");
  });

  test("renders right-aligned column", () => {
    const data = [{ value: "123" }];
    const columns = [
      {
        key: "value",
        title: "Value",
        width: 20 as const,
        align: "right" as const,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("123");
  });

  test("renders center-aligned column", () => {
    const data = [{ value: "center" }];
    const columns = [
      {
        key: "value",
        title: "Value",
        width: 20 as const,
        align: "center" as const,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("center");
  });

  test("renders mixed alignment columns", () => {
    const data = [{ left: "L", center: "C", right: "R" }];
    const columns = [
      {
        key: "left",
        title: "Left",
        width: 10 as const,
        align: "left" as const,
      },
      {
        key: "center",
        title: "Center",
        width: 10 as const,
        align: "center" as const,
      },
      {
        key: "right",
        title: "Right",
        width: 10 as const,
        align: "right" as const,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("L");
    expect(output).toContain("C");
    expect(output).toContain("R");
  });
});

// =============================================================================
// Custom Render Tests
// =============================================================================

describe("Table - Custom Renderers", () => {
  test("renders table with custom cell renderer", () => {
    const data = [{ value: 100 }];
    const columns = [
      {
        key: "value",
        title: "Value",
        width: 10 as const,
        render: (val: unknown) => `$${val}`,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("$100");
  });

  test("custom renderer receives row and index", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }];
    const columns = [
      {
        key: "name",
        title: "Name",
        width: 20 as const,
        render: (val: unknown, _row: unknown, index: number) =>
          `${index + 1}. ${val}`,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("1. Alice");
    expect(output).toContain("2. Bob");
  });

  test("custom renderer can return null values", () => {
    const data = [{ value: null }];
    const columns = [
      {
        key: "value",
        title: "Value",
        width: 10 as const,
        render: (val: unknown) => (val === null ? "N/A" : String(val)),
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("N/A");
  });
});

// =============================================================================
// Sort Indicator Tests
// =============================================================================

describe("Table - Sort Indicators", () => {
  const data = [{ name: "Alice" }];
  const columns = [
    { key: "name", title: "Name", width: 15 as const, sortable: true },
  ];

  test("renders ascending sort indicator", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        sortState={{ key: "name", direction: "asc" }}
      />,
    );
    expect(output).toContain("▲");
  });

  test("renders descending sort indicator", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        sortState={{ key: "name", direction: "desc" }}
      />,
    );
    expect(output).toContain("▼");
  });

  test("renders no indicator when direction is null", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        sortState={{ key: "name", direction: null }}
      />,
    );
    expect(output).not.toContain("▲");
    expect(output).not.toContain("▼");
  });

  test("renders no indicator for non-sorted column", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        sortState={{ key: "other", direction: "asc" }}
      />,
    );
    expect(output).not.toContain("▲");
  });
});

// =============================================================================
// Pagination Tests
// =============================================================================

describe("Table - Pagination", () => {
  const data = Array.from({ length: 50 }, (_, i) => ({ id: i + 1 }));
  const columns = [{ key: "id", title: "ID", width: 10 as const }];

  test("paginates data correctly - page 1", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        pagination={{ page: 1, pageSize: 10, total: 50 }}
      />,
    );

    expect(output).toContain("1");
    expect(output).toContain("10");
    // Should show page info
    expect(output).toContain("Page 1 of 5");
  });

  test("paginates data correctly - page 2", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        pagination={{ page: 2, pageSize: 10, total: 50 }}
      />,
    );

    expect(output).toContain("11");
    expect(output).toContain("20");
    expect(output).toContain("Page 2 of 5");
  });

  test("shows correct page count for partial last page", () => {
    const output = render(
      <Table
        data={data}
        columns={columns}
        pagination={{ page: 1, pageSize: 15, total: 50 }}
      />,
    );

    // 50 / 15 = 3.33, so 4 pages
    expect(output).toContain("Page 1 of 4");
  });

  test("handles single page", () => {
    const smallData = [{ id: 1 }, { id: 2 }];
    const output = render(
      <Table
        data={smallData}
        columns={columns}
        pagination={{ page: 1, pageSize: 10, total: 2 }}
      />,
    );

    expect(output).toContain("Page 1 of 1");
  });
});

// =============================================================================
// Data Key Tests
// =============================================================================

describe("Table - DataKey Usage", () => {
  test("uses dataKey when specified", () => {
    const data = [{ fullName: "Alice Smith" }];
    const columns = [
      {
        key: "name",
        title: "Name",
        width: 20 as const,
        dataKey: "fullName" as const,
      },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("Alice Smith");
  });

  test("falls back to key when dataKey not specified", () => {
    const data = [{ name: "Bob" }];
    const columns = [{ key: "name", title: "Name", width: 20 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("Bob");
  });
});

// =============================================================================
// Edge Cases Tests
// =============================================================================

describe("Table - Edge Cases", () => {
  test("renders single column table", () => {
    const data = [{ x: 1 }];
    const columns = [{ key: "x", title: "X", width: 5 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("X");
    expect(output).toContain("1");
  });

  test("renders table with many columns", () => {
    const data = [
      { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 },
    ];
    const columns = "abcdefghij".split("").map((key) => ({
      key,
      title: key.toUpperCase(),
      width: 3 as const,
    }));

    const output = render(<Table data={data} columns={columns} />, 200);
    expect(output).toContain("A");
    expect(output).toContain("J");
    expect(output).toContain("1");
    expect(output).toContain("10");
  });

  test("handles undefined values in data", () => {
    const data = [{ name: undefined }];
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(<Table data={data} columns={columns} />);
    // Should not crash and display empty cell
    expect(output).toContain("Name");
  });

  test("handles null values in data", () => {
    const data = [{ name: null }];
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("Name");
  });

  test("handles numeric column keys", () => {
    const data = [{ 0: "first", 1: "second" }];
    const columns = [
      { key: "0", title: "First", width: 10 as const },
      { key: "1", title: "Second", width: 10 as const },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("first");
    expect(output).toContain("second");
  });

  test("handles special characters in data", () => {
    const data = [{ name: "<script>alert('xss')</script>" }];
    const columns = [{ key: "name", title: "Name", width: 40 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("<script>");
  });

  test("handles empty string values", () => {
    const data = [{ name: "" }];
    const columns = [{ key: "name", title: "Name", width: 10 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("Name");
  });

  test("handles very long data values", () => {
    const data = [{ name: "A".repeat(100) }];
    const columns = [{ key: "name", title: "Name", width: 20 as const }];

    const output = render(<Table data={data} columns={columns} />, 80);
    // Should render without crashing
    expect(output).toContain("A");
  });
});

// =============================================================================
// Column Width Type Tests
// =============================================================================

describe("Table - Column Widths", () => {
  test("renders fixed width columns", () => {
    const data = [{ a: "test", b: "data" }];
    const columns = [
      { key: "a", title: "A", width: 10 },
      { key: "b", title: "B", width: 15 },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("test");
    expect(output).toContain("data");
  });

  test("renders auto width columns", () => {
    const data = [{ a: "test", b: "data" }];
    const columns = [
      { key: "a", title: "A", width: "auto" as const },
      { key: "b", title: "B", width: "auto" as const },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("test");
    expect(output).toContain("data");
  });

  test("renders percentage width columns", () => {
    const data = [{ a: "test", b: "data" }];
    const columns = [
      { key: "a", title: "A", width: "50%" as const },
      { key: "b", title: "B", width: "50%" as const },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("test");
    expect(output).toContain("data");
  });

  test("renders mixed width columns", () => {
    const data = [{ a: "A", b: "B", c: "C" }];
    const columns = [
      { key: "a", title: "A", width: 10 },
      { key: "b", title: "B", width: "auto" as const },
      { key: "c", title: "C", width: "30%" as const },
    ];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("A");
    expect(output).toContain("B");
    expect(output).toContain("C");
  });
});

// =============================================================================
// Row Count Tests
// =============================================================================

describe("Table - Row Counts", () => {
  test("renders single row", () => {
    const data = [{ id: 1 }];
    const columns = [{ key: "id", title: "ID", width: 5 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("1");
  });

  test("renders many rows", () => {
    const data = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    const columns = [{ key: "id", title: "ID", width: 5 as const }];

    const output = render(<Table data={data} columns={columns} />);
    expect(output).toContain("1");
    expect(output).toContain("100");
  });
});
