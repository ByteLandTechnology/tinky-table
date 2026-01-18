[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / renderSeparator

# Function: renderSeparator()

> **renderSeparator**(`columnWidths`, `chars`, `position`): `string`

Renders a horizontal separator line for the table.

## Parameters

### columnWidths

`number`[]

Array of column widths

### chars

[`BorderChars`](../interfaces/BorderChars.md)

Border character set

### position

Position of the separator ('top' | 'middle' | 'bottom')

`"top"` | `"bottom"` | `"middle"`

## Returns

`string`

The formatted separator string

## Example

```ts
const sep = renderSeparator([10, 15, 8], chars, "top");
// Returns: '┌──────────┬───────────────┬────────┐'
```
