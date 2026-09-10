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
"Space to live,":"Spazio da vivere,",
"room to stay.":"spazio per soggiornare.",
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
"Choose your residence, explore real-time availability and select your stay directly from the calendar. Then send us your booking request.":"Scegli il residence, consulta la disponibilità in tempo reale e seleziona il soggiorno direttamente dal calendario. Poi inviaci la tua richiesta di prenotazione.",
"01 — SELECT YOUR RESIDENCE":"01 — SCEGLI IL RESIDENCE",
"Choose where":"Scegli dove",
"you would like to stay.":"vorresti soggiornare.",
"Select Residence →":"Seleziona Residence →",
"02 — YOUR STAY":"02 — IL TUO SOGGIORNO",
"Select your":"Seleziona il tuo",
"stay.":"soggiorno.",
"Please select a residence above":"Seleziona prima un residence qui sopra",
"Real-time availability":"Disponibilità in tempo reale",
"REAL-TIME AVAILABILITY":"DISPONIBILITÀ IN TEMPO REALE",
"Select a residence":"Seleziona un residence",
"Availability is based on the latest calendar data. Final confirmation follows your booking request.":"La disponibilità si basa sui dati più recenti del calendario. La conferma finale avverrà dopo la tua richiesta di prenotazione.",
"WAITING":"IN ATTESA",
"MON":"LUN",
"TUE":"MAR",
"WED":"MER",
"THU":"GIO",
"FRI":"VEN",
"SAT":"SAB",
"SUN":"DOM",
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
"I agree to the processing of my personal data for the purpose of handling this booking request.":"Acconsento al trattamento dei miei dati personali ai fini della gestione di questa richiesta di prenotazione.",
"Select Your Stay":"Seleziona il soggiorno",
"Send Booking Request":"Invia richiesta di prenotazione",
"This date is fully booked. Please choose an available check-in date.":"Questa data è al completo. Scegli una data di check-in disponibile.",
"Your selected stay crosses a fully booked date. Please choose another check-out date.":"Il soggiorno selezionato include una data al completo. Scegli un altro check-out.",
"We could not load availability at the moment. Please try again shortly.":"Non riusciamo a caricare la disponibilità in questo momento. Riprova tra poco.",
"Availability Unavailable":"Disponibilità non disponibile",
"Loading Availability...":"Caricamento disponibilità...",
"Select Check-out":"Seleziona il check-out",
"Please select a residence first.":"Seleziona prima un residence.",
"Availability is not currently available. Please try again.":"La disponibilità non è al momento disponibile. Riprova.",
"Please select your check-in and check-out dates from the calendar.":"Seleziona le date di check-in e check-out dal calendario.",
"The selected stay is not available.":"Il soggiorno selezionato non è disponibile.",
"Please accept the privacy policy.":"Accetta l’informativa sulla privacy.",
"Rechecking Availability...":"Ricontrollo disponibilità...",
"Availability has changed and these dates are no longer available. Please select another stay.":"La disponibilità è cambiata e queste date non sono più disponibili. Seleziona un altro soggiorno.",
"We could not verify availability right now. Please try again in a moment.":"Non riusciamo a verificare la disponibilità in questo momento. Riprova tra poco.",
"Sending...":"Invio in corso...",
"Booking request sent successfully. We will contact you shortly to confirm your stay.":"Richiesta di prenotazione inviata con successo. Ti contatteremo a breve per confermare il soggiorno.",
"Unable to send request.":"Impossibile inviare la richiesta.",
"LOADING":"CARICAMENTO",
"LIVE":"LIVE",
"UNAVAILABLE":"NON DISPONIBILE",
"fully booked":"al completo",
"available":"disponibile",
"Minimum stay is 2 nights.":"Il soggiorno minimo è di 2 notti.",
"TOTAL STAY":"TOTALE SOGGIORNO",
"REQUEST TO BOOK →":"RICHIEDI PRENOTAZIONE →",
"Price on request":"Prezzo su richiesta",
"Select guests to see the total price":"Seleziona gli ospiti per vedere il prezzo totale"
};

const PRIME_LANG_KEY="primeResidenceLanguage";
let primeLanguage=(()=>{try{return localStorage.getItem(PRIME_LANG_KEY)==="it"?"it":"en"}catch{return"en"}})();
const primeOriginalText=new WeakMap(),primeOriginalAttrs=new WeakMap();
const primeNorm=s=>String(s||"").replace(/\s+/g," ").trim();
const primeTranslate=s=>{const t=String(s??"");return primeLanguage==="it"?(PRIME_TRANSLATIONS[primeNorm(t)]||t):t};

