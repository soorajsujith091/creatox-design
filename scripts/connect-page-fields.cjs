// One-time source migration: connect public JSX text/images to the Pages CMS.
const fs=require('fs'),path=require('path'),ts=require('typescript'),crypto=require('crypto');
const root=path.resolve(__dirname,'..','src','components');
const files=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(['admin','cms'].includes(entry.name))continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(full.endsWith('.tsx')&&!['CmsImage.tsx','CmsArticles.tsx','SiteChrome.tsx','Preloader.tsx','PageTransition.tsx','CustomCursor.tsx'].includes(entry.name))files.push(full);}}walk(root);
const textTags=new Set(['h1','h2','h3','h4','h5','p','span','li','dt','dd','blockquote','figcaption','strong','em','a','Link','button','label','summary','small','address','option','th','td']);
function decode(s){return s.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi,(_,v)=>v[0]==='#'?String.fromCodePoint(v[1].toLowerCase()==='x'?parseInt(v.slice(2),16):parseInt(v.slice(1),10)):({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0'}[v]||_));}
let touched=0,total=0;
for(const file of files){
 let code=fs.readFileSync(file,'utf8');if(code.includes('/* cms-page-fields */'))continue;
 const source=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[],used=new Set();
 const relative=path.relative(root,file).replace(/\\/g,'/'),prefix=crypto.createHash('sha1').update(relative).digest('hex').slice(0,9);
 const section=path.basename(file,'.tsx').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/-/g,' ');
 let count=0;const id=()=>`${prefix}_${++count}`;
 function edit(start,end,text){edits.push({start,end,text});}
 function containsJsx(node){let found=false;function visit(n){if(ts.isJsxElement(n)||ts.isJsxSelfClosingElement(n)||ts.isArrowFunction(n)){found=true;return;}ts.forEachChild(n,visit);}visit(node);return found;}
 function visit(node){
  if(ts.isJsxElement(node)||ts.isJsxSelfClosingElement(node)){
   const opening=ts.isJsxElement(node)?node.openingElement:node;
   const tag=opening.tagName.getText(source);
   const hasRef=opening.attributes.properties.some(p=>ts.isJsxAttribute(p)&&p.name.getText(source)==='ref');
   if(!hasRef&&['Image','img','Link'].includes(tag)){
    const replacement={Image:'PageImage',img:'PageNativeImage',Link:'PageLink'}[tag];used.add(replacement);
    const attrs=` field=${JSON.stringify(id())} section=${JSON.stringify(section)}`;
    edit(opening.tagName.getStart(source),opening.tagName.end,replacement+attrs);
    if(ts.isJsxElement(node))edit(node.closingElement.tagName.getStart(source),node.closingElement.tagName.end,replacement);
   }
   if(ts.isJsxElement(node)&&textTags.has(tag)){
    for(const child of node.children){
     if(ts.isJsxText(child)){
      const raw=child.getText(source);if(!raw.trim())continue;
      const value=decode(raw.includes('\n')?raw.split(/\r?\n/).map(v=>v.trim()).filter(Boolean).join(' '):raw);
      used.add('PageText');edit(child.getStart(source),child.end,`<PageText field=${JSON.stringify(id())} section=${JSON.stringify(section)} label=${JSON.stringify(/^h\d$/.test(tag)?'Heading':tag==='button'?'Button text':'Text')}>{${JSON.stringify(value)}}</PageText>`);
     }else if(ts.isJsxExpression(child)&&child.expression&&!containsJsx(child.expression)){
      const expr=child.expression.getText(source);if(!expr.trim()||expr==='children'||/^['"\s]+$/.test(expr))continue;
      used.add('PageText');edit(child.getStart(source),child.end,`<PageText field=${JSON.stringify(id())} section=${JSON.stringify(section)} label=${JSON.stringify(/^h\d$/.test(tag)?'Heading':'Text')}>${child.getText(source)}</PageText>`);
     }
    }
   }
  }
  ts.forEachChild(node,visit);
 }
 visit(source);if(!edits.length)continue;
 // Remove default imports replaced by managed versions, unless used elsewhere.
 for(const statement of source.statements){if(!ts.isImportDeclaration(statement))continue;const mod=statement.moduleSpecifier.text;const name=statement.importClause?.name?.text;if((mod==='next/image'&&name==='Image')||(mod==='next/link'&&name==='Link')){
   const tagCount=(code.match(new RegExp(`<${name}(?:\\s|>)`,'g'))||[]).length;
   const replaced=edits.filter(e=>e.text.startsWith(name==='Image'?'PageImage field=':'PageLink field=')).length;
   if(tagCount===replaced)edit(statement.getStart(source),statement.end,'');
 }}
 const firstImport=source.statements.find(ts.isImportDeclaration);const insert=firstImport?firstImport.getStart(source):source.statements[0]?.end||0;
 edit(insert,insert,`/* cms-page-fields */\nimport { ${[...used].join(', ')} } from "@/components/cms/PageContent";\n`);
 edits.sort((a,b)=>b.start-a.start||b.end-a.end);for(const e of edits)code=code.slice(0,e.start)+e.text+code.slice(e.end);
 fs.writeFileSync(file,code);touched++;total+=count;
}
console.log(`Connected ${total} content fields across ${touched} public components.`);
