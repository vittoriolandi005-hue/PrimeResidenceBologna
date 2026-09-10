/* =========================================================
   PRIME RESIDENCE BOLOGNA
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

/* =========================================================
   00. LANGUAGE SYSTEM — EN / IT
========================================================= */

const PRIME_TRANSLATIONS={
"Prime Residence Bologna | Luxury Short Stay Apartments":"Prime Residence Bologna | Appartamenti di pregio per soggiorni a Bologna",
"Prime Residence Bologna offers refined apartments for short stays in Bologna, Italy.":"Prime Residence Bologna offre appartamenti raffinati per soggiorni a Bologna, Italia.",
"SCROLL UP TO DISCOVER":"SCORRI VERSO L’ALTO PER ENTRARE",
"Residences":"Residence",
"Experience":"Esperienza",
"Book now":"Prenota ora",
"Book Now":"Prenota ora",
"Book Your Stay":"Prenota il tuo soggiorno",
"Stay beautifully.":"Soggiorna con stile.",
"Live Bologna.":"Vivi Bologna.",
"Refined apartments designed for exceptional stays in the heart of Bologna.":"Appartamenti raffinati pensati per soggiorni eccezionali nel cuore di Bologna.",
"Book your stay":"Prenota il tuo soggiorno",
"Explore residences":"Scopri i residence",
"SCROLL TO EXPLORE":"SCORRI PER ESPLORARE",
"THE EXPERIENCE":"L’ESPERIENZA",
"MORE THAN A STAY":"PIÙ DI UN SOGGIORNO",
"A refined way to":"Un modo raffinato di",
"experience Bologna.":"vivere Bologna.",
"Prime Residence Bologna combines the independence of a private home with the elegance and attention expected from a premium hospitality experience.":"Prime Residence Bologna unisce l’indipendenza di una casa privata all’eleganza e all’attenzione di un’esperienza di ospitalità premium.",
"Every residence has been selected to offer comfort, privacy and a distinctive connection with the city. Whether you are visiting Bologna for business, culture or leisure, your stay begins here.":"Ogni residence è stato selezionato per offrire comfort, privacy e un legame autentico con la città. Che tu sia a Bologna per lavoro, cultura o piacere, il tuo soggiorno inizia qui.",
"OUR RESIDENCES":"I NOSTRI RESIDENCE",
"Designed for":"Pensati per",
"living well.":"vivere bene.",
"Two carefully selected residences, each offering a different interpretation of contemporary Bologna living.":"Due residence accuratamente selezionati, ognuno con una diversa interpretazione dell’abitare contemporaneo a Bologna.",
"BOLOGNA · ITALY":"BOLOGNA · ITALIA",
"A spacious residence created for guests looking for comfort, privacy and generous living spaces.":"Un residence spazioso pensato per chi cerca comfort, privacy e ambienti generosi.",
"3 Bedrooms":"3 Camere",
"2 Bathrooms":"2 Bagni",
"Up to 6 Guests":"Fino a 6 Ospiti",
"Discover residence":"Scopri il residence",
"An elegant and functional residence, ideal for discovering Bologna while enjoying the comfort of a private home.":"Un residence elegante e funzionale, ideale per scoprire Bologna con il comfort di una casa privata.",
"2 Bedrooms":"2 Camere",
"1 Bathroom":"1 Bagno",
"Your own space.":"Il tuo spazio.",
"Your own rhythm.":"Il tuo ritmo.",
"Forget the constraints of a traditional hotel. Our residences give you the freedom to live Bologna at your own pace.":"Dimentica i vincoli di un hotel tradizionale. I nostri residence ti danno la libertà di vivere Bologna secondo i tuoi ritmi.",
"Privacy":"Privacy",
"Your own private residence throughout your stay.":"Un residence tutto per te per l’intera durata del soggiorno.",
"Comfort":"Comfort",
"Generous spaces designed for short and extended stays.":"Spazi ampi pensati per soggiorni brevi e prolungati.",
"Location":"Posizione",
"Carefully selected locations to experience Bologna.":"Posizioni selezionate con cura per vivere Bologna.",
"DISCOVER THE CITY":"SCOPRI LA CITTÀ",
"Bologna,":"Bologna,",
"beautifully authentic.":"autentica, naturalmente.",
"Medieval streets, historic porticoes, extraordinary food and a vibrant cultural scene. Bologna is a city best experienced slowly.":"Strade medievali, portici storici, gastronomia straordinaria e una scena culturale vivace. Bologna è una città da vivere senza fretta.",
"Plan your stay":"Organizza il tuo soggiorno",
"THE PRIME STANDARD":"LO STANDARD PRIME",
"Details make":"I dettagli fanno",
"the difference.":"la differenza.",
"From the first moment to the last, every element of your stay is designed to feel effortless.":"Dal primo all’ultimo momento, ogni elemento del soggiorno è pensato per essere semplice e naturale.",
"YOUR NEXT STAY":"IL TUO PROSSIMO SOGGIORNO",
"Bologna is waiting.":"Bologna ti aspetta.",
"Make yourself at home.":"Sentiti a casa.",
"Refined short stays in Bologna, Italy.":"Soggiorni raffinati a Bologna, Italia.",
"EXPLORE":"ESPLORA",
"RESIDENCES":"RESIDENCE",
"CONTACT":"CONTATTI",
"Email us":"Scrivici",
"Prime Residence Bologna. All rights reserved.":"Prime Residence Bologna. Tutti i diritti riservati.",
"Bologna · Italy":"Bologna · Italia",
"What would you like to know about Prime Residence Bologna?":"Cosa vorresti sapere su Prime Residence Bologna?",
"Discover our residences, the experience and how to plan your stay.":"Scopri i nostri residence, l’esperienza e come organizzare il tuo soggiorno.",
"Welcome to Prime Residence Bologna. What would you like to know about us?":"Benvenuto a Prime Residence Bologna. Cosa vorresti sapere su di noi?",
"WHAT IS PRIME?":"COS’È PRIME?",
"THE RESIDENCES":"I RESIDENCE",
"COMPARE":"CONFRONTA",
"BOOKING":"PRENOTAZIONE",
"LOCATION":"POSIZIONE",
"Ask Prime Residence Assistant a question":"Fai una domanda a Prime Assistant",
"NEED PERSONAL ASSISTANCE?":"HAI BISOGNO DI ASSISTENZA PERSONALE?",
"← BACK TO RESIDENCES":"← TORNA AI RESIDENCE",
"BEDROOMS":"CAMERE",
"BATHROOMS":"BAGNI",
"GUESTS":"OSPITI",
"THE RESIDENCE":"IL RESIDENCE",
"A refined stay,":"Un soggiorno raffinato,",
"your own space.":"il tuo spazio.",
"Barontini 8 is a refined two-bedroom apartment offering privacy, practical spaces and an ideal base for experiencing Bologna.":"Barontini 8 è un raffinato appartamento con due camere da letto che offre privacy, spazi funzionali e una base ideale per vivere Bologna.",
"Designed for up to six guests, the residence combines the independence of a private apartment with a convenient base from which to discover the city.":"Pensato per ospitare fino a sei persone, il residence unisce l’indipendenza di un appartamento privato a una posizione comoda da cui scoprire la città.",
"Space to live,":"Spazio da vivere,",
"room to stay.":"spazio per soggiornare.",
"Gastone Rossi 12 is a spacious contemporary residence designed for longer stays, families and groups looking for comfort in Bologna.":"Gastone Rossi 12 è un residence contemporaneo e spazioso, pensato per soggiorni più lunghi, famiglie e gruppi in cerca di comfort a Bologna.",
"With three bedrooms, two bathrooms and space for up to six guests, the residence offers the freedom and privacy of a home while keeping Bologna within easy reach.":"Con tre camere da letto, due bagni e spazio per un massimo di sei ospiti, il residence offre la libertà e la privacy di una casa mantenendo Bologna a portata di mano.",
"GALLERY":"GALLERIA",
"MASTER BEDROOM":"CAMERA MATRIMONIALE",
"BEDROOM":"CAMERA",
"TWIN BEDROOM":"CAMERA DOPPIA",
"BEDROOM DETAIL":"DETTAGLIO CAMERA",
"BATHROOM":"BAGNO",
"KITCHEN & DINING":"CUCINA E ZONA PRANZO",
"KITCHEN":"CUCINA",
"DINING AREA":"ZONA PRANZO",
"LIVING AREA":"ZONA GIORNO",
"PRIVATE PATIO":"PATIO PRIVATO",
"GARDEN":"GIARDINO",
"GARDEN DETAIL":"DETTAGLIO GIARDINO",
"RESIDENCE EXTERIOR":"ESTERNO DEL RESIDENCE",
"SWIPE TO SWITCH PHOTO":"SCORRI PER CAMBIARE FOTO",
"Your place":"Il tuo spazio",
"in Bologna.":"a Bologna.",
"CLICK TO EXPAND":"CLICCA PER ESPANDERE",
"AROUND THE RESIDENCE":"NEI DINTORNI DEL RESIDENCE",
"EXHIBITION DISTRICT":"QUARTIERE FIERISTICO",
"ART · CULTURE":"ARTE · CULTURA",
"UNIVERSITY · CULTURE":"UNIVERSITÀ · CULTURA",
"LANDMARK · HISTORY":"MONUMENTO · STORIA",
"RAILWAY STATION":"STAZIONE FERROVIARIA",
"HISTORIC CENTRE":"CENTRO STORICO",
"SQUARE · HISTORY":"PIAZZA · STORIA",
"PARK · NATURE":"PARCO · NATURA",
"DISTANCES ARE APPROXIMATE FROM THE RESIDENCE":"LE DISTANZE SONO APPROSSIMATIVE DAL RESIDENCE",
"AMENITIES":"SERVIZI",
"Everything":"Tutto ciò",
"you need.":"che ti serve.",
"2 BEDROOMS":"2 CAMERE",
"1 BATHROOM":"1 BAGNO",
"3 BEDROOMS":"3 CAMERE",
"2 BATHROOMS":"2 BAGNI",
"UP TO 6 GUESTS":"FINO A 6 OSPITI",
"ADD AMENITY":"AGGIUNGI SERVIZIO",
"Bologna, Italy.":"Bologna, Italia.",
"CHECK-IN":"CHECK-IN",
"HOUSE RULES":"REGOLE DELLA CASA",
"Your stay":"Il tuo soggiorno",
"starts here.":"inizia qui.",
"BOOK YOUR STAY":"PRENOTA IL TUO SOGGIORNO",
"What would you like to know about Barontini 8?":"Cosa vorresti sapere su Barontini 8?",
"What would you like to know about Gastone Rossi 12?":"Cosa vorresti sapere su Gastone Rossi 12?",
"Ask about the apartment, location, booking or your stay.":"Chiedi informazioni sull’appartamento, la posizione, la prenotazione o il soggiorno.",
"Book Your Stay | Prime Residence Bologna":"Prenota il tuo soggiorno | Prime Residence Bologna",
"Book your stay.":"Prenota il tuo soggiorno.",
"Choose your residence, explore real-time availability and select your stay directly from the calendar. Then send us your booking request.":"Scegli il residence, consulta la disponibilità in tempo reale e seleziona direttamente dal calendario le date del soggiorno. Poi inviaci la tua richiesta di prenotazione.",
"01 — SELECT YOUR RESIDENCE":"01 — SELEZIONA IL RESIDENCE",
"Choose where":"Scegli dove",
"you would like to stay.":"vorresti soggiornare.",
"Select Residence →":"Seleziona residence →",
"02 — YOUR STAY":"02 — IL TUO SOGGIORNO",
"Select your":"Seleziona il tuo",
"stay.":"soggiorno.",
"Please select a residence above":"Seleziona prima un residence",
"Real-time availability":"Disponibilità in tempo reale",
"REAL-TIME AVAILABILITY":"DISPONIBILITÀ IN TEMPO REALE",
"Select a residence":"Seleziona un residence",
"Availability is based on the latest calendar data. Final confirmation follows your booking request.":"La disponibilità si basa sui dati più recenti del calendario. La conferma definitiva avviene dopo la richiesta di prenotazione.",
"WAITING":"IN ATTESA",
"Available":"Disponibile",
"Fully booked":"Al completo",
"AVAILABLE":"DISPONIBILE",
"FULLY BOOKED":"AL COMPLETO",
"Loading current availability...":"Caricamento disponibilità attuale...",
"SELECTED STAY":"SOGGIORNO SELEZIONATO",
"Check-in":"Check-in",
"Check-out":"Check-out",
"Nights":"Notti",
"Change dates":"Cambia date",
"Guests":"Ospiti",
"Number of guests":"Numero di ospiti",
"Select":"Seleziona",
"1 Guest":"1 Ospite",
"2 Guests":"2 Ospiti",
"3 Guests":"3 Ospiti",
"4 Guests":"4 Ospiti",
"5 Guests":"5 Ospiti",
"6 Guests":"6 Ospiti",
"Guest details":"Dati dell’ospite",
"First name":"Nome",
"Last name":"Cognome",
"Date of birth":"Data di nascita",
"Phone":"Telefono",
"Notes":"Note",
"Tell us anything we should know about your stay...":"Dicci qualsiasi informazione utile sul tuo soggiorno...",
"I agree to the processing of my personal data for the purpose of handling this booking request.":"Acconsento al trattamento dei miei dati personali per la gestione di questa richiesta di prenotazione.",
"Select Your Stay":"Seleziona il soggiorno",
"Send Booking Request":"Invia richiesta di prenotazione",
"This date is fully booked. Please choose an available check-in date.":"Questa data è al completo. Scegli una data di check-in disponibile.",
"Your selected stay crosses a fully booked date. Please choose another check-out date.":"Il soggiorno selezionato comprende una data al completo. Scegli un altro check-out.",
"We could not load availability at the moment. Please try again shortly.":"Non è stato possibile caricare la disponibilità. Riprova tra poco.",
"Availability Unavailable":"Disponibilità non disponibile",
"Loading Availability...":"Caricamento disponibilità...",
"Select Check-out":"Seleziona il check-out",
"Please select a residence first.":"Seleziona prima un residence.",
"Availability is not currently available. Please try again.":"La disponibilità non è al momento disponibile. Riprova.",
"Please select your check-in and check-out dates from the calendar.":"Seleziona le date di check-in e check-out dal calendario.",
"The selected stay is not available.":"Il soggiorno selezionato non è disponibile.",
"Please accept the privacy policy.":"Accetta l’informativa sulla privacy.",
"Rechecking Availability...":"Nuovo controllo disponibilità...",
"Availability has changed and these dates are no longer available. Please select another stay.":"La disponibilità è cambiata e queste date non sono più disponibili. Seleziona un altro soggiorno.",
"We could not verify availability right now. Please try again in a moment.":"Non è stato possibile verificare la disponibilità. Riprova tra poco.",
"Sending...":"Invio in corso...",
"Booking request sent successfully. We will contact you shortly to confirm your stay.":"Richiesta di prenotazione inviata con successo. Ti contatteremo a breve per confermare il soggiorno.",
"Unable to send request.":"Impossibile inviare la richiesta.",
"LOADING":"CARICAMENTO",
"UNAVAILABLE":"NON DISPONIBILE",
"fully booked":"al completo",
"available":"disponibile"
};