function primeTranslateTextNode(n){
if(!n||n.nodeType!==3)return;
if(!primeOriginalText.has(n))primeOriginalText.set(n,n.nodeValue);
const o=primeOriginalText.get(n),k=primeNorm(o);
if(!k)return;
const tr=primeLanguage==="it"?PRIME_TRANSLATIONS[k]:undefined;
n.nodeValue=tr!==undefined?o.replace(k,tr):o;
}

function primeTranslateElement(el){
if(!el||el.nodeType!==1||["SCRIPT","STYLE"].includes(el.tagName))return;
["placeholder","aria-label","title"].forEach(a=>{
if(!el.hasAttribute(a))return;
let s=primeOriginalAttrs.get(el)||{};
if(!(a in s))s[a]=el.getAttribute(a);
primeOriginalAttrs.set(el,s);
const o=s[a],tr=primeLanguage==="it"?PRIME_TRANSLATIONS[primeNorm(o)]:undefined;
el.setAttribute(a,tr!==undefined?tr:o);
});
for(const c of el.childNodes)c.nodeType===3?primeTranslateTextNode(c):primeTranslateElement(c);
}

function primeUpdateLanguageButtons(){
document.querySelectorAll(".language-switcher button[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===primeLanguage));
}

function primeApplyLanguage(){
document.documentElement.lang=primeLanguage;
primeTranslateElement(document.body);
const h=document.documentElement;
const o=h.dataset.primeOriginalTitle||(h.dataset.primeOriginalTitle=document.title);
document.title=primeLanguage==="it"?(PRIME_TRANSLATIONS[primeNorm(o)]||o):o;
const m=document.querySelector('meta[name="description"]');
if(m){
const d=m.dataset.primeOriginal||m.content;
m.dataset.primeOriginal=d;
m.content=primeLanguage==="it"?(PRIME_TRANSLATIONS[primeNorm(d)]||d):d;
}
primeUpdateLanguageButtons();
window.dispatchEvent(new CustomEvent("primeLanguageChanged",{detail:{lang:primeLanguage}}));
}

function primeSetLanguage(lang){
primeLanguage=lang==="it"?"it":"en";
try{localStorage.setItem(PRIME_LANG_KEY,primeLanguage)}catch{}
primeApplyLanguage();
}

function primeCreateSwitcher(){
const make=cls=>{
const w=document.createElement("div");
w.className=`language-switcher ${cls||""}`.trim();
w.setAttribute("aria-label","Language / Lingua");
w.innerHTML='<button type="button" data-lang="en">EN</button><span class="language-switcher-separator">/</span><button type="button" data-lang="it">IT</button>';
w.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>primeSetLanguage(b.dataset.lang)));
return w;
};

const desktop=document.querySelector(".desktop-nav");

if(desktop){
const w=make();
const book=desktop.querySelector(".nav-book");
book?desktop.insertBefore(w,book):desktop.appendChild(w);

const nav=document.querySelector(".nav-container");
const toggle=nav&&nav.querySelector(".menu-toggle");

if(nav&&toggle){
nav.insertBefore(make("language-switcher-mobile"),toggle);
}

}else{

const right=document.querySelector(".apartment-nav-right");

if(right){
right.insertBefore(make(),right.firstChild);
}

}

primeUpdateLanguageButtons();
}

primeCreateSwitcher();
primeApplyLanguage();

new MutationObserver(ms=>{
for(const m of ms){
if(m.type==="childList"){
m.addedNodes.forEach(n=>{
if(n.nodeType===3)primeTranslateTextNode(n);
else if(n.nodeType===1)primeTranslateElement(n);
});
}else if(m.type==="characterData"){
primeTranslateTextNode(m.target);
}
}
}).observe(document.body,{subtree:true,childList:true,characterData:true});


/* =========================================================
   01. INTRO
========================================================= */

const loader=document.querySelector(".loader");
const hero=document.querySelector(".hero");

if(loader&&hero){

const INTRO_DURATION=2200;
let done=false,animating=false,start=null;
let touchStartY=0;
let mouseStartY=0;
let dragging=false;

document.body.style.overflow="hidden";

const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function finishIntro(){
done=true;
animating=false;
loader.style.transform="translate3d(0,-100%,0)";
loader.classList.add("hide");
document.body.style.userSelect="";
document.body.style.overflow="";
}

function frame(now){
if(!start)start=now;
const p=Math.min((now-start)/INTRO_DURATION,1);
loader.style.transform=`translate3d(0,${-ease(p)*100}%,0)`;
p<1?requestAnimationFrame(frame):finishIntro();
}

function startIntro(){
if(done||animating)return;
animating=true;
start=null;
window.dispatchEvent(new CustomEvent("primeIntroStarted"));
requestAnimationFrame(frame);
}

window.addEventListener("wheel",e=>{
if(done)return;
e.preventDefault();
if(e.deltaY<0)startIntro();
},{passive:false});

window.addEventListener("touchstart",e=>{
if(!done&&!animating)touchStartY=e.touches[0].clientY;
},{passive:true});

window.addEventListener("touchmove",e=>{
if(done||animating)return;
if(touchStartY-e.touches[0].clientY>12){
e.preventDefault();
startIntro();
}
},{passive:false});

loader.addEventListener("mousedown",e=>{
if(done||animating||e.button!==0)return;
dragging=true;
mouseStartY=e.clientY;
document.body.style.userSelect="none";
});

window.addEventListener("mousemove",e=>{
if(dragging&&mouseStartY-e.clientY>=35){
dragging=false;
document.body.style.userSelect="";
startIntro();
}
});

window.addEventListener("mouseup",e=>{
if(!dragging)return;
dragging=false;
document.body.style.userSelect="";
if(mouseStartY-e.clientY>=35)startIntro();
});

loader.addEventListener("dragstart",e=>e.preventDefault());

}


