[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / TableHeader

# Function: TableHeader()

> **TableHeader**(`props`): `Element`

TableHeader renders the header row of the table.

Displays column titles with optional sort indicators.
Column widths are handled by the parent Grid layout.

## Parameters

### props

[`TableHeaderProps`](../interfaces/TableHeaderProps.md)

Header properties

## Returns

`Element`

The rendered header row

## Example

```tsx
<TableHeader
  columns={columns}
  columnWidths={[20, 15, 10]}
  borderChar="│"
  sortState={{ key: "name", direction: "asc" }}
/>
```
