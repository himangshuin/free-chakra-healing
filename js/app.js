/* ---------- state ---------- */
const $ = id => document.getElementById(id);
const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};
let lang = store.get("chakra-lang") === "as" ? "as" : "en";
let seen = new Set();
try { seen = new Set(JSON.parse(store.get("chakra-seen") || "[]")); } catch(e){}
let openIdx = -1, tab = 0, lastFocus = null;
const num = n => lang === "as" ? String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]) : String(n);
const txt = ch => ch[lang];

/* ---------- render page ---------- */
function renderUI(){
  const L = UI[lang];
  document.documentElement.lang = lang === "as" ? "as" : "en";
  $("appTitle").textContent = L.title;
  $("appSubtitle").textContent = L.subtitle;
  $("q").placeholder = L.search;
  $("btnEn").setAttribute("aria-pressed", lang === "en");
  $("btnAs").setAttribute("aria-pressed", lang === "as");
  $("waysHeading").textContent = L.waysHeading;
  $("waysIntro").textContent = L.waysIntro;
  $("waysList").innerHTML = L.ways.map((w,i) => `<div class="pill"><span aria-hidden="true">${WAY_ICONS[i]}</span>${w}</div>`).join("");
  $("progress").textContent = L.explored(num(seen.size));
  renderPromo();
}

function matches(ch, q){
  if (!q) return true;
  const hay = [ch.sanskrit, ch.crystals.join(" ")];
  ["en","as"].forEach(l => hay.push(ch.name[l], ch.element[l], ch.colorName[l], ch.organs[l].join(" "), ch.mental[l].join(" "), ch.diseases[l].join(" "), ch.balanced[l].join(" ")));
  return hay.join(" ").toLowerCase().includes(q);
}

function renderCards(){
  const L = UI[lang].labels;
  const q = $("q").value.trim().toLowerCase();
  const html = chakras.map((ch,i) => {
    if (!matches(ch,q)) return "";
    const first = ch.affirmation[lang].split("/")[0].trim();
    return `<button class="card" style="--c:${ch.color};--i:${i}" data-i="${i}">
      <div class="num">${num(i+1)}</div>
      <h3>${ch.name[lang]} <span class="sk">${ch.sanskrit}</span></h3>
      <div class="tags"><span class="tag">${L.element}: ${ch.element[lang]}</span><span class="tag">${L.color}: ${ch.colorName[lang]}</span></div>
      <div class="aff">“${first}”</div>
      <div class="foot"><span>💎 ${ch.crystals.slice(0,2).join(", ")}</span>${seen.has(ch.id) ? '<span class="seen">✓</span>' : '<span>→</span>'}</div>
    </button>`;
  }).join("");
  $("grid").innerHTML = html || `<p class="empty">${UI[lang].empty}</p>`;
}

/* ---------- modal ---------- */
function section(title, body){ return `<div class="sec"><h4>${title}</h4>${body}</div>`; }
function ul(arr){ return `<ul class="list">${arr.map(x => `<li>${x}</li>`).join("")}</ul>`; }

