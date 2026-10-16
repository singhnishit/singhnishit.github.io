export function newestFirst(posts) {
  return [...posts].sort((a, b) =>
    b.data.sortDate.localeCompare(a.data.sortDate) || a.slug.localeCompare(b.slug)
  );
}

export function homepagePosts(posts) {
  return pinnedFirst(posts).filter(post => post.data.pinned || post.data.homepagePinned).slice(0, 8);
}

export function pinnedFirst(posts) {
  return newestFirst(posts).sort((a, b) => Number(Boolean(b.data.pinned)) - Number(Boolean(a.data.pinned)));
}
