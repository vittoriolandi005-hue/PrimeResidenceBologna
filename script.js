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
"available":"disponibile",
"SIZE":"SUPERFICIE",
"YOUR STAY":"IL TUO SOGGIORNO",
"FAMILIES":"FAMIGLIE",
"Quiet private stay":"Soggiorno privato e tranquillo",
"Children welcome":"Bambini benvenuti",
"SWIPE OR DRAG TO EXPLORE":"SCORRI O TRASCINA PER ESPLORARE",
"Previous photos":"Foto precedenti",
"Next photos":"Foto successive"
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

if(!node||node.nodeType!==3){
return;
}

if(!primeOriginalText.has(node)){
primeOriginalText.set(node,node.nodeValue);
}

const original=
primeOriginalText.get(node);

const normalized=
primeNorm(original);

if(!normalized){
return;
}

const translated=
primeLanguage==="it"
?PRIME_TRANSLATIONS[normalized]
:undefined;

node.nodeValue=
translated!==undefined
?original.replace(normalized,translated)
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

["placeholder","aria-label","title"].forEach(attr=>{

if(!el.hasAttribute(attr)){
return;
}

const store=
primeOriginalAttrs.get(el)||{};

if(!(attr in store)){
store[attr]=el.getAttribute(attr);
}

primeOriginalAttrs.set(el,store);

const original=
store[attr];

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

child.nodeType===3
?primeTranslateTextNode(child)
:primeTranslateElement(child);

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
document.createElement("div");

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

book
?desktop.insertBefore(
switcher,
book
)
:desktop.appendChild(
switcher
);

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
make("language-switcher-mobile"),
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

if(loader&&hero){

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
:1-Math.pow(-2*t+2,3)/2;

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

if(introFinished){
return;
}

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
e.clientY>=
35
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

if(!mouseDragging){
return;
}

mouseDragging=false;

document.body.style.userSelect=
"";

if(
mouseStartY-
e.clientY>=
35
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

if(!navbar){
return;
}

navbar.classList.toggle(
"scrolled",
window.scrollY>50
);

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
   02B. ADAPTIVE LOGO CONTRAST
   Automatically chooses a light or dark header logo according
   to the real background directly behind the logo.
========================================================= */

const adaptiveNavs=[
...document.querySelectorAll(
"[data-adaptive-nav],.navbar,.apartment-nav"
)
];

const adaptivePixelCanvas=
document.createElement(
"canvas"
);

adaptivePixelCanvas.width=
1;

adaptivePixelCanvas.height=
1;

const adaptivePixelContext=
adaptivePixelCanvas.getContext(
"2d",
{
willReadFrequently:true
}
);

let adaptiveLogoFrame=0;
let adaptiveLogoTimer=0;

function adaptiveRgbFromColor(color){

const match=
String(color||"")
.match(
/rgba?\(([^)]+)\)/i
);

if(!match){
return null;
}

const parts=
match[1]
.split(",")
.map(
value=>
Number(
value.trim()
)
);

if(
parts.length<3||
parts
.slice(0,3)
.some(Number.isNaN)
){
return null;
}

return{

r:parts[0],

g:parts[1],

b:parts[2],

a:
parts.length>=4&&
Number.isFinite(parts[3])
?parts[3]
:1

};

}

function adaptiveLuminance(
r,
g,
b
){

return(
.2126*r+
.7152*g+
.0722*b
)/255;

}

function adaptiveImageLuminance(
img,
clientX,
clientY
){

if(
!adaptivePixelContext||
!img||
!img.complete||
!img.naturalWidth||
!img.naturalHeight
){
return null;
}

const rect=
img.getBoundingClientRect();

if(
!rect.width||
!rect.height||
clientX<rect.left||
clientX>rect.right||
clientY<rect.top||
clientY>rect.bottom
){
return null;
}

const style=
getComputedStyle(
img
);

const fit=
style.objectFit||
"fill";

const naturalWidth=
img.naturalWidth;

const naturalHeight=
img.naturalHeight;

let scaleX=
rect.width/
naturalWidth;

let scaleY=
rect.height/
naturalHeight;

let drawWidth=
rect.width;

let drawHeight=
rect.height;

let offsetX=0;
let offsetY=0;

if(
fit==="cover"||
fit==="contain"
){

const scale=
fit==="cover"
?Math.max(
scaleX,
scaleY
)
:Math.min(
scaleX,
scaleY
);

scaleX=
scale;

scaleY=
scale;

drawWidth=
naturalWidth*
scale;

drawHeight=
naturalHeight*
scale;

offsetX=
(
rect.width-
drawWidth
)/2;

offsetY=
(
rect.height-
drawHeight
)/2;

}

const localX=
clientX-
rect.left-
offsetX;

const localY=
clientY-
rect.top-
offsetY;

const sourceX=
localX/
scaleX;

const sourceY=
localY/
scaleY;

if(
sourceX<0||
sourceY<0||
sourceX>=naturalWidth||
sourceY>=naturalHeight
){
return null;
}

try{

adaptivePixelContext.clearRect(
0,
0,
1,
1
);

adaptivePixelContext.drawImage(
img,

Math.max(
0,
Math.min(
naturalWidth-1,
sourceX
)
),

Math.max(
0,
Math.min(
naturalHeight-1,
sourceY
)
),

1,
1,
0,
0,
1,
1
);

const pixel=
adaptivePixelContext
.getImageData(
0,
0,
1,
1
)
.data;

return adaptiveLuminance(
pixel[0],
pixel[1],
pixel[2]
);

}catch{

return null;

}

}

function adaptivePointLuminance(
nav,
clientX,
clientY
){

const stack=
document.elementsFromPoint(
clientX,
clientY
);

let imageCandidate=null;
let imageSectionFound=false;

for(
const element
of stack
){

if(
!element||
element===document.documentElement||
element===document.body
){
continue;
}

if(
element.closest(
".navbar,.apartment-nav,.mobile-menu,.prime-assistant,.gallery-photo-viewer,.gallery-album-overlay"
)
){
continue;
}

const themed=
element.closest(
"[data-logo-scheme]"
);

if(themed){

const scheme=
themed.dataset.logoScheme;

if(
scheme==="dark"
){
return .16;
}

if(
scheme==="light"
){
return .88;
}

if(
scheme==="image"
){
imageSectionFound=true;
}

}

if(
!imageCandidate&&
element.tagName==="IMG"
){

imageCandidate=
element;

}

const background=
adaptiveRgbFromColor(
getComputedStyle(
element
)
.backgroundColor
);

if(
background&&
background.a>=.72
){

return adaptiveLuminance(
background.r,
background.g,
background.b
);

}

}

if(imageCandidate){

const sampled=
adaptiveImageLuminance(
imageCandidate,
clientX,
clientY
);

if(
sampled!==null
){

return Math.max(
0,
sampled-
(
imageSectionFound
?.08
:0
)
);

}

}

if(imageSectionFound){
return .28;
}

return null;

}

function adaptiveSchemeForNav(nav){

if(
nav.classList.contains(
"scrolled"
)
){

return"light";

}

const logo=
nav.querySelector(
".site-brand-image-nav"
);

if(!logo){
return"light";
}

const rect=
logo.getBoundingClientRect();

if(
rect.width<=0||
rect.height<=0
){
return"light";
}

const sampleY=
Math.max(
2,
Math.min(
window.innerHeight-2,
rect.top+
rect.height*.55
)
);

const sampleXs=[

rect.left+
rect.width*.18,

rect.left+
rect.width*.50,

rect.left+
rect.width*.82

];

const values=
sampleXs
.map(
x=>
adaptivePointLuminance(

nav,

Math.max(
2,
Math.min(
window.innerWidth-2,
x
)
),

sampleY

)
)
.filter(
value=>
typeof value==="number"&&
Number.isFinite(value)
);

if(!values.length){

const themed=
document
.elementFromPoint(

Math.max(
2,
Math.min(
window.innerWidth-2,
rect.left+
rect.width*.5
)
),

sampleY

)
?.closest(
"[data-logo-scheme]"
);

if(themed){

return themed.dataset.logoScheme==="light"
?"light"
:"dark";

}

return document.body.classList.contains(
"home-page"
)
?"dark"
:"light";

}

const average=
values.reduce(
(sum,value)=>
sum+value,
0
)/
values.length;

const currentlyDark=
nav.classList.contains(
"nav-on-dark"
);

if(currentlyDark){

return average>.62
?"light"
:"dark";

}

return average<.52
?"dark"
:"light";

}

function updateAdaptiveLogos(){

adaptiveNavs.forEach(
nav=>{

const scheme=
adaptiveSchemeForNav(
nav
);

nav.classList.toggle(
"nav-on-dark",
scheme==="dark"
);

nav.classList.toggle(
"nav-on-light",
scheme==="light"
);

nav
.querySelectorAll(
".site-brand-image-nav"
)
.forEach(
img=>{

img.classList.toggle(
"logo-contrast-light",
scheme==="dark"
);

img.classList.toggle(
"logo-contrast-dark",
scheme==="light"
);

}
);

}
);

}

function requestAdaptiveLogoUpdate(){

if(adaptiveLogoFrame){
return;
}

adaptiveLogoFrame=
requestAnimationFrame(
()=>{

adaptiveLogoFrame=0;

updateAdaptiveLogos();

}
);

}

requestAdaptiveLogoUpdate();

window.addEventListener(
"scroll",
requestAdaptiveLogoUpdate,
{
passive:true
}
);

window.addEventListener(
"resize",
requestAdaptiveLogoUpdate,
{
passive:true
}
);

window.addEventListener(
"load",
requestAdaptiveLogoUpdate
);

document
.querySelectorAll(
"img"
)
.forEach(
img=>{

if(!img.complete){

img.addEventListener(
"load",
requestAdaptiveLogoUpdate,
{
once:true
}
);

}

}
);

adaptiveLogoTimer=
window.setInterval(
()=>{

if(!document.hidden){

requestAdaptiveLogoUpdate();

}

},
400
);

document.addEventListener(
"visibilitychange",
()=>{

if(!document.hidden){

requestAdaptiveLogoUpdate();

}

}
);


/* =========================================================
   02C. HOME HERO CAROUSEL — GPU / REQUESTANIMATIONFRAME
========================================================= */

const primeHeroGallery=
document.querySelector(
"#primeHeroGallery"
);

if(primeHeroGallery){

const track=
primeHeroGallery.querySelector(
".prime-hero-gallery-track"
);

const viewport=
primeHeroGallery.querySelector(
".prime-hero-gallery-window"
);

const originals=
track
?[
...track.querySelectorAll(
".prime-hero-gallery-panel"
)
]
:[];

if(
track&&
viewport&&
originals.length>=3
){

originals
.slice(
0,
2
)
.forEach(
panel=>{

const clone=
panel.cloneNode(
true
);

clone.setAttribute(
"data-carousel-clone",
"true"
);

track.appendChild(
clone
);

}
);

const SLIDE_MS=
1500;

const HOLD_MS=
3600;

let index=0;
let step=0;
let offset=0;
let rafId=0;
let timer=0;
let animating=false;
let resizeTimer=0;

const ease=t=>
0.5-
Math.cos(
Math.PI*t
)/2;

function measure(){

const panels=
track.querySelectorAll(
".prime-hero-gallery-panel"
);

if(
panels.length<2
){
return;
}

const a=
panels[0]
.getBoundingClientRect();

const b=
panels[1]
.getBoundingClientRect();

step=
b.left-
a.left;

offset=
index*
step;

track.style.transform=
`translate3d(${-offset}px,0,0)`;

}

function stopAnimation(){

if(rafId){

cancelAnimationFrame(
rafId
);

rafId=0;

}

animating=false;

}

function schedule(){

clearTimeout(
timer
);

if(!document.hidden){

timer=
window.setTimeout(
slideNext,
HOLD_MS
);

}

}

function slideNext(){

if(
animating||
!step
){
return;
}

animating=true;

const startOffset=
offset;

const endOffset=
startOffset+
step;

const startTime=
performance.now();

function frame(now){

const progress=
Math.min(
(now-startTime)/
SLIDE_MS,
1
);

const value=
startOffset+
(
endOffset-
startOffset
)*
ease(
progress
);

track.style.transform=
`translate3d(${-value}px,0,0)`;

if(progress<1){

rafId=
requestAnimationFrame(
frame
);

return;

}

rafId=0;

index+=1;

offset=
endOffset;

if(
index>=
originals.length
){

index=0;
offset=0;

track.style.transform=
"translate3d(0,0,0)";

}

animating=false;

schedule();

}

rafId=
requestAnimationFrame(
frame
);

}

function preload(){

return Promise.all(

[
...track.querySelectorAll(
"img"
)
]

.map(
img=>{

if(img.complete){

return img.decode
?img.decode()
.catch(
()=>{}
)
:Promise.resolve();

}

return new Promise(
resolve=>{

img.addEventListener(
"load",
resolve,
{
once:true
}
);

img.addEventListener(
"error",
resolve,
{
once:true
}
);

}
);

}
)

);

}

window.addEventListener(
"resize",
()=>{

clearTimeout(
resizeTimer
);

resizeTimer=
window.setTimeout(
()=>{

stopAnimation();

clearTimeout(
timer
);

measure();

schedule();

},
120
);

}
);

document.addEventListener(
"visibilitychange",
()=>{

clearTimeout(
timer
);

if(document.hidden){

stopAnimation();

}else{

measure();

schedule();

}

}
);

preload()
.finally(
()=>{

requestAnimationFrame(
()=>{

measure();

requestAnimationFrame(
schedule
);

}
);

}
);

}

}


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
.querySelectorAll(
"a"
)
.forEach(
link=>{

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

}
);

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
observer.observe(
el
)
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

if(!target){
return;
}

if(premiumScrollAnimation){

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

let start=
null;

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
premiumEase(
progress
)
);

if(progress<1){

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
   06. APARTMENT GALLERY - ALL PHOTOS + PHOTO VIEWER
   ONLY GASTONE ROSSI 12 AND BARONTINI 8
========================================================= */

document
.querySelectorAll(
"[data-booking-gallery]"
)
.forEach(
gallery=>{

const prefix=
gallery.dataset.galleryPrefix||
"";

const count=
Math.max(
0,
Number(
gallery.dataset.galleryCount
)||
0
);

const images=
Array.from(
{
length:count
},
(_,i)=>
`${prefix}${String(i+1).padStart(2,"0")}.jpg`
);

const slots=[
...gallery.querySelectorAll(
"[data-gallery-slot]"
)
];

const prev=
gallery.querySelector(
"[data-gallery-prev]"
);

const next=
gallery.querySelector(
"[data-gallery-next]"
);

const counter=
gallery
.closest(
".property-gallery-section"
)
?.querySelector(
"[data-gallery-current]"
);

const moreLabel=
gallery.querySelector(
"[data-gallery-more]"
);

if(
!images.length||
!slots.length
){
return;
}

let current=0;

let down=false;
let startX=0;
let startY=0;

let viewerIndex=0;

let viewerDown=false;
let viewerStartX=0;
let viewerStartY=0;

const residenceName=
document.body.dataset.residence==="gastone"
?"Gastone Rossi 12"
:document.body.dataset.residence==="barontini"
?"Barontini 8"
:"Prime Residence Bologna";


/* =========================================================
   SCREEN 1 — ALL PHOTOS
========================================================= */

const album=
document.createElement(
"section"
);

album.className=
"gallery-album-overlay";

album.setAttribute(
"aria-hidden",
"true"
);

album.setAttribute(
"aria-label",
"All residence photos"
);

album.innerHTML=`
<button
  class="gallery-album-back"
  type="button"
  aria-label="Back to residence"
>
  <span aria-hidden="true">&#8592;</span>
</button>

<div class="gallery-album-grid"></div>
`;

document.body.appendChild(
album
);

const albumGrid=
album.querySelector(
".gallery-album-grid"
);

const albumBack=
album.querySelector(
".gallery-album-back"
);

images.forEach(
(src,index)=>{

const button=
document.createElement(
"button"
);

button.className=
"gallery-album-item";

button.type=
"button";

button.dataset.albumIndex=
String(index);

button.setAttribute(
"aria-label",
`Open photo ${index+1}`
);

const img=
document.createElement(
"img"
);

img.src=
src;

img.alt=
`${residenceName} - photo ${index+1}`;

img.loading=
index<10
?"eager"
:"lazy";

img.decoding=
"async";

button.appendChild(
img
);

albumGrid.appendChild(
button
);

button.addEventListener(
"click",
()=>{

openViewer(
index
);

}
);

}
);

function openAlbum(){

album.classList.add(
"open"
);

album.setAttribute(
"aria-hidden",
"false"
);

document.body.classList.add(
"no-scroll"
);

album.scrollTop=
0;

requestAnimationFrame(
()=>{

albumBack.focus({
preventScroll:true
});

}
);

}

function closeAlbum(){

closeViewer(
false
);

album.classList.remove(
"open"
);

album.setAttribute(
"aria-hidden",
"true"
);

document.body.classList.remove(
"no-scroll"
);

}

albumBack.addEventListener(
"click",
closeAlbum
);


/* =========================================================
   SCREEN 2 — SINGLE PHOTO
========================================================= */

const viewer=
document.createElement(
"section"
);

viewer.className=
"gallery-photo-viewer";

viewer.setAttribute(
"aria-hidden",
"true"
);

viewer.setAttribute(
"aria-label",
"Residence photo viewer"
);

viewer.innerHTML=`

<button
  class="gallery-viewer-back"
  type="button"
  aria-label="Back to all photos"
>
  <span aria-hidden="true">&#8592;</span>
</button>

<button
  class="gallery-viewer-close"
  type="button"
  aria-label="Close gallery"
>
  <span aria-hidden="true">&times;</span>
</button>

<button
  class="gallery-viewer-prev"
  type="button"
  aria-label="Previous photo"
>
  <span aria-hidden="true">&#8249;</span>
</button>

<div class="gallery-viewer-main">

  <div class="gallery-viewer-image-wrap">

    <img
      class="gallery-viewer-image"
      alt="Residence gallery photo"
    >

  </div>

  <div class="gallery-viewer-counter"></div>

</div>

<button
  class="gallery-viewer-next"
  type="button"
  aria-label="Next photo"
>
  <span aria-hidden="true">&#8250;</span>
</button>

<div class="gallery-viewer-thumbnails"></div>

`;

document.body.appendChild(
viewer
);

const viewerImage=
viewer.querySelector(
".gallery-viewer-image"
);

const viewerCounter=
viewer.querySelector(
".gallery-viewer-counter"
);

const viewerBack=
viewer.querySelector(
".gallery-viewer-back"
);

const viewerClose=
viewer.querySelector(
".gallery-viewer-close"
);

const viewerPrev=
viewer.querySelector(
".gallery-viewer-prev"
);

const viewerNext=
viewer.querySelector(
".gallery-viewer-next"
);

const viewerThumbs=
viewer.querySelector(
".gallery-viewer-thumbnails"
);

const thumbnailButtons=
[];

images.forEach(
(src,index)=>{

const button=
document.createElement(
"button"
);

button.className=
"gallery-viewer-thumb";

button.type=
"button";

button.dataset.viewerIndex=
String(index);

button.setAttribute(
"aria-label",
`View photo ${index+1}`
);

const img=
document.createElement(
"img"
);

img.src=
src;

img.alt=
"";

img.loading=
index<12
?"eager"
:"lazy";

img.decoding=
"async";

button.appendChild(
img
);

viewerThumbs.appendChild(
button
);

thumbnailButtons.push(
button
);

button.addEventListener(
"click",
()=>{

viewerIndex=
index;

renderViewer();

}
);

}
);

function preloadViewerNeighbors(){

const indexes=[

(viewerIndex+1)%
images.length,

(
viewerIndex-
1+
images.length
)%
images.length

];

indexes.forEach(
index=>{

const preloadImage=
new Image();

preloadImage.src=
images[index];

}
);

}

function syncActiveThumbnail(){

thumbnailButtons.forEach(
(
button,
index
)=>{

const active=
index===
viewerIndex;

button.classList.toggle(
"active",
active
);

button.setAttribute(
"aria-current",
active
?"true"
:"false"
);

}
);

const active=
thumbnailButtons[
viewerIndex
];

if(active){

active.scrollIntoView({
behavior:"smooth",
block:"nearest",
inline:"center"
});

}

}

function renderViewer(){

viewerIndex=
(
viewerIndex+
images.length
)%
images.length;

viewerImage.classList.add(
"is-changing"
);

window.setTimeout(
()=>{

viewerImage.src=
images[
viewerIndex
];

viewerImage.alt=
`${residenceName} - photo ${viewerIndex+1}`;

viewerCounter.textContent=
`${viewerIndex+1} / ${images.length}`;

syncActiveThumbnail();

preloadViewerNeighbors();

requestAnimationFrame(
()=>{

viewerImage.classList.remove(
"is-changing"
);

}
);

},
90
);

}

function openViewer(index){

viewerIndex=
(
Number(index)+
images.length
)%
images.length;

viewer.classList.add(
"open"
);

viewer.setAttribute(
"aria-hidden",
"false"
);

document.body.classList.add(
"no-scroll"
);

renderViewer();

requestAnimationFrame(
()=>{

viewerBack.focus({
preventScroll:true
});

}
);

}

function closeViewer(
returnToAlbum=true
){

viewer.classList.remove(
"open"
);

viewer.setAttribute(
"aria-hidden",
"true"
);

if(
returnToAlbum&&
album.classList.contains(
"open"
)
){

requestAnimationFrame(
()=>{

albumBack.focus({
preventScroll:true
});

}
);

return;

}

if(
!album.classList.contains(
"open"
)
){

document.body.classList.remove(
"no-scroll"
);

}

}

function viewerMove(direction){

viewerIndex=
(
viewerIndex+
direction+
images.length
)%
images.length;

renderViewer();

}

viewerBack.addEventListener(
"click",
()=>{

closeViewer(
true
);

}
);

viewerClose.addEventListener(
"click",
()=>{

closeViewer(
false
);

closeAlbum();

}
);

viewerPrev.addEventListener(
"click",
()=>{

viewerMove(
-1
);

}
);

viewerNext.addEventListener(
"click",
()=>{

viewerMove(
1
);

}
);

viewer.addEventListener(
"pointerdown",
e=>{

if(
e.target.closest(
".gallery-viewer-thumb,.gallery-viewer-back,.gallery-viewer-close,.gallery-viewer-prev,.gallery-viewer-next"
)
){
return;
}

if(
e.pointerType==="mouse"&&
e.button!==0
){
return;
}

viewerDown=true;

viewerStartX=
e.clientX;

viewerStartY=
e.clientY;

try{

viewer.setPointerCapture(
e.pointerId
);

}catch{}

}
);

viewer.addEventListener(
"pointerup",
e=>{

if(!viewerDown){
return;
}

viewerDown=false;

const dx=
e.clientX-
viewerStartX;

const dy=
e.clientY-
viewerStartY;

if(
Math.abs(dx)>=55&&
Math.abs(dx)>
Math.abs(dy)
){

viewerMove(
dx<0
?1
:-1
);

}

}
);


/* =========================================================
   ORIGINAL MOSAIC ON RESIDENCE PAGE
========================================================= */

function render(dir=0){

if(dir){

gallery.style.setProperty(
"--gallery-shift",
dir>0
?"-12px"
:"12px"
);

gallery.classList.add(
"is-shifting"
);

}

window.setTimeout(
()=>{

slots.forEach(
(
slot,
slotIndex
)=>{

const index=
(
current+
slotIndex
)%
images.length;

const img=
slot.querySelector(
"img"
);

if(img){

img.src=
images[index];

img.alt=
`Residence photo ${index+1}`;

}

slot.dataset.imageIndex=
String(index);

}
);

if(counter){

counter.textContent=
String(
current+1
)
.padStart(
2,
"0"
);

}

if(moreLabel){

const remaining=
Math.max(
0,
images.length-
slots.length
);

moreLabel.textContent=
primeLanguage==="it"
?`Altre ${remaining} foto`
:`${remaining} more photos`;

}

gallery.classList.remove(
"is-shifting"
);

},
dir
?170
:0
);

}

function move(dir){

current=
(
current+
dir+
images.length
)%
images.length;

render(
dir
);

}

if(prev){

prev.addEventListener(
"click",
e=>{

e.stopPropagation();

move(
-1
);

}
);

}

if(next){

next.addEventListener(
"click",
e=>{

e.stopPropagation();

move(
1
);

}
);

}


/* =========================================================
   FIX CLICK / SWIPE CONFLICT
========================================================= */

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

startX=
e.clientX;

startY=
e.clientY;

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

if(!down){
return;
}

down=false;

const dx=
e.clientX-
startX;

const dy=
e.clientY-
startY;

const movedX=
Math.abs(dx);

const movedY=
Math.abs(dy);

if(
movedX<12&&
movedY<12
){

const elementUnderPointer=
document.elementFromPoint(
e.clientX,
e.clientY
);

const clickedSlot=
elementUnderPointer&&
elementUnderPointer.closest(
"[data-gallery-slot]"
);

if(
clickedSlot&&
gallery.contains(
clickedSlot
)
){

openAlbum();

}

return;

}

if(
movedX>=50&&
movedX>
movedY
){

move(
dx<0
?1
:-1
);

}

}
);

window.addEventListener(
"primeLanguageChanged",
()=>{

render();

}
);

document.addEventListener(
"keydown",
e=>{

if(
viewer.classList.contains(
"open"
)
){

if(
e.key==="Escape"
){

closeViewer(
true
);

}

if(
e.key==="ArrowLeft"
){

viewerMove(
-1
);

}

if(
e.key==="ArrowRight"
){

viewerMove(
1
);

}

return;

}

if(
album.classList.contains(
"open"
)&&
e.key==="Escape"
){

closeAlbum();

}

}
);

render();

}
);


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
]=
value
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
parseISO(
value
);

date.setDate(
date.getDate()+
days
);

return dateISO(
date
);

};

