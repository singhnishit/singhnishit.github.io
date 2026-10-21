import { atoms, notation, diagrams, regionAt } from './model.mjs';
const n = new URLSearchParams(location.search).get('sources') === '3' ? 3 : 2;
const all = atoms(n), byKey = new Map(all.map(a => [a.key, a])), d = diagrams[n];
const $ = id => document.getElementById(id);
// Plain regions with a subtle monochrome highlight for interaction.
const colors = {individual:'#fdfdfd', collective:'#fdfdfd', synergistic:'#fdfdfd', mixed:'#fdfdfd'};
const activeColors = {individual:'#e6e6e6', collective:'#e6e6e6', synergistic:'#e6e6e6', mixed:'#e6e6e6'};
const titles = { individual:'individual', collective:'collective', synergistic:'synergistic', mixed:'collective, synergistic' };
$('heading').textContent = `${n} sources`;
document.title = `${n}-source PI decomposition`;
function ellipse(s, attrs='') {
  const [,x,y,rx,ry,a] = s;
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" ${attrs}/>`;
}
let defs = `<clipPath id="outer">${ellipse(d.outer)}</clipPath>`;
for (const s of d.shapes) defs += `<clipPath id="coalition-${s[0]}">${ellipse(s)}</clipPath>`;
let regions = '', labels = '';
for (const atom of all) {
  const present = d.shapes.filter(s => atom.groups.some(g => (s[0]&g)===g));
  const absent = d.shapes.filter(s => !present.includes(s));
  defs += `<mask id="mask-${atom.key}" maskUnits="userSpaceOnUse" x="0" y="0" width="${d.width}" height="${d.height}"><rect width="100%" height="100%" fill="white"/>${absent.map(s => ellipse(s,'fill="black"')).join('')}</mask>`;
  regions += `<g clip-path="url(#outer)">${present.map(s => `<g clip-path="url(#coalition-${s[0]})">`).join('')}<rect class="region" data-key="${atom.key}" width="${d.width}" height="${d.height}" fill="${colors[atom.category]}" mask="url(#mask-${atom.key})"/>${'</g>'.repeat(present.length)}</g>`;
  const [x,y] = d.labels[atom.key];
  labels += `<text class="region-label" data-key="${atom.key}" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" tabindex="0" role="button" aria-label="${notation(atom.groups)}: ${titles[atom.category]}" aria-describedby="tooltip" aria-expanded="false">${notation(atom.groups)}</text>`;
}
$('diagram').innerHTML = `<svg viewBox="0 0 ${d.width} ${d.height}" role="group" aria-label="${n}-source partial information diagram, ${all.length} regions"><defs>${defs}</defs>${regions}${d.shapes.map(s => ellipse(s,'class="boundary"')).join('')}${ellipse(d.outer,'class="boundary"')}${labels}</svg>`;
const svg = $('diagram').querySelector('svg'), tip = $('tooltip');
let selected = null, pinned = false;
function hide() {
  tip.hidden = true; selected = null; pinned = false;
  for (const mark of svg.querySelectorAll('[data-key]')) {
    mark.classList.remove('active');
    if (mark.classList.contains('region')) mark.setAttribute('fill', colors[byKey.get(mark.dataset.key).category]);
    else mark.setAttribute('aria-expanded','false');
  }
}
function show(key, x, y) {
  const atom = byKey.get(key); if (!atom) return;
  selected = key;
  $('kind').textContent = titles[atom.category];
  $('notation').textContent = `Π(U; ${notation(atom.groups)})`;
  tip.hidden = false;
  for (const mark of svg.querySelectorAll('[data-key]')) {
    const active = mark.dataset.key === key;
    if (mark.classList.contains('region')) mark.setAttribute('fill', (active ? activeColors : colors)[byKey.get(mark.dataset.key).category]);
    else { mark.classList.toggle('active',active); mark.setAttribute('aria-expanded',String(active)); }
  }
  const r = tip.getBoundingClientRect();
  tip.style.left = `${Math.max(8,Math.min(x+12,innerWidth-r.width-8))}px`;
  tip.style.top = `${Math.max(8,Math.min(y+16,innerHeight-r.height-8))}px`;
}
function hit(e) {
  const p = new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  return regionAt(p.x,p.y,n);
}
svg.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse' || pinned) return;
  const key = hit(e);
  if (key) show(key,e.clientX,e.clientY); else hide();
});
svg.addEventListener('pointerleave', e => {
  if (!pinned && !tip.contains(e.relatedTarget) && !svg.contains(document.activeElement)) hide();
});
tip.addEventListener('pointerleave', () => { if (!pinned && !svg.contains(document.activeElement)) hide(); });
svg.addEventListener('click', e => {
  const key = hit(e);
  if (key) { if (pinned && selected === key) hide(); else {show(key,e.clientX,e.clientY); pinned=true;} }
});
for (const label of svg.querySelectorAll('.region-label')) {
  const activate = () => { const r=label.getBoundingClientRect(); show(label.dataset.key,r.left,r.bottom); };
  label.addEventListener('focus', () => { pinned=false; activate(); });
  label.addEventListener('blur', () => { if (!pinned) hide(); });
  label.addEventListener('keydown', e => {
    if (e.key==='Enter' || e.key===' ') { e.preventDefault(); activate(); pinned=true; }
  });
}
document.addEventListener('keydown', e => { if(e.key==='Escape') hide(); });
document.addEventListener('pointerdown', e => { if (!svg.contains(e.target) && !tip.contains(e.target)) hide(); });
window.addEventListener('blur',hide);
window.addEventListener('resize',hide);
new ResizeObserver(() => {
  // Keep SVG text at the blog's body size as the diagram scales.
  svg.style.setProperty('--label-size',`${13*d.width/svg.getBoundingClientRect().width}px`);
  try { if(window.frameElement) window.frameElement.style.height=`${Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}px`; } catch {}
}).observe(document.querySelector('main'));
