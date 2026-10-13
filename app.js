(()=>{
const M=document.getElementById("main"),$=s=>document.querySelector(s);
let S=Store.load(),cur=null,timer=null,route="home",last=null;
const ALLQ=[...QUESTIONS,...signQuestions()];
const UI={
en:{home:"Home",signs:"Road Signs",practice:"Practice",mock:"Mock Test",rules:"Traffic Rules",progress:"My Progress",img:"Image Quiz",startP:"Start Practice",startM:"Start Mock Test",learn:"Learn Road Signs",next:"Next",prev:"Previous",mark:"Mark for Review",skip:"Skip",end:"End Practice",submit:"Submit Exam",saveNext:"Save & Next",right:"Correct",wrong:"Incorrect",expl:"Explanation",reset:"Reset All Progress",attempted:"Questions attempted",correct:"Correct answers",acc:"Accuracy",tests:"Mock tests completed",recent:"Recently attempted",notice:"This is a practice tool, not an official RTO website.",retry:"Retry",revise:"Revise incorrect",showm:"Show Road Sign Meaning",answered:"Answered",unans:"Unanswered"},
gu:{home:"હોમ",signs:"માર્ગ ચિહ્નો",practice:"પ્રેક્ટિસ",mock:"મોક ટેસ્ટ",rules:"ટ્રાફિક નિયમો",progress:"મારી પ્રગતિ",img:"ચિત્ર ક્વિઝ",startP:"પ્રેક્ટિસ શરૂ કરો",startM:"મોક ટેસ્ટ શરૂ કરો",learn:"માર્ગ ચિહ્નો શીખો",next:"આગળ",prev:"પાછળ",mark:"સમીક્ષા માટે ચિહ્નિત કરો",skip:"છોડો",end:"પ્રેક્ટિસ પૂરી કરો",submit:"પરીક્ષા સબમિટ કરો",saveNext:"સાચવો અને આગળ",right:"સાચો",wrong:"ખોટો",expl:"સમજૂતી",reset:"બધી પ્રગતિ રીસેટ કરો",attempted:"પ્રયાસ કરેલા પ્રશ્નો",correct:"સાચા જવાબ",acc:"ચોકસાઈ",tests:"પૂર્ણ મોક ટેસ્ટ",recent:"તાજેતરના પ્રશ્નો",notice:"આ પ્રેક્ટિસ સાધન છે, સત્તાવાર RTO વેબસાઇટ નથી.",retry:"ફરી પ્રયાસ",revise:"ખોટા જવાબો ફરી જુઓ",showm:"ચિહ્નનો અર્થ બતાવો",answered:"જવાબ આપ્યા",unans:"બાકી"},
hi:{home:"होम",signs:"सड़क संकेत",practice:"अभ्यास",mock:"मॉक टेस्ट",rules:"यातायात नियम",progress:"मेरी प्रगति",img:"चित्र प्रश्नोत्तरी",startP:"अभ्यास शुरू करें",startM:"मॉक टेस्ट शुरू करें",learn:"सड़क संकेत सीखें",next:"अगला",prev:"पिछला",mark:"समीक्षा हेतु चिह्नित करें",skip:"छोड़ें",end:"अभ्यास समाप्त करें",submit:"परीक्षा जमा करें",saveNext:"सहेजें और आगे",right:"सही",wrong:"गलत",expl:"स्पष्टीकरण",reset:"सारी प्रगति रीसेट करें",attempted:"प्रयास किए प्रश्न",correct:"सही उत्तर",acc:"सटीकता",tests:"पूर्ण मॉक टेस्ट",recent:"हाल के प्रश्न",notice:"यह एक अभ्यास उपकरण है, आधिकारिक RTO वेबसाइट नहीं।",retry:"पुनः प्रयास",revise:"गलत प्रश्न दोहराएं",showm:"संकेत का अर्थ दिखाएं",answered:"उत्तर दिए",unans:"शेष"}};
const t=k=>(UI[S.lang]&&UI[S.lang][k])||UI.en[k]||k;
const L=o=>(o&&(o[S.lang]||o.en))||"";
const opts=q=>{const o=q.options[S.lang];return o&&o.length===4?o:q.options.en};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pct=(c,a)=>a?Math.round(c/a*100):0;
const save=()=>Store.save(S);
const media=q=>q.sign?`<div class="media">${signSVG(q.sign)}</div>`:q.image?`<div class="media"><img src="${q.image}" alt="Question illustration" onerror="this.outerHTML='<p>Image not available.</p>'"></div>`:"";

function applyPrefs(){document.documentElement.dataset.theme=S.theme;document.documentElement.lang=S.lang;$("#lang").value=S.lang;
 $("#nav").innerHTML=["home","signs","practice","mock","rules","progress"].map(r=>`<button data-go="${r}" class="${route===r?"on":""}" ${route===r?'aria-current="page"':""}>${t(r)}</button>`).join("")}
function go(r){if(cur&&!cur.done&&!confirm("Leave this session? Unsaved results will be lost."))return;clearInterval(timer);cur=null;route=r;render()}
function render(){applyPrefs();({home,signs,practice,mock,rules,progress}[route]||home)();window.scrollTo(0,0)}

function home(){M.innerHTML=`<div class="card hero"><h1>Gujarat LL Practice</h1><p>${$("#sub").textContent}</p>
<div class="notice">${t("notice")}</div><div class="row"><button class="btn" data-go="practice">${t("startP")}</button><button class="btn" data-go="mock">${t("startM")}</button><button class="btn alt" data-go="signs">${t("learn")}</button><button class="btn alt" data-act="imgquiz">${t("img")}</button><button class="btn alt" data-go="rules">${t("rules")}</button></div></div>
<div class="grid"><div class="card stat"><b>${S.total}</b><span>${t("attempted")}</span></div><div class="card stat"><b>${S.correct}</b><span>${t("correct")}</span></div><div class="card stat"><b>${pct(S.correct,S.total)}%</b><span>${t("acc")}</span></div><div class="card stat"><b>${S.tests}</b><span>${t("tests")}</span></div></div>
<div class="card"><h2>${t("recent")}</h2>${S.recent.length?"<table>"+S.recent.map(r=>{const q=ALLQ.find(x=>x.id===r.id);return q?`<tr><td>${L(q.question)}</td><td>${r.ok?"✓ "+t("right"):"✗ "+t("wrong")}</td></tr>`:""}).join("")+"</table>":"<p>—</p>"}</div>`}

function signs(){M.innerHTML=`<div class="card"><h2>${t("signs")}</h2><div class="row"><input type="search" id="q" placeholder="Search…" aria-label="Search signs">
${["all",...Object.keys(CATS)].map(c=>`<button class="chip ${c==="all"?"on":""}" data-cat="${c}">${c==="all"?"All":CATS[c]}</button>`).join("")}<button class="btn" data-act="signquiz">Sign Quiz</button></div></div><div class="grid" id="sg"></div>`;
 let cat="all";const draw=()=>{const q=$("#q").value.toLowerCase();const l=SIGNS.filter(s=>(cat==="all"||s.cat===cat)&&(s.en+s.gu+s.hi+s.d).toLowerCase().includes(q));
 $("#sg").innerHTML=l.length?l.map(s=>`<article class="card sign">${signSVG(s)}<h3>${s.en}</h3><div class="l">${s.gu} · ${s.hi}</div><p>${s.d}</p><span class="tag">${CATS[s.cat]}</span><p><small>💡 ${s.tip}</small></p></article>`).join(""):"<p>No signs found.</p>"};
 $("#q").oninput=draw;M.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{cat=b.dataset.cat;M.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));draw()});draw()}

