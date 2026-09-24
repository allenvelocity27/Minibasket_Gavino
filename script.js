/* ============ DATI ============
   Provengono da config.js (deve essere incluso PRIMA di questo file).
   Qui restano solo i due helper di formattazione, che non sono dati
   ma piccole funzioni di presentazione. */

const BANDE = CONFIG.bande;
const FASCIA_INFO = CONFIG.fasciaInfo;
function fasciaLabel(f){
  var info = FASCIA_INFO[f];
  return info ? (info.nome+' ('+info.eta+' anni)') : f;
}
function fasciaLabelBreve(f){
  var info = FASCIA_INFO[f];
  return info ? info.nome : f;
}
const OBIETTIVI = CONFIG.obiettivi;
const MATERIALI = CONFIG.materiali;

const ESERCIZI = CONFIG.esercizi;


/* ============ DIAGRAMMI SVG (schematici, per tipo) ============ */

function courtBase(){
  return '<rect x="4" y="4" width="292" height="152" rx="6" class="d-court"></rect>';
}
function cone(x,y){
  return '<path d="M'+x+','+(y-9)+' L'+(x+6)+','+(y+7)+' L'+(x-6)+','+(y+7)+' Z" class="d-cone"></path>';
}
function player(x,y,alt){
  return '<circle cx="'+x+'" cy="'+y+'" r="8" class="'+(alt?'d-player-alt':'d-player')+'"></circle>';
}
function ball(x,y){
  return '<g><circle cx="'+x+'" cy="'+y+'" r="6" class="d-ball"></circle>' +
    '<path d="M'+(x-6)+','+y+' H'+(x+6)+' M'+x+','+(y-6)+' V'+(y+6)+' M'+(x-4.5)+','+(y-4.5)+' Q'+x+','+y+' '+(x-4.5)+','+(y+4.5)+' M'+(x+4.5)+','+(y-4.5)+' Q'+x+','+y+' '+(x+4.5)+','+(y+4.5)+'" class="d-ball-line"></path></g>';
}
function hoop(x,y,r){
  return '<circle cx="'+x+'" cy="'+y+'" r="'+(r||10)+'" class="d-hoop"></circle>';
}
function pole(x,y){
  return '<g><rect x="'+(x-2)+'" y="'+(y-22)+'" width="4" height="26" rx="2" class="d-cone"></rect></g>';
}
function chairIcon(x,y){
  return '<g>' +
    '<line x1="'+(x-9)+'" y1="'+(y-14)+'" x2="'+(x-9)+'" y2="'+(y+14)+'" class="d-court"></line>' +
    '<line x1="'+(x-9)+'" y1="'+(y-9)+'" x2="'+(x-4)+'" y2="'+(y-9)+'" class="d-court"></line>' +
    '<line x1="'+(x-9)+'" y1="'+y+'" x2="'+(x+9)+'" y2="'+y+'" class="d-court"></line>' +
    '<line x1="'+(x+9)+'" y1="'+y+'" x2="'+(x+5)+'" y2="'+(y+14)+'" class="d-court"></line>' +
    '</g>';
}
function basket(x,y){
  return '<g><rect x="'+(x-14)+'" y="'+(y-16)+'" width="28" height="20" class="d-backboard"></rect>' +
    '<ellipse cx="'+x+'" cy="'+(y+6)+'" rx="10" ry="3.4" class="d-hoop"></ellipse></g>';
}
function arrow(x1,y1,x2,y2,solid){
  return '<path d="M'+x1+','+y1+' Q'+((x1+x2)/2)+','+((y1+y2)/2-14)+' '+x2+','+y2+'" class="'+(solid?'d-arrow-solid':'d-arrow')+'"></path>';
}
function label(x,y,text){
  return '<text x="'+x+'" y="'+y+'" text-anchor="middle" class="d-label">'+text+'</text>';
}

const DIAGRAMS = {
  'corsa-libera': function(){
    return svgWrap(courtBase() +
      arrow(50,120,120,50) + arrow(120,50,220,100) + arrow(220,100,260,40) +
      player(50,120) + player(150,90,true) + player(250,60));
  },
  'palleggio-libero': function(){
    return svgWrap(courtBase() +
      arrow(50,120,130,60) + arrow(180,110,260,60,true) +
      player(50,120) + ball(58,130) +
      player(180,110,true) + ball(188,120) +
      player(260,50) + ball(268,60));
  },
  'coni-zigzag': function(){
    return svgWrap(courtBase() +
      cone(50,110) + cone(95,50) + cone(140,110) + cone(185,50) + cone(230,110) + cone(270,60) +
      arrow(30,120,60,90) + arrow(60,90,100,110) + arrow(100,110,140,60) + arrow(140,60,190,100) + arrow(190,100,240,60) +
      player(30,120) + ball(24,130));
  },
  'coni-linea': function(){
    return svgWrap(courtBase() +
      cone(60,85) + cone(120,85) + cone(180,85) + cone(240,85) +
      arrow(20,85,270,85,true) +
      player(20,110) + ball(28,120) + label(60,40,'cambio') + label(180,40,'cambio'));
  },
  'cerchi-percorso': function(){
    return svgWrap(courtBase() +
      hoop(50,85) + hoop(100,85) + hoop(150,85) + hoop(200,85) + hoop(250,85) +
      arrow(20,85,270,85) +
      player(20,120));
  },
  'staffetta': function(){
    return svgWrap(courtBase() +
      cone(260,45) + cone(260,115) +
      player(40,45) + player(40,65,true) + player(40,95) + player(40,115,true) +
      arrow(60,45,240,45,true) + arrow(240,115,60,115,true) + ball(56,45));
  },
  'coppie-passaggio': function(){
    return svgWrap(courtBase() +
      player(60,80) + ball(72,80) + player(240,80,true) +
      arrow(85,72,215,72,true) + arrow(215,88,85,88) +
      label(150,50,'passaggio'));
  },
  'tiro-canestro': function(){
    return svgWrap(courtBase() +
      basket(150,30) +
      player(70,120) + ball(80,128) + arrow(85,118,135,55,true) +
      player(150,130) + arrow(150,118,150,55,true) +
      player(230,120,true) + arrow(225,115,165,55,true));
  },
  'percorso-tiro': function(){
    return svgWrap(courtBase() +
      basket(260,50) +
      cone(60,120) + cone(110,70) + cone(160,120) +
      arrow(30,130,60,120) + arrow(60,120,110,70) + arrow(110,70,160,120) + arrow(160,120,235,60,true) +
      player(30,130) + ball(22,140));
  },
  'difesa-specchio': function(){
    return svgWrap(courtBase() +
      player(90,80) + player(210,80,true) +
      arrow(120,55,180,55,true) + arrow(180,105,120,105,true) +
      label(150,30,'movimento laterale'));
  },
  'uno-contro-uno': function(){
    return svgWrap(courtBase() +
      basket(260,80) +
      player(50,80) + ball(60,88) + player(140,80,true) +
      arrow(70,80,225,80,true));
  },
  'percorso-misto': function(){
    return svgWrap(courtBase() +
      cone(50,110) + hoop(100,60,10) + cone(150,110) + hoop(200,60,10) + cone(250,110) +
      arrow(25,120,275,60) +
      player(25,120));
  },
  'gruppo-cerchio': function(){
    return svgWrap(courtBase() +
      hoop(150,80,55) +
      player(150,25) + player(205,55,true) + player(205,105) + player(150,135,true) + player(95,105) + player(95,55,true) +
      ball(150,80));
  },
  'scaletta-coordinativa': function(){
    var rungs='';
    for(var i=0;i<7;i++){ rungs += '<line x1="'+(30+i*35)+'" y1="45" x2="'+(30+i*35)+'" y2="115" class="d-court"></line>'; }
    return svgWrap(rungs +
      '<line x1="30" y1="45" x2="30" y2="45" />' +
      '<line x1="20" y1="80" x2="270" y2="80" class="d-court"></line>' +
      arrow(30,150,270,150) +
      player(45,80) + label(150,20,'appoggi alternati'));
  },
  'campo-partita': function(){
    return svgWrap(courtBase() +
      basket(25,80) + basket(275,80) +
      player(90,50) + player(90,110,true) + player(150,80) +
      player(210,50,true) + player(210,110) +
      ball(150,72));
  },
  'aste-slalom': function(){
    return svgWrap(courtBase() +
      pole(50,110) + pole(95,50) + pole(140,110) + pole(185,50) + pole(230,110) + pole(270,60) +
      arrow(30,120,60,90) + arrow(60,90,100,110) + arrow(100,110,140,60) + arrow(140,60,190,100) + arrow(190,100,240,60) +
      player(30,120) + ball(24,130));
  },
  'aste-linea': function(){
    return svgWrap(courtBase() +
      pole(60,85) + pole(120,85) + pole(180,85) + pole(240,85) +
      arrow(20,85,270,85,true) +
      player(20,110) + ball(28,120) + label(60,40,'cambio') + label(180,40,'cambio'));
  },
  'sedia-percorso': function(){
    return svgWrap(courtBase() +
      chairIcon(90,85) + chairIcon(210,85) +
      arrow(20,85,270,85) +
      player(20,120) + ball(28,130));
  },
  'sedia-difesa': function(){
    return svgWrap(courtBase() +
      chairIcon(150,80) +
      player(60,80) + ball(70,88) +
      arrow(70,80,225,80,true) +
      label(150,30,'difensore statico'));
  }
};

function svgWrap(inner){
  return '<svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg">'+inner+'</svg>';
}

/* ============ ICONE CHIP E COLORI FASE ============ */

