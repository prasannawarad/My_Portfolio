/**
 * The chat bubble renders raw text, not Markdown. The worker's system prompt asks for
 * plain text, but a model will still slip in emphasis or a link now and then — and an
 * unrendered `[GitHub](https://…)` is worse than no formatting at all. This is the
 * safety net: strip the syntax so the words survive and the punctuation does not.
 *
 * Runs on every streamed frame, so it must be pure, cheap, and stable on partial text
 * (a half-arrived `**bo` simply loses its markers rather than flickering into bold).
 */
export function stripMarkdown(text) {
  if (!text) return '';

  return (
    text
      // Links first, before their brackets get touched: keep the label, keep the URL.
      .replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)')
      // Bare image/footnote-ish leftovers: drop the brackets, keep the label.
      .replace(/\[([^\]\n]+)\]\(\s*\)/g, '$1')
      // Paired emphasis only — a lone asterisk in prose is left alone.
      .replace(/\*\*\*([^\s*][^*]*?)\*\*\*/g, '$1')
      .replace(/\*\*([^\s*][^*]*?)\*\*/g, '$1')
      .replace(/__([^\s_][^_]*?)__/g, '$1')
      // Inline code, including the ```lang fenced form.
      .replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, '$1')
      .replace(/`([^`\n]+)`/g, '$1')
      // Leading list markers become a real bullet; ATX headings lose their hashes.
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^(\s*)[*+-]\s+/gm, '$1• ')
      // Collapse the blank-line pile-ups that list stripping can leave behind.
      .replace(/\n{3,}/g, '\n\n')
  );
}

export default stripMarkdown;
