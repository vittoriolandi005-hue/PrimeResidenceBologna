/* =========================================================
   PRIME RESIDENCE BOLOGNA
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

/* =========================================================
   00. LANGUAGE SYSTEM — EN / IT
========================================================= */

const PRIME_TRANSLATIONS={
"Residences":"Residence",
"Experience":"Esperienza",
"Book now":"Prenota ora",
"Book Now":"Prenota ora",
"Book Your Stay":"Prenota il tuo soggiorno",
"Book your stay":"Prenota il tuo soggiorno",
"Explore residences":"Scopri i residence",
"OUR RESIDENCES":"I NOSTRI RESIDENCE",
"THE EXPERIENCE":"L’ESPERIENZA",
"MORE THAN A STAY":"PIÙ DI UN SOGGIORNO",
"Discover residence":"Scopri il residence",
"Privacy":"Privacy",
"Comfort":"Comfort",
"Location":"Posizione",
"DISCOVER THE CITY":"SCOPRI LA CITTÀ",
"Plan your stay":"Organizza il tuo soggiorno",
"EXPLORE":"ESPLORA",
"RESIDENCES":"RESIDENCE",
"CONTACT":"CONTATTI",
"Email us":"Scrivici",
"BEDROOMS":"CAMERE",
"BATHROOMS":"BAGNI",
"GUESTS":"OSPITI",
"GALLERY":"GALLERIA",
"BEDROOM":"CAMERA",
"BATHROOM":"BAGNO",
"KITCHEN":"CUCINA",
"GARDEN":"GIARDINO",
"AMENITIES":"SERVIZI",
"CHECK-IN":"CHECK-IN",
"HOUSE RULES":"REGOLE DELLA CASA",
"BOOK YOUR STAY":"PRENOTA IL TUO SOGGIORNO",
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
"Select Your Stay":"Seleziona il soggiorno",
"Send Booking Request":"Invia richiesta di prenotazione",
"Select Check-out":"Seleziona il check-out",
"LOADING":"CARICAMENTO",
"LIVE":"LIVE",
"UNAVAILABLE":"NON DISPONIBILE",
"Availability Unavailable":"Disponibilità non disponibile",
"Loading Availability...":"Caricamento disponibilità...",
"This date is fully booked. Please choose an available check-in date.":"Questa data è al completo. Scegli una data di check-in disponibile.",
"Your selected stay crosses a fully booked date. Please choose another check-out date.":"Il soggiorno selezionato include una data al completo. Scegli un altro check-out.",
"We could not load availability at the moment. Please try again shortly.":"Non riusciamo a caricare la disponibilità in questo momento. Riprova tra poco.",
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
"Minimum stay is 2 nights.":"Il soggiorno minimo è di 2 notti.",
"TOTAL STAY":"TOTALE SOGGIORNO",
"REQUEST TO BOOK →":"RICHIEDI PRENOTAZIONE →",
"Price on request":"Prezzo su richiesta",
"Select guests to see the total price":"Seleziona gli ospiti per vedere il prezzo totale",
"fully booked":"al completo",
"available":"disponibile"
};

const PRIME_LANG_KEY="primeResidenceLanguage";

let primeLanguage=(()=>{
try{
return localStorage.getItem(PRIME_LANG_KEY)==="it"
?"it"
:"en";
}catch{
return"en";
}
})();

const primeOriginalText=new WeakMap();
const primeOriginalAttrs=new WeakMap();

const primeNorm=s=>
String(s||"")
.replace(/\s+/g," ")
.trim();

const primeTranslate=s=>{
const text=String(s??"");

return primeLanguage==="it"
?(PRIME_TRANSLATIONS[primeNorm(text)]||text)
:text;
};

function primeTranslateTextNode(node){

if(
!node||
node.nodeType!==3
){
return;
}

if(
!primeOriginalText.has(node)
){
primeOriginalText.set(
node,
node.nodeValue
);
}

const original=
primeOriginalText.get(node);

const normalized=
primeNorm(original);

if(!normalized)return;

const translated=
primeLanguage==="it"
?PRIME_TRANSLATIONS[normalized]
:undefined;

node.nodeValue=
translated!==undefined
?original.replace(
normalized,
translated
)
:original;

}

