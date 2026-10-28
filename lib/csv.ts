/** Quote every CSV cell and neutralize formula prefixes before spreadsheet import. */
export function toCsv(rows: readonly (readonly string[])[]): string {
  return rows.map((row) => row.map((value) => {
    const safe = /^[=+@\-\t\r\n]/.test(value.trimStart()) || /^[\t\r\n]/.test(value)
      ? `'${value}` : value;
    return `"${safe.replaceAll('"', '""')}"`;
  }).join(",")).join("\r\n");
}