function renderModal(){
  const ch = chakras[openIdx], L = UI[lang], lb = L.labels;
  let body = "";
  if (tab === 0){
    const lines = ch.affirmation[lang].split("/").map(s => s.trim()).filter(Boolean);
    body += section(lb.affirmation, `<div class="affbox">${lines.map(l => `<span>“${l}”</span>`).join("")}</div><div class="acts"><button class="btn ghost sm" id="copyAff">📋 ${ACT[lang].copy}</button><button class="btn ghost sm" id="shareBtn">🔗 ${ACT[lang].share}</button></div>`);
    body += section(lb.crystals, `<div class="chips">${ch.crystals.map(c => `<span class="chip">💎 ${c}</span>`).join("")}</div>`);
    body += section(lb.remarks, `${ch.blockedBy[lang] ? `<span class="blocked">⛔ ${ch.blockedBy[lang]}</span><br>` : ""}<p class="remarks">${ch.remarks[lang]}</p>`);
  } else if (tab === 1){
    body += section(lb.organs, ul(ch.organs[lang]));
    body += section(lb.disease, ul(ch.diseases[lang]));
  } else {
    body += section(lb.mental, ul(ch.mental[lang]));
    body += `<div class="two"><div class="good"><div class="sec"><h4>${lb.balanced}</h4><ul>${ch.balanced[lang].map(x => `<li>${x}</li>`).join("")}</ul></div></div><div class="bad"><div class="sec"><h4>${lb.unbalanced}</h4><ul>${ch.unbalanced[lang].map(x => `<li>${x}</li>`).join("")}</ul></div></div></div>`;
  }
  const m = $("modal");
  m.style.setProperty("--c", ch.color);
  m.innerHTML = `
    <div class="mhead">
      <div class="num">${num(openIdx+1)}</div>
      <div class="modal-title"><h2 id="mTitle">${ch.name[lang]} <span class="sk">${ch.sanskrit}</span></h2>
        <p>${lb.location}: ${ch.location[lang]} · ${lb.element}: ${ch.element[lang]} · ${lb.color}: ${ch.colorName[lang]}</p></div>
      <div class="mnav">
        <button class="iconbtn" id="mPrev" aria-label="${lb.prev}">←</button>
        <button class="iconbtn" id="mNext" aria-label="${lb.next}">→</button>
        <button class="iconbtn" id="mClose" aria-label="${lb.close}">✕</button>
      </div>
    </div>
    <div class="mdots" aria-hidden="true">${chakras.map((c,j) => `<i class="${j===openIdx?"on":""}" style="--c:${c.color}" data-j="${j}"></i>`).join("")}</div><div class="tabs" role="tablist">${L.tabs.map((t,i) => `<button role="tab" aria-selected="${i===tab}" data-t="${i}">${t}</button>`).join("")}</div>
    <div class="mbody" id="mBody">${body}${modalPromo(ch)}</div>`;
}

function openModal(i){
  openIdx = i; tab = 0;
  try { history.replaceState(null, "", "#" + chakras[i].id); } catch(e){}
  seen.add(chakras[i].id);
  store.set("chakra-seen", JSON.stringify([...seen]));
  renderModal(); renderCards(); renderUI();
  $("overlay").classList.add("on");
  document.body.style.overflow = "hidden";
  $("mClose").focus();
}
function closeModal(){
  $("overlay").classList.remove("on");
  document.body.style.overflow = "";
  const i = openIdx; openIdx = -1;
  try { history.replaceState(null, "", location.pathname + location.search); } catch(e){}
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  else { const c = document.querySelector(`.card[data-i="${i}"]`); if (c) c.focus(); }
}
function step(d){
  const n = (openIdx + d + chakras.length) % chakras.length;
  openModal(n);
}