function primeTranslateElement(el){

if(
!el||
el.nodeType!==1||
["SCRIPT","STYLE"].includes(el.tagName)
){
return;
}

[
"placeholder",
"aria-label",
"title"
].forEach(attr=>{

if(
!el.hasAttribute(attr)
){
return;
}

const store=
primeOriginalAttrs.get(el)||
{};

if(
!(attr in store)
){
store[attr]=
el.getAttribute(attr);
}

primeOriginalAttrs.set(
el,
store
);

const original=
store[attr];

const translated=
primeLanguage==="it"
?PRIME_TRANSLATIONS[
primeNorm(original)
]
:undefined;

el.setAttribute(
attr,
translated!==undefined
?translated
:original
);

});

for(
const child of
el.childNodes
){

if(
child.nodeType===3
){

primeTranslateTextNode(
child
);

}else{

primeTranslateElement(
child
);

}

}

}

function primeUpdateLanguageButtons(){

document
.querySelectorAll(
".language-switcher button[data-lang]"
)
.forEach(btn=>{

btn.classList.toggle(
"active",
btn.dataset.lang===
primeLanguage
);

});

}

function primeApplyLanguage(){

document.documentElement.lang=
primeLanguage;

primeTranslateElement(
document.body
);

primeUpdateLanguageButtons();

window.dispatchEvent(
new CustomEvent(
"primeLanguageChanged",
{
detail:{
lang:primeLanguage
}
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

const wrap=
document.createElement(
"div"
);

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
()=>primeSetLanguage(
button.dataset.lang
)
);

});

return wrap;

};

const desktop=
document.querySelector(
".desktop-nav"
);

if(desktop){

const switcher=
make();

const book=
desktop.querySelector(
".nav-book"
);

if(book){

desktop.insertBefore(
switcher,
book
);

}else{

desktop.appendChild(
switcher
);

}

const navContainer=
document.querySelector(
".nav-container"
);

const toggle=
navContainer&&
navContainer.querySelector(
".menu-toggle"
);

if(
navContainer&&
toggle
){

navContainer.insertBefore(
make(
"language-switcher-mobile"
),
toggle
);

}

}else{

const apartmentRight=
document.querySelector(
".apartment-nav-right"
);

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


/* =========================================================
   01. PREMIUM INTRO
========================================================= */

const loader=
document.querySelector(
".loader"
);

const hero=
document.querySelector(
".hero"
);

if(
loader&&
hero
){

const INTRO_DURATION=
2200;

let introFinished=false;
let introAnimating=false;
let startTime=null;
let touchStartY=0;
let mouseStartY=0;
let mouseDragging=false;

document.body.style.overflow=
"hidden";

loader.style.transform=
"translate3d(0,0,0)";

const ease=t=>
t<.5
?4*t*t*t
:1-Math.pow(
-2*t+2,
3
)/2;

function finishIntro(){

introFinished=true;
introAnimating=false;

loader.style.transform=
"translate3d(0,-100%,0)";

loader.classList.add(
"hide"
);

document.body.style.userSelect=
"";

document.body.style.overflow=
"";

}

function animate(now){

if(!startTime){
startTime=now;
}

const progress=
Math.min(
(now-startTime)/
INTRO_DURATION,
1
);

loader.style.transform=
`translate3d(0,${-ease(progress)*100}%,0)`;

if(progress<1){

requestAnimationFrame(
animate
);

}else{

finishIntro();

}

}

function startIntro(){

if(
introFinished||
introAnimating
){
return;
}

introAnimating=true;
startTime=null;

window.dispatchEvent(
new CustomEvent(
"primeIntroStarted"
)
);

requestAnimationFrame(
animate
);

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
){
return;
}

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
){
return;
}

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
){
return;
}

mouseDragging=true;

mouseStartY=
e.clientY;

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
){
return;
}

if(
mouseStartY-
e.clientY>=35
){

mouseDragging=false;

document.body.style.userSelect=
"";

startIntro();

}

}
);

