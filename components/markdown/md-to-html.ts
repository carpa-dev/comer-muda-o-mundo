import remark from 'remark';
import html from 'remark-html';

/**
 * Converts markdown to HTML with sanitization.
 *
 * Security considerations:
 * https://github.com/remarkjs/remark-html/tree/db1a1d01504e5b8ffb339c0e4f4fd0852f0caef5#security
 */
export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: true }).process(markdown);
  return result.toString();
}
