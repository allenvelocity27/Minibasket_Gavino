/* ============================================================
   CONFIG — MiniBasket Planner / template multi-coach
   Un solo file da toccare per creare la versione di un nuovo coach.
   Deve essere incluso PRIMA di script.js, lavagna-tattica.js e
   sorteggio-squadre.js:
     <script src="config.js"></script>
     <script src="lavagna-tattica.js"></script>
     ...

   NOTA IMPORTANTE (limite di questo file):
   la "lavagna tattica" (lavagna-tattica.js) disegna un campo da
   basket vero e proprio (linee, canestro) via SVG hard-coded: per
   uno sport diverso da pallacanestro quel modulo andrà riscritto,
   non basterà cambiare i dati qui dentro. Questo config copre solo
   identità, tassonomia esercizi e colori.
   ============================================================ */

const CONFIG = {

  /* ---------- IDENTITÀ ---------- */
  coach: {
    nome: 'Gavino',
    // usato per saluti dinamici in base all'ora (mattina/sera/notte)
  },
  sport: {
    nome: 'minibasket',
    slug: 'minibasket', // usato nei nomi dei file PDF: allenamento-{slug}-...
    nomeAllenamento: 'Allenamento minibasket', // usato in titoli/PDF
    badge: "Esercizi in stile minibasket FIP",  // sottotitolo in header
  },
  app: {
    titolo: 'MiniBasket Planner',
    tagline: "Età, obiettivo, tempo e materiali. Allenamento a portata di telefono.",
    // il nome del coach NON va ripetuto qui: si compone sempre da coach.nome,
    // così per una nuova versione basta cambiare quel singolo campo
    footerCreditsSuffix: 'nessun dato lascia questo file.', // → "Fatto su misura per {coach} — {suffix}"
    pdfFooterPrefix: 'Generata con il tool personale di',   // → "{prefix} {coach}"
    // prefisso usato per le chiavi di localStorage (cronologia, feedback,
    // roster, sorteggio). Deve essere diverso per ogni coach: se più
    // versioni sono ospitate sotto lo stesso dominio (es. github.io),
    // stessa origine = stesso localStorage, e i dati si mescolerebbero.
    storageId: 'gavino',
  },

  /* ---------- ROSTER INIZIALE (elenco ragazzi) ----------
     Vuoto di proposito: i nomi dei ragazzi sono dati sensibili (minori)
     e non vanno messi qui né in nessun file caricato su un repository
     pubblico. Il coach li aggiunge dall'app stessa (pannello "Feedback
     coach" o "Sorteggio squadre"): da quel momento restano salvati solo
     nel localStorage del suo browser, mai in un file. */
  roster: {
    iniziale: [],
  },

  /* ---------- COLORI (rispecchia le custom properties di style.css) ---------- */
  colori: {
    navy900: '#0F1D17',
    navy850: '#142821',
    navy800: '#1A342A',
    navy700: '#234536',
    navy600: '#2E5A45',
    orange500: '#C9962E',
    orange400: '#D9AB4E',
    orange300: '#E7C57A',
    cream100: '#F3EFDE',
    cream200: '#E3DCC2',
    slate400: '#8FA69B',
    slate300: '#B7C9BE',
    green500: '#4C9A6A',
    teal400: '#6FA8D9',
    purple400: '#B79CE0',
    red400: '#C1665A',
  },

  /* ---------- TASSONOMIA ---------- */
  bande: ['pulcini', 'aquilotti'],
  fasciaInfo: {
    pulcini:   { nome: 'Pulcini',   eta: '5-6' },
    aquilotti: { nome: 'Aquilotti', eta: '7-9' },
  },
  obiettivi: ['palleggio', 'tiro', 'passaggio', 'coordinazione', 'difesa', 'gioco di squadra'],
  materiali: ['palla', 'canestro', 'coni', 'cerchi', 'aste', 'sedie'],

  /* ---------- ESERCIZI ----------
     Forma di ogni voce (invariata rispetto a script.js):
     { id, nome, fase, bande[], obiettivi[], materiali[], durata:[min,max],
       diagram, descrizione, varianti[] }
     Migrazione completa: tutti i 220 esercizi originali di script.js,
     copiati 1:1 (nessuna riscrittura a mano). Il campo "diagram" fa
     riferimento ai nomi in DIAGRAMS dentro script.js/lavagna-tattica.js:
     quella parte resta lì, non è ancora config-izzata (vedi nota
     in cima al file). */
  esercizi: [
    {id:'semaforo', nome:'Il semaforo', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"I bambini corrono liberi nello spazio. Al tuo segnale vocale o visivo (rosso = stop, verde = corri, giallo = cammina) devono reagire il più in fretta possibile.",
     varianti:["Aggiungi il colore blu per saltare sul posto","Chiedi di toccare terra con una mano prima di ripartire"]},
  
    {id:'palleggio-libero', nome:'Palleggio libero nello spazio', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,10], diagram:'palleggio-libero',
     descrizione:"Ogni bambino palleggia muovendosi liberamente nello spazio, provando a non guardare la palla e a evitare i compagni.",
     varianti:["Alterna mano destra e sinistra al fischio","Aggiungi cambi di direzione a comando"]},
  
    {id:'slalom-coni', nome:'Slalom tra le aste', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','aste'], durata:[8,12], diagram:'aste-slalom',
     descrizione:"Disponi 5-6 aste in linea a zigzag, infilate nei coni di base. Il bambino palleggia superando ogni asta, cambiando mano quando serve e stringendo il palleggio negli spazi più angusti.",
     varianti:["Cronometra il tempo di percorrenza","Richiedi di usare solo la mano debole"]},
  
    {id:'cambio-mano-coni', nome:'Cambio di mano alle aste', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','aste'], durata:[8,12], diagram:'aste-linea',
     descrizione:"Aste in linea retta a circa 2 metri di distanza, inserite nei coni di base. Ad ogni asta il bambino esegue un cambio di mano (davanti, incrociato o dietro la schiena in base al livello).",
     varianti:["Solo cambio davanti per i più piccoli","Aggiungi una finta di tiro ad ogni asta per i più grandi"]},
  
    {id:'percorso-cerchi', nome:'Percorso nei cerchi', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[6,10], diagram:'cerchi-percorso',
     descrizione:"Disponi i cerchi a terra in fila. I bambini li attraversano saltando a piedi uniti, poi alternando i piedi.",
     varianti:["Aggiungi la palla in mano durante il percorso","Fai il percorso a coppie tenendosi per mano"]},
  
    {id:'staffetta-coppie', nome:'Staffetta a coppie', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla','coni'], durata:[8,12], diagram:'staffetta',
     descrizione:"Due squadre in fila davanti a un cono lontano. A coppie, palleggiano fino al cono, si scambiano la palla e tornano passandola al compagno successivo.",
     varianti:["Aggiungi un giro completo attorno al cono","Richiedi il passaggio schiacciato a terra"]},
  
    {id:'passaggio-fermo', nome:'Passaggio a coppie da fermi', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"A coppie, a circa 3 metri di distanza, i bambini si passano la palla a due mani al petto, curando l'appoggio dei piedi.",
     varianti:["Aumenta la distanza progressivamente","Introduci il passaggio schiacciato a terra"]},
  
    {id:'passaggio-specchio', nome:'Passaggio a specchio in movimento', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio','coordinazione'], materiali:['palla'], durata:[8,12], diagram:'coppie-passaggio',
     descrizione:"A coppie, si spostano lateralmente lungo il campo mantenendo la distanza e continuando a passarsi la palla senza farla cadere.",
     varianti:["Aggiungi uno scatto in avanti ogni 3 passaggi","Usa due palloni insieme per i più esperti"]},
  
    {id:'tiro-fermo', nome:'Tiro a canestro da fermo', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"A turno, i bambini tirano a canestro da distanza ravvicinata, curando la posizione dei piedi e l'accompagnamento del braccio.",
     varianti:["Abbassa il canestro se possibile","Assegna un punto per ogni canestro consecutivo"]},
  
    {id:'percorso-tiro', nome:'Percorso con tiro finale', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','palleggio'], materiali:['palla','coni','canestro'], durata:[10,15], diagram:'percorso-tiro',
     descrizione:"Il bambino palleggia tra i coni fino ad arrivare sotto canestro, si ferma e conclude con un tiro o un terzo tempo.",
     varianti:["Aggiungi un difensore passivo negli ultimi due metri","Cronometra il giro completo"]},
  
    {id:'gara-tiro', nome:'Gara a punti', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Dividi in squadre. Ogni canestro segnato vale un punto, ogni squadra ha un minuto di tempo per accumulare più punti possibile.",
     varianti:["Il canestro da lontano vale doppio","Richiedi un passaggio obbligatorio prima del tiro"]},
  
    {id:'difesa-specchio', nome:'Difesa a specchio', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:[], durata:[6,10], diagram:'difesa-specchio',
     descrizione:"A coppie, uno comanda muovendosi lateralmente, l'altro lo segue restando in posizione difensiva bassa senza incrociare i piedi.",
     varianti:["Aggiungi spostamenti avanti-indietro","Cambia i ruoli ogni 30 secondi"]},
  
    {id:'uno-contro-uno', nome:'1 contro 1 al canestro', fase:'gioco', bande:['aquilotti'], obiettivi:['difesa','gioco di squadra'], materiali:['palla','canestro'], durata:[8,12], diagram:'uno-contro-uno',
     descrizione:"A coppie, un attaccante parte con la palla a centrocampo e cerca di segnare, il difensore prova a fermarlo senza contatto.",
     varianti:["Limita l'attaccante a 3 palleggi","Dai un tempo massimo di 10 secondi per tirare"]},
  
    {id:'rubapalla', nome:'Rubapalla a coppie', fase:'gioco', bande:['aquilotti'], obiettivi:['difesa'], materiali:['palla'], durata:[6,10], diagram:'difesa-specchio',
     descrizione:"A coppie, uno palleggia cercando di proteggere la palla con il corpo, l'altro cerca di toccarla senza fare fallo.",
     varianti:["Delimita uno spazio piccolo per aumentare la difficoltà","Alterna i ruoli ogni 20 secondi"]},
  
    {id:'percorso-misto', nome:'Percorso misto coni e cerchi', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['coni','cerchi'], durata:[8,12], diagram:'percorso-misto',
     descrizione:"Alterna coni da aggirare e cerchi in cui saltare, creando un percorso da ripetere più volte cronometrando i tempi.",
     varianti:["Aggiungi la palla in mano lungo il percorso","Fai gareggiare due bambini in parallelo"]},
  
    {id:'cacciatore', nome:'Il cacciatore', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Uno o due 'cacciatori' senza palla cercano di toccare i compagni che palleggiano liberi nello spazio. Chi viene toccato diventa cacciatore.",
     varianti:["Riduci lo spazio di gioco per renderlo più intenso","Chi perde la palla diventa cacciatore"]},
  
    {id:'palla-centro', nome:'Palla al centro', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Due squadre in cerchio, con un bambino al centro per squadra. Il gruppo deve far arrivare la palla al proprio compagno al centro passandosela senza farla intercettare.",
     varianti:["Vieta i passaggi al compagno accanto","Aggiungi un secondo pallone"]},
  
    {id:'torello', nome:'Torello', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Il gruppo forma un cerchio e si passa la palla, uno o due bambini al centro cercano di intercettarla.",
     varianti:["Limita a due tocchi per bambino","Riduci il cerchio per aumentare la difficoltà"]},
  
    {id:'equilibrio-linea', nome:'Equilibrio sulla linea', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"I bambini camminano su una linea del campo mettendo un piede davanti all'altro, con le braccia aperte per l'equilibrio.",
     varianti:["Chiedi di camminare all'indietro","Aggiungi un piccolo oggetto da trasportare in equilibrio"]},
  
    {id:'scaletta-coordinativa', nome:'Saltelli coordinativi', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[6,10], diagram:'scaletta-coordinativa',
     descrizione:"Con una scaletta a terra (o disegnata con il nastro), i bambini eseguono sequenze di saltelli a piedi uniti, alternati e laterali.",
     varianti:["Aggiungi la palla da passare durante i saltelli","Cronometra ogni sequenza per farla diventare una sfida"]},
  
    {id:'stazioni-miste', nome:'Circuito a stazioni', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','tiro','coordinazione'], materiali:['palla','coni','cerchi','canestro'], durata:[15,20], diagram:'percorso-misto',
     descrizione:"Organizza 3-4 stazioni (palleggio tra i coni, passaggio al muro, tiro, coordinazione nei cerchi) e fai ruotare i gruppi ogni 3-4 minuti.",
     varianti:["Aggiungi una stazione difensiva","Trasforma il circuito in una gara a punti tra gruppi"]},
  
    {id:'partitella-finale', nome:'Partitella finale', fase:'chiusura', bande:['aquilotti'], obiettivi:['gioco di squadra'], materiali:['palla','canestro'], durata:[10,15], diagram:'campo-partita',
     descrizione:"Chiudi l'allenamento con una partita libera a squadre, valorizzando il divertimento più del risultato.",
     varianti:["Regola speciale: ogni bambino deve toccare la palla prima del tiro","Cambia le squadre a metà partita"]},
  
    {id:'saluto-finale', nome:'Stretching e saluto', fase:'chiusura', bande:['pulcini','aquilotti'], obiettivi:[], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"Cerchio finale seduti, qualche respiro profondo e un breve commento positivo sull'allenamento con tutta la squadra.",
     varianti:["Chiedi a ogni bambino di dire una cosa che gli è piaciuta","Introduci un piccolo rito fisso di chiusura (grido di squadra, mani al centro)"]},
  
    {id:'statue-palleggio', nome:'Le statue col palleggio', fase:'riscaldamento', bande:['pulcini'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano muovendosi liberamente; quando la musica si ferma, devono restare immobili come statue senza perdere la palla.",
     varianti:["Chi perde la palla o si muove fa un piccolo esercizio extra (5 saltelli)","Aggiungi pose buffe da mantenere durante lo stop"]},
  
    /* ---- RISCALDAMENTO extra ---- */
    {id:'corsa-colori', nome:'Corsa a colori', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[4,6], diagram:'corsa-libera',
     descrizione:"I bambini corrono nello spazio e, al colore che chiami, devono toccare un oggetto o una linea di quel colore nel campo.",
     varianti:["Usa i colori delle linee del campo","Aggiungi un'andatura diversa per ogni colore"]},
  
    {id:'gatto-topo', nome:'Il gatto e il topo a coppie', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"A coppie, un bambino insegue l'altro in uno spazio delimitato per 20-30 secondi, poi si scambiano i ruoli.",
     varianti:["Riduci lo spazio per aumentare l'intensità","Aggiungi una zona salva dove non si può essere presi"]},
  
    {id:'palleggio-saluto', nome:'Palleggio e saluto', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano muovendosi liberamente e, quando si incrociano con un compagno, si salutano a voce senza smettere di palleggiare.",
     varianti:["Il saluto deve avvenire con la mano debole libera", "Aggiungi un batti-cinque veloce nell'incrocio"]},
  
    {id:'mobilita-guidata', nome:'Mobilità articolare guidata', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"In cerchio, guida i bambini in una breve sequenza di movimenti articolari (caviglie, ginocchia, braccia, collo) imitando i tuoi gesti.",
     varianti:["Fai fare a turno a un bambino la guida della sequenza","Trasformalo in un piccolo gioco di imitazione a specchio"]},
  
    {id:'corsa-palla-mano', nome:'Corsa con la palla in mano', fase:'riscaldamento', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['palla'], durata:[4,6], diagram:'corsa-libera',
     descrizione:"I bambini corrono liberi nello spazio tenendo la palla con due mani, passandosela da una mano all'altra mentre corrono.",
     varianti:["Aggiungi un cambio di direzione al fischio","Chiedi di passare la palla dietro la schiena mentre corrono"]},
  
    {id:'cambio-posto-fila', nome:'Doppia fila, cambio di sedia', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['coordinazione','gioco di squadra'], materiali:['sedie'], durata:[5,7], diagram:'staffetta',
     descrizione:"Due file una di fronte all'altra, ciascuna con una sedia accanto: al tuo segnale, ogni bambino corre a sedersi sulla sedia opposta senza scontrarsi con i compagni.",
     varianti:["Aggiungi un battito di mani prima di sedersi","Cronometra i cambi per farne una piccola sfida"]},
  
    /* ---- TECNICA: PALLEGGIO extra ---- */
    {id:'palleggio-alto-basso', nome:'Palleggio fermo, alto e basso', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Da fermo, il bambino palleggia prima all'altezza della vita, poi sempre più basso, restando in equilibrio.",
     varianti:["Alterna mano destra e sinistra ogni 5 palleggi","Chiedi di guardarti in faccia mentre palleggia basso"]},
  
    {id:'palleggio-seduto', nome:'Palleggio da seduti', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Seduti a terra, i bambini palleggiano a fianco del corpo curando solo il tocco della palla con le dita.",
     varianti:["Prova la mano debole per metà tempo","Passa poi in ginocchio come step intermedio"]},
  
    {id:'palleggio-camminando', nome:'Palleggio camminando', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini camminano lentamente per il campo mantenendo un palleggio controllato, senza rincorrere la palla.",
     varianti:["Aggiungi una linea da seguire con i piedi","Chiedi di alzare lo sguardo verso di te ogni tanto"]},
  
    {id:'palleggio-ostacoli-bassi', nome:'Palleggio con ostacoli bassi', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['coni','aste'], durata:[8,10], diagram:'coni-zigzag',
     descrizione:"Disponi coni bassi in fila: il bambino li supera palleggiando, alzando leggermente il ritmo del palleggio a ogni passaggio.",
     varianti:["Aumenta la distanza tra i coni per la velocità","Riducila per lavorare sul controllo stretto","In alternativa ai coni puoi usare le aste: il passaggio più stretto rende il palleggio ancora più impegnativo"]},
  
    {id:'doppio-palleggio', nome:'Doppio palleggio (due palle)', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[6,10], diagram:'palleggio-libero',
     descrizione:"Il bambino palleggia contemporaneamente due palloni, uno per mano, prima da fermo poi camminando.",
     varianti:["Prova palleggi alternati invece che simultanei","Aggiungi un piccolo spostamento laterale"]},
  
    {id:'palleggio-rettilineo', nome:'Palleggio in corsa rettilinea', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['coni','aste'], durata:[6,10], diagram:'coni-linea',
     descrizione:"Due coni segnano partenza e arrivo: il bambino palleggia in velocità da un cono all'altro mantenendo il controllo.",
     varianti:["Cronometra e sfida il tempo precedente","Richiedi il cambio di mano a metà percorso","Prova a ripetere l'esercizio con le aste al posto dei coni per stringere lo spazio di manovra"]},
  
    {id:'palleggio-stop', nome:'Palleggio e stop a comando', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano muovendosi liberamente; al tuo fischio devono fermarsi immediatamente senza perdere il controllo della palla.",
     varianti:["Aggiungi la posizione di triple minaccia allo stop","Richiedi un piede perno fisso durante lo stop"]},
  
    {id:'gara-palleggio-tempo', nome:'Gara di palleggio a tempo', fase:'gioco', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','coni','aste'], durata:[6,8], diagram:'coni-zigzag',
     descrizione:"A squadre, ogni bambino a turno percorre lo slalom tra i coni palleggiando: vince la squadra col tempo totale minore.",
     varianti:["Aggiungi una penalità di tempo se il pallone cade","Richiedi il cambio di mano a metà slalom","Sostituisci metà dei coni con le aste per obbligare a un controllo di palla più fine"]},
  
    /* ---- TECNICA: TIRO extra ---- */
    {id:'tiro-seduti', nome:'Tiro da seduti', fase:'tecnica', bande:['pulcini'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[5,8], diagram:'tiro-canestro',
     descrizione:"Seduti vicino a canestro, i bambini lavorano solo sul gesto del braccio e del polso, senza preoccuparsi delle gambe.",
     varianti:["Usa un canestro basso o un cerchio a muro","Conta quanti tocchi consecutivi del ferro riescono a fare"]},
  
    {id:'tiro-coppie-recupero', nome:'Tiro a coppie con recupero palla', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"A coppie sotto canestro, uno tira e l'altro recupera il rimbalzo e passa la palla per il tiro successivo, poi si scambiano.",
     varianti:["Aggiungi un punto extra per ogni rimbalzo preso al volo","Alterna angoli di tiro diversi"]},
  
    {id:'tiro-dopo-palleggio', nome:'Tiro dopo palleggio', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','palleggio'], materiali:['palla','canestro'], durata:[8,12], diagram:'percorso-tiro',
     descrizione:"Il bambino parte con la palla a qualche metro da canestro, esegue 2-3 palleggi di avvicinamento e conclude a canestro.",
     varianti:["Aggiungi un tempo massimo per la conclusione","Richiedi di partire da lati diversi del canestro"]},
  
    {id:'bersaglio-punti', nome:'Bersaglio a canestro con punti', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Assegna punti diversi a 3 posizioni di tiro attorno a canestro: ogni bambino tira una volta da ciascuna e somma i punti.",
     varianti:["Fai fare due giri per aumentare la sfida","Gioca a squadre sommando i punti di tutti"]},
  
    {id:'tiro-cerchio-terra', nome:'Tiro al cerchio a terra', fase:'tecnica', bande:['pulcini'], obiettivi:['tiro','coordinazione'], materiali:['cerchi','palla'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Senza canestro disponibile, i bambini provano a far atterrare la palla dentro un cerchio a terra con un tiro ad arco.",
     varianti:["Allontana il cerchio progressivamente","Usa cerchi di colore diverso con punteggi diversi"]},
  
    /* ---- TECNICA: PASSAGGIO extra ---- */
    {id:'passaggio-muro', nome:'Passaggio al muro', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[5,8], diagram:'coppie-passaggio',
     descrizione:"Il bambino passa la palla contro un muro e la riprende al volo, curando la precisione del passaggio a due mani.",
     varianti:["Aumenta la distanza dal muro","Chiedi un solo palleggio prima di riprendere la palla"]},
  
    {id:'passaggio-cerchio-veloce', nome:'Passaggio in cerchio veloce', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, i bambini si passano la palla il più velocemente possibile mantenendo precisione, provando a battere il tempo del giro precedente.",
     varianti:["Aggiungi un secondo pallone in senso opposto","Vieta di passare al vicino diretto"]},
  
    {id:'passaggio-schiacciato', nome:'Passaggio schiacciato a coppie', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,8], diagram:'coppie-passaggio',
     descrizione:"A coppie, i bambini si esercitano nel passaggio a terra facendo rimbalzare la palla circa a due terzi della distanza.",
     varianti:["Prova con una mano sola per i più grandi","Aggiungi un passo laterale dopo ogni passaggio"]},
  
    {id:'staffetta-passaggi-fila', nome:'Staffetta di passaggi in fila', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla','sedie'], durata:[6,10], diagram:'staffetta',
     descrizione:"In fila davanti a una sedia, i bambini si passano la palla sopra la testa fino all'ultimo, che passa carponi sotto la sedia, corre in testa alla fila e ricomincia.",
     varianti:["Alterna passaggio sopra la testa e tra le gambe","Fai gareggiare due file in parallelo, ciascuna con la propria sedia"]},
  
    /* ---- COORDINAZIONE extra ---- */
    {id:'saltelli-cerchi-due-piedi', nome:'Saltelli nei cerchi a due piedi', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[4,6], diagram:'cerchi-percorso',
     descrizione:"I bambini saltano a piedi uniti dentro ogni cerchio disposto in fila, atterrando con morbidezza.",
     varianti:["Aggiungi una breve pausa di equilibrio in ogni cerchio","Prova a saltare all'indietro"]},
  
    {id:'percorso-ostacoli-bassi', nome:'Percorso a ostacoli bassi', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[6,10], diagram:'percorso-misto',
     descrizione:"Disponi coni come piccoli ostacoli da scavalcare alternando la gamba di stacco, in un percorso da ripetere.",
     varianti:["Aggiungi un cambio di direzione a metà percorso","Cronometra e confronta i tempi"]},
  
    {id:'gioco-specchio', nome:'Il gioco dello specchio', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'difesa-specchio',
     descrizione:"A coppie uno di fronte all'altro, uno guida con movimenti lenti delle braccia e del corpo e l'altro lo imita come uno specchio.",
     varianti:["Aggiungi movimenti delle gambe","Cambia la guida ogni 20 secondi"]},
  
    {id:'andature-coordinative', nome:'Andature coordinative', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"I bambini attraversano il campo alternando andature diverse: skip, corsa calciata dietro, passo incrociato.",
     varianti:["Aggiungi le braccia opposte alle gambe per aumentare la difficoltà","Fai ripetere l'andatura preferita da ciascuno"]},
  
    {id:'equilibrio-un-piede', nome:'Equilibrio su un piede', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[4,6], diagram:'corsa-libera',
     descrizione:"I bambini restano in equilibrio su un piede il più a lungo possibile, poi cambiano piede, provando anche a chiudere gli occhi.",
     varianti:["Aggiungi piccoli movimenti delle braccia mantenendo l'equilibrio","Trasformalo in una piccola sfida a squadre"]},
  
    {id:'percorso-cambio-direzione', nome:'Percorso a tempo con cambi di direzione', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[8,12], diagram:'percorso-misto',
     descrizione:"Un percorso a coni che obbliga a cambiare direzione più volte, da ripetere cronometrando ogni passaggio.",
     varianti:["Aggiungi la palla in mano per aumentare la difficoltà","Fai sfidare due bambini in contemporanea su percorsi paralleli"]},
  
    /* ---- DIFESA extra ---- */
    {id:'scivolamenti-comando', nome:'Scivolamenti difensivi intorno alla sedia', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:['sedie'], durata:[5,8], diagram:'sedia-difesa',
     descrizione:"Con una sedia come punto fisso al centro, i bambini si spostano lateralmente in posizione difensiva bassa seguendo i tuoi comandi vocali (destra, sinistra, avanti, indietro), mantenendo sempre la sedia davanti a sé.",
     varianti:["Aumenta la velocità dei comandi progressivamente","Aggiungi un tocco della sedia ad ogni cambio di direzione"]},
  
    {id:'difesa-quadrato', nome:'Difesa sul quadrato', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:['coni'], durata:[8,12], diagram:'difesa-specchio',
     descrizione:"Quattro coni delimitano un quadrato: il bambino si muove lateralmente lungo i lati mantenendo sempre la posizione difensiva corretta.",
     varianti:["Aggiungi un compagno che tira passaggi da intercettare","Riduci il quadrato per aumentare l'intensità"]},
  
    {id:'difesa-coppie-recupero', nome:'Recupera la palla dalla sedia', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:['palla','sedie'], durata:[6,10], diagram:'difesa-specchio',
     descrizione:"La palla è appoggiata su una sedia: al via un bambino la prende e palleggia lentamente allontanandosi, mentre il compagno lo segue in posizione difensiva provando a toccarla senza fallo.",
     varianti:["Delimita uno spazio piccolo","Alterna i ruoli ogni 30 secondi"]},
  
    /* ---- GIOCO DI SQUADRA extra ---- */
    {id:'palla-avvelenata', nome:'Palla avvelenata basket', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"A squadre in campi separati, i bambini si passano la palla e provano a colpire (sotto la cintura) i giocatori avversari, senza mai correre con la palla in mano.",
     varianti:["Chi viene colpito passa nell'altra squadra","Vinci chi resta con più giocatori dopo 3 minuti"]},
  
    {id:'percorso-squadre-misto', nome:'Percorso a squadre, palleggio e passaggio', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','palleggio','passaggio'], materiali:['palla','coni','sedie'], durata:[10,15], diagram:'staffetta',
     descrizione:"A squadre, ogni bambino palleggia tra i coni, passa sotto una sedia senza perdere il controllo della palla, poi la passa al compagno successivo e va in fondo alla fila: vince chi finisce prima.",
     varianti:["Aggiungi un tiro a canestro a fine percorso","Richiedi il cambio di mano nello slalom"]},
  
    {id:'tre-contro-tre', nome:'3 contro 3 a metà campo', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','difesa'], materiali:['palla','canestro'], durata:[10,15], diagram:'campo-partita',
     descrizione:"Partitella a metà campo con regole semplificate, dando indicazioni su smarcamento e passaggi durante il gioco.",
     varianti:["Regola del passaggio obbligatorio prima del tiro","Punto doppio se segna chi non ha ancora tirato"]},
  
    {id:'girotondo-palla', nome:'Girotondo con la palla', fase:'gioco', bande:['pulcini'], obiettivi:['gioco di squadra'], materiali:['palla'], durata:[5,8], diagram:'gruppo-cerchio',
     descrizione:"In cerchio tenendosi per mano, i bambini si muovono cantando una filastrocca e si fermano a passarsi la palla al centro a comando.",
     varianti:["Cambia direzione del girotondo ogni giro","Aggiungi un piccolo salto quando la palla arriva al centro"]},
  
    /* ---- CHIUSURA extra ---- */
    {id:'tiro-buonanotte', nome:'Tiro libero della buonanotte', fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[4,6], diagram:'tiro-canestro',
     descrizione:"Ogni bambino ha diritto a un ultimo tiro libero prima di lasciare il campo, in un clima rilassato e senza pressione.",
     varianti:["Fai il tiro a coppie, chi segna esce per primo","Aggiungi un piccolo applauso di squadra a ogni canestro"]},
  
    {id:'cerchio-complimenti', nome:'Cerchio dei complimenti', fase:'chiusura', bande:['pulcini','aquilotti'], obiettivi:[], materiali:[], durata:[4,6], diagram:'corsa-libera',
     descrizione:"Seduti in cerchio, ogni bambino fa un piccolo complimento a un compagno per qualcosa fatto bene durante l'allenamento.",
     varianti:["Comincia tu dando il primo esempio","Chiedi anche un piccolo obiettivo per la prossima volta"]},
  
    {id:'ultimo-canestro-squadra', nome:'Ultimo canestro di squadra', fase:'chiusura', bande:['aquilotti'], obiettivi:['gioco di squadra'], materiali:['palla','canestro'], durata:[5,8], diagram:'tiro-canestro',
     descrizione:"L'intera squadra deve segnare un canestro insieme, passandosi la palla almeno tre volte prima di tirare.",
     varianti:["Ripeti finché tutti hanno toccato palla almeno una volta","Festeggia con un grido di squadra al canestro"]},
  
    /* ---- MINI-ESERCIZI RAPIDI (per riempire tempi stretti) ---- */
    {id:'sprint-coppie', nome:'Sprint a coppie', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[3,5], diagram:'corsa-libera',
     descrizione:"A coppie appaiate, i bambini fanno una breve corsa veloce da una linea all'altra del campo, ripetuta 2-3 volte.",
     varianti:["Parti da posizioni diverse (seduti, in ginocchio)","Aggiungi un piccolo traguardo con applauso finale"]},
  
    {id:'tocca-cambia', nome:'Tocca il pallone e cambia', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[3,5], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano liberi nello spazio; al tuo segnale scambiano il pallone con il compagno più vicino senza fermarsi.",
     varianti:["Aggiungi un batti-cinque durante lo scambio","Vieta di scambiare due volte con lo stesso compagno"]},
  
    {id:'palleggio-veloce-30', nome:'30 secondi di palleggio veloce', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[3,5], diagram:'palleggio-libero',
     descrizione:"Da fermi, i bambini palleggiano più veloce possibile per 30 secondi mantenendo il controllo, poi recuperano e ripetono.",
     varianti:["Alterna 30 secondi di mano destra e sinistra","Conta ad alta voce i palleggi per renderlo una sfida"]},
  
    {id:'cambio-direzione-fischio', nome:'Cambio di direzione al fischio', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[3,5], diagram:'corsa-libera',
     descrizione:"I bambini corrono nello spazio e a ogni fischio invertono immediatamente la direzione di corsa.",
     varianti:["Aggiungi un salto ad ogni cambio di direzione","Alterna corsa avanti e corsa laterale"]},
  
    {id:'passaggi-veloci-coppie', nome:'Passaggi veloci a coppie', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[3,5], diagram:'coppie-passaggio',
     descrizione:"A coppie vicine, i bambini si passano la palla il più rapidamente possibile per 30 secondi mantenendo la precisione.",
     varianti:["Aumenta leggermente la distanza dopo ogni ripetizione","Conta i passaggi consecutivi senza errori"]},
  
    {id:'tiro-veloce-tempo', nome:'Tiro veloce a tempo', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[3,5], diagram:'tiro-canestro',
     descrizione:"Ogni bambino ha 30 secondi per segnare quanti più canestri possibile da distanza ravvicinata, recuperando da solo la palla.",
     varianti:["Riduci a 20 secondi per i più allenati","Somma i canestri di tutta la squadra come punteggio collettivo"]},
  
    {id:'saltelli-veloci', nome:'Saltelli veloci sul posto', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[3,4], diagram:'corsa-libera',
     descrizione:"I bambini eseguono saltelli veloci sul posto a piedi uniti per 20-30 secondi, con un breve recupero tra le serie.",
     varianti:["Alterna saltelli avanti-indietro e laterali","Aggiungi le braccia che si aprono e chiudono"]},
  
    {id:'difesa-lampo', nome:'Difesa lampo a specchio', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:[], durata:[3,5], diagram:'difesa-specchio',
     descrizione:"A coppie per 20 secondi, uno si muove rapidamente e l'altro lo segue in posizione difensiva, poi si scambiano.",
     varianti:["Riduci lo spazio disponibile","Aggiungi un tocco a terra ogni cambio di direzione"]},
  
    {id:'cerchio-veloce-passaggi', nome:'Passaggi veloci intorno alla sedia', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla','sedie'], durata:[4,6], diagram:'gruppo-cerchio',
     descrizione:"In piccolo cerchio con una sedia vuota al centro, i bambini si passano rapidamente la palla contando i passaggi consecutivi senza mai farla cadere sulla sedia.",
     varianti:["Aggiungi un secondo pallone per aumentare la difficoltà","Prova a battere il record dell'allenamento precedente"]},
  
    /* ---- ULTERIORI ESERCIZI (equilibrio su fasce, obiettivi, materiali e durate) ---- */
    {id:'ladro-palloni', nome:'Il ladro di palloni', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['difesa','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'gruppo-cerchio',
     descrizione:"Ogni bambino ha una palla e deve proteggerla mentre prova a toccare (senza far male) quella dei compagni: chi perde la propria resta fermo un giro.",
     varianti:["Riduci lo spazio per aumentare la difficoltà","Chi resta fermo rientra facendo 5 saltelli"]},
  
    {id:'trenino-squadre', nome:'Il trenino a squadre', fase:'gioco', bande:['pulcini'], obiettivi:['gioco di squadra','coordinazione'], materiali:[], durata:[5,8], diagram:'staffetta',
     descrizione:"A squadre in fila indiana tenendosi per le spalle, i bambini si muovono insieme per il campo seguendo il capotreno senza staccarsi.",
     varianti:["Cambia il capotreno ogni giro","Aggiungi ostacoli semplici da aggirare tutti insieme"]},
  
    {id:'tutti-a-casa', nome:'Le sedie della tana', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','coordinazione'], materiali:['sedie'], durata:[5,8], diagram:'gruppo-cerchio',
     descrizione:"Disponi le sedie in cerchio, una in meno rispetto ai bambini: tutti corrono liberi nello spazio e al tuo segnale devono sedersi il più in fretta possibile su una sedia libera.",
     varianti:["Chi resta in piedi propone l'andatura del giro successivo","Togli una sedia ogni giro per aumentare la sfida"]},
  
    {id:'palleggio-coni-basso', nome:'Palleggio basso tra coni ravvicinati', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio'], materiali:['coni','palla','aste'], durata:[5,8], diagram:'coni-linea',
     descrizione:"Coni molto ravvicinati: il bambino palleggia basso e lento passando in mezzo, curando che la palla non superi l'altezza del ginocchio.",
     varianti:["Allontana leggermente i coni per aumentare la velocità","Chiedi di guardare avanti invece che la palla","Per i più esperti, alterna un cono e un'asta lungo il percorso per variare l'ampiezza degli ostacoli"]},
  
    {id:'palleggio-dietro-schiena', nome:'Palleggio dietro la schiena ai coni', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['coni','palla','aste'], durata:[8,12], diagram:'coni-linea',
     descrizione:"Ad ogni cono il bambino esegue un cambio di mano dietro la schiena, mantenendo il controllo prima di ripartire.",
     varianti:["Alterna cambio dietro la schiena e tra le gambe","Cronometra il percorso completo","In alternativa ai coni puoi usare le aste: il passaggio più stretto rende il palleggio ancora più impegnativo"]},
  
    {id:'percorso-cerchi-palla', nome:'Percorso sotto le sedie con la palla', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione','palleggio'], materiali:['sedie','palla'], durata:[6,10], diagram:'sedia-percorso',
     descrizione:"Disponi alcune sedie in fila: il bambino avanza passando la palla sotto ogni sedia e recuperandola dall'altra parte, prima di rialzarsi e proseguire verso la successiva.",
     varianti:["Fai fare il percorso in palleggio tra una sedia e l'altra","Cronometra il tempo di percorrenza per i più sicuri"]},
  
    {id:'passaggio-distanza-crescente', nome:'Passaggio a distanza crescente', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"A coppie, la distanza tra i due bambini aumenta di un passo ogni 5 passaggi corretti, lavorando sulla forza del passaggio.",
     varianti:["Aggiungi il passaggio schiacciato quando la distanza è ampia","Richiedi un passo di aggiustamento prima di ogni passaggio"]},
  
    {id:'terzo-tempo-semplificato', nome:'Terzo tempo semplificato', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['palla','canestro'], durata:[10,15], diagram:'percorso-tiro',
     descrizione:"Il bambino parte da fermo qualche passo da canestro, esegue due passi lunghi e conclude con il terzo tempo, ripetendo più volte con calma.",
     varianti:["Fai provare il gesto anche senza palla per assimilare i passi","Aggiungi un rimbalzo da recuperare dopo la conclusione"]},
  
    {id:'doppia-stazione-tiro-passaggio', nome:'Doppia stazione tiro e passaggio', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','passaggio'], materiali:['palla','canestro'], durata:[10,14], diagram:'tiro-canestro',
     descrizione:"Metà gruppo tira a canestro, l'altra metà si allena nei passaggi a coppie: dopo metà tempo le due stazioni si scambiano.",
     varianti:["Aggiungi un piccolo punteggio per stazione","Fai ruotare anche a metà di ogni stazione"]},
  
    {id:'gioco-nomi-palleggio', nome:'Il gioco dei nomi col palleggio', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano muovendosi e, quando incrociano un compagno, devono dire il suo nome ad alta voce senza fermare il palleggio.",
     varianti:["Aggiungi un batti-cinque al nome detto","Chiedi di dire anche un colore che indossa il compagno"]},
  
    {id:'percorso-anelli-tiro', nome:'Percorso ad anelli con tiro', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['cerchi','palla','canestro'], durata:[10,14], diagram:'percorso-tiro',
     descrizione:"Il bambino salta attraverso alcuni cerchi, raccoglie la palla e conclude con un tiro a canestro da distanza ravvicinata.",
     varianti:["Aggiungi un secondo tiro da un'altra angolazione","Cronometra il giro completo a squadre"]},
  
    {id:'difesa-tocco-stop', nome:'Difesa a coppie: tocco e stop', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa'], materiali:['palla'], durata:[6,10], diagram:'difesa-specchio',
     descrizione:"A coppie, l'attaccante palleggia lentamente mentre il difensore prova a fermarsi ogni volta che tocca correttamente la palla senza fallo.",
     varianti:["Aggiungi un limite di 3 palleggi per l'attaccante","Alterna i ruoli ogni 30 secondi"]},
  
    {id:'staffetta-cerchi-squadre', nome:'Staffetta intorno alla sedia', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['coordinazione','gioco di squadra'], materiali:['sedie'], durata:[6,10], diagram:'sedia-percorso',
     descrizione:"A squadre in fila, ogni bambino corre fino alla sedia posta in fondo alla corsia, la gira completamente intorno e torna a dare il cambio al compagno successivo.",
     varianti:["Aggiungi la palla in mano durante la corsa","Richiedi di toccare la sedia con una mano prima di girarci intorno"]},
  
    {id:'proteggi-palla-movimento', nome:'Proteggi la palla in movimento', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','difesa'], materiali:['palla'], durata:[6,10], diagram:'palleggio-libero',
     descrizione:"Il bambino palleggia muovendosi nello spazio tenendo il corpo tra la palla e un compagno che finge di essere un difensore passivo.",
     varianti:["Rendi il difensore attivo per i più esperti","Riduci lo spazio disponibile per aumentare la difficoltà"]},
  
    {id:'triangolo-passaggi', nome:'Passaggio sopra la sedia', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla','sedie'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Tre bambini si dispongono a triangolo con una sedia al centro: si passano la palla con una traiettoria alta per scavalcarla idealmente, poi corrono a scambiarsi il posto con il compagno a cui hanno passato.",
     varianti:["Cambia il senso di rotazione a metà esercizio","Chi fa cadere la palla sulla sedia riparte da zero il conteggio dei passaggi"]},
  
    {id:'quattro-angoli', nome:'I quattro angoli', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[5,8], diagram:'percorso-misto',
     descrizione:"Quattro coni segnano gli angoli di un quadrato: i bambini corrono da un angolo all'altro seguendo l'ordine o il colore che chiami.",
     varianti:["Aggiungi un'andatura diversa per ogni lato","Trasformalo in una piccola gara a cronometro"]},
  
    {id:'palleggio-alternato-fermo', nome:'Palleggio a due mani alternato', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"Da fermo, il bambino alterna un palleggio con la mano destra e uno con la sinistra, cercando un ritmo regolare.",
     varianti:["Aggiungi un piccolo spostamento laterale","Prova a farlo guardando altrove per pochi secondi"]},
  
    {id:'tiro-a-cronometro', nome:'Tiro a cronometro', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Ogni bambino ha un minuto per segnare più canestri possibile da diverse posizioni vicine, recuperando la palla da solo.",
     varianti:["Dividi in coppie: uno tira e l'altro recupera, poi si scambiano","Somma i canestri di tutta la squadra come sfida collettiva"]},
  
    {id:'scaletta-con-palla', nome:'Scaletta con la palla in mano', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione','palleggio'], materiali:['palla'], durata:[8,12], diagram:'scaletta-coordinativa',
     descrizione:"I bambini eseguono la sequenza di appoggi nella scaletta a terra tenendo la palla con due mani davanti al petto, senza guardarla.",
     varianti:["Passa a tenere la palla sopra la testa per una serie","Aggiungi un piccolo lancio e ripresa a fine scaletta"]},
  
    {id:'palla-prigioniera-mini', nome:'Palla prigioniera mini', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[8,12], diagram:'campo-partita',
     descrizione:"Due squadre in campi separati si passano la palla cercando di colpire sotto la cintura i giocatori avversari, senza mai correre con la palla in mano.",
     varianti:["Chi viene colpito fa un piccolo esercizio ed entra di nuovo","Aggiungi una zona centrale neutra"]},
  
    {id:'riscaldamento-coni-colorati', nome:'Riscaldamento ai coni colorati', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[5,8], diagram:'percorso-misto',
     descrizione:"Disponi coni di colori diversi nello spazio: i bambini corrono liberi e toccano il colore che chiami il più in fretta possibile.",
     varianti:["Aggiungi due colori da toccare in sequenza","Cambia andatura ogni volta che chiami un colore"]},
  
    {id:'passaggio-in-corsa', nome:'Passaggio in corsa a coppie', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio','coordinazione'], materiali:['palla'], durata:[8,12], diagram:'coppie-passaggio',
     descrizione:"A coppie, i bambini corrono affiancati lungo il campo passandosi la palla in movimento senza rallentare troppo.",
     varianti:["Aumenta la velocità di corsa quando il controllo è buono","Aggiungi un tiro a canestro a fine percorso"]},
  
    {id:'scivolamenti-coni', nome:'Scivolamenti difensivi tra i coni', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa','coordinazione'], materiali:['coni'], durata:[8,12], diagram:'difesa-specchio',
     descrizione:"Coni disposti in fila: il bambino si muove lateralmente in posizione difensiva toccando ogni cono senza incrociare i piedi.",
     varianti:["Aumenta la velocità di spostamento","Aggiungi un cambio di direzione a metà fila"]},
  
    {id:'mini-torneo-tiro', nome:'Mini torneo di tiro a coppie', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[10,15], diagram:'tiro-canestro',
     descrizione:"A coppie si sfidano a turni brevi di tiro: chi segna di più in un minuto passa al turno successivo, in un piccolo tabellone ad eliminazione.",
     varianti:["Aggiungi un tiro da posizione più lontana come spareggio","Fai giocare anche le coppie eliminate in un girone di consolazione"]},
  
    {id:'palla-in-mezzo-ridotta', nome:'Palla in mezzo (versione ridotta)', fase:'gioco', bande:['pulcini'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"In un piccolo cerchio, un bambino al centro prova a intercettare la palla che gli altri si passano tra loro con calma.",
     varianti:["Aiuta suggerendo dove passare la palla","Cambia il bambino al centro ogni 30 secondi"]},
  
    {id:'equilibrio-a-coppie', nome:'Equilibrio a coppie', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"A coppie, schiena contro schiena, i bambini provano ad alzarsi insieme da seduti spingendosi a vicenda con equilibrio.",
     varianti:["Prova con le braccia incrociate","Aggiungi un piccolo spostamento laterale mantenendo il contatto"]},
  
    {id:'circuito-completo-tiro', nome:'Circuito completo con tiro finale', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','tiro','coordinazione'], materiali:['palla','coni','cerchi','canestro'], durata:[12,18], diagram:'percorso-misto',
     descrizione:"Un percorso che unisce slalom ai coni, salti nei cerchi e conclusione a canestro, da ripetere a rotazione in piccoli gruppi.",
     varianti:["Aggiungi un tempo massimo a squadra","Introduci una penalità se un cono viene toccato"]},
  
    {id:'ultimo-canestro-vince', nome:"L'ultimo canestro vince", fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[5,8], diagram:'tiro-canestro',
     descrizione:"A turno, ogni bambino tira finché non segna: l'allenamento finisce ufficialmente con l'ultimo canestro di tutto il gruppo.",
     varianti:["Dai un numero massimo di tentativi per bambino","Festeggia l'ultimo canestro con un applauso di squadra"]},
  
    /* ---- SECONDA ESPANSIONE (verso i 120 esercizi) ---- */
    {id:'muro-immobile', nome:'La sedia guardiana', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['difesa','coordinazione'], materiali:['palla','sedie'], durata:[4,6], diagram:'sedia-difesa',
     descrizione:"Metti una sedia al centro dello spazio: il bambino palleggia girandole intorno senza farla cadere né toccarla, imparando a proteggere la palla e a cambiare direzione come farebbe davanti a un difensore fermo.",
     varianti:["Trasforma la sedia in un vero compagno che resta immobile con le braccia aperte","Aggiungi una seconda sedia per obbligare a un doppio cambio di direzione"]},
  
    {id:'cerchio-magico-passaggi', nome:'Il cerchio magico', fase:'tecnica', bande:['pulcini'], obiettivi:['passaggio'], materiali:['cerchi','palla'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Ogni bambino sta dentro un cerchio a distanza fissa dal compagno e si passa la palla senza uscire dal proprio cerchio.",
     varianti:["Allontana i cerchi quando i passaggi diventano precisi","Aggiungi un terzo cerchio per un triangolo di passaggi"]},
  
    {id:'riscaldamento-coni-911', nome:'Riscaldamento a coni sparsi', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[5,8], diagram:'percorso-misto',
     descrizione:"Coni sparsi per il campo: i bambini corrono liberi e li saltano o aggirano a seconda del comando che dai a voce.",
     varianti:["Alterna corsa avanti e corsa laterale tra un cono e l'altro","Aggiungi un tempo limite per completare un giro"]},
  
    {id:'scaletta-passaggi', nome:'Scaletta con passaggi a coppie', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione','passaggio'], materiali:['palla'], durata:[8,12], diagram:'scaletta-coordinativa',
     descrizione:"Un bambino esegue la sequenza di appoggi nella scaletta mentre un compagno, a lato, gli passa la palla da restituire subito dopo l'ultimo appoggio.",
     varianti:["Aumenta la velocità della sequenza quando il controllo è buono","Inverti i ruoli ogni due passaggi nella scaletta"]},
  
    {id:'giro-del-mondo', nome:'Giro del mondo', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[10,15], diagram:'tiro-canestro',
     descrizione:"Il bambino tira da 5 posizioni diverse attorno a canestro: può avanzare alla posizione successiva solo dopo aver segnato.",
     varianti:["Riduci a 3 posizioni per i principianti","Chi sbaglia due voli di fila torna alla posizione precedente"]},
  
    {id:'palleggio-specchio-coppie', nome:'Palleggio a specchio a coppie', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'difesa-specchio',
     descrizione:"A coppie uno di fronte all'altro, entrambi palleggiano mentre uno guida i movimenti laterali e l'altro lo segue restando allineato.",
     varianti:["Cambia la guida ogni 20 secondi","Aggiungi un piccolo spostamento avanti-indietro"]},
  
    {id:'corsa-ostacoli-mani', nome:'Corsa a ostacoli con le mani a terra', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni'], durata:[5,8], diagram:'percorso-misto',
     descrizione:"Ad ogni cono il bambino tocca rapidamente il suolo con una mano prima di ripartire di corsa verso il successivo.",
     varianti:["Alterna la mano usata ad ogni cono","Aggiungi un piccolo salto tra un cono e l'altro"]},
  
    {id:'passaggio-muro-veloce', nome:'Passaggio al muro veloce', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[3,5], diagram:'coppie-passaggio',
     descrizione:"Per 30 secondi il bambino passa la palla contro un muro il più velocemente possibile, contando i passaggi senza farla cadere.",
     varianti:["Allontanati leggermente dal muro dopo ogni serie","Prova a farlo con una mano sola"]},
  
    {id:'tiro-piazzato-squadre', nome:'Tiro piazzato a squadre', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"A squadre, ogni bambino tira una volta a turno: la squadra somma i canestri segnati in un tempo stabilito.",
     varianti:["Aggiungi un secondo giro da una posizione diversa","Un canestro su rimbalzo raccolto al volo vale doppio"]},
  
    {id:'difesa-scaletta', nome:'Scivolamenti nella scaletta', fase:'tecnica', bande:['aquilotti'], obiettivi:['difesa','coordinazione'], materiali:[], durata:[6,10], diagram:'scaletta-coordinativa',
     descrizione:"Il bambino attraversa lateralmente la scaletta a terra mantenendo la posizione difensiva bassa, senza incrociare i piedi.",
     varianti:["Aumenta la velocità mantenendo la forma corretta","Aggiungi un cambio di direzione a metà scaletta"]},
  
    {id:'palla-al-capitano', nome:'Palla al capitano', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Un bambino 'capitano' si muove nello spazio, la sua squadra deve passargli la palla il più volte possibile mentre un avversario prova a intercettarla.",
     varianti:["Cambia il capitano ogni 2 minuti","Vieta di correre con la palla in mano"]},
  
    {id:'mini-percorso-tiro-piccoli', nome:'Mini percorso con tiro nel cerchio', fase:'tecnica', bande:['pulcini'], obiettivi:['tiro','coordinazione'], materiali:['cerchi','palla'], durata:[6,10], diagram:'percorso-tiro',
     descrizione:"Il bambino salta tra i cerchi e conclude provando a far atterrare la palla in un ultimo cerchio a terra, come fosse un canestro.",
     varianti:["Allontana l'ultimo cerchio per aumentare la difficoltà","Usa cerchi di colore diverso con punteggi diversi"]},
  
    {id:'staffetta-slalom-tiro', nome:'Staffetta a slalom tra le aste con passaggio finale', fase:'gioco', bande:['aquilotti'], obiettivi:['palleggio','gioco di squadra'], materiali:['palla','aste'], durata:[10,14], diagram:'staffetta',
     descrizione:"A squadre, ogni bambino palleggia in slalom tra le aste e, arrivato in fondo, passa la palla al compagno successivo prima di andare in fondo alla fila.",
     varianti:["Aggiungi un tiro a canestro a fine slalom","Richiedi il cambio di mano ad ogni asta"]},
  
    {id:'equilibrio-palla-testa', nome:'Equilibrio con la palla sulla testa', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['palla'], durata:[4,6], diagram:'corsa-libera',
     descrizione:"I bambini camminano lentamente cercando di mantenere la palla in equilibrio sulla testa con una mano di appoggio leggero.",
     varianti:["Prova a camminare senza mano di appoggio per i più abili","Aggiungi un piccolo percorso a slalom"]},
  
    {id:'passaggio-tre-tocchi', nome:'Passaggio massimo tre tocchi', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[4,6], diagram:'coppie-passaggio',
     descrizione:"A coppie, i bambini si passano la palla potendola toccare al massimo tre volte prima di restituirla, per abituarsi a decidere in fretta.",
     varianti:["Riduci a due tocchi per i più esperti","Aggiungi un piccolo spostamento laterale tra un passaggio e l'altro"]},
  
    {id:'corsa-a-navetta', nome:'Corsa a navetta', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni','aste'], durata:[5,8], diagram:'coni-linea',
     descrizione:"Due coni segnano andata e ritorno: il bambino corre avanti e indietro toccando ogni volta la linea del cono con una mano.",
     varianti:["Aumenta la distanza tra i coni per i più grandi","Cronometra e confronta i tempi tra i compagni","Prova a ripetere l'esercizio con le aste al posto dei coni per stringere lo spazio di manovra"]},
  
    {id:'tiro-spostamento-laterale', nome:'Tiro dopo spostamento laterale', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Il bambino si sposta lateralmente di un paio di passi, riceve idealmente la palla e conclude subito a canestro senza fermarsi troppo.",
     varianti:["Aggiungi un vero passaggio da un compagno prima del tiro","Alterna il lato di spostamento ad ogni tiro"]},
  
    {id:'gioco-fazzoletto-basket', nome:'Il fazzoletto del basket', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['coordinazione','gioco di squadra'], materiali:[], durata:[5,8], diagram:'corsa-libera',
     descrizione:"Due squadre numerate ai lati opposti del campo: quando chiami un numero, i due bambini corrispondenti corrono a prendere l'oggetto al centro prima dell'avversario.",
     varianti:["Usa la palla come oggetto da prendere e passare al compagno","Chiama due numeri insieme per una variante a coppie"]},
  
    {id:'palleggio-zigzag-cerchi', nome:'Palleggio a zig-zag tra i cerchi', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio','coordinazione'], materiali:['cerchi','palla'], durata:[6,10], diagram:'percorso-misto',
     descrizione:"I cerchi disposti a zig-zag indicano dove il bambino deve mettere un piede mentre palleggia, per lavorare su ritmo e controllo insieme.",
     varianti:["Aumenta la distanza tra i cerchi per allungare il passo","Chiedi di cambiare mano ad ogni cerchio"]},
  
    {id:'chiusura-tiro-squadre', nome:'Tiro finale a squadre', fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[5,8], diagram:'tiro-canestro',
     descrizione:"Ogni squadra ha un ultimo giro di tiri, un tentativo a testa: si chiude l'allenamento contando insieme i canestri totali di giornata.",
     varianti:["Aggiungi un applauso di squadra ad ogni canestro","Fai scegliere ai bambini la posizione di tiro preferita"]},
  
    /* ============ 50 ESERCIZI STILE FIP MINIBASKET ============ */
  
    {id:'fip-numeri-palleggio', nome:'Numeri col palleggio', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"I bambini palleggiano liberi. Quando chiami un numero, si radunano in gruppetti di quel numero continuando a palleggiare senza perdere la palla.",
     varianti:["Chi resta senza gruppo esegue 5 palleggi bassi","Alterna numeri e colori (colore = tocca una linea di quel colore)"]},
  
    {id:'fip-caccia-ai-numeri', nome:'Caccia ai numeri', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['coordinazione','gioco di squadra'], materiali:['coni'], durata:[5,8], diagram:'corsa-libera',
     descrizione:"Coni numerati sparsi nel campo. Chiami una sequenza (es. 3-1-5) e i bambini devono toccarli in ordine tornando al punto di partenza.",
     varianti:["Aggiungi la palla in palleggio durante il percorso","Sfida a coppie con partenza simultanea"]},
  
    {id:'fip-orologio-palleggio', nome:"L'orologio", fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Fermi sul posto, palleggiano seguendo le ore che chiami: ore 12 davanti, ore 3 a destra, ore 6 dietro, ore 9 a sinistra.",
     varianti:["Aumenta la velocità dei comandi","Aggiungi la mano debole obbligatoria"]},
  
    {id:'fip-segui-capitano', nome:'Segui il capitano', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[4,7], diagram:'corsa-libera',
     descrizione:"Un bambino guida il gruppo in fila indiana proponendo andature (skip, calciata dietro, galoppo laterale). Cambia capitano ogni 30 secondi.",
     varianti:["Aggiungi la palla in mano","Il capitano deve inventare un movimento originale a ogni turno"]},
  
    {id:'fip-andature-stazioni', nome:'Andature a stazioni', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:['coni','aste'], durata:[5,8], diagram:'coni-linea',
     descrizione:"Tra ogni coppia di coni cambia l'andatura: corsa normale, skip alto, calciata dietro, corsa laterale, corsa all'indietro.",
     varianti:["Aggiungi il palleggio in una stazione","Torna al punto di partenza con andatura scelta dal bambino","Sostituisci metà dei coni con le aste per obbligare a un controllo di palla più fine"]},
  
    {id:'fip-palleggi-a-comando', nome:'Palleggi a comando', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Sul posto: alto/basso/forte/piano/mano-destra/mano-sinistra a comando. I bambini reagiscono senza guardare la palla.",
     varianti:["Comando dato solo con un gesto (silenzio)","Chi sbaglia esegue 3 palleggi con la mano debole"]},
  
    {id:'fip-postura-fischio', nome:'Postura al fischio', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['coordinazione','difesa'], materiali:['sedie'], durata:[4,6], diagram:'difesa-specchio',
     descrizione:"Corsa libera tra le sedie sparse nello spazio; al fischio i bambini si fermano subito in posizione fondamentale (ginocchia piegate, mani avanti, sguardo alto) vicino alla sedia più vicina.",
     varianti:["Al doppio fischio: 3 spostamenti laterali intorno alla sedia","Aggiungi salto verticale prima della postura"]},
  
    {id:'fip-tag-palleggio', nome:'Acchiapparella col palleggio', fase:'riscaldamento', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[6,10], diagram:'palleggio-libero',
     descrizione:"Tutti palleggiano. Due 'lupi' con maglia diversa cercano di toccare gli altri. Chi viene toccato diventa lupo. Non si può fermare il palleggio.",
     varianti:["Chi perde la palla diventa lupo","Riduci lo spazio di gioco progressivamente"]},
  
    {id:'fip-pulcini-tana', nome:'Pulcini nella tana', fase:'riscaldamento', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[4,6], diagram:'cerchi-percorso',
     descrizione:"Un cerchio per bambino tranne uno. Al segnale corrono fuori e al fischio devono tornare in un cerchio: chi resta fuori esegue un'andatura buffa.",
     varianti:["Chiama l'andatura di rientro (saltellando, all'indietro)","Togli progressivamente altri cerchi"]},
  
    {id:'fip-riscaldamento-articolare', nome:'Cerchio articolare', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[3,5], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, mobilità articolare guidata dall'allenatore: collo, spalle, bacino, ginocchia, caviglie. Concludi con 10 secondi di respirazione.",
     varianti:["Fai guidare ogni movimento a un bambino diverso","Aggiungi la palla passata attorno al corpo"]},
  
    {id:'fip-palleggio-ombra', nome:'Palleggio-ombra a coppie', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"A coppie, uno palleggia guidando (cambi mano, velocità, fermate), l'altro lo copia mantenendosi a due metri come uno specchio.",
     varianti:["Cambia guida ogni 30 secondi","Aggiungi cambi di direzione e velocità improvvisi"]},
  
    {id:'fip-palleggio-seduti', nome:'Palleggio da seduti', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Seduti a gambe incrociate, palleggio con la mano destra 20 volte, poi sinistra. Poi in ginocchio, poi in piedi: si sale gradualmente.",
     varianti:["Palleggio attorno al corpo da seduti","Cambio di mano davanti al ginocchio"]},
  
    {id:'fip-palleggio-alternato', nome:'Palleggio alternato dx/sx', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,7], diagram:'palleggio-libero',
     descrizione:"Sul posto, alternano un palleggio con la destra e uno con la sinistra, spostando la palla davanti al corpo con controllo.",
     varianti:["Aggiungi due palleggi bassi e due alti alternati","Chiudi gli occhi per 5 palleggi"]},
  
    {id:'fip-cambio-tra-le-gambe', nome:'Cambio tra le gambe', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[6,10], diagram:'palleggio-libero',
     descrizione:"Da fermi in posizione con gambe divaricate, i bambini fanno passare la palla tra le gambe con un palleggio, prima piano poi sempre più veloce.",
     varianti:["Aggiungi il movimento in avanti dopo il cambio","Alterna cambio davanti e tra le gambe"]},
  
    {id:'fip-due-palloni-fermo', nome:'Due palloni da fermo', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'palleggio-libero',
     descrizione:"Ogni bambino con due palle, palleggia contemporaneamente con entrambe le mani, prima sincronizzate poi alternate.",
     varianti:["Palleggio uno alto e uno basso","Cammina lentamente mantenendo il doppio palleggio"]},
  
    {id:'fip-cinque-stelle', nome:'Le cinque stelle', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','coni','aste'], durata:[8,12], diagram:'coni-zigzag',
     descrizione:"Cinque coni disposti a stella (uno al centro, quattro attorno). Il bambino parte dal centro, palleggia fino a un cono, cambia mano e torna.",
     varianti:["Cambia mano diversa a ogni cono","Cronometra il giro completo di 5 stelle","Per i più esperti, alterna un cono e un'asta lungo il percorso per variare l'ampiezza degli ostacoli"]},
  
    {id:'fip-palleggio-velocita', nome:'Velocità vs controllo', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','aste'], durata:[6,10], diagram:'coni-linea',
     descrizione:"Andata dai coni: palleggio basso e controllato. Ritorno: palleggio alto e veloce a testa alta. Aiuta a capire la differenza di intenzione.",
     varianti:["Il coach mostra un numero di dita da lontano che il bambino deve dire ad alta voce","Alterna ogni 5 metri","In alternativa ai coni puoi usare le aste: il passaggio più stretto rende il palleggio ancora più impegnativo"]},
  
    {id:'fip-slalom-testa-alta', nome:'Slalom a testa alta', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','coni','aste'], durata:[8,12], diagram:'coni-zigzag',
     descrizione:"Slalom tra coni distanti, ma il bambino deve guardare l'allenatore che a intervalli alza il numero di dita da riconoscere.",
     varianti:["Chi sbaglia il numero rifà il percorso","Aggiungi una domanda semplice a metà slalom","Prova a ripetere l'esercizio con le aste al posto dei coni per stringere lo spazio di manovra"]},
  
    {id:'fip-cambi-velocita', nome:'Cambi di velocità', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla','coni','aste'], durata:[6,10], diagram:'coni-linea',
     descrizione:"Coni in linea: tra un cono e l'altro palleggio lento, sul cono accelerazione di due passi con palleggio forte. Cambia il ritmo.",
     varianti:["Fermata di un secondo prima di ripartire","Aggiungi cambio di mano ad ogni accelerazione","Sostituisci metà dei coni con le aste per obbligare a un controllo di palla più fine"]},
  
    {id:'fip-partenza-incrociata', nome:'Partenza incrociata', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','coni','aste'], durata:[6,10], diagram:'coni-linea',
     descrizione:"Da fermo davanti a un cono: partenza spingendo con il piede opposto alla mano che palleggia, allungando il primo passo lontano dal cono.",
     varianti:["Aggiungi due palleggi di prosecuzione","Alterna partenza destra e sinistra","Per i più esperti, alterna un cono e un'asta lungo il percorso per variare l'ampiezza degli ostacoli"]},
  
    {id:'fip-cerchio-magico', nome:'Il cerchio magico', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio'], materiali:['palla','cerchi'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Ogni bambino nel proprio cerchio palleggia senza uscire. Prova con la destra, con la sinistra, seduto, in ginocchio.",
     varianti:["Chi esce dal cerchio fa 5 saltelli","Cerchio piccolo per aumentare la difficoltà"]},
  
    {id:'fip-palleggio-fermata-tiro', nome:'Palleggio, fermata, tiro', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'percorso-tiro',
     descrizione:"Due palleggi in avanti, fermata a due tempi (arresto), tiro a canestro. Enfasi sulla fermata equilibrata prima di alzarsi per il tiro.",
     varianti:["Aggiungi un cono da superare prima della fermata","Alterna lato destro e sinistro del canestro"]},
  
    {id:'fip-passaggio-muro', nome:'Passaggio al muro', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[5,8], diagram:'coppie-passaggio',
     descrizione:"Ogni bambino contro un muro (o rete/canestro) esegue 20 passaggi a due mani al petto senza far cadere la palla.",
     varianti:["Alterna petto e schiacciato","Un metro più lontano ogni 5 passaggi riusciti"]},
  
    {id:'fip-passaggio-fila-indiana', nome:'Passaggi in fila indiana', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"In fila indiana, il primo passa al secondo che passa al terzo e così via fino all'ultimo, poi si inverte la direzione. Cronometra il giro.",
     varianti:["Alterna tipo di passaggio (petto/terra) a ogni giro","Aggiungi un giro attorno al gruppo tra un passaggio e l'altro"]},
  
    {id:'fip-passa-e-corri', nome:'Passa e corri', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio','coordinazione'], materiali:['palla','coni'], durata:[8,12], diagram:'staffetta',
     descrizione:"Due file una di fronte all'altra a 5 metri. Il primo passa al primo dell'altra fila e corre in coda; ricevente ripete verso l'altra fila.",
     varianti:["Aggiungi un cambio di direzione dopo il passaggio","Trasforma in gara a tempo di 30 passaggi"]},
  
    {id:'fip-passaggio-terra-petto', nome:'Alterna petto e terra', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"A coppie a 3 metri: alternano un passaggio a due mani al petto e uno schiacciato a terra, curando la spinta di entrambe le mani.",
     varianti:["Aggiungi un passo avanti prima di ogni passaggio","Sfida: 20 passaggi corretti di seguito"]},
  
    {id:'fip-triangolo-passaggi', nome:'Triangolo dei passaggi', fase:'tecnica', bande:['aquilotti'], obiettivi:['passaggio'], materiali:['palla','coni'], durata:[8,12], diagram:'staffetta',
     descrizione:"Tre bambini formano un triangolo con coni: passano la palla nel senso orario per un minuto, poi antiorario. Poi cambio ruolo.",
     varianti:["Chi passa segue la palla nella posizione successiva","Aggiungi un difensore al centro"]},
  
    {id:'fip-passaggio-nel-cerchio', nome:'Passaggio nel cerchio', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla','cerchi'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"Un cerchio a terra tra due bambini: devono passarsi la palla facendola prima rimbalzare dentro il cerchio.",
     varianti:["Aumenta la distanza dal cerchio","Aggiungi un secondo cerchio bersaglio"]},
  
    {id:'fip-passaggi-numerati', nome:'Passaggi numerati', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, ogni bambino ha un numero. Si passano la palla chiamando il numero prima di lanciare, seguendo un ordine libero.",
     varianti:["Vieta il passaggio al numero successivo o precedente","Aggiungi un secondo pallone"]},
  
    {id:'fip-palla-bruciata', nome:'Palla bruciata', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['passaggio','coordinazione'], materiali:['palla'], durata:[5,8], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, ci si passa la palla velocemente al ritmo di 'palla-bruciata!'. Chi la fa cadere o è troppo lento esce e tifa da fuori.",
     varianti:["Chi sbaglia rientra dopo 3 saltelli","Due palle contemporaneamente per aumentare la sfida"]},
  
    {id:'fip-tiro-un-metro', nome:'Tiro da un metro', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Tiri corti a un metro dal canestro, curando il movimento del polso e l'accompagnamento della palla. Prima destra, poi sinistra.",
     varianti:["Solo mano debole per due minuti","Sfida: 5 canestri consecutivi per lato"]},
  
    {id:'fip-mikan-drill', nome:'Mikan drill', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Sotto canestro: tiro appoggiato con la destra da destra, prendi il rimbalzo, tiro appoggiato con la sinistra da sinistra. Ripeti senza sosta per 1 minuto.",
     varianti:["Conta i canestri fatti in un minuto","A coppie con un pallone: uno tira, l'altro recupera"]},
  
    {id:'fip-cinque-spot', nome:'Tiro dalle 5 posizioni', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Cinque posizioni fisse attorno al canestro (angoli, ali, centro). Ogni bambino tira 2 volte da ogni posizione ruotando in senso orario.",
     varianti:["Fai segnare 1 canestro per passare alla posizione successiva","Trasforma in gara a squadre"]},
  
    {id:'fip-passa-ricevi-tira', nome:'Passa, ricevi e tira', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','passaggio'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"A coppie: uno serve il passaggio, l'altro riceve dando il target con le mani, si ferma equilibrato e tira. Poi si scambiano.",
     varianti:["Aggiungi un difensore passivo","Il passatore va a rimbalzare per il compagno"]},
  
    {id:'fip-tiro-a-tempo', nome:'Tiro a tempo', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"30 secondi a bambino: quanti canestri riesce a fare da distanza libera con recupero del proprio rimbalzo? Segnate il record personale.",
     varianti:["Zona obbligatoria (solo da 2 metri)","Sfida di squadra sommando i canestri di tutti"]},
  
    {id:'fip-gara-21', nome:'Gara del 21', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Ogni squadra deve arrivare esattamente a 21 punti: canestro corto vale 1, medio vale 2, appoggiato dopo palleggio vale 3.",
     varianti:["Chi supera 21 torna a 15","Vietato tirare due volte di seguito dalla stessa distanza"]},
  
    {id:'fip-hot-shot', nome:'Hot shot', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro','coni'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Cinque posizioni marcate con coni. Ogni canestro vale 1 punto, ma dalla posizione più lontana ne vale 2. Ognuno ha 60 secondi.",
     varianti:["Solo un tiro per posizione, poi ruoti","Bonus di 5 punti se fai canestro da tutte le posizioni"]},
  
    {id:'fip-cavallo', nome:"Il cavallo (H-O-R-S-E)", fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"A turno un bambino sceglie posizione e tipo di tiro; se segna, il successivo deve replicare. Chi sbaglia prende una lettera (C-A-V-A-L-L-O). Perde chi completa la parola.",
     varianti:["Usa parola più corta (GATTO) per giocatori più piccoli","Solo tiri da posizioni ravvicinate"]},
  
    {id:'fip-lancia-e-prendi', nome:'Lancia e prendi', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['palla'], durata:[4,6], diagram:'palleggio-libero',
     descrizione:"Lancio della palla in alto e ripresa: prima con due mani, poi con una mano, poi con un battito di mani prima della presa.",
     varianti:["Un giro su se stesso prima di riprenderla","Cambio di mano tra lancio e presa"]},
  
    {id:'fip-cerchi-numerati', nome:'Cerchi numerati', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Cerchi disposti a terra con un numero da 1 a 6. Chiami una sequenza di numeri e i bambini saltano nei cerchi nell'ordine chiamato.",
     varianti:["Aggiungi la palla in mano","Salta a piedi uniti o su un piede solo a comando"]},
  
    {id:'fip-corda-immaginaria', nome:'Corda immaginaria', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[3,5], diagram:'corsa-libera',
     descrizione:"Sul posto: saltelli a piedi uniti simulando la corda, poi alternati, poi su un piede solo. Ritmo dettato dal coach con le mani.",
     varianti:["Aumenta la frequenza dei battiti","Aggiungi rotazione del busto durante i saltelli"]},
  
    {id:'fip-specchio-gestualita', nome:'Specchio dei gesti', fase:'coordinazione', bande:['aquilotti'], obiettivi:['coordinazione'], materiali:[], durata:[4,6], diagram:'difesa-specchio',
     descrizione:"A coppie faccia a faccia: uno esegue gesti (tocca ginocchio, orecchio, spalla opposta), l'altro copia in tempo reale come uno specchio.",
     varianti:["Aumenta la velocità dei gesti","Chi sbaglia esegue 5 skip sul posto"]},
  
    {id:'fip-mani-piedi', nome:'Percorso mani e piedi', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Cerchi disposti a coppie affiancate. Il bambino passa mettendo insieme un piede e una mano in ogni coppia di cerchi, come un quadrupede.",
     varianti:["Alterna avanti e all'indietro","Aggiungi la palla in una mano"]},
  
    {id:'fip-birilli-caduti', nome:'Birilli caduti', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione','gioco di squadra'], materiali:['coni'], durata:[5,8], diagram:'corsa-libera',
     descrizione:"Metà coni in piedi, metà rovesciati. Una squadra deve rialzarli, l'altra rovesciarli. Un minuto di gioco: chi ha più coni nella propria posizione vince.",
     varianti:["Aggiungi la palla in mano","Un solo cono alla volta per bambino"]},
  
    {id:'fip-rubabandiera', nome:'Rubabandiera con la palla', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','coordinazione'], materiali:['palla'], durata:[6,10], diagram:'corsa-libera',
     descrizione:"Due squadre numerate ai lati opposti. Chiami un numero: i due bambini corrono al centro, chi prende la palla per primo torna alla propria linea; l'altro prova a toccarlo prima.",
     varianti:["Chiama due numeri per volta","Chi porta la palla deve palleggiare"]},
  
    {id:'fip-difensore-fantasma', nome:'Il difensore fantasma', fase:'gioco', bande:['aquilotti'], obiettivi:['difesa','gioco di squadra'], materiali:['palla','sedie'], durata:[6,10], diagram:'sedia-difesa',
     descrizione:"L'attaccante palleggia da una linea all'altra; il difensore, senza toccarlo, deve restare sempre tra lui e la sedia che segna il canestro immaginario.",
     varianti:["Al fischio scambio dei ruoli","Difensore con le braccia lungo i fianchi"]},
  
    {id:'fip-quattro-canestri', nome:'Quattro canestri', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','tiro'], materiali:['palla','coni','canestro'], durata:[8,12], diagram:'campo-partita',
     descrizione:"Se hai due canestri, aggiungi due 'canestri' con cerchi appoggiati ai coni. Partita libera in cui vale segnare in qualsiasi dei quattro bersagli.",
     varianti:["Canestro vero vale doppio","Passaggi obbligatori 3 prima del tiro"]},
  
    {id:'fip-basket-a-mano', nome:'Basket a mano', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla','canestro'], durata:[6,10], diagram:'campo-partita',
     descrizione:"Partita con solo passaggi (niente palleggio). Per segnare bisogna appoggiare la palla al ferro dopo una serie di passaggi.",
     varianti:["Massimo 3 secondi con la palla in mano","Almeno 5 passaggi prima del tiro"]},
  
    {id:'fip-squadre-a-canestro', nome:'Squadre a canestro', fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Due file al canestro. Il primo tira da sotto, se segna vai in fondo; se sbaglia continua finché non fa canestro. Vince la squadra che finisce prima tutti i giocatori.",
     varianti:["Ogni bambino ha 2 tentativi massimi","Aggiungi un passaggio dal fondo campo prima di tirare"]},
  
    {id:'fip-cerchio-emozioni', nome:'Cerchio delle emozioni', fase:'chiusura', bande:['pulcini','aquilotti'], obiettivi:[], materiali:[], durata:[3,6], diagram:'gruppo-cerchio',
     descrizione:"Seduti in cerchio: ogni bambino dice una parola sull'allenamento (divertente, stanco, imparato, migliorato) e la squadra risponde con un gesto condiviso.",
     varianti:["Passa una palla come 'testimone di parola'","Chiudi con un mini rito di squadra (mani al centro, grido)"]},
  
    {id:'fip2-palleggio-doppio-cerchio', nome:'Palleggio nel doppio cerchio', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla','cerchi'], durata:[8,12], diagram:'cerchi-percorso',
     descrizione:"Disponi due file di cerchi parallele. Il bambino palleggia entrando e uscendo da ogni cerchio con la mano indicata dall'allenatore, senza mai fermare il palleggio.",
     varianti:["Alterna mano ad ogni cerchio","Aggiungi un compagno che segue lo stesso percorso a distanza"]},
  
    {id:'fip2-tiro-a-cascata', nome:'Tiro a cascata', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"I bambini si dispongono in fila. Ognuno tira, recupera il proprio rimbalzo e passa la palla al compagno successivo in fila prima di rimettersi in coda, creando un flusso continuo di tiri.",
     varianti:["Chi segna resta a fare il passaggio per due giri","Riduci la distanza di tiro per chi fa più fatica"]},
  
    {id:'fip2-palleggio-numero-chiamato', nome:'Palleggio, il numero chiamato', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[6,10], diagram:'palleggio-libero',
     descrizione:"Tutti palleggiano liberi nello spazio. L'allenatore chiama un numero e i bambini devono formare al volo gruppi con quel numero di compagni, continuando a palleggiare.",
     varianti:["Chi resta fuori dal gruppo fa 3 saltelli con la palla","Aumenta la velocità di chiamata dei numeri"]},
  
    {id:'fip2-passaggio-a-catena', nome:'Passaggio a catena', fase:'gioco', bande:['aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, la palla deve passare da un bambino all'altro seguendo un ordine fisso, il più velocemente possibile, cercando di battere il tempo del giro precedente.",
     varianti:["Usa due palloni contemporaneamente in senso opposto","Cambia il tipo di passaggio (petto, sopra la testa, rimbalzato) ad ogni giro"]},
  
    {id:'fip2-cerchi-magici-tiro', nome:'I cerchi magici del tiro', fase:'tecnica', bande:['pulcini'], obiettivi:['tiro','coordinazione'], materiali:['palla','cerchi','canestro'], durata:[6,10], diagram:'cerchi-percorso',
     descrizione:"Posiziona alcuni cerchi a diverse distanze dal canestro. Il bambino salta dentro un cerchio, riceve la palla e tira subito verso canestro, poi recupera e torna in fila.",
     varianti:["Ogni cerchio ha un punteggio diverso in base alla distanza","Fai scegliere al bambino da quale cerchio partire"]},
  
    {id:'fip2-slalom-doppio-cambio', nome:'Slalom con doppio cambio di direzione', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio'], materiali:['palla','coni','aste'], durata:[8,12], diagram:'coni-zigzag',
     descrizione:"Disponi i coni in linea come nello slalom classico ma a coppie ravvicinate: il bambino deve cambiare mano due volte tra ogni coppia di coni prima di proseguire.",
     varianti:["Aumenta la distanza tra le coppie di coni per aggiungere velocità","Richiedi il cambio di mano tra le gambe","In alternativa ai coni puoi usare le aste: il passaggio più stretto rende il palleggio ancora più impegnativo"]},
  
    {id:'fip2-caccia-al-tesoro-canestro', nome:'La caccia al tesoro del canestro', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','tiro'], materiali:['palla','coni','canestro'], durata:[10,15], diagram:'campo-partita',
     descrizione:"Nascondi dei coni numerati per la palestra. Ogni squadra deve trovarne uno, tornare a canestro e segnare prima di andare a cercare il numero successivo in ordine crescente.",
     varianti:["Ogni cono trovato vale un tiro da una posizione diversa","Aggiungi un compito motorio (saltelli, capriola) prima del tiro"]},
  
    {id:'fip2-equilibrio-cerchi-salto', nome:'Equilibrio e salti nei cerchi', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Disponi i cerchi in un percorso irregolare. I bambini saltano da un cerchio all'altro alternando appoggio su due piedi e su un piede solo, mantenendo l'equilibrio ad ogni atterraggio.",
     varianti:["Aggiungi una breve pausa di equilibrio in ogni cerchio","Fai il percorso all'indietro per i più grandi"]},
  
    {id:'fip2-palla-al-capitano-mobile', nome:'Palla al capitano mobile', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Il capitano di squadra si muove liberamente in un'area delimitata mentre i compagni devono trovargli spazi per passargli la palla; ogni passaggio ricevuto dal capitano vale un punto.",
     varianti:["Cambia il capitano ogni due minuti","Vieta il palleggio, solo passaggi"]},
  
    {id:'fip2-tiro-in-movimento-laterale', nome:'Tiro dopo spostamento laterale', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Il bambino parte da un cono laterale, si sposta con passi incrociati fino sotto canestro, riceve palla dall'allenatore e conclude a canestro senza fermarsi troppo a lungo.",
     varianti:["Alterna il lato di partenza ad ogni tiro","Aggiungi un secondo cono per uno spostamento più lungo"]},
  
    {id:'fip2-doppio-slalom-coppie', nome:'Doppio slalom tra le aste a coppie', fase:'gioco', bande:['aquilotti'], obiettivi:['palleggio','gioco di squadra'], materiali:['palla','aste'], durata:[8,12], diagram:'staffetta',
     descrizione:"Due file affrontano lo stesso slalom di aste in contemporanea, palleggiando: vince la coppia che completa il percorso di andata e ritorno passandosi la palla al compagno per primo.",
     varianti:["Il cambio tra i due compagni avviene solo con un passaggio, non a mano","Aggiungi un tiro finale a chiusura del percorso"]},
  
    {id:'fip2-percorso-coordinativo-canestro', nome:'Percorso coordinativo con tiro finale', fase:'tecnica', bande:['aquilotti'], obiettivi:['coordinazione','tiro'], materiali:['coni','cerchi','palla','canestro'], durata:[10,15], diagram:'percorso-misto',
     descrizione:"Circuito con coni da saltare, cerchi in cui appoggiare i piedi e un tratto di palleggio libero, che termina sempre con un tiro a canestro per unire coordinazione e tecnica.",
     varianti:["Cronometra il giro e sfida il record personale","Dividi il circuito in due varianti, una più facile per chi ha bisogno"]},
  
    {id:'fip2-palleggio-cerchi-contati', nome:'Palleggio nei cerchi contati', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio','coordinazione'], materiali:['palla','cerchi'], durata:[6,10], diagram:'cerchi-percorso',
     descrizione:"Disponi diversi cerchi a terra. Il bambino palleggia spostandosi da un cerchio all'altro e, ogni volta che entra in un cerchio, deve fare un numero di palleggi fermo pari a quello indicato dall'allenatore.",
     varianti:["Cambia il numero ad ogni cerchio per tenere alta l'attenzione","Fai eseguire i palleggi con la mano debole"]},
  
    {id:'fip2-quattro-cantoni-palla', nome:'I quattro cantoni con le sedie', fase:'gioco', bande:['pulcini'], obiettivi:['coordinazione','gioco di squadra'], materiali:['sedie'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"Quattro sedie disposte agli angoli di un quadrato, un bambino al centro senza sedia. Al segnale tutti devono scambiarsi di sedia correndo: chi resta in piedi va al centro.",
     varianti:["Aggiungi una palla da tenere in mano durante lo scambio","Riduci il numero di sedie rispetto ai bambini per aumentare la sfida"]},
  
    {id:'fip2-tiro-a-staffetta-squadre', nome:'Staffetta di tiro a squadre', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'staffetta',
     descrizione:"Due squadre in fila dietro un cono: a turno ogni bambino corre a canestro, tira, recupera il proprio pallone e torna a dare il cambio al compagno successivo toccandogli la mano.",
     varianti:["Il turno finisce solo dopo aver segnato","Aggiungi un palleggio obbligatorio prima del tiro"]},
  
    {id:'fip2-passaggio-rimbalzo-coppie', nome:'Passaggio a rimbalzo a coppie', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio'], materiali:['palla'], durata:[6,10], diagram:'coppie-passaggio',
     descrizione:"A coppie, i bambini si scambiano il pallone facendolo rimbalzare a terra una volta prima che il compagno lo riceva, curando la precisione del punto di rimbalzo.",
     varianti:["Aumenta gradualmente la distanza tra i compagni","Alterna passaggio diretto e passaggio a rimbalzo a comando"]},
  
    {id:'fip2-percorso-cerchi-palleggio-tiro', nome:'Percorso cerchi, palleggio e tiro', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','tiro','coordinazione'], materiali:['cerchi','coni','palla','canestro'], durata:[10,15], diagram:'percorso-tiro',
     descrizione:"Il bambino attraversa una fila di cerchi palleggiando, aggira un cono e conclude con un tiro a canestro, curando che il palleggio resti controllato durante tutto il percorso.",
     varianti:["Aggiungi un secondo cono per un cambio di direzione in più","Cronometra e confronta i tempi tra i gruppi"]},
  
    {id:'fip2-gioco-belve-in-gabbia', nome:'Le belve nella gabbia di sedie', fase:'gioco', bande:['aquilotti'], obiettivi:['palleggio','difesa'], materiali:['palla','sedie'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Disponi le sedie a formare una gabbia: dentro, tutti palleggiano cercando di far perdere il controllo della palla agli avversari proteggendo la propria; chi la perde esce temporaneamente dalla gabbia.",
     varianti:["Chi esce rientra dopo aver fatto 10 palleggi fermo seduto su una sedia fuori dall'area","Riduci la gabbia per aumentare la difficoltà"]},
  
    {id:'fip2-staffetta-cerchi-salti', nome:'Staffetta a salti nei cerchi', fase:'gioco', bande:['pulcini'], obiettivi:['coordinazione','gioco di squadra'], materiali:['cerchi'], durata:[6,10], diagram:'staffetta',
     descrizione:"Due squadre in fila davanti a un percorso di cerchi: ogni bambino lo attraversa saltando a piedi uniti, poi torna di corsa e dà il cambio al compagno successivo.",
     varianti:["Cambia l'andatura richiesta (piede singolo, laterale) ad ogni giro","Aggiungi un cerchio in più per allungare il percorso"]},
  
    {id:'fip2-tiro-a-cronometro-squadre', nome:'Tiro a cronometro a squadre', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Ogni squadra ha un minuto di tempo per totalizzare più canestri possibile, con i bambini che si alternano nel tirare e recuperare il pallone per il compagno successivo.",
     varianti:["Fai ripetere la prova due volte per vedere il miglioramento","Assegna punti diversi in base alla distanza del tiro"]},
  
    {id:'fip2-palleggio-specchio-mobile', nome:'Palleggio a specchio in movimento', fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla'], durata:[8,12], diagram:'palleggio-libero',
     descrizione:"A coppie, un bambino guida palleggiando e cambiando direzione liberamente nello spazio, l'altro lo segue palleggiando a sua volta cercando di restare sempre a fianco.",
     varianti:["Cambia il ruolo di guida ogni 30 secondi","Chiedi alla guida di alternare le mani per rendere il compito più impegnativo"]},
  
    {id:'fip2-percorso-anelli-passaggio', nome:'Percorso ad anelli con passaggio', fase:'tecnica', bande:['pulcini'], obiettivi:['passaggio','coordinazione'], materiali:['cerchi','palla'], durata:[6,10], diagram:'cerchi-percorso',
     descrizione:"Il bambino avanza saltando da un cerchio all'altro; a metà percorso riceve un passaggio dall'allenatore, lo restituisce e completa il resto dei cerchi.",
     varianti:["Aggiungi un secondo passaggio verso la fine del percorso","Fai eseguire il percorso a coppie affiancate"]},
  
    {id:'fip2-gioco-del-pescatore', nome:'Il gioco del pescatore', fase:'gioco', bande:['pulcini'], obiettivi:['coordinazione','palleggio'], materiali:['palla'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"Un bambino al centro fa da 'pescatore' e, palleggiando fermo, cerca di toccare con la mano libera gli altri bambini che attraversano lo spazio palleggiando a loro volta.",
     varianti:["Chi viene toccato diventa un secondo pescatore","Riduci lo spazio di gioco man mano che i pescatori aumentano"]},
  
    {id:'fip2-tiro-progressivo-distanza', nome:'Tiro progressivo a distanza crescente', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Posiziona tre coni a distanze crescenti dal canestro. Il bambino tira dal primo cono e avanza al successivo solo dopo aver segnato, per abituarsi a gestire tiri via via più lunghi.",
     varianti:["Concedi un massimo di 3 tentativi per cono prima di passare avanti comunque","Fai ripartire dal primo cono ad ogni errore per i più esperti"]},
  
    {id:'fip2-staffetta-palleggio-slalom-passaggio', nome:'Staffetta palleggio, slalom tra le aste e passaggio', fase:'gioco', bande:['aquilotti'], obiettivi:['palleggio','passaggio','gioco di squadra'], materiali:['palla','aste'], durata:[10,15], diagram:'staffetta',
     descrizione:"Il bambino palleggia in slalom tra le aste, arrivato in fondo passa la palla a un compagno fermo che a sua volta la rimanda al giocatore successivo in fila per iniziare il turno seguente.",
     varianti:["Aggiungi un cambio di mano obbligatorio a metà slalom","Cronometra il tempo totale della squadra"]},
  
    {id:'fip2-cerchio-numeri-passaggio', nome:'Cerchio dei numeri col passaggio', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['passaggio','gioco di squadra'], materiali:['palla'], durata:[6,10], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, ogni bambino riceve un numero. L'allenatore chiama due numeri che devono scambiarsi un passaggio al volo attraverso il cerchio, mentre gli altri restano pronti a ricevere.",
     varianti:["Chiama tre numeri in sequenza per un passaggio a catena","Aumenta la velocità delle chiamate per i più grandi"]},
  
    {id:'fip2-percorso-coordinativo-pulcini', nome:'Percorso coordinativo per i più piccoli', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['coni','cerchi'], durata:[6,10], diagram:'percorso-misto',
     descrizione:"Un breve circuito con coni da girare intorno camminando e cerchi in cui saltare a piedi uniti, pensato per far vivere ai più piccoli le prime esperienze di percorso guidato.",
     varianti:["Fai ripetere il percorso imitando il verso di un animale","Aggiungi l'allenatore come guida che precede il gruppo"]},
  
    {id:'fip2-partita-passaggi-obbligati', nome:'Partita a tema con passaggi obbligati', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla','canestro'], durata:[10,15], diagram:'campo-partita',
     descrizione:"Partitella libera in cui, prima di poter tirare, ogni squadra deve completare almeno tre passaggi consecutivi senza perdere la palla, per abituare i bambini a cercare i compagni.",
     varianti:["Riduci a due i passaggi obbligati per i gruppi più giovani","Premia con un punto extra le azioni con più di tre passaggi"]},
  
    {id:'fip2-tiro-scala-squadre', nome:'Tiro a scala a squadre', fase:'chiusura', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Ogni componente della squadra tira una volta in sequenza: se il tiro entra la squadra sale di un gradino su una scala immaginaria, obiettivo comune è raggiungere insieme il gradino più alto.",
     varianti:["Usa dei coni impilati come 'scala' visibile che cresce ad ogni canestro","Concludi con un applauso di squadra al gradino raggiunto"]},
  
    {id:'fip2-saluto-cerchio-palleggio-finale', nome:'Saluto finale nel cerchio col palleggio', fase:'chiusura', bande:['pulcini','aquilotti'], obiettivi:['palleggio'], materiali:['palla'], durata:[4,6], diagram:'gruppo-cerchio',
     descrizione:"In cerchio, ogni bambino palleggia qualche secondo raccontando in una parola cosa gli è piaciuto dell'allenamento, poi passa il turno di parola e di palleggio al compagno accanto.",
     varianti:["Chi parla fa anche un ultimo palleggio speciale a scelta (tra le gambe, dietro la schiena)","Chiudi con tutti i palloni al centro e un grido di squadra"]},
  
    {id:'crem20-percorso-4-stazioni', nome:'Percorso a 4 stazioni miste', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['palleggio','tiro','coordinazione'], materiali:['palla','coni','cerchi','canestro'], durata:[15,20], diagram:'percorso-misto',
     descrizione:"Dividi i bambini in 4 piccoli gruppi che ruotano su 4 stazioni: palleggio tra i coni, salti nei cerchi, palleggio da fermi in equilibrio, tiro a canestro. Ogni stazione dura 2-3 minuti prima della rotazione.",
     varianti:["Riduci a 3 stazioni per i gruppi più giovani","Aggiungi un piccolo obiettivo a punti per ogni stazione"]},
  
    {id:'crem20-palleggio-bandierine', nome:'Palleggio a bandierine colorate', fase:'riscaldamento', bande:['pulcini','aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla','coni','aste'], durata:[5,8], diagram:'coni-zigzag',
     descrizione:"Sparpaglia coni di colori diversi nello spazio. I bambini palleggiano liberamente e, al colore chiamato dall'istruttore, devono raggiungere e toccare con una mano il cono di quel colore senza smettere di palleggiare.",
     varianti:["Chiama due colori di seguito per aumentare la difficoltà","Richiedi il cambio di mano ad ogni tocco del cono","Prova a ripetere l'esercizio con le aste al posto dei coni per stringere lo spazio di manovra"]},
  
    {id:'crem20-tris-canestro', nome:'Tris a canestro', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Posiziona 3 coni a distanze diverse da canestro. A turno i componenti di ogni squadra tirano da una delle tre posizioni: la squadra che per prima realizza un canestro da tutte e tre le posizioni vince la manche.",
     varianti:["Assegna punti diversi in base alla distanza del cono","Richiedi un passaggio a un compagno prima di ogni tiro"]},
  
    {id:'crem20-cerchi-musicali-palla', nome:'Cerchi musicali con la palla', fase:'gioco', bande:['pulcini'], obiettivi:['coordinazione','gioco di squadra'], materiali:['cerchi','palla'], durata:[6,10], diagram:'cerchi-percorso',
     descrizione:"Disponi i cerchi a terra in numero inferiore ai bambini. Mentre la musica suona (o l'istruttore batte le mani) i bambini si muovono palleggiando o tenendo la palla; quando si ferma il segnale, ognuno salta nel cerchio più vicino con la palla in mano.",
     varianti:["Chi resta senza cerchio fa un piccolo compito extra e rientra al giro successivo","Togli un cerchio ogni due giri per aumentare la sfida"]},
  
    {id:'crem20-staffetta-tiro-squadre', nome:'Staffetta con tiro a squadre', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','coni','canestro'], durata:[10,15], diagram:'staffetta',
     descrizione:"Squadre in fila dietro un cono lontano da canestro. Ogni bambino palleggia fino a canestro, tira, recupera il proprio rimbalzo e torna a passare la palla al compagno successivo, che riparte subito.",
     varianti:["Il turno finisce solo dopo un canestro realizzato","Aggiungi un secondo canestro per raddoppiare i flussi e ridurre l'attesa"]},
  
    {id:'crem20-palleggio-orologio', nome:"Palleggio dell'orologio", fase:'tecnica', bande:['aquilotti'], obiettivi:['palleggio','coordinazione'], materiali:['palla','coni','aste'], durata:[8,12], diagram:'coni-linea',
     descrizione:"Disponi i coni in cerchio come i numeri di un orologio, con un bambino al centro che palleggia. L'istruttore chiama un'ora e il bambino deve palleggiare fino a quel cono e tornare al centro senza perdere il controllo della palla.",
     varianti:["Chiama due ore consecutive per allungare il percorso","Richiedi il cambio di mano ogni volta che si torna al centro","Sostituisci metà dei coni con le aste per obbligare a un controllo di palla più fine"]},
  
    {id:'crem20-caccia-cerchio', nome:'La caccia alla sedia libera', fase:'gioco', bande:['pulcini'], obiettivi:['coordinazione','gioco di squadra'], materiali:['sedie'], durata:[5,8], diagram:'gruppo-cerchio',
     descrizione:"Sedie sparse nello spazio, una o due in meno rispetto ai bambini. Tutti corrono liberamente intorno alle sedie; al segnale devono sedersi il più velocemente possibile su una sedia libera, anche in due se necessario.",
     varianti:["Cambia andatura ad ogni giro (saltelli, passo laterale, corsa all'indietro)","Chi non trova posto propone l'andatura del giro successivo"]},
  
    {id:'crem20-doppio-cerchio-passaggi', nome:'Doppio cerchio di passaggi', fase:'tecnica', bande:['pulcini','aquilotti'], obiettivi:['passaggio','coordinazione','gioco di squadra'], materiali:['palla'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"I bambini formano un cerchio esterno e uno interno, uno di fronte all'altro. Si passano la palla al compagno di fronte, poi il cerchio interno ruota di una posizione e si ripete, così ognuno passa a tutti i compagni a turno.",
     varianti:["Alterna il senso di rotazione del cerchio interno","Usa due palloni in contemporanea per i gruppi più esperti"]},
  
    {id:'crem20-tiro-piramide', nome:'Tiro a piramide', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Posiziona coni a distanze crescenti da canestro, a formare una piccola piramide. Il bambino parte dalla posizione più vicina e può avanzare al livello successivo solo dopo aver segnato.",
     varianti:["Consenti due tentativi per livello ai più piccoli","Chi arriva in cima ricomincia dal livello più lontano per una sfida in più"]},
  
    {id:'crem20-percorso-equilibrio-palla', nome:'Percorso equilibrio con la palla', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['cerchi','coni'], durata:[6,10], diagram:'percorso-misto',
     descrizione:"Percorso misto di coni e cerchi da superare tenendo la palla con due mani sopra la testa, poi davanti al petto, curando l'equilibrio ad ogni cambio di appoggio.",
     varianti:["Fai tenere la palla con un braccio solo nel tratto finale per i più grandi","Aggiungi una breve pausa in equilibrio su un piede a metà percorso"]},
  
    {id:'crem20-palleggio-squadre-colori', nome:'Palleggio a squadre colorate', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['palleggio','gioco di squadra'], materiali:['palla','coni','aste'], durata:[8,12], diagram:'coni-zigzag',
     descrizione:"Dividi in squadre da 3-4 bambini in fila davanti a un percorso di coni a zigzag. A turno ogni componente palleggia tra i coni andata e ritorno e passa la palla al compagno successivo: vince la squadra che completa per prima il giro.",
     varianti:["Richiedi il cambio di mano ad ogni cono per gli aquilotti","Riduci il numero di coni per semplificare il percorso agli pulcini","Per i più esperti, alterna un cono e un'asta lungo il percorso per variare l'ampiezza degli ostacoli"]},
  
    {id:'crem20-cerchio-tiri-rotazione', nome:'Il cerchio dei tiri a rotazione', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"I bambini si dispongono in semicerchio intorno al canestro. A turno il primo tira, recupera il proprio rimbalzo e passa la palla al compagno successivo, spostandosi poi in fondo alla fila.",
     varianti:["Aggiungi un punto di squadra per ogni canestro consecutivo","Varia le posizioni di tiro lungo il semicerchio ad ogni giro"]},
  
    {id:'crem20-percorso-canguro', nome:'Il percorso del canguro', fase:'coordinazione', bande:['pulcini'], obiettivi:['coordinazione'], materiali:['cerchi'], durata:[5,8], diagram:'cerchi-percorso',
     descrizione:"Cerchi disposti in fila a distanza crescente. I bambini li attraversano con salti a piedi uniti, come un canguro, atterrando con equilibrio dentro ogni cerchio.",
     varianti:["Aggiungi la palla stretta tra le ginocchia per i più esperti","Alterna un salto avanti e uno laterale"]},
  
    {id:'crem20-palla-al-capitano', nome:'Palla al capitano', fase:'gioco', bande:['pulcini','aquilotti'], obiettivi:['gioco di squadra','passaggio'], materiali:['palla','coni'], durata:[8,12], diagram:'gruppo-cerchio',
     descrizione:"Un bambino di ogni squadra ('il capitano') si posiziona su un cono in fondo allo spazio di gioco. I compagni devono farsi passaggi tra loro per avvicinarsi e infine passare la palla al proprio capitano: ogni volta che ci riescono segnano un punto.",
     varianti:["Cambia il capitano ad ogni punto segnato per farli giocare tutti i ruoli","Richiedi almeno due passaggi tra i compagni prima di poter servire il capitano"]},
  
    {id:'crem20-stelle-palleggio', nome:'Le stelle del palleggio', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio','coordinazione'], materiali:['palla','coni','aste'], durata:[6,10], diagram:'coni-linea',
     descrizione:"Disponi 5 coni a formare una stella. Il bambino palleggia toccando ogni punta della stella nell'ordine indicato, tornando al centro tra un cono e l'altro.",
     varianti:["Fai scegliere ai bambini l'ordine dei coni da toccare","Cronometra il giro completo per i più grandicelli","In alternativa ai coni puoi usare le aste: il passaggio più stretto rende il palleggio ancora più impegnativo"]},
  
    {id:'crem20-tiro-punti-crescenti', nome:'Tiro a punti crescenti', fase:'gioco', bande:['aquilotti'], obiettivi:['tiro','gioco di squadra'], materiali:['palla','canestro','coni'], durata:[8,12], diagram:'tiro-canestro',
     descrizione:"Delimita con coni tre zone di tiro a distanza crescente da canestro, che valgono rispettivamente 1, 2 e 3 punti. Le squadre hanno un tempo fissato per accumulare più punti possibile, scegliendo da quale zona tirare.",
     varianti:["Concedi punti doppi nell'ultimo minuto per rendere la gara più emozionante","Richiedi un passaggio a un compagno prima di ogni tiro"]},
  
    {id:'crem20-percorso-coppie-misto', nome:'Percorso a coppie con palla e cerchi', fase:'coordinazione', bande:['pulcini','aquilotti'], obiettivi:['coordinazione','gioco di squadra'], materiali:['palla','cerchi','coni'], durata:[10,15], diagram:'percorso-misto',
     descrizione:"A coppie, un percorso misto di cerchi da saltare e coni da aggirare va completato passandosi la palla ad ogni tappa, curando la collaborazione e i tempi di passaggio.",
     varianti:["Fai completare il percorso tenendosi per mano nel tratto dei cerchi","Aggiungi un piccolo tiro a canestro come tappa finale per gli aquilotti"]},
  
    {id:'crem20-gioco-rimbalzo', nome:'Il gioco del rimbalzo', fase:'tecnica', bande:['aquilotti'], obiettivi:['tiro','coordinazione'], materiali:['palla','canestro'], durata:[6,10], diagram:'tiro-canestro',
     descrizione:"Il bambino tira a canestro e deve recuperare il proprio rimbalzo prima che la palla tocchi terra due volte, per poi passarla subito al compagno successivo in fila.",
     varianti:["Consenti un palleggio di controllo dopo il recupero per i più piccoli","Aggiungi un punto squadra per ogni rimbalzo recuperato al volo"]},
  
    {id:'crem20-labirinto-coni', nome:'Il labirinto delle aste', fase:'tecnica', bande:['pulcini'], obiettivi:['palleggio','coordinazione'], materiali:['palla','aste'], durata:[6,10], diagram:'aste-slalom',
     descrizione:"Disponi le aste a formare un semplice labirinto con corridoi larghi. Il bambino palleggia lentamente cercando la strada senza toccare le aste, guardando avanti anziché la palla.",
     varianti:["Semplifica il labirinto per i più piccoli allargando i corridoi","Cronometra il percorso per i bambini più sicuri col palleggio"]},
  
    {id:'crem20-mini-partita-premio-squadra', nome:'Mini-partita a tempo con premio squadra', fase:'gioco', bande:['aquilotti'], obiettivi:['gioco di squadra','tiro','palleggio'], materiali:['palla','canestro','coni'], durata:[10,15], diagram:'campo-partita',
     descrizione:"Piccola partita a squadre miste con tempo limitato: oltre al punteggio normale, la squadra riceve un punto bonus ogni volta che realizza un canestro dopo almeno tre passaggi consecutivi, per valorizzare il gioco corale.",
     varianti:["Riduci a due passaggi il bonus per i gruppi meno esperti","Assegna il ruolo di 'capitano che conta i passaggi' a rotazione"]}
  ],

};
