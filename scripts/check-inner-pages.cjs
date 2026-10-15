const fs = require('node:fs');
const base = process.env.CHECK_SITE_URL || 'http://localhost:3011';
const manifest = JSON.parse(fs.readFileSync('.next/prerender-manifest.json','utf8'));
const routes=Object.keys(manifest.routes).filter(path=>path!=='/'&&!path.startsWith('/sitemap')&&!path.startsWith('/robots')&&!path.endsWith('.ico'));
const failures=[];
async function run() {
 let next=0,checked=0; const destinations=new Set();
 await Promise.all(Array.from({length:5},async()=>{
  while(next<routes.length) {
   const path=routes[next++];
   const response=await fetch(base+path,{redirect:'follow'});
   const html=await response.text();
   if(response.status!==200) failures.push(`${path}: HTTP ${response.status}`);
   const h1s=html.match(/<h1\b/g)||[];
   if(h1s.length!==1) failures.push(`${path}: ${h1s.length} H1s`);
   if(!html.includes('rel="canonical"')) failures.push(`${path}: canonical missing`);
   if(!html.includes('name="description"')) failures.push(`${path}: description missing`);
   if(!html.includes('application/ld+json')) failures.push(`${path}: structured data missing`);
   for(const match of html.matchAll(/href="(\/(?!\/)[^"#?]*)/g)) if(!match[1].startsWith('/_next')) destinations.add(match[1]);
   checked++;
  }
 }));
 for(const url of destinations) {
  const path=decodeURIComponent(url).replace(/\/$/,'')||'/';
  if(path==='/')continue;
  if(!routes.includes(path) && !manifest.routes[path] && !fs.existsSync('public'+path)) failures.push(`Unresolved internal link: ${url}`);
 }
 const home=await fetch(base).then(r=>r.text());
 if(!home.includes('cx-site-header'))failures.push('Home site navigation missing');
 const unknown=await fetch(base+'/this-page-does-not-exist');
 if(unknown.status!==404)failures.push('Unknown routes do not return 404');
 for(const resource of ['/robots.txt','/sitemap.xml'])if((await fetch(base+resource)).status!==200)failures.push(resource+' missing');
 for(const path of ['/the-art-of-storytelling','/what-is-ppc','/careers','/blog-standard']) {
  const response=await fetch(base+path,{redirect:'manual'});
  if(response.status!==308||!response.headers.get('location'))failures.push(path+' permanent redirect missing');
  const final=await fetch(base+path);
  if(final.status!==200)failures.push(path+' redirect destination failed');
 }
 console.log(JSON.stringify({checked,internalDestinations:destinations.size,failures},null,2));
 process.exitCode=failures.length?1:0;
}
run().catch(error=>{console.error(error);process.exitCode=1;});
