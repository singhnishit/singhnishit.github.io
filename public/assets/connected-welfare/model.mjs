// Illustrative connectedness weights, not estimates of GML/Shapley identity.
export const gamma = 0.75;
export function transform(w, p) {
  if (w < 0) return (1 - (1 - w) ** (1 + p)) / (1 + p);
  return Math.abs(p - 1) < 1e-9 ? Math.log1p(w) : ((1 + w) ** (1 - p) - 1) / (1 - p);
}
export function network() {
  let seed = 91;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const nodes = Array.from({length:48}, (_,i) => ({
    x: 34 + (i % 8) * 72 + (random()-.5)*22,
    y: 34 + Math.floor(i/8) * 66 + (random()-.5)*22,
    b: random()*1.6-.6, p: .2 + random()*.8,
  }));
  const edges = [], C = nodes.map(()=>Array(48).fill(0));
  nodes.forEach((a,i)=>nodes.forEach((b,j)=>{
    if (j<=i) return;
    const distance = Math.hypot(a.x-b.x,a.y-b.y);
    if (distance<91 || (distance<145 && random()<.12)) {
      const weight = .25+random()*.75;
      edges.push({i,j,weight}); C[i][j]=C[j][i]=weight;
    }
  }));
  C.forEach((row,i)=>{
    const total=row.reduce((a,b)=>a+b,0);
    row.forEach((v,j)=>row[j]=total ? .55*v/total : 0);
    row[i]=.45;
  });
  return {nodes,edges,C};
}
export const multiply = (C,v) => C.map(row=>row.reduce((sum,c,j)=>sum+c*v[j],0));
export function solve(C,b,p) {
  const direct=multiply(C,b.map((w,i)=>transform(w,p[i])));
  let S=Array(b.length).fill(0);
  for(let k=0;k<180;k++) {
    const next=multiply(C,S).map((v,i)=>direct[i]+gamma*v);
    if(Math.max(...next.map((v,i)=>Math.abs(v-S[i])))<1e-10) return next;
    S=next;
  }
  return S;
}