const PRIME_LANG_KEY="primeResidenceLanguage";

let primeLanguage=(()=>{
try{
return localStorage.getItem(PRIME_LANG_KEY)==="it"?"it":"en";
}catch{
return"en";
}
})();

const primeOriginalText=new WeakMap();
const primeOriginalAttrs=new WeakMap();

const primeNorm=s=>String(s||"").replace(/\s+/g," ").trim();

/* QUESTA FUNZIONE È IMPORTANTE PER CALENDARIO E FORM */

const primeTranslate=s=>{
const text=String(s??"");
return primeLanguage==="it"
?(PRIME_TRANSLATIONS[primeNorm(text)]||text)
:text;
};

function primeTranslateTextNode(node){

if(!node||node.nodeType!==3)return;

if(!primeOriginalText.has(node)){
primeOriginalText.set(node,node.nodeValue);
}

const original=primeOriginalText.get(node);
const normalized=primeNorm(original);

if(!normalized)return;

const translated=
primeLanguage==="it"
?PRIME_TRANSLATIONS[normalized]
:undefined;

const desired=
translated!==undefined
?original.replace(normalized,translated)
:original;

if(node.nodeValue!==desired){
node.nodeValue=desired;
}

}

function primeTranslateElement(el){

if(
!el||
el.nodeType!==1||
["SCRIPT","STYLE"].includes(el.tagName)
)return;

["placeholder","aria-label","title"].forEach(attr=>{

if(!el.hasAttribute(attr))return;

let store=primeOriginalAttrs.get(el)||{};

if(!(attr in store)){
store[attr]=el.getAttribute(attr);
}

primeOriginalAttrs.set(el,store);

const original=store[attr];

const translated=
primeLanguage==="it"
?PRIME_TRANSLATIONS[primeNorm(original)]
:undefined;

el.setAttribute(
attr,
translated!==undefined
?translated
:original
);

});

for(const child of el.childNodes){

if(child.nodeType===3){
primeTranslateTextNode(child);
}else{
primeTranslateElement(child);
}

}

}

