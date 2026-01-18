[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / TableRow

# Function: TableRow()

> **TableRow**(`props`): `Element`

TableRow renders a single row in the table.

Uses flexbox layout to arrange cells horizontally.

## Parameters

### props

[`TableRowProps`](../interfaces/TableRowProps.md)

Row properties

## Returns

`Element`

The rendered row

## Example

```tsx
<TableRow columnWidths={[20, 15, 10]}>
  <TableCell>Alice</TableCell>
  <TableCell>alice@example.com</TableCell>
  <TableCell>28</TableCell>
</TableRow>
```