/* ---------- events ---------- */
function setLang(l){
  lang = l; store.set("chakra-lang", l);
  renderUI(); renderCards();
  if (openIdx >= 0) renderModal();
}
$("btnEn").onclick = () => setLang("en");
$("btnAs").onclick = () => setLang("as");
$("q").addEventListener("input", renderCards);
$("themeBtn").onclick = () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
};
$("grid").addEventListener("click", e => {
  const c = e.target.closest(".card"); if (!c) return;
  lastFocus = c; openModal(+c.dataset.i);
});
$("overlay").addEventListener("click", e => {
  if (e.target === $("overlay") || e.target.closest("#mClose")) return closeModal();
  if (e.target.closest("#mPrev")) return step(-1);
  if (e.target.closest("#mNext")) return step(1);
  const t = e.target.closest("[data-t]");
  if (t){ tab = +t.dataset.t; renderModal(); $("mBody").scrollTop = 0; }
});
document.addEventListener("keydown", e => {
  if (openIdx < 0) return;
  if (e.key === "Escape") closeModal();
  else if (e.key === "ArrowLeft") step(-1);
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "Tab"){
    const f = [...$("modal").querySelectorAll("button")];
    const first = f[0], last = f[f.length-1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

$("rainbow").innerHTML = chakras.map(c => `<i style="background:${c.color}"></i>`).join("");

/* ---------- promo / FAQ / extras ---------- */
const WA = {
  en: { main: "Hi Himu, I’d like to book a Chakra Reading.", modal: n => `Hi Himu, I’d like a Chakra Reading. I feel my ${n} may be out of balance.` },
  as: { main: "নমস্কাৰ হিমু, মই এটা চক্ৰ ৰিডিং বুক কৰিব বিচাৰো।", modal: n => `নমস্কাৰ হিমু, মই এটা চক্ৰ ৰিডিং বিচাৰো। মোৰ ${n} ভাৰসাম্যহীন যেন লাগিছে।` }
};
const ACT = {
  en: { copy: "Copy affirmations", copied: "Copied ✓", share: "Share", explore: "Explore chakras ↓", phone: "WhatsApp" },
  as: { copy: "নিশ্চিতি কপি কৰক", copied: "কপি হ’ল ✓", share: "শ্বেয়াৰ", explore: "চক্ৰসমূহ চাওক ↓", phone: "হোৱাটছএপ" }
};
const INTRO = {
  en: "Explore the seven chakras in English and Assamese: their meaning, element, color, crystals, affirmations, and the signs of balance and imbalance. Tap a point on the body to begin.",
  as: "সাতটা চক্ৰ ইংৰাজী আৰু অসমীয়াত অন্বেষণ কৰক: অৰ্থ, উপাদান, ৰং, স্ফটিক, নিশ্চিতি, আৰু ভাৰসাম্য-অভাৰসাম্যৰ লক্ষণ। আৰম্ভ কৰিবলৈ শৰীৰৰ এটা বিন্দুত টিপক।"
};
const BODY_Y = { crown: 4, brow: 16, throat: 34, heart: 56, solar: 78, sacral: 97, root: 116 };
function promoLink(slot){ return SITE.url + SITE.utm + "&utm_content=" + slot; }
function waLink(msg){ return SITE.whatsapp + "?text=" + encodeURIComponent(msg); }

function renderBody(){
  $("bodyMap").innerHTML = `<svg viewBox="0 0 100 150" aria-hidden="true"><defs><radialGradient id="aura"><stop offset="0" stop-color="#9b7bbf" stop-opacity=".35"/><stop offset="1" stop-color="#9b7bbf" stop-opacity="0"/></radialGradient></defs><ellipse cx="50" cy="72" rx="48" ry="72" fill="url(#aura)"/><ellipse class="sil" cx="50" cy="122" rx="44" ry="13"/><path class="sil" d="M31 38 Q50 30 69 38 L72 106 Q50 114 28 106 Z"/><circle class="sil" cx="50" cy="16" r="12"/><line x1="50" y1="4" x2="50" y2="116" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 3"/></svg>` +
    chakras.map((c, i) => `<button class="dot" style="--c:${c.color};top:${BODY_Y[c.id] / 150 * 100}%" data-i="${i}" aria-label="${c.name[lang]}"><span>${c.name[lang]}</span></button>`).join("");
}

function renderPromo(){
  const P = PROMO[lang], A = ACT[lang], msg = waLink(WA[lang].main);
  $("intro").textContent = INTRO[lang];
  $("heroWa").href = msg; $("heroWa").textContent = "💬 " + P.cta;
  $("heroExplore").textContent = A.explore;
  renderBody();
  const a = $("announce");
  if (a){
    a.hidden = store.get("chakra-announce") === "off";
    a.innerHTML = `<span>${P.announce} <a href="${msg}" target="_blank" rel="noopener">${P.announceCta}</a></span><button type="button" id="announceX" aria-label="${UI[lang].labels.close}">✕</button>`;
  }
  $("promo").innerHTML = `<div class="promo-in"><div>
      <span class="badge">🪷 ${P.badge}</span><h2 class="serif">${P.title}</h2><p>${P.body}</p>
      <ul>${P.points.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="cta-panel"><div class="dots" aria-hidden="true">${chakras.map(c => `<i style="background:${c.color}"></i>`).join("")}</div>
      <strong>${SITE.brand}</strong>
      <a class="btn wa" href="${msg}" target="_blank" rel="noopener">💬 ${P.cta}</a>
      <span class="small">${A.phone}: <a href="tel:+916901529861" style="color:inherit">${SITE.phoneDisplay}</a></span>
      <a class="btn ghost" href="${promoLink("visit")}" target="_blank" rel="noopener">${P.visit}</a>
      <span class="small">${P.note}</span></div></div>`;
  let fab = $("waFab");
  if (!fab){ fab = document.createElement("a"); fab.id = "waFab"; fab.className = "fab"; fab.target = "_blank"; fab.rel = "noopener"; document.body.appendChild(fab); }
  fab.href = msg; fab.setAttribute("aria-label", P.cta + " – WhatsApp");
  fab.innerHTML = `<span aria-hidden="true">💬</span><b>${P.cta}</b>`;
  $("faqHeading").textContent = P.faqHeading;
  $("faqList").innerHTML = FAQ[lang].map(f => `<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join("");
  $("foot").innerHTML = `<span>${P.footer}</span><span>${P.by} <a href="${promoLink("footer")}" target="_blank" rel="noopener">${SITE.brand}</a></span>`;
}
function modalPromo(ch){
  const P = PROMO[lang];
  return `<div class="mpromo"><div><strong>${P.modalLead(ch.name[lang])}</strong><span class="small">${P.badge} · ${SITE.brand}</span></div><a class="btn wa" href="${waLink(WA[lang].modal(ch.name[lang]))}" target="_blank" rel="noopener">💬 ${P.modalCta}</a></div>`;
}

document.addEventListener("click", async e => {
  if (e.target.closest("#announceX")){ store.set("chakra-announce", "off"); $("announce").hidden = true; return; }
  const dot = e.target.closest(".dot"); if (dot){ lastFocus = dot; openModal(+dot.dataset.i); return; }
  const j = e.target.closest("[data-j]"); if (j){ openModal(+j.dataset.j); return; }
  const cp = e.target.closest("#copyAff");
  if (cp){ try { await navigator.clipboard.writeText(chakras[openIdx].affirmation[lang].split("/").map(s => s.trim()).join("\n")); cp.textContent = "✓ " + ACT[lang].copied; } catch(err){} return; }
  const sh = e.target.closest("#shareBtn");
  if (sh){
    const ch = chakras[openIdx];
    if (navigator.share){ try { await navigator.share({ title: ch.name[lang], url: location.href }); } catch(err){} }
    else { try { await navigator.clipboard.writeText(location.href); sh.textContent = "✓ " + ACT[lang].copied; } catch(err){} }
  }
});
/* swipe between chakras on touch screens */
{ let tx = 0, ty = 0; const m = $("modal");
  m.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  m.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; if (Math.abs(dx) > 80 && Math.abs(dy) < 50) step(dx < 0 ? 1 : -1); }, { passive: true }); }
/* "/" focuses search; scroll progress bar */
document.addEventListener("keydown", e => { if (e.key === "/" && openIdx < 0 && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)){ e.preventDefault(); $("q").focus(); } });
{ const sp = document.createElement("div"); sp.className = "sp"; document.body.appendChild(sp);
  addEventListener("scroll", () => { const h = document.documentElement; sp.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%"; }, { passive: true }); }

renderUI(); renderCards();
/* open a chakra directly from a link like index.html#heart */
{ const k = chakras.findIndex(c => c.id === location.hash.slice(1)); if (k >= 0) openModal(k); }
