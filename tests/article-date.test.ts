import { describe, expect, test } from "bun:test";
import { formatArticleDate } from "../src/lib/article-date";

describe("formatArticleDate", () => {
  test("keeps a November publication in November", () => {
    expect(formatArticleDate("2026-11-22")).toBe("22 Nov 2026");
  });

  test("does not move the first of a month into the next month", () => {
    expect(formatArticleDate("2026-11-01")).toBe("01 Nov 2026");
  });
});