function primeUpdateLanguageButtons(){

document
.querySelectorAll(".language-switcher button[data-lang]")
.forEach(btn=>{

btn.classList.toggle(
"active",
btn.dataset.lang===primeLanguage
);

});

}

function primeApplyLanguage(){

document.documentElement.lang=primeLanguage;

primeTranslateElement(document.body);

const titleOriginal=
document.documentElement.dataset.primeOriginalTitle||
(
document.documentElement.dataset.primeOriginalTitle=
document.title
);

document.title=
primeLanguage==="it"
?(
PRIME_TRANSLATIONS[primeNorm(titleOriginal)]||
titleOriginal
)
:titleOriginal;

const meta=
document.querySelector('meta[name="description"]');

if(meta){

const original=
meta.dataset.primeOriginal||
meta.content;

meta.dataset.primeOriginal=original;

meta.content=
primeLanguage==="it"
?(
PRIME_TRANSLATIONS[primeNorm(original)]||
original
)
:original;

}

primeUpdateLanguageButtons();

window.dispatchEvent(
new CustomEvent(
"primeLanguageChanged",
{
detail:{lang:primeLanguage}
}
)
);

}

function primeSetLanguage(lang){

primeLanguage=
lang==="it"
?"it"
:"en";

try{
localStorage.setItem(
PRIME_LANG_KEY,
primeLanguage
);
}catch{}

primeApplyLanguage();

}

function primeCreateSwitcher(){

const make=cls=>{

const wrap=document.createElement("div");

wrap.className=
`language-switcher ${cls||""}`.trim();

wrap.setAttribute(
"aria-label",
"Language / Lingua"
);

wrap.innerHTML=
'<button type="button" data-lang="en">EN</button><span class="language-switcher-separator">/</span><button type="button" data-lang="it">IT</button>';

wrap
.querySelectorAll("button")
.forEach(button=>{

button.addEventListener(
"click",
()=>primeSetLanguage(button.dataset.lang)
);

});

return wrap;

};

const desktop=
document.querySelector(".desktop-nav");

if(desktop){

const switcher=make();

const book=
desktop.querySelector(".nav-book");

book
?desktop.insertBefore(switcher,book)
:desktop.appendChild(switcher);

const navContainer=
document.querySelector(".nav-container");

const toggle=
navContainer&&
navContainer.querySelector(".menu-toggle");

if(navContainer&&toggle){

navContainer.insertBefore(
make("language-switcher-mobile"),
toggle
);

}

}else{

const apartmentRight=
document.querySelector(".apartment-nav-right");

if(apartmentRight){

apartmentRight.insertBefore(
make(),
apartmentRight.firstChild
);

}

}

primeUpdateLanguageButtons();

}

primeCreateSwitcher();
primeApplyLanguage();

const primeLanguageObserver=
new MutationObserver(
mutations=>{

for(const mutation of mutations){

if(mutation.type==="childList"){

mutation.addedNodes.forEach(node=>{

if(node.nodeType===3){
primeTranslateTextNode(node);
}else if(node.nodeType===1){
primeTranslateElement(node);
}

});

}else if(mutation.type==="characterData"){

primeTranslateTextNode(
mutation.target
);

}

}

}
);

primeLanguageObserver.observe(
document.body,
{
subtree:true,
childList:true,
characterData:true
}
);


/* =========================================================
   01. PREMIUM INTRO
========================================================= */

const loader=document.querySelector(".loader");
const hero=document.querySelector(".hero");

if(loader&&hero){

const INTRO_DURATION=2200;

let introFinished=false;
let introAnimating=false;
let startTime=null;
let touchStartY=0;
let mouseStartY=0;
let mouseCurrentY=0;
let mouseDragging=false;

document.body.style.overflow="hidden";

loader.style.transform="translate3d(0,0,0)";
loader.style.willChange="transform";

const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function finishIntro(){

introFinished=true;
introAnimating=false;

loader.style.transform=
"translate3d(0,-100%,0)";

loader.classList.add("hide");
loader.classList.remove("mouse-dragging");

document.body.style.userSelect="";
document.body.style.overflow="";

}

function animate(now){

if(!startTime){
startTime=now;
}

const progress=
Math.min(
(now-startTime)/INTRO_DURATION,
1
);

loader.style.transform=
`translate3d(0,${-ease(progress)*100}%,0)`;

progress<1
?requestAnimationFrame(animate)
:finishIntro();

}

function startIntro(){

if(
introFinished||
introAnimating
)return;

introAnimating=true;
startTime=null;

window.dispatchEvent(
new CustomEvent("primeIntroStarted")
);

requestAnimationFrame(animate);

}

window.addEventListener(
"wheel",
e=>{

if(introFinished)return;

e.preventDefault();

if(e.deltaY<0){
startIntro();
}

},
{
passive:false
}
);

window.addEventListener(
"touchstart",
e=>{

if(
introFinished||
introAnimating
)return;

touchStartY=
e.touches[0].clientY;

},
{
passive:true
}
);

window.addEventListener(
"touchmove",
e=>{

if(
introFinished||
introAnimating
)return;

if(
touchStartY-
e.touches[0].clientY>
12
){

e.preventDefault();
startIntro();

}

},
{
passive:false
}
);

loader.addEventListener(
"mousedown",
e=>{

if(
introFinished||
introAnimating||
e.button!==0
)return;

mouseDragging=true;
mouseStartY=e.clientY;
mouseCurrentY=e.clientY;

loader.classList.add(
"mouse-dragging"
);

document.body.style.userSelect=
"none";

}
);

window.addEventListener(
"mousemove",
e=>{

if(
!mouseDragging||
introFinished||
introAnimating
)return;

mouseCurrentY=
e.clientY;

if(
mouseStartY-
mouseCurrentY>=35
){

mouseDragging=false;

loader.classList.remove(
"mouse-dragging"
);

document.body.style.userSelect="";

startIntro();

}

}
);

window.addEventListener(
"mouseup",
e=>{

if(!mouseDragging)return;

mouseDragging=false;
mouseCurrentY=e.clientY;

loader.classList.remove(
"mouse-dragging"
);

document.body.style.userSelect="";

if(
mouseStartY-
mouseCurrentY>=35
){
startIntro();
}

}
);

loader.addEventListener(
"dragstart",
e=>e.preventDefault()
);

window.addEventListener(
"keydown",
e=>{

if(introFinished)return;

if(
e.key==="ArrowUp"||
e.key==="PageUp"
){

e.preventDefault();
startIntro();

}

}
);

}


