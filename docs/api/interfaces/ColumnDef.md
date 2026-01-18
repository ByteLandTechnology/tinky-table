[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / ColumnDef

# Interface: ColumnDef\<T\>

Column definition for the table.

## Type Parameters

### T

`T`

The type of data in each row

## Properties

### align?

> `readonly` `optional` **align**: [`ColumnAlign`](../type-aliases/ColumnAlign.md)

Text alignment within the column.

#### Default

```ts
"left";
```

---

### dataKey?

> `readonly` `optional` **dataKey**: keyof `T`

The key in the data object to extract the cell's value from.

Useful when the column `key` does not match the property name in the data object.
If not specified, the column's `key` will be used as the property identifier.

---

### key

> `readonly` **key**: `string`

Unique identifier for the column.

---

### maxWidth?

> `readonly` `optional` **maxWidth**: `number`

Maximum column width in characters.

---

### minWidth?

> `readonly` `optional` **minWidth**: `number`

Minimum column width in characters.

---

### render()?

> `readonly` `optional` **render**: (`value`, `row`, `rowIndex`) => `ReactNode`

Custom render function for the cell content.

Allows rendering complex React nodes (components, styled text, etc.) instead of
just the raw value.

#### Parameters

##### value

`unknown`

The value extracted from the row using key/dataKey.

##### row

`T`

The complete data object for the current row.

##### rowIndex

`number`

The index of the row in the current page/dataset.

#### Returns

`ReactNode`

A ReactNode to be rendered within the cell.

---

### sortable?

> `readonly` `optional` **sortable**: `boolean`

Whether this column is sortable.

#### Default

```ts
false;
```

---

### title

> `readonly` **title**: `ReactNode`

Header title to display.

---

### width?

> `readonly` `optional` **width**: [`ColumnWidth`](../type-aliases/ColumnWidth.md)

Column width.

#### Default

```ts
"auto";
```
