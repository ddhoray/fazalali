export type ArticlePublicationStatus = "draft" | "scheduled" | "published";

export function resolveArticlePublication(
  input: { status: ArticlePublicationStatus; publish_at: string },
  now = new Date(),
) {
  const publishAt = new Date(input.publish_at);
  if (Number.isNaN(publishAt.getTime())) throw new Error("Choose a valid publish date and time.");
  if (input.status === "scheduled" && publishAt.getTime() <= now.getTime()) {
    throw new Error("Choose a future date and time to schedule this article.");
  }
  return {
    status: input.status,
    publish_at:
      input.status === "published" && publishAt.getTime() > now.getTime()
        ? now.toISOString()
        : publishAt.toISOString(),
  };
}

export function assertArticleReadyToPublish(input: {
  status: ArticlePublicationStatus;
  body_html: string;
}) {
  if (input.status === "draft") return;
  const hasText = input.body_html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim().length > 0;
  const hasMedia = /<(?:img|video|audio)\b/i.test(input.body_html);
  if (!hasText && !hasMedia) throw new Error("Add article content before publishing or scheduling.");
}
