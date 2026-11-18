import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';

const wordParser = unified().use(remarkParse).use(remarkMath);
const wordSegmenter = new Intl.Segmenter('en', { granularity: 'word' });

// Count prose, headings and footnotes, excluding code, math, URLs and HTML markup.
export function wordCount(markdown = '') {
  const text = [];
  function visit(node) {
    if (node.type === 'text') text.push(node.value);
    else if (node.children && node.type !== 'image') node.children.forEach(visit);
  }
  visit(wordParser.parse(markdown));
  return [...wordSegmenter.segment(text.join(' '))].filter(part => part.isWordLike).length;
}

export function newestFirst(posts) {
  return [...posts].sort((a, b) =>
    b.data.sortDate.localeCompare(a.data.sortDate) || a.slug.localeCompare(b.slug)
  );
}

export function homepagePosts(posts) {
  return pinnedFirst(posts).filter(post => post.data.homepagePinned).slice(0, 8);
}

export function pinnedFirst(posts) {
  return newestFirst(posts).sort((a, b) => Number(Boolean(b.data.pinned)) - Number(Boolean(a.data.pinned)));
}
