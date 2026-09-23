import { createElement, Fragment, type ReactNode } from 'react';

/** Inline tags that translation strings may use. */
const TAGS: Record<string, (key: number, children: ReactNode[]) => ReactNode> = {
  accent: (key, children) => createElement('span', { key, className: 'accent' }, ...children),
  b: (key, children) => createElement('strong', { key }, ...children),
  m: (key, children) => createElement('span', { key, style: { fontWeight: 500 } }, ...children),
};

const TOKEN = /<br\s*\/?>|<(\/?)([a-z]+)>/g;

/**
 * Turns a translation string such as "Hello <accent><b>world</b></accent><br/>"
 * into React nodes. Unknown tags are kept as plain text.
 */
export function renderRich(text: string): ReactNode {
  const root: ReactNode[] = [];
  const stack: { tag: string; children: ReactNode[] }[] = [];
  const current = () => (stack.length ? stack[stack.length - 1].children : root);
  let key = 0;
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [token, closing, tag] = match;
    if (match.index > last) current().push(text.slice(last, match.index));
    last = match.index + token.length;

    if (!tag) {
      current().push(createElement('br', { key: key++ }));
    } else if (!(tag in TAGS)) {
      current().push(token);
    } else if (!closing) {
      stack.push({ tag, children: [] });
    } else {
      const open = stack.pop();
      if (open) current().push(TAGS[open.tag](key++, open.children));
    }
  }

  if (last < text.length) current().push(text.slice(last));
  // Close anything left open rather than dropping its text.
  while (stack.length) {
    const open = stack.pop()!;
    current().push(TAGS[open.tag](key++, open.children));
  }

  return createElement(Fragment, null, ...root);
}

/** Plain-text version of a translation string, for attributes and metadata. */
export function stripTags(text: string) {
  return text.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
}