/* =========================================================
   02. NAVBAR
========================================================= */

const navbar=
document.querySelector(".navbar");

function updateNavbar(){

if(!navbar)return;

window.scrollY>50
?navbar.classList.add("scrolled")
:navbar.classList.remove("scrolled");

}

updateNavbar();

window.addEventListener(
"scroll",
updateNavbar,
{
passive:true
}
);


/* =========================================================
   03. MOBILE MENU
========================================================= */

const menuToggle=
document.querySelector(".menu-toggle");

const mobileMenu=
document.querySelector(".mobile-menu");

if(menuToggle&&mobileMenu){

menuToggle.setAttribute(
"aria-expanded",
"false"
);

menuToggle.addEventListener(
"click",
()=>{

const open=
menuToggle.classList.toggle("active");

mobileMenu.classList.toggle(
"active",
open
);

menuToggle.setAttribute(
"aria-expanded",
open?"true":"false"
);

document.body.style.overflow=
open?"hidden":"";

}
);

mobileMenu
.querySelectorAll("a")
.forEach(link=>{

link.addEventListener(
"click",
()=>{

menuToggle.classList.remove(
"active"
);

mobileMenu.classList.remove(
"active"
);

menuToggle.setAttribute(
"aria-expanded",
"false"
);

document.body.style.overflow="";

}
);

});

}


/* =========================================================
   04. REVEAL
========================================================= */

const revealElements=
document.querySelectorAll(".reveal");

if(revealElements.length){

const observer=
new IntersectionObserver(
entries=>{

entries.forEach(
entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"visible"
);

observer.unobserve(
entry.target
);

}

}
);

},
{
threshold:.12
}
);

revealElements.forEach(
el=>observer.observe(el)
);

}


/* =========================================================
   05. PREMIUM AUTOMATIC PAGE SCROLL
========================================================= */

let premiumScrollAnimation=null;

function premiumEase(t){

return t<.5
?4*t*t*t
:1-Math.pow(-2*t+2,3)/2;

}

function premiumScrollTo(
target,
duration=1400
){

if(!target)return;

if(premiumScrollAnimation){

cancelAnimationFrame(
premiumScrollAnimation
);

premiumScrollAnimation=null;

}

const navOffset=
navbar
?navbar.offsetHeight
:0;

const startY=
window.scrollY;

const targetY=
Math.max(
0,
target.getBoundingClientRect().top+
window.scrollY-
navOffset
);

const distance=
targetY-startY;

if(Math.abs(distance)<2)return;

let startTime=null;

function scrollFrame(time){

if(!startTime){
startTime=time;
}

const elapsed=
time-startTime;

const progress=
Math.min(
elapsed/duration,
1
);

const eased=
premiumEase(progress);

window.scrollTo(
0,
startY+
(distance*eased)
);

if(progress<1){

premiumScrollAnimation=
requestAnimationFrame(
scrollFrame
);

}else{

premiumScrollAnimation=null;

window.scrollTo(
0,
targetY
);

}

}

premiumScrollAnimation=
requestAnimationFrame(
scrollFrame
);

}

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(link=>{

link.addEventListener(
"click",
e=>{

const id=
link.getAttribute("href");

if(
!id||
id==="#"
)return;

const target=
document.querySelector(id);

if(!target)return;

e.preventDefault();

if(
mobileMenu&&
mobileMenu.classList.contains(
"active"
)
){

mobileMenu.classList.remove(
"active"
);

if(menuToggle){

menuToggle.classList.remove(
"active"
);

menuToggle.setAttribute(
"aria-expanded",
"false"
);

}

document.body.style.overflow="";

}

setTimeout(
()=>premiumScrollTo(
target,
1400
),
20
);

}
);

});


/* =========================================================
   06. APARTMENT GALLERY
========================================================= */

