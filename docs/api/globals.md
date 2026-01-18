[**tinky-table**](README.md)

---

# tinky-table

tinky-table - A feature-rich Table component for tinky.

## Example

```tsx
import { Table } from "tinky-table";

const data = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 32 },
];

const columns = [
  { key: "name", title: "Name", width: 20 },
  { key: "age", title: "Age", width: 10, align: "right" },
];

<Table data={data} columns={columns} />;
```

## Interfaces

- [BorderChars](interfaces/BorderChars.md)
- [ColumnDef](interfaces/ColumnDef.md)
- [PaginationConfig](interfaces/PaginationConfig.md)
- [Styles](interfaces/Styles.md)
- [TableCellProps](interfaces/TableCellProps.md)
- [TableHeaderProps](interfaces/TableHeaderProps.md)
- [TableProps](interfaces/TableProps.md)
- [TableRowProps](interfaces/TableRowProps.md)

## Type Aliases

- [ColumnAlign](type-aliases/ColumnAlign.md)
- [ColumnWidth](type-aliases/ColumnWidth.md)
- [GridTemplateValue](type-aliases/GridTemplateValue.md)
- [RowData](type-aliases/RowData.md)
- [SortDirection](type-aliases/SortDirection.md)
- [TableBorderStyle](type-aliases/TableBorderStyle.md)

## Functions

- [columnsToGridTemplate](functions/columnsToGridTemplate.md)
- [getBorderChars](functions/getBorderChars.md)
- [renderSeparator](functions/renderSeparator.md)
- [Table](functions/Table.md)
- [TableCell](functions/TableCell.md)
- [TableHeader](functions/TableHeader.md)
- [TableRow](functions/TableRow.md)