const ICON_OBIETTIVI = {
  'palleggio': '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="1.8"/><path d="M12 14v7M8 21h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  'tiro': '<svg viewBox="0 0 24 24" fill="none"><path d="M4 18 Q9 6 20 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="20" cy="5" r="2.2" fill="currentColor"/></svg>',
  'passaggio': '<svg viewBox="0 0 24 24" fill="none"><path d="M3 9h13M12 5l5 4-5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 16H8M12 20l-5-4 5-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'coordinazione': '<svg viewBox="0 0 24 24" fill="none"><path d="M3 18 L8 9 L13 15 L18 6 L21 10" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'difesa': '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6l7-3z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/></svg>',
  'gioco di squadra': '<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="9" r="2.6" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3 2.4-5 5-5s5 2 5 5M13 20c.3-2.2 2-4 4.5-4s4.2 1.8 4.5 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

const ICON_MATERIALI = {
  'palla': '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 3.5v17M3.5 12h17M6 6q6 6 0 12M18 6q-6 6 0 12" stroke="currentColor" stroke-width="1.3"/></svg>',
  'canestro': '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="14.5" rx="6" ry="2" stroke="currentColor" stroke-width="1.6"/></svg>',
  'coni': '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l5 15H7L12 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M5 20h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  'cerchi': '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/></svg>',
  'aste': '<svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="2" x2="12" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="12" cy="19.5" rx="5.5" ry="1.8" stroke="currentColor" stroke-width="1.5"/></svg>',
  'sedie': '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3v18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M6 8h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M6 14h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M18 14l-2 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

const FASE_COLOR = {
  riscaldamento:'var(--teal-400)',
  tecnica:'var(--orange-400)',
  coordinazione:'var(--purple-400)',
  gioco:'var(--red-400)',
  chiusura:'var(--slate-300)'
};

function impostaSaluto(){
  var el = document.getElementById('greeting');
  if(!el) return;
  var nome = CONFIG.coach.nome;
  var h = new Date().getHours();
  var saluto = (h < 6) ? ('Buonanotte '+nome) : (h < 13) ? ('Buongiorno '+nome) : (h < 18) ? ('Buon pomeriggio '+nome) : ('Buonasera '+nome);
  el.textContent = saluto;
}
impostaSaluto();

function impostaTestiConfig(){
  var elTitolo = document.getElementById('appTitolo');
  if(elTitolo) elTitolo.textContent = CONFIG.app.titolo;

  var elTagline = document.getElementById('appTagline');
  if(elTagline) elTagline.textContent = CONFIG.app.tagline;

  var elBadge = document.getElementById('sportBadge');
  if(elBadge) elBadge.textContent = CONFIG.sport.badge;

  var elFooter = document.getElementById('footerCredits');
  if(elFooter) elFooter.textContent = 'Fatto su misura per '+CONFIG.coach.nome+' — '+CONFIG.app.footerCreditsSuffix;

  // Il tab del browser si aggiorna qui; <title> e i tag og:* in index.html
  // restano invece testo statico (li leggono i crawler senza eseguire JS)
  // e vanno modificati a mano in quelle 3 righe per ogni nuova versione.
  document.title = CONFIG.coach.nome+' — '+CONFIG.app.titolo;
}
impostaTestiConfig();

/* ============ STATO ============ */

const state = {
  fascia: 'aquilotti',
  obiettivi: new Set(),
  tempo: 60,
  materiali: new Set(['palla','canestro','coni','cerchi']),
  seduta: null
};

/* ============ STORICO SEDUTE (salvato solo in locale, nel browser) ============ */

var STORICO_KEY = CONFIG.app.storageId + 'MiniBasketStorico';
var FEEDBACK_KEY = CONFIG.app.storageId + 'MiniBasketFeedback';
var ROSTER_KEY = CONFIG.app.storageId + 'MiniBasketRoster';

function caricaStorico(){
  try{
    var raw = localStorage.getItem(STORICO_KEY);
    if(!raw) return [];
    var arr = JSON.parse(raw);
    if(!Array.isArray(arr)) return [];
    // migrazione: le sedute salvate prima della rinomina "scoiattoli" -> "pulcini" restano leggibili
    arr.forEach(function(v){ if(v && v.fascia === 'scoiattoli') v.fascia = 'pulcini'; });
    return arr;
  }catch(e){ return []; }
}

function salvaInStorico(seduta, totale){
  try{
    var storico = caricaStorico();
    var voce = {
      data: new Date().toISOString(),
      fascia: state.fascia,
      tempo: totale,
      esercizi: seduta.map(function(e){
        return { id:e.id, nome:e.nome, fase:e.fase, durataScelta:e.durataScelta, obiettivi:e.obiettivi };
      })
    };
    storico.unshift(voce);
    if(storico.length > 300) storico = storico.slice(0, 300);
    localStorage.setItem(STORICO_KEY, JSON.stringify(storico));
  }catch(e){ /* storage non disponibile: la seduta funziona comunque, solo senza cronologia */ }
}

function cancellaStorico(){
  try{ localStorage.removeItem(STORICO_KEY); }catch(e){}
}

function eliminaVoceStorico(idx){
  try{
    var storico = caricaStorico();
    storico.splice(idx, 1);
    localStorage.setItem(STORICO_KEY, JSON.stringify(storico));
  }catch(e){}
}

/* ---- Elenco iscritti (per le presenze) ---- */

var DEFAULT_ROSTER = CONFIG.roster.iniziale;

function normalizzaRoster(arr){
  return arr.map(function(voce){
    if(typeof voce === 'string') return {nome:voce, gruppo:'aquilotti'};
    return {nome: voce.nome, gruppo: (voce.gruppo === 'pulcini' ? 'pulcini' : 'aquilotti')};
  });
}

function caricaRoster(){
  try{
    var raw = localStorage.getItem(ROSTER_KEY);
    if(!raw){
      var seed = DEFAULT_ROSTER.slice();
      salvaRoster(seed);
      return seed;
    }
    var arr = JSON.parse(raw);
    if(!Array.isArray(arr) || !arr.length){
      var seedVuoto = DEFAULT_ROSTER.slice();
      salvaRoster(seedVuoto);
      return seedVuoto;
    }
    return normalizzaRoster(arr);
  }catch(e){ return DEFAULT_ROSTER.slice(); }
}

function salvaRoster(roster){
  try{ localStorage.setItem(ROSTER_KEY, JSON.stringify(roster)); }catch(e){}
}

/* ---- Feedback coach (presenze + appunti allenamento) ---- */

function caricaFeedbackStorico(){
  try{
    var raw = localStorage.getItem(FEEDBACK_KEY);
    if(!raw) return [];
    var arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  }catch(e){ return []; }
}

function salvaInFeedbackStorico(voce){
  try{
    var storico = caricaFeedbackStorico();
    storico.unshift(voce);
    if(storico.length > 300) storico = storico.slice(0, 300);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(storico));
  }catch(e){}
}

function cancellaFeedbackStorico(){
  try{ localStorage.removeItem(FEEDBACK_KEY); }catch(e){}
}

function eliminaVoceFeedback(idx){
  try{
    var storico = caricaFeedbackStorico();
    storico.splice(idx, 1);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(storico));
  }catch(e){}
}

function idsRecenti(nSessioni){
  var storico = caricaStorico().filter(function(s){ return s.fascia === state.fascia; }).slice(0, nSessioni);
  var set = new Set();
  storico.forEach(function(s){
    (s.esercizi||[]).forEach(function(e){ set.add(e.id); });
  });
  return set;
}

function categorieMenoAllenate(){
  var recenti = caricaStorico().filter(function(s){ return s.fascia === state.fascia; }).slice(0, 6);
  var conteggi = {};
  OBIETTIVI.forEach(function(o){ conteggi[o] = 0; });
  recenti.forEach(function(s){
    (s.esercizi||[]).forEach(function(item){
      (item.obiettivi||[]).forEach(function(o){
        if(conteggi.hasOwnProperty(o)) conteggi[o]++;
      });
    });
  });
  var ordine = OBIETTIVI.slice().sort(function(a,b){ return conteggi[a]-conteggi[b]; });
  var valori = OBIETTIVI.map(function(o){ return conteggi[o]; });
  var vario = recenti.length>0 && Math.max.apply(null, valori) > Math.min.apply(null, valori);
  return { ordine: ordine, conteggi: conteggi, haStorico: recenti.length>0, vario: vario };
}

/* ============ RENDER FORM ============ */

const fasciaRow = document.getElementById('fasciaRow');
BANDE.forEach(function(b){
  var chip = document.createElement('button');
  chip.type='button';
  chip.className='chip single' + (b===state.fascia?' active':'');
  chip.textContent = fasciaLabel(b);
  chip.addEventListener('click', function(){
    state.fascia = b;
    Array.from(fasciaRow.children).forEach(function(c){ c.classList.remove('active'); });
    chip.classList.add('active');
  });
  fasciaRow.appendChild(chip);
});

const obiettiviRow = document.getElementById('obiettiviRow');
OBIETTIVI.forEach(function(o){
  var chip = document.createElement('button');
  chip.type='button';
  chip.className='chip';
  chip.innerHTML = (ICON_OBIETTIVI[o]||'') + '<span>'+(o.charAt(0).toUpperCase()+o.slice(1))+'</span>';
  chip.addEventListener('click', function(){
    if(state.obiettivi.has(o)){ state.obiettivi.delete(o); chip.classList.remove('active'); }
    else { state.obiettivi.add(o); chip.classList.add('active'); }
  });
  obiettiviRow.appendChild(chip);
});

const materialiRow = document.getElementById('materialiRow');
MATERIALI.forEach(function(m){
  var chip = document.createElement('button');
  chip.type='button';
  chip.className='chip' + (state.materiali.has(m)?' active':'');
  chip.innerHTML = (ICON_MATERIALI[m]||'') + '<span>'+(m.charAt(0).toUpperCase()+m.slice(1))+'</span>';
  chip.addEventListener('click', function(){
    if(state.materiali.has(m)){ state.materiali.delete(m); chip.classList.remove('active'); }
    else { state.materiali.add(m); chip.classList.add('active'); }
  });
  materialiRow.appendChild(chip);
});

const timeValue = document.getElementById('timeValue');
function renderTime(){ timeValue.innerHTML = state.tempo + '<span>minuti</span>'; }
document.getElementById('timeMinus').addEventListener('click', function(){
  state.tempo = Math.max(20, state.tempo - 5); renderTime();
});
document.getElementById('timePlus').addEventListener('click', function(){
  state.tempo = Math.min(120, state.tempo + 5); renderTime();
});
renderTime();

/* ============ ALGORITMO GENERAZIONE SEDUTA ============ */

function balancedByObiettivo(list, ordineCategorie){
  // Ordina la lista alternando le categorie (round robin) invece di uno shuffle puro,
  // così ogni categoria (palleggio, tiro, passaggio, coordinazione, difesa, gioco di squadra)
  // ha pari possibilità di entrare in seduta, anche se in libreria non sono numericamente uguali.
  // Se viene passato un ordine di priorità (basato sullo storico), le categorie allenate meno
  // di recente vengono messe all'inizio della rotazione, così vengono pescate per prime.
  var cats = (ordineCategorie && ordineCategorie.length) ? ordineCategorie : OBIETTIVI;
  var buckets = cats.map(function(o){
    return { arr: shuffle(list.filter(function(e){ return e.obiettivi.indexOf(o) !== -1; })), i: 0 };
  });
  var senzaObiettivo = shuffle(list.filter(function(e){ return e.obiettivi.length === 0; }));
  var used = new Set();
  var ordered = [];
  var progress = true;
  while(progress){
    progress = false;
    for(var k=0;k<buckets.length;k++){
      var b = buckets[k];
      while(b.i < b.arr.length && used.has(b.arr[b.i].id)){ b.i++; }
      if(b.i < b.arr.length){
        var e = b.arr[b.i];
        b.i++;
        used.add(e.id);
        ordered.push(e);
        progress = true;
      }
    }
  }
  senzaObiettivo.forEach(function(e){
    if(!used.has(e.id)){ ordered.push(e); used.add(e.id); }
  });
  return ordered;
}

function shuffle(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var tmp=a[i]; a[i]=a[j]; a[j]=tmp;
  }
  return a;
}

function materialiOk(ex){
  return ex.materiali.every(function(m){ return state.materiali.has(m); });
}
function fasciaOk(ex){ return ex.bande.indexOf(state.fascia) !== -1; }
function obiettivoOk(ex){
  if(state.obiettivi.size === 0) return true;
  return ex.obiettivi.some(function(o){ return state.obiettivi.has(o); });
}

function pickDuration(ex, remaining){
  var min = ex.durata[0], max = ex.durata[1];
  var d = min + Math.floor(Math.random()*(max-min+1));
  return Math.min(d, Math.max(min, remaining));
}

function fillPhase(pool, budget, used){
  // Riempie 'budget' minuti pescando dal pool (già filtrato per fascia/materiali/eventualmente obiettivo),
  // preferendo sempre un esercizio che entri per intero nel tempo rimasto.
  var candidates = pool.filter(function(e){ return !used.has(e.id); });
  var chosen = [];
  var remaining = budget;
  var guard = 0;
  while(remaining >= 3 && candidates.length && guard < 40){
    guard++;
    var fitting = candidates.filter(function(c){ return c.durata[0] <= remaining; });
    if(!fitting.length) break;
    var ex = fitting[0];
    var d = pickDuration(ex, remaining);
    chosen.push(Object.assign({}, ex, {durataScelta:d}));
    used.add(ex.id);
    remaining -= d;
    candidates = candidates.filter(function(c){ return c.id!==ex.id; });
  }
  return { chosen: chosen, usedTime: budget - remaining };
}

function pickDurationVicino(ex, target){
  // Per la sostituzione del singolo esercizio: sceglie una durata il più vicina possibile
  // a quella dell'esercizio sostituito, restando dentro il range dell'esercizio nuovo.
  return Math.min(ex.durata[1], Math.max(ex.durata[0], Math.round(target)));
}

function demoteRecenti(pool, recentiIds){
  // Non esclude gli esercizi fatti di recente (la libreria potrebbe essere piccola),
  // ma li sposta in fondo così vengono ripescati solo se serve riempire il tempo.
  return pool.slice().sort(function(a,b){
    var ra = recentiIds.has(a.id) ? 1 : 0;
    var rb = recentiIds.has(b.id) ? 1 : 0;
    return ra - rb;
  });
}

function sommaDurate(list){
  return list.reduce(function(s,e){ return s + e.durataScelta; }, 0);
}

