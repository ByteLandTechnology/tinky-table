# tinky-table

[English](./README.md) | [日本語](./README.ja-JP.md)

[tinky](https://github.com/ByteLandTechnology/tinky) 应用程序的功能丰富且可定制的表格组件。专为终端用户界面（TUI）构建，支持排序、分页、自定义单元格渲染和灵活的布局。

## 特性

- 📦 **声明式列定义**: 定义包含标题、键、宽度和对齐方式的列。
- 🎨 **灵活的样式**: 支持多种边框样式（single, double, round, bold 等）以及自定义行/表头样式。
- 🔀 **排序**: 内置支持带视觉指示器的列排序。
- 📄 **分页**: 易于集成分页逻辑。
- 🖌️ **自定义渲染**: 在表格单元格内渲染任何 Tinky 组件（进度条、徽章等）。
- 📐 **响应式布局**: 支持固定宽度、百分比宽度和自动宽度的列。

## 安装

```bash
npm install tinky-table
```

## 使用方法

### 基本示例

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

### 高级用法 (自定义渲染与排序)

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
    // ... 排序逻辑 ...
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

### `<Table />` 属性

| 属性          | 类型                                        | 描述                                                                | 默认值      |
| ------------- | ------------------------------------------- | ------------------------------------------------------------------- | ----------- |
| `data`        | `T[]`                                       | 要显示的数据对象数组。                                              | 必填        |
| `columns`     | `ColumnDef<T>[]`                            | 列定义。                                                            | 必填        |
| `borderStyle` | `TableBorderStyle`                          | 边框样式 (`single`, `double`, `round`, `bold`, `classic`, `none`)。 | `'single'`  |
| `showHeader`  | `boolean`                                   | 是否显示表头行。                                                    | `true`      |
| `width`       | `number \| string`                          | 表格的总宽度。                                                      | `'auto'`    |
| `emptyText`   | `ReactNode`                                 | 数据为空时显示的内容。                                              | `'No data'` |
| `sortState`   | `{ key: string, direction: SortDirection }` | 当前排序状态。                                                      | `undefined` |
| `rowStyle`    | `(row: T, index: number) => Style`          | 动态设置行样式的函数。                                              | `undefined` |

### `ColumnDef` 属性

| 属性       | 类型                               | 描述                                     |
| ---------- | ---------------------------------- | ---------------------------------------- |
| `key`      | `string`                           | 列的唯一标识符。                         |
| `title`    | `ReactNode`                        | 要显示的表头标题。                       |
| `dataKey`  | `keyof T`                          | 从数据对象中提取值的键（默认为 `key`）。 |
| `width`    | `number \| string`                 | 宽度 (`10`, `'20%'`, `'auto'`)。         |
| `align`    | `'left' \| 'center' \| 'right'`    | 文本对齐方式。                           |
| `render`   | `(value, row, index) => ReactNode` | 单元格的自定义渲染函数。                 |
| `sortable` | `boolean`                          | 列是否显示排序指示器。                   |

## 许可证

MIT