window.addEventListener(
"mouseup",
e=>{

if(!mouseDragging)return;

mouseDragging=false;

document.body.style.userSelect=
"";

if(
mouseStartY-
e.clientY>=35
){

startIntro();

}

}
);

}


/* =========================================================
   02. NAVBAR
========================================================= */

const navbar=
document.querySelector(
".navbar"
);

function updateNavbar(){

if(!navbar)return;

if(
window.scrollY>50
){

navbar.classList.add(
"scrolled"
);

}else{

navbar.classList.remove(
"scrolled"
);

}

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
document.querySelector(
".menu-toggle"
);

const mobileMenu=
document.querySelector(
".mobile-menu"
);

if(
menuToggle&&
mobileMenu
){

menuToggle.setAttribute(
"aria-expanded",
"false"
);

menuToggle.addEventListener(
"click",
()=>{

const open=
menuToggle.classList.toggle(
"active"
);

mobileMenu.classList.toggle(
"active",
open
);

menuToggle.setAttribute(
"aria-expanded",
open
?"true"
:"false"
);

document.body.style.overflow=
open
?"hidden"
:"";

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

document.body.style.overflow=
"";

}
);

});

}


/* =========================================================
   04. REVEAL
========================================================= */

const revealElements=
document.querySelectorAll(
".reveal"
);