function generaSeduta(lockedItems){
  lockedItems = lockedItems || [];
  var recentiIds = idsRecenti(2);
  var pesoInfo = categorieMenoAllenate();

  var riscaldamentoPool = demoteRecenti(shuffle(ESERCIZI.filter(function(e){
    return e.fase==='riscaldamento' && fasciaOk(e) && materialiOk(e);
  })), recentiIds);
  var chiusuraPool = demoteRecenti(shuffle(ESERCIZI.filter(function(e){
    return e.fase==='chiusura' && fasciaOk(e) && materialiOk(e);
  })), recentiIds);
  var mainPoolBase = function(){
    return ESERCIZI.filter(function(e){
      return (e.fase==='tecnica' || e.fase==='coordinazione' || e.fase==='gioco') &&
        fasciaOk(e) && materialiOk(e);
    });
  };
  var relaxedObiettivo = false;
  var mainPool = demoteRecenti(balancedByObiettivo(mainPoolBase().filter(obiettivoOk), pesoInfo.ordine), recentiIds);
  if(mainPool.length < 2 && state.obiettivi.size > 0){
    // troppo pochi esercizi per l'obiettivo scelto in questa fascia/materiali: allarga la selezione
    var allargata = demoteRecenti(balancedByObiettivo(mainPoolBase(), pesoInfo.ordine), recentiIds);
    if(allargata.length > mainPool.length){
      mainPool = allargata;
      relaxedObiettivo = true;
    }
  }

  if(riscaldamentoPool.length===0 && chiusuraPool.length===0 && mainPool.length===0 && lockedItems.length===0){
    return { ok:false, seduta:[], relaxedObiettivo:false, pesoInfo:pesoInfo };
  }

  var lockedRisc = lockedItems.filter(function(e){ return e.fase==='riscaldamento'; });
  var lockedChiu = lockedItems.filter(function(e){ return e.fase==='chiusura'; });
  var lockedMain = lockedItems.filter(function(e){ return e.fase!=='riscaldamento' && e.fase!=='chiusura'; });

  var tempoTotale = state.tempo;
  var tRisc = (riscaldamentoPool.length || lockedRisc.length) ? Math.min(10, Math.max(5, Math.round(tempoTotale*0.15/5)*5)) : 0;
  var tChiu = ((chiusuraPool.length || lockedChiu.length) && tempoTotale>=25) ? Math.min(15, Math.max(4, Math.round(tempoTotale*0.15/5)*5)) : 0;
  var tMain = Math.max(0, tempoTotale - tRisc - tChiu);

  var used = new Set(lockedItems.map(function(e){ return e.id; }));

  var budgetRisc = Math.max(0, tRisc - sommaDurate(lockedRisc));
  var risc = fillPhase(riscaldamentoPool, budgetRisc, used);
  var leftoverRisc = budgetRisc - risc.usedTime;
  var riscPart = lockedRisc.concat(risc.chosen);

  var budgetMain = Math.max(0, (tMain + leftoverRisc) - sommaDurate(lockedMain));
  var main = fillPhase(mainPool, budgetMain, used);
  var leftoverMain = budgetMain - main.usedTime;
  var mainPart = lockedMain.concat(main.chosen);

  var budgetChiu = Math.max(0, (tChiu + leftoverMain) - sommaDurate(lockedChiu));
  var chiu = fillPhase(chiusuraPool, budgetChiu, used);
  var leftoverChiu = budgetChiu - chiu.usedTime;
  var chiuPart = lockedChiu.concat(chiu.chosen);

  if(leftoverChiu >= 3){
    var extra = fillPhase(mainPool, leftoverChiu, used);
    if(extra.chosen.length){
      mainPart = mainPart.concat(extra.chosen);
    }
  }

  var seduta = riscPart.concat(mainPart).concat(chiuPart);

  return { ok: seduta.length>0, seduta: seduta, relaxedObiettivo: relaxedObiettivo, pesoInfo: pesoInfo };
}

function swapEsercizio(i){
  if(!state.seduta || !state.seduta.ok) return;
  var seduta = state.seduta.seduta;
  var ex = seduta[i];
  var pool;
  if(ex.fase==='riscaldamento'){
    pool = ESERCIZI.filter(function(e){ return e.fase==='riscaldamento' && fasciaOk(e) && materialiOk(e); });
  } else if(ex.fase==='chiusura'){
    pool = ESERCIZI.filter(function(e){ return e.fase==='chiusura' && fasciaOk(e) && materialiOk(e); });
  } else {
    pool = ESERCIZI.filter(function(e){
      return (e.fase==='tecnica'||e.fase==='coordinazione'||e.fase==='gioco') && fasciaOk(e) && materialiOk(e);
    });
  }
  var usedIds = new Set(seduta.map(function(e){ return e.id; }));
  var candidati = pool.filter(function(e){ return e.id !== ex.id && !usedIds.has(e.id); });
  if(!candidati.length){
    showToast('Nessun altro esercizio disponibile con questi filtri');
    return;
  }
  var conStessoObiettivo = candidati.filter(function(e){
    return e.obiettivi.some(function(o){ return ex.obiettivi.indexOf(o) !== -1; });
  });
  var pescaDa = shuffle((conStessoObiettivo.length ? conStessoObiettivo : candidati).slice());
  var nuovo = pescaDa[0];
  var d = pickDurationVicino(nuovo, ex.durataScelta);
  seduta[i] = Object.assign({}, nuovo, { durataScelta: d });
  renderSeduta(state.seduta);
  showToast('Esercizio sostituito');
}

function rimuoviEsercizio(i){
  if(!state.seduta || !state.seduta.ok) return;
  var seduta = state.seduta.seduta;
  if(seduta.length <= 1){
    showToast('Non puoi rimuovere l\'unico esercizio rimasto');
    return;
  }
  seduta.splice(i, 1);
  renderSeduta(state.seduta);
  showToast('Esercizio rimosso dalla seduta');
}

/* ============ RENDER RISULTATI ============ */

const panelResults = document.getElementById('panelResults');

function faseLabel(f){
  return {riscaldamento:'Riscaldamento', tecnica:'Tecnica', coordinazione:'Coordinazione', gioco:'Gioco', chiusura:'Chiusura'}[f] || f;
}

function renderSeduta(result){
  if(!result.ok){
    panelResults.innerHTML =
      '<div class="warn-box">Nessun esercizio corrisponde ai filtri scelti per il gruppo <b>'+fasciaLabel(state.fascia)+'</b>. '+
      'Prova ad aggiungere qualche materiale disponibile o ad allungare il tempo.</div>' +
      '<div class="empty-state"><p>Modifica i filtri qui accanto e riprova.</p></div>';
    return;
  }

  var seduta = result.seduta;
  var totale = seduta.reduce(function(s,e){ return s+e.durataScelta; }, 0);

  var html = '';
  if(result.relaxedObiettivo){
    html += '<div class="warn-box">Per questa fascia e questi materiali c\'erano pochi esercizi sull\'obiettivo scelto, quindi ho allargato un po\' la selezione per riempire bene il tempo.</div>';
  }
  if(result.pesoInfo && result.pesoInfo.haStorico && result.pesoInfo.vario){
    var minVal = Math.min.apply(null, OBIETTIVI.map(function(o){ return result.pesoInfo.conteggi[o]; }));
    var menoAllenate = OBIETTIVI.filter(function(o){ return result.pesoInfo.conteggi[o]===minVal; });
    html += '<div class="balance-hint">Nelle ultime sedute salvate hai allenato meno <b>'+menoAllenate.join(', ')+'</b>: oggi gli ho dato un po\' di precedenza.</div>';
  }
  html += '<div class="session-summary">';
  html += '<div class="stats">';
  html += '<div class="stat"><b>'+totale+' min</b><span>durata allenamento</span></div>';
  html += '<div class="stat"><b>'+seduta.length+'</b><span>esercizi</span></div>';
  html += '<div class="stat"><b>'+fasciaLabelBreve(state.fascia)+'</b><span>'+FASCIA_INFO[state.fascia].eta+' anni</span></div>';
  html += '</div>';
  html += '<div class="summary-actions">';
  html += '<button class="icon-btn" id="btnCampo" type="button">Modalità campo</button>';
  html += '</div>';
  html += '</div>';

  html += '<div class="exercise-list">';
  seduta.forEach(function(ex, i){
    var diagramFn = DIAGRAMS[ex.diagram];
    var diagramSvg = diagramFn ? diagramFn() : '';
    html += '<div class="ex-card" style="--fase-color:'+(FASE_COLOR[ex.fase]||'var(--orange-500)')+'">';
    html += '<div class="ex-head">';
    html += '<div class="ex-order">'+(i+1)+'</div>';
    html += '<div class="ex-head-text"><div class="ex-fase">'+faseLabel(ex.fase)+'</div><h3 class="ex-nome">'+ex.nome+'</h3></div>';
    html += '<div class="ex-duration">'+ex.durataScelta+' min</div>';
    html += '<div class="ex-actions">';
    html += '<button class="ex-mini-btn" data-action="swap" data-idx="'+i+'" type="button" title="Cambia esercizio">↻</button>';
    html += '<button class="ex-mini-btn ex-del" data-action="remove" data-idx="'+i+'" type="button" title="Rimuovi questo esercizio">🗑</button>';
    html += '</div>';
    html += '</div>';
    html += '<div class="ex-body">';
    html += '<div class="ex-diagram">'+diagramSvg+'</div>';
    html += '<div class="ex-text">';
    if(ex.obiettivi.length){
      html += '<div class="ex-tags">'+ex.obiettivi.map(function(o){return '<span class="tag-mini">'+o+'</span>';}).join('')+'</div>';
    }
    html += '<p>'+ex.descrizione+'</p>';
    if(ex.varianti && ex.varianti.length){
      html += '<details class="varianti"><summary>Varianti</summary><ul>' +
        ex.varianti.map(function(v){return '<li>'+v+'</li>';}).join('') + '</ul></details>';
    }
    html += '</div></div></div>';
  });
  html += '</div>';

  html += '<div class="finalize-section">';
  html += '<p class="finalize-hint">Rivisti gli esercizi? Salva l\'allenamento in cronologia e, se vuoi, condividilo in PDF.</p>';
  html += '<div class="finalize-actions">';
  html += '<button class="icon-btn" id="btnCondividi" type="button">Condividi PDF</button>';
  html += '<button class="btn-generate" id="btnSalvaCronologia" type="button">Salva in cronologia</button>';
  html += '</div>';
  html += '</div>';

  panelResults.innerHTML = html;

  document.getElementById('btnCampo').addEventListener('click', function(){
    apriModalitaCampo(seduta);
  });
  document.getElementById('btnCondividi').addEventListener('click', function(){
    condividiSeduta(seduta, totale);
  });
  document.getElementById('btnSalvaCronologia').addEventListener('click', function(){
    salvaInStorico(seduta, totale);
    var btn = document.getElementById('btnSalvaCronologia');
    btn.textContent = '✓ Allenamento salvato in cronologia';
    btn.disabled = true;
    showToast('Allenamento salvato in cronologia');
  });
  Array.prototype.forEach.call(panelResults.querySelectorAll('.ex-mini-btn'), function(btn){
    btn.addEventListener('click', function(){
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      var azione = btn.getAttribute('data-action');
      if(azione==='swap') swapEsercizio(idx);
      else if(azione==='remove') rimuoviEsercizio(idx);
    });
  });
}

