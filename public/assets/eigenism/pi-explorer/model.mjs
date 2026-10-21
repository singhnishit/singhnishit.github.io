// Nonempty antichains of nonempty source subsets (Williams–Beer PI atoms).
export const popcount = n => n.toString(2).replaceAll('0', '').length;
export const indices = mask => [1, 2, 3, 4].filter(i => mask & (1 << (i - 1)));
export const atomKey = groups => [...groups].sort((a, b) => a - b).join('-');
export const notation = groups => groups.map(g => `{${indices(g).join('')}}`).join('');
export const sourceName = i => `X${'₀₁₂₃₄'[i]}`;
export const groupName = mask => indices(mask).map(sourceName).join(' + ');
export function category(groups) {
  if (groups.length === 1) return popcount(groups[0]) === 1 ? 'individual' : 'synergistic';
  return groups.every(g => popcount(g) === 1) ? 'collective' : 'mixed';
}
export const titles = {
  individual: 'Individual information', collective: 'Collective information · redundant',
  synergistic: 'Synergistic information', mixed: 'Collective + synergistic information'
};
export function atoms(n) {
  const result = [], end = (1 << n) - 1;
  function visit(groups, start) {
    if (groups.length) result.push({ groups: [...groups], key: atomKey(groups), category: category(groups) });
    for (let g = start; g <= end; g++) {
      if (groups.every(h => (g & h) !== g && (g & h) !== h)) visit([...groups, g], g + 1);
    }
  }
  visit([], 1);
  const order = ['individual', 'collective', 'synergistic', 'mixed'];
  return result.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) ||
    a.groups.length - b.groups.length || notation(a.groups).localeCompare(notation(b.groups)));
}
export function describe(atom, n) {
  const { groups, category: kind } = atom;
  const routes = groups.map(g => popcount(g) === 1 ? `${groupName(g)} alone` : `${groupName(g)} together`);
  if (kind === 'individual') {
    const others = indices(((1 << n) - 1) ^ groups[0]).map(sourceName).join(', ');
    return `Information about U available from ${routes[0]}, but unavailable from ${others}, even jointly. Unique to this source relative to the others.`;
  }
  if (kind === 'collective') return `The same information about U is available from ${routes.join(' or ')}. These sources offer alternative access to this contribution; they need not be combined.`;
  if (kind === 'synergistic') return `Information about U that requires ${routes[0]}. No group missing any of these sources provides this contribution.`;
  const allJoint = groups.every(g => popcount(g) > 1);
  return `The same information about U is available from ${routes.join(' OR ')}. Redundant across these alternative routes; ${allJoint ? 'each route requires a joint contribution, and no individual source supplies it' : 'the joint route requires synergy, while a single-source route also supplies it'}.`;
}
export const diagrams = {
  2: { width: 640, height: 390, outer: [3, 320, 195, 300, 174, 0], shapes: [
    [1, 247, 205, 145, 118, 0], [2, 393, 205, 145, 118, 0]
  ], labels: { '1': [206,205], '2': [434,205], '1-2': [320,205], '3': [320,54] } },
  3: { width: 640, height: 610, outer: [7, 320, 300, 290, 290, 0], shapes: [
    [1,320,222,112,112,0], [2,378,323,112,112,0], [4,262,323,112,112,0],
    [3,345,291,255,155,60], [5,295,291,255,155,120], [6,320,339,255,155,0]
  ], labels: { '1':[320,148],'2':[460,358],'3':[426,502],'4':[180,358],'5':[214,502],'6':[100,294],'7':[320,34],'3-5':[320,90],'1-6':[320,204],'3-5-6':[320,448],'1-4':[260,230],'1-2':[376,230],'5-6':[190,436],'3-6':[450,436],'3-4':[224,318],'2-5':[416,318],'1-2-4':[320,302],'2-4':[318,352] } }
};
export function contains(x, y, shape) {
  const [,cx,cy,rx,ry,angle] = shape, a = angle * Math.PI / 180;
  const dx=x-cx, dy=y-cy;
  return ((dx*Math.cos(a)+dy*Math.sin(a))/rx)**2 + ((-dx*Math.sin(a)+dy*Math.cos(a))/ry)**2 <= 1;
}
export function regionAt(x, y, n) {
  const diagram = diagrams[n];
  if (!diagram || !contains(x, y, diagram.outer)) return null;
  const groups = [...diagram.shapes.filter(s => contains(x,y,s)).map(s=>s[0]), diagram.outer[0]];
  return atomKey(groups.filter(g => !groups.some(h => h !== g && (g & h) === h)));
}
