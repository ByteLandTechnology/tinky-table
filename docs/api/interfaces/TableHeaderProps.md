[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / TableHeaderProps

# Interface: TableHeaderProps

Props for TableHeader component.

## Properties

### borderChar?

> `readonly` `optional` **borderChar**: `string`

Border character for column separator.

---

### columns

> `readonly` **columns**: [`ColumnDef`](ColumnDef.md)\<[`RowData`](../type-aliases/RowData.md)\>[]

Column definitions.

---

### columnWidths

> `readonly` **columnWidths**: `number`[]

Calculated column widths.

---

### sortState?

> `readonly` `optional` **sortState**: `object`

Current sort state.

#### direction

> `readonly` **direction**: [`SortDirection`](../type-aliases/SortDirection.md)

#### key

> `readonly` **key**: `string`

---

### style?

> `readonly` `optional` **style**: `Partial`\<[`Styles`](Styles.md)\>

Custom header style.