function showToast(msg){
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

/* Sostituisce confirm() nativo: nelle app salvate in home screen su iOS
   (e in alcuni contesti Android) i dialoghi nativi del browser possono
   essere bloccati o non comparire mai, lasciando l'azione "sospesa" senza
   che l'utente se ne accorga. callback riceve true/false. */
function apriConferma(messaggio, callback){
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '400';
  overlay.innerHTML =
    '<div class="modal-box" style="max-width:360px;">'+
      '<h2>⚠️ Conferma</h2>'+
      '<p class="feedback-hint">'+messaggio+'</p>'+
      '<div style="display:flex;gap:9px;margin-top:14px;">'+
        '<button class="icon-btn" id="confAnnulla" type="button" style="flex:1;">Annulla</button>'+
        '<button class="btn-generate" id="confConferma" type="button" style="flex:1;margin-top:0;">Conferma</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(overlay);

  function chiudi(valore){
    overlay.remove();
    callback(valore);
  }
  overlay.addEventListener('click', function(ev){ if(ev.target===overlay) chiudi(false); });
  overlay.querySelector('#confAnnulla').addEventListener('click', function(){ chiudi(false); });
  overlay.querySelector('#confConferma').addEventListener('click', function(){ chiudi(true); });
}

/* ============ PDF E CONDIVISIONE ============ */

function coloreFasePDF(f){
  return {
    riscaldamento:[201,150,46],
    tecnica:      [111,168,217],
    coordinazione:[183,156,224],
    gioco:        [76,154,106],
    chiusura:     [193,102,90]
  }[f] || [140,150,145];
}

function costruisciPDF(seduta, totale){
  var jsPDFCtor = window.jspdf ? window.jspdf.jsPDF : null;
  if(!jsPDFCtor){ return null; }
  var doc = new jsPDFCtor({ unit:'mm', format:'a4' });
  var pageW = doc.internal.pageSize.getWidth();
  var pageH = doc.internal.pageSize.getHeight();
  var marginX = 16;
  var headerH = 32;
  var y = headerH + 12;

  // Palette brand
  var COL_NAVY   = [15,29,23];
  var COL_NAVY_TXT = [23,42,34];
  var COL_ORANGE = [201,150,46];
  var COL_ORANGE_LIGHT = [231,197,122];
  var COL_CREAM  = [243,239,222];
  var COL_ZEBRA  = [244,241,231];
  var COL_CARD   = [250,247,238];
  var COL_CARD_BORDER = [225,220,200];
  var COL_GREY_TXT = [95,105,100];
  var COL_TEXT   = [40,50,45];

  function checkPageBreak(spazio){
    if(y + spazio > pageH - 18){
      doc.addPage();
      disegnaFooter();
      y = 20;
    }
  }

  function disegnaHeader(){
    doc.setFillColor(COL_NAVY[0],COL_NAVY[1],COL_NAVY[2]);
    doc.rect(0, 0, pageW, headerH, 'F');
    doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
    doc.rect(0, headerH, pageW, 1.1, 'F');

    doc.setFont('helvetica','bold');
    doc.setFontSize(17);
    doc.setTextColor(COL_CREAM[0],COL_CREAM[1],COL_CREAM[2]);
    doc.text(CONFIG.sport.nomeAllenamento+' — '+CONFIG.coach.nome, marginX, 14);

    doc.setFont('helvetica','normal');
    doc.setFontSize(10.5);
    doc.setTextColor(COL_ORANGE_LIGHT[0],COL_ORANGE_LIGHT[1],COL_ORANGE_LIGHT[2]);
    doc.text('Gruppo '+fasciaLabel(state.fascia)+' · '+totale+' min · '+seduta.length+' esercizi', marginX, 22);

    doc.setFont('helvetica','normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COL_CREAM[0],COL_CREAM[1],COL_CREAM[2]);
    var oggiStr = (new Date()).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'});
    doc.text('Generato il '+oggiStr, marginX, 28.5);
  }

  function disegnaFooter(){
    doc.setFont('helvetica','normal');
    doc.setFontSize(8.5);
    doc.setTextColor(150,155,165);
    doc.text(CONFIG.app.pdfFooterPrefix+' '+CONFIG.coach.nome, marginX, pageH - 9);
  }

  function sectionTitle(testo){
    checkPageBreak(11);
    doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
    doc.rect(marginX, y-3.4, 3, 3, 'F');
    doc.setFont('helvetica','bold');
    doc.setFontSize(12.5);
    doc.setTextColor(COL_NAVY_TXT[0],COL_NAVY_TXT[1],COL_NAVY_TXT[2]);
    doc.text(testo, marginX+6, y);
    y += 8;
  }

  disegnaHeader();

  // ---- Riepilogo fasi (mini distribuzione tempo) ----
  var fasi = {};
  seduta.forEach(function(ex){ fasi[ex.fase] = (fasi[ex.fase]||0) + ex.durataScelta; });
  var fasiList = Object.keys(fasi);
  if(fasiList.length){
    sectionTitle('Distribuzione del tempo');
    var barX = marginX;
    var barY = y;
    var barW = pageW - marginX*2;
    var barH = 6;
    doc.setFillColor(COL_CARD_BORDER[0],COL_CARD_BORDER[1],COL_CARD_BORDER[2]);
    doc.roundedRect(barX, barY, barW, barH, 1.5, 1.5, 'F');
    var accX = barX;
    fasiList.forEach(function(f){
      var frac = fasi[f]/totale;
      var w = barW*frac;
      var col = coloreFasePDF(f);
      doc.setFillColor(col[0],col[1],col[2]);
      doc.rect(accX, barY, w, barH, 'F');
      accX += w;
    });
    y += barH + 5;

    // legenda
    doc.setFont('helvetica','normal');
    doc.setFontSize(9);
    var legX = marginX;
    var legY = y;
    var legMax = pageW - marginX;
    fasiList.forEach(function(f){
      var col = coloreFasePDF(f);
      var etichetta = faseLabel(f)+' '+fasi[f]+'\''; 
      doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
      var w = doc.getTextWidth(etichetta) + 10;
      if(legX + w > legMax){ legX = marginX; legY += 6; }
      doc.setFillColor(col[0],col[1],col[2]);
      doc.circle(legX+2, legY-1.3, 1.6, 'F');
      doc.text(etichetta, legX+6, legY);
      legX += w;
    });
    y = legY + 8;
  }

  // ---- Esercizi ----
  sectionTitle('Esercizi');

  seduta.forEach(function(ex, i){
    var descLines = doc.splitTextToSize(ex.descrizione || '', pageW - marginX*2 - 8);
    var varLines = [];
    if(ex.varianti && ex.varianti.length){
      varLines = doc.splitTextToSize('Varianti: ' + ex.varianti.join('  •  '), pageW - marginX*2 - 8);
    }
    var cardH = 12 + descLines.length*4.8 + (varLines.length ? varLines.length*4.4 + 3 : 0) + 4;
    checkPageBreak(cardH + 4);

    // Card background
    doc.setFillColor(COL_CARD[0],COL_CARD[1],COL_CARD[2]);
    doc.setDrawColor(COL_CARD_BORDER[0],COL_CARD_BORDER[1],COL_CARD_BORDER[2]);
    doc.roundedRect(marginX, y-4, pageW - marginX*2, cardH, 2.2, 2.2, 'FD');

    // Colored phase stripe (left side)
    var faseCol = coloreFasePDF(ex.fase);
    doc.setFillColor(faseCol[0],faseCol[1],faseCol[2]);
    doc.rect(marginX, y-4, 1.6, cardH, 'F');

    // Numero + titolo
    doc.setFont('helvetica','bold');
    doc.setFontSize(11.5);
    doc.setTextColor(COL_NAVY_TXT[0],COL_NAVY_TXT[1],COL_NAVY_TXT[2]);
    var titolo = (i+1)+'. '+ex.nome;
    var titoloLines = doc.splitTextToSize(titolo, pageW - marginX*2 - 45);
    doc.text(titoloLines, marginX+5, y);

    // Badge fase + durata (in alto a destra)
    var badgeText = faseLabel(ex.fase)+' · '+ex.durataScelta+"'";
    doc.setFont('helvetica','bold');
    doc.setFontSize(8.5);
    var bw = doc.getTextWidth(badgeText) + 6;
    var bh = 5.6;
    var bx = pageW - marginX - bw - 2;
    var by = y - 4;
    doc.setFillColor(faseCol[0],faseCol[1],faseCol[2]);
    doc.roundedRect(bx, by, bw, bh, 1.8, 1.8, 'F');
    doc.setTextColor(255,255,255);
    doc.text(badgeText, bx+3, by+3.9);

    y += Math.max(titoloLines.length*5.2, 6) + 1;

    // Descrizione
    doc.setFont('helvetica','normal');
    doc.setFontSize(10);
    doc.setTextColor(COL_TEXT[0],COL_TEXT[1],COL_TEXT[2]);
    doc.text(descLines, marginX+5, y);
    y += descLines.length*4.8;

    // Varianti
    if(varLines.length){
      y += 2;
      doc.setFont('helvetica','italic');
      doc.setFontSize(9);
      doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
      doc.text(varLines, marginX+5, y);
      y += varLines.length*4.4;
    }
    y += 8;
  });

  // Footer su tutte le pagine
  var totalePagine = doc.internal.getNumberOfPages();
  for(var p=1; p<=totalePagine; p++){
    doc.setPage(p);
    disegnaFooter();
  }

  return doc;
}

function scaricaBlob(blob, filename){
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
}

function condividiSeduta(seduta, totale){
  var doc = costruisciPDF(seduta, totale);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var filename = 'allenamento-'+CONFIG.sport.slug+'-'+state.fascia.replace('/','-')+'-'+totale+'min.pdf';
  var blob = doc.output('blob');

  var file = null;
  try{ file = new File([blob], filename, {type:'application/pdf'}); }catch(e){ file = null; }

  if(file && navigator.canShare && navigator.canShare({files:[file]})){
    navigator.share({
      files:[file],
      title:CONFIG.sport.nomeAllenamento,
      text:CONFIG.sport.nomeAllenamento+' — '+fasciaLabel(state.fascia)+', '+totale+' minuti'
    }).catch(function(err){
      if(err && err.name === 'AbortError'){ return; }
      scaricaBlob(blob, filename);
      showToast('PDF scaricato — allegalo su WhatsApp');
    });
    return;
  }

  scaricaBlob(blob, filename);
  showToast('PDF scaricato — allegalo su WhatsApp');
}

/* ============ RICOSTRUZIONE E ACCESSO A UNA SEDUTA SALVATA ============ */

function ricostruisciSedutaCompleta(voce){
  var lista = (voce && Array.isArray(voce.esercizi)) ? voce.esercizi : [];
  return lista.map(function(es){
    es = es || {};
    var full = ESERCIZI.filter(function(e){ return e.id === es.id; })[0];
    var durataCatalogo = (full && Array.isArray(full.durata)) ? full.durata[0] : null;
    var durata = (typeof es.durataScelta === 'number' && es.durataScelta > 0)
      ? es.durataScelta
      : (durataCatalogo || 10);
    if(full){
      return Object.assign({}, full, { durataScelta: durata, completo: true });
    }
    return {
      id: es.id || '', nome: es.nome || 'Esercizio senza nome',
      fase: es.fase || 'tecnica', obiettivi: es.obiettivi || [],
      durataScelta: durata, descrizione:'', varianti:[], diagram:null,
      completo: false
    };
  });
}

function scaricaPDFDaStorico(idx){
  var storico = caricaStorico();
  var voce = storico[idx];
  if(!voce){
    showToast('Voce non trovata');
    return;
  }
  var sedutaCompleta = ricostruisciSedutaCompleta(voce);
  var doc = costruisciPDF(sedutaCompleta, voce.tempo);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var d = new Date(voce.data);
  var dataFile = d.toISOString().slice(0,10);
  var filename = 'allenamento-'+CONFIG.sport.slug+'-'+voce.fascia.replace('/','-')+'-'+dataFile+'.pdf';
  var blob = doc.output('blob');

  var file = null;
  try{ file = new File([blob], filename, {type:'application/pdf'}); }catch(e){ file = null; }

  if(file && navigator.canShare && navigator.canShare({files:[file]})){
    navigator.share({
      files:[file],
      title:CONFIG.sport.nomeAllenamento,
      text:CONFIG.sport.nomeAllenamento+' — '+fasciaLabel(voce.fascia)+', '+voce.tempo+' minuti'
    }).catch(function(err){
      if(err && err.name === 'AbortError'){ return; }
      scaricaBlob(blob, filename);
      showToast('PDF scaricato — allegalo su WhatsApp');
    });
    return;
  }

  scaricaBlob(blob, filename);
  showToast('PDF scaricato — allegalo su WhatsApp');
}

/* ============ PDF FEEDBACK COACH (presenze + appunti) ============ */

function costruisciPDFFeedback(entry){
  var jsPDFCtor = window.jspdf ? window.jspdf.jsPDF : null;
  if(!jsPDFCtor){ return null; }
  var doc = new jsPDFCtor({ unit:'mm', format:'a4' });
  var pageW = doc.internal.pageSize.getWidth();
  var pageH = doc.internal.pageSize.getHeight();
  var marginX = 16;
  var headerH = 30;
  var y = headerH + 12;

  // Palette brand (coerente con l'app)
  var COL_NAVY = [15,29,23];
  var COL_NAVY_TXT = [23,42,34];
  var COL_ORANGE = [201,150,46];
  var COL_ORANGE_LIGHT = [231,197,122];
  var COL_CREAM = [243,239,222];
  var COL_ZEBRA = [244,241,231];
  var COL_GREY_TXT = [95,105,100];
  var COL_GREEN = [76,154,106];
  var COL_RED = [193,102,90];

  function checkPageBreak(spazioNecessario){
    if(y + spazioNecessario > pageH - 16){
      doc.addPage();
      y = 20;
    }
  }

  function sectionTitle(testo){
    checkPageBreak(11);
    doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
    doc.rect(marginX, y-3.4, 3, 3, 'F');
    doc.setFont('helvetica','bold');
    doc.setFontSize(12.5);
    doc.setTextColor(COL_NAVY_TXT[0],COL_NAVY_TXT[1],COL_NAVY_TXT[2]);
    doc.text(testo, marginX+6, y);
    y += 8;
  }

  var d = new Date(entry.data);
  var dataStr = d.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric'});
  var presenti = entry.presenze.filter(function(p){ return p.presente; }).length;

  // ---- Fascia superiore colorata ----
  doc.setFillColor(COL_NAVY[0],COL_NAVY[1],COL_NAVY[2]);
  doc.rect(0, 0, pageW, headerH, 'F');
  doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
  doc.rect(0, headerH, pageW, 1.1, 'F');

  doc.setFont('helvetica','bold');
  doc.setFontSize(17);
  doc.setTextColor(COL_CREAM[0],COL_CREAM[1],COL_CREAM[2]);
  doc.text('Feedback allenamento — '+CONFIG.coach.nome, marginX, 15);

  doc.setFont('helvetica','normal');
  doc.setFontSize(10.5);
  doc.setTextColor(COL_ORANGE_LIGHT[0],COL_ORANGE_LIGHT[1],COL_ORANGE_LIGHT[2]);
  var sottotitolo = (entry.gruppo ? fasciaLabel(entry.gruppo)+' · ' : '') + dataStr + ' · ' + presenti+'/'+entry.presenze.length+' presenti';
  doc.text(sottotitolo, marginX, 23);

  // ---- Esercizi svolti ----
  if(entry.seduta && entry.seduta.esercizi && entry.seduta.esercizi.length){
    sectionTitle('Esercizi svolti');

    doc.setFont('helvetica','normal');
    doc.setFontSize(10.5);
    doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
    doc.text('Gruppo '+fasciaLabel(entry.seduta.fascia)+' · '+entry.seduta.tempo+' min totali', marginX, y);
    y += 7;

    entry.seduta.esercizi.forEach(function(ex, i){
      checkPageBreak(6);
      doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
      var riga = (i+1)+'. '+ex.nome+' ('+ex.durataScelta+' min)';
      var righeSplit = doc.splitTextToSize(riga, pageW - marginX*2);
      doc.text(righeSplit, marginX, y);
      y += righeSplit.length*5.2;
    });
    y += 7;
  }

  // ---- Presenze (righe a zebra + badge colorato) ----
  sectionTitle('Presenze');

  if(entry.presenze.length){
    var rowH = 9;
    entry.presenze.forEach(function(p, i){
      checkPageBreak(rowH+1);
      if(i % 2 === 0){
        doc.setFillColor(COL_ZEBRA[0],COL_ZEBRA[1],COL_ZEBRA[2]);
        doc.rect(marginX-2, y-6.2, pageW-marginX*2+4, rowH, 'F');
      }
      doc.setFont('helvetica','normal');
      doc.setFontSize(10.5);
      doc.setTextColor(50,58,54);
      doc.text(p.nome, marginX+1, y);

      var badgeText = p.presente ? 'PRESENTE' : 'ASSENTE';
      doc.setFont('helvetica','bold');
      doc.setFontSize(8.5);
      var textW = doc.getTextWidth(badgeText);
      var padX = 3;
      var badgeW = textW + padX*2;
      var badgeH = 5.4;
      var badgeX = pageW - marginX - badgeW;
      var badgeY = y - 4.1;
      var col = p.presente ? COL_GREEN : COL_RED;
      doc.setFillColor(col[0],col[1],col[2]);
      doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 1.6, 1.6, 'F');
      doc.setTextColor(255,255,255);
      doc.text(badgeText, badgeX+padX, badgeY+3.8);

      y += rowH;
    });
  } else {
    doc.setFont('helvetica','normal');
    doc.setFontSize(10.5);
    doc.setTextColor(140,140,140);
    doc.text('Nessun nominativo registrato.', marginX, y);
    y += 6;
  }
  y += 7;

  // ---- Note allenamento ----
  sectionTitle('Note allenamento');

  var noteTesto = (entry.note||'').trim();
  doc.setFont('helvetica','normal');
  doc.setFontSize(10.5);
  if(noteTesto){
    var noteLines = doc.splitTextToSize(noteTesto, pageW - marginX*2 - 8);
    var noteBoxH = noteLines.length*5.2 + 7;
    checkPageBreak(noteBoxH);
    doc.setFillColor(COL_ZEBRA[0],COL_ZEBRA[1],COL_ZEBRA[2]);
    doc.roundedRect(marginX-2, y-5.2, pageW-marginX*2+4, noteBoxH, 2, 2, 'F');
    doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
    doc.text(noteLines, marginX+2, y);
    y += noteBoxH;
  } else {
    doc.setFont('helvetica','italic');
    doc.setTextColor(140,140,140);
    doc.text('Nessun appunto inserito.', marginX, y);
  }

  doc.setFont('helvetica','normal');
  doc.setFontSize(8.5);
  doc.setTextColor(150,155,165);
  doc.text(CONFIG.app.pdfFooterPrefix+' '+CONFIG.coach.nome, marginX, pageH - 9);

  return doc;
}

function nomeFilePDFFeedback(entry){
  var d = new Date(entry.data);
  var dataFile = d.toISOString().slice(0,10);
  return 'feedback-allenamento-'+(entry.gruppo||'gruppo')+'-'+dataFile+'.pdf';
}

/* Scarica sempre il PDF direttamente sul dispositivo in uso (pc o smartphone),
   senza passare dal pannello di condivisione. */
function scaricaFeedback(entry){
  var doc = costruisciPDFFeedback(entry);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var filename = nomeFilePDFFeedback(entry);
  var blob = doc.output('blob');
  scaricaBlob(blob, filename);
  showToast('PDF scaricato');
}

/* Apre il pannello di condivisione del dispositivo (WhatsApp, email, ecc.);
   se non è disponibile, scarica comunque il PDF. */
function condividiFeedback(entry){
  var doc = costruisciPDFFeedback(entry);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var filename = nomeFilePDFFeedback(entry);
  var blob = doc.output('blob');

  var file = null;
  try{ file = new File([blob], filename, {type:'application/pdf'}); }catch(e){ file = null; }

  if(file && navigator.canShare && navigator.canShare({files:[file]})){
    navigator.share({
      files:[file],
      title:'Feedback allenamento',
      text:'Feedback allenamento — '+filename
    }).catch(function(err){
      if(err && err.name === 'AbortError'){ return; }
      scaricaBlob(blob, filename);
      showToast('PDF scaricato — allegalo su WhatsApp');
    });
    return;
  }

  scaricaBlob(blob, filename);
  showToast('PDF scaricato — allegalo su WhatsApp');
}

/* ============ GRAFICI A BARRE (disegnati direttamente nel PDF) ============ */

function disegnaBarraSemplice(doc, x, y, label, value, maxValue, barMaxW, color, trackColor, textColor, etichettaValore){
  var labelCol = 52;
  doc.setFont('helvetica','normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textColor[0],textColor[1],textColor[2]);
  var labelTrunc = label.length > 30 ? label.slice(0,29)+'…' : label;
  doc.text(labelTrunc, x, y);

  var barX = x + labelCol;
  var barH = 4;
  doc.setFillColor(trackColor[0],trackColor[1],trackColor[2]);
  doc.roundedRect(barX, y-3.3, barMaxW, barH, 1, 1, 'F');
  var w = maxValue>0 ? Math.max((value/maxValue)*barMaxW, value>0?2.5:0) : 0;
  if(w>0){
    doc.setFillColor(color[0],color[1],color[2]);
    doc.roundedRect(barX, y-3.3, w, barH, 1, 1, 'F');
  }
  doc.setFont('helvetica','bold');
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0],textColor[1],textColor[2]);
  doc.text(String(etichettaValore), barX+barMaxW+3, y);
}

