[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / columnsToGridTemplate

# Function: columnsToGridTemplate()

> **columnsToGridTemplate**\<`T`\>(`columns`): [`GridTemplateValue`](../type-aliases/GridTemplateValue.md)[]

Converts column width definitions to grid template format.

Maps ColumnDef widths to taffy-layout's GridTemplateComponent:

- `number` → fixed size
- `'auto'` → fr(1) (flexible)
- `'${number}%'` → percentage as fr units

## Type Parameters

### T

`T` _extends_ [`RowData`](../type-aliases/RowData.md)

Row data type

## Parameters

### columns

[`ColumnDef`](../interfaces/ColumnDef.md)\<`T`\>[]

Column definitions

## Returns

[`GridTemplateValue`](../type-aliases/GridTemplateValue.md)[]

Array of values for use with gridTemplateColumns

## Example

```ts
const template = columnsToGridTemplate([
  { key: "name", width: 20 },
  { key: "email", width: "auto" },
  { key: "age", width: 10 },
]);
// Returns: [20, fr(1), 10]
```
