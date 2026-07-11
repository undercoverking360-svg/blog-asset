// RG MEDIA LINK FORGE v4 - FORCE REPLACE + MULTI-TARGET + CACHE BUST
// Blogger Body me app.bundle.js ke BAAD daalo
(function(){
  const VERSION = 'v4-'+Date.now();
  console.log('[RG-TOOL] Loading', VERSION);
  const CSS = `
  .rg-tool-card{position:relative;display:flex;flex-direction:column;height:100%;min-height:560px;border-radius:12px;border:1px solid rgba(51,65,85,0.85);background:rgba(2,6,23,0.88);backdrop-filter:blur(14px);overflow:hidden;box-shadow:0 0 30px rgba(249,115,22,0.15)}
  .rg-tool-head{padding:14px 16px;border-bottom:1px solid rgba(30,41,59,0.9);display:flex;justify-content:space-between;align-items:center;background:linear-gradient(90deg,rgba(249,115,22,0.08),transparent)}
  .rg-tool-title{font-size:11px;letter-spacing:.18em;font-weight:900;color:#e2e8f0;display:flex;gap:8px;align-items:center}
  .rg-tool-badge{font-size:9px;padding:3px 9px;border-radius:20px;background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.4);color:#22c55e;letter-spacing:.12em;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
  .rg-tabs{display:flex;gap:6px;padding:10px 12px;background:rgba(15,23,42,0.7)}
  .rg-tab{flex:1;padding:9px;font-size:10px;font-weight:800;letter-spacing:.12em;border-radius:8px;border:1px solid #1e293b;background:#0f172a;color:#64748b;cursor:pointer;transition:.2s}
  .rg-tab.active{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border-color:#fb923c;box-shadow:0 0 18px rgba(249,115,22,.4)}
  .rg-drop{margin:12px;border:1.9px dashed #334155;border-radius:12px;padding:20px;text-align:center;transition:.25s;cursor:pointer;background:rgba(15,23,42,0.45)}
  .rg-drop.drag{border-color:#f97316;background:rgba(249,115,22,.1);transform:scale(1.015)}
  .rg-drop video,.rg-drop img{max-width:100%;max-height:190px;border-radius:10px;margin:12px auto;display:block;box-shadow:0 4px 15px rgba(0,0,0,.4)}
  .rg-input{width:100%;background:#020617;border:1px solid #1e293b;color:#cbd5e1;border-radius:8px;padding:10px;font-size:11px;font-family:monospace;outline:none}
  .rg-input:focus{border-color:#f97316;box-shadow:0 0 0 2px rgba(249,115,22,.15)}
  .rg-btn-main{width:100%;padding:12px;background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);border:none;border-radius:10px;color:#fff;font-weight:900;font-size:11px;letter-spacing:.14em;cursor:pointer;box-shadow:0 6px 20px rgba(239,68,68,.35);transition:.2s}
  .rg-btn-main:hover{transform:translateY(-1px);box-shadow:0 8px 25px rgba(239,68,68,.5)}
  .rg-url-box{background:#020617;border:1px solid #1e293b;border-radius:10px;padding:10px;display:flex;gap:8px;align-items:center}
  .rg-url-text{flex:1;font-size:10px;color:#22c55e;word-break:break-all;font-family:monospace;max-height:100px;overflow:auto;line-height:1.4}
  .rg-small{font-size:9px;color:#64748b;letter-spacing:.08em;line-height:1.5}
  .rg-force-btn{position:fixed;bottom:18px;right:18px;z-index:99999;padding:10px 14px;background:#f97316;color:#fff;border:none;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:.1em;box-shadow:0 4px 20px rgba(249,115,22,.5);cursor:pointer}
  `;
  function injectCSS(){ if(document.getElementById('rg-tool-css-v4')) return; const s=document.createElement('style'); s.id='rg-tool-css-v4'; s.textContent=CSS; document.head.appendChild(s); }

  function buildTool(container, targetName){
    injectCSS();
    container.innerHTML = `
      <div class="rg-tool-card">
        <div class="rg-tool-head">
          <div class="rg-tool-title"><span>◈</span> MEDIA LINK FORGE <span style="font-size:8px;color:#64748b;margin-left:6px">[${targetName}]</span></div>
          <div class="rg-tool-badge">● LIVE FORGE v4</div>
        </div>
        <div class="rg-tabs">
          <button class="rg-tab active" data-tab="video">▶ VIDEO 10S</button>
          <button class="rg-tab" data-tab="photo">◉ PHOTO 10MB</button>
        </div>
        <div style="padding:0 12px;flex:1;overflow:auto">
          <div id="rg-drop" class="rg-drop">
            <div style="font-size:24px">⬆</div>
            <div style="font-size:11px;font-weight:800;color:#e2e8f0;margin-top:6px" id="rg-drop-title">DROP 10 SEC VIDEO HERE</div>
            <div class="rg-small" id="rg-drop-sub">MP4 / WEBM / MOV • Max 10s • Auto URL</div>
            <div id="rg-preview"></div>
            <input type="file" id="rg-file" hidden />
          </div>
          <div style="margin:10px 2px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div><div class="rg-small">MAX DURATION</div><div style="font-size:12px;font-weight:800;color:#f97316">10.0 SEC</div></div>
            <div style="text-align:right"><div class="rg-small">MAX PHOTO SIZE</div><div style="font-size:12px;font-weight:800;color:#22c55e">10 MB</div></div>
          </div>
          <input id="rg-external-url" class="rg-input" placeholder="Paste external URL or leave empty..." />
          <div style="margin-top:12px"><button id="rg-forge" class="rg-btn-main">⚡ FORGE SECURE LINK</button></div>
          <div id="rg-extra-links"></div>
          <div id="rg-result" style="display:none;margin-top:12px">
            <div class="rg-small" style="margin-bottom:6px">GENERATED URL (instant)</div>
            <div class="rg-url-box"><div id="rg-url-text" class="rg-url-text"></div><button id="rg-copy" style="padding:6px 10px;border-radius:7px;background:#1e293b;border:1px solid #334155;color:#fff;font-size:10px;cursor:pointer">COPY</button></div>
            <div style="display:flex;gap:8px;margin-top:8px">
              <button id="rg-open" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">OPEN</button>
              <button id="rg-download" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">DOWNLOAD</button>
            </div>
          </div>
        </div>
        <div style="padding:10px 12px;border-top:1px solid #1e293b;background:rgba(2,6,23,0.7);display:flex;justify-content:space-between" class="rg-small">
          <span>STATUS: <span style="color:#22c55e">● READY</span></span><span id="rg-info">0 / 10s | 0 MB</span>
        </div>
      </div>
    `;
    const state={mode:'video',file:null,blobUrl:''};
    const drop=container.querySelector('#rg-drop'), fileInput=container.querySelector('#rg-file'), preview=container.querySelector('#rg-preview'), title=container.querySelector('#rg-drop-title'), sub=container.querySelector('#rg-drop-sub'), info=container.querySelector('#rg-info'), forgeBtn=container.querySelector('#rg-forge'), result=container.querySelector('#rg-result'), urlText=container.querySelector('#rg-url-text'), extInput=container.querySelector('#rg-external-url');
    function setMode(m){state.mode=m; container.querySelectorAll('.rg-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===m)); if(m==='video'){title.textContent='DROP 10 SEC VIDEO HERE'; sub.textContent='MP4 / WEBM / MOV • Max 10s'; fileInput.accept='video/*';} else {title.textContent='DROP PHOTO HERE (10MB MAX)'; sub.textContent='JPG / PNG / WEBP / GIF • Max 10MB'; fileInput.accept='image/*';} preview.innerHTML=''; state.file=null; state.blobUrl=''; result.style.display='none';}
    container.querySelectorAll('.rg-tab').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.tab)));
    function handleFile(f){ if(!f) return; if(state.mode==='photo' && f.size>10*1024*1024){alert('Photo >10MB!');return;} state.file=f; const blob=URL.createObjectURL(f); state.blobUrl=blob; if(state.mode==='video'){ preview.innerHTML=`<video src="${blob}" controls muted style="width:100%;max-height:190px;border-radius:10px"></video><div class="rg-small" style="margin-top:6px">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`; const v=document.createElement('video'); v.preload='metadata'; v.src=blob; v.onloadedmetadata=()=>{const d=v.duration; info.textContent=d.toFixed(1)+'s / 10s | '+(f.size/1024/1024).toFixed(2)+' MB'; if(d>10){alert('10s se zyada hai! '+d.toFixed(1)+'s'); preview.innerHTML='';} URL.revokeObjectURL(v.src);}; } else { preview.innerHTML=`<img src="${blob}" /><div class="rg-small">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`; info.textContent=`Image • ${(f.size/1024/1024).toFixed(2)} MB / 10 MB`; } }
    drop.addEventListener('click',()=>fileInput.click()); fileInput.addEventListener('change',e=>handleFile(e.target.files[0])); drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('drag');}); drop.addEventListener('dragleave',()=>drop.classList.remove('drag')); drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('drag');handleFile(e.dataTransfer.files[0]);});
    forgeBtn.addEventListener('click',()=>{
      let finalUrl=state.blobUrl||extInput.value.trim(); if(!finalUrl){alert('Pehle file drop karo!');return;} urlText.textContent=finalUrl; result.style.display='block'; navigator.clipboard?.writeText(finalUrl); forgeBtn.textContent='✓ COPIED!'; setTimeout(()=>forgeBtn.textContent='⚡ FORGE SECURE LINK',1500);
      const extra=document.getElementById('rg-extra-links');
      if(state.file && state.mode==='photo'){ const r=new FileReader(); r.onload=e=>{ const dataUrl=e.target.result; if(extra){ extra.innerHTML=`<div class="rg-small" style="margin-top:10px;color:#f59e0b">PERMANENT DATA URL (Blogger RG_CONFIG me paste karo):</div><div class="rg-url-box" style="margin-top:6px"><div class="rg-url-text" style="color:#fbbf24;max-height:60px">${dataUrl.slice(0,180)}...</div><button id="rg-copy-data" style="padding:6px 8px;background:#422006;border:1px solid #92400e;color:#fbbf24;border-radius:7px;font-size:9px;cursor:pointer">COPY DATA URL (${(dataUrl.length/1024).toFixed(0)}KB)</button></div>`; document.getElementById('rg-copy-data').onclick=()=>{navigator.clipboard.writeText(dataUrl); alert('Data URL copied! Ab RG_CONFIG.adminProfile me paste kar do');}; } window.RG_LAST_DATA_URL=dataUrl; }; r.readAsDataURL(state.file); }
      if(state.file && state.mode==='video'){ if(extra) extra.innerHTML=`<div class="rg-small" style="margin-top:10px;color:#f97316">Uploading to permanent host...</div>`; const fd=new FormData(); fd.append('reqtype','fileupload'); fd.append('fileToUpload',state.file); fetch('https://catbox.moe/user/api.php',{method:'POST',body:fd}).then(r=>r.text()).then(p=>{ if(p.startsWith('http')){ if(extra) extra.innerHTML+=`<div class="rg-small" style="margin-top:8px">PERMANENT VIDEO URL:</div><div class="rg-url-box"><div class="rg-url-text" style="color:#22d3ee">${p}</div><button onclick="navigator.clipboard.writeText('${p}')" style="padding:6px 8px;background:#164e63;border:1px solid #0e7490;color:#22d3ee;border-radius:7px;font-size:9px">COPY</button></div><div class="rg-small">Isko RG_CONFIG.targetVideo me paste karo - hamesha kaam karega!</div>`; window.RG_LAST_PERM_URL=p; } else { if(extra) extra.innerHTML+=`<div class="rg-small" style="color:#ef4444">Upload fail, Cloudinary pe manual upload karo. Blob URL temporary hai.</div>`; } }).catch(()=>{ if(extra) extra.innerHTML+=`<div class="rg-small" style="color:#ef4444">Catbox block hai, blob URL se test karo</div>`; }); }
      window.dispatchEvent(new CustomEvent('rg-media-forged',{detail:{url:finalUrl,type:state.mode}}));
    });
    container.querySelector('#rg-copy').addEventListener('click',()=>{navigator.clipboard.writeText(urlText.textContent);});
    container.querySelector('#rg-open').addEventListener('click',()=>window.open(urlText.textContent,'_blank'));
    container.querySelector('#rg-download').addEventListener('click',()=>{ if(!state.file) return window.open(urlText.textContent,'_blank'); const a=document.createElement('a'); a.href=state.blobUrl; a.download=state.file.name; a.click(); });
  }

  function findCandidates(){
    const keywords = ["SECURE TEXT FILES","COGNITIVE NOTES SECURE ENGINE","SECURE CHANNELS","COGNITIVE NOTES"];
    let found=[];
    // find all elements containing keyword
    document.querySelectorAll('*').forEach(el=>{
      if(!el.textContent || el.children.length>5) return;
      const txt = el.textContent.trim();
      for(const kw of keywords){
        if(txt.includes(kw) && txt.length < 50){
          // climb to card
          let card = el;
          for(let i=0;i<7;i++){
            if(!card) break;
            if(card.classList && (card.className.includes('border') || card.className.includes('rounded')) && card.offsetHeight>250 && card.offsetWidth>200){
              if(!found.includes(card)) found.push({el:card,kw});
              break;
            }
            card = card.parentElement;
          }
        }
      }
    });
    return found;
  }

  function forceReplace(){
    const cands = findCandidates();
    console.log('[RG-TOOL] candidates', cands.map(c=>c.kw));
    if(cands.length===0) return false;
    // Prefer right side card (SECURE TEXT FILES or COGNITIVE NOTES)
    let target = cands.find(c=>c.kw.includes('TEXT FILES')||c.kw.includes('COGNITIVE')) || cands[0];
    if(target){
      buildTool(target.el, target.kw);
      target.el.setAttribute('data-rg-replaced','true');
      return true;
    }
    return false;
  }

  function init(){
    let tries=0;
    const iv=setInterval(()=>{
      tries++;
      if(forceReplace()){ clearInterval(iv); removeForceBtn(); console.log('[RG-TOOL] Replaced successfully'); }
      if(tries>80){ clearInterval(iv); console.log('[RG-TOOL] Not found, showing force button'); showForceBtn(); }
    },500);
    // Observer for SPA navigation
    const obs = new MutationObserver(()=>{ if(!document.querySelector('[data-rg-replaced]')) forceReplace(); });
    obs.observe(document.body,{childList:true,subtree:true});
  }

  function showForceBtn(){
    if(document.getElementById('rg-force-btn')) return;
    const b=document.createElement('button'); b.id='rg-force-btn'; b.className='rg-force-btn'; b.textContent='⚡ FORCE MEDIA FORGE';
    b.onclick=()=>{ if(forceReplace()){ b.remove(); } else { alert('Card nahi mila bro, page ko refresh karke dobara try karo. Console me [RG-TOOL] dekho.'); } };
    document.body.appendChild(b);
  }
  function removeForceBtn(){ const b=document.getElementById('rg-force-btn'); if(b) b.remove(); }

  window.RG_FORCE_FORGE = forceReplace;
  window.RG_DEBUG_CANDIDATES = findCandidates;

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', ()=> setTimeout(forceReplace,1200));
})();
