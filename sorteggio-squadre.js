/* ============================================================
   SORTEGGIO SQUADRE & RUOTA DELLE SFIDE
   Modulo autonomo per il planner allenamenti (nome coach/app in config.js)

   Due cose che ogni coach fa a mano ogni allenamento, qui in un
   tap:
   1) SORTEGGIO SQUADRE — scegli il gruppo (Pulcini o Aquilotti, si
      allenano separati), spunta chi c'è oggi (parte già dall'elenco
      iscritti, che qui puoi anche modificare al volo: aggiungi un
      nome nuovo o togli chi si è ritirato, le modifiche restano
      salvate anche fuori da questo modulo), scegli in quante squadre
      dividerli, tocca "Sorteggia!" e parte un'animazione a
      slot-machine con tanto di coriandoli; escono squadre colorate
      con mascotte e nome (Squali, Leoni, Draghi...), bilanciate per
      numero.
   2) RUOTA DELLE SFIDE PER LA PARTITELLA — una ruota colorata (una
      fetta per fondamentale: passaggio, palleggio, tiro, difesa,
      gioco di squadra) che gira e assegna una regola speciale da
      applicare durante la partitella finale: vincoli didattici che
      obbligano tutti i bambini a esercitare un fondamentale preciso
      mentre giocano la partita vera, non premi casuali.

   Nessun dato lascia il dispositivo: la lista presenti si basa
   sull'elenco iscritti già salvato dall'app principale (lo stesso
   usato da "Feedback coach"), non serve reinserirla.

   Basta includere questo file con:
     <script src="sorteggio-squadre.js"></script>
   Si inietta da solo lo stile e il pulsante "Sorteggia squadre"
   nell'header.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     STILE
     --------------------------------------------------------- */
  var styleTag = document.createElement('style');
  styleTag.setAttribute('data-modulo', 'sorteggio-squadre');
  styleTag.textContent = `
.sq-box{max-width:560px;width:100%;}
.sq-tabs{display:flex;gap:6px;margin-bottom:14px;}
.sq-tab{flex:1;background:var(--navy-800);border:1px solid var(--navy-600);border-radius:10px;
  padding:9px 8px;font-family:'Work Sans',sans-serif;font-size:12.5px;font-weight:600;
  color:var(--slate-300);cursor:pointer;text-align:center;}
.sq-tab.active{background:var(--orange-500);border-color:var(--orange-500);color:var(--navy-900);}
.sq-panel{display:none;}
.sq-panel.active{display:block;}

.sq-roster{max-height:220px;overflow-y:auto;-webkit-overflow-scrolling:touch;
  border:1px solid var(--navy-700);border-radius:10px;padding:8px;margin:6px 0 4px;background:var(--navy-800);}
.sq-roster-riga{display:flex;align-items:center;gap:9px;padding:7px 4px;font-size:13.5px;color:var(--cream-100);
  border-bottom:1px solid var(--navy-700);}
.sq-roster-riga:last-child{border-bottom:none;}
.sq-roster-riga input[type=checkbox]{width:18px;height:18px;flex:none;accent-color:var(--orange-500);}
.sq-roster-riga label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;}
.sq-roster-riga span.sq-gruppo-tag{flex:none;font-size:10.5px;color:var(--slate-400);
  background:var(--navy-700);border-radius:999px;padding:2px 8px;}
.sq-roster-del{flex:none;width:24px;height:24px;border-radius:50%;border:1px solid var(--navy-600);
  background:var(--navy-900);color:var(--slate-400);font-size:12px;line-height:1;cursor:pointer;
  display:flex;align-items:center;justify-content:center;padding:0;}
.sq-roster-del:hover{color:var(--red-400);border-color:var(--red-400);}
.sq-roster-empty{padding:14px;text-align:center;color:var(--slate-400);font-size:12.5px;}
.sq-roster-add-row{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0 10px;align-items:center;}
.sq-roster-add-row input[type=text]{flex:1 1 150px;min-width:0;background:var(--navy-800);
  border:1px solid var(--navy-600);border-radius:10px;padding:9px 11px;font-size:13.5px;
  color:var(--cream-100);font-family:'Work Sans',sans-serif;}
.sq-roster-add-row input[type=text]::placeholder{color:var(--slate-400);}
.sq-roster-add-row .icon-btn{flex:none;}
.sq-quick-row{display:flex;gap:7px;margin:8px 0 14px;flex-wrap:wrap;}
.sq-quick-row .icon-btn{font-size:12px;padding:7px 11px;}

.sq-num-row{display:flex;align-items:center;gap:14px;margin:6px 0 16px;}
.sq-num-btn{width:38px;height:38px;border-radius:50%;border:1px solid var(--navy-600);background:var(--navy-800);
  color:var(--cream-100);font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;}
.sq-num-btn:active{transform:scale(0.93);}
.sq-num-val{font-family:'Sora',sans-serif;font-size:22px;color:var(--cream-100);min-width:96px;text-align:center;}
.sq-num-val span{display:block;font-family:'Work Sans',sans-serif;font-size:11px;color:var(--slate-400);font-weight:400;margin-top:1px;}

.sq-count-hint{font-size:12px;color:var(--slate-400);margin:-8px 0 14px;}
.sq-count-hint b{color:var(--orange-400);}

.sq-stage{position:relative;min-height:120px;display:flex;align-items:center;justify-content:center;
  border-radius:10px;background:var(--navy-800);border:1px solid var(--navy-700);margin:6px 0 16px;
  overflow:hidden;padding:14px;}
.sq-slot{font-family:'Sora',sans-serif;font-size:17px;color:var(--orange-300);text-align:center;
  letter-spacing:.02em;}
.sq-slot .sq-slot-emoji{font-size:30px;display:block;margin-bottom:4px;}

.sq-teams{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:4px 0 16px;}
.sq-team-card{border-radius:10px;padding:12px;background:var(--navy-800);
  border:1.5px solid var(--sq-colore,var(--orange-400));animation:sqPop .38s ease both;}
.sq-team-head{display:flex;align-items:center;gap:7px;margin-bottom:8px;}
.sq-team-emoji{font-size:22px;}
.sq-team-nome{font-family:'Sora',sans-serif;font-size:14.5px;color:var(--sq-colore,var(--orange-400));font-weight:700;}
.sq-team-count{margin-left:auto;font-size:11px;color:var(--slate-400);}
.sq-team-list{list-style:none;padding:0;margin:0;font-size:12.5px;color:var(--cream-100);line-height:1.9;}
.sq-team-list li{border-bottom:1px dashed var(--navy-700);padding-bottom:2px;}
.sq-team-list li:last-child{border-bottom:none;}

@keyframes sqPop{from{opacity:0;transform:translateY(8px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes sqShake{0%,100%{transform:rotate(0deg);}20%{transform:rotate(-4deg);}40%{transform:rotate(4deg);}
  60%{transform:rotate(-3deg);}80%{transform:rotate(3deg);}}
.sq-shaking{animation:sqShake .25s ease-in-out infinite;}

.sq-confetti-layer{position:fixed;inset:0;pointer-events:none;z-index:500;overflow:hidden;}
.sq-confetto{position:absolute;top:-24px;font-size:18px;will-change:transform,opacity;
  animation-name:sqFall;animation-timing-function:linear;animation-fill-mode:forwards;}
@keyframes sqFall{
  0%{transform:translateY(0) rotate(0deg);opacity:1;}
  100%{transform:translateY(105vh) rotate(420deg);opacity:.9;}
}

.sq-wheel-wrap{position:relative;width:240px;height:240px;margin:6px auto 18px;}
.sq-wheel-pointer{position:absolute;top:-6px;left:50%;transform:translateX(-50%);font-size:26px;z-index:2;
  filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));transform-origin:50% 10%;}
.sq-music-btn{position:absolute;top:0;right:0;z-index:3;width:34px;height:34px;border-radius:50%;
  background:var(--navy-900);border:1px solid var(--navy-600);color:var(--cream-100);font-size:15px;
  display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;}
.sq-music-btn:active{transform:scale(0.93);}
.sq-wheel-svg{width:100%;height:100%;display:block;border-radius:50%;
  transition:transform 6.8s cubic-bezier(.1,.82,.08,1);
  filter:drop-shadow(0 4px 10px rgba(0,0,0,.35));}
.sq-wheel-wrap.sq-girando .sq-wheel-svg{animation:sqWheelGlow 1.1s ease-in-out infinite;}
.sq-wheel-wrap.sq-girando .sq-wheel-pointer{animation:sqPointerTic .16s linear infinite;}
.sq-wheel-wrap.sq-girando .sq-wheel-center{animation:sqHubPulse .7s ease-in-out infinite;}
@keyframes sqWheelGlow{
  0%,100%{filter:drop-shadow(0 4px 10px rgba(0,0,0,.35)) drop-shadow(0 0 6px var(--orange-400));}
  50%{filter:drop-shadow(0 4px 14px rgba(0,0,0,.4)) drop-shadow(0 0 20px var(--orange-400));}
}
@keyframes sqPointerTic{
  0%,100%{transform:translateX(-50%) rotate(0deg);}
  50%{transform:translateX(-50%) rotate(-14deg);}
}
@keyframes sqHubPulse{
  0%,100%{transform:translate(-50%,-50%) scale(1);box-shadow:0 0 0 0 rgba(201,150,46,.55);}
  50%{transform:translate(-50%,-50%) scale(1.12);box-shadow:0 0 0 8px rgba(201,150,46,0);}
}
.sq-wheel-wrap.sq-vinto .sq-wheel-svg{animation:sqWheelVinto .55s ease both;}
@keyframes sqWheelVinto{
  0%{filter:drop-shadow(0 4px 10px rgba(0,0,0,.35));}
  35%{transform:scale(1.06);filter:drop-shadow(0 4px 10px rgba(0,0,0,.35)) drop-shadow(0 0 24px var(--orange-400));}
  100%{transform:scale(1);filter:drop-shadow(0 4px 10px rgba(0,0,0,.35));}
}
.sq-wheel-result-flash{position:relative;}
.sq-wheel-result-flash::before{content:'';position:absolute;inset:-2px;border-radius:12px;
  background:radial-gradient(circle,var(--orange-400) 0%,transparent 70%);opacity:.5;
  animation:sqResultFlash .6s ease-out forwards;pointer-events:none;}
@keyframes sqResultFlash{from{opacity:.55;transform:scale(.9);}to{opacity:0;transform:scale(1.25);}}
.sq-wheel-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:34px;height:34px;
  border-radius:50%;background:var(--navy-900);border:2px solid var(--orange-400);z-index:2;}
.sq-wheel-result{min-height:64px;border-radius:10px;background:var(--navy-800);border:1px solid var(--navy-700);
  padding:14px;text-align:center;font-size:14.5px;color:var(--cream-100);margin-bottom:14px;
  display:flex;align-items:center;justify-content:center;overflow:hidden;}
.sq-wheel-result.sq-empty{color:var(--slate-400);font-style:italic;font-size:13px;}
.sq-wheel-suspense{font-family:'Sora',sans-serif;font-size:15px;color:var(--orange-300);letter-spacing:.02em;}
.sq-result-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.02em;
  color:var(--sq-colore,var(--orange-400));background:var(--navy-900);border:1px solid var(--sq-colore,var(--orange-400));
  border-radius:999px;padding:3px 10px;margin-bottom:8px;}
.sq-result-testo{margin:0;font-size:14.5px;line-height:1.45;color:var(--cream-100);}
.sq-wheel-legend{display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;margin:2px 0 4px;}
.sq-legend-voce{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:var(--slate-300);}
.sq-legend-dot{width:8px;height:8px;border-radius:50%;display:inline-block;}
.sq-wheel-btn-row{display:flex;gap:9px;}
.sq-wheel-btn-row .btn-generate{flex:1;margin-top:0;}
`;
  document.head.appendChild(styleTag);

  /* ---------------------------------------------------------
     DATI: mascotte squadre + sfide bonus
     --------------------------------------------------------- */
  var MASCOTTE = [
    { nome: 'Squali', emoji: '🦈', colore: 'var(--teal-400)' },
    { nome: 'Leoni', emoji: '🦁', colore: 'var(--orange-400)' },
    { nome: 'Draghi', emoji: '🐉', colore: 'var(--green-500)' },
    { nome: 'Lupi', emoji: '🐺', colore: 'var(--slate-300)' },
    { nome: 'Falchi', emoji: '🦅', colore: 'var(--purple-400)' },
    { nome: 'Tigri', emoji: '🐯', colore: 'var(--red-400)' }
  ];

  var OBIETTIVO_INFO = {
    passaggio:  { emoji: '🤝', colore: 'var(--teal-400)' },
    palleggio:  { emoji: '🏀', colore: 'var(--purple-400)' },
    tiro:       { emoji: '🎯', colore: 'var(--orange-400)' },
    difesa:     { emoji: '🛡️', colore: 'var(--red-400)' },
    squadra:    { emoji: '🤾', colore: 'var(--green-500)' }
  };

  // Regole speciali da applicare durante la PARTITELLA FINALE: non sono
  // "premi" a caso, ma vincoli didattici che obbligano tutti i bambini a
  // esercitare un fondamentale preciso mentre giocano la partita vera.
  var SFIDE = [
    { obiettivo: 'passaggio', testo: 'Ogni canestro deve essere preceduto da almeno 2 passaggi tra compagni diversi.' },
    { obiettivo: 'passaggio', testo: 'Si può iniziare un\'azione solo con un passaggio: vietato partire palleggiando.' },
    { obiettivo: 'palleggio', testo: 'Il primo tiro di ogni azione va tentato dopo un palleggio con la mano debole.' },
    { obiettivo: 'palleggio', testo: 'Non si possono fare più di 3 palleggi di fila prima di passare o tirare.' },
    { obiettivo: 'tiro', testo: 'I canestri segnati da fuori area valgono doppio: incoraggia i tiri da lontano.' },
    { obiettivo: 'tiro', testo: 'Il canestro vicino vale solo se realizzato con un terzo tempo corretto.' },
    { obiettivo: 'difesa', testo: 'Difesa a uomo obbligatoria: ogni difensore segue sempre lo stesso avversario.' },
    { obiettivo: 'difesa', testo: 'Cambio di marcatura ogni 2 minuti: ogni difensore marca un avversario diverso.' },
    { obiettivo: 'squadra', testo: 'Ogni giocatore della squadra deve toccare la palla prima che si possa tirare.' },
    { obiettivo: 'squadra', testo: 'Chi ruba o recupera la palla deve passarla a un compagno prima di attaccare.' },
    { obiettivo: 'squadra', testo: 'A ogni canestro segnato, la squadra cambia subito il giocatore che porta palla.' },
    { obiettivo: 'passaggio', testo: 'Vietato passare due volte di fila allo stesso compagno: la palla deve girare.' }
  ];

  var CHIAVE_SFIDE_USATE = 'gavinoSorteggioSfideUsate';
  var CHIAVE_MUSICA_MUTA = 'gavinoSorteggioMusicaMuta';

  /* ---------------------------------------------------------
     MUSICA RUOTA — parte in loop quando si apre "Ruota delle
     sfide", si ferma quando si cambia tab o si chiude il modale.
     --------------------------------------------------------- */
  var MUSICA_SRC = 'San_Marco.mp3';
  var audioRuota = null;
  var musicaMutata = caricaPreferenzaMuta();

  function caricaPreferenzaMuta() {
    try { return localStorage.getItem(CHIAVE_MUSICA_MUTA) === '1'; }
    catch (e) { return false; }
  }

  function salvaPreferenzaMuta(v) {
    try { localStorage.setItem(CHIAVE_MUSICA_MUTA, v ? '1' : '0'); }
    catch (e) {}
  }

  function getAudioRuota() {
    if (!audioRuota) {
      audioRuota = new Audio(MUSICA_SRC);
      audioRuota.loop = true;
      audioRuota.volume = 0.55;
      audioRuota.addEventListener('error', function () {
        var codice = audioRuota.error ? audioRuota.error.code : '?';
        console.error('[sorteggio-squadre] Impossibile caricare "' + MUSICA_SRC + '" (codice errore ' + codice + '). Controlla che il file mp3 sia nella stessa cartella di index.html e che il nome corrisponda esattamente.');
      });
    }
    return audioRuota;
  }

  function avviaMusicaRuota() {
    var audio = getAudioRuota();
    audio.muted = musicaMutata;
    var promessa = audio.play();
    if (promessa && typeof promessa.catch === 'function') {
      promessa.catch(function (err) {
        console.warn('[sorteggio-squadre] audio.play() bloccato:', err && err.name, err && err.message);
        avvisaToast('Tocca 🔊 per avviare la musica della ruota');
      });
    }
  }

  function fermaMusicaRuota() {
    if (!audioRuota) return;
    audioRuota.pause();
    audioRuota.currentTime = 0;
  }

  function aggiornaBottoneMusica(pannello) {
    var btn = pannello.querySelector('#sqMusicToggle');
    if (!btn) return;
    btn.textContent = musicaMutata ? '🔇' : '🔊';
    btn.setAttribute('aria-label', musicaMutata ? 'Riattiva musica' : 'Disattiva musica');
    btn.title = musicaMutata ? 'Riattiva musica' : 'Disattiva musica';
  }

  /* ---------------------------------------------------------
     UTILI
     --------------------------------------------------------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function rosterDisponibile() {
    try { return (typeof caricaRoster === 'function') ? caricaRoster() : []; }
    catch (e) { return []; }
  }

  function bandeDisponibili() {
    try { if (typeof BANDE !== 'undefined' && BANDE.length) return BANDE.slice(); } catch (e) {}
    return ['pulcini', 'aquilotti'];
  }

  function fasciaIniziale() {
    try { if (typeof state !== 'undefined' && state.fascia) return state.fascia; } catch (e) {}
    return 'aquilotti';
  }

  function rosterDelGruppoSquadre() {
    var roster = rosterDisponibile();
    return roster.filter(function (r) { return r.gruppo === gruppoAttivoSquadre; });
  }

  function etichettaGruppo(g) {
    try { return (typeof fasciaLabelBreve === 'function') ? fasciaLabelBreve(g) : g; }
    catch (e) { return g; }
  }

  function avvisaToast(msg) {
    try { if (typeof showToast === 'function') { showToast(msg); return; } } catch (e) {}
  }

  function lancioConfetti() {
    var layer = document.createElement('div');
    layer.className = 'sq-confetti-layer';
    document.body.appendChild(layer);
    var emoji = ['🎉', '🏀', '⭐', '🎊', '🟢', '🟠'];
    var n = 34;
    for (var i = 0; i < n; i++) {
      var pezzo = document.createElement('span');
      pezzo.className = 'sq-confetto';
      pezzo.textContent = emoji[Math.floor(Math.random() * emoji.length)];
      var left = Math.random() * 100;
      var durata = 1.6 + Math.random() * 1.3;
      var ritardo = Math.random() * 0.4;
      pezzo.style.left = left + 'vw';
      pezzo.style.animationDuration = durata + 's';
      pezzo.style.animationDelay = ritardo + 's';
      pezzo.style.fontSize = (14 + Math.random() * 12) + 'px';
      layer.appendChild(pezzo);
    }
    setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 3400);
  }

  /* ---------------------------------------------------------
     MODALE PRINCIPALE
     --------------------------------------------------------- */
  var tabAttivo = 'squadre';
  var selezionati = {};   // nome -> true/false
  var numSquadre = 2;
  var gruppoAttivoSquadre = null; // 'pulcini' | 'aquilotti', impostato alla prima apertura
  var squadreCorrenti = null;
  var sfideDisponibili = null; // pool corrente, si esaurisce prima di ripetersi

  function apriSorteggio() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modalSorteggio';

    overlay.innerHTML =
      '<div class="modal-box sq-box">' +
        '<h2>🎲 Sorteggio & ruota delle sfide</h2>' +
        '<div class="sq-tabs">' +
          '<button type="button" class="sq-tab" data-tab="squadre">Sorteggia squadre</button>' +
          '<button type="button" class="sq-tab" data-tab="ruota">Ruota delle sfide</button>' +
        '</div>' +
        '<div class="sq-panel" data-panel="squadre"></div>' +
        '<div class="sq-panel" data-panel="ruota"></div>' +
        '<div class="modal-close-row"><span></span><button class="icon-btn" id="sqChiudi" type="button">Chiudi</button></div>' +
      '</div>';

    document.body.appendChild(overlay);
    abilitaChiusuraSicura(overlay);

    Array.prototype.forEach.call(overlay.querySelectorAll('.sq-tab'), function (tab) {
      tab.addEventListener('click', function () {
        tabAttivo = tab.getAttribute('data-tab');
        aggiornaTabs(overlay);
        if (tabAttivo === 'ruota') avviaMusicaRuota(); else fermaMusicaRuota();
      });
    });

    overlay.querySelector('#sqChiudi').addEventListener('click', function () {
      chiudiOverlay(overlay);
    });

    renderPannelloSquadre(overlay);
    renderPannelloRuota(overlay);
    aggiornaTabs(overlay);
    if (tabAttivo === 'ruota') avviaMusicaRuota();
  }

  function abilitaChiusuraSicura(overlay) {
    try {
      if (typeof abilitaChiusuraClickEsterno === 'function') { abilitaChiusuraClickEsterno(overlay); return; }
    } catch (e) {}
    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) chiudiOverlay(overlay); });
  }

  function chiudiOverlay(overlay) {
    fermaMusicaRuota();
    if (overlay.parentNode) document.body.removeChild(overlay);
  }

  function aggiornaTabs(overlay) {
    Array.prototype.forEach.call(overlay.querySelectorAll('.sq-tab'), function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabAttivo);
    });
    Array.prototype.forEach.call(overlay.querySelectorAll('.sq-panel'), function (p) {
      p.classList.toggle('active', p.getAttribute('data-panel') === tabAttivo);
    });
  }

  /* ---------------------------------------------------------
     PANNELLO 1 — SORTEGGIO SQUADRE
     --------------------------------------------------------- */
  function renderPannelloSquadre(overlay) {
    var pannello = overlay.querySelector('[data-panel="squadre"]');
    if (!gruppoAttivoSquadre) gruppoAttivoSquadre = fasciaIniziale();

    var chipsGruppo = bandeDisponibili().map(function (b) {
      return '<button type="button" class="chip single sq-gruppo-chip' + (b === gruppoAttivoSquadre ? ' active' : '') + '" data-gruppo="' + b + '">' + etichettaGruppo(b) + '</button>';
    }).join('');

    pannello.innerHTML =
      '<p class="feedback-hint">Pulcini e Aquilotti si allenano separati: scegli il gruppo, spunta chi c\'è oggi, aggiungi o togli qualcuno se la rosa è cambiata durante la stagione, poi tocca "Sorteggia!".</p>' +
      '<span class="field-label">Gruppo</span>' +
      '<div class="chip-row" id="sqGruppoRow">' + chipsGruppo + '</div>' +
      '<span class="field-label">Presenti oggi</span>' +
      '<div class="sq-roster-add-row">' +
        '<input type="text" id="sqNuovoNome" placeholder="Nome del nuovo iscritto...">' +
        '<button class="icon-btn" id="sqAggiungiNome" type="button">Aggiungi</button>' +
      '</div>' +
      '<div class="sq-roster" id="sqRoster"></div>' +
      '<div class="sq-quick-row">' +
        '<button class="icon-btn" id="sqTuttiOn" type="button">Seleziona tutti</button>' +
        '<button class="icon-btn" id="sqTuttiOff" type="button">Deseleziona tutti</button>' +
      '</div>' +
      '<span class="field-label">In quante squadre?</span>' +
      '<div class="sq-num-row">' +
        '<button class="sq-num-btn" id="sqNumMeno" type="button" aria-label="Meno squadre">–</button>' +
        '<div class="sq-num-val" id="sqNumVal">' + numSquadre + '<span>squadre</span></div>' +
        '<button class="sq-num-btn" id="sqNumPiu" type="button" aria-label="Più squadre">+</button>' +
      '</div>' +
      '<p class="sq-count-hint" id="sqCountHint"></p>' +
      '<div class="sq-stage" id="sqStage"><div class="sq-slot">🏀<span class="sq-slot-emoji"></span>Pronti a sorteggiare</div></div>' +
      '<button class="btn-generate" id="sqBtnSorteggia" type="button">Sorteggia!</button>' +
      '<div class="sq-teams" id="sqTeams"></div>';

    renderRosterListaSquadre(pannello);

    Array.prototype.forEach.call(pannello.querySelectorAll('.sq-gruppo-chip'), function (chip) {
      chip.addEventListener('click', function () {
        gruppoAttivoSquadre = chip.getAttribute('data-gruppo');
        Array.prototype.forEach.call(pannello.querySelectorAll('.sq-gruppo-chip'), function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        pannello.querySelector('#sqTeams').innerHTML = '';
        var stage = pannello.querySelector('#sqStage');
        stage.querySelector('.sq-slot').innerHTML = '🏀<span class="sq-slot-emoji"></span>Pronti a sorteggiare';
        var btn = pannello.querySelector('#sqBtnSorteggia');
        btn.disabled = false;
        btn.textContent = 'Sorteggia!';
        renderRosterListaSquadre(pannello);
      });
    });

    pannello.querySelector('#sqAggiungiNome').addEventListener('click', function () {
      aggiungiIscrittoSquadre(pannello);
    });
    pannello.querySelector('#sqNuovoNome').addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') aggiungiIscrittoSquadre(pannello);
    });

    pannello.querySelector('#sqTuttiOn').addEventListener('click', function () {
      rosterDelGruppoSquadre().forEach(function (r) { selezionati[r.nome] = true; });
      Array.prototype.forEach.call(pannello.querySelectorAll('.sq-roster-riga input[type=checkbox]'), function (c) { c.checked = true; });
      aggiornaConteggio(pannello);
    });
    pannello.querySelector('#sqTuttiOff').addEventListener('click', function () {
      rosterDelGruppoSquadre().forEach(function (r) { selezionati[r.nome] = false; });
      Array.prototype.forEach.call(pannello.querySelectorAll('.sq-roster-riga input[type=checkbox]'), function (c) { c.checked = false; });
      aggiornaConteggio(pannello);
    });

    pannello.querySelector('#sqNumMeno').addEventListener('click', function () {
      if (numSquadre > 2) { numSquadre--; pannello.querySelector('#sqNumVal').firstChild.textContent = numSquadre; aggiornaConteggio(pannello); }
    });
    pannello.querySelector('#sqNumPiu').addEventListener('click', function () {
      if (numSquadre < 6) { numSquadre++; pannello.querySelector('#sqNumVal').firstChild.textContent = numSquadre; aggiornaConteggio(pannello); }
    });

    pannello.querySelector('#sqBtnSorteggia').addEventListener('click', function () {
      avviaSorteggio(pannello);
    });

    aggiornaConteggio(pannello);
  }

  function renderRosterListaSquadre(pannello) {
    var roster = rosterDelGruppoSquadre();
    var box = pannello.querySelector('#sqRoster');

    if (!roster.length) {
      box.innerHTML = '<div class="sq-roster-empty">Nessun ' + etichettaGruppo(gruppoAttivoSquadre).toLowerCase() + ' ancora in elenco: aggiungilo qui sopra.</div>';
    } else {
      box.innerHTML = roster.map(function (r, i) {
        var checked = selezionati[r.nome] !== false;
        var chkId = 'sqChk' + i;
        return '<div class="sq-roster-riga">' +
          '<input type="checkbox" id="' + chkId + '" data-nome="' + i + '"' + (checked ? ' checked' : '') + '>' +
          '<label for="' + chkId + '">' + r.nome + '</label>' +
          '<button type="button" class="sq-roster-del" data-idx="' + i + '" title="Rimuovi ' + r.nome + '" aria-label="Rimuovi ' + r.nome + '">✕</button>' +
        '</div>';
      }).join('');
    }

    Array.prototype.forEach.call(box.querySelectorAll('input[type=checkbox]'), function (chk) {
      chk.addEventListener('change', function () {
        var idx = parseInt(chk.getAttribute('data-nome'), 10);
        selezionati[roster[idx].nome] = chk.checked;
        aggiornaConteggio(pannello);
      });
    });
    Array.prototype.forEach.call(box.querySelectorAll('.sq-roster-del'), function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var nome = roster[idx].nome;
        var rosterCompleto = rosterDisponibile();
        var posizioneCompleta = rosterCompleto.findIndex(function (r) { return r.nome === nome; });
        if (posizioneCompleta === -1) return;
        rosterCompleto.splice(posizioneCompleta, 1);
        salvaRosterSicuro(rosterCompleto);
        delete selezionati[nome];
        renderRosterListaSquadre(pannello);
        avvisaToast('Rimosso dall\'elenco');
      });
    });

    aggiornaConteggio(pannello);
  }

  function aggiungiIscrittoSquadre(pannello) {
    var input = pannello.querySelector('#sqNuovoNome');
    var nome = (input.value || '').trim();
    if (!nome) return;
    var roster = rosterDisponibile();
    var giaPresente = roster.some(function (r) { return r.nome.toLowerCase() === nome.toLowerCase(); });
    if (giaPresente) {
      avvisaToast('C\'è già un iscritto con questo nome');
      return;
    }
    roster.push({ nome: nome, gruppo: gruppoAttivoSquadre });
    salvaRosterSicuro(roster);
    selezionati[nome] = true;
    input.value = '';
    renderRosterListaSquadre(pannello);
    avvisaToast(nome + ' aggiunto tra i ' + etichettaGruppo(gruppoAttivoSquadre).toLowerCase());
  }

  function salvaRosterSicuro(roster) {
    try { if (typeof salvaRoster === 'function') salvaRoster(roster); } catch (e) {}
  }

  function presentiSelezionati(roster) {
    return roster.filter(function (r) { return selezionati[r.nome] !== false; });
  }

  function aggiornaConteggio(pannello) {
    var roster = rosterDelGruppoSquadre();
    var presenti = presentiSelezionati(roster);
    var hint = pannello.querySelector('#sqCountHint');
    if (!hint) return;
    if (!presenti.length) {
      hint.innerHTML = 'Nessun bambino selezionato.';
      return;
    }
    var base = Math.floor(presenti.length / numSquadre);
    var resto = presenti.length % numSquadre;
    var testo = '<b>' + presenti.length + '</b> bambini in <b>' + numSquadre + '</b> squadre: ';
    testo += resto === 0
      ? 'tutte da ' + base + '.'
      : resto + ' squadr' + (resto === 1 ? 'a' : 'e') + ' da ' + (base + 1) + ' e ' + (numSquadre - resto) + ' da ' + base + '.';
    hint.innerHTML = testo;
  }

  function avviaSorteggio(pannello) {
    var roster = rosterDelGruppoSquadre();
    var presenti = presentiSelezionati(roster);
    if (presenti.length < 2) {
      avvisaToast('Servono almeno 2 bambini selezionati');
      return;
    }
    if (presenti.length < numSquadre) {
      avvisaToast('Ci sono meno bambini che squadre: riduci il numero di squadre');
      return;
    }

    var btn = pannello.querySelector('#sqBtnSorteggia');
    btn.disabled = true;
    var stage = pannello.querySelector('#sqStage');
    var teamsBox = pannello.querySelector('#sqTeams');
    teamsBox.innerHTML = '';
    stage.classList.add('sq-shaking');

    var nomiMischiati = shuffle(presenti.map(function (r) { return r.nome; }));
    var giroIdx = 0;
    var giri = 14;
    var slot = stage.querySelector('.sq-slot');

    var handle = setInterval(function () {
      var nomeMostrato = nomiMischiati[giroIdx % nomiMischiati.length];
      slot.innerHTML = '🏀<span class="sq-slot-emoji"></span>' + nomeMostrato;
      giroIdx++;
      if (giroIdx >= giri) {
        clearInterval(handle);
        stage.classList.remove('sq-shaking');
        concludiSorteggio(stage, teamsBox, btn, presenti);
      }
    }, 110);
  }

  function concludiSorteggio(stage, teamsBox, btn, presenti) {
    var mischiati = shuffle(presenti);
    var mascotteScelte = shuffle(MASCOTTE).slice(0, numSquadre);
    var squadre = mascotteScelte.map(function (m) { return { mascotte: m, membri: [] }; });

    mischiati.forEach(function (persona, i) {
      squadre[i % numSquadre].membri.push(persona);
    });

    squadreCorrenti = squadre;
    stage.querySelector('.sq-slot').innerHTML = '🎉<span class="sq-slot-emoji"></span>Squadre pronte!';

    teamsBox.innerHTML = squadre.map(function (sq, i) {
      return '<div class="sq-team-card" style="--sq-colore:' + sq.mascotte.colore + '; animation-delay:' + (i * 0.08) + 's">' +
        '<div class="sq-team-head"><span class="sq-team-emoji">' + sq.mascotte.emoji + '</span>' +
        '<span class="sq-team-nome">' + sq.mascotte.nome + '</span>' +
        '<span class="sq-team-count">' + sq.membri.length + '</span></div>' +
        '<ul class="sq-team-list">' + sq.membri.map(function (p) { return '<li>' + p.nome + '</li>'; }).join('') + '</ul>' +
      '</div>';
    }).join('');

    btn.disabled = false;
    btn.textContent = 'Sorteggia di nuovo';
    lancioConfetti();
    avvisaToast('Squadre sorteggiate!');
  }

  /* ---------------------------------------------------------
     PANNELLO 2 — RUOTA DELLE SFIDE
     --------------------------------------------------------- */
  function sfidePendenti() {
    if (sfideDisponibili && sfideDisponibili.length) return sfideDisponibili;
    sfideDisponibili = shuffle(SFIDE);
    return sfideDisponibili;
  }

  var OBIETTIVO_NOME = {
    passaggio: 'Passaggio', palleggio: 'Palleggio', tiro: 'Tiro',
    difesa: 'Difesa', squadra: 'Gioco di squadra'
  };

  function svgRuota(sfide) {
    var raggio = 108, cx = 120, cy = 120, n = sfide.length;
    var path = '', etichette = '';
    for (var i = 0; i < n; i++) {
      var info = OBIETTIVO_INFO[sfide[i].obiettivo] || { emoji: '❓', colore: 'var(--slate-300)' };
      var a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
      var a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
      var x0 = cx + raggio * Math.cos(a0), y0 = cy + raggio * Math.sin(a0);
      var x1 = cx + raggio * Math.cos(a1), y1 = cy + raggio * Math.sin(a1);
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      path += '<path d="M' + cx + ',' + cy + ' L' + x0.toFixed(1) + ',' + y0.toFixed(1) +
        ' A' + raggio + ',' + raggio + ' 0 ' + large + ',1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Z" ' +
        'fill="' + info.colore + '" fill-opacity="0.85" stroke="var(--navy-900)" stroke-width="2"></path>';

      var aMid = (a0 + a1) / 2;
      var lx = cx + raggio * 0.68 * Math.cos(aMid), ly = cy + raggio * 0.68 * Math.sin(aMid);
      etichette += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) +
        '" font-size="18" text-anchor="middle" dominant-baseline="central">' + info.emoji + '</text>';
    }
    return '<svg class="sq-wheel-svg" id="sqWheelSvg" viewBox="0 0 240 240">' + path + etichette + '</svg>';
  }

  function legendaRuota() {
    var chiavi = ['passaggio', 'palleggio', 'tiro', 'difesa', 'squadra'];
    return '<div class="sq-wheel-legend">' + chiavi.map(function (k) {
      return '<span class="sq-legend-voce"><span class="sq-legend-dot" style="background:' + OBIETTIVO_INFO[k].colore + '"></span>' +
        OBIETTIVO_INFO[k].emoji + ' ' + OBIETTIVO_NOME[k] + '</span>';
    }).join('') + '</div>';
  }

  function renderPannelloRuota(overlay) {
    var pannello = overlay.querySelector('[data-panel="ruota"]');
    var sfideRuota = SFIDE; // una fetta per ogni sfida: la ruota resta stabile tra un giro e l'altro
    pannello.innerHTML =
      '<p class="feedback-hint">Da usare durante la <b>partitella finale</b>: gira la ruota e assegna a tutta la squadra una regola speciale che allena un fondamentale preciso mentre giocano la partita vera — niente di casuale e fine a sé stesso, solo sfide didattiche.</p>' +
      legendaRuota() +
      '<div class="sq-wheel-wrap"><button type="button" class="sq-music-btn" id="sqMusicToggle" aria-label="Disattiva musica" title="Disattiva musica">🔊</button>' +
      '<span class="sq-wheel-pointer">🔻</span>' + svgRuota(sfideRuota) + '<div class="sq-wheel-center"></div></div>' +
      '<div class="sq-wheel-result sq-empty" id="sqWheelResult">Gira la ruota per scoprire la regola della partitella!</div>' +
      '<div class="sq-wheel-btn-row"><button class="btn-generate" id="sqBtnGira" type="button">Gira per la partitella!</button></div>';

    aggiornaBottoneMusica(pannello);
    pannello.querySelector('#sqMusicToggle').addEventListener('click', function () {
      musicaMutata = !musicaMutata;
      salvaPreferenzaMuta(musicaMutata);
      if (audioRuota) audioRuota.muted = musicaMutata;
      aggiornaBottoneMusica(pannello);
    });

    var rotazioneTotale = 0;
    var DURATA_GIRO_MS = 6800;
    var MESSAGGI_SUSPENSE = ['🎡 Gira, gira...', '🤔 Chi sarà...', '✨ Ancora un attimo...', '🔥 Sta per fermarsi...'];

    pannello.querySelector('#sqBtnGira').addEventListener('click', function () {
      var btn = pannello.querySelector('#sqBtnGira');
      var svg = pannello.querySelector('#sqWheelSvg');
      var wrap = pannello.querySelector('.sq-wheel-wrap');
      var risultatoBox = pannello.querySelector('#sqWheelResult');
      if (btn.disabled) return;
      btn.disabled = true;
      var testoOriginaleBtn = btn.textContent;
      btn.textContent = 'Sta girando...';

      var pool = sfidePendenti();
      var scelta = pool.shift();
      var info = OBIETTIVO_INFO[scelta.obiettivo] || { emoji: '❓', colore: 'var(--slate-300)' };

      var giriExtra = 9 + Math.floor(Math.random() * 5); // 9-13 giri completi: più a lungo e più suspense
      var angoloCasuale = Math.random() * 360;
      rotazioneTotale += giriExtra * 360 + angoloCasuale;
      svg.style.transform = 'rotate(' + rotazioneTotale + 'deg)';

      wrap.classList.remove('sq-vinto');
      wrap.classList.add('sq-girando');

      risultatoBox.classList.remove('sq-empty', 'sq-wheel-result-flash');
      var msgIdx = 0;
      risultatoBox.innerHTML = '<span class="sq-wheel-suspense">' + MESSAGGI_SUSPENSE[0] + '</span>';
      var suspenseHandle = setInterval(function () {
        msgIdx = (msgIdx + 1) % MESSAGGI_SUSPENSE.length;
        risultatoBox.innerHTML = '<span class="sq-wheel-suspense">' + MESSAGGI_SUSPENSE[msgIdx] + '</span>';
      }, 900);

      setTimeout(function () {
        clearInterval(suspenseHandle);
        wrap.classList.remove('sq-girando');
        wrap.classList.add('sq-vinto');
        risultatoBox.classList.add('sq-wheel-result-flash');
        risultatoBox.innerHTML =
          '<div><span class="sq-result-tag" style="--sq-colore:' + info.colore + '">' + info.emoji + ' ' + OBIETTIVO_NOME[scelta.obiettivo] + '</span>' +
          '<p class="sq-result-testo">' + scelta.testo + '</p></div>';
        btn.disabled = false;
        btn.textContent = testoOriginaleBtn;
        lancioConfetti();
        avvisaToast('Regola per la partitella estratta!');
      }, DURATA_GIRO_MS + 300);
    });
  }

  /* ---------------------------------------------------------
     PULSANTE NELL'HEADER
     --------------------------------------------------------- */
  function creaBottoneHeader() {
    var headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;
    var btn = document.createElement('button');
    btn.className = 'icon-btn';
    btn.type = 'button';
    btn.id = 'btnSorteggio';
    btn.textContent = '🎲 Sorteggia squadre';
    headerActions.appendChild(btn);
    btn.addEventListener('click', apriSorteggio);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', creaBottoneHeader);
  } else {
    creaBottoneHeader();
  }

})();