function rules(){M.innerHTML=`<div class="card"><h2>${t("rules")}</h2><ul>${RULES.map(r=>`<li>${r}</li>`).join("")}</ul><p class="notice">Rules can change. Confirm with official sources (Parivahan / MoRTH / Gujarat RTO).</p></div>`}

function practice(){M.innerHTML=`<div class="card"><h2>${t("practice")}</h2><label>Topic <select id="tp"><option value="all">All topics (${ALLQ.length})</option>${Object.entries(TOPICS).map(([k,v])=>`<option value="${k}">${v} (${ALLQ.filter(q=>q.topic===k).length})</option>`).join("")}</select></label>
<div class="row" style="margin-top:12px"><button class="btn" data-act="startp">${t("startP")}</button><button class="btn alt" data-act="imgquiz">${t("img")}</button><button class="btn alt" data-act="revise">${t("revise")} (${S.wrong.length})</button></div></div>`}

function mock(){M.innerHTML=`<div class="card"><h2>${t("mock")}</h2><p class="notice">Question count, duration and pass mark are adjustable practice settings – not official RTO standards.</p>
<div class="row"><label>Questions <select id="mn"><option>10</option><option selected>15</option><option>20</option></select></label><label>Minutes <select id="mt"><option>10</option><option selected>15</option><option>20</option><option>30</option></select></label><label>Pass mark % <select id="mp"><option>50</option><option selected>60</option><option>70</option><option>80</option></select></label></div>
<p><button class="btn" data-act="startm">${t("startM")}</button></p></div>`}

