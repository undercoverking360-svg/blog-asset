// RG MEDIA LINK FORGE v5 - FIX DROP AREA + CHOOSE FILE BUTTON VISIBLE
(function(){
  console.log('[RG-TOOL v5] Loading');
  const CSS=`
  .rg-tool-card{position:relative;display:flex;flex-direction:column;height:100%;min-height:600px;border-radius:14px;border:1px solid rgba(51,65,85,0.9);background:rgba(2,6,23,0.92);backdrop-filter:blur(16px);overflow:hidden}
  .rg-tool-head{padding:12px 14px;border-bottom:1px solid rgba(30,41,59,0.9);display:flex;justify-content:space-between;align-items:center}
  .rg-tool-title{font-size:10px;letter-spacing:.16em;font-weight:900;color:#e2e8f0}
  .rg-tool-badge{font-size:8px;padding:3px 8px;border-radius:20px;background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.4);color:#22c55e}
  .rg-tabs{display:flex;gap:6px;padding:8px 10px;background:rgba(15,23,42,0.8)}
  .rg-tab{flex:1;padding:8px;font-size:9px;font-weight:800;letter-spacing:.1em;border-radius:8px;border:1px solid #1e293b;background:#0f172a;color:#64748b;cursor:pointer}
  .rg-tab.active{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border-color:#fb923c;box-shadow:0 0 15px rgba(249,115,22,.4)}
  .rg-drop{margin:10px;border:2px dashed #475569;border-radius:14px;padding:16px;text-align:center;background:rgba(15,23,42,0.55);cursor:pointer;transition:.2s;position:relative;z-index:2}
  .rg-drop:hover{border-color:#f97316;background:rgba(249,115,22,0.08)}
  .rg-drop.drag{border-color:#f97316;background:rgba(249,115,22,0.15);transform:scale(1.02)}
  .rg-drop video,.rg-drop img{max-width:100%;max-height:200px;border-radius:10px;margin:12px auto;display:block}
  .rg-choose{margin-top:10px;padding:10px 16px;background:#1e293b;border:1px solid #334155;color:#e2e8f0;border-radius:9px;font-size:10px;font-weight:800;letter-spacing:.08em;cursor:pointer;width:100%;transition:.2s}
  .rg-choose:hover{background:#334155;border-color:#f97316;color:#fff}
  .rg-input{width:100%;background:#020617;border:1px solid #1e293b;color:#cbd5e1;border-radius:8px;padding:10px;font-size:11px;font-family:monospace;outline:none;margin-top:10px}
  .rg-btn-main{width:100%;padding:12px;background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);border:none;border-radius:10px;color:#fff;font-weight:900;font-size:11px;letter-spacing:.12em;cursor:pointer;margin-top:12px;box-shadow:0 5px 18px rgba(239,68,68,.35)}
  .rg-url-box{background:#020617;border:1px solid #1e293b;border-radius:10px;padding:10px;display:flex;gap:8px;align-items:center;margin-top:10px}
  .rg-url-text{flex:1;font-size:10px;color:#22c55e;word-break:break-all;font-family:monospace;max-height:90px;overflow:auto}
  .rg-small{font-size:8.5px;color:#64748b;letter-spacing:.06em}
  `;
  function injectCSS(){ if(document.getElementById('rg-v5-css')) return; const s=document.createElement('style'); s.id='rg-v5-css'; s.textContent=CSS; document.head.appendChild(s); }

  function buildTool(container, kw){
    injectCSS();
    container.innerHTML=`
      <div class="rg-tool-card">
        <div class="rg-tool-head"><div class="rg-tool-title">◆ MEDIA LINK FORGE [${kw}]</div><div class="rg-tool-badge">● LIVE v5</div></div>
        <div class="rg-tabs"><button class="rg-tab active" data-tab="video">▶ VIDEO 10S</button><button class="rg-tab" data-tab="photo">◉ PHOTO 10MB</button></div>
        <div style="padding:0 10px;flex:1;overflow:auto">
          <div id="rg-drop" class="rg-drop">
            <div style="font-size:28px;line-height:1">📁</div>
            <div id="rg-drop-title" style="font-size:11px;font-weight:900;color:#f1f5f9;margin-top:8px;letter-spacing:.05em">TAP TO CHOOSE VIDEO (MAX 10 SEC)</div>
            <div id="rg-drop-sub" class="rg-small" style="margin-top:4px">MP4 / WEBM / MOV • Drag & Drop supported</div>
            <button id="rg-choose-btn" class="rg-choose">📂 CHOOSE FILE FROM DEVICE</button>
            <div id="rg-preview" style="margin-top:10px"></div>
            <input type="file" id="rg-file" hidden />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 2px"><div><div class="rg-small">MAX DURATION</div><div style="font-size:12px;font-weight:900;color:#f97316">10.0 SEC</div></div><div style="text-align:right"><div class="rg-small">MAX PHOTO</div><div style="font-size:12px;font-weight:900;color:#22c55e">10 MB</div></div></div>
          <input id="rg-external-url" class="rg-input" placeholder="Or paste external URL..." />
          <button id="rg-forge" class="rg-btn-main">⚡ FORGE SECURE LINK</button>
          <div id="rg-extra-links"></div>
          <div id="rg-result" style="display:none"><div class="rg-url-box"><div id="rg-url-text" class="rg-url-text"></div><button id="rg-copy" style="padding:6px 10px;border-radius:7px;background:#1e293b;border:1px solid #334155;color:#fff;font-size:10px;cursor:pointer">COPY</button></div><div style="display:flex;gap:6px;margin-top:8px"><button id="rg-open" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">OPEN</button><button id="rg-download" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">DOWNLOAD</button></div></div>
        </div>
        <div style="padding:8px 12px;border-top:1px solid #1e293b;display:flex;justify-content:space-between" class="rg-small"><span>STATUS: <span style="color:#22c55e">● READY</span></span><span id="rg-info">0s | 0 MB</span></div>
      </div>`;
    const state={mode:'video',file:null,blobUrl:''};
    const drop=container.querySelector('#rg-drop'), fileInput=container.querySelector('#rg-file'), preview=container.querySelector('#rg-preview'), title=container.querySelector('#rg-drop-title'), sub=container.querySelector('#rg-drop-sub'), info=container.querySelector('#rg-info'), forgeBtn=container.querySelector('#rg-forge'), result=container.querySelector('#rg-result'), urlText=container.querySelector('#rg-url-text'), extInput=container.querySelector('#rg-external-url'), chooseBtn=container.querySelector('#rg-choose-btn');
    function setMode(m){state.mode=m; container.querySelectorAll('.rg-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===m)); if(m==='video'){title.textContent='TAP TO CHOOSE VIDEO (MAX 10 SEC)'; sub.textContent='MP4 / WEBM / MOV • Drag & Drop'; fileInput.accept='video/*'; chooseBtn.textContent='📂 CHOOSE VIDEO FILE';} else {title.textContent='TAP TO CHOOSE PHOTO (MAX 10 MB)'; sub.textContent='JPG / PNG / WEBP / GIF • Max 10MB'; fileInput.accept='image/*'; chooseBtn.textContent='🖼️ CHOOSE PHOTO FILE';} preview.innerHTML=''; state.file=null; state.blobUrl=''; result.style.display='none'; info.textContent='0s | 0 MB';}
    container.querySelectorAll('.rg-tab').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.tab)));
    function handleFile(f){ if(!f) return; console.log('[RG v5] file',f.name,f.size,f.type); if(state.mode==='photo' && f.size>10*1024*1024){alert('10MB se zyada!');return;} state.file=f; const blob=URL.createObjectURL(f); state.blobUrl=blob; if(state.mode==='video'){ preview.innerHTML=`<video src="${blob}" controls autoplay muted loop style="width:100%;max-height:200px;border-radius:10px"></video><div class="rg-small" style="margin-top:6px;color:#e2e8f0">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`; const v=document.createElement('video'); v.preload='metadata'; v.src=blob; v.onloadedmetadata=()=>{const d=v.duration; info.textContent=d.toFixed(1)+'s | '+(f.size/1024/1024).toFixed(2)+' MB'; if(d>10.2){alert('Bhai 10 sec se zyada hai: '+d.toFixed(1)+'s'); preview.innerHTML=''; state.file=null;} URL.revokeObjectURL(v.src);}; } else { preview.innerHTML=`<img src="${blob}" style="width:100%;max-height:220px;object-fit:contain;border-radius:10px" /><div class="rg-small" style="margin-top:6px;color:#e2e8f0">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`; info.textContent=`${(f.size/1024/1024).toFixed(2)} MB / 10 MB`; } }
    function openPicker(){ fileInput.click(); }
    drop.addEventListener('click',e=>{ if(e.target.closest('button') && e.target.id!=='rg-choose-btn') return; openPicker(); });
    chooseBtn.addEventListener('click',e=>{ e.stopPropagation(); openPicker(); });
    fileInput.addEventListener('change',e=>{ const f=e.target.files[0]; if(f) handleFile(f); e.target.value=''; });
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('drag');}); drop.addEventListener('dragleave',()=>drop.classList.remove('drag')); drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('drag'); const f=e.dataTransfer.files[0]; if(f) handleFile(f);});
    forgeBtn.addEventListener('click',()=>{ let final=state.blobUrl||extInput.value.trim(); if(!final){alert('Pehle file choose karo bro!');return;} urlText.textContent=final; result.style.display='block'; try{navigator.clipboard.writeText(final);}catch{} forgeBtn.textContent='✓ COPIED!'; setTimeout(()=>forgeBtn.textContent='⚡ FORGE SECURE LINK',1500); const extra=document.getElementById('rg-extra-links'); if(state.file && state.mode==='photo'){ const r=new FileReader(); r.onload=ev=>{ const dataUrl=ev.target.result; if(extra){ extra.innerHTML=`<div class="rg-small" style="margin-top:10px;color:#f59e0b">PERMANENT DATA URL (Blogger config me paste karo):</div><div class="rg-url-box"><div class="rg-url-text" style="color:#fbbf24">${dataUrl.slice(0,150)}... (${(dataUrl.length/1024).toFixed(0)}KB)</div><button id="rg-copy-data" style="padding:6px 8px;background:#422006;border:1px solid #92400e;color:#fbbf24;border-radius:6px;font-size:9px">COPY DATA</button></div>`; const b=document.getElementById('rg-copy-data'); b.onclick=()=>{navigator.clipboard.writeText(dataUrl); b.textContent='COPIED!';}; } }; r.readAsDataURL(state.file); } if(state.file && state.mode==='video'){ if(extra) extra.innerHTML=`<div class="rg-small" style="margin-top:10px;color:#f97316">Uploading to permanent host...</div>`; const fd=new FormData(); fd.append('reqtype','fileupload'); fd.append('fileToUpload',state.file); fetch('https://catbox.moe/user/api.php',{method:'POST',body:fd}).then(r=>r.text()).then(p=>{ if(p.startsWith('http')){ if(extra) extra.innerHTML+=`<div class="rg-small" style="margin-top:6px">PERMANENT VIDEO URL:</div><div class="rg-url-box"><div class="rg-url-text" style="color:#22d3ee">${p}</div><button onclick="navigator.clipboard.writeText('${p}');this.textContent='COPIED'" style="padding:6px 8px;background:#164e63;border:1px solid #0e7490;color:#22d3ee;border-radius:6px;font-size:9px">COPY</button></div><div class="rg-small">Isko RG_CONFIG.targetVideo me paste karo!</div>`; } else { if(extra) extra.innerHTML+=`<div class="rg-small" style="color:#ef4444">Upload fail, blob URL temporary use karo</div>`; } }).catch(()=>{ if(extra) extra.innerHTML+=`<div class="rg-small" style="color:#ef4444">Network error</div>`; }); } });
    container.querySelector('#rg-copy').addEventListener('click',()=>{navigator.clipboard.writeText(urlText.textContent); const b=container.querySelector('#rg-copy'); b.textContent='COPIED'; setTimeout(()=>b.textContent='COPY',1000);});
    container.querySelector('#rg-open').addEventListener('click',()=>window.open(urlText.textContent,'_blank'));
    container.querySelector('#rg-download').addEventListener('click',()=>{ if(!state.file) return window.open(urlText.textContent,'_blank'); const a=document.createElement('a'); a.href=state.blobUrl; a.download=state.file.name; a.click(); });
  }

  function findCandidates(){
    const kws=["SECURE TEXT FILES","COGNITIVE NOTES SECURE ENGINE","SECURE CHANNELS","MEDIA LINK FORGE"];
    let found=[];
    document.querySelectorAll('*').forEach(el=>{
      if(!el.textContent || el.children.length>4) return;
      const t=el.textContent.trim();
      for(const kw of kws){ if(t===kw || (t.includes(kw) && t.length<40)){ let card=el; for(let i=0;i<8;i++){ if(!card) break; if(card.offsetHeight>300 && card.offsetWidth>220 && (card.className.includes('border')||card.className.includes('rounded'))){ if(!found.some(f=>f.el===card)) found.push({el:card,kw}); break;} card=card.parentElement; } } }
    });
    return found;
  }
  function forceReplace(){
    const c=findCandidates(); console.log('[RG v5] candidates',c.map(x=>x.kw));
    if(!c.length) return false;
    let tgt=c.find(x=>x.kw.includes('TEXT FILES')||x.kw.includes('COGNITIVE'))||c[0];
    if(tgt && !tgt.el.hasAttribute('data-rg-v5')){ buildTool(tgt.el,tgt.kw); tgt.el.setAttribute('data-rg-v5','true'); return true; }
    return tgt?true:false;
  }
  function init(){
    let tries=0; const iv=setInterval(()=>{ tries++; if(forceReplace()){clearInterval(iv);} if(tries>60){clearInterval(iv); const b=document.createElement('button'); b.textContent='⚡ FORCE MEDIA FORGE v5'; b.style.cssText='position:fixed;bottom:20px;right:20px;z-index:99999;padding:12px 16px;background:#f97316;color:#fff;border:none;border-radius:24px;font-weight:800;font-size:11px;box-shadow:0 6px 20px rgba(249,115,22,.6);cursor:pointer'; b.onclick=()=>{forceReplace(); b.remove();}; document.body.appendChild(b);} },400);
    const obs=new MutationObserver(()=>{ if(!document.querySelector('[data-rg-v5]')) forceReplace(); }); obs.observe(document.body,{childList:true,subtree:true});
  }
  window.RG_FORCE_FORGE=forceReplace;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.addEventListener('load',()=>setTimeout(forceReplace,800));
})();