function disegnaBarraPresenze(doc, x, y, item, maxTotale, barMaxW, trackColor, greenColor, redColor, textColor){
  var labelCol = 52;
  doc.setFont('helvetica','normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textColor[0],textColor[1],textColor[2]);
  var labelTrunc = item.nome.length > 30 ? item.nome.slice(0,29)+'…' : item.nome;
  doc.text(labelTrunc, x, y);

  var barX = x + labelCol;
  var barH = 4;
  doc.setFillColor(trackColor[0],trackColor[1],trackColor[2]);
  doc.roundedRect(barX, y-3.3, barMaxW, barH, 1, 1, 'F');
  var barW = maxTotale>0 ? (item.totale/maxTotale)*barMaxW : 0;
  var greenW = item.totale>0 ? barW*(item.presente/item.totale) : 0;
  var redW = Math.max(barW - greenW, 0);
  if(greenW>0){
    doc.setFillColor(greenColor[0],greenColor[1],greenColor[2]);
    doc.rect(barX, y-3.3, greenW, barH, 'F');
  }
  if(redW>0){
    doc.setFillColor(redColor[0],redColor[1],redColor[2]);
    doc.rect(barX+greenW, y-3.3, redW, barH, 'F');
  }
  doc.setFont('helvetica','bold');
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0],textColor[1],textColor[2]);
  doc.text(item.presente+'P · '+item.assente+'A', barX+barMaxW+3, y);
}

/* ============ PDF REPORT STATISTICHE (esercizi + presenze nel periodo) ============ */

