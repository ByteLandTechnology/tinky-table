[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / TableProps

# Interface: TableProps\<T\>

Props for the Table component.

## Type Parameters

### T

`T` _extends_ [`RowData`](../type-aliases/RowData.md)

The type of data in each row

## Properties

### borderStyle?

> `readonly` `optional` **borderStyle**: [`TableBorderStyle`](../type-aliases/TableBorderStyle.md)

The visual style of the table borders.

Options:

- `'single'`: Thin single lines (default).
- `'double'`: Double lines.
- `'round'`: Rounded corners with single lines.
- `'bold'`: Thick/Bold lines.
- `'classic'`: ASCII characters (+, -, |).
- `'none'`: No visible borders.

#### Default

```ts
"single";
```

---

### cellStyle?

> `readonly` `optional` **cellStyle**: `Partial`\<[`Styles`](Styles.md)\>

Custom style for cells.

---

### columns

> `readonly` **columns**: [`ColumnDef`](ColumnDef.md)\<`T`\>[]

Column definitions.

---

### data

> `readonly` **data**: `T`[]

Array of data to display in the table.

---

### emptyText?

> `readonly` `optional` **emptyText**: `ReactNode`

Content to show when data is empty.

#### Default

```ts
"No data";
```

---

### headerStyle?

> `readonly` `optional` **headerStyle**: `Partial`\<[`Styles`](Styles.md)\>

Custom style for the header row.

---

### onSortChange()?

> `readonly` `optional` **onSortChange**: (`key`, `direction`) => `void`

Callback when sort state changes.

#### Parameters

##### key

`string`

##### direction

[`SortDirection`](../type-aliases/SortDirection.md)

#### Returns

`void`

---

### pagination?

> `readonly` `optional` **pagination**: [`PaginationConfig`](PaginationConfig.md)

Pagination configuration.

---

### rowStyle()?

> `readonly` `optional` **rowStyle**: (`row`, `index`) => `Partial`\<[`Styles`](Styles.md)\>

Custom style function for data rows.

#### Parameters

##### row

`T`

The row data

##### index

`number`

The row index

#### Returns

`Partial`\<[`Styles`](Styles.md)\>

Style object for the row

---

### showHeader?

> `readonly` `optional` **showHeader**: `boolean`

Whether to show the table header.

#### Default

```ts
true;
```

---

### sortState?

> `readonly` `optional` **sortState**: `object`

Sort state for the table.

#### direction

> `readonly` **direction**: [`SortDirection`](../type-aliases/SortDirection.md)

#### key

> `readonly` **key**: `string`

---

### width?

> `readonly` `optional` **width**: `number` \| `` `${number}%` `` \| `"auto"`

The total width of the table.

- `number`: Fixed width in characters.
- `'auto'`: Expands to fill the available terminal width.
- `${number}%`: Percentage of the parent container's width.

#### Default

```ts
"auto";
```