function progress(){const rows=Object.entries(TOPICS).map(([k,v])=>{const s=S.stats[k]||{a:0,c:0};return{v,a:s.a,p:pct(s.c,s.a)}});const weak=rows.filter(r=>r.a>0).sort((a,b)=>a.p-b.p).slice(0,3);
 M.innerHTML=`<div class="card"><h2>${t("progress")}</h2><div class="grid"><div class="stat"><b>${S.total}</b><span>${t("attempted")}</span></div><div class="stat"><b>${pct(S.correct,S.total)}%</b><span>${t("acc")}</span></div><div class="stat"><b>${S.tests}</b><span>${t("tests")}</span></div></div></div>
<div class="card"><h2>Topic accuracy</h2><table>${rows.map(r=>`<tr><td>${r.v}</td><td>${r.a?r.p+"% of "+r.a:"–"}</td><td style="width:35%"><div class="bar"><i style="width:${r.p}%"></i></div></td></tr>`).join("")}</table>
<p><b>Weak topics:</b> ${weak.length?weak.map(w=>w.v+" ("+w.p+"%)").join(", "):"Attempt some questions first."}</p></div>
<div class="card"><h2>Mock test history</h2>${S.history.length?"<table><tr><th>Date</th><th>Score</th><th>%</th><th>Time</th><th></th></tr>"+S.history.map(h=>`<tr><td>${new Date(h.d).toLocaleString()}</td><td>${h.c}/${h.n}</td><td>${h.p}%</td><td>${h.s}s</td><td class="${h.pass?"pass":"fail"}">${h.pass?"Pass":"Fail"}</td></tr>`).join("")+"</table>":"<p>No tests yet.</p>"}
<div class="row" style="margin-top:12px"><button class="ghost" data-act="clearhist">Clear History</button><button class="btn danger" data-act="reset">${t("reset")}</button></div></div>`}

// ---- shared quiz engine (practice + exam) ----
function start(mode,qs,cfg={},redo){if(!qs.length){alert("No questions available for this selection.");return}
 last={mode,cfg,redo:redo||(()=>start(mode,qs,cfg,redo))};
 cur={mode,cfg,i:0,start:Date.now(),done:false,items:qs.map(q=>({q,order:shuf([0,1,2,3]),sel:null,mark:false,show:false}))};
 clearInterval(timer);if(mode==="exam"){cur.end=Date.now()+cfg.min*60000;timer=setInterval(tick,500)}quiz()}
function tick(){if(!cur||cur.done||cur.mode!=="exam")return;const r=Math.max(0,Math.round((cur.end-Date.now())/1000)),e=$("#tm");
 if(e){e.textContent=String(r/60|0).padStart(2,"0")+":"+String(r%60).padStart(2,"0");e.classList.toggle("low",r<60)}if(r<=0)finish(true)}