function costruisciPDFReport(dati, gruppoAttivo){
  var jsPDFCtor = window.jspdf ? window.jspdf.jsPDF : null;
  if(!jsPDFCtor){ return null; }
  var doc = new jsPDFCtor({ unit:'mm', format:'a4' });
  var pageW = doc.internal.pageSize.getWidth();
  var pageH = doc.internal.pageSize.getHeight();
  var marginX = 16;
  var headerH = 32;
  var y = headerH + 12;

  var COL_NAVY = [15,29,23];
  var COL_NAVY_TXT = [23,42,34];
  var COL_ORANGE = [201,150,46];
  var COL_ORANGE_LIGHT = [231,197,122];
  var COL_CREAM = [243,239,222];
  var COL_GREY_TXT = [95,105,100];
  var COL_GREEN = [76,154,106];
  var COL_RED = [193,102,90];
  var COL_TRACK = [230,228,218];

  function checkPageBreak(spazio){
    if(y+spazio > pageH-16){ doc.addPage(); y=20; }
  }
  function sectionTitle(testo){
    checkPageBreak(11);
    doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
    doc.rect(marginX, y-3.4, 3, 3, 'F');
    doc.setFont('helvetica','bold');
    doc.setFontSize(12.5);
    doc.setTextColor(COL_NAVY_TXT[0],COL_NAVY_TXT[1],COL_NAVY_TXT[2]);
    doc.text(testo, marginX+6, y);
    y += 8;
  }

  var daStr = dati.da ? dati.da.toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'}) : '—';
  var aStr = dati.a ? dati.a.toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'}) : '—';
  var gruppoStr = gruppoAttivo==='tutti' ? 'Tutti i gruppi' : fasciaLabel(gruppoAttivo);

  doc.setFillColor(COL_NAVY[0],COL_NAVY[1],COL_NAVY[2]);
  doc.rect(0, 0, pageW, headerH, 'F');
  doc.setFillColor(COL_ORANGE[0],COL_ORANGE[1],COL_ORANGE[2]);
  doc.rect(0, headerH, pageW, 1.1, 'F');

  doc.setFont('helvetica','bold');
  doc.setFontSize(17);
  doc.setTextColor(COL_CREAM[0],COL_CREAM[1],COL_CREAM[2]);
  doc.text('Report statistiche — '+CONFIG.coach.nome, marginX, 14);

  doc.setFont('helvetica','normal');
  doc.setFontSize(10.5);
  doc.setTextColor(COL_ORANGE_LIGHT[0],COL_ORANGE_LIGHT[1],COL_ORANGE_LIGHT[2]);
  doc.text('Dal '+daStr+' al '+aStr+' · '+gruppoStr, marginX, 22);

  doc.setFont('helvetica','normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COL_CREAM[0],COL_CREAM[1],COL_CREAM[2]);
  doc.text('Generato il '+(new Date()).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'}), marginX, 28.5);

  sectionTitle('Riepilogo del periodo');
  doc.setFont('helvetica','normal');
  doc.setFontSize(10.5);
  doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
  doc.text(dati.storico.length+(dati.storico.length===1?' allenamento salvato':' allenamenti salvati')+' in questo periodo.', marginX, y);
  y += 6;
  doc.text(dati.feedback.length+(dati.feedback.length===1?' feedback (presenze) compilato':' feedback (presenze) compilati')+' in questo periodo.', marginX, y);
  y += 10;

  // ---- Esercizi più svolti ----
  var conteggioEsercizi = {};
  dati.storico.forEach(function(v){
    (v.esercizi||[]).forEach(function(e){
      conteggioEsercizi[e.nome] = (conteggioEsercizi[e.nome]||0) + 1;
    });
  });
  var listaEsercizi = Object.keys(conteggioEsercizi).map(function(k){ return {nome:k, count:conteggioEsercizi[k]}; })
    .sort(function(a,b){ return b.count - a.count; });

  sectionTitle('Esercizi più svolti'+(listaEsercizi.length>12 ? ' (top 12)' : ''));
  if(!listaEsercizi.length){
    doc.setFont('helvetica','italic');
    doc.setFontSize(10);
    doc.setTextColor(140,140,140);
    doc.text('Nessun allenamento salvato in questo periodo.', marginX, y);
    y += 8;
  } else {
    var topEsercizi = listaEsercizi.slice(0,12);
    var maxCount = topEsercizi[0].count;
    var barMaxW = pageW - marginX*2 - 52 - 16;
    topEsercizi.forEach(function(item){
      checkPageBreak(7);
      var etichetta = item.count + (item.count===1 ? ' volta' : ' volte');
      disegnaBarraSemplice(doc, marginX, y, item.nome, item.count, maxCount, barMaxW, COL_ORANGE, COL_TRACK, COL_GREY_TXT, etichetta);
      y += 7;
    });
    y += 6;
  }

  // ---- Presenze per bambino ----
  var conteggioPresenze = {};
  dati.feedback.forEach(function(v){
    (v.presenze||[]).forEach(function(p){
      if(!conteggioPresenze[p.nome]) conteggioPresenze[p.nome] = {presente:0, assente:0};
      if(p.presente) conteggioPresenze[p.nome].presente++; else conteggioPresenze[p.nome].assente++;
    });
  });
  var listaPresenze = Object.keys(conteggioPresenze).map(function(k){
    var c = conteggioPresenze[k];
    return {nome:k, presente:c.presente, assente:c.assente, totale:c.presente+c.assente};
  }).sort(function(a,b){ return (b.totale-a.totale) || (b.presente-a.presente); });

  sectionTitle('Presenze per bambino');
  if(!listaPresenze.length){
    doc.setFont('helvetica','italic');
    doc.setFontSize(10);
    doc.setTextColor(140,140,140);
    doc.text('Nessun feedback compilato in questo periodo.', marginX, y);
    y += 8;
  } else {
    checkPageBreak(8);
    doc.setFillColor(COL_GREEN[0],COL_GREEN[1],COL_GREEN[2]);
    doc.rect(marginX, y-3, 3, 3, 'F');
    doc.setFont('helvetica','normal');
    doc.setFontSize(9);
    doc.setTextColor(COL_GREY_TXT[0],COL_GREY_TXT[1],COL_GREY_TXT[2]);
    doc.text('Presente', marginX+5, y);
    doc.setFillColor(COL_RED[0],COL_RED[1],COL_RED[2]);
    doc.rect(marginX+32, y-3, 3, 3, 'F');
    doc.text('Assente', marginX+37, y);
    y += 7;

    var maxTotale = listaPresenze[0].totale || 1;
    var barMaxW2 = pageW - marginX*2 - 52 - 16;
    listaPresenze.forEach(function(item){
      checkPageBreak(7);
      disegnaBarraPresenze(doc, marginX, y, item, maxTotale, barMaxW2, COL_TRACK, COL_GREEN, COL_RED, COL_GREY_TXT);
      y += 7;
    });
  }

  var totalePagine = doc.internal.getNumberOfPages();
  for(var p=1; p<=totalePagine; p++){
    doc.setPage(p);
    doc.setFont('helvetica','normal');
    doc.setFontSize(8.5);
    doc.setTextColor(150,155,165);
    doc.text(CONFIG.app.pdfFooterPrefix+' '+CONFIG.coach.nome, marginX, pageH - 9);
  }

  return doc;
}

function scaricaReport(dati, gruppoAttivo){
  var doc = costruisciPDFReport(dati, gruppoAttivo);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var daP = dati.da ? dati.da.toISOString().slice(0,10) : 'inizio';
  var aP = dati.a ? dati.a.toISOString().slice(0,10) : 'oggi';
  var filename = 'report-statistiche-'+(gruppoAttivo||'tutti')+'-'+daP+'_'+aP+'.pdf';
  var blob = doc.output('blob');
  scaricaBlob(blob, filename);
  showToast('PDF scaricato');
}

function condividiReport(dati, gruppoAttivo){
  var doc = costruisciPDFReport(dati, gruppoAttivo);
  if(!doc){
    showToast('PDF non disponibile, riprova tra poco');
    return;
  }
  var daP = dati.da ? dati.da.toISOString().slice(0,10) : 'inizio';
  var aP = dati.a ? dati.a.toISOString().slice(0,10) : 'oggi';
  var filename = 'report-statistiche-'+(gruppoAttivo||'tutti')+'-'+daP+'_'+aP+'.pdf';
  var blob = doc.output('blob');

  var file = null;
  try{ file = new File([blob], filename, {type:'application/pdf'}); }catch(e){ file = null; }

  if(file && navigator.canShare && navigator.canShare({files:[file]})){
    navigator.share({
      files:[file],
      title:'Report statistiche',
      text:'Report statistiche — '+filename
    }).catch(function(err){
      if(err && err.name === 'AbortError'){ return; }
      scaricaBlob(blob, filename);
      showToast('PDF scaricato — allegalo su WhatsApp');
    });
    return;
  }

  scaricaBlob(blob, filename);
  showToast('PDF scaricato — allegalo su WhatsApp');
}

/* ============ UTILITY MODALI ============ */

function chiudiModaliAperte(){
  Array.prototype.forEach.call(document.querySelectorAll('.modal-overlay'), function(vecchio){
    if(vecchio.parentNode) vecchio.parentNode.removeChild(vecchio);
  });
}
function abilitaChiusuraClickEsterno(overlay){
  overlay.addEventListener('click', function(ev){
    if(ev.target===overlay && overlay.parentNode) document.body.removeChild(overlay);
  });
}

/* ============ MODALE FEEDBACK COACH ============ */

function apriFeedback(){
  chiudiModaliAperte();
  var roster = caricaRoster();
  var gruppoAttivo = (state.fascia === 'pulcini') ? 'pulcini' : 'aquilotti';
  var presenzeStato = {};
  roster.forEach(function(voce, idx){ presenzeStato[idx] = true; });

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  function rosterDelGruppo(){
    return roster.map(function(voce, idx){ return {voce:voce, idx:idx}; })
      .filter(function(item){ return item.voce.gruppo === gruppoAttivo; });
  }

  function rosterRowHtml(voce, idx){
    var presente = presenzeStato[idx] !== false;
    return '<div class="roster-row">'+
      '<span class="roster-name">'+voce.nome+'</span>'+
      '<div class="presence-toggle">'+
        '<button type="button" class="presence-btn presence-yes'+(presente ? ' active' : '')+'" data-idx="'+idx+'" data-val="1" aria-label="Presente">Presente</button>'+
        '<button type="button" class="presence-btn presence-no'+(!presente ? ' active' : '')+'" data-idx="'+idx+'" data-val="0" aria-label="Assente">Assente</button>'+
      '</div>'+
      '<button class="roster-del" type="button" data-idx="'+idx+'" title="Rimuovi dall\'elenco">✕</button>'+
    '</div>';
  }

  function listaHtml(){
    var righe = rosterDelGruppo();
    if(!righe.length) return '<p class="roster-empty">Nessun bambino '+fasciaLabelBreve(gruppoAttivo).toLowerCase()+' in elenco. Aggiungilo qui sotto per iniziare a segnare le presenze.</p>';
    return righe.map(function(item){ return rosterRowHtml(item.voce, item.idx); }).join('');
  }

  var oggi = new Date().toISOString().slice(0,10);

  function storicoDelGruppo(){
    return caricaStorico().filter(function(v){ return v.fascia === gruppoAttivo; });
  }

  function opzioniSeduteHtml(storicoFiltrato){
    return storicoFiltrato.map(function(v, idx){
      var d = new Date(v.data);
      var dataStr = d.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' + d.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
      return '<option value="'+idx+'">'+dataStr+' ('+v.esercizi.length+' esercizi)</option>';
    }).join('');
  }

  function riassuntoSedutaHtml(voce){
    if(!voce){
      return '<p class="roster-empty">Nessun allenamento '+fasciaLabelBreve(gruppoAttivo).toLowerCase()+' salvato in cronologia. Genera e salva un allenamento per questo gruppo dalla schermata principale per includerne qui il riassunto.</p>';
    }
    var d = new Date(voce.data);
    var dataStr = d.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric'});
    var righe = voce.esercizi.map(function(e, i){
      return '<li>'+(i+1)+'. '+e.nome+' <span class="riassunto-min">('+e.durataScelta+' min)</span></li>';
    }).join('');
    return '<div class="riassunto-seduta">'+
      '<p class="riassunto-meta">'+dataStr+' · '+fasciaLabel(voce.fascia)+' · '+voce.tempo+' min totali</p>'+
      '<ul class="riassunto-lista">'+righe+'</ul>'+
    '</div>';
  }

  function campoSedutaHtml(storicoFiltrato){
    return storicoFiltrato.length ?
      '<select id="sedutaScelta" class="seduta-select">'+opzioniSeduteHtml(storicoFiltrato)+'</select>'+
      '<div id="riassuntoBlocco">'+riassuntoSedutaHtml(storicoFiltrato[0])+'</div>'
      : riassuntoSedutaHtml(null);
  }

  function gruppoChipsHtml(){
    return BANDE.map(function(b){
      return '<button type="button" class="chip single feedback-gruppo-chip'+(b===gruppoAttivo?' active':'')+'" data-gruppo="'+b+'">'+fasciaLabelBreve(b)+'</button>';
    }).join('');
  }

  overlay.innerHTML =
    '<div class="modal-box feedback-box">'+
      '<h2>Feedback coach</h2>'+
      '<p class="feedback-hint">Compilalo quando preferisci: prima dell\'allenamento per segnare chi hai previsto, o subito dopo per registrare chi è venuto davvero e come è andata. Ogni feedback riguarda un solo gruppo: Pulcini e Aquilotti si allenano separatamente. Usa "Salva" per registrare le presenze in cronologia (necessarie per il report statistiche), oppure scarica/condividi anche il PDF.</p>'+
      '<div class="feedback-field">'+
        '<span class="field-label">Gruppo</span>'+
        '<div class="chip-row" id="feedbackGruppoRow">'+gruppoChipsHtml()+'</div>'+
      '</div>'+
      '<div class="feedback-field" id="seduteBlocco">'+
        '<span class="field-label">Allenamento collegato</span>'+
        '<p class="feedback-subtext" id="seduteHint"></p>'+
        '<div id="seduteContenuto">'+campoSedutaHtml(storicoDelGruppo())+'</div>'+
      '</div>'+
      '<div class="feedback-field">'+
        '<span class="field-label">Data allenamento</span>'+
        '<div class="feedback-date-row"><input type="date" id="feedbackData" value="'+oggi+'"></div>'+
      '</div>'+
      '<div class="feedback-field">'+
        '<span class="field-label" id="presenzeLabel">Presenze</span>'+
        '<div class="roster-add-row">'+
          '<input type="text" id="rosterNuovoNome" placeholder="Nome del bambino...">'+
          '<button class="icon-btn" id="rosterAggiungi" type="button">Aggiungi</button>'+
        '</div>'+
        '<div class="roster-list" id="rosterList">'+listaHtml()+'</div>'+
        '<p class="feedback-count" id="feedbackCount"></p>'+
      '</div>'+
      '<div class="feedback-field note-field">'+
        '<span class="field-label">Note dell\'allenamento (facoltative)</span>'+
        '<textarea id="feedbackNote" placeholder="Es. bambino nuovo, infortuni da tenere d\'occhio, cosa è andato bene o cosa migliorare..."></textarea>'+
      '</div>'+
      '<div class="feedback-btn-row">'+
        '<button class="btn-feedback-salva" id="btnSalvaFeedback" type="button">✓ Salva</button>'+
        '<button class="btn-feedback-save" id="btnScaricaFeedback" type="button">⬇ Scarica PDF</button>'+
        '<button class="btn-feedback-condividi" id="btnCondividiFeedbackModal" type="button">↗ Condividi PDF</button>'+
      '</div>'+
      '<div class="modal-close-row"><span></span><button class="icon-btn" id="feedbackChiudi" type="button">Chiudi</button></div>'+
    '</div>';

  document.body.appendChild(overlay);

  function aggiornaBloccoSedute(){
    var storicoFiltrato = storicoDelGruppo();
    overlay.querySelector('#seduteHint').textContent = storicoFiltrato.length ?
      'Scegli a quale allenamento salvato di '+fasciaLabelBreve(gruppoAttivo)+' si riferisce questo feedback.' :
      '';
    overlay.querySelector('#seduteContenuto').innerHTML = campoSedutaHtml(storicoFiltrato);
    wireSedutaSelect(storicoFiltrato);
  }

  function wireSedutaSelect(storicoFiltrato){
    var sel = overlay.querySelector('#sedutaScelta');
    if(!sel) return;
    sel.addEventListener('change', function(ev){
      var idx = parseInt(ev.target.value, 10);
      overlay.querySelector('#riassuntoBlocco').innerHTML = riassuntoSedutaHtml(storicoFiltrato[idx]);
    });
  }
  aggiornaBloccoSedute();

  function aggiornaContatore(){
    var righe = rosterDelGruppo();
    var presenti = 0;
    righe.forEach(function(item){ if(presenzeStato[item.idx] !== false) presenti++; });
    overlay.querySelector('#feedbackCount').textContent = righe.length ? (presenti+' su '+righe.length+' presenti') : '';
  }

  function renderRosterList(){
    overlay.querySelector('#rosterList').innerHTML = listaHtml();
    wireRosterEvents();
    aggiornaContatore();
  }

  function wireRosterEvents(){
    Array.prototype.forEach.call(overlay.querySelectorAll('.roster-del'), function(btn){
      btn.addEventListener('click', function(){
        var idx = parseInt(btn.getAttribute('data-idx'),10);
        roster.splice(idx,1);
        salvaRoster(roster);
        var nuovoStato = {};
        roster.forEach(function(voce, i){ nuovoStato[i] = true; });
        presenzeStato = nuovoStato;
        renderRosterList();
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.presence-btn'), function(btn){
      btn.addEventListener('click', function(){
        var idx = parseInt(btn.getAttribute('data-idx'),10);
        var val = btn.getAttribute('data-val') === '1';
        presenzeStato[idx] = val;
        var riga = btn.closest('.roster-row');
        riga.querySelector('.presence-yes').classList.toggle('active', val);
        riga.querySelector('.presence-no').classList.toggle('active', !val);
        aggiornaContatore();
      });
    });
  }
  wireRosterEvents();
  aggiornaContatore();

  overlay.querySelector('#rosterAggiungi').addEventListener('click', function(){
    var input = overlay.querySelector('#rosterNuovoNome');
    var nome = (input.value||'').trim();
    if(!nome) return;
    roster.push({nome:nome, gruppo:gruppoAttivo});
    salvaRoster(roster);
    presenzeStato[roster.length-1] = true;
    input.value = '';
    renderRosterList();
  });
  overlay.querySelector('#rosterNuovoNome').addEventListener('keydown', function(ev){
    if(ev.key === 'Enter'){ overlay.querySelector('#rosterAggiungi').click(); }
  });

  Array.prototype.forEach.call(overlay.querySelectorAll('.feedback-gruppo-chip'), function(chip){
    chip.addEventListener('click', function(){
      gruppoAttivo = chip.getAttribute('data-gruppo');
      Array.prototype.forEach.call(overlay.querySelectorAll('.feedback-gruppo-chip'), function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      renderRosterList();
      aggiornaBloccoSedute();
    });
  });

  overlay.querySelector('#feedbackChiudi').addEventListener('click', function(){
    if(overlay.parentNode) document.body.removeChild(overlay);
  });
  abilitaChiusuraClickEsterno(overlay);

  function raccogliEntryFeedback(){
    var dataInput = overlay.querySelector('#feedbackData').value;
    var dataIso = dataInput ? new Date(dataInput+'T12:00:00').toISOString() : new Date().toISOString();
    var righe = rosterDelGruppo();
    var presenze = righe.map(function(item){
      return { nome:item.voce.nome, presente: presenzeStato[item.idx] !== false };
    });
    var storicoFiltrato = storicoDelGruppo();
    var selectEl = overlay.querySelector('#sedutaScelta');
    var sedutaScelta = selectEl ? storicoFiltrato[parseInt(selectEl.value, 10)] : null;
    return {
      data: dataIso,
      gruppo: gruppoAttivo,
      presenze: presenze,
      note: (overlay.querySelector('#feedbackNote').value||'').trim(),
      seduta: sedutaScelta ? {
        data: sedutaScelta.data,
        fascia: sedutaScelta.fascia,
        tempo: sedutaScelta.tempo,
        esercizi: sedutaScelta.esercizi
      } : null
    };
  }

  overlay.querySelector('#btnSalvaFeedback').addEventListener('click', function(){
    var entry = raccogliEntryFeedback();
    salvaInFeedbackStorico(entry);
    showToast('Feedback salvato in cronologia');
    if(overlay.parentNode) document.body.removeChild(overlay);
  });

  overlay.querySelector('#btnScaricaFeedback').addEventListener('click', function(){
    var entry = raccogliEntryFeedback();
    salvaInFeedbackStorico(entry);
    scaricaFeedback(entry);
    if(overlay.parentNode) document.body.removeChild(overlay);
  });

  overlay.querySelector('#btnCondividiFeedbackModal').addEventListener('click', function(){
    var entry = raccogliEntryFeedback();
    salvaInFeedbackStorico(entry);
    condividiFeedback(entry);
    if(overlay.parentNode) document.body.removeChild(overlay);
  });
}

document.getElementById('btnFeedback').addEventListener('click', apriFeedback);

/* ============ MODALITÀ CAMPO ============ */

function apriModalitaCampo(seduta){
  if(!seduta || !seduta.length) return;
  var idx = 0;
  var remaining = seduta[0].durataScelta*60;
  var timerHandle = null;
  var running = false;

  var overlay = document.createElement('div');
  overlay.className = 'campo-overlay';
  document.body.appendChild(overlay);

  function fmt(s){
    var m = Math.floor(s/60), sec = s%60;
    return (m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }

  function render(){
    var ex = seduta[idx];
    overlay.innerHTML =
      '<div class="campo-top"><span>Esercizio '+(idx+1)+' di '+seduta.length+'</span><button class="icon-btn" id="campoChiudi" type="button">Chiudi ✕</button></div>'+
      '<div class="campo-body">'+
        '<div class="campo-fase">'+faseLabel(ex.fase)+'</div>'+
        '<div class="campo-nome">'+ex.nome+'</div>'+
        '<div class="campo-timer" id="campoTimer">'+fmt(remaining)+'</div>'+
        '<div class="campo-desc">'+ex.descrizione+'</div>'+
        '<div class="campo-controls">'+
          '<button class="icon-btn" id="campoPlayPause" type="button">'+(running?'Pausa':'Avvia')+'</button>'+
          '<button class="icon-btn" id="campoReset" type="button">Riavvia timer</button>'+
        '</div>'+
      '</div>'+
      '<div class="campo-bottom">'+
        '<button class="icon-btn" id="campoIndietro" type="button"'+(idx===0?' disabled':'')+'>← Precedente</button>'+
        '<button class="icon-btn" id="campoAvanti" type="button">'+(idx===seduta.length-1?'Fine':'Successivo →')+'</button>'+
      '</div>';

    document.getElementById('campoChiudi').addEventListener('click', chiudi);
    document.getElementById('campoPlayPause').addEventListener('click', togglePlay);
    document.getElementById('campoReset').addEventListener('click', function(){
      remaining = ex.durataScelta*60;
      aggiornaTimerDOM();
    });
    document.getElementById('campoIndietro').addEventListener('click', function(){ vai(idx-1); });
    document.getElementById('campoAvanti').addEventListener('click', function(){
      if(idx===seduta.length-1){ chiudi(); } else { vai(idx+1); }
    });
  }

  function aggiornaTimerDOM(){
    var el = document.getElementById('campoTimer');
    if(el) el.textContent = fmt(remaining);
  }

  function tick(){
    if(remaining>0){
      remaining--;
      aggiornaTimerDOM();
      if(remaining===0){ avvisaFine(); }
    }
  }

  function avvisaFine(){
    stop();
    try{
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
      var ctx = new (window.AudioContext||window.webkitAudioContext)();
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880;
      g.gain.value = 0.15;
      o.start();
      setTimeout(function(){ o.stop(); ctx.close(); }, 500);
    }catch(e){ /* audio non disponibile, nessun problema */ }
  }

  function togglePlay(){
    if(running){ stop(); } else { start(); }
  }
  function start(){
    if(timerHandle) return;
    running = true;
    timerHandle = setInterval(tick, 1000);
    var btn = document.getElementById('campoPlayPause');
    if(btn) btn.textContent = 'Pausa';
  }
  function stop(){
    if(timerHandle){ clearInterval(timerHandle); timerHandle = null; }
    running = false;
    var btn = document.getElementById('campoPlayPause');
    if(btn) btn.textContent = 'Avvia';
  }
  function vai(nuovoIdx){
    stop();
    idx = nuovoIdx;
    remaining = seduta[idx].durataScelta*60;
    render();
  }
  function chiudi(){
    stop();
    if(overlay.parentNode) document.body.removeChild(overlay);
  }

  render();
}

/* ============ VISTA DETTAGLI ALLENAMENTO (dalla cronologia) ============ */

function apriDettaglioSeduta(index){
  var storico = caricaStorico();
  var voce = storico[index];
  if(!voce){ showToast('Allenamento non trovato'); return; }

  var seduta = ricostruisciSedutaCompleta(voce);
  var d = new Date(voce.data);
  var dataStr = isNaN(d.getTime()) ? 'Data non disponibile'
    : d.toLocaleDateString('it-IT', {day:'2-digit',month:'long',year:'numeric'}) + ' · ' +
      d.toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'});
  var totale = (typeof voce.tempo === 'number' && voce.tempo > 0)
    ? voce.tempo
    : seduta.reduce(function(a,b){ return a + b.durataScelta; }, 0);
  var parziali = seduta.filter(function(e){ return e.completo === false; }).length;

  var overlay = document.createElement('div');
  overlay.className = 'dettaglio-overlay';
  overlay.id = 'modalDettaglioSeduta';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');

  var html = '<div class="dettaglio-box">';
  html += '<div class="dettaglio-head">';
  html += '<button class="dettaglio-chiudi" type="button" id="dettaglioIndietro" title="Torna alla cronologia" aria-label="Torna alla cronologia">←</button>';
  html += '<div style="flex:1;min-width:0"><h2>Dettaglio allenamento</h2>'+
          '<div class="dettaglio-sub">'+fasciaLabel(voce.fascia)+' · '+totale+' min · '+seduta.length+' esercizi</div></div>';
  html += '<button class="dettaglio-chiudi" type="button" id="dettaglioChiudi" title="Chiudi" aria-label="Chiudi dettaglio">✕</button>';
  html += '</div>';

  html += '<div class="dettaglio-body">';
  html += '<div class="dettaglio-stats">';
  html += '<div class="dettaglio-stat"><b>'+dataStr+'</b><span>data</span></div>';
  html += '<div class="dettaglio-stat"><b>'+fasciaLabel(voce.fascia)+'</b><span>fascia d\'età</span></div>';
  html += '<div class="dettaglio-stat"><b>'+totale+' min</b><span>durata totale</span></div>';
  html += '<div class="dettaglio-stat"><b>'+seduta.length+'</b><span>esercizi</span></div>';
  html += '</div>';

  if(parziali){
    html += '<div class="dettaglio-avviso">⚠️ '+parziali+(parziali===1?' esercizio non è più':' esercizi non sono più')+
            ' nel catalogo: vengono mostrati i dati salvati.</div>';
  }

  if(!seduta.length){
    html += '<p style="color:var(--slate-400);">Questo allenamento non contiene esercizi.</p>';
  }

  html += '<div class="exercise-list">';
  seduta.forEach(function(ex, i){
    var diagramFn = DIAGRAMS[ex.diagram];
    var diagramSvg = diagramFn ? diagramFn() : '';
    html += '<div class="ex-card" style="--fase-color:'+(FASE_COLOR[ex.fase]||'var(--orange-500)')+'">';
    html += '<div class="ex-head">';
    html += '<div class="ex-order">'+(i+1)+'</div>';
    html += '<div class="ex-head-text"><div class="ex-fase">'+faseLabel(ex.fase)+'</div><h3 class="ex-nome">'+ex.nome+'</h3></div>';
    html += '<div class="ex-duration">'+ex.durataScelta+' min</div>';
    html += '</div>';
    html += '<div class="ex-body">';
    if(diagramSvg) html += '<div class="ex-diagram">'+diagramSvg+'</div>';
    html += '<div class="ex-text">';
    if(ex.obiettivi && ex.obiettivi.length){
      html += '<div class="ex-tags">'+ex.obiettivi.map(function(o){return '<span class="tag-mini">'+o+'</span>';}).join('')+'</div>';
    }
    if(ex.descrizione) html += '<p>'+ex.descrizione+'</p>';
    if(ex.varianti && ex.varianti.length){
      html += '<details class="varianti"><summary>Varianti</summary><ul>' +
        ex.varianti.map(function(v){return '<li>'+v+'</li>';}).join('') + '</ul></details>';
    }
    if(ex.completo === false){
      html += '<div class="dettaglio-parziale">Dettagli parziali — esercizio non più nel catalogo</div>';
    }
    html += '</div></div></div>';
  });
  html += '</div>';

  html += '<div class="dettaglio-foot"><button class="icon-btn" type="button" id="dettaglioIndietroBasso">← Torna alla cronologia</button></div>';
  html += '</div></div>';

  overlay.innerHTML = html;

  function chiudiDettaglio(){
    if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.removeEventListener('keydown', onEsc);
  }
  function onEsc(ev){
    if(ev.key === 'Escape'){ ev.stopPropagation(); chiudiDettaglio(); }
  }

  overlay.addEventListener('click', function(ev){ if(ev.target === overlay) chiudiDettaglio(); });
  document.body.appendChild(overlay);
  overlay.querySelector('#dettaglioChiudi').addEventListener('click', chiudiDettaglio);
  overlay.querySelector('#dettaglioIndietro').addEventListener('click', chiudiDettaglio);
  overlay.querySelector('#dettaglioIndietroBasso').addEventListener('click', chiudiDettaglio);
  document.addEventListener('keydown', onEsc);
  overlay.querySelector('.dettaglio-body').scrollTop = 0;
}

/* ============ CRONOLOGIA ============ */

function apriCronologia(){
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  var tabAttiva = 'sedute';
  var filtroGruppo = 'tutti';

  function filtroChipsHtml(){
    var opzioni = [{v:'tutti', l:'Tutti'}].concat(BANDE.map(function(b){ return {v:b, l:fasciaLabelBreve(b)}; }));
    return opzioni.map(function(o){
      return '<button type="button" class="chip single cron-filtro-chip'+(filtroGruppo===o.v?' active':'')+'" data-gruppo="'+o.v+'">'+o.l+'</button>';
    }).join('');
  }

  function listaSeduteHtml(){
    var storico = caricaStorico();
    var filtrati = storico.map(function(v, idx){ return {v:v, idx:idx}; })
      .filter(function(item){ return filtroGruppo==='tutti' || item.v.fascia===filtroGruppo; });
    if(!filtrati.length) return '<p style="color:var(--slate-400);">Nessun allenamento salvato ancora per questo filtro. Genera un allenamento e premi "Salva in cronologia" in fondo alla pagina per vederlo qui.</p>';
    return filtrati.map(function(item){
      var v = item.v, idx = item.idx;
      var d = new Date(v.data);
      var dataStr = d.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' + d.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
      var nomi = v.esercizi.slice(0,3).map(function(e){ return e.nome; }).join(', ');
      return '<div class="storico-item storico-clickabile" data-dettaglio-idx="'+idx+'" role="button" tabindex="0" title="Apri i dettagli di questo allenamento">'+
        '<div class="storico-head"><div class="storico-head-info"><span>'+dataStr+'</span><span>'+fasciaLabel(v.fascia)+' · '+v.tempo+' min</span></div>'+
        '<button class="storico-del" type="button" data-tipo="seduta" data-idx="'+idx+'" title="Elimina questa voce">🗑</button></div>'+
        '<p>'+v.esercizi.length+' esercizi — '+nomi+(v.esercizi.length>3?'…':'')+'</p>'+
        '<div class="storico-actions">'+
          '<button class="icon-btn storico-dettagli" type="button" data-idx="'+idx+'">👁 Vedi dettagli</button>'+
          '<button class="icon-btn storico-pdf" type="button" data-idx="'+idx+'">Scarica PDF esercizi</button>'+
        '</div>'+
      '</div>';
    }).join('');
  }

  function listaFeedbackHtml(){
    var storico = caricaFeedbackStorico();
    var filtrati = storico.map(function(v, idx){ return {v:v, idx:idx}; })
      .filter(function(item){ return filtroGruppo==='tutti' || item.v.gruppo===filtroGruppo; });
    if(!filtrati.length) return '<p style="color:var(--slate-400);">Nessun feedback salvato ancora per questo filtro. I feedback vengono salvati dal pulsante "Salva" del modulo "Feedback coach" (o quando scarichi/condividi il PDF).</p>';
    return filtrati.map(function(item){
      var v = item.v, idx = item.idx;
      var d = new Date(v.data);
      var dataStr = d.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric'});
      var presenti = (v.presenze||[]).filter(function(p){ return p.presente; }).length;
      var gruppoStr = v.gruppo ? fasciaLabelBreve(v.gruppo) + ' · ' : '';
      return '<div class="storico-item">'+
        '<div class="storico-head"><div class="storico-head-info"><span>'+dataStr+'</span><span>'+gruppoStr+presenti+'/'+(v.presenze||[]).length+' presenti</span></div>'+
        '<button class="storico-del" type="button" data-tipo="feedback" data-idx="'+idx+'" title="Elimina questa voce">🗑</button></div>'+
        (v.note ? '<p class="storico-note">"'+v.note+'"</p>' : '<p>Nessun appunto.</p>') +
        '<div class="storico-actions"><button class="icon-btn storico-pdf-feedback" type="button" data-idx="'+idx+'">Scarica PDF feedback</button></div>'+
      '</div>';
    }).join('');
  }

  function render(){
    var corpo = tabAttiva === 'sedute' ? listaSeduteHtml() : listaFeedbackHtml();
    var testoCancella = tabAttiva === 'sedute' ? 'Cancella allenamenti' : 'Cancella feedback';
    overlay.innerHTML =
      '<div class="modal-box">'+
        '<h2>Cronologia</h2>'+
        '<div class="modal-tabs">'+
          '<button class="modal-tab'+(tabAttiva==='sedute'?' active':'')+'" type="button" data-tab="sedute">Allenamenti</button>'+
          '<button class="modal-tab'+(tabAttiva==='feedback'?' active':'')+'" type="button" data-tab="feedback">Feedback</button>'+
        '</div>'+
        '<div class="chip-row cron-filtro-row">'+filtroChipsHtml()+'</div>'+
        '<div id="cronCorpo">'+corpo+'</div>'+
        '<div class="modal-close-row">'+
          '<button class="icon-btn" id="cronCancella" type="button">'+testoCancella+'</button>'+
          '<button class="icon-btn" id="cronChiudi" type="button">Chiudi</button>'+
        '</div>'+
      '</div>';
    wireEvents();
  }

  function wireEvents(){
    Array.prototype.forEach.call(overlay.querySelectorAll('.modal-tab'), function(btn){
      btn.addEventListener('click', function(){
        tabAttiva = btn.getAttribute('data-tab');
        render();
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.cron-filtro-chip'), function(btn){
      btn.addEventListener('click', function(){
        filtroGruppo = btn.getAttribute('data-gruppo');
        render();
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.storico-del'), function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        var idx = parseInt(btn.getAttribute('data-idx'),10);
        var tipo = btn.getAttribute('data-tipo');
        if(tipo === 'seduta') eliminaVoceStorico(idx); else eliminaVoceFeedback(idx);
        showToast('Voce eliminata');
        render();
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.storico-pdf'), function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        var idx = parseInt(btn.getAttribute('data-idx'),10);
        scaricaPDFDaStorico(idx);
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.storico-dettagli'), function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        apriDettaglioSeduta(parseInt(btn.getAttribute('data-idx'),10));
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('[data-dettaglio-idx]'), function(item){
      item.addEventListener('click', function(){
        apriDettaglioSeduta(parseInt(item.getAttribute('data-dettaglio-idx'),10));
      });
      item.addEventListener('keydown', function(ev){
        if(ev.key === 'Enter' || ev.key === ' '){
          ev.preventDefault();
          apriDettaglioSeduta(parseInt(item.getAttribute('data-dettaglio-idx'),10));
        }
      });
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.storico-pdf-feedback'), function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        var idx = parseInt(btn.getAttribute('data-idx'),10);
        var storico = caricaFeedbackStorico();
        var entry = storico[idx];
        if(!entry){ showToast('Feedback non trovato'); return; }
        scaricaFeedback(entry);
      });
    });
    overlay.querySelector('#cronChiudi').addEventListener('click', function(){
      if(overlay.parentNode) document.body.removeChild(overlay);
    });
    overlay.querySelector('#cronCancella').addEventListener('click', function(){
      var msg = tabAttiva === 'sedute' ? 'Cancellare tutti gli allenamenti salvati su questo dispositivo?' : 'Cancellare tutti i feedback salvati su questo dispositivo?';
      apriConferma(msg, function(ok){
        if(!ok) return;
        if(tabAttiva === 'sedute') cancellaStorico(); else cancellaFeedbackStorico();
        showToast('Cronologia cancellata');
        render();
      });
    });
  }

  document.body.appendChild(overlay);
  render();
  abilitaChiusuraClickEsterno(overlay);
}

document.getElementById('btnCronologia').addEventListener('click', apriCronologia);

/* ============ MODALE REPORT STATISTICHE ============ */

function apriReport(){
  chiudiModaliAperte();

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  var gruppoAttivo = 'tutti';

  var storicoTutto = caricaStorico();
  var feedbackTutto = caricaFeedbackStorico();

  function isoData(d){ return d.toISOString().slice(0,10); }

  var tutteLeDate = storicoTutto.map(function(v){ return new Date(v.data); })
    .concat(feedbackTutto.map(function(v){ return new Date(v.data); }))
    .filter(function(d){ return !isNaN(d.getTime()); });
  var oggi = new Date();
  var dataMinDefault = tutteLeDate.length ?
    new Date(Math.min.apply(null, tutteLeDate.map(function(d){ return d.getTime(); }))) :
    new Date(oggi.getTime() - 30*24*3600*1000);

  function chipsGruppoHtml(){
    var opzioni = [{v:'tutti', l:'Tutti'}].concat(BANDE.map(function(b){ return {v:b, l:fasciaLabelBreve(b)}; }));
    return opzioni.map(function(o){
      return '<button type="button" class="chip single report-gruppo-chip'+(gruppoAttivo===o.v?' active':'')+'" data-gruppo="'+o.v+'">'+o.l+'</button>';
    }).join('');
  }

  overlay.innerHTML =
    '<div class="modal-box feedback-box">'+
      '<h2>Report statistiche</h2>'+
      '<p class="feedback-hint">Crea un PDF con i grafici degli esercizi più svolti e delle presenze/assenze, calcolati sulla cronologia allenamenti e feedback salvata su questo dispositivo. Scegli il periodo e il gruppo, poi scarica o condividi il PDF.</p>'+
      '<div class="feedback-field">'+
        '<span class="field-label">Gruppo</span>'+
        '<div class="chip-row" id="reportGruppoRow">'+chipsGruppoHtml()+'</div>'+
      '</div>'+
      '<div class="feedback-field">'+
        '<span class="field-label">Periodo</span>'+
        '<div class="report-date-row">'+
          '<label class="report-date-label">Da<input type="date" id="reportDa" value="'+isoData(dataMinDefault)+'"></label>'+
          '<label class="report-date-label">A<input type="date" id="reportA" value="'+isoData(oggi)+'"></label>'+
        '</div>'+
      '</div>'+
      '<p class="feedback-subtext" id="reportRiepilogo"></p>'+
      '<div class="feedback-btn-row">'+
        '<button class="btn-feedback-save" id="btnGeneraReport" type="button">⬇ Scarica PDF</button>'+
        '<button class="btn-feedback-condividi" id="btnCondividiReport" type="button">↗ Condividi PDF</button>'+
      '</div>'+
      '<div class="modal-close-row"><span></span><button class="icon-btn" id="reportChiudi" type="button">Chiudi</button></div>'+
    '</div>';

  document.body.appendChild(overlay);

  function parseDataCampo(id, fineGiornata){
    var val = overlay.querySelector('#'+id).value;
    if(!val) return null;
    return new Date(val + (fineGiornata ? 'T23:59:59' : 'T00:00:00'));
  }

  function datiFiltrati(){
    var da = parseDataCampo('reportDa', false);
    var a = parseDataCampo('reportA', true);
    var storicoF = storicoTutto.filter(function(v){
      if(gruppoAttivo!=='tutti' && v.fascia!==gruppoAttivo) return false;
      var d = new Date(v.data);
      if(da && d < da) return false;
      if(a && d > a) return false;
      return true;
    });
    var feedbackF = feedbackTutto.filter(function(v){
      if(gruppoAttivo!=='tutti' && v.gruppo!==gruppoAttivo) return false;
      var d = new Date(v.data);
      if(da && d < da) return false;
      if(a && d > a) return false;
      return true;
    });
    return {storico:storicoF, feedback:feedbackF, da:da, a:a};
  }

  function aggiornaRiepilogo(){
    var dati = datiFiltrati();
    overlay.querySelector('#reportRiepilogo').textContent =
      dati.storico.length+' allenamenti salvati e '+dati.feedback.length+' feedback compilati nel periodo e gruppo selezionati.';
  }
  aggiornaRiepilogo();

  Array.prototype.forEach.call(overlay.querySelectorAll('.report-gruppo-chip'), function(chip){
    chip.addEventListener('click', function(){
      gruppoAttivo = chip.getAttribute('data-gruppo');
      Array.prototype.forEach.call(overlay.querySelectorAll('.report-gruppo-chip'), function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      aggiornaRiepilogo();
    });
  });

  overlay.querySelector('#reportDa').addEventListener('change', aggiornaRiepilogo);
  overlay.querySelector('#reportA').addEventListener('change', aggiornaRiepilogo);

  overlay.querySelector('#reportChiudi').addEventListener('click', function(){
    if(overlay.parentNode) document.body.removeChild(overlay);
  });
  abilitaChiusuraClickEsterno(overlay);

  overlay.querySelector('#btnGeneraReport').addEventListener('click', function(){
    var dati = datiFiltrati();
    if(!dati.storico.length && !dati.feedback.length){
      showToast('Nessun dato nel periodo e gruppo selezionati');
      return;
    }
    scaricaReport(dati, gruppoAttivo);
    if(overlay.parentNode) document.body.removeChild(overlay);
  });

  overlay.querySelector('#btnCondividiReport').addEventListener('click', function(){
    var dati = datiFiltrati();
    if(!dati.storico.length && !dati.feedback.length){
      showToast('Nessun dato nel periodo e gruppo selezionati');
      return;
    }
    condividiReport(dati, gruppoAttivo);
    if(overlay.parentNode) document.body.removeChild(overlay);
  });
}

document.getElementById('btnReport').addEventListener('click', apriReport);

/* ============ AVVIO ============ */

document.getElementById('btnGenera').addEventListener('click', function(){
  state.seduta = generaSeduta();
  renderSeduta(state.seduta);
});

