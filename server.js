const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
http.createServer((req,res)=>{
  let pathname; try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  const routes={'/':'index.html','/menu':'menu.html','/contact':'contact.html','/order':'order.html'};
  const file=path.resolve(root,'.'+(routes[pathname]?'/'+routes[pathname]:pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpeg':'image/jpeg','.gif':'image/gif'})[path.extname(file)]||'application/octet-stream');res.end(data);});
}).listen(3000,'0.0.0.0',()=>console.log('Treat Credit: http://localhost:3000'));
