[**tinky-table**](../README.md)

---

[tinky-table](../globals.md) / getBorderChars

# Function: getBorderChars()

> **getBorderChars**(`style`): [`BorderChars`](../interfaces/BorderChars.md)

Gets the border characters for a given table border style.

## Parameters

### style

[`TableBorderStyle`](../type-aliases/TableBorderStyle.md)

The border style name

## Returns

[`BorderChars`](../interfaces/BorderChars.md)

The corresponding border character set

## Example

```ts
const chars = getBorderChars("single");
console.log(chars.topLeft); // '┌'
```
