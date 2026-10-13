const Store=(()=>{const K="gujaratLL.v1";
const def=()=>({v:1,lang:"en",theme:"light",total:0,correct:0,stats:{},wrong:[],recent:[],history:[],tests:0});
function load(){try{const o=JSON.parse(localStorage.getItem(K));if(!o||o.v!==1||typeof o!=="object")return def();return Object.assign(def(),o)}catch(e){return def()}}
function save(S){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function record(S,q,ok){S.total++;if(ok)S.correct++;const t=S.stats[q.topic]=S.stats[q.topic]||{a:0,c:0};t.a++;if(ok)t.c++;
 S.recent.unshift({id:q.id,ok,t:Date.now()});S.recent=S.recent.slice(0,10);
 S.wrong=S.wrong.filter(x=>x!==q.id);if(!ok)S.wrong.push(q.id);}
function reset(){try{localStorage.removeItem(K)}catch(e){}return def()}
return{load,save,record,reset,def}})();
