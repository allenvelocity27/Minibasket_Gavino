/* ============================================================
   LAVAGNA TATTICA — "Disegna la tua azione"
   Modulo autonomo per il planner allenamenti (nome coach/app in config.js) — COMPLETO

   PARTE 1/3: campo interattivo + posizionamento di giocatori 🟢,
     difensori 🔴, coni 🔶, sedie 🪑, aste ▮ e cerchi ⭕ (tap per
     aggiungere, drag per spostare).
   PARTE 2/3: frecce di movimento — ➤ Taglio (continua),
     ⇢ Passaggio (tratteggiata), ⋯➤ Palleggio (a trattini),
     🎯 Tiro (puntinata) — si disegnano a mano libera trascinando sul
     campo (mouse o dito), seguendo fedelmente il tratto disegnato; si
     selezionano ed eliminano come gli altri elementi.
   PARTE 3/3 (questa): ▶️ Play anima l'azione in sequenza — le frecce
     si muovono una alla volta, nell'ordine in cui sono state disegnate:
     solo quando una finisce parte la successiva. Taglio e palleggio
     spostano il giocatore più vicino alla partenza; il passaggio
     mostra sempre un pallino a forma di pallone 🏀, senza spostare i
     giocatori. "Posizioni iniziali" riporta tutto com'era prima
     dell'ultima riproduzione. "Salva schema" / "Schemi salvati"
     permettono di salvare più azioni e ricaricarle in seguito (salvate
     solo su questo dispositivo/browser, tramite localStorage —
     indipendenti dalla cronologia degli allenamenti).

   Basta includere questo file con:
     <script src="lavagna-tattica.js"></script>
   dopo <script src="script.js"></script>: si inietta da solo lo
   stile e il pulsante "Disegna la tua azione" nell'header.
   ============================================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------
  // STILE — usa le stesse variabili colore del resto dell'app
  // ---------------------------------------------------------
  var styleTag = document.createElement('style');
  styleTag.setAttribute('data-modulo', 'lavagna-tattica');
  styleTag.textContent = `
.lav-overlay{align-items:stretch;}
.lav-box{max-width:720px;width:100%;max-height:92vh;max-height:92dvh;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:18px;}
.lav-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:6px;}
.lav-head h2{font-family:'Sora',sans-serif;font-size:18px;color:var(--cream-100);margin:0;}
.lav-hint{margin:0 0 12px;font-size:12.5px;color:var(--slate-300);line-height:1.4;}
.lav-toolbar-label{width:100%;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--slate-400);font-weight:600;margin:8px 0 5px;}
.lav-toolbar-label:first-of-type{margin-top:0;}
.lav-toolbar{display:flex;flex-wrap:wrap;gap:7px;}
.lav-tool.active{background:var(--orange-500);border-color:var(--orange-500);color:var(--navy-900);font-weight:600;}
.lav-tool.lav-tool-freccia.active{background:var(--lav-colore);border-color:var(--lav-colore);color:var(--navy-900);}
#lavSyncToggle{font-size:11.5px;}
#lavSyncToggle:disabled{opacity:.45;cursor:default;}
.lav-court-wrap{position:relative;width:100%;max-width:340px;margin:12px auto 0;aspect-ratio:300/440;
  border-radius:10px;overflow:hidden;background:var(--navy-800);touch-action:pan-y;flex:none;transition:opacity .15s ease;}
.lav-court-wrap.lav-freccia-armata{touch-action:none;}
.lav-court-wrap.lav-disabilitato{pointer-events:none;opacity:.88;}
.lav-court-svg{width:100%;height:100%;display:block;position:absolute;inset:0;}
.lav-court-bg{fill:var(--navy-800);}
.lav-court-line{fill:none;stroke:var(--slate-400);stroke-width:2;opacity:.55;}
.lav-court-hoop{fill:var(--orange-400);stroke:var(--orange-400);opacity:.85;}
.lav-arrow-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}
.lav-freccia-path{fill:none;stroke-linecap:round;pointer-events:none;}
.lav-freccia-path.selezionata{stroke-width:1.6;filter:drop-shadow(0 0 2.5px rgba(231,197,122,.75));}
.lav-arrow-hit{fill:none;stroke:transparent;stroke-width:6;cursor:pointer;pointer-events:stroke;}
.lav-layer{position:absolute;inset:0;}
.lav-elemento{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;
  border-radius:50%;background:var(--navy-900);border:2px solid var(--lav-colore,var(--orange-400));
  display:flex;align-items:center;justify-content:center;font-size:15px;cursor:grab;
  touch-action:none;box-shadow:0 2px 8px rgba(0,0,0,.35);user-select:none;}
.lav-elemento.selezionato{box-shadow:0 0 0 3px rgba(231,197,122,0.55),0 2px 8px rgba(0,0,0,.35);}
.lav-elemento:active{cursor:grabbing;}
.lav-play-token{position:absolute;width:13px;height:13px;transform:translate(-50%,-50%);
  border-radius:50%;background:var(--lav-colore);opacity:.9;box-shadow:0 0 7px rgba(0,0,0,.5);pointer-events:none;}
.lav-play-token.lav-play-token-palla{width:18px;height:18px;background:transparent;box-shadow:none;
  display:flex;align-items:center;justify-content:center;font-size:16px;}
.lav-step-badge{position:absolute;transform:translate(-50%,-50%);min-width:16px;height:16px;padding:0 3px;
  border-radius:50%;background:var(--navy-900);border:1.5px solid var(--cream-200);color:var(--cream-100);
  display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;line-height:1;
  font-family:'Work Sans',sans-serif;pointer-events:none;box-shadow:0 1px 4px rgba(0,0,0,.4);z-index:2;}
.lav-step-badge.lav-step-badge-sync{background:var(--orange-500);border-color:var(--orange-500);color:var(--navy-900);}
.lav-play-row{margin-top:14px;}
.lav-play-row .btn-generate{margin-top:0;}
.lav-play-row .btn-generate:disabled{opacity:.5;cursor:default;background:var(--navy-600);}
.lav-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:10px;}
.lav-actions .icon-btn{flex:1 1 150px;justify-content:center;font-size:12.5px;padding:10px 12px;}
.lav-actions .icon-btn:disabled{opacity:.5;cursor:default;}
.lav-note{margin:12px 0 0;font-size:11.5px;color:var(--slate-400);text-align:center;font-style:italic;}
`;
  document.head.appendChild(styleTag);

  // ---------------------------------------------------------
  // STRUMENTI DISPONIBILI (elementi da posizionare + frecce)
  // ---------------------------------------------------------
  var STRUMENTI = {
    giocatore: { categoria: 'elemento', label: 'Giocatore', emoji: '🟢', colore: 'var(--green-500)' },
    difensore: { categoria: 'elemento', label: 'Difensore', emoji: '🔴', colore: 'var(--red-400)' },
    cono:      { categoria: 'elemento', label: 'Cono',      emoji: '🔶', colore: 'var(--orange-400)' },
    sedia:     { categoria: 'elemento', label: 'Sedia',     emoji: '🪑', colore: 'var(--slate-300)' },
    asta:      { categoria: 'elemento', label: 'Asta',      emoji: '▮',  colore: 'var(--cream-200)' },
    cerchio:   { categoria: 'elemento', label: 'Cerchio',   emoji: '⭕', colore: 'var(--teal-400)' },
    taglio:    { categoria: 'freccia', label: 'Taglio (movimento)', simbolo: '➤', colore: 'var(--cream-200)', markerId: 'lav-arrow-cream', dash: null, muove: 'giocatore' },
    passaggio: { categoria: 'freccia', label: 'Passaggio',          simbolo: '⇢', colore: 'var(--teal-400)',  markerId: 'lav-arrow-teal',  dash: '7 5', muove: 'palla' },
    palleggio: { categoria: 'freccia', label: 'Palleggio',          simbolo: '⋯➤', colore: 'var(--purple-400)', markerId: 'lav-arrow-purple', dash: '2.2 2.6', muove: 'giocatore' },
    tiro:      { categoria: 'freccia', label: 'Tiro',               simbolo: '🎯', colore: 'var(--orange-500)', markerId: 'lav-arrow-orange', dash: '1 5', muove: 'palla' }
  };

  var CHIAVE_STORAGE = 'lavagnaTatticaSchemi';
  var DURATA_ANIMAZIONE = 1500; // ms

  // Colori RGB (jsPDF non legge le variabili CSS) e lettera identificativa
  // usati per disegnare lo schema nel PDF condivisibile — vedi PARTE 4/4.
  var COLORE_PDF = {
    giocatore: [76, 154, 106],
    difensore: [193, 102, 90],
    cono:      [214, 158, 60],
    sedia:     [150, 155, 165],
    asta:      [120, 128, 122],
    cerchio:   [90, 169, 168],
    taglio:    [95, 105, 100],
    passaggio: [90, 169, 168],
    palleggio: [156, 140, 214],
    tiro:      [201, 150, 46]
  };
  var LETTERA_PDF = { giocatore: 'G', difensore: 'D', cono: 'C', sedia: 'S', asta: 'A', cerchio: 'O' };
  var DASH_PDF = { taglio: [], passaggio: [2.2, 1.6], palleggio: [0.9, 1.1], tiro: [0.3, 1.3] };

  // ---------------------------------------------------------
  // STATO
  // ---------------------------------------------------------
  var elementi = [];        // {id, tipo, x, y}
  var frecce = [];          // {id, tipo, punti:[{x,y},...], gruppo}
  var idCounter = 1;
  var toolAttivo = null;
  var selezione = null;     // {kind:'elemento'|'freccia', id}
  var cronologia = [];      // [{kind, id}, ...] ordine di inserimento, per "Annulla ultimo"
  var animazione = null;    // {rafIds:[]} mentre il Play è in corso (uno o più raf attivi in contemporanea)
  var posizioniPrePlay = null; // snapshot per "Posizioni iniziali"
  var sincroAttivo = false; // se true, la prossima freccia disegnata parte insieme all'ultima (stesso "gruppo")

  // Ogni freccia ha un campo "gruppo": null/undefined se va eseguita da sola
  // nella sequenza; altrimenti un identificatore condiviso con una o più
  // altre frecce che devono PARTIRE INSIEME quando la sequenza le raggiunge
  // (senza però anticipare l'inizio rispetto al resto dell'azione).

  var $ = function (id) { return document.getElementById(id); };

  // ---------------------------------------------------------
  // BOTTONE NELL'HEADER
  // ---------------------------------------------------------
  function creaBottoneHeader() {
    if ($('btnLavagna')) return;
    var headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;
    var btn = document.createElement('button');
    btn.className = 'icon-btn';
    btn.id = 'btnLavagna';
    btn.type = 'button';
    btn.textContent = '🎯 Disegna la tua azione';
    btn.addEventListener('click', apriLavagna);
    headerActions.appendChild(btn);
  }

  // ---------------------------------------------------------
  // CAMPO SVG (mezzo campo minibasket, stilizzato)
  // ---------------------------------------------------------
  function svgCampo() {
    return (
      '<svg class="lav-court-svg" viewBox="0 0 300 440" preserveAspectRatio="xMidYMid meet">' +
        '<rect x="4" y="4" width="292" height="432" rx="10" class="lav-court-bg"></rect>' +      // fondo
        '<rect x="4" y="4" width="292" height="432" rx="10" class="lav-court-line"></rect>' +    // bordo campo
        '<rect x="95" y="4" width="110" height="120" class="lav-court-line"></rect>' +           // area tiro libero
        '<circle cx="150" cy="124" r="42" class="lav-court-line"></circle>' +                    // cerchio tiro libero
        '<line x1="34" y1="4" x2="34" y2="132" class="lav-court-line"></line>' +                 // laterale 3 punti
        '<line x1="266" y1="4" x2="266" y2="132" class="lav-court-line"></line>' +               // laterale 3 punti
        '<path d="M34 132 A127 127 0 0 0 266 132" class="lav-court-line"></path>' +              // arco 3 punti
        '<circle cx="150" cy="440" r="42" class="lav-court-line"></circle>' +                    // cerchio metà campo
        '<circle cx="150" cy="34" r="4.5" class="lav-court-hoop"></circle>' +                     // canestro
        '<line x1="118" y1="22" x2="182" y2="22" class="lav-court-hoop" stroke-width="4"></line>' + // tabellone
      '</svg>'
    );
  }

  // I marcatori delle punte si generano dalle stesse frecce definite in
  // STRUMENTI (markerId + colore), così restano sempre allineati fra loro.
  function svgArrowDefs() {
    var marcatori = Object.keys(STRUMENTI).map(function (key) {
      var t = STRUMENTI[key];
      if (t.categoria !== 'freccia') return '';
      return '<marker id="' + t.markerId + '" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">' +
        '<path d="M0,0 L6,3 L0,6 Z" fill="' + t.colore + '"></path></marker>';
    }).join('');
    return '<defs>' + marcatori + '</defs>';
  }

  // ---------------------------------------------------------
  // APERTURA / CHIUSURA LAVAGNA
  // ---------------------------------------------------------
  function apriLavagna() {
    chiudiLavagnaEsistente();
    selezione = null;
    posizioniPrePlay = null;
    fermaPlay();

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay lav-overlay';
    overlay.id = 'lavagnaOverlay';
    overlay.innerHTML =
      '<div class="modal-box lav-box">' +
        '<div class="lav-head">' +
          '<h2>🎯 Disegna la tua azione</h2>' +
          '<button class="dettaglio-chiudi" id="lavChiudi" type="button" aria-label="Chiudi">✕</button>' +
        '</div>' +
        '<p class="lav-hint">Tocca il campo per posizionare giocatori e materiali (coni, sedie, aste, cerchi). Per le frecce trascina a mano libera: la linea segue il percorso del dito o del mouse. Attiva "Inizia insieme alla freccia precedente" prima di disegnarne una per farla partire in contemporanea con l\'ultima disegnata, mantenendo comunque l\'ordine generale dell\'azione: si disattiva da sola subito dopo, quindi per collegarne tre o più riattivalo prima di ognuna. Il numerino compare solo sulle frecce che partono in contemporanea con altre, per indicare quali fanno parte dello stesso gruppo; selezionando una freccia puoi unirla al passo successivo o separarla dal suo gruppo. Poi premi Play per vedere l\'azione muoversi.</p>' +
        '<div class="lav-toolbar-label">Elementi</div>' +
        '<div class="lav-toolbar" id="lavToolbarElementi"></div>' +
        '<div class="lav-toolbar-label">Frecce di movimento</div>' +
        '<div class="lav-toolbar" id="lavToolbarFrecce"></div>' +
        '<div class="lav-toolbar">' +
          '<button class="chip lav-tool" id="lavSyncToggle" type="button" disabled>🔗 Inizia insieme alla freccia precedente</button>' +
        '</div>' +
        '<div class="lav-court-wrap" id="lavCourtWrap">' +
          svgCampo() +
          '<svg class="lav-arrow-svg" id="lavArrowSvg" viewBox="0 0 100 100" preserveAspectRatio="none">' +
            svgArrowDefs() +
            '<g id="lavArrowGroup"></g>' +
          '</svg>' +
          '<div class="lav-layer" id="lavLayer"></div>' +
        '</div>' +
        '<div class="lav-play-row"><button class="btn-generate" id="lavPlay" type="button" disabled>▶️ Riproduci l\'azione</button></div>' +
        '<div class="lav-actions">' +
          '<button class="icon-btn" id="lavRipristina" type="button" disabled>↺ Posizioni iniziali</button>' +
          '<button class="icon-btn" id="lavAnnulla" type="button" disabled>↩️ Annulla ultimo</button>' +
          '<button class="icon-btn" id="lavElimina" type="button" disabled>🗑️ Elimina selezionato</button>' +
          '<button class="icon-btn" id="lavSyncSucc" type="button" disabled>🔗 Sincronizza con successiva</button>' +
          '<button class="icon-btn" id="lavSeparaGruppo" type="button" disabled>✂️ Separa dal gruppo</button>' +
          '<button class="icon-btn" id="lavSalva" type="button">💾 Salva schema</button>' +
          '<button class="icon-btn" id="lavCondividi" type="button" disabled>↗ Condividi PDF</button>' +
          '<button class="icon-btn" id="lavSchemi" type="button">📂 Schemi salvati</button>' +
          '<button class="icon-btn" id="lavReset" type="button">🧹 Svuota campo</button>' +
        '</div>' +
        '<p class="lav-note">Gli schemi salvati restano su questo dispositivo.</p>' +
      '</div>';
    document.body.appendChild(overlay);

    creaToolbar('lavToolbarElementi', 'elemento');
    creaToolbar('lavToolbarFrecce', 'freccia');
    renderTutto();
    sincroAttivo = false;
    aggiornaBarraCompleta();
    aggiornaBloccoScorrimentoCampo();

    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) chiudiLavagna(); });
    $('lavChiudi').addEventListener('click', chiudiLavagna);

    var svuotaTimeout = null;
    $('lavReset').addEventListener('click', function () {
      var btnReset = this;
      if (!elementi.length && !frecce.length) return;

      if (btnReset.dataset.confermando === '1') {
        clearTimeout(svuotaTimeout);
        btnReset.dataset.confermando = '';
        btnReset.textContent = '🧹 Svuota campo';
        fermaPlay();
        elementi = [];
        frecce = [];
        cronologia = [];
        selezione = null;
        posizioniPrePlay = null;
        renderTutto();
        aggiornaBarraCompleta();
        return;
      }

      btnReset.dataset.confermando = '1';
      btnReset.textContent = '⚠️ Tocca di nuovo per confermare';
      svuotaTimeout = setTimeout(function () {
        btnReset.dataset.confermando = '';
        btnReset.textContent = '🧹 Svuota campo';
      }, 3000);
    });

    $('lavElimina').addEventListener('click', function () {
      if (!selezione) return;
      if (selezione.kind === 'elemento') {
        elementi = elementi.filter(function (e) { return e.id !== selezione.id; });
        invalidaSnapshotPosizioni();
      } else {
        frecce = frecce.filter(function (f) { return f.id !== selezione.id; });
      }
      selezione = null;
      renderTutto();
      aggiornaBarra();
    });

    $('lavAnnulla').addEventListener('click', annullaUltimo);
    $('lavSyncSucc').addEventListener('click', sincronizzaConSuccessiva);
    $('lavSeparaGruppo').addEventListener('click', separaDalGruppo);

    $('lavSyncToggle').addEventListener('click', function () {
      if (this.disabled) return;
      sincroAttivo = !sincroAttivo;
      this.classList.toggle('active', sincroAttivo);
    });

    $('lavPlay').addEventListener('click', togglePlay);
    $('lavRipristina').addEventListener('click', ripristinaPosizioni);
    $('lavSalva').addEventListener('click', salvaSchema);
    $('lavCondividi').addEventListener('click', condividiSchemaCorrente);
    $('lavSchemi').addEventListener('click', apriSchemiSalvati);

    var courtWrap = $('lavCourtWrap');

    // Tap per posizionare un elemento (giocatore/difensore/palla/cono)
    courtWrap.addEventListener('click', function (ev) {
      if (ev.target.closest('.lav-elemento') || ev.target.closest('.lav-arrow-hit')) return;
      if (!toolAttivo || STRUMENTI[toolAttivo].categoria !== 'elemento') return;
      var rect = courtWrap.getBoundingClientRect();
      var x = ((ev.clientX - rect.left) / rect.width) * 100;
      var y = ((ev.clientY - rect.top) / rect.height) * 100;
      aggiungiElemento(toolAttivo, clamp(x), clamp(y));
    });

    // Trascinamento per disegnare una freccia
    courtWrap.addEventListener('pointerdown', function (ev) {
      if (ev.target.closest('.lav-elemento') || ev.target.closest('.lav-arrow-hit')) return;
      if (!toolAttivo || STRUMENTI[toolAttivo].categoria !== 'freccia') return;
      iniziaDisegnoFreccia(ev, courtWrap, toolAttivo);
    });

    function onEsc(ev) { if (ev.key === 'Escape') chiudiLavagna(); }
    document.addEventListener('keydown', onEsc);
    overlay._onEsc = onEsc;
  }

  function chiudiLavagnaEsistente() {
    var vecchio = $('lavagnaOverlay');
    if (vecchio) vecchio.remove();
  }

  function chiudiLavagna() {
    fermaPlay();
    var overlay = $('lavagnaOverlay');
    if (!overlay) return;
    if (overlay._onEsc) document.removeEventListener('keydown', overlay._onEsc);
    overlay.remove();
    toolAttivo = null;
  }

  // Il campo blocca lo scorrimento verticale (touch-action:none) SOLO
  // quando è attivo uno strumento "freccia", cioè quando si sta per
  // disegnare a mano libera: in quel momento serve che il dito non faccia
  // scrollare la pagina. In tutti gli altri casi (nessuno strumento
  // selezionato, o uno strumento "elemento" per posizionare pedine con un
  // semplice tocco) il campo lascia passare lo scroll verticale, così si
  // può scorrere la lavagna anche passando sopra al campo da gioco senza
  // tracciare movimenti per errore.
  function aggiornaBloccoScorrimentoCampo() {
    var wrap = $('lavCourtWrap');
    if (!wrap) return;
    var armato = toolAttivo && STRUMENTI[toolAttivo] && STRUMENTI[toolAttivo].categoria === 'freccia';
    wrap.classList.toggle('lav-freccia-armata', !!armato);
  }

  // ---------------------------------------------------------
  // TOOLBAR
  // ---------------------------------------------------------
  function creaToolbar(idContenitore, categoria) {
    var toolbar = $(idContenitore);
    toolbar.innerHTML = '';
    Object.keys(STRUMENTI).forEach(function (key) {
      var t = STRUMENTI[key];
      if (t.categoria !== categoria) return;
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip lav-tool' + (categoria === 'freccia' ? ' lav-tool-freccia' : '');
      chip.dataset.tipo = key;
      if (categoria === 'freccia') chip.style.setProperty('--lav-colore', t.colore);
      chip.innerHTML = (t.emoji || t.simbolo) + ' ' + t.label;
      chip.addEventListener('click', function () {
        toolAttivo = (toolAttivo === key) ? null : key;
        document.querySelectorAll('.lav-tool').forEach(function (c) {
          c.classList.toggle('active', c.dataset.tipo === toolAttivo);
        });
        aggiornaBloccoScorrimentoCampo();
      });
      toolbar.appendChild(chip);
    });
  }

  // ---------------------------------------------------------
  // ELEMENTI SUL CAMPO
  // ---------------------------------------------------------
  function clamp(v) { return Math.max(3, Math.min(97, v)); }

  function aggiungiElemento(tipo, x, y) {
    var id = idCounter++;
    elementi.push({ id: id, tipo: tipo, x: x, y: y });
    cronologia.push({ kind: 'elemento', id: id });
    invalidaSnapshotPosizioni();
    renderTutto();
    aggiornaBottoneAnnulla();
  }

  // Da chiamare ogni volta che le posizioni degli elementi cambiano "a
  // mano" (aggiunta, rimozione, trascinamento) fuori dal Play: così la
  // prossima riproduzione cattura come "posizioni iniziali" la disposizione
  // attuale, quella davvero di partenza per la prossima azione.
  function invalidaSnapshotPosizioni() {
    if (!posizioniPrePlay) return;
    posizioniPrePlay = null;
    aggiornaBottoneRipristina();
  }

  function renderTutto() {
    renderElementi();
    renderFrecce();
    aggiornaBottonePlay();
    aggiornaBottoneCondividi();
  }

  function aggiornaBottoneCondividi() {
    var btn = $('lavCondividi');
    if (btn) btn.disabled = !elementi.length && !frecce.length;
  }

  function renderElementi() {
    var layer = $('lavLayer');
    if (!layer) return;
    layer.querySelectorAll('.lav-elemento').forEach(function (n) { n.remove(); });
    elementi.forEach(function (el) {
      var t = STRUMENTI[el.tipo];
      var node = document.createElement('div');
      node.className = 'lav-elemento' + (selezione && selezione.kind === 'elemento' && selezione.id === el.id ? ' selezionato' : '');
      node.style.left = el.x + '%';
      node.style.top = el.y + '%';
      node.style.setProperty('--lav-colore', t.colore);
      node.textContent = t.emoji;
      node.dataset.id = el.id;

      node.addEventListener('pointerdown', function (ev) {
        // Se è selezionato uno strumento freccia, il tocco su un elemento fa
        // partire il disegno della linea da questo elemento (senza spostarlo),
        // invece di trascinarlo come si farebbe normalmente.
        if (toolAttivo && STRUMENTI[toolAttivo] && STRUMENTI[toolAttivo].categoria === 'freccia') {
          var wrap = $('lavCourtWrap');
          if (wrap) iniziaDisegnoFreccia(ev, wrap, toolAttivo, el.x, el.y);
          return;
        }
        avviaTrascinamento(ev, el);
      });
      node.addEventListener('click', function (ev) {
        ev.stopPropagation();
        selezione = (selezione && selezione.kind === 'elemento' && selezione.id === el.id) ? null : { kind: 'elemento', id: el.id };
        renderTutto();
        aggiornaBottoneElimina();
        aggiornaBottoniGruppo();
      });

      layer.appendChild(node);
    });
  }

  function aggiornaBottoneElimina() {
    var btn = $('lavElimina');
    if (btn) btn.disabled = !selezione;
  }

  // Abilita/disabilita i due pulsanti per modificare un raggruppamento già
  // esistente, in base a cosa è selezionato in questo momento:
  // - "Sincronizza con successiva": disponibile solo su una freccia che non
  //   sia già l'ultimo passo della sequenza.
  // - "Separa dal gruppo": disponibile solo su una freccia che fa parte di
  //   un passo con altre frecce simultanee (gruppo di 2 o più).
  function aggiornaBottoniGruppo() {
    var btnSync = $('lavSyncSucc');
    var btnSepara = $('lavSeparaGruppo');
    if (!btnSync || !btnSepara) return;

    if (!selezione || selezione.kind !== 'freccia') {
      btnSync.disabled = true;
      btnSepara.disabled = true;
      return;
    }

    var passi = raggruppaPerPassi(frecce);
    var indicePasso = -1;
    var passoCorrente = null;
    passi.forEach(function (passo, i) {
      if (passo.some(function (f) { return f.id === selezione.id; })) {
        indicePasso = i;
        passoCorrente = passo;
      }
    });

    btnSync.disabled = (indicePasso === -1) || (indicePasso >= passi.length - 1);
    btnSepara.disabled = !passoCorrente || passoCorrente.length <= 1;
  }

  // Unisce il passo della freccia selezionata con quello immediatamente
  // successivo nella sequenza: tutte le frecce dei due passi diventano un
  // unico passo simultaneo. Non serve riordinare l'array delle frecce,
  // perché due passi consecutivi sono per definizione già contigui.
  function sincronizzaConSuccessiva() {
    if (!selezione || selezione.kind !== 'freccia' || animazione) return;
    var passi = raggruppaPerPassi(frecce);
    var indice = -1;
    passi.forEach(function (passo, i) {
      if (passo.some(function (f) { return f.id === selezione.id; })) indice = i;
    });
    if (indice === -1 || indice >= passi.length - 1) return;

    var passoCorrente = passi[indice];
    var passoSuccessivo = passi[indice + 1];
    var idGruppo = passoCorrente[0].gruppo || passoSuccessivo[0].gruppo || ('g' + passoCorrente[0].id);
    passoCorrente.concat(passoSuccessivo).forEach(function (f) { f.gruppo = idGruppo; });

    renderTutto();
    aggiornaBottoniGruppo();
  }

  // Toglie la freccia selezionata dal gruppo simultaneo a cui appartiene:
  // torna a essere un passo a sé stante, eseguito subito dopo il gruppo da
  // cui è stata tolta (il resto del gruppo rimane sincronizzato tra loro).
  function separaDalGruppo() {
    if (!selezione || selezione.kind !== 'freccia' || animazione) return;
    var passi = raggruppaPerPassi(frecce);
    var passoCorrente = null;
    passi.forEach(function (passo) {
      if (passo.some(function (f) { return f.id === selezione.id; })) passoCorrente = passo;
    });
    if (!passoCorrente || passoCorrente.length <= 1) return;

    var selezionata = frecce.find(function (f) { return f.id === selezione.id; });
    if (!selezionata) return;
    var idResiduo = passoCorrente[0].gruppo;

    // La togliamo dalla sua posizione attuale e la reinseriamo subito dopo
    // l'ultima freccia rimasta del vecchio gruppo: così il gruppo resta un
    // blocco contiguo (necessario alla riproduzione a passi) e lei diventa
    // un passo a sé, posizionato subito dopo quel gruppo nella sequenza.
    frecce = frecce.filter(function (f) { return f.id !== selezione.id; });
    selezionata.gruppo = null;

    var ultimaPosizioneGruppo = -1;
    frecce.forEach(function (f, i) { if (f.gruppo === idResiduo) ultimaPosizioneGruppo = i; });
    frecce.splice(ultimaPosizioneGruppo + 1, 0, selezionata);

    // Se al vecchio gruppo è rimasta una sola freccia, non è più un
    // "gruppo": la puliamo per coerenza con l'indicatore visivo.
    pulisciGruppiSingoli();

    renderTutto();
    aggiornaBottoniGruppo();
  }

  // Rimuove il campo "gruppo" dalle frecce rimaste sole nel proprio passo
  // (può succedere dopo una separazione), così indicatore visivo e
  // riproduzione restano sempre coerenti tra loro.
  function pulisciGruppiSingoli() {
    raggruppaPerPassi(frecce).forEach(function (passo) {
      if (passo.length === 1) passo[0].gruppo = null;
    });
  }

  function aggiornaBottoneAnnulla() {
    var btn = $('lavAnnulla');
    if (btn) btn.disabled = cronologia.length === 0;
  }

  // Toglie l'ultimo elemento o freccia aggiunti, senza bisogno di selezionarli
  // a mano — utile per pulire in fretta un disegno o correggere un tocco sbagliato.
  function annullaUltimo() {
    while (cronologia.length) {
      var ultimo = cronologia.pop();
      var lista = (ultimo.kind === 'elemento') ? elementi : frecce;
      if (lista.some(function (o) { return o.id === ultimo.id; })) {
        if (ultimo.kind === 'elemento') {
          elementi = elementi.filter(function (e) { return e.id !== ultimo.id; });
          invalidaSnapshotPosizioni();
        } else {
          frecce = frecce.filter(function (f) { return f.id !== ultimo.id; });
        }
        if (selezione && selezione.kind === ultimo.kind && selezione.id === ultimo.id) selezione = null;
        break;
      }
      // se era già stato eliminato a mano, salta al precedente in cronologia
    }
    renderTutto();
    aggiornaBarra();
  }

  function aggiornaBottoneRipristina() {
    var btn = $('lavRipristina');
    if (btn) btn.disabled = !posizioniPrePlay;
  }

  // Il toggle "Inizia insieme alla freccia precedente" ha senso solo se
  // esiste già almeno una freccia a cui agganciarsi.
  function aggiornaBottoneSync() {
    var btn = $('lavSyncToggle');
    if (!btn) return;
    btn.disabled = frecce.length === 0;
    if (btn.disabled && sincroAttivo) {
      sincroAttivo = false;
      btn.classList.remove('active');
    }
  }

  // Scorciatoie per i gruppi di pulsanti che vengono sempre aggiornati insieme.
  function aggiornaBarra() {
    aggiornaBottoneElimina();
    aggiornaBottoniGruppo();
    aggiornaBottoneAnnulla();
    aggiornaBottoneSync();
  }
  function aggiornaBarraCompleta() {
    aggiornaBarra();
    aggiornaBottoneRipristina();
  }

  function avviaTrascinamento(ev, el) {
    if (animazione) return;
    ev.preventDefault();
    ev.stopPropagation();
    var wrap = $('lavCourtWrap');
    if (!wrap) return;

    function muovi(ev2) {
      var rect = wrap.getBoundingClientRect();
      el.x = clamp(((ev2.clientX - rect.left) / rect.width) * 100);
      el.y = clamp(((ev2.clientY - rect.top) / rect.height) * 100);
      renderElementi();
    }
    function fine() {
      window.removeEventListener('pointermove', muovi);
      window.removeEventListener('pointerup', fine);
      invalidaSnapshotPosizioni();
    }
    window.addEventListener('pointermove', muovi);
    window.addEventListener('pointerup', fine);
  }

  // ---------------------------------------------------------
  // FRECCE DI MOVIMENTO — disegnate a mano libera: ogni freccia è definita
  // da un elenco di punti campionati durante il trascinamento (vedi
  // iniziaDisegnoFreccia). Le funzioni qui sotto lavorano tutte su
  // quell'elenco di punti ("percorso").
  // ---------------------------------------------------------

  // Trasforma un elenco di punti in un tracciato SVG "liscio" (curve invece
  // di spigoli tra un punto campionato e l'altro): per ogni coppia di punti
  // consecutivi si usa il punto medio come nodo della curva e il punto
  // stesso come "manico" — una tecnica semplice e senza dipendenze per far
  // sembrare fluido un tratto disegnato a mano libera.
  function costruisciTracciato(punti) {
    if (!punti.length) return '';
    if (punti.length === 1) return 'M ' + punti[0].x + ' ' + punti[0].y;
    var d = 'M ' + punti[0].x + ' ' + punti[0].y;
    for (var i = 1; i < punti.length - 1; i++) {
      var corrente = punti[i], prossimo = punti[i + 1];
      d += ' Q ' + corrente.x + ' ' + corrente.y + ' ' + (corrente.x + prossimo.x) / 2 + ' ' + (corrente.y + prossimo.y) / 2;
    }
    var ultimo = punti[punti.length - 1];
    d += ' L ' + ultimo.x + ' ' + ultimo.y;
    return d;
  }

  // Trova il punto (x,y) alla frazione t (0..1) lungo un percorso,
  // misurata come lunghezza percorsa (non come indice del punto): usata
  // sia per l'anteprima/posizione dei badge sia per l'animazione del Play.
  function puntoLungoPercorso(punti, t) {
    if (!punti.length) return { x: 0, y: 0 };
    if (punti.length === 1) return { x: punti[0].x, y: punti[0].y };
    var cumulativa = [0];
    for (var i = 1; i < punti.length; i++) {
      cumulativa.push(cumulativa[i - 1] + Math.hypot(punti[i].x - punti[i - 1].x, punti[i].y - punti[i - 1].y));
    }
    var lunghezzaTotale = cumulativa[cumulativa.length - 1];
    if (!lunghezzaTotale) return { x: punti[0].x, y: punti[0].y };
    var target = Math.max(0, Math.min(1, t)) * lunghezzaTotale;
    for (i = 1; i < punti.length; i++) {
      if (target <= cumulativa[i] || i === punti.length - 1) {
        var segmentoLunghezza = cumulativa[i] - cumulativa[i - 1] || 1;
        var frazione = Math.max(0, Math.min(1, (target - cumulativa[i - 1]) / segmentoLunghezza));
        return {
          x: punti[i - 1].x + (punti[i].x - punti[i - 1].x) * frazione,
          y: punti[i - 1].y + (punti[i].y - punti[i - 1].y) * frazione
        };
      }
    }
    return { x: punti[punti.length - 1].x, y: punti[punti.length - 1].y };
  }

  // Posizione (0-100,0-100) lungo una freccia al progresso t (0..1),
  // usata sia per l'anteprima di disegno sia per l'animazione Play.
  // La freccia segue esattamente il percorso disegnato dall'utente, senza
  // alcuna distorsione aggiunta (es. onde): i movimenti si differenziano
  // solo per colore e stile del tratto (vedi STRUMENTI).
  function puntoSuFreccia(f, t) {
    return puntoLungoPercorso(f.punti, t);
  }

  // Converte una freccia salvata in un formato precedente (due soli
  // estremi x1,y1,x2,y2, da quando le frecce erano linee rette) nel nuovo
  // formato a percorso di punti, così gli schemi salvati in passato
  // restano compatibili e si aprono/animano correttamente.
  function normalizzaFreccia(f) {
    if (f.punti && f.punti.length) return f;
    return {
      id: f.id,
      tipo: f.tipo,
      gruppo: f.gruppo || null,
      punti: [{ x: f.x1, y: f.y1 }, { x: f.x2, y: f.y2 }]
    };
  }

  function renderFrecce() {
    var gruppo = $('lavArrowGroup');
    var layer = $('lavLayer');
    if (!gruppo || !layer) return;
    gruppo.innerHTML = '';
    layer.querySelectorAll('.lav-step-badge').forEach(function (n) { n.remove(); });

    // Numero di gruppo (1, 2, 3…) solo per le frecce che partono in
    // contemporanea con altre: le frecce singole non hanno più un badge,
    // per non affollare il campo con numeri che indicano solo l'ordine.
    var numeroGruppoPerId = {};
    var contatoreGruppo = 0;
    raggruppaPerPassi(frecce).forEach(function (passo) {
      if (passo.length <= 1) return;
      contatoreGruppo++;
      passo.forEach(function (f) { numeroGruppoPerId[f.id] = contatoreGruppo; });
    });

    frecce.forEach(function (f) {
      var t = STRUMENTI[f.tipo];
      var d = costruisciTracciato(f.punti);
      var selezionata = selezione && selezione.kind === 'freccia' && selezione.id === f.id;

      var visibile = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      visibile.setAttribute('d', d);
      visibile.setAttribute('class', 'lav-freccia-path' + (selezionata ? ' selezionata' : ''));
      visibile.setAttribute('stroke', t.colore);
      visibile.setAttribute('stroke-width', selezionata ? '1.6' : '1.1');
      if (t.dash) visibile.setAttribute('stroke-dasharray', t.dash);
      visibile.setAttribute('marker-end', 'url(#' + t.markerId + ')');
      visibile.setAttribute('vector-effect', 'non-scaling-stroke');

      var hit = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hit.setAttribute('d', d);
      hit.setAttribute('class', 'lav-arrow-hit');
      hit.dataset.id = f.id;
      hit.addEventListener('click', function (ev) {
        ev.stopPropagation();
        selezione = (selezione && selezione.kind === 'freccia' && selezione.id === f.id) ? null : { kind: 'freccia', id: f.id };
        renderTutto();
        aggiornaBottoneElimina();
        aggiornaBottoniGruppo();
      });

      gruppo.appendChild(visibile);
      gruppo.appendChild(hit);

      var numeroGruppo = numeroGruppoPerId[f.id];
      if (numeroGruppo) {
        var puntoMedio = puntoLungoPercorso(f.punti, 0.5);
        var badge = document.createElement('div');
        badge.className = 'lav-step-badge lav-step-badge-sync';
        badge.style.left = puntoMedio.x + '%';
        badge.style.top = puntoMedio.y + '%';
        badge.textContent = String(numeroGruppo);
        layer.appendChild(badge);
      }
    });
  }

  function iniziaDisegnoFreccia(ev, courtWrap, tipo, xFisso, yFisso) {
    if (animazione) return;
    ev.preventDefault();
    ev.stopPropagation();
    var t = STRUMENTI[tipo];
    var rect = courtWrap.getBoundingClientRect();
    var haPuntoFisso = (typeof xFisso === 'number' && typeof yFisso === 'number');
    var xIniziale = haPuntoFisso ? xFisso : clamp(((ev.clientX - rect.left) / rect.width) * 100);
    var yIniziale = haPuntoFisso ? yFisso : clamp(((ev.clientY - rect.top) / rect.height) * 100);

    // Punti campionati durante il trascinamento: la linea segue fedelmente
    // il percorso del dito/mouse invece di essere un segmento retto tra due
    // estremi. Per non accumulare troppi punti ne teniamo uno solo ogni
    // volta che ci si sposta di una distanza minima da quello precedente.
    var punti = [{ x: xIniziale, y: yIniziale }];
    var DISTANZA_MIN_CAMPIONE = 1;

    var gruppo = $('lavArrowGroup');
    var anteprima = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    anteprima.setAttribute('class', 'lav-freccia-path');
    anteprima.setAttribute('stroke', t.colore);
    anteprima.setAttribute('stroke-width', '1.1');
    anteprima.setAttribute('opacity', '0.75');
    if (t.dash) anteprima.setAttribute('stroke-dasharray', t.dash);
    anteprima.setAttribute('marker-end', 'url(#' + t.markerId + ')');
    anteprima.setAttribute('vector-effect', 'non-scaling-stroke');
    anteprima.setAttribute('d', costruisciTracciato(punti));
    gruppo.appendChild(anteprima);

    function muovi(ev2) {
      var r = courtWrap.getBoundingClientRect();
      var x = clamp(((ev2.clientX - r.left) / r.width) * 100);
      var y = clamp(((ev2.clientY - r.top) / r.height) * 100);
      var ultimo = punti[punti.length - 1];
      if (Math.hypot(x - ultimo.x, y - ultimo.y) < DISTANZA_MIN_CAMPIONE) return;
      punti.push({ x: x, y: y });
      anteprima.setAttribute('d', costruisciTracciato(punti));
    }

    function fine() {
      window.removeEventListener('pointermove', muovi);
      window.removeEventListener('pointerup', fine);
      anteprima.remove();

      var lunghezzaTotale = 0;
      for (var i = 1; i < punti.length; i++) {
        lunghezzaTotale += Math.hypot(punti[i].x - punti[i - 1].x, punti[i].y - punti[i - 1].y);
      }

      if (lunghezzaTotale >= 5) {
        var id = idCounter++;
        var nuovaFreccia = { id: id, tipo: tipo, punti: punti, gruppo: null };

        // Se il toggle "Inizia insieme alla freccia precedente" è attivo,
        // agganciamo questa freccia all'ultima disegnata: se quella non fa
        // ancora parte di un gruppo, ne creiamo uno nuovo condiviso da entrambe.
        // Così facendo restano comunque al loro posto nella sequenza generale:
        // partiranno insieme solo quando la riproduzione arriva a quel punto.
        if (sincroAttivo && frecce.length) {
          var precedente = frecce[frecce.length - 1];
          if (!precedente.gruppo) precedente.gruppo = 'g' + precedente.id;
          nuovaFreccia.gruppo = precedente.gruppo;

          // "Consumiamo" subito il toggle: si disattiva da solo appena ha
          // fatto il suo lavoro, così non resta acceso senza che sia chiaro
          // — per collegare più di due frecce basta riattivarlo ogni volta.
          sincroAttivo = false;
          var toggleBtn = $('lavSyncToggle');
          if (toggleBtn) toggleBtn.classList.remove('active');
        }

        frecce.push(nuovaFreccia);
        cronologia.push({ kind: 'freccia', id: id });
        renderTutto();
        aggiornaBottoneAnnulla();
        aggiornaBottoneSync();
      }
    }

    window.addEventListener('pointermove', muovi);
    window.addEventListener('pointerup', fine);
  }

  // ---------------------------------------------------------
  // ▶️ PLAY — animazione dell'azione lungo le frecce
  // ---------------------------------------------------------
  function aggiornaBottonePlay(inCorso) {
    var btn = $('lavPlay');
    if (!btn) return;
    var stoAnimando = (inCorso === true) || !!animazione;
    btn.textContent = stoAnimando ? '⏸ Ferma' : '▶️ Riproduci l\'azione';
    btn.disabled = !stoAnimando && frecce.length === 0;
  }

  function togglePlay() {
    if (animazione) { fermaPlay(); return; }
    if (!frecce.length) return;
    avviaPlay();
  }

  function avviaPlay() {
    selezione = null;
    renderTutto();

    // Istantanea delle posizioni, presa SOLO alla prima riproduzione dopo
    // l'ultima modifica manuale del campo (spostamento/aggiunta/rimozione
    // di un elemento): così "Posizioni iniziali" riporta sempre alla vera
    // disposizione di partenza, anche rigiocando l'azione più volte di fila
    // — prima, ripetendo Play, lo snapshot veniva risovrascritto con le
    // posizioni già spostate dall'ultima riproduzione, e "Posizioni
    // iniziali" non tornava più al punto di partenza reale.
    if (!posizioniPrePlay) {
      posizioniPrePlay = elementi.map(function (e) { return { id: e.id, x: e.x, y: e.y }; });
      aggiornaBottoneRipristina();
    }

    var wrap = $('lavCourtWrap');
    if (wrap) wrap.classList.add('lav-disabilitato');
    animazione = { rafIds: [] };
    aggiornaBottonePlay(true);

    // La sequenza è divisa in "passi": normalmente un passo = una freccia
    // (comportamento invariato), ma le frecce che condividono lo stesso
    // "gruppo" formano un unico passo e vengono animate in contemporanea.
    // Il passo successivo parte solo quando TUTTE le frecce del passo
    // corrente hanno finito, così l'ordine cronologico complessivo
    // dell'azione resta rispettato anche con i movimenti simultanei.
    eseguiSequenza(raggruppaPerPassi(frecce.slice()), 0);
  }

  // Trasforma l'elenco piatto delle frecce (nell'ordine in cui sono state
  // disegnate) in un elenco di "passi": ogni passo è un array di 1+ frecce
  // da eseguire insieme. Tutte le frecce che condividono lo stesso "gruppo"
  // finiscono nello stesso passo — indipendentemente dal fatto che siano
  // state disegnate una dopo l'altra o unite in un secondo momento — e il
  // passo si colloca nel punto della sequenza in cui compare la prima di
  // quelle frecce.
  function raggruppaPerPassi(lista) {
    var passi = [];
    var processate = {};
    lista.forEach(function (f) {
      if (processate[f.id]) return;
      if (f.gruppo) {
        var passo = lista.filter(function (x) { return x.gruppo === f.gruppo; });
        passo.forEach(function (x) { processate[x.id] = true; });
        passi.push(passo);
      } else {
        processate[f.id] = true;
        passi.push([f]);
      }
    });
    return passi;
  }

  function eseguiSequenza(passi, indice) {
    if (!animazione) return; // fermata da fermaPlay()
    if (indice >= passi.length) {
      var wrap = $('lavCourtWrap');
      if (wrap) wrap.classList.remove('lav-disabilitato');
      animazione = null;
      aggiornaBottonePlay(false);
      return;
    }
    eseguiPasso(passi[indice], function () {
      eseguiSequenza(passi, indice + 1);
    });
  }

  // Anima un passo: i movimenti di giocatore (taglio/palleggio) si muovono
  // tutti insieme, ma con UN SOLO ciclo di animazione condiviso — non uno
  // per ciascun giocatore — così anche con tante azioni in contemporanea il
  // campo viene aggiornato una volta sola per fotogramma invece di una
  // volta per ogni movimento: prima, con molte azioni simultanee, i tanti
  // aggiornamenti ridondanti appesantivano il browser fino a farlo sembrare
  // bloccato, costringendo a fermare e riavviare l'azione più volte.
  // I movimenti di palla (passaggio/tiro) restano invece incatenati uno
  // dopo l'altro — sul campo può esserci un solo pallone alla volta.
  // callback() viene richiamata solo quando tutto (giocatori + catena palla)
  // è terminato, così l'ordine generale della sequenza resta rispettato.
  function eseguiPasso(passo, callback) {
    var diGiocatore = passo.filter(function (f) { return STRUMENTI[f.tipo].muove === 'giocatore'; });
    var diPalla = passo.filter(function (f) { return STRUMENTI[f.tipo].muove === 'palla'; });
    var rimanenti = (diGiocatore.length ? 1 : 0) + (diPalla.length ? 1 : 0);
    if (!rimanenti) { callback(); return; }

    function segnalaFine() {
      rimanenti--;
      if (rimanenti === 0) callback();
    }
    if (diGiocatore.length) animaGiocatoriInsieme(diGiocatore, segnalaFine);
    if (diPalla.length) eseguiCatenaPalla(diPalla, 0, segnalaFine);
  }

  // Anima in sequenza (mai in contemporanea) i movimenti di palla di un
  // passo, uno alla volta: al termine di uno parte il successivo.
  function eseguiCatenaPalla(lista, indice, callback) {
    if (indice >= lista.length) { callback(); return; }
    animaPalla(lista[indice], function () {
      eseguiCatenaPalla(lista, indice + 1, callback);
    });
  }

  // Anima lungo il percorso di una freccia da t=0 a t=1, richiamando
  // aggiornaPosizione(punto) ad ogni fotogramma e callback() alla fine.
  function animaPercorso(f, aggiornaPosizione, callback) {
    var inizio = null;
    function frame(timestamp) {
      if (!animazione) return; // fermata durante il frame
      if (!inizio) inizio = timestamp;
      var progresso = Math.min(1, (timestamp - inizio) / DURATA_ANIMAZIONE);
      aggiornaPosizione(puntoSuFreccia(f, progresso));
      if (progresso < 1) {
        animazione.rafIds.push(requestAnimationFrame(frame));
      } else {
        callback();
      }
    }
    animazione.rafIds.push(requestAnimationFrame(frame));
  }

  // Tagli/palleggi di uno stesso passo: per ciascuna freccia cerca il
  // giocatore più vicino alla partenza, ma un giocatore già assegnato a
  // un'altra freccia dello stesso passo non può essere preso di nuovo — con
  // tanti tagli vicini tra loro evita che due frecce "si contendano" lo
  // stesso giocatore, causando movimenti a scatti. Le frecce senza nessun
  // giocatore vicino non muovono nulla (niente pallino fantasma a vuoto).
  // Tutti i giocatori coinvolti si muovono insieme, con un solo
  // aggiornamento del campo per fotogramma.
  function animaGiocatoriInsieme(lista, callback) {
    var giaAssegnati = {};
    var mosse = [];
    lista.forEach(function (f) {
      var partenza = f.punti[0];
      var distanzaMin = 7;
      var elementoAssociato = null;
      elementi.forEach(function (el) {
        if (giaAssegnati[el.id]) return;
        var d = Math.hypot(el.x - partenza.x, el.y - partenza.y);
        if (d < distanzaMin) { distanzaMin = d; elementoAssociato = el; }
      });
      if (elementoAssociato) {
        giaAssegnati[elementoAssociato.id] = true;
        mosse.push({ freccia: f, elemento: elementoAssociato });
      }
    });
    if (!mosse.length) { callback(); return; }

    var inizio = null;
    function frame(timestamp) {
      if (!animazione) return; // fermata durante il frame
      if (!inizio) inizio = timestamp;
      var progresso = Math.min(1, (timestamp - inizio) / DURATA_ANIMAZIONE);
      mosse.forEach(function (m) {
        var p = puntoSuFreccia(m.freccia, progresso);
        m.elemento.x = p.x; m.elemento.y = p.y;
      });
      renderElementi(); // un solo aggiornamento del DOM per fotogramma, qualunque sia il numero di giocatori in movimento
      if (progresso < 1) {
        animazione.rafIds.push(requestAnimationFrame(frame));
      } else {
        callback();
      }
    }
    animazione.rafIds.push(requestAnimationFrame(frame));
  }

  // Passaggio/tiro: mostra un pallino a forma di pallone 🏀 che percorre la
  // freccia, senza mai spostare i giocatori.
  function animaPalla(f, callback) {
    var strumento = STRUMENTI[f.tipo];
    var fantasma = document.createElement('div');
    fantasma.className = 'lav-play-token lav-play-token-palla';
    fantasma.style.setProperty('--lav-colore', strumento.colore);
    fantasma.textContent = '🏀';
    $('lavLayer').appendChild(fantasma);

    animaPercorso(f, function (p) {
      fantasma.style.left = p.x + '%';
      fantasma.style.top = p.y + '%';
    }, function () {
      fantasma.remove();
      callback();
    });
  }

  function fermaPlay() {
    if (!animazione) return;
    if (animazione.rafIds) animazione.rafIds.forEach(function (id) { cancelAnimationFrame(id); });
    animazione = null;
    document.querySelectorAll('.lav-play-token').forEach(function (n) { n.remove(); });
    var wrap = $('lavCourtWrap');
    if (wrap) wrap.classList.remove('lav-disabilitato');
    aggiornaBottonePlay(false);
  }

  function ripristinaPosizioni() {
    if (!posizioniPrePlay) return;
    // Se il Play è ancora in corso, va fermato PRIMA di ripristinare le
    // posizioni: altrimenti l'animazione, che continua a scrivere le
    // coordinate ad ogni fotogramma, sovrascriverebbe di nuovo gli elementi
    // ancora in movimento subito dopo il ripristino (bug: solo gli elementi
    // già fermi tornavano visibilmente al posto giusto).
    fermaPlay();
    posizioniPrePlay.forEach(function (snap) {
      var el = elementi.find(function (e) { return e.id === snap.id; });
      if (el) { el.x = snap.x; el.y = snap.y; }
    });
    renderElementi();
  }

  // ---------------------------------------------------------
  // 💾 SALVATAGGIO SCHEMI (localStorage, solo su questo dispositivo)
  // ---------------------------------------------------------
  function leggiSchemi() {
    try {
      var raw = localStorage.getItem(CHIAVE_STORAGE);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function scriviSchemi(schemi) {
    try { localStorage.setItem(CHIAVE_STORAGE, JSON.stringify(schemi)); } catch (e) { /* storage non disponibile */ }
  }

  function salvaSchema() {
    if (!elementi.length && !frecce.length) return;
    apriRichiediNome(function (nome) {
      if (!nome) return;
      var schemi = leggiSchemi();
      schemi.unshift({ id: Date.now(), nome: nome, data: new Date().toISOString(), elementi: elementi, frecce: frecce });
      scriviSchemi(schemi);
    });
  }

  // Piccola finestra per chiedere il nome dello schema, al posto di prompt()
  // nativo (che in alcuni contesti, come le app salvate in home screen o
  // pagine incorporate, viene bloccato e non appare mai).
  function apriRichiediNome(callback) {
    var nomeDefault = 'Schema ' + new Date().toLocaleDateString('it-IT');
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '320';
    overlay.innerHTML =
      '<div class="modal-box" style="max-width:360px;">' +
        '<h2>💾 Salva schema</h2>' +
        '<p class="lav-hint">Dai un nome a questa azione per ritrovarla in "Schemi salvati".</p>' +
        '<input type="text" id="lavNomeInput" value="' + escapeHtml(nomeDefault) + '" ' +
          'style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:9px;border:1px solid var(--navy-600);background:var(--navy-800);color:var(--cream-100);font-family:\'Work Sans\',sans-serif;font-size:14px;margin:10px 0 14px;">' +
        '<div class="lav-actions">' +
          '<button class="icon-btn" id="lavNomeAnnulla" type="button">Annulla</button>' +
          '<button class="btn-generate" id="lavNomeConferma" type="button" style="flex:1 1 150px;margin-top:0;">Salva</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('#lavNomeInput');
    input.focus();
    input.select();

    function chiudi(valore) {
      overlay.remove();
      callback(valore);
    }

    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) chiudi(null); });
    overlay.querySelector('#lavNomeAnnulla').addEventListener('click', function () { chiudi(null); });
    overlay.querySelector('#lavNomeConferma').addEventListener('click', function () { chiudi(input.value.trim() || nomeDefault); });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') chiudi(input.value.trim() || nomeDefault);
      if (ev.key === 'Escape') chiudi(null);
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function calcolaProssimoId() {
    var max = 0;
    elementi.concat(frecce).forEach(function (o) { if (o.id > max) max = o.id; });
    return max + 1;
  }

  function apriSchemiSalvati() {
    var schemi = leggiSchemi();
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'lavSchemiOverlay';
    overlay.style.zIndex = '310';

    var listaHtml = schemi.length ? schemi.map(function (s, i) {
      var dataStr = new Date(s.data).toLocaleDateString('it-IT');
      return (
        '<div class="storico-item">' +
          '<div class="storico-head"><span>' + escapeHtml(s.nome) + '</span>' +
            '<button class="storico-del" data-idx="' + i + '" type="button" aria-label="Elimina">✕</button>' +
          '</div>' +
          '<p>' + dataStr + ' · ' + s.elementi.length + ' elementi, ' + s.frecce.length + ' frecce</p>' +
          '<div class="storico-actions">' +
            '<button class="icon-btn" data-carica="' + i + '" type="button">📂 Carica</button>' +
            '<button class="icon-btn" data-condividi="' + i + '" type="button">↗ Condividi PDF</button>' +
          '</div>' +
        '</div>'
      );
    }).join('') : '<div class="empty-state"><p>Non hai ancora salvato nessuno schema.</p></div>';

    overlay.innerHTML =
      '<div class="modal-box">' +
        '<h2>📂 Schemi salvati</h2>' +
        listaHtml +
        '<div class="modal-close-row"><button class="icon-btn" id="lavSchemiChiudi" type="button">Chiudi</button></div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) overlay.remove(); });
    overlay.querySelector('#lavSchemiChiudi').addEventListener('click', function () { overlay.remove(); });

    overlay.querySelectorAll('[data-carica]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.carica, 10);
        var s = schemi[idx];
        if (!s) return;
        fermaPlay();
        elementi = JSON.parse(JSON.stringify(s.elementi));
        frecce = JSON.parse(JSON.stringify(s.frecce)).map(normalizzaFreccia);
        idCounter = calcolaProssimoId();
        cronologia = [];
        selezione = null;
        posizioniPrePlay = null;
        sincroAttivo = false;
        renderTutto();
        aggiornaBarraCompleta();
        overlay.remove();
      });
    });

    overlay.querySelectorAll('[data-condividi]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.condividi, 10);
        var s = schemi[idx];
        if (!s) return;
        condividiSchemaGenerico(s.elementi, s.frecce, s.nome);
      });
    });

    overlay.querySelectorAll('.storico-del').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var idx = parseInt(btn.dataset.idx, 10);
        schemi.splice(idx, 1);
        scriviSchemi(schemi);
        overlay.remove();
        apriSchemiSalvati();
      });
    });
  }

  // ---------------------------------------------------------
  // ↗ PDF E CONDIVISIONE DELLO SCHEMA (PARTE 4/4)
  //   Stesso schema di condivisione usato in script.js: jsPDF (già
  //   caricato da index.html) per costruire il PDF, poi navigator.share
  //   se disponibile (allegato pronto per WhatsApp ecc.), altrimenti
  //   download diretto sul dispositivo tramite la scaricaBlob() globale.
  // ---------------------------------------------------------

  function slugSchema(nome) {
    return (nome || 'schema').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'schema';
  }

  function tipiUsati(lista) {
    var visti = {}, out = [];
    lista.forEach(function (o) { if (!visti[o.tipo]) { visti[o.tipo] = true; out.push(o.tipo); } });
    var ordine = Object.keys(STRUMENTI);
    out.sort(function (a, b) { return ordine.indexOf(a) - ordine.indexOf(b); });
    return out;
  }

  // Disegna un arco di cerchio (usato per la linea dei 3 punti) come
  // sequenza di segmenti, dato il centro e il raggio nello spazio 300x440
  // del campo, e la funzione che converte quelle coordinate in mm sul PDF.
  function disegnaArcoPDF(doc, pxFn, cx, cy, r, angStartDeg, angEndDeg) {
    var segmenti = 22, prev = null;
    for (var i = 0; i <= segmenti; i++) {
      var ang = angStartDeg + (angEndDeg - angStartDeg) * (i / segmenti);
      var rad = ang * Math.PI / 180;
      var p = pxFn(cx + r * Math.cos(rad), cy + r * Math.sin(rad));
      if (prev) doc.line(prev[0], prev[1], p[0], p[1]);
      prev = p;
    }
  }

  // Disegna una freccia (linea spezzata secondo i punti disegnati a mano
  // libera) con una piccola punta triangolare finale, nello stesso stile
  // (continua/tratteggiata/a trattini/puntinata) usato nell'editor.
  function disegnaFrecciaPDF(doc, puntiPx, colore, dash) {
    if (puntiPx.length < 2) return;
    doc.setDrawColor(colore[0], colore[1], colore[2]);
    doc.setLineWidth(0.7);
    if (doc.setLineDashPattern) doc.setLineDashPattern(dash || [], 0);
    for (var i = 0; i < puntiPx.length - 1; i++) {
      doc.line(puntiPx[i][0], puntiPx[i][1], puntiPx[i + 1][0], puntiPx[i + 1][1]);
    }
    if (doc.setLineDashPattern) doc.setLineDashPattern([], 0);

    var a = puntiPx[puntiPx.length - 2], b = puntiPx[puntiPx.length - 1];
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= len; dy /= len;
    var perpX = -dy, perpY = dx, size = 2.6;
    var backX = b[0] - dx * size, backY = b[1] - dy * size;
    doc.setFillColor(colore[0], colore[1], colore[2]);
    doc.triangle(
      b[0], b[1],
      backX + perpX * size * 0.45, backY + perpY * size * 0.45,
      backX - perpX * size * 0.45, backY - perpY * size * 0.45,
      'F'
    );
  }

  function disegnaLegendaPDF(doc, elementiArr, frecceArr, marginX, pageW, y) {
    var tipiEl = tipiUsati(elementiArr), tipiFr = tipiUsati(frecceArr);
    if (!tipiEl.length && !tipiFr.length) return y;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(23, 42, 34);
    doc.text('Legenda', marginX, y);
    y += 5.5;

    var legMax = pageW - marginX, legX = marginX;
    doc.setFontSize(8.5);

    tipiEl.forEach(function (tipo) {
      var col = COLORE_PDF[tipo] || [140, 150, 145];
      var etichetta = STRUMENTI[tipo].label;
      var w = doc.getTextWidth(etichetta) + 12;
      if (legX + w > legMax) { legX = marginX; y += 6.5; }
      doc.setFillColor(col[0], col[1], col[2]);
      doc.circle(legX + 2, y - 1.3, 2, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(255, 255, 255);
      var lettera = LETTERA_PDF[tipo] || '?';
      doc.text(lettera, legX + 2 - doc.getTextWidth(lettera) / 2, y - 1.0);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(95, 105, 100);
      doc.text(etichetta, legX + 7, y);
      legX += w;
    });

    tipiFr.forEach(function (tipo) {
      var col = COLORE_PDF[tipo] || [140, 150, 145];
      var etichetta = STRUMENTI[tipo].label;
      var w = doc.getTextWidth(etichetta) + 14;
      if (legX + w > legMax) { legX = marginX; y += 6.5; }
      doc.setDrawColor(col[0], col[1], col[2]);
      doc.setLineWidth(0.8);
      if (doc.setLineDashPattern) doc.setLineDashPattern(DASH_PDF[tipo] || [], 0);
      doc.line(legX, y - 1.3, legX + 7, y - 1.3);
      if (doc.setLineDashPattern) doc.setLineDashPattern([], 0);
      doc.setTextColor(95, 105, 100);
      doc.text(etichetta, legX + 9, y);
      legX += w;
    });

    return y + 6;
  }

  // Ricostruisce lo schema (campo + elementi + frecce + legenda) come PDF,
  // con lo stesso stile grafico (header navy/orange, card crema) usato
  // dagli altri PDF dell'app in script.js.
  function costruisciPDFSchema(elementiArr, frecceArr, nomeSchema) {
    var jsPDFCtor = window.jspdf ? window.jspdf.jsPDF : null;
    if (!jsPDFCtor) return null;
    var doc = new jsPDFCtor({ unit: 'mm', format: 'a4' });
    var pageW = doc.internal.pageSize.getWidth();
    var pageH = doc.internal.pageSize.getHeight();
    var marginX = 16, headerH = 30;

    var COL_NAVY = [15, 29, 23], COL_ORANGE = [201, 150, 46], COL_ORANGE_LIGHT = [231, 197, 122];
    var COL_CREAM = [243, 239, 222], COL_CARD = [250, 247, 238], COL_CARD_BORDER = [225, 220, 200];
    var COL_LINEE = [170, 175, 170];

    doc.setFillColor(COL_NAVY[0], COL_NAVY[1], COL_NAVY[2]);
    doc.rect(0, 0, pageW, headerH, 'F');
    doc.setFillColor(COL_ORANGE[0], COL_ORANGE[1], COL_ORANGE[2]);
    doc.rect(0, headerH, pageW, 1.1, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(17); doc.setTextColor(COL_CREAM[0], COL_CREAM[1], COL_CREAM[2]);
    doc.text('Schema tattico — '+CONFIG.coach.nome, marginX, 14);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(COL_ORANGE_LIGHT[0], COL_ORANGE_LIGHT[1], COL_ORANGE_LIGHT[2]);
    doc.text(nomeSchema, marginX, 22);
    doc.setFontSize(8.5); doc.setTextColor(COL_CREAM[0], COL_CREAM[1], COL_CREAM[2]);
    var oggiStr = (new Date()).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    doc.text('Generato il ' + oggiStr + ' · ' + elementiArr.length + ' elementi, ' + frecceArr.length + ' frecce', marginX, 28.5);

    var top = headerH + 10, bottomLimit = pageH - 38;
    var scale = Math.min((pageW - marginX * 2) / 300, (bottomLimit - top) / 440);
    var courtW = 300 * scale, courtH = 440 * scale;
    var courtX = (pageW - courtW) / 2, courtY = top;
    function px(vx, vy) { return [courtX + vx * scale, courtY + vy * scale]; }
    function pxPct(px_, py_) { return [courtX + (px_ / 100) * courtW, courtY + (py_ / 100) * courtH]; }

    doc.setFillColor(COL_CARD[0], COL_CARD[1], COL_CARD[2]);
    doc.setDrawColor(COL_CARD_BORDER[0], COL_CARD_BORDER[1], COL_CARD_BORDER[2]);
    doc.roundedRect(courtX - 4, courtY - 4, courtW + 8, courtH + 8, 3, 3, 'FD');

    doc.setDrawColor(COL_LINEE[0], COL_LINEE[1], COL_LINEE[2]);
    doc.setLineWidth(0.35);
    var p1 = px(4, 4);
    doc.roundedRect(p1[0], p1[1], 292 * scale, 432 * scale, 10 * scale, 10 * scale, 'S');
    var p2 = px(95, 4);
    doc.rect(p2[0], p2[1], 110 * scale, 120 * scale, 'S');
    var c1 = px(150, 124);
    doc.circle(c1[0], c1[1], 42 * scale, 'S');
    var l1a = px(34, 4), l1b = px(34, 132);
    doc.line(l1a[0], l1a[1], l1b[0], l1b[1]);
    var l2a = px(266, 4), l2b = px(266, 132);
    doc.line(l2a[0], l2a[1], l2b[0], l2b[1]);
    disegnaArcoPDF(doc, px, 150, 80.34, 127, 156, 24);
    // Il cerchio di metà campo è centrato sulla linea di fondo (440), ma
    // quella linea è disegnata a 436 (rect campo: y=4, altezza=432): senza
    // questo calcolo il semicerchio sconfinerebbe di 4 unità oltre il bordo.
    // Si calcolano quindi i due punti in cui il cerchio tocca la linea 436,
    // e si disegna solo l'arco fra quei due punti (passando per l'alto).
    var raggioMetaCampo = 42, centroMetaCampoY = 440, lineaFondoY = 436;
    var deltaY = lineaFondoY - centroMetaCampoY;
    var deltaX = Math.sqrt(Math.max(raggioMetaCampo * raggioMetaCampo - deltaY * deltaY, 0));
    var angA = Math.atan2(deltaY, -deltaX) * 180 / Math.PI; if (angA < 0) angA += 360;
    var angB = Math.atan2(deltaY, deltaX) * 180 / Math.PI; if (angB < 0) angB += 360;
    disegnaArcoPDF(doc, px, 150, centroMetaCampoY, raggioMetaCampo, angA, angB);
    doc.setFillColor(COL_ORANGE[0], COL_ORANGE[1], COL_ORANGE[2]);
    var hoop = px(150, 34);
    doc.circle(hoop[0], hoop[1], Math.max(4.5 * scale, 0.8), 'F');
    doc.setDrawColor(COL_ORANGE[0], COL_ORANGE[1], COL_ORANGE[2]);
    doc.setLineWidth(Math.max(1.1 * scale, 0.5));
    var b1 = px(118, 22), b2 = px(182, 22);
    doc.line(b1[0], b1[1], b2[0], b2[1]);
    doc.setLineWidth(0.35);
    doc.setDrawColor(COL_LINEE[0], COL_LINEE[1], COL_LINEE[2]);

    frecceArr.forEach(function (f) {
      var punti = (f.punti && f.punti.length) ? f.punti : [{ x: f.x1, y: f.y1 }, { x: f.x2, y: f.y2 }];
      disegnaFrecciaPDF(doc, punti.map(function (p) { return pxPct(p.x, p.y); }), COLORE_PDF[f.tipo] || [140, 150, 145], DASH_PDF[f.tipo]);
    });

    elementiArr.forEach(function (el) {
      var col = COLORE_PDF[el.tipo] || [140, 150, 145];
      var pos = pxPct(el.x, el.y);
      var r = Math.max(3.2 * scale, 2.2);
      doc.setFillColor(COL_NAVY[0], COL_NAVY[1], COL_NAVY[2]);
      doc.setDrawColor(col[0], col[1], col[2]);
      doc.setLineWidth(0.6);
      doc.circle(pos[0], pos[1], r, 'FD');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(Math.max(6.5, 9 * scale)); doc.setTextColor(col[0], col[1], col[2]);
      var lettera = LETTERA_PDF[el.tipo] || '?';
      doc.text(lettera, pos[0] - doc.getTextWidth(lettera) / 2, pos[1] + r * 0.35);
    });

    disegnaLegendaPDF(doc, elementiArr, frecceArr, marginX, pageW, bottomLimit + 6);

    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(150, 155, 165);
    doc.text(CONFIG.app.pdfFooterPrefix+' '+CONFIG.coach.nome+' — lavagna tattica', marginX, pageH - 9);

    return doc;
  }

  // Condivide (o scarica) il PDF di uno schema qualsiasi: quello disegnato
  // al momento o uno recuperato da "Schemi salvati".
  function condividiSchemaGenerico(elementiArr, frecceArr, nomeSchema) {
    var doc = costruisciPDFSchema(elementiArr, frecceArr, nomeSchema);
    if (!doc) { showToast('PDF non disponibile, riprova tra poco'); return; }
    var dataFile = new Date().toISOString().slice(0, 10);
    var filename = 'schema-tattico-' + slugSchema(nomeSchema) + '-' + dataFile + '.pdf';
    var blob = doc.output('blob');
    var file = null;
    try { file = new File([blob], filename, { type: 'application/pdf' }); } catch (e) { file = null; }

    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: 'Schema tattico — ' + nomeSchema,
        text: 'Schema tattico ' + CONFIG.sport.nome + ' — ' + nomeSchema
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        scaricaBlob(blob, filename);
        showToast('PDF scaricato — allegalo su WhatsApp');
      });
      return;
    }
    scaricaBlob(blob, filename);
    showToast('PDF scaricato — allegalo su WhatsApp');
  }

  function condividiSchemaCorrente() {
    if (!elementi.length && !frecce.length) return;
    condividiSchemaGenerico(elementi, frecce, 'Schema ' + new Date().toLocaleDateString('it-IT'));
  }

  // ---------------------------------------------------------
  // AVVIO
  // ---------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', creaBottoneHeader);
  } else {
    creaBottoneHeader();
  }

})();