function quiz(){const exam=cur.mode==="exam",it=cur.items[cur.i],q=it.q,o=opts(q),n=cur.items.length,fb=!exam&&it.sel!==null,sg=q.sign&&SIGNS.find(s=>s.id===q.sign);
 M.innerHTML=`<div class="card"><div class="row" style="justify-content:space-between"><strong>${cur.i+1} / ${n}</strong>${exam?`<span class="timer" id="tm" role="timer">--:--</span>`:""}<span class="tag">${TOPICS[q.topic]||""} · ${q.difficulty}</span></div>
 <div class="bar" style="margin:10px 0"><i style="width:${(cur.i+1)/n*100}%"></i></div>${media(q)}<div class="q" id="qt">${L(q.question)}</div>
 <div role="radiogroup" aria-labelledby="qt">${it.order.map((oi,k)=>{const sel=it.sel===k,ok=oi===q.correctIndex;let c="opt",m="";
  if(fb){if(ok){c+=" right";m="✓ "+t("right")}else if(sel){c+=" wrong";m="✗ "+t("wrong")}}else if(sel)c+=" sel";
  return`<button class="${c}" role="radio" aria-checked="${sel}" data-pick="${k}"><span class="k">${"ABCD"[k]}</span><span>${o[oi]}</span><span class="m">${m}</span></button>`}).join("")}</div>
 ${fb?`<div class="expl"><b>${t("expl")}:</b> ${L(q.explanation)}</div>`:""}
 ${!exam&&sg&&it.show?`<div class="expl"><b>${sg.en}</b> (${sg.gu} · ${sg.hi}) – ${sg.d}</div>`:""}
 <div class="row"><button class="ghost" data-act="prev" ${cur.i?"":"disabled"}>${t("prev")}</button>
 <button class="ghost" data-act="mark">${it.mark?"★ ":"☆ "}${t("mark")}</button>
 ${!exam&&sg?`<button class="ghost" data-act="showm">${t("showm")}</button>`:""}
 ${exam?"":`<button class="ghost" data-act="next" ${cur.i<n-1?"":"disabled"}>${t("skip")}</button>`}
 <button class="btn" data-act="next" ${cur.i<n-1?"":"disabled"}>${exam?t("saveNext"):t("next")}</button>
 <button class="btn danger" data-act="finish">${exam?t("submit"):t("end")}</button></div></div>
 ${exam?`<div class="card"><b>${t("answered")}: ${cur.items.filter(x=>x.sel!==null).length} · ${t("unans")}: ${cur.items.filter(x=>x.sel===null).length}</b><div class="qnav">${cur.items.map((x,k)=>`<button data-jump="${k}" aria-label="Question ${k+1}${x.sel!==null?", answered":""}${x.mark?", marked":""}" class="${x.sel!==null?"ans ":""}${x.mark?"mk ":""}${k===cur.i?"cur":""}">${k+1}${x.mark?"★":""}</button>`).join("")}</div><p><small>Filled = answered · dashed + ★ = marked for review</small></p></div>`:""}`;
 if(exam)tick()}
function finish(auto){if(!cur||cur.done)return;const un=cur.items.filter(x=>x.sel===null).length;
 if(!auto&&!confirm(cur.mode==="exam"?`Submit exam? ${un} question(s) unanswered.`:"End this session?"))return;
 if(cur.done)return;cur.done=true;clearInterval(timer);const secs=Math.round((Date.now()-cur.start)/1000);let c=0,w=0;
 cur.items.forEach(x=>{if(x.sel===null)return;const ok=x.order[x.sel]===x.q.correctIndex;ok?c++:w++;Store.record(S,x.q,ok)});
 const n=cur.items.length,p=pct(c,n),pass=cur.cfg.pass?p>=cur.cfg.pass:null,o=cur;
 if(o.mode==="exam"){S.tests++;S.history.unshift({d:Date.now(),n,c,p,s:secs,pass});S.history=S.history.slice(0,50)}save();last.items=o.items;
 M.innerHTML=`<div class="card"><h2>${auto?"Time up – exam submitted":"Result"}</h2><div class="grid">
 <div class="stat"><b>${n}</b><span>Total</span></div><div class="stat"><b>${c}</b><span>${t("right")}</span></div><div class="stat"><b>${w}</b><span>${t("wrong")}</span></div><div class="stat"><b>${un}</b><span>${t("unans")}</span></div><div class="stat"><b>${p}%</b><span>${t("acc")}</span></div><div class="stat"><b>${secs}s</b><span>Time</span></div></div>
 ${pass!==null?`<p class="${pass?"pass":"fail"}"><b>${pass?"✓ At/above":"✗ Below"} your chosen pass mark of ${o.cfg.pass}%</b> (practice setting, not an official standard)</p>`:""}
 <div class="row"><button class="btn" data-act="redo">${t("retry")}</button><button class="btn alt" data-act="retrywrong">${t("revise")}</button><button class="btn alt" data-go="home">${t("home")}</button></div></div>
 <div class="card"><h2>Review</h2>${o.items.map((x,k)=>{const ops=opts(x.q),ok=x.sel!==null&&x.order[x.sel]===x.q.correctIndex;
 return`<div class="expl"><b>${k+1}. ${L(x.q.question)}</b>${x.q.sign?`<div class="media">${signSVG(x.q.sign)}</div>`:""}Your answer: ${x.sel===null?"— not answered":ops[x.order[x.sel]]+(ok?" ✓":" ✗")}<br>Correct: ${ops[x.q.correctIndex]}<br><small>${L(x.q.explanation)}</small></div>`}).join("")}</div>`;window.scrollTo(0,0)}
