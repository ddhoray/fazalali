import { describe, expect, test } from "bun:test";
import { assertArticleReadyToPublish, isArticleLive, resolveArticlePublication } from "../src/lib/admin/article-publishing";

const now = new Date("2026-11-24T12:00:00.000Z");

describe("article publishing", () => {
  test("A scheduled article becomes live at its chosen time", () => {
    expect(isArticleLive("scheduled", "2026-11-24T12:00:00.000Z", now)).toBe(true);
    expect(isArticleLive("scheduled", "2026-11-24T12:01:00.000Z", now)).toBe(false);
  });

  test("Drafts and future articles are not live", () => {
    expect(isArticleLive("draft", "2026-11-24T11:00:00.000Z", now)).toBe(false);
    expect(isArticleLive("published", "2026-11-24T12:01:00.000Z", now)).toBe(false);
  });

  test("Publish now replaces a future date with the actual publication time", () => {
    expect(resolveArticlePublication({ status: "published", publish_at: "2026-12-01T09:00:00.000Z" }, now)).toEqual({
      status: "published",
      publish_at: "2026-11-24T12:00:00.000Z",
    });
  });

  test("Schedule rejects a date that is not in the future", () => {
    expect(() => resolveArticlePublication({ status: "scheduled", publish_at: "2026-11-24T11:59:00.000Z" }, now)).toThrow(
      "Choose a future date and time",
    );
  });

  test("Schedule preserves a future publication date", () => {
    expect(resolveArticlePublication({ status: "scheduled", publish_at: "2026-11-25T09:00:00.000Z" }, now)).toEqual({
      status: "scheduled",
      publish_at: "2026-11-25T09:00:00.000Z",
    });
  });

  test("An empty article cannot be published", () => {
    expect(() => assertArticleReadyToPublish({ status: "published", body_html: "<p></p>" })).toThrow(
      "Add article content",
    );
  });

  test("An empty article can still be saved as a draft", () => {
    expect(() => assertArticleReadyToPublish({ status: "draft", body_html: "<p></p>" })).not.toThrow();
  });
});