/* =========================================================
   02. NAVBAR + MOBILE MENU
========================================================= */

const navbar=document.querySelector(".navbar");

function updateNavbar(){
if(navbar)navbar.classList.toggle("scrolled",window.scrollY>50);
}

updateNavbar();
window.addEventListener("scroll",updateNavbar,{passive:true});

const menuToggle=document.querySelector(".menu-toggle");
const mobileMenu=document.querySelector(".mobile-menu");

if(menuToggle&&mobileMenu){

menuToggle.setAttribute("aria-expanded","false");

menuToggle.addEventListener("click",()=>{
const open=menuToggle.classList.toggle("active");
mobileMenu.classList.toggle("active",open);
menuToggle.setAttribute("aria-expanded",open?"true":"false");
document.body.style.overflow=open?"hidden":"";
});

mobileMenu.querySelectorAll("a").forEach(a=>{
a.addEventListener("click",()=>{
menuToggle.classList.remove("active");
mobileMenu.classList.remove("active");
menuToggle.setAttribute("aria-expanded","false");
document.body.style.overflow="";
});
});

}


/* =========================================================
   03. REVEAL
========================================================= */

const reveals=document.querySelectorAll(".reveal");

if(reveals.length){

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
},{threshold:.12});

reveals.forEach(el=>observer.observe(el));

}


/* =========================================================
   04. PREMIUM SCROLL
========================================================= */

let premiumScrollAnimation=null;

const premiumEase=t=>
t<.5
?4*t*t*t
:1-Math.pow(-2*t+2,3)/2;

function premiumScrollTo(target,duration=1400){

if(!target)return;

if(premiumScrollAnimation){
cancelAnimationFrame(premiumScrollAnimation);
}

const startY=window.scrollY;
const offset=navbar?navbar.offsetHeight:0;

const targetY=Math.max(
0,
target.getBoundingClientRect().top+
window.scrollY-
offset
);

const distance=targetY-startY;

if(Math.abs(distance)<2)return;

let startTime=null;

function scrollFrame(time){

if(!startTime)startTime=time;

const progress=
Math.min(
(time-startTime)/duration,
1
);

window.scrollTo(
0,
startY+
distance*premiumEase(progress)
);

if(progress<1){

premiumScrollAnimation=
requestAnimationFrame(scrollFrame);

}else{

premiumScrollAnimation=null;
window.scrollTo(0,targetY);

}

}

premiumScrollAnimation=
requestAnimationFrame(scrollFrame);

}

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",e=>{

const id=link.getAttribute("href");
const target=id&&id!=="#"
?document.querySelector(id)
:null;

if(!target)return;

e.preventDefault();

if(
mobileMenu&&
mobileMenu.classList.contains("active")
){

mobileMenu.classList.remove("active");

if(menuToggle){
menuToggle.classList.remove("active");
menuToggle.setAttribute("aria-expanded","false");
}

document.body.style.overflow="";

}

setTimeout(
()=>premiumScrollTo(target,1400),
20
);

});

});


/* =========================================================
   05. APARTMENT GALLERY
========================================================= */