const todayISO=()=>
dateISO(
new Date()
);

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

BARONTINI_RATES[
date
]=
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
date=addDays(
date,
1
)
){

setRate(
date,
price
);

}

};

setRate("2026-09-13",99);
setRate("2026-09-14",99);
setRate("2026-09-15",99);
setRate("2026-09-19",150);
setRate("2026-09-20",175);
setRate("2026-09-23",230);
setRate("2026-09-24",230);
setRate("2026-09-29",130);
setRate("2026-09-30",130);

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

for(
let date="2027-02-01";
date<="2027-02-28";
date=addDays(
date,
1
)
){

const weekday=
parseISO(
date
)
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

GASTONE_RATES[
date
]=
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
date=addDays(
date,
1
)
){

setGastoneRate(
date,
price
);

}

};

setGastoneRange(
"2026-09-27",
"2026-09-28",
120
);

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

for(
let date="2026-12-01";
date<="2026-12-31";
date=addDays(
date,
1
)
){

const weekday=
parseISO(
date
)
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

if(guests<=2){
return 1;
}

if(guests===3){
return 1.30;
}

if(guests===4){
return 1.35;
}

if(guests===5){
return 1.40;
}

if(guests===6){
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

function isRateBlocked(day){

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

if(nights<2){
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
day=addDays(
day,
1
)
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

return{

price:
basePrice*
guestMultiplier(
guests
),

nights,

guests

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
Number.isInteger(
value
)
?0
:2,
maximumFractionDigits:2
}
)
.format(
value
);

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

if(estimatedTotalInput){

estimatedTotalInput.value=
"";

}

return;

}

stayPriceBanner.classList.add(
"visible"
);

if(stayPriceTotal){

stayPriceTotal.textContent=
formatPrice(
result.price
);

}

if(stayPriceMeta){

stayPriceMeta.textContent=
primeLanguage==="it"
?`${result.nights} notti · ${result.guests} ospiti`
:`${result.nights} nights · ${result.guests} guests`;

}

if(requestBookingButton){

requestBookingButton.textContent=
primeTranslate(
"REQUEST TO BOOK →"
);

}

if(estimatedTotalInput){

estimatedTotalInput.value=
String(
Math.round(
result.price*
100
)/
100
);

}

}


/* =========================================================
   11. AVAILABILITY
========================================================= */

function isBooked(day){

if(
isRateBlocked(
day
)
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

function isPast(day){

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
day=addDays(
day,
1
)
){

if(
isBooked(
day
)
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
primeTranslate(
text
);

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
primeTranslate(
text
);

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

checkinInput.value=
"";

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
)
.getDate();

const leading=
(
firstDay.getDay()+
6
)%
7;

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
]=
selectionBounds();

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
isBooked(
iso
);

const past=
isPast(
iso
);

button.type=
"button";

button.className=
"booking-calendar-day";

button.dataset.date=
iso;

button.textContent=
String(
day
);

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

calendarGrid.appendChild(
button
);

}

}


/* =========================================================
   14. DAY CLICK
========================================================= */

function handleDayClick(day){

clearCalendarMessage();

if(
isPast(
day
)
){
return;
}

if(
!selectedStart||
selectedEnd
){

if(
isBooked(
day
)
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
day===
selectedStart
){

clearStay();

return;

}

if(
day<
selectedStart
){

if(
isBooked(
day
)
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

calendarEvents=
[];

clearStay(
false
);

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

console.error(
"Availability error:",
error
);

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
   16. SELECT RESIDENCE
========================================================= */

function selectResidence(card){

bookingCards.forEach(
item=>{

item.classList.remove(
"selected"
);

}
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
   19. BOOKING FORM
========================================================= */

function showMessage(
text,
type
){

if(!bookingMessage){
return;
}

bookingMessage.textContent=
primeTranslate(
text
);

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
const event
of events
){

for(
let day=selectedStart;
day<selectedEnd;
day=addDays(
day,
1
)
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
)
.entries()
);

const price=
calculateStayPrice();

if(price){

data.estimatedTotal=
Math.round(
price.price*
100
)/
100;

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
JSON.stringify(
data
)
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
   20. PRIME ASSISTANT — AUTO PROMPT AFTER 3 SECONDS
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

const residences={

gastone:{
name:"Gastone Rossi 12",
bedrooms:3,
bathrooms:2,
guests:6,
size:"98 m²",
address:"Via Gastone Rossi 12, Bologna",
checkin:"15:00–19:00",
checkout:"08:00–11:00"
},

barontini:{
name:"Barontini 8",
bedrooms:2,
bathrooms:1,
guests:6,
size:"75 m²",
address:"Via Ilio Barontini 8, Bologna",
checkin:"15:00–21:00",
checkout:"00:00–11:00"
}

};

function isItalian(text){

if(
primeLanguage===
"it"
){
return true;
}

const q=
String(
text||
""
)
.toLowerCase();

return[
"ciao",
"salve",
"buongiorno",
"buonasera",
"cos'è",
"cosa è",
"appartamento",
"camere",
"bagni",
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
"contatt",
"disponibil"
]
.some(
w=>
q.includes(
w
)
);

}

function scrollMessages(){

if(messages){

requestAnimationFrame(
()=>{

messages.scrollTop=
messages.scrollHeight;

}
);

}

}

function addMessage(
text,
type="bot",
actions=[]
){

if(!messages){
return;
}

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

if(!prompt){
return;
}

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

if(!chatWindow){
return;
}

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

if(!chatWindow){
return;
}

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

}
);

}

if(prompt){

setTimeout(
showPrompt,
3000
);

}

function getResponse(original){

const question=
String(
original||
""
)
.toLowerCase()
.trim();

const italian=
isItalian(
original
);

const current=
residences[
page
]||
null;

const bookingAction=[
{
label:"BOOK YOUR STAY →",
href:"booking.html"
}
];

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
?"Prime Residence Bologna è una collezione di residence privati e raffinati pensati per vivere Bologna con il comfort e la libertà di una casa propria."
:"Prime Residence Bologna is a collection of refined private residences designed for guests who want to experience Bologna with the comfort and freedom of their own space.",

actions:[
{
label:"DISCOVER THE RESIDENCES →",
href:"index.html#residences"
}
]

};

}

if(
question.includes(
"which residences"
)||
question.includes(
"residences"
)||
(
question.includes(
"residence"
)&&
question.includes(
"which"
)
)
){

return{

text:
italian
?"Prime Residence Bologna propone Gastone Rossi 12, con 3 camere e 2 bagni, e Barontini 8, con 2 camere e 1 bagno. Entrambi possono ospitare fino a 6 persone."
:"Prime Residence Bologna offers Gastone Rossi 12, with 3 bedrooms and 2 bathrooms, and Barontini 8, with 2 bedrooms and 1 bathroom. Both accommodate up to 6 guests.",

actions:[
{
label:"GASTONE ROSSI 12 →",
href:"gastone-rossi-12.html"
},
{
label:"BARONTINI 8 →",
href:"barontini-8.html"
}
]

};

}

if(
question.includes(
"this residence"
)||
question.includes(
"residence-details"
)||
question.includes(
"apartment"
)
){

if(current){

return{

text:
italian
?`${current.name} dispone di ${current.bedrooms} camere, ${current.bathrooms} bagni e può ospitare fino a ${current.guests} persone.`
:`${current.name} has ${current.bedrooms} bedrooms, ${current.bathrooms} bathrooms and accommodates up to ${current.guests} guests.`,

actions:
bookingAction

};

}

}

if(
question.includes(
"difference"
)||
question.includes(
"compare"
)||
question.includes(
"differenza"
)||
question.includes(
"confront"
)
){

return{

text:
italian
?"Gastone Rossi 12 è più ampio, con 3 camere e 2 bagni. Barontini 8 dispone di 2 camere e 1 bagno. Entrambi ospitano fino a 6 persone."
:"Gastone Rossi 12 is larger, with 3 bedrooms and 2 bathrooms. Barontini 8 has 2 bedrooms and 1 bathroom. Both accommodate up to 6 guests.",

actions:[
{
label:"COMPARE RESIDENCES →",
href:"index.html#residences"
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
?"Puoi scegliere il residence, controllare la disponibilità sul calendario e inviare una richiesta dalla pagina Book Your Stay."
:"You can choose a residence, check real-time availability on the calendar and submit your request through the Book Your Stay page.",

actions:
bookingAction

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
?"Nella pagina Book Your Stay puoi vedere la disponibilità sul calendario e selezionare direttamente le date del soggiorno."
:"The Book Your Stay page displays real-time availability on the calendar so you can select your stay directly.",

actions:[
{
label:"CHECK AVAILABILITY →",
href:"booking.html"
}
]

};

}

if(
question.includes(
"check-in"
)||
question.includes(
"checkin"
)||
question.includes(
"arriv"
)
){

if(current){

return{

text:
italian
?`Per ${current.name}, il check-in è previsto ${current.checkin} e il check-out ${current.checkout}. Comunica in anticipo l'orario di arrivo.`
:`At ${current.name}, check-in is ${current.checkin} and check-out is ${current.checkout}. Please communicate your arrival time in advance.`,

actions:
bookingAction

};

}

return{

text:
italian
?"Gli orari cambiano in base al residence: Gastone Rossi 12, 15:00–19:00; Barontini 8, 15:00–21:00. Il check-out è entro le 11:00."
:"Check-in times depend on the residence: Gastone Rossi 12, 15:00–19:00; Barontini 8, 15:00–21:00. Check-out is by 11:00.",

actions:
bookingAction

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
)||
question.includes(
"indirizzo"
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

return{

text:
italian
?"I residence si trovano a Bologna. Puoi aprire le pagine delle singole strutture per vedere posizione e dintorni."
:"The residences are located in Bologna. Open each residence page to see its location and nearby places.",

actions:[
{
label:"DISCOVER THE RESIDENCES →",
href:"index.html#residences"
}
]

};

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
?"Posso aiutarti con informazioni sui residence, disponibilità, prenotazioni, check-in e posizione."
:"I can help with our residences, availability, booking, check-in and location.",

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

input.value=
"";

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

let question=
"";

switch(type){

case"about-prime":

question=
"What is Prime Residence Bologna?";

break;

case"residences":

question=
"Which residences do you have?";

break;

case"residence-details":

question=
"Tell me about this residence";

break;

case"compare":

question=
"What is the difference between the two apartments?";

break;

case"booking":

question=
"How can I book?";

break;

case"location":

question=
page==="gastone"
?"Where is Gastone Rossi 12?"
:page==="barontini"
?"Where is Barontini 8?"
:"Where are the residences?";

break;

case"checkin":

question=
"How does check-in work?";

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

const openAssistant=
document.querySelector(
".prime-assistant.chat-open"
);

if(openAssistant){

const win=
openAssistant.querySelector(
".prime-assistant-window"
);

const launcher=
openAssistant.querySelector(
".prime-assistant-launcher"
);

openAssistant.classList.remove(
"chat-open"
);

if(win){

win.classList.remove(
"open"
);

win.setAttribute(
"aria-hidden",
"true"
);

}

if(launcher){

launcher.setAttribute(
"aria-expanded",
"false"
);

}

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
