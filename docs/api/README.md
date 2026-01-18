**tinky-table**

---

# tinky-table

[简体中文](_media/README.zh-CN.md) | [日本語](_media/README.ja-JP.md)

A feature-rich, customizable Table component for [tinky](https://github.com/ByteLandTechnology/tinky) applications. Built for terminal user interfaces with support for sorting, pagination, custom cell rendering, and flexible layouts.

## Features

- 📦 **Declarative Column Definitions**: Define columns with titles, keys, widths, and alignments.
- 🎨 **Flexible Styling**: Support for multiple border styles (single, double, round, bold, etc.) and custom row/header styles.
- 🔀 **Sorting**: Built-in support for column sorting with visual indicators.
- 📄 **Pagination**: Easy integration with pagination logic.
- 🖌️ **Custom Rendering**: Render any Tinky component inside table cells (progress bars, badges, etc.).
- 📐 **Responsive Layouts**: Supports fixed, percentage-based, and auto-sizing columns.

## Installation

```bash
npm install tinky-table
```

## Usage

### Basic Example

```tsx
import React from "react";
import { render } from "tinky";
import { Table } from "tinky-table";

const data = [
  { id: 1, name: "Alice", role: "Engineer", age: 28 },
  { id: 2, name: "Bob", role: "Designer", age: 32 },
  { id: 3, name: "Charlie", role: "Manager", age: 35 },
];

const columns = [
  { key: "id", title: "ID", width: 5 },
  { key: "name", title: "Name", width: 20 },
  { key: "role", title: "Role", width: 15 },
  { key: "age", title: "Age", width: 5, align: "right" },
];

function App() {
  return <Table data={data} columns={columns} borderStyle="round" />;
}

render(<App />);
```

### Advanced Usage (Custom Rendering & Sorting)

```tsx
import React, { useState } from "react";
import { render, Text } from "tinky";
import { Table, ColumnDef, SortDirection } from "tinky-table";

interface User {
  id: number;
  name: string;
  status: "active" | "inactive";
  score: number;
}

const data: User[] = [
  { id: 1, name: "Alice", status: "active", score: 95 },
  { id: 2, name: "Bob", status: "inactive", score: 82 },
  { id: 3, name: "Charlie", status: "active", score: 88 },
];

function StatusBadge({ status }: { status: User["status"] }) {
  return (
    <Text color={status === "active" ? "green" : "gray"}>
      {status.toUpperCase()}
    </Text>
  );
}

function App() {
  const [sortState, setSortState] = useState<{
    key: string;
    direction: SortDirection;
  }>({
    key: "name",
    direction: "asc",
  });

  const columns: ColumnDef<User>[] = [
    { key: "name", title: "Name", width: 20, sortable: true },
    {
      key: "status",
      title: "Status",
      width: 10,
      render: (val) => <StatusBadge status={val as User["status"]} />,
    },
    {
      key: "score",
      title: "Score",
      width: 10,
      align: "right",
      render: (val) => <Text bold>{val}%</Text>,
    },
  ];

  const sortedData = [...data].sort((a, b) => {
    // ... sorting logic ...
    return 0;
  });

  return (
    <Table
      data={sortedData}
      columns={columns}
      sortState={sortState}
      rowStyle={(row, index) => ({
        backgroundColor: index % 2 === 0 ? undefined : "#222",
      })}
    />
  );
}

render(<App />);
```

## API

### `<Table />` Properties

| Prop          | Type                                        | Description                                                            | Default     |
| ------------- | ------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `data`        | `T[]`                                       | Array of data objects to display.                                      | Required    |
| `columns`     | `ColumnDef<T>[]`                            | Column definitions.                                                    | Required    |
| `borderStyle` | `TableBorderStyle`                          | Border style (`single`, `double`, `round`, `bold`, `classic`, `none`). | `'single'`  |
| `showHeader`  | `boolean`                                   | Whether to display the header row.                                     | `true`      |
| `width`       | `number \| string`                          | Total width of the table.                                              | `'auto'`    |
| `emptyText`   | `ReactNode`                                 | Content to display when data is empty.                                 | `'No data'` |
| `sortState`   | `{ key: string, direction: SortDirection }` | Current sort state.                                                    | `undefined` |
| `rowStyle`    | `(row: T, index: number) => Style`          | Function to dynamically style rows.                                    | `undefined` |

### `ColumnDef` Properties

| Prop       | Type                               | Description                                                |
| ---------- | ---------------------------------- | ---------------------------------------------------------- |
| `key`      | `string`                           | Unique identifier for the column.                          |
| `title`    | `ReactNode`                        | Header title to display.                                   |
| `dataKey`  | `keyof T`                          | Key to extract value from data object (defaults to `key`). |
| `width`    | `number \| string`                 | Width (`10`, `'20%'`, `'auto'`).                           |
| `align`    | `'left' \| 'center' \| 'right'`    | Text alignment.                                            |
| `render`   | `(value, row, index) => ReactNode` | Custom render function for the cell.                       |
| `sortable` | `boolean`                          | Whether the column shows a sort indicator.                 |

## License

MIT