document.querySelectorAll(".apartment-gallery").forEach(gallery=>{

const slides=[
...gallery.querySelectorAll(".apartment-slide")
];

if(slides.length<2)return;

const section=
gallery.closest(".apartment-gallery-section");

const counter=
section
?section.querySelector(".apartment-gallery-counter")
:null;

let current=0;
let autoplay=null;
let pointerDown=false;
let pointerId=null;
let startX=0;
let startY=0;
let currentX=0;
let currentY=0;

gallery.style.touchAction="pan-y";
gallery.style.cursor="grab";
gallery.style.userSelect="none";

gallery.querySelectorAll("img").forEach(img=>{
img.draggable=false;
img.setAttribute("draggable","false");
img.addEventListener("dragstart",e=>e.preventDefault());
});

function showSlide(index){

if(index<0)index=slides.length-1;
if(index>=slides.length)index=0;

slides.forEach(
(slide,i)=>
slide.classList.toggle(
"active",
i===index
)
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
if(autoplay){
clearInterval(autoplay);
autoplay=null;
}
}

function startAutoplay(){
stopAutoplay();
autoplay=setInterval(nextSlide,5000);
}

function finishSwipe(){

if(!pointerDown)return;

const dx=currentX-startX;
const dy=currentY-startY;

pointerDown=false;
pointerId=null;

gallery.style.cursor="grab";

if(
Math.abs(dx)>=45&&
Math.abs(dx)>Math.abs(dy)
){

dx<0
?nextSlide()
:previousSlide();

}

startAutoplay();

}

gallery.addEventListener("pointerdown",e=>{

if(
e.pointerType==="mouse"&&
e.button!==0
)return;

pointerDown=true;
pointerId=e.pointerId;

startX=currentX=e.clientX;
startY=currentY=e.clientY;

gallery.style.cursor="grabbing";

stopAutoplay();

try{
gallery.setPointerCapture(e.pointerId);
}catch{}

});

gallery.addEventListener("pointermove",e=>{

if(
!pointerDown||
e.pointerId!==pointerId
)return;

currentX=e.clientX;
currentY=e.clientY;

const dx=currentX-startX;
const dy=currentY-startY;

if(
Math.abs(dx)>10&&
Math.abs(dx)>Math.abs(dy)&&
e.cancelable
){

e.preventDefault();

}

});

gallery.addEventListener("pointerup",e=>{

if(
!pointerDown||
e.pointerId!==pointerId
)return;

currentX=e.clientX;
currentY=e.clientY;

finishSwipe();

});

gallery.addEventListener("pointercancel",()=>{

pointerDown=false;
pointerId=null;
gallery.style.cursor="grab";
startAutoplay();

});

gallery.addEventListener("lostpointercapture",()=>{
if(pointerDown)finishSwipe();
});

gallery.addEventListener("mouseenter",stopAutoplay);

gallery.addEventListener("mouseleave",()=>{
if(!pointerDown)startAutoplay();
});

showSlide(0);
startAutoplay();

});


/* =========================================================
   06. BOOKING CALENDAR
========================================================= */

const bookingCards=
document.querySelectorAll(".booking-residence-card");

const bookingForm=
document.querySelector("#bookingRequestForm");

const residenceInput=
document.querySelector("#residence");

const calendarResidence=
document.querySelector("#calendarResidence");

const checkinInput=
document.querySelector("#checkin");

const checkoutInput=
document.querySelector("#checkout");

const selectedResidenceText=
document.querySelector("#selectedResidenceText");

const bookingFormSection=
document.querySelector("#booking-form-section");

const bookingMessage=
document.querySelector("#bookingMessage");

const bookingSubmit=
document.querySelector(".booking-submit");

const primeCalendar=
document.querySelector("#primeCalendar");

const calendarGrid=
document.querySelector("#calendarGrid");

const calendarMonthLabel=
document.querySelector("#calendarMonthLabel");

const calendarPrev=
document.querySelector("#calendarPrev");

const calendarNext=
document.querySelector("#calendarNext");

const calendarResidenceTitle=
document.querySelector("#calendarResidenceTitle");

const calendarLiveStatus=
document.querySelector("#calendarLiveStatus");

const calendarLiveText=
document.querySelector("#calendarLiveText");

const calendarLoadingMessage=
document.querySelector("#calendarLoadingMessage");

const calendarMessage=
document.querySelector("#calendarMessage");

const selectedStay=
document.querySelector("#selectedStay");

const selectedStayResidence=
document.querySelector("#selectedStayResidence");

const selectedStayCheckin=
document.querySelector("#selectedStayCheckin");

const selectedStayCheckout=
document.querySelector("#selectedStayCheckout");

const selectedStayNights=
document.querySelector("#selectedStayNights");

const selectedStayClear=
document.querySelector("#selectedStayClear");

const guestsInput=
document.querySelector("#guests");

const stayPriceBanner=
document.querySelector("#stayPriceBanner");

const stayPriceTotal=
document.querySelector("#stayPriceTotal");

const stayPriceMeta=
document.querySelector("#stayPriceMeta");

const requestBookingButton=
document.querySelector("#requestBookingButton");

const guestDetailsSection=
document.querySelector("#guest-details-section");

const estimatedTotalInput=
document.querySelector("#estimatedTotal");

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


/* =========================================================
   DATE FUNCTIONS
========================================================= */

const todayISO=()=>{

const d=new Date();

return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

};

const parseISO=value=>{

const[y,m,d]=
value.split("-").map(Number);

return new Date(y,m-1,d);

};

const dateISO=date=>
`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

const addDays=(value,days)=>{

const d=parseISO(value);

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


/* =========================================================
   07. PRICES — BARONTINI 8
========================================================= */

const BARONTINI_RATES={};

const setRate=(date,price)=>{
BARONTINI_RATES[date]=price;
};

const setRange=(start,end,price)=>{

for(
let d=start;
d<=end;
d=addDays(d,1)
){

setRate(d,price);

}

};


/* SETTEMBRE 2026 */

setRate("2026-09-13",99);
setRate("2026-09-14",99);
setRate("2026-09-15",99);
setRate("2026-09-19",150);
setRate("2026-09-20",175);
setRate("2026-09-23",230);
setRate("2026-09-24",230);
setRate("2026-09-29",130);
setRate("2026-09-30",130);


/* OTTOBRE 2026 */

setRate("2026-10-01",130);
setRate("2026-10-02",180);

setRange(
"2026-10-06",
"2026-10-08",
130
);

setRange(
"2026-10-11",
"2026-10-15",
130
);

setRange(
"2026-10-18",
"2026-10-19",
150
);

setRange(
"2026-10-20",
"2026-10-21",
180
);

setRate(
"2026-10-25",
180
);

setRange(
"2026-10-26",
"2026-10-29",
150
);

setRange(
"2026-10-30",
"2026-10-31",
180
);


/* NOVEMBRE 2026 */

setRange(
"2026-11-01",
"2026-11-05",
150
);

setRange(
"2026-11-06",
"2026-11-07",
180
);

setRate(
"2026-11-08",
250
);

setRate(
"2026-11-09",
300
);

setRange(
"2026-11-10",
"2026-11-13",
330
);

setRate(
"2026-11-14",
280
);

setRange(
"2026-11-15",
"2026-11-19",
150
);

setRange(
"2026-11-20",
"2026-11-21",
180
);

setRange(
"2026-11-22",
"2026-11-26",
150
);

setRange(
"2026-11-27",
"2026-11-28",
180
);

setRange(
"2026-11-29",
"2026-11-30",
150
);


/* DICEMBRE 2026 */

setRange(
"2026-12-01",
"2026-12-03",
130
);

setRange(
"2026-12-06",
"2026-12-10",
130
);

setRange(
"2026-12-11",
"2026-12-12",
150
);

setRange(
"2026-12-13",
"2026-12-17",
115
);

setRange(
"2026-12-18",
"2026-12-19",
140
);

setRange(
"2026-12-20",
"2026-12-24",
115
);

setRate(
"2026-12-25",
140
);

setRange(
"2026-12-28",
"2026-12-30",
240
);

setRate(
"2026-12-31",
320
);


/* GENNAIO 2027 */

setRange(
"2027-01-01",
"2027-01-05",
180
);

setRange(
"2027-01-06",
"2027-01-07",
100
);

setRange(
"2027-01-08",
"2027-01-09",
120
);

setRange(
"2027-01-10",
"2027-01-12",
100
);

setRange(
"2027-01-13",
"2027-01-14",
140
);

setRange(
"2027-01-15",
"2027-01-16",
120
);

setRange(
"2027-01-17",
"2027-01-21",
100
);

setRange(
"2027-01-22",
"2027-01-23",
120
);

setRange(
"2027-01-24",
"2027-01-28",
100
);

setRange(
"2027-01-29",
"2027-01-30",
120
);

setRate(
"2027-01-31",
100
);


/* FEBBRAIO 2027
   DOMENICA → GIOVEDÌ €115
   VENERDÌ + SABATO €140
*/

for(
let d="2027-02-01";
d<="2027-02-28";
d=addDays(d,1)
){

const day=
parseISO(d).getDay();

setRate(
d,
(day===5||day===6)
?140
:115
);

}


/* =========================================================
   08. PRICES — GASTONE ROSSI 12
========================================================= */

const GASTONE_RATES={};

const setGastoneRate=(date,price)=>{
GASTONE_RATES[date]=price;
};

const setGastoneRange=(start,end,price)=>{

for(
let d=start;
d<=end;
d=addDays(d,1)
){

setGastoneRate(d,price);

}

};


/* SETTEMBRE 2026 */

setGastoneRange(
"2026-09-27",
"2026-09-28",
120
);


/* OTTOBRE 2026 */

setGastoneRate(
"2026-10-01",
130
);

setGastoneRate(
"2026-10-19",
150
);

setGastoneRate(
"2026-10-27",
150
);


/* NOVEMBRE 2026 */

setGastoneRange(
"2026-11-02",
"2026-11-05",
140
);

setGastoneRange(
"2026-11-06",
"2026-11-07",
160
);

setGastoneRange(
"2026-11-15",
"2026-11-19",
130
);

setGastoneRange(
"2026-11-20",
"2026-11-21",
160
);

setGastoneRate(
"2026-11-22",
130
);

setGastoneRate(
"2026-11-30",
130
);


/* DICEMBRE 2026
   DOMENICA → GIOVEDÌ €120
   VENERDÌ + SABATO €140

   ECCEZIONE:
   1 + 2 DICEMBRE €130
*/

for(
let d="2026-12-01";
d<="2026-12-31";
d=addDays(d,1)
){

const day=
parseISO(d).getDay();

setGastoneRate(
d,
(day===5||day===6)
?140
:120
);

}

setGastoneRange(
"2026-12-01",
"2026-12-02",
130
);


/* GENNAIO 2027 */

setGastoneRange(
"2027-01-03",
"2027-01-05",
160
);

setGastoneRate(
"2027-01-07",
140
);

setGastoneRange(
"2027-01-20",
"2027-01-21",
140
);

setGastoneRange(
"2027-01-25",
"2027-01-28",
130
);

setGastoneRange(
"2027-01-29",
"2027-01-30",
140
);

setGastoneRate(
"2027-01-31",
130
);


/* FEBBRAIO 2027 */

setGastoneRange(
"2027-02-01",
"2027-02-04",
120
);

setGastoneRange(
"2027-02-12",
"2027-02-13",
130
);

setGastoneRange(
"2027-02-14",
"2027-02-18",
120
);

setGastoneRange(
"2027-02-19",
"2027-02-20",
130
);

setGastoneRange(
"2027-02-21",
"2027-02-25",
120
);

setGastoneRange(
"2027-02-26",
"2027-02-27",
130
);

setGastoneRate(
"2027-02-28",
120
);


/* =========================================================
   09. PRICE RULES
========================================================= */

const RATE_START="2026-09-01";
const RATE_END="2027-02-28";

/* NON MOSTRARE QUESTE PERCENTUALI NEL SITO */

const guestMultiplier=guests=>{

if(guests<=2)return 1;

if(guests===3)return 1.30;

if(guests===4)return 1.35;

if(guests===5)return 1.40;

if(guests===6)return 1.45;

return 1;

};

const hasRate=(rates,date)=>
Object.prototype.hasOwnProperty.call(
rates,
date
);

function currentRates(){

if(
currentCalendarKey==="barontini"
){
return BARONTINI_RATES;
}

if(
currentCalendarKey==="gastone"
){
return GASTONE_RATES;
}

return null;

}

function isRateBlocked(day){

const rates=
currentRates();

if(!rates)return false;

return(
day>=RATE_START&&
day<=RATE_END&&
!hasRate(rates,day)
);

}


/* =========================================================
   10. PRICE CALCULATION
========================================================= */

function calculateStayPrice(){

if(
!selectedStart||
!selectedEnd||
!guestsInput||
!guestsInput.value
){

return null;

}

const guests=
Number(
guestsInput.value
);

const nights=
nightsBetween(
selectedStart,
selectedEnd
);

if(nights<2){
return null;
}

const rates=
currentRates();

if(!rates){

return{
price:null,
nights,
guests,
onRequest:true
};

}

let basePrice=0;

for(
let day=selectedStart;
day<selectedEnd;
day=addDays(day,1)
){

if(
!hasRate(
rates,
day
)
){

return{
price:null,
nights,
guests,
onRequest:true
};

}

basePrice+=
rates[day];

}

const finalPrice=
basePrice*
guestMultiplier(
guests
);

return{
price:finalPrice,
nights,
guests,
onRequest:false
};

}

function formatPrice(value){

return new Intl.NumberFormat(
primeLanguage==="it"
?"it-IT"
:"en-GB",
{
style:"currency",
currency:"EUR",
minimumFractionDigits:
Number.isInteger(value)
?0
:2,
maximumFractionDigits:2
}
).format(value);

}

function updatePriceBanner(){

if(!stayPriceBanner)return;

const result=
calculateStayPrice();

if(!result){

stayPriceBanner.classList.remove(
"visible"
);

if(estimatedTotalInput){
estimatedTotalInput.value="";
}

return;

}

stayPriceBanner.classList.add(
"visible"
);

if(stayPriceTotal){

stayPriceTotal.textContent=
result.onRequest
?primeTranslate(
"Price on request"
)
:formatPrice(
result.price
);

}

if(stayPriceMeta){

stayPriceMeta.textContent=
primeLanguage==="it"
?`${result.nights} ${result.nights===1?"notte":"notti"} · ${result.guests} ${result.guests===1?"ospite":"ospiti"}`
:`${result.nights} ${result.nights===1?"night":"nights"} · ${result.guests} ${result.guests===1?"guest":"guests"}`;

}

if(requestBookingButton){

requestBookingButton.textContent=
primeTranslate(
"REQUEST TO BOOK →"
);

}

if(estimatedTotalInput){

estimatedTotalInput.value=
result.onRequest
?"Price on request"
:String(
Math.round(
result.price*100
)/100
);

}

}


/* =========================================================
   11. AVAILABILITY
========================================================= */

function isBooked(day){

return(
isRateBlocked(day)||
calendarEvents.some(
event=>
event.start&&
event.end&&
day>=event.start&&
day<event.end
)
);

}

function isPast(day){
return day<todayISO();
}

function rangeHasConflict(start,end){

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

function validCheckout(start,end){

return(
!!start&&
!!end&&
end>start&&
nightsBetween(
start,
end
)>=2&&
!rangeHasConflict(
start,
end
)
);

}


/* =========================================================
   12. CALENDAR UI
========================================================= */

function clearCalendarMessage(){

if(calendarMessage){

calendarMessage.className=
"calendar-message";

calendarMessage.textContent="";

}

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

updatePriceBanner();
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

updatePriceBanner();

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
){
return;
}

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

const year=
displayMonth.getFullYear();

const month=
displayMonth.getMonth();

const firstDay=
new Date(
year,
month,
1
);

const daysInMonth=
new Date(
year,
month+1,
0
).getDate();

const leading=
(firstDay.getDay()+6)%7;

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

const iso=
dateISO(
new Date(
year,
month,
day
)
);

const button=
document.createElement(
"button"
);

const booked=
isBooked(iso);

const past=
isPast(iso);

button.type="button";

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

button.disabled=true;

}else{

button.classList.add(
booked
?"booked"
:"available"
);

}

if(
iso===todayISO()
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


/* =========================================================
   13. SELECT DATES
========================================================= */

function handleDayClick(day){

if(suppressClick){

suppressClick=false;
return;

}

clearCalendarMessage();

if(isPast(day))return;


/* PRIMO CLICK */

if(
!selectedStart||
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

updatePriceBanner();

lockSubmit(
"Select Check-out"
);

renderCalendar();

return;

}


/* STESSA DATA */

if(
day===selectedStart
){

clearStay();

return;

}


/* DATA PRECEDENTE */

if(
day<selectedStart
){

if(isBooked(day)){

showCalendarMessage(
"This date is fully booked. Please choose an available check-in date.",
"info"
);

return;

}

selectedStart=day;

if(checkinInput){
checkinInput.value=day;
}

renderCalendar();

return;

}


/* MINIMO DUE NOTTI */

if(
nightsBetween(
selectedStart,
day
)<2
){

showCalendarMessage(
"Minimum stay is 2 nights.",
"info"
);

return;

}


/* CONTROLLO DATE */

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


/* =========================================================
   14. DRAG CALENDAR
========================================================= */

function startCalendarDrag(
event,
day
){

if(
event.button!==0||
isPast(day)||
isBooked(day)
){
return;
}

dragActive=true;
dragMoved=false;
dragStart=day;
previewEnd="";

document.body.style.userSelect=
"none";

}

document.addEventListener(
"mouseover",
event=>{

if(!dragActive)return;

const cell=
event.target.closest(
".booking-calendar-day"
);

if(
!cell||
!cell.dataset.date
){
return;
}

const day=
cell.dataset.date;

if(
day===dragStart
){
return;
}

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

document.body.style.userSelect=
"";

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

previewEnd="";
dragMoved=false;

}
);


/* =========================================================
   15. LOAD LIVE AVAILABILITY
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
){
return;
}

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

calendarLoaded=true;

if(calendarLiveText){

calendarLiveText.textContent=
primeTranslate(
"LIVE"
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

lockSubmit(
"Select Your Stay"
);

renderCalendar();

}catch(error){

if(
requestId!==
calendarRequestId
){
return;
}

calendarLoaded=false;

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
   16. SELECT RESIDENCE
========================================================= */

function selectResidence(card){

if(!card)return;

bookingCards.forEach(
item=>item.classList.remove(
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

loadCalendar(
calendar,
residence
);

if(bookingFormSection){

bookingFormSection.scrollIntoView({
behavior:"smooth",
block:"start"
});

}

}

bookingCards.forEach(card=>{

card.addEventListener(
"click",
()=>selectResidence(card)
);

card.addEventListener(
"keydown",
event=>{

if(
event.key==="Enter"||
event.key===" "
){

event.preventDefault();

selectResidence(
card
);

}

}
);

});


/* =========================================================
   17. GUESTS + PRICE BANNER
========================================================= */

if(guestsInput){

guestsInput.addEventListener(
"change",
updatePriceBanner
);

}

if(requestBookingButton){

requestBookingButton.addEventListener(
"click",
()=>{

const target=
guestDetailsSection||
bookingForm;

if(target){

premiumScrollTo(
target,
900
);

}

}
);

}


/* =========================================================
   18. MONTH NAVIGATION
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

window.addEventListener(
"primeLanguageChanged",
()=>{

if(calendarGrid){
renderCalendar();
}

updatePriceBanner();

if(
selectedStart&&
selectedEnd
){

updateSelectedStay();

}

}
);


/* =========================================================
   19. FORM MESSAGES
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


/* =========================================================
   20. FINAL AVAILABILITY CHECK
========================================================= */

async function verifyStayAgain(){

if(
!currentCalendarKey||
!selectedStart||
!selectedEnd
){

return false;

}

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


/* =========================================================
   21. BOOKING SUBMIT
========================================================= */

if(bookingForm){

lockSubmit();

bookingForm.addEventListener(
"submit",
async event=>{

event.preventDefault();

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
"Content-Type":
"application/json"
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
   22. PRIME ASSISTANT
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

const chat=
assistant.querySelector(
".prime-assistant-window"
);

const close=
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

const assistantForm=
assistant.querySelector(
".prime-assistant-form"
);

const assistantInput=
assistant.querySelector(
".prime-assistant-input"
);

const buttons=
assistant.querySelectorAll(
".assistant-suggestion"
);

const storageKey=
`primeAssistantPromptClosed_${page}`;

const residences={

gastone:{
name:"Gastone Rossi 12",
address:"Via Gastone Rossi 12, Bologna"
},

barontini:{
name:"Barontini 8",
address:"Via Barontini 8, Bologna"
}

};

function isItalian(text){

if(
primeLanguage==="it"
){
return true;
}

const q=
text.toLowerCase();

return[
"ciao",
"salve",
"buongiorno",
"buonasera",
"appartamento",
"camere",
"bagni",
"ospiti",
"prenot",
"prezzo",
"quanto",
"dove",
"indirizzo",
"grazie",
"contatt"
].some(
word=>
q.includes(word)
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

const paragraph=
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

paragraph.textContent=
text;

wrap.append(
label,
paragraph
);

actions.forEach(
action=>{

const link=
document.createElement(
"a"
);

link.href=
action.href;

link.textContent=
action.label;

if(action.external){

link.target=
"_blank";

link.rel=
"noopener noreferrer";

}

wrap.appendChild(
link
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
){
return;
}

prompt.classList.add(
"visible"
);

prompt.setAttribute(
"aria-hidden",
"false"
);

}

function openChat(){

if(!chat)return;

hidePrompt();

assistant.classList.add(
"chat-open"
);

chat.classList.add(
"open"
);

chat.setAttribute(
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
()=>assistantInput&&assistantInput.focus(),
250
);

}

function closeChat(){

if(!chat)return;

assistant.classList.remove(
"chat-open"
);

chat.classList.remove(
"open"
);

chat.setAttribute(
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

if(close){

close.addEventListener(
"click",
closeChat
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
event=>{

event.stopPropagation();

hidePrompt();

try{

sessionStorage.setItem(
storageKey,
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
storageKey
)==="1";

}catch{}

if(
prompt&&
!promptClosed
){

if(
page==="home"
){

window.addEventListener(
"primeIntroStarted",
()=>setTimeout(
showPrompt,
4000
),
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

function getResponse(original){

const question=
original.toLowerCase().trim();

const italian=
isItalian(original);

const current=
residences[page]||
null;


/* PRIME */

if(
question.includes(
"what is prime"
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


/* BOOKING */

if(
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


/* AVAILABILITY */

if(
question.includes(
"availab"
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


/* LOCATION */

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

actions:[]

};

}

}


/* CONTACT */

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
label:"WHATSAPP ↗",
href:"https://wa.me/393917055625",
external:true
},
{
label:"EMAIL ↗",
href:"mailto:vittoriolandi005@gmail.com"
}
]

};

}

return{

text:
italian
?"Posso aiutarti con informazioni sui residence, disponibilità, prenotazioni e posizione."
:"I can help with our residences, availability, booking and location.",

actions:[]

};

}

function processQuestion(question){

if(
!question||
!question.trim()
){
return;
}

const clean=
question.trim();

addMessage(
clean,
"user"
);

const response=
getResponse(clean);

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
assistantForm&&
assistantInput
){

assistantForm.addEventListener(
"submit",
event=>{

event.preventDefault();

const question=
assistantInput.value;

assistantInput.value="";

processQuestion(
question
);

}
);

}

buttons.forEach(
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

question=
type;

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
event=>{

if(
event.key==="Escape"&&
assistant.classList.contains(
"chat-open"
)
){

closeChat();

}

}
);

}


/* =========================================================
   23. ESC MOBILE MENU
========================================================= */

document.addEventListener(
"keydown",
event=>{

if(
event.key==="Escape"&&
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
   24. YEAR
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
