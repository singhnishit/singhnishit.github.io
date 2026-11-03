import {network,solve} from './model.mjs';
const {nodes,edges,C}=network(), $=id=>document.getElementById(id), svg=$('network');
const initial=nodes.map(n=>n.b), p=nodes.map(n=>n.p);
let b=[...initial], S=solve(C,b,p), delta=b.map(()=>0), mode=1, selected=-1, frame=0;
let reveal=b.map(()=>1), pulses=b.map(()=>0);
const ns='http://www.w3.org/2000/svg';
function element(tag,attrs,parent=svg){const e=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e;}
const neighbours=nodes.map(()=>[]);
// One undirected line represents the mean of the two directional shares.
// A common scale preserves proportionality while keeping faint edges visible.
const edgeStrength=({i,j})=>(C[i][j]+C[j][i])/2;
const maxEdgeStrength=Math.max(...edges.map(edgeStrength));
edges.forEach(({i,j})=>{
 neighbours[i].push(j);neighbours[j].push(i);
 element('line',{x1:nodes[i].x,y1:nodes[i].y,x2:nodes[j].x,y2:nodes[j].y,'stroke-width':2,'stroke-opacity':edgeStrength({i,j})/maxEdgeStrength,class:'edge'});
});
const groups=nodes.map((n,i)=>{
 const g=element('g',{class:'agent',tabindex:'0',role:'button','aria-label':`Agent ${i+1}`});
 element('circle',{cx:n.x,cy:n.y,r:22,class:'hit'},g);
 element('circle',{cx:n.x,cy:n.y,r:15,class:'wave','pointer-events':'none'},g);
 element('circle',{cx:n.x,cy:n.y,r:15,class:'ring'},g);
 element('circle',{cx:n.x,cy:n.y,r:10,class:'disc'},g);
 g.addEventListener('click',()=>act(i));
 g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();act(i);}});
 return g;
});
function paint(){
 const scale=Math.abs(delta[selected]||1);
 groups.forEach((g,i)=>{
  // A square-root color scale keeps smaller downstream changes visible.
  const t=Math.sqrt(Math.min(1,Math.abs(delta[i])/scale))*reveal[i];
  const from=[255,255,255],to=delta[i]<0?[238,99,82]:[5,165,81];
  g.querySelector('.disc').setAttribute('fill',`rgb(${from.map((v,k)=>Math.round(v+(to[k]-v)*t)).join(',')})`);
  const wave=g.querySelector('.wave');
  wave.setAttribute('stroke',`rgb(${to.join(',')})`);
  wave.setAttribute('r',10+14*pulses[i]);
  wave.setAttribute('opacity',pulses[i]>0?(1-pulses[i])*.8:0);
  g.classList.toggle('selected',i===selected);
  g.setAttribute('aria-label',`Agent ${i+1}, baseline ${b[i].toFixed(2)}, connected welfare ${S[i].toFixed(2)}. ${mode===1?'Help':'Harm'} this agent.`);
 });
}
function act(i){
 cancelAnimationFrame(frame);
 const before=solve(C,b,p);b[i]+=mode;selected=i;
 S=solve(C,b,p);delta=S.map((v,j)=>v-before[j]);
 // The final welfare solution is revealed along graph hops, not screen distance.
 // This timing is illustrative; it does not alter the equilibrium calculation.
 const distance=nodes.map(()=>Infinity),queue=[i];distance[i]=0;
 for(let head=0;head<queue.length;head++)for(const j of neighbours[queue[head]]){
  if(distance[j]===Infinity){distance[j]=distance[queue[head]]+1;queue.push(j);}
 }
 reveal=nodes.map(()=>0);reveal[i]=1;pulses=nodes.map(()=>0);paint();
 const finish=()=>{reveal=nodes.map(()=>1);pulses=nodes.map(()=>0);paint();};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
 const start=performance.now(),delay=480,duration=680;
 const end=Math.max(...distance.filter(Number.isFinite))*delay+duration;
 function tick(now){
  const elapsed=now-start;
  nodes.forEach((_,j)=>{
   const progress=Math.max(0,Math.min(1,(elapsed-distance[j]*delay)/duration));
   reveal[j]=j===i?1:progress*progress*(3-2*progress);
   pulses[j]=progress;
  });
  paint();if(elapsed<end)frame=requestAnimationFrame(tick);else finish();
 }
 frame=requestAnimationFrame(tick);
}
for(const [id,value] of [['help',1],['harm',-1]])$(id).addEventListener('click',()=>{mode=value;$('help').setAttribute('aria-pressed',String(mode===1));$('harm').setAttribute('aria-pressed',String(mode===-1));paint();});
$('reset').addEventListener('click',()=>{cancelAnimationFrame(frame);b=[...initial];S=solve(C,b,p);delta=b.map(()=>0);selected=-1;reveal=b.map(()=>1);pulses=b.map(()=>0);paint();});
new ResizeObserver(()=>{try{if(window.frameElement)window.frameElement.style.height=`${Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}px`;}catch{}}).observe(document.querySelector('main'));
paint();