function buildMock(n){const sg=shuf(ALLQ.filter(q=>q.sign)),th=shuf(ALLQ.filter(q=>!q.sign)),a=Math.min(Math.ceil(n/2),sg.length);
 let p=[...sg.slice(0,a),...th.slice(0,n-a)];if(p.length<n)p=[...p,...shuf(ALLQ.filter(q=>!p.includes(q)))].slice(0,n);return shuf(p)}
function startMock(cfg){start("exam",buildMock(cfg.n),cfg,()=>startMock(cfg))}
function startPractice(qs){start("practice",shuf(qs),{},()=>startPractice(qs))}

document.addEventListener("click",e=>{
 const g=e.target.closest("[data-go]");if(g){go(g.dataset.go);return}
 if(cur&&!cur.done){
  const p=e.target.closest("[data-pick]");if(p){cur.items[cur.i].sel=+p.dataset.pick;quiz();return}
  const j=e.target.closest("[data-jump]");if(j){cur.i=+j.dataset.jump;quiz();return}}
 const a=e.target.closest("[data-act]");if(!a)return;const act=a.dataset.act;
 if(cur&&!cur.done){const n=cur.items.length;
  if(act==="next"&&cur.i<n-1){cur.i++;quiz()}else if(act==="prev"&&cur.i>0){cur.i--;quiz()}
  else if(act==="mark"){cur.items[cur.i].mark=!cur.items[cur.i].mark;quiz()}else if(act==="showm"){cur.items[cur.i].show=true;quiz()}
  else if(act==="finish")finish(false);return}
 if(act==="startp"){const v=$("#tp").value;startPractice(ALLQ.filter(q=>v==="all"||q.topic===v))}
 else if(act==="imgquiz")startPractice(ALLQ.filter(q=>q.sign||q.image));
 else if(act==="signquiz")startPractice(ALLQ.filter(q=>q.id.startsWith("sign_")));
 else if(act==="revise")startPractice(ALLQ.filter(q=>S.wrong.includes(q.id)));
 else if(act==="startm")startMock({n:+$("#mn").value,min:+$("#mt").value,pass:+$("#mp").value});
 else if(act==="redo"&&last)last.redo();
 else if(act==="retrywrong"&&last&&last.items)startPractice(last.items.filter(x=>x.sel===null||x.order[x.sel]!==x.q.correctIndex).map(x=>x.q));
 else if(act==="clearhist"){if(confirm("Clear mock-test history?")){S.history=[];S.tests=0;save();progress()}}
 else if(act==="reset"){if(confirm("Reset ALL progress? This cannot be undone.")){S=Store.reset();save();render()}}
});
document.addEventListener("keydown",e=>{if(!cur||cur.done||/SELECT|INPUT/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;const k="abcd".indexOf(e.key.toLowerCase());if(k>=0&&e.key.length===1){cur.items[cur.i].sel=k;quiz()}});
$("#lang").onchange=e=>{S.lang=e.target.value;save();applyPrefs();cur&&!cur.done?quiz():render()};
$("#theme").onclick=()=>{S.theme=S.theme==="dark"?"light":"dark";save();applyPrefs()};
window.addEventListener("beforeunload",e=>{if(cur&&!cur.done&&cur.mode==="exam"){e.preventDefault();e.returnValue=""}});
render();
})();