if(
revealElements.length
){

const observer=
new IntersectionObserver(
entries=>{

entries.forEach(
entry=>{

if(
entry.isIntersecting
){

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
el=>
observer.observe(el)
);

}


/* =========================================================
   05. PREMIUM SCROLL
========================================================= */

let premiumScrollAnimation=
null;

function premiumEase(t){

return t<.5
?4*t*t*t
:1-Math.pow(
-2*t+2,
3
)/2;

}

function premiumScrollTo(
target,
duration=1400
){

if(!target)return;

if(
premiumScrollAnimation
){

cancelAnimationFrame(
premiumScrollAnimation
);

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
target
.getBoundingClientRect()
.top+
window.scrollY-
navOffset
);

const distance=
targetY-
startY;

let start=null;

function frame(time){

if(!start){
start=time;
}

const progress=
Math.min(
(time-start)/
duration,
1
);

window.scrollTo(
0,
startY+
distance*
premiumEase(progress)
);

if(
progress<1
){

premiumScrollAnimation=
requestAnimationFrame(
frame
);

}else{

premiumScrollAnimation=
null;

}

}

premiumScrollAnimation=
requestAnimationFrame(
frame
);

}


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

if(
slides.length<2
){
return;
}

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

let down=false;
let startX=0;
let startY=0;

function showSlide(index){

if(index<0){
index=
slides.length-1;
}

if(
index>=slides.length
){
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

showSlide(
current+1
);

}

function previousSlide(){

showSlide(
current-1
);

}

function restartAutoplay(){

if(autoplay){
clearInterval(
autoplay
);
}

autoplay=
setInterval(
nextSlide,
5000
);

}

gallery.style.touchAction=
"pan-y";

gallery
.querySelectorAll("img")
.forEach(img=>{

img.draggable=false;

});

gallery.addEventListener(
"pointerdown",
e=>{

if(
e.pointerType==="mouse"&&
e.button!==0
){
return;
}

down=true;

startX=e.clientX;
startY=e.clientY;

try{

gallery.setPointerCapture(
e.pointerId
);

}catch{}

}
);

gallery.addEventListener(
"pointerup",
e=>{

if(!down)return;

down=false;

const dx=
e.clientX-
startX;

const dy=
e.clientY-
startY;

if(
Math.abs(dx)>=45&&
Math.abs(dx)>
Math.abs(dy)
){

if(dx<0){

nextSlide();

}else{

previousSlide();

}

}

restartAutoplay();

}
);

showSlide(0);

restartAutoplay();

});


/* =========================================================
   07. BOOKING
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

const guestsInput=
document.querySelector(
"#guests"
);

const stayPriceBanner=
document.querySelector(
"#stayPriceBanner"
);

const stayPriceTotal=
document.querySelector(
"#stayPriceTotal"
);

const stayPriceMeta=
document.querySelector(
"#stayPriceMeta"
);

const requestBookingButton=
document.querySelector(
"#requestBookingButton"
);

const guestDetailsSection=
document.querySelector(
"#guest-details-section"
);

const estimatedTotalInput=
document.querySelector(
"#estimatedTotal"
);

let calendarEvents=[];

let selectedStart="";
let selectedEnd="";
let previewEnd="";

let calendarLoaded=false;
let currentCalendarKey="";
let calendarRequestId=0;

const parseISO=value=>{

const[
year,
month,
day
]=value
.split("-")
.map(Number);

return new Date(
year,
month-1,
day
);

};

const dateISO=date=>
`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

const addDays=(
value,
days
)=>{

const date=
parseISO(value);

date.setDate(
date.getDate()+
days
);

return dateISO(date);

};

const todayISO=()=>{

return dateISO(
new Date()
);

};

const nightsBetween=(
start,
end
)=>
Math.round(
(
parseISO(end)-
parseISO(start)
)/
86400000
);

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

let displayMonth=
new Date();

displayMonth=
new Date(
displayMonth.getFullYear(),
displayMonth.getMonth(),
1
);


/* =========================================================
   08. PRICES — BARONTINI
========================================================= */

const BARONTINI_RATES={};

const setRate=(
date,
price
)=>{

BARONTINI_RATES[date]=
price;

};

const setRange=(
start,
end,
price
)=>{

for(
let date=start;
date<=end;
date=addDays(date,1)
){

setRate(
date,
price
);

}

};


/* SEPTEMBER */

setRate("2026-09-13",99);
setRate("2026-09-14",99);
setRate("2026-09-15",99);
setRate("2026-09-19",150);
setRate("2026-09-20",175);
setRate("2026-09-23",230);
setRate("2026-09-24",230);
setRate("2026-09-29",130);
setRate("2026-09-30",130);


/* OCTOBER */

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


/* NOVEMBER */

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


/* DECEMBER */

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


/* JANUARY */

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


/* FEBRUARY
   SUN-THU 115
   FRI-SAT 140
*/

for(
let date="2027-02-01";
date<="2027-02-28";
date=addDays(date,1)
){

const weekday=
parseISO(date)
.getDay();

setRate(
date,
weekday===5||
weekday===6
?140
:115
);

}


/* =========================================================
   09. PRICES — GASTONE ROSSI 12
========================================================= */

const GASTONE_RATES={};

const setGastoneRate=(
date,
price
)=>{

GASTONE_RATES[date]=
price;

};

const setGastoneRange=(
start,
end,
price
)=>{

for(
let date=start;
date<=end;
date=addDays(date,1)
){

setGastoneRate(
date,
price
);

}

};


/* SEPTEMBER */

setGastoneRange(
"2026-09-27",
"2026-09-28",
120
);


/* OCTOBER */

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


/* NOVEMBER */

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


/* DECEMBER
   SUN-THU 120
   FRI-SAT 140
   EXCEPTION 1-2 = 130
*/

for(
let date="2026-12-01";
date<="2026-12-31";
date=addDays(date,1)
){

const weekday=
parseISO(date)
.getDay();

setGastoneRate(
date,
weekday===5||
weekday===6
?140
:120
);

}

setGastoneRange(
"2026-12-01",
"2026-12-02",
130
);


/* JANUARY */

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


/* FEBRUARY */

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
   10. PRICE RULES
========================================================= */

const RATE_START=
"2026-09-01";

const RATE_END=
"2027-02-28";

function guestMultiplier(
guests
){

if(
guests<=2
){
return 1;
}

if(
guests===3
){
return 1.30;
}

if(
guests===4
){
return 1.35;
}

if(
guests===5
){
return 1.40;
}

if(
guests===6
){
return 1.45;
}

return 1;

}

function getRates(){

if(
currentCalendarKey===
"barontini"
){

return BARONTINI_RATES;

}

if(
currentCalendarKey===
"gastone"
){

return GASTONE_RATES;

}

return null;

}

function hasRate(
rates,
day
){

return Object
.prototype
.hasOwnProperty
.call(
rates,
day
);

}

function isRateBlocked(
day
){

const rates=
getRates();

if(!rates){
return false;
}

return(
day>=RATE_START&&
day<=RATE_END&&
!hasRate(
rates,
day
)
);

}

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

if(
nights<2
){

return null;

}

const rates=
getRates();

if(!rates){

return null;

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

return null;

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
guests
};

}

function formatPrice(
value
){

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

if(!stayPriceBanner){
return;
}

const result=
calculateStayPrice();

if(!result){

stayPriceBanner.classList.remove(
"visible"
);

if(
estimatedTotalInput
){

estimatedTotalInput.value=
"";

}

return;

}

stayPriceBanner.classList.add(
"visible"
);

if(
stayPriceTotal
){

stayPriceTotal.textContent=
formatPrice(
result.price
);

}

if(
stayPriceMeta
){

stayPriceMeta.textContent=
primeLanguage==="it"
?`${result.nights} notti · ${result.guests} ospiti`
:`${result.nights} nights · ${result.guests} guests`;

}

if(
requestBookingButton
){

requestBookingButton.textContent=
primeTranslate(
"REQUEST TO BOOK →"
);

}

if(
estimatedTotalInput
){

estimatedTotalInput.value=
String(
Math.round(
result.price*100
)/100
);

}

}


/* =========================================================
   11. AVAILABILITY
========================================================= */

function isBooked(
day
){

if(
isRateBlocked(day)
){

return true;

}

return calendarEvents.some(
event=>
event.start&&
event.end&&
day>=event.start&&
day<event.end
);

}

function isPast(
day
){

return day<
todayISO();

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

if(
isBooked(day)
){

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

if(!calendarMessage){
return;
}

calendarMessage.className=
"calendar-message";

calendarMessage.textContent=
"";

}

function showCalendarMessage(
text,
type="info"
){

if(!calendarMessage){
return;
}

calendarMessage.textContent=
primeTranslate(text);

calendarMessage.className=
`calendar-message visible ${type}`;

}

function lockSubmit(
text="Select Your Stay"
){

if(!bookingSubmit){
return;
}

bookingSubmit.disabled=
true;

bookingSubmit.classList.add(
"availability-locked"
);

bookingSubmit.textContent=
primeTranslate(text);

}

function unlockSubmit(){

if(!bookingSubmit){
return;
}

bookingSubmit.disabled=
false;

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
previewEnd
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


/* =========================================================
   13. RENDER CALENDAR
========================================================= */

function renderCalendar(){

if(
!calendarGrid||
!calendarMonthLabel
){

return;

}

calendarGrid.innerHTML=
"";

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

button.type=
"button";

button.className=
"booking-calendar-day";

button.dataset.date=
iso;

button.textContent=
String(day);

if(past){

button.disabled=
true;

button.classList.add(
"past"
);

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

calendarGrid.appendChild(
button
);

}

}


/* =========================================================
   14. DAY CLICK
========================================================= */

function handleDayClick(
day
){

clearCalendarMessage();

if(
isPast(day)
){

return;

}

if(
!selectedStart||
selectedEnd
){

if(
isBooked(day)
){

showCalendarMessage(
"This date is fully booked. Please choose an available check-in date.",
"info"
);

return;

}

selectedStart=
day;

selectedEnd=
"";

if(checkinInput){

checkinInput.value=
day;

}

if(checkoutInput){

checkoutInput.value=
"";

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

if(
day===selectedStart
){

clearStay();

return;

}

if(
day<selectedStart
){

if(
isBooked(day)
){

return;

}

selectedStart=
day;

renderCalendar();

return;

}

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

selectedEnd=
day;

updateSelectedStay();

renderCalendar();

}


/* =========================================================
   15. LOAD CALENDAR
========================================================= */

async function loadCalendar(
calendarKey,
residenceName
){

if(!primeCalendar){
return;
}

const requestId=
++calendarRequestId;

currentCalendarKey=
calendarKey;

calendarLoaded=
false;

calendarEvents=[];

clearStay(
false
);

clearCalendarMessage();

primeCalendar.classList.remove(
"disabled"
);

if(
calendarResidenceTitle
){

calendarResidenceTitle.textContent=
residenceName;

}

if(
calendarLiveText
){

calendarLiveText.textContent=
primeTranslate(
"LOADING"
);

}

if(
calendarLiveStatus
){

calendarLiveStatus.classList.add(
"loading"
);

}

if(
calendarLoadingMessage
){

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

if(
calendarLiveText
){

calendarLiveText.textContent=
"LIVE";

}

if(
calendarLiveStatus
){

calendarLiveStatus.classList.remove(
"loading"
);

}

if(
calendarLoadingMessage
){

calendarLoadingMessage.classList.remove(
"visible"
);

}

lockSubmit(
"Select Your Stay"
);

renderCalendar();

}catch(error){

console.error(
"Availability error:",
error
);

calendarLoaded=
false;

if(
calendarLiveText
){

calendarLiveText.textContent=
primeTranslate(
"UNAVAILABLE"
);

}

if(
calendarLiveStatus
){

calendarLiveStatus.classList.remove(
"loading"
);

}

if(
calendarLoadingMessage
){

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

function selectResidence(
card
){

bookingCards.forEach(
item=>
item.classList.remove(
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

if(
bookingFormSection
){

bookingFormSection.scrollIntoView({
behavior:"smooth",
block:"start"
});

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
   17. GUESTS + BANNER
========================================================= */

if(
guestsInput
){

guestsInput.addEventListener(
"change",
updatePriceBanner
);

}

if(
requestBookingButton
){

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

const previous=
new Date(
displayMonth.getFullYear(),
displayMonth.getMonth()-1,
1
);

const now=
new Date();

const currentMonth=
new Date(
now.getFullYear(),
now.getMonth(),
1
);

if(
previous>=currentMonth
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

if(
selectedStayClear
){

selectedStayClear.addEventListener(
"click",
()=>{

clearStay();

clearCalendarMessage();

}
);

}


/* =========================================================
   19. BOOKING FORM
========================================================= */

function showMessage(
text,
type
){

if(
!bookingMessage
){
return;
}

bookingMessage.textContent=
primeTranslate(text);

bookingMessage.className=
`booking-message ${type}`;

bookingMessage.style.display=
"block";

}

function hideMessage(){

if(
bookingMessage
){

bookingMessage.style.display=
"none";

}

}

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

const events=
Array.isArray(
result.events
)
?result.events
:[];

for(
const event of
events
){

for(
let day=selectedStart;
day<selectedEnd;
day=addDays(day,1)
){

if(
day>=event.start&&
day<event.end
){

return false;

}

}

}

return true;

}

if(
bookingForm
){

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

if(
!calendarLoaded
){

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

if(
!guestsInput||
!guestsInput.value
){

showMessage(
"Select guests to see the total price",
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

const available=
await verifyStayAgain();

if(!available){

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

const price=
calculateStayPrice();

if(price){

data.estimatedTotal=
Math.round(
price.price*100
)/100;

}

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

if(
!response.ok
){

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

clearStay(
false
);

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
   20. PRIME ASSISTANT
========================================================= */

const assistant=
document.querySelector(
".prime-assistant"
);

if(assistant){

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

if(
launcher&&
chatWindow
){

launcher.addEventListener(
"click",
()=>{

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

}
);

}

if(closeChat){

closeChat.addEventListener(
"click",
()=>{

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

}
);

}

}


/* =========================================================
   21. ESC
========================================================= */

document.addEventListener(
"keydown",
e=>{

if(
e.key!=="Escape"
){
return;
}

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

}

document.body.style.overflow=
"";

}

}
);


/* =========================================================
   22. YEAR
========================================================= */

const year=
document.querySelector(
"#year"
);

if(year){

year.textContent=
new Date()
.getFullYear();

}

console.log(
"Prime Residence Bologna — website ready."
);

});
