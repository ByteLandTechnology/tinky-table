# tinky-table

[English](./README.md) | [简体中文](./README.zh-CN.md)

[tinky](https://github.com/ByteLandTechnology/tinky) アプリケーション向けの機能豊富でカスタマイズ可能なテーブルコンポーネントです。ソート、ページネーション、カスタムセルレンダリング、柔軟なレイアウトをサポートし、ターミナルユーザーインターフェース (TUI) 向けに構築されています。

## 特徴

- 📦 **宣言的な列定義**: タイトル、キー、幅、配置設定を含む列定義。
- 🎨 **柔軟なスタイリング**: 複数のボーダースタイル（single, double, round, bold など）やカスタム行/ヘッダースタイルをサポート。
- 🔀 **ソート**: 並べ替えインジケーター付きの列ソートを標準サポート。
- 📄 **ページネーション**: ページネーションロジックとの統合が容易。
- 🖌️ **カスタムレンダリング**: テーブルセル内に任意の Tinky コンポーネント（プログレスバー、バッジなど）をレンダリング可能。
- 📐 **レスポンシブレイアウト**: 固定幅、パーセンテージ、自動サイズ調整の列をサポート。

## インストール

```bash
npm install tinky-table
```

## 使い方

### 基本的な例

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

### 高度な使用法 (カスタムレンダリングとソート)

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
    // ... ソートロジック ...
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

### `<Table />` プロパティ

| プロパティ    | 型                                          | 説明                                                                      | デフォルト  |
| ------------- | ------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| `data`        | `T[]`                                       | 表示するデータオブジェクトの配列。                                        | 必須        |
| `columns`     | `ColumnDef<T>[]`                            | 列の定義。                                                                | 必須        |
| `borderStyle` | `TableBorderStyle`                          | 枠線のスタイル (`single`, `double`, `round`, `bold`, `classic`, `none`)。 | `'single'`  |
| `showHeader`  | `boolean`                                   | ヘッダー行を表示するかどうか。                                            | `true`      |
| `width`       | `number \| string`                          | テーブルの全幅。                                                          | `'auto'`    |
| `emptyText`   | `ReactNode`                                 | データが空の場合に表示するコンテンツ。                                    | `'No data'` |
| `sortState`   | `{ key: string, direction: SortDirection }` | 現在のソート状態。                                                        | `undefined` |
| `rowStyle`    | `(row: T, index: number) => Style`          | 行を動的にスタイルするための関数。                                        | `undefined` |

### `ColumnDef` プロパティ

| プロパティ | 型                                 | 説明                                                                |
| ---------- | ---------------------------------- | ------------------------------------------------------------------- |
| `key`      | `string`                           | 列の一意な識別子。                                                  |
| `title`    | `ReactNode`                        | 表示するヘッダーのタイトル。                                        |
| `dataKey`  | `keyof T`                          | データオブジェクトから値を抽出するためのキー (デフォルトは `key`)。 |
| `width`    | `number \| string`                 | 幅 (`10`, `'20%'`, `'auto'`)。                                      |
| `align`    | `'left' \| 'center' \| 'right'`    | テキストの配置。                                                    |
| `render`   | `(value, row, index) => ReactNode` | セルのカスタムレンダリング関数。                                    |
| `sortable` | `boolean`                          | 列にソートインジケーターを表示するかどうか。                        |

## ライセンス

MIT
