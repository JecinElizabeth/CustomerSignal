import test from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "../lib/csv.ts";

test("export keeps quotes, commas and multiline notes inside a quoted cell", () => {
  assert.equal(toCsv([['A, B', 'Say "hello"', 'line 1\nline 2']]), '"A, B","Say ""hello""","line 1\nline 2"');
});

test("export neutralizes formula injection including whitespace prefixes", () => {
  for (const value of ["=SUM(A1:A2)", " +cmd", "@evil", "-2+3", "\tformula", "\nformula"]) {
    assert.ok(toCsv([[value]]).startsWith('"\''), value);
  }
});
