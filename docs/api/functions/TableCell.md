[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / TableCell

# Function: TableCell()

> **TableCell**(`props`): `Element`

TableCell renders an individual cell in the table.

The cell width is handled by the parent Grid layout.
Text truncation is handled by tinky's Text component wrap property.

## Parameters

### props

[`TableCellProps`](../interfaces/TableCellProps.md)

Cell properties

## Returns

`Element`

The rendered cell

## Example

```tsx
<TableCell width={20} align="right" isLast={false} borderChar="│">
  123.45
</TableCell>
```
