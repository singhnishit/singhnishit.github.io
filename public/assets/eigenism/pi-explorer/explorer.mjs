import { atoms, notation, sourceName, groupName, category, titles, describe, diagrams, regionAt } from './model.mjs';
const $ = id => document.getElementById(id);
const host = $('diagram'), picker = $('region-select');
const colors = { individual:'#dce7f0', collective:'#dce8de', synergistic:'#f2e5cf', mixed:'url(#mixed-fill)' };
const highlights = { individual:'#aac7df', collective:'#a9c9b1', synergistic:'#dfc18c', mixed:'url(#mixed-active)' };
let n=2, all=[], byKey=new Map(), selected=null;
const tooltip=document.createElement('div');
tooltip.className='hover-tip'; tooltip.hidden=true; tooltip.setAttribute('aria-hidden','true'); document.body.append(tooltip);
function ellipse(s,attrs='') {
  const [,x,y,rx,ry,a]=s;
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" ${attrs}/>`;
}
function drawDiagram() {
  const d=diagrams[n];
  let defs=`<pattern id="mixed-fill" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#dce8de"/><rect width="4" height="8" fill="#f2e5cf"/></pattern><pattern id="mixed-active" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#a9c9b1"/><rect width="4" height="8" fill="#dfc18c"/></pattern>`;
  defs+=`<clipPath id="outer">${ellipse(d.outer)}</clipPath>`;
  for(const s of d.shapes) defs+=`<clipPath id="coalition-${s[0]}">${ellipse(s)}</clipPath>`;
  let regions='', labels='';
  for(const atom of all) {
    const present=d.shapes.filter(s=>atom.groups.some(g=>(s[0]&g)===g));
    const absent=d.shapes.filter(s=>!present.includes(s));
    defs+=`<mask id="mask-${atom.key}" maskUnits="userSpaceOnUse" x="0" y="0" width="${d.width}" height="${d.height}"><rect width="100%" height="100%" fill="white"/>${absent.map(s=>ellipse(s,'fill="black"')).join('')}</mask>`;
    regions+=`<g clip-path="url(#outer)">${present.map(s=>`<g clip-path="url(#coalition-${s[0]})">`).join('')}<rect class="region-color" data-key="${atom.key}" width="${d.width}" height="${d.height}" fill="${colors[atom.category]}" mask="url(#mask-${atom.key})"/>${'</g>'.repeat(present.length)}</g>`;
    const [x,y]=d.labels[atom.key];
    labels+=`<text class="region-label" data-key="${atom.key}" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${notation(atom.groups)}</text>`;
  }
  host.innerHTML=`<svg viewBox="0 0 ${d.width} ${d.height}" role="img" aria-labelledby="diagram-access-title diagram-access-description"><title id="diagram-access-title">${n}-source partial information diagram</title><desc id="diagram-access-description">${all.length} regions show individual, redundant and synergistic information about U. Hover or tap a region to inspect it, or use the Explore a region selector below the diagram for keyboard access.</desc><defs>${defs}</defs>${regions}${d.shapes.map(s=>ellipse(s,'class="boundary"')).join('')}${ellipse(d.outer,'class="boundary outer-boundary"')}${labels}</svg>`;
  const svg=host.querySelector('svg');
  function hit(event) {
    const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
    return regionAt(p.x,p.y,n);
  }
  svg.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    const key=hit(event); if(key){ select(key); showTooltip(event); } else hideTooltip();
  });
  svg.addEventListener('click',event=>{ const key=hit(event); if(key)select(key,true); hideTooltip(); });
  svg.addEventListener('pointerleave',hideTooltip);
}
function drawMap() {
  host.innerHTML='';
  const shortTitles={individual:'Individual',collective:'Collective / redundant',synergistic:'Synergistic',mixed:'Collective + synergistic'};
  for(const kind of Object.keys(shortTitles)) {
    const group=all.filter(a=>a.category===kind), section=document.createElement('section');
    section.className='map-section';
    const heading=document.createElement('h3');
    heading.innerHTML=`<span>${shortTitles[kind]}</span><span>${group.length} regions</span>`;
    const grid=document.createElement('div'); grid.className='atom-grid';
    for(const atom of group) {
      const button=document.createElement('button'); button.type='button';
      button.className=`atom-tile ${kind}`; button.dataset.key=atom.key;
      button.textContent=String(all.indexOf(atom)+1).padStart(3,'0');
      button.setAttribute('aria-label',`${button.textContent}: ${titles[kind]}, ${notation(atom.groups)}; ${atom.groups.map(groupName).join(' or ')}`);
      button.setAttribute('aria-pressed','false');
      button.addEventListener('pointermove',e=>{if(e.pointerType!=='touch'){select(atom.key);showTooltip(e);}});
      button.addEventListener('pointerleave',hideTooltip);
      button.addEventListener('focus',()=>select(atom.key,true));
      button.addEventListener('click',()=>{select(atom.key,true);hideTooltip();});
      grid.append(button);
    }
    section.append(heading,grid);host.append(section);
  }
}
function hideTooltip(){tooltip.hidden=true;}
function showTooltip(e) {
  const atom=byKey.get(selected);
  tooltip.textContent=`${titles[atom.category]}\n${notation(atom.groups)} · ${atom.groups.map(groupName).join(' OR ')}`;
  tooltip.hidden=false;
  const rect=tooltip.getBoundingClientRect();
  tooltip.style.left=`${Math.max(8,Math.min(e.clientX+14,innerWidth-rect.width-8))}px`;
  tooltip.style.top=`${e.clientY+18+rect.height>innerHeight ? Math.max(8,e.clientY-rect.height-12):e.clientY+18}px`;
}
function select(key, announce=false) {
  const atom=byKey.get(key); if(!atom)return;
  const changed=selected!==key; selected=key;
  if(changed) {
    $('region-type').textContent=titles[atom.category];
    $('region-notation').textContent=notation(atom.groups);
    $('region-description').textContent=describe(atom,n);
    picker.value=key;
    for(const mark of host.querySelectorAll('[data-key]')) {
      const active=mark.dataset.key===key;
      if(mark.classList.contains('region-color')) mark.setAttribute('fill',(active?highlights:colors)[byKey.get(mark.dataset.key).category]);
      if(mark.classList.contains('region-label'))mark.classList.toggle('active',active);
      if(mark.classList.contains('atom-tile')) {mark.classList.toggle('selected',active);mark.setAttribute('aria-pressed',String(active));}
    }
  }
  if(announce)$('selection-announcement').textContent=`${notation(atom.groups)}. ${titles[atom.category]}. ${describe(atom,n)}`;
}
function render(count) {
  n=count;all=atoms(n);byKey=new Map(all.map(a=>[a.key,a]));selected=null;hideTooltip();
  for(const b of document.querySelectorAll('[data-n]'))b.setAttribute('aria-pressed',String(Number(b.dataset.n)===n));
  host.dataset.n=String(n);
  document.querySelector('.pi-explorer').dataset.n=String(n);
  const sources=Array.from({length:n},(_,i)=>sourceName(i+1)).join(', ');
  $('target-line').textContent=`${sources} → target U`;
  $('count-line').textContent=`${all.length} PI regions`;
  $('diagram-title').textContent=n===4?'I(U; X₁, X₂, X₃, X₄) · region map':`I(U; ${sources})`;
  $('mixed-legend').hidden=n===2;$('map-note').hidden=n!==4;
  picker.replaceChildren(...all.map((atom,i)=>{
    const option=document.createElement('option');option.value=atom.key;
    option.textContent=`${n===4?String(i+1).padStart(3,'0')+' · ':''}${notation(atom.groups)} — ${titles[atom.category]}`;return option;
  }));
  if(n===4)drawMap();else drawDiagram();
  select(String((1<<n)-1));
}
document.querySelectorAll('.source-switch button').forEach(b=>b.addEventListener('click',()=>{
  render(Number(b.dataset.n));
  $('selection-announcement').textContent=`${n} source variables plus target U. ${all.length} partial information regions.`;
}));
picker.addEventListener('change',()=>select(picker.value,true));
window.addEventListener('scroll',hideTooltip,{passive:true});
window.addEventListener('blur',hideTooltip);
render(2);
// The blog embeds this page on the same origin; grow/shrink the iframe to its content.
// Standalone and cross-origin use remain functional without this enhancement.
new ResizeObserver(()=>{
  try {if(window.frameElement) window.frameElement.style.height=`${Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}px`;} catch { /* cross-origin embed */ }
}).observe(document.querySelector('main'));