document
.querySelectorAll(
".apartment-gallery"
)
.forEach(gallery=>{

const slides=[
...gallery.querySelectorAll(
".apartment-slide"
)
];

if(slides.length<2)return;

const section=
gallery.closest(
".apartment-gallery-section"
);

const counter=
section
?section.querySelector(
".apartment-gallery-counter"
)
:null;

let current=0;
let autoplay=null;

let pointerDown=false;
let pointerId=null;
let startX=0;
let startY=0;
let currentX=0;
let currentY=0;

const SWIPE_THRESHOLD=45;

gallery.style.touchAction="pan-y";
gallery.style.cursor="grab";
gallery.style.userSelect="none";

gallery
.querySelectorAll("img")
.forEach(img=>{

img.draggable=false;

img.setAttribute(
"draggable",
"false"
);

img.addEventListener(
"dragstart",
e=>e.preventDefault()
);

});

function showSlide(index){

if(index<0){
index=slides.length-1;
}

if(index>=slides.length){
index=0;
}

slides.forEach(
(slide,i)=>{

slide.classList.toggle(
"active",
i===index
);

}
);

current=index;

if(counter){

counter.textContent=
`${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;

}

}

function nextSlide(){
showSlide(current+1);
}

function previousSlide(){
showSlide(current-1);
}

function stopAutoplay(){

if(!autoplay)return;

clearInterval(autoplay);
autoplay=null;

}

function startAutoplay(){

stopAutoplay();

autoplay=
setInterval(
nextSlide,
5000
);

}

function finishSwipe(){

if(!pointerDown)return;

const deltaX=
currentX-startX;

const deltaY=
currentY-startY;

pointerDown=false;
pointerId=null;

gallery.style.cursor=
"grab";

if(
Math.abs(deltaX)>=
SWIPE_THRESHOLD&&
Math.abs(deltaX)>
Math.abs(deltaY)
){

if(deltaX<0){
nextSlide();
}else{
previousSlide();
}

}

startAutoplay();

}

gallery.addEventListener(
"pointerdown",
e=>{

if(
e.pointerType==="mouse"&&
e.button!==0
)return;

pointerDown=true;
pointerId=e.pointerId;

startX=currentX=e.clientX;
startY=currentY=e.clientY;

gallery.style.cursor=
"grabbing";

stopAutoplay();

try{
gallery.setPointerCapture(
e.pointerId
);
}catch{}

}
);

gallery.addEventListener(
"pointermove",
e=>{

if(
!pointerDown||
e.pointerId!==pointerId
)return;

currentX=e.clientX;
currentY=e.clientY;

const deltaX=
currentX-startX;

const deltaY=
currentY-startY;

if(
Math.abs(deltaX)>10&&
Math.abs(deltaX)>
Math.abs(deltaY)&&
e.cancelable
){

e.preventDefault();

}

}
);

gallery.addEventListener(
"pointerup",
e=>{

if(
!pointerDown||
e.pointerId!==pointerId
)return;

currentX=e.clientX;
currentY=e.clientY;

finishSwipe();

try{
gallery.releasePointerCapture(
e.pointerId
);
}catch{}

}
);

gallery.addEventListener(
"pointercancel",
()=>{

pointerDown=false;
pointerId=null;

gallery.style.cursor=
"grab";

startAutoplay();

}
);

gallery.addEventListener(
"lostpointercapture",
()=>{

if(pointerDown){
finishSwipe();
}

}
);

gallery.addEventListener(
"mouseenter",
()=>{
stopAutoplay();
}
);

gallery.addEventListener(
"mouseleave",
()=>{

if(!pointerDown){
startAutoplay();
}

}
);

showSlide(0);
startAutoplay();

});


/* =========================================================
   07. BOOKING CALENDAR
========================================================= */

const bookingCards=
document.querySelectorAll(
".booking-residence-card"
);

const bookingForm=
document.querySelector(
"#bookingRequestForm"
);

const residenceInput=
document.querySelector(
"#residence"
);

const calendarResidence=
document.querySelector(
"#calendarResidence"
);

const checkinInput=
document.querySelector(
"#checkin"
);

const checkoutInput=
document.querySelector(
"#checkout"
);

const selectedResidenceText=
document.querySelector(
"#selectedResidenceText"
);

const bookingFormSection=
document.querySelector(
"#booking-form-section"
);

const bookingMessage=
document.querySelector(
"#bookingMessage"
);

const bookingSubmit=
document.querySelector(
".booking-submit"
);

const primeCalendar=
document.querySelector(
"#primeCalendar"
);

const calendarGrid=
document.querySelector(
"#calendarGrid"
);

const calendarMonthLabel=
document.querySelector(
"#calendarMonthLabel"
);

const calendarPrev=
document.querySelector(
"#calendarPrev"
);

const calendarNext=
document.querySelector(
"#calendarNext"
);

const calendarResidenceTitle=
document.querySelector(
"#calendarResidenceTitle"
);

const calendarLiveStatus=
document.querySelector(
"#calendarLiveStatus"
);

const calendarLiveText=
document.querySelector(
"#calendarLiveText"
);

const calendarLoadingMessage=
document.querySelector(
"#calendarLoadingMessage"
);

const calendarMessage=
document.querySelector(
"#calendarMessage"
);

const selectedStay=
document.querySelector(
"#selectedStay"
);

const selectedStayResidence=
document.querySelector(
"#selectedStayResidence"
);

const selectedStayCheckin=
document.querySelector(
"#selectedStayCheckin"
);

const selectedStayCheckout=
document.querySelector(
"#selectedStayCheckout"
);

const selectedStayNights=
document.querySelector(
"#selectedStayNights"
);

const selectedStayClear=
document.querySelector(
"#selectedStayClear"
);

let calendarEvents=[];
let selectedStart="";
let selectedEnd="";
let previewEnd="";
let calendarLoaded=false;
let currentCalendarKey="";
let calendarRequestId=0;

let dragActive=false;
let dragStart="";
let dragMoved=false;
let suppressClick=false;

const todayISO=()=>{

const d=new Date();

return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

};

const parseISO=value=>{

const[y,m,d]=
value
.split("-")
.map(Number);

return new Date(
y,
m-1,
d
);

};

const dateISO=date=>
`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

const addDays=(value,days)=>{

const d=
parseISO(value);

d.setDate(
d.getDate()+days
);

return dateISO(d);

};

const prettyDate=value=>
parseISO(value)
.toLocaleDateString(
primeLanguage==="it"
?"it-IT"
:"en-GB",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)
.toUpperCase();

const nightsBetween=(start,end)=>
Math.round(
(
parseISO(end)-
parseISO(start)
)/
86400000
);

let displayMonth=
new Date();

displayMonth=
new Date(
displayMonth.getFullYear(),
displayMonth.getMonth(),
1
);

function isBooked(day){

return calendarEvents.some(
event=>
event.start&&
event.end&&
day>=event.start&&
day<event.end
);

}

function isPast(day){

return day<todayISO();

}

function rangeHasConflict(
start,
end
){

if(
!start||
!end||
end<=start
){
return true;
}

for(
let day=start;
day<end;
day=addDays(day,1)
){

if(isBooked(day)){
return true;
}

}

return false;

}

function validCheckout(
start,
end
){

return(
!!start&&
!!end&&
end>start&&
!rangeHasConflict(
start,
end
)
);

}

function clearCalendarMessage(){

if(!calendarMessage)return;

calendarMessage.className=
"calendar-message";

calendarMessage.textContent=
"";

}

function showCalendarMessage(
text,
type="info"
){

if(!calendarMessage)return;

calendarMessage.textContent=
primeTranslate(text);

calendarMessage.className=
`calendar-message visible ${type}`;

}

function lockSubmit(
text="Select Your Stay"
){

if(!bookingSubmit)return;

bookingSubmit.disabled=true;

bookingSubmit.classList.add(
"availability-locked"
);

bookingSubmit.textContent=
primeTranslate(text);

}

function unlockSubmit(){

if(!bookingSubmit)return;

bookingSubmit.disabled=false;

bookingSubmit.classList.remove(
"availability-locked"
);

bookingSubmit.textContent=
primeTranslate(
"Send Booking Request"
);

}

function clearStay(
render=true
){

selectedStart="";
selectedEnd="";
previewEnd="";

if(checkinInput){
checkinInput.value="";
}

if(checkoutInput){
checkoutInput.value="";
}

if(selectedStay){
selectedStay.classList.remove(
"visible"
);
}

lockSubmit();

if(render){
renderCalendar();
}

}

function updateSelectedStay(){

if(
!selectedStart||
!selectedEnd||
!validCheckout(
selectedStart,
selectedEnd
)
){

if(selectedStay){

selectedStay.classList.remove(
"visible"
);

}

lockSubmit();

return;

}

if(checkinInput){
checkinInput.value=
selectedStart;
}

if(checkoutInput){
checkoutInput.value=
selectedEnd;
}

if(selectedStayResidence){

selectedStayResidence.textContent=
residenceInput
?residenceInput.value
:"";

}

if(selectedStayCheckin){

selectedStayCheckin.textContent=
prettyDate(
selectedStart
);

}

if(selectedStayCheckout){

selectedStayCheckout.textContent=
prettyDate(
selectedEnd
);

}

if(selectedStayNights){

selectedStayNights.textContent=
String(
nightsBetween(
selectedStart,
selectedEnd
)
);

}

if(selectedStay){

selectedStay.classList.add(
"visible"
);

}

unlockSubmit();

}

function selectionBounds(){

if(
selectedStart&&
selectedEnd
){

return[
selectedStart,
selectedEnd
];

}

if(
selectedStart&&
previewEnd&&
previewEnd>selectedStart&&
validCheckout(
selectedStart,
previewEnd
)
){

return[
selectedStart,
previewEnd
];

}

return[
selectedStart,
""
];

}

function renderCalendar(){

if(
!calendarGrid||
!calendarMonthLabel
)return;

calendarGrid.innerHTML="";

calendarMonthLabel.textContent=
displayMonth.toLocaleDateString(
primeLanguage==="it"
?"it-IT"
:"en-GB",
{
month:"long",
year:"numeric"
}
);

const y=
displayMonth.getFullYear();

const m=
displayMonth.getMonth();

const first=
new Date(
y,
m,
1
);

const daysInMonth=
new Date(
y,
m+1,
0
).getDate();

const leading=
(first.getDay()+6)%7;

if(calendarPrev){

const now=
new Date();

const currentMonth=
new Date(
now.getFullYear(),
now.getMonth(),
1
);

calendarPrev.disabled=
displayMonth<=
currentMonth;

}

for(
let i=0;
i<leading;
i++
){

const empty=
document.createElement(
"div"
);

empty.className=
"calendar-empty";

calendarGrid.appendChild(
empty
);

}

const[
rangeStart,
rangeEnd
]=selectionBounds();

for(
let day=1;
day<=daysInMonth;
day++
){

const date=
new Date(
y,
m,
day
);

const iso=
dateISO(date);

const button=
document.createElement(
"button"
);

const booked=
isBooked(iso);

const past=
isPast(iso);

button.type=
"button";

button.className=
"booking-calendar-day";

button.dataset.date=
iso;

button.textContent=
String(day);

button.setAttribute(
"aria-label",
`${prettyDate(iso)} ${booked?primeTranslate("fully booked"):primeTranslate("available")}`
);

if(past){

button.classList.add(
"past"
);

button.disabled=
true;

}else{

button.classList.add(
booked
?"booked"
:"available"
);

}

if(
iso===
todayISO()
){

button.classList.add(
"today"
);

}

if(
rangeStart&&
iso===rangeStart
){

button.classList.add(
"checkin"
);

}

if(
rangeEnd&&
iso===rangeEnd
){

button.classList.add(
"checkout"
);

}

if(
rangeStart&&
rangeEnd&&
iso>rangeStart&&
iso<rangeEnd
){

button.classList.add(
"in-range"
);

}

button.addEventListener(
"click",
()=>handleDayClick(
iso
)
);

button.addEventListener(
"mousedown",
e=>startCalendarDrag(
e,
iso
)
);

calendarGrid.appendChild(
button
);

}

}

function handleDayClick(day){

if(suppressClick){

suppressClick=false;
return;

}

clearCalendarMessage();

if(isPast(day))return;


/* PRIMO CLICK */

if(!selectedStart){

if(isBooked(day)){

showCalendarMessage(
"This date is fully booked. Please choose an available check-in date.",
"info"
);

return;

}

selectedStart=day;
selectedEnd="";
previewEnd="";

if(checkinInput){
checkinInput.value=day;
}

if(checkoutInput){
checkoutInput.value="";
}

if(selectedStay){

selectedStay.classList.remove(
"visible"
);

}

lockSubmit(
"Select Check-out"
);

renderCalendar();

return;

}


/* NUOVA SELEZIONE DOPO RANGE COMPLETO */

if(
selectedStart&&
selectedEnd
){

if(isBooked(day)){

showCalendarMessage(
"This date is fully booked. Please choose an available check-in date.",
"info"
);

return;

}

selectedStart=day;
selectedEnd="";
previewEnd="";

if(checkinInput){
checkinInput.value=day;
}

if(checkoutInput){
checkoutInput.value="";
}

if(selectedStay){

selectedStay.classList.remove(
"visible"
);

}

lockSubmit(
"Select Check-out"
);

renderCalendar();

return;

}


/* CLICK SULLO STESSO GIORNO */

if(
day===
selectedStart
){

clearStay();

return;

}


/* CLICK PRIMA DEL CHECK-IN */

if(
day<
selectedStart
){

if(isBooked(day)){

showCalendarMessage(
"This date is fully booked. Please choose an available check-in date.",
"info"
);

return;

}

selectedStart=day;
selectedEnd="";
previewEnd="";

if(checkinInput){
checkinInput.value=day;
}

if(checkoutInput){
checkoutInput.value="";
}

lockSubmit(
"Select Check-out"
);

renderCalendar();

return;

}


/* SECONDO CLICK = CHECK-OUT */

if(
day>
selectedStart
){

if(
!validCheckout(
selectedStart,
day
)
){

showCalendarMessage(
"Your selected stay crosses a fully booked date. Please choose another check-out date.",
"error"
);

return;

}

selectedEnd=day;
previewEnd="";

clearCalendarMessage();

updateSelectedStay();

renderCalendar();

}

}


/* =========================================================
   DRAG CALENDAR
========================================================= */

function startCalendarDrag(
e,
day
){

if(
e.button!==0||
isPast(day)||
isBooked(day)
)
return;

dragActive=true;
dragMoved=false;
dragStart=day;
previewEnd="";

document.body.style.userSelect=
"none";

}

document.addEventListener(
"mouseover",
e=>{

if(!dragActive)return;

const cell=
e.target.closest(
".booking-calendar-day"
);

if(
!cell||
!cell.dataset.date
)
return;

const day=
cell.dataset.date;

if(
day===dragStart
)
return;

dragMoved=true;

if(
day>dragStart&&
validCheckout(
dragStart,
day
)
){

selectedStart=
dragStart;

selectedEnd="";

previewEnd=
day;

renderCalendar();

}

}
);

document.addEventListener(
"mouseup",
()=>{

if(!dragActive)return;

dragActive=false;

document.body.style.userSelect="";

if(
dragMoved&&
previewEnd&&
previewEnd>dragStart&&
validCheckout(
dragStart,
previewEnd
)
){

selectedStart=
dragStart;

selectedEnd=
previewEnd;

previewEnd="";

suppressClick=true;

clearCalendarMessage();

updateSelectedStay();

renderCalendar();

return;

}

/* SEMPLICE CLICK: NON RIDISEGNARE QUI */

previewEnd="";
dragMoved=false;

}
);


/* =========================================================
   LOAD AVAILABILITY
========================================================= */

async function loadCalendar(
calendarKey,
residenceName
){

if(!primeCalendar)return;

const requestId=
++calendarRequestId;

currentCalendarKey=
calendarKey;

calendarLoaded=false;
calendarEvents=[];

clearStay(false);
clearCalendarMessage();

primeCalendar.classList.remove(
"disabled"
);

if(calendarResidenceTitle){

calendarResidenceTitle.textContent=
residenceName;

}

if(calendarLiveText){

calendarLiveText.textContent=
primeTranslate(
"LOADING"
);

}

if(calendarLiveStatus){

calendarLiveStatus.classList.add(
"loading"
);

}

if(calendarLoadingMessage){

calendarLoadingMessage.classList.add(
"visible"
);

calendarLoadingMessage.textContent=
primeTranslate(
"Loading current availability..."
);

}

lockSubmit(
"Loading Availability..."
);

const now=
new Date();

displayMonth=
new Date(
now.getFullYear(),
now.getMonth(),
1
);

renderCalendar();

try{

const response=
await fetch(
`/api/availability?residence=${encodeURIComponent(calendarKey)}`,
{
cache:"no-store"
}
);

const result=
await response.json();

if(
requestId!==
calendarRequestId
)
return;

if(
!response.ok||
!result.success
){

throw new Error(
result.error||
"Unable to retrieve calendar."
);

}

calendarEvents=
Array.isArray(
result.events
)
?result.events.filter(
event=>
event.start&&
event.end
)
:[];

calendarLoaded=
true;

if(calendarLiveText){

calendarLiveText.textContent=
"LIVE";

}

if(calendarLiveStatus){

calendarLiveStatus.classList.remove(
"loading"
);

}

if(calendarLoadingMessage){

calendarLoadingMessage.classList.remove(
"visible"
);

}

lockSubmit(
"Select Your Stay"
);

renderCalendar();

}catch(error){

if(
requestId!==
calendarRequestId
)
return;

calendarLoaded=
false;

if(calendarLiveText){

calendarLiveText.textContent=
primeTranslate(
"UNAVAILABLE"
);

}

if(calendarLiveStatus){

calendarLiveStatus.classList.remove(
"loading"
);

}

if(calendarLoadingMessage){

calendarLoadingMessage.classList.remove(
"visible"
);

}

showCalendarMessage(
"We could not load availability at the moment. Please try again shortly.",
"error"
);

primeCalendar.classList.add(
"disabled"
);

lockSubmit(
"Availability Unavailable"
);

}

}


/* =========================================================
   SELECT RESIDENCE
========================================================= */

function selectResidence(card){

if(!card)return;

bookingCards.forEach(
c=>c.classList.remove(
"selected"
)
);

card.classList.add(
"selected"
);

const residence=
card.dataset.residence||
"";

const calendar=
card.dataset.calendar||
"";

if(residenceInput){
residenceInput.value=
residence;
}

if(calendarResidence){
calendarResidence.value=
calendar;
}

if(selectedResidenceText){

selectedResidenceText.textContent=
residence;

}

/* IMPORTANTE: CARICA IL CALENDARIO DEL RESIDENCE SCELTO */

loadCalendar(
calendar,
residence
);

if(bookingFormSection){

setTimeout(()=>{

bookingFormSection.scrollIntoView({
behavior:"smooth",
block:"start"
});

},100);

}

}

bookingCards.forEach(
card=>{

card.addEventListener(
"click",
()=>selectResidence(
card
)
);

card.addEventListener(
"keydown",
e=>{

if(
e.key==="Enter"||
e.key===" "
){

e.preventDefault();

selectResidence(
card
);

}

}
);

}
);


/* =========================================================
   MONTH NAVIGATION
========================================================= */

if(calendarPrev){

calendarPrev.addEventListener(
"click",
()=>{

const now=
new Date();

const currentMonth=
new Date(
now.getFullYear(),
now.getMonth(),
1
);

const previous=
new Date(
displayMonth.getFullYear(),
displayMonth.getMonth()-1,
1
);

if(
previous>=
currentMonth
){

displayMonth=
previous;

renderCalendar();

}

}
);

}

if(calendarNext){

calendarNext.addEventListener(
"click",
()=>{

displayMonth=
new Date(
displayMonth.getFullYear(),
displayMonth.getMonth()+1,
1
);

renderCalendar();

}
);

}

if(selectedStayClear){

selectedStayClear.addEventListener(
"click",
()=>{

clearStay();
clearCalendarMessage();

}
);

}


/* =========================================================
   UPDATE CALENDAR WHEN LANGUAGE CHANGES
========================================================= */

window.addEventListener(
"primeLanguageChanged",
()=>{

if(calendarGrid){
renderCalendar();
}

if(
selectedStart&&
selectedEnd
){
updateSelectedStay();
}

}
);


/* =========================================================
   BOOKING FORM
========================================================= */

function showMessage(
text,
type
){

if(!bookingMessage)return;

bookingMessage.textContent=
primeTranslate(text);

bookingMessage.className=
`booking-message ${type}`;

bookingMessage.style.display=
"block";

}

function hideMessage(){

if(bookingMessage){

bookingMessage.style.display=
"none";

}

}

async function verifyStayAgain(){

if(
!currentCalendarKey||
!selectedStart||
!selectedEnd
)
return false;

const response=
await fetch(
`/api/availability?residence=${encodeURIComponent(currentCalendarKey)}&t=${Date.now()}`,
{
cache:"no-store"
}
);

const result=
await response.json();

if(
!response.ok||
!result.success
){

throw new Error(
"Unable to verify availability."
);

}

const latestEvents=
Array.isArray(
result.events
)
?result.events.filter(
event=>
event.start&&
event.end
)
:[];

return !latestEvents.some(
event=>{

for(
let day=selectedStart;
day<selectedEnd;
day=addDays(day,1)
){

if(
day>=event.start&&
day<event.end
){

return true;

}

}

return false;

}
);

}

if(bookingForm){

lockSubmit();

bookingForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

hideMessage();

if(
!residenceInput||
!residenceInput.value
){

showMessage(
"Please select a residence first.",
"error"
);

return;

}

if(!calendarLoaded){

showMessage(
"Availability is not currently available. Please try again.",
"error"
);

return;

}

if(
!selectedStart||
!selectedEnd
){

showMessage(
"Please select your check-in and check-out dates from the calendar.",
"error"
);

return;

}

if(
!validCheckout(
selectedStart,
selectedEnd
)
){

showMessage(
"The selected stay is not available.",
"error"
);

return;

}

const privacy=
document.querySelector(
"#privacy"
);

if(
privacy&&
!privacy.checked
){

showMessage(
"Please accept the privacy policy.",
"error"
);

return;

}

lockSubmit(
"Rechecking Availability..."
);

try{

const stillAvailable=
await verifyStayAgain();

if(!stillAvailable){

showMessage(
"Availability has changed and these dates are no longer available. Please select another stay.",
"error"
);

await loadCalendar(
calendarResidence.value,
residenceInput.value
);

return;

}

}catch(error){

showMessage(
"We could not verify availability right now. Please try again in a moment.",
"error"
);

unlockSubmit();

return;

}

lockSubmit(
"Sending..."
);

const data=
Object.fromEntries(
new FormData(
bookingForm
).entries()
);

data.lang=
primeLanguage;

try{

const response=
await fetch(
"/api/booking-request",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:
JSON.stringify(data)
}
);

const result=
await response.json();

if(!response.ok){

throw new Error(
result.message||
"Unable to send request."
);

}

showMessage(
result.message||
"Booking request sent successfully. We will contact you shortly to confirm your stay.",
"success"
);

const residence=
residenceInput.value;

const calendar=
calendarResidence.value;

bookingForm.reset();

residenceInput.value=
residence;

calendarResidence.value=
calendar;

clearStay(false);

if(selectedResidenceText){

selectedResidenceText.textContent=
residence;

}

await loadCalendar(
calendar,
residence
);

}catch(error){

showMessage(
error.message||
"Unable to send request.",
"error"
);

unlockSubmit();

}

}
);

}


/* =========================================================
   08. PRIME ASSISTANT
========================================================= */

const assistant=
document.querySelector(
".prime-assistant"
);

if(assistant){

const page=
assistant.dataset.assistantPage||
"home";

const launcher=
assistant.querySelector(
".prime-assistant-launcher"
);

const chatWindow=
assistant.querySelector(
".prime-assistant-window"
);

const closeChat=
assistant.querySelector(
".prime-assistant-close"
);

const prompt=
assistant.querySelector(
".prime-assistant-prompt"
);

const promptMain=
assistant.querySelector(
".assistant-prompt-main"
);

const promptClose=
assistant.querySelector(
".assistant-prompt-close"
);

const messages=
assistant.querySelector(
".prime-assistant-messages"
);

const form=
assistant.querySelector(
".prime-assistant-form"
);

const input=
assistant.querySelector(
".prime-assistant-input"
);

const suggestionButtons=
assistant.querySelectorAll(
".assistant-suggestion"
);

const promptStorageKey=
`primeAssistantPromptClosed_${page}`;

const residences={

gastone:{
name:"Gastone Rossi 12",
bedrooms:3,
bathrooms:2,
guests:6,
address:"Via Gastone Rossi 12, Bologna"
},

barontini:{
name:"Barontini 8",
bedrooms:2,
bathrooms:1,
guests:6,
address:"Via Barontini 8, Bologna"
}

};

function isItalian(text){

if(primeLanguage==="it"){
return true;
}

const q=
text.toLowerCase();

return[
"ciao",
"salve",
"buongiorno",
"buonasera",
"cos'è",
"cosa è",
"che cos",
"appartamento",
"camere",
"camera",
"bagni",
"bagno",
"ospiti",
"prenot",
"prezzo",
"quanto",
"dove",
"indirizzo",
"parcheggio",
"animali",
"famiglia",
"persone",
"grazie",
"contatt"
].some(
w=>q.includes(w)
);

}

function scrollMessages(){

if(messages){

requestAnimationFrame(
()=>messages.scrollTop=
messages.scrollHeight
);

}

}

function addMessage(
text,
type="bot",
actions=[]
){

if(!messages)return;

const wrap=
document.createElement(
"div"
);

const label=
document.createElement(
"span"
);

const p=
document.createElement(
"p"
);

wrap.className=
`assistant-message assistant-message-${type}`;

label.className=
"assistant-message-label";

label.textContent=
type==="user"
?"YOU"
:"PRIME ASSISTANT";

p.textContent=
text;

wrap.append(
label,
p
);

actions.forEach(
action=>{

const a=
document.createElement(
"a"
);

a.href=
action.href;

a.textContent=
action.label;

if(action.external){

a.target=
"_blank";

a.rel=
"noopener noreferrer";

}

wrap.appendChild(
a
);

}
);

messages.appendChild(
wrap
);

scrollMessages();

}

function hidePrompt(){

if(!prompt)return;

prompt.classList.remove(
"visible"
);

prompt.setAttribute(
"aria-hidden",
"true"
);

}

function showPrompt(){

if(
!prompt||
assistant.classList.contains(
"chat-open"
)
)
return;

prompt.classList.add(
"visible"
);

prompt.setAttribute(
"aria-hidden",
"false"
);

}

function openChat(){

if(!chatWindow)return;

hidePrompt();

assistant.classList.add(
"chat-open"
);

chatWindow.classList.add(
"open"
);

chatWindow.setAttribute(
"aria-hidden",
"false"
);

if(launcher){

launcher.setAttribute(
"aria-expanded",
"true"
);

}

setTimeout(
()=>input&&input.focus(),
250
);

}

function closeAssistant(){

if(!chatWindow)return;

assistant.classList.remove(
"chat-open"
);

chatWindow.classList.remove(
"open"
);

chatWindow.setAttribute(
"aria-hidden",
"true"
);

if(launcher){

launcher.setAttribute(
"aria-expanded",
"false"
);

}

}

if(launcher){

launcher.addEventListener(
"click",
openChat
);

}

if(closeChat){

closeChat.addEventListener(
"click",
closeAssistant
);

}

if(promptMain){

promptMain.addEventListener(
"click",
openChat
);

}

if(promptClose){

promptClose.addEventListener(
"click",
e=>{

e.stopPropagation();

hidePrompt();

try{

sessionStorage.setItem(
promptStorageKey,
"1"
);

}catch{}

}
);

}

let promptClosed=false;

try{

promptClosed=
sessionStorage.getItem(
promptStorageKey
)==="1";

}catch{}

if(
prompt&&
!promptClosed
){

if(
page==="home"
){

let homePromptScheduled=
false;

window.addEventListener(
"primeIntroStarted",
()=>{

if(homePromptScheduled){
return;
}

homePromptScheduled=true;

setTimeout(
showPrompt,
4000
);

},
{
once:true
}
);

}else{

setTimeout(
showPrompt,
2500
);

}

}

function getResponse(
original
){

const question=
original
.toLowerCase()
.trim();

const italian=
isItalian(original);

const current=
residences[page]||
null;

const actions=[];

if(
question.includes(
"what is prime"
)||
question.includes(
"about-prime"
)||
question.includes(
"tell me about prime"
)||
question.includes(
"cos'è prime"
)
){

return{

text:
italian
?"Prime Residence Bologna è una collezione di residence privati e raffinati pensati per chi desidera vivere Bologna con il comfort, la privacy e la libertà di una casa propria."
:"Prime Residence Bologna is a collection of refined private residences designed for guests who want to experience Bologna with the comfort, privacy and freedom of their own space.",

actions:[
{
label:
italian
?"SCOPRI I RESIDENCE →"
:"DISCOVER THE RESIDENCES →",
href:
"index.html#residences"
}
]

};

}

if(
question.includes(
"booking"
)||
question.includes(
"book"
)||
question.includes(
"prenot"
)
){

return{

text:
italian
?"Puoi scegliere il residence, controllare la disponibilità sul calendario e inviare una richiesta tramite la pagina Prenota il tuo soggiorno."
:"You can choose a residence, check real-time availability on the calendar and submit your request through the Book Your Stay page.",

actions:[
{
label:
italian
?"PRENOTA IL TUO SOGGIORNO →"
:"BOOK YOUR STAY →",
href:
"booking.html"
}
]

};

}

if(
question.includes(
"available"
)||
question.includes(
"availability"
)||
question.includes(
"disponibil"
)
){

return{

text:
italian
?"Nella pagina Prenota il tuo soggiorno puoi vedere la disponibilità sul calendario e selezionare direttamente le date del soggiorno."
:"The Book Your Stay page displays real-time availability on the calendar so you can select your stay directly.",

actions:[
{
label:
italian
?"CONTROLLA DISPONIBILITÀ →"
:"CHECK AVAILABILITY →",
href:
"booking.html"
}
]

};

}

if(
question.includes(
"location"
)||
question.includes(
"address"
)||
question.includes(
"where"
)||
question.includes(
"dove"
)
){

let target=
current;

if(
question.includes(
"gastone"
)
){

target=
residences.gastone;

}

if(
question.includes(
"barontini"
)
){

target=
residences.barontini;

}

if(target){

return{

text:
italian
?`${target.name} si trova in ${target.address}.`
:`${target.name} is located at ${target.address}.`,

actions

};

}

}

if(
question.includes(
"contact"
)||
question.includes(
"whatsapp"
)||
question.includes(
"email"
)||
question.includes(
"contatt"
)
){

return{

text:
italian
?"Puoi contattare direttamente Prime Residence tramite WhatsApp o email."
:"You can contact Prime Residence directly via WhatsApp or email.",

actions:[
{
label:
"WHATSAPP ↗",
href:
"https://wa.me/393917055625",
external:true
},
{
label:
"EMAIL ↗",
href:
"mailto:vittoriolandi005@gmail.com"
}
]

};

}

return{

text:
italian
?"Posso aiutarti con informazioni sui residence, disponibilità, prenotazioni e posizione."
:"I can help with our residences, availability, booking and location.",

actions

};

}

function processQuestion(
question
){

if(
!question||
!question.trim()
)
return;

const clean=
question.trim();

addMessage(
clean,
"user"
);

const response=
getResponse(
clean
);

setTimeout(
()=>addMessage(
response.text,
"bot",
response.actions
),
320
);

}

if(
form&&
input
){

form.addEventListener(
"submit",
e=>{

e.preventDefault();

const question=
input.value;

input.value="";

processQuestion(
question
);

}
);

}

suggestionButtons.forEach(
button=>{

button.addEventListener(
"click",
()=>{

const type=
button.dataset.question||
"";

let question="";

switch(type){

case"about-prime":

question=
primeLanguage==="it"
?"Cos'è Prime Residence Bologna?"
:"What is Prime Residence Bologna?";

break;

case"residences":

question=
primeLanguage==="it"
?"Quali residence avete?"
:"Which residences do you have?";

break;

case"residence-details":

question=
primeLanguage==="it"
?"Parlami di questo residence"
:"Tell me about this residence";

break;

case"compare":

question=
primeLanguage==="it"
?"Qual è la differenza tra i due appartamenti?"
:"What is the difference between the two apartments?";

break;

case"booking":

question=
primeLanguage==="it"
?"Come posso prenotare?"
:"How can I book?";

break;

case"location":

question=
page==="gastone"
?(
primeLanguage==="it"
?"Dove si trova Gastone Rossi 12?"
:"Where is Gastone Rossi 12?"
)
:page==="barontini"
?(
primeLanguage==="it"
?"Dove si trova Barontini 8?"
:"Where is Barontini 8?"
)
:(
primeLanguage==="it"
?"Dove si trovano i residence?"
:"Where are the residences?"
);

break;

default:
question=type;

}

processQuestion(
question
);

}
);

}
);

document.addEventListener(
"keydown",
e=>{

if(
e.key==="Escape"&&
assistant.classList.contains(
"chat-open"
)
){

closeAssistant();

}

}
);

}


/* =========================================================
   09. ESC MOBILE MENU
========================================================= */

document.addEventListener(
"keydown",
e=>{

if(
e.key==="Escape"&&
mobileMenu&&
mobileMenu.classList.contains(
"active"
)
){

mobileMenu.classList.remove(
"active"
);

if(menuToggle){

menuToggle.classList.remove(
"active"
);

menuToggle.setAttribute(
"aria-expanded",
"false"
);

}

document.body.style.overflow="";

}

}
);


/* =========================================================
   10. YEAR
========================================================= */

const year=
document.querySelector(
"#year"
);

if(year){

year.textContent=
new Date().getFullYear();

}

console.log(
"Prime Residence Bologna — website ready."
);

});
