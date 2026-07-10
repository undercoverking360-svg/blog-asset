// RG MEDIA LINK FORGE - Video 10s / Photo 10MB URL Generator
// Blogger Body me daalo - app.bundle.js ke BAAD
(function(){
  const CSS = `
  .rg-tool-card{position:relative;display:flex;flex-direction:column;height:100%;min-height:520px;border-radius:12px;border:1px solid rgba(51,65,85,0.8);background:rgba(2,6,23,0.75);backdrop-filter:blur(12px);overflow:hidden}
  .rg-tool-head{padding:14px 16px;border-bottom:1px solid rgba(30,41,59,0.8);display:flex;justify-content:space-between;align-items:center}
  .rg-tool-title{font-size:11px;letter-spacing:.18em;font-weight:800;color:#e2e8f0;display:flex;gap:8px;align-items:center}
  .rg-tool-badge{font-size:9px;padding:3px 8px;border-radius:20px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.35);color:#22c55e;letter-spacing:.12em}
  .rg-tabs{display:flex;gap:6px;padding:10px 12px;background:rgba(15,23,42,0.6)}
  .rg-tab{flex:1;padding:8px;font-size:10px;font-weight:800;letter-spacing:.12em;border-radius:8px;border:1px solid #1e293b;background:#0f172a;color:#64748b;cursor:pointer;transition:.2s}
  .rg-tab.active{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border-color:#fb923c;box-shadow:0 0 18px rgba(249,115,22,.35)}
  .rg-drop{margin:12px;border:1.8px dashed #334155;border-radius:12px;padding:18px;text-align:center;transition:.25s;cursor:pointer;background:rgba(15,23,42,0.4)}
  .rg-drop.drag{border-color:#f97316;background:rgba(249,115,22,.08);transform:scale(1.01)}
  .rg-drop video,.rg-drop img{max-width:100%;max-height:180px;border-radius:10px;margin:10px auto;display:block}
  .rg-input{width:100%;background:#020617;border:1px solid #1e293b;color:#cbd5e1;border-radius:8px;padding:10px;font-size:11px;font-family:monospace;outline:none}
  .rg-btn-main{width:100%;padding:11px;background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);border:none;border-radius:10px;color:#fff;font-weight:900;font-size:11px;letter-spacing:.14em;cursor:pointer;box-shadow:0 4px 18px rgba(239,68,68,.35);transition:.2s}
  .rg-btn-main:disabled{opacity:.45;cursor:not-allowed}
  .rg-url-box{background:#020617;border:1px solid #1e293b;border-radius:10px;padding:10px;display:flex;gap:8px;align-items:center}
  .rg-url-text{flex:1;font-size:10px;color:#22c55e;word-break:break-all;font-family:monospace;max-height:90px;overflow:auto}
  .rg-small{font-size:9px;color:#64748b;letter-spacing:.08em}
  `;
  function injectCSS(){ if(document.getElementById('rg-tool-css')) return; const s=document.createElement('style'); s.id='rg-tool-css'; s.textContent=CSS; document.head.appendChild(s); }

  function buildTool(container){
    injectCSS();
    const themeColor = window.RG_CONFIG?.themeColor || 'orange';
    container.innerHTML = `
      <div class="rg-tool-card">
        <div class="rg-tool-head">
          <div class="rg-tool-title"><span>◈</span> MEDIA LINK FORGE</div>
          <div class="rg-tool-badge">● LIVE FORGE</div>
        </div>
        <div class="rg-tabs">
          <button class="rg-tab active" data-tab="video">▶ VIDEO 10S</button>
          <button class="rg-tab" data-tab="photo">◉ PHOTO 10MB</button>
        </div>

        <div style="padding:0 12px;flex:1;overflow:auto">
          <div id="rg-drop" class="rg-drop">
            <div id="rg-drop-inner">
              <div style="font-size:22px">⬆</div>
              <div style="font-size:11px;font-weight:800;color:#e2e8f0;margin-top:6px" id="rg-drop-title">DROP 10 SEC VIDEO HERE</div>
              <div class="rg-small" id="rg-drop-sub">MP4 / WEBM / MOV • Max Duration 10s • Auto URL</div>
              <div id="rg-preview"></div>
            </div>
            <input type="file" id="rg-file" hidden />
          </div>

          <div style="margin:10px 2px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div><div class="rg-small">MAX DURATION</div><div style="font-size:12px;font-weight:800;color:#f97316">10.0 SEC</div></div>
            <div style="text-align:right"><div class="rg-small">MAX PHOTO SIZE</div><div style="font-size:12px;font-weight:800;color:#22c55e">10 MB</div></div>
          </div>

          <input id="rg-external-url" class="rg-input" placeholder="Or paste external Video/Image URL and press Forge..." />

          <div style="margin-top:12px">
            <button id="rg-forge" class="rg-btn-main">⚡ FORGE SECURE LINK</button>
          </div>

          <div id="rg-extra-links"></div><div id="rg-result" style="display:none;margin-top:12px">
            <div class="rg-small" style="margin-bottom:6px">GENERATED SECURE URL (Blob - works instantly)</div>
            <div class="rg-url-box">
              <div id="rg-url-text" class="rg-url-text"></div>
              <button id="rg-copy" style="padding:6px 10px;border-radius:7px;background:#1e293b;border:1px solid #334155;color:#fff;font-size:10px;cursor:pointer">COPY</button>
            </div>
            <div style="display:flex;gap:8px;margin-top:8px">
              <button id="rg-open" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">OPEN LINK</button>
              <button id="rg-download" style="flex:1;padding:8px;background:#0f172a;border:1px solid #334155;color:#94a3b8;border-radius:8px;font-size:10px;cursor:pointer">DOWNLOAD</button>
            </div>
            <div class="rg-small" style="margin-top:8px;line-height:1.5">Tip: Blob URL is temporary (session only). For permanent link, upload to Cloudinary / Catbox. This tool gives instant usable URL for Blogger <code>&lt;video src="..."&gt;</code></div>
          </div>
        </div>

        <div style="padding:10px 12px;border-top:1px solid #1e293b;background:rgba(2,6,23,0.6);display:flex;justify-content:space-between" class="rg-small">
          <span>STATUS: <span style="color:#22c55e">● FORGE READY</span></span>
          <span id="rg-info">0 / 10s | 0 MB</span>
        </div>
      </div>
    `;

    const state = { mode:'video', file:null, url:'', blobUrl:'' };
    const drop = container.querySelector('#rg-drop');
    const fileInput = container.querySelector('#rg-file');
    const preview = container.querySelector('#rg-preview');
    const title = container.querySelector('#rg-drop-title');
    const sub = container.querySelector('#rg-drop-sub');
    const info = container.querySelector('#rg-info');
    const forgeBtn = container.querySelector('#rg-forge');
    const result = container.querySelector('#rg-result');
    const urlText = container.querySelector('#rg-url-text');
    const extInput = container.querySelector('#rg-external-url');

    function setMode(m){
      state.mode=m;
      container.querySelectorAll('.rg-tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===m));
      if(m==='video'){ title.textContent='DROP 10 SEC VIDEO HERE'; sub.textContent='MP4 / WEBM / MOV • Max Duration 10s • Auto URL'; fileInput.accept='video/*'; }
      else { title.textContent='DROP PHOTO HERE (10MB MAX)'; sub.textContent='JPG / PNG / WEBP / GIF • Max 10MB • Instant Link'; fileInput.accept='image/*'; }
      clearPreview();
    }
    container.querySelectorAll('.rg-tab').forEach(b=> b.addEventListener('click',()=>setMode(b.dataset.tab)));

    function clearPreview(){ preview.innerHTML=''; state.file=null; state.blobUrl=''; result.style.display='none'; info.textContent = state.mode==='video' ? '0 / 10s | 0 MB' : '0 / 10MB'; }

    function handleFile(f){
      if(!f) return;
      if(state.mode==='photo' && f.size > 10*1024*1024){ alert('Photo >10MB not allowed bro! Compress karke lao.'); return; }
      if(state.mode==='video' && !f.type.startsWith('video/')){ alert('Video mode me sirf video daalo!'); return; }
      if(state.mode==='photo' && !f.type.startsWith('image/')){ alert('Photo mode me sirf image daalo!'); return; }
      state.file=f;
      const blob = URL.createObjectURL(f);
      state.blobUrl = blob;
      if(state.mode==='video'){
        preview.innerHTML = `<video src="${blob}" controls muted style="width:100%;max-height:180px;border-radius:10px"></video><div class="rg-small" style="margin-top:6px">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`;
        const v=document.createElement('video'); v.preload='metadata'; v.src=blob;
        v.onloadedmetadata=()=>{ const d=v.duration; info.textContent = d.toFixed(1)+'s / 10s | '+(f.size/1024/1024).toFixed(2)+' MB'; if(d>10){ alert('Bhai 10 second se zyada hai! Trim karke lao. Duration: '+d.toFixed(1)+'s'); clearPreview(); } URL.revokeObjectURL(v.src); };
      } else {
        preview.innerHTML = `<img src="${blob}" /><div class="rg-small" style="margin-top:6px">${f.name} • ${(f.size/1024/1024).toFixed(2)} MB</div>`;
        info.textContent = `Image • ${(f.size/1024/1024).toFixed(2)} MB / 10 MB`;
      }
    }

    drop.addEventListener('click',()=> fileInput.click());
    fileInput.addEventListener('change', e=> handleFile(e.target.files[0]));
    drop.addEventListener('dragover', e=>{ e.preventDefault(); drop.classList.add('drag'); });
    drop.addEventListener('dragleave', ()=> drop.classList.remove('drag'));
    drop.addEventListener('drop', e=>{ e.preventDefault(); drop.classList.remove('drag'); handleFile(e.dataTransfer.files[0]); });

    forgeBtn.addEventListener('click', ()=>{
      let finalUrl = state.blobUrl;
      const external = extInput.value.trim();
      if(external){ finalUrl = external; state.blobUrl = external; }
      if(!finalUrl){ alert('Pehle video/photo drop karo ya URL paste karo!'); return; }
      // For photo 10MB we already have blob, for video we validated 10s

      urlText.textContent = finalUrl;
      // Auto generate DataURL for permanent use (photo)
      if(state.file && state.mode==='photo'){
        const reader = new FileReader();
        reader.onload = e=>{
          const dataUrl = e.target.result;
          const extra = document.getElementById('rg-extra-links');
          if(extra){
            extra.innerHTML = `<div class="rg-small" style="margin-top:10px">PERMANENT DATA URL (for Blogger Config - Paste in RG_CONFIG):</div><div class="rg-url-box" style="margin-top:6px"><div class="rg-url-text" style="color:#f59e0b;max-height:70px">${dataUrl.slice(0,200)}... (truncated ${ (dataUrl.length/1024).toFixed(0)}KB)</div><button onclick="navigator.clipboard.writeText(\`${''}\`);this.textContent='COPIED'" style="padding:6px 10px;border-radius:7px;background:#422006;border:1px solid #92400e;color:#fbbf24;font-size:10px;cursor:pointer">COPY DATA URL</button></div>`;
            extra.querySelector('button').setAttribute('onclick', `navigator.clipboard.writeText(${JSON.stringify(dataUrl)});this.textContent='COPIED'`);
          }
          // store for config
          window.RG_LAST_DATA_URL = dataUrl;
        };
        reader.readAsDataURL(state.file);
      }
      // For video - try upload to catbox for permanent link
      if(state.file && state.mode==='video'){
        const extra = document.getElementById('rg-extra-links');
        if(extra){ extra.innerHTML = `<div class="rg-small" style="margin-top:10px;color:#f97316">Uploading to permanent host (catbox.moe)...</div>`; }
        const fd = new FormData(); fd.append('reqtype','fileupload'); fd.append('fileToUpload', state.file);
        fetch('https://catbox.moe/user/api.php', {method:'POST', body:fd})
          .then(r=>r.text())
          .then(permanent=>{
            if(permanent && permanent.startsWith('http')){
              if(extra){ extra.innerHTML += `<div class="rg-small" style="margin-top:8px">PERMANENT VIDEO URL (for RG_CONFIG.targetVideo):</div><div class="rg-url-box" style="margin-top:6px"><div class="rg-url-text" style="color:#22d3ee">${permanent}</div><button onclick="navigator.clipboard.writeText('${permanent}');this.textContent='COPIED'" style="padding:6px 10px;border-radius:7px;background:#164e63;border:1px solid #0e7490;color:#22d3ee;font-size:10px">COPY PERM LINK</button></div><div class="rg-small" style="margin-top:6px">Isko copy karke Blogger me window.RG_CONFIG.targetVideo me paste kar do - hamesha kaam karega!</div>`; }
              window.RG_LAST_PERM_URL = permanent;
            } else { if(extra) extra.innerHTML += `<div class="rg-small" style="color:#ef4444">Upload fail, blob URL temporary hi use hoga. Cloudinary pe manual upload karo.</div>`; }
          }).catch(()=>{ if(extra) extra.innerHTML += `<div class="rg-small" style="color:#ef4444">Network error - catbox block ho sakta hai. Blob URL se test karo.</div>`; });
      }

      result.style.display='block';
      // Auto copy
      navigator.clipboard?.writeText(finalUrl).catch(()=>{});
      forgeBtn.textContent='✓ LINK FORGED & COPIED';
      setTimeout(()=> forgeBtn.textContent='⚡ FORGE SECURE LINK', 1800);
      // Dispatch event so other parts can use
      window.dispatchEvent(new CustomEvent('rg-media-forged',{detail:{url:finalUrl, type:state.mode, file:state.file}}));
    });

    container.querySelector('#rg-copy').addEventListener('click', ()=>{
      navigator.clipboard.writeText(urlText.textContent); const b=container.querySelector('#rg-copy'); b.textContent='COPIED'; setTimeout(()=>b.textContent='COPY',1200);
    });
    container.querySelector('#rg-open').addEventListener('click', ()=> window.open(urlText.textContent,'_blank'));
    container.querySelector('#rg-download').addEventListener('click', ()=>{
      if(!state.file) { window.open(urlText.textContent,'_blank'); return; }
      const a=document.createElement('a'); a.href=state.blobUrl; a.download=state.file.name; a.click();
    });

    extInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ forgeBtn.click(); }});
  }

  function findAndReplace(){
    // Find the COGNITIVE NOTES card - it's the second card in grid, contains "COGNITIVE NOTES"
    const headers = Array.from(document.querySelectorAll('*')).filter(el=> el.textContent && el.textContent.includes('COGNITIVE NOTES SECURE ENGINE'));
    if(!headers.length){ return false; }
    let card = headers[0];
    // climb up to find the bordered card container (has class with border-slate)
    for(let i=0;i<6;i++){ if(!card) break; if(card.className && card.className.includes('border') && card.clientHeight>300){ break; } card = card.parentElement; }
    if(!card || card.clientHeight<200) card = headers[0].closest('div[class*="border"][class*="rounded"]') || headers[0].parentElement.parentElement.parentElement;
    if(card){
      card.style.height='100%';
      buildTool(card);
      console.log('[RG-TOOL] Replaced COGNITIVE NOTES with Media Forge');
      return true;
    }
    return false;
  }

  function init(){
    let tries=0;
    const iv=setInterval(()=>{
      tries++;
      if(findAndReplace()){ clearInterval(iv); }
      if(tries>50) clearInterval(iv);
    }, 600);
  }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
  // Also listen for aegis events to re-init after login
  window.addEventListener('aegis-links-command', ()=> setTimeout(init, 800));
})();
