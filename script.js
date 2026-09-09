/* =========================================================
   PRIME RESIDENCE BOLOGNA
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

/* =========================================================
   01. PREMIUM INTRO
========================================================= */

const loader=document.querySelector(".loader"),hero=document.querySelector(".hero");

if(loader&&hero){
const INTRO_DURATION=2200;
let introFinished=false,introAnimating=false,startTime=null,touchStartY=0,mouseStartY=0,mouseCurrentY=0,mouseDragging=false;

document.body.style.overflow="hidden";
loader.style.transform="translate3d(0,0,0)";
loader.style.willChange="transform";

const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function finishIntro(){
introFinished=true;introAnimating=false;
loader.style.transform="translate3d(0,-100%,0)";
loader.classList.add("hide");
loader.classList.remove("mouse-dragging");
document.body.style.userSelect="";
document.body.style.overflow="";
}

function animate(now){
if(!startTime)startTime=now;
const progress=Math.min((now-startTime)/INTRO_DURATION,1);
loader.style.transform=`translate3d(0,${-ease(progress)*100}%,0)`;
progress<1?requestAnimationFrame(animate):finishIntro();
}

function startIntro(){
if(introFinished||introAnimating)return;
introAnimating=true;startTime=null;
window.dispatchEvent(new CustomEvent("primeIntroStarted"));
requestAnimationFrame(animate);
}

/* ROTELLA / TRACKPAD VERSO L'ALTO */
window.addEventListener("wheel",e=>{
if(introFinished)return;
e.preventDefault();
if(e.deltaY<0)startIntro();
},{passive:false});

/* TOUCH DAL BASSO VERSO L'ALTO */
window.addEventListener("touchstart",e=>{
if(introFinished||introAnimating)return;
touchStartY=e.touches[0].clientY;
},{passive:true});

window.addEventListener("touchmove",e=>{
if(introFinished||introAnimating)return;
if(touchStartY-e.touches[0].clientY>12){
e.preventDefault();
startIntro();
}
},{passive:false});

/* MOUSE DRAG DAL BASSO VERSO L'ALTO */
loader.addEventListener("mousedown",e=>{
if(introFinished||introAnimating||e.button!==0)return;
mouseDragging=true;
mouseStartY=e.clientY;
mouseCurrentY=e.clientY;
loader.classList.add("mouse-dragging");
document.body.style.userSelect="none";
});

window.addEventListener("mousemove",e=>{
if(!mouseDragging||introFinished||introAnimating)return;
mouseCurrentY=e.clientY;

if(mouseStartY-mouseCurrentY>=35){
mouseDragging=false;
loader.classList.remove("mouse-dragging");
document.body.style.userSelect="";
startIntro();
}
});

window.addEventListener("mouseup",e=>{
if(!mouseDragging)return;

mouseDragging=false;
mouseCurrentY=e.clientY;
loader.classList.remove("mouse-dragging");
document.body.style.userSelect="";

if(mouseStartY-mouseCurrentY>=35)startIntro();
});

loader.addEventListener("dragstart",e=>e.preventDefault());

window.addEventListener("keydown",e=>{
if(introFinished)return;

if(e.key==="ArrowUp"||e.key==="PageUp"){
e.preventDefault();
startIntro();
}
});
}

/* =========================================================
   02. NAVBAR
========================================================= */

const navbar=document.querySelector(".navbar");

function updateNavbar(){
if(!navbar)return;
window.scrollY>50
?navbar.classList.add("scrolled")
:navbar.classList.remove("scrolled");
}

updateNavbar();
window.addEventListener("scroll",updateNavbar,{passive:true});

/* =========================================================
   03. MOBILE MENU
========================================================= */

const menuToggle=document.querySelector(".menu-toggle"),mobileMenu=document.querySelector(".mobile-menu");

if(menuToggle&&mobileMenu){

menuToggle.setAttribute("aria-expanded","false");

menuToggle.addEventListener("click",()=>{

const open=menuToggle.classList.toggle("active");

mobileMenu.classList.toggle("active",open);

menuToggle.setAttribute(
"aria-expanded",
open?"true":"false"
);

document.body.style.overflow=
open?"hidden":"";

});

mobileMenu.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

menuToggle.classList.remove("active");
mobileMenu.classList.remove("active");
menuToggle.setAttribute("aria-expanded","false");
document.body.style.overflow="";

});

});

}

/* =========================================================
   04. REVEAL
========================================================= */

const revealElements=document.querySelectorAll(".reveal");

if(revealElements.length){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");
observer.unobserve(entry.target);

}

});

},{threshold:.12});

revealElements.forEach(el=>observer.observe(el));

}

/* =========================================================
   05. PREMIUM AUTOMATIC PAGE SCROLL

   RESIDENCES / EXPERIENCE / BOLOGNA
   E TUTTI GLI ANCORAGGI INTERNI

   NESSUN OVERLAY
   LA PAGINA SCORRE REALMENTE
========================================================= */

let premiumScrollAnimation=null;

function premiumEase(t){

return t<.5
?4*t*t*t
:1-Math.pow(-2*t+2,3)/2;

}

function premiumScrollTo(target,duration=1400){

if(!target)return;

/* FERMA EVENTUALE ANIMAZIONE PRECEDENTE */

if(premiumScrollAnimation){
cancelAnimationFrame(premiumScrollAnimation);
premiumScrollAnimation=null;
}

const navOffset=navbar?navbar.offsetHeight:0;

const startY=window.scrollY;

const targetY=Math.max(
0,
target.getBoundingClientRect().top+
window.scrollY-
navOffset
);

const distance=targetY-startY;

if(Math.abs(distance)<2)return;

let startTime=null;

function scrollFrame(time){

if(!startTime)startTime=time;

const elapsed=time-startTime;

const progress=Math.min(
elapsed/duration,
1
);

const eased=premiumEase(progress);

window.scrollTo(
0,
startY+(distance*eased)
);

if(progress<1){

premiumScrollAnimation=
requestAnimationFrame(scrollFrame);

}else{

premiumScrollAnimation=null;

window.scrollTo(
0,
targetY
);

}

}

premiumScrollAnimation=
requestAnimationFrame(scrollFrame);

}


/* INTERCETTA LINK INTERNI */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",e=>{

const id=link.getAttribute("href");

if(!id||id==="#")return;

const target=document.querySelector(id);

if(!target)return;

e.preventDefault();

/* CHIUDE MENU MOBILE SE APERTO */

if(
mobileMenu&&
mobileMenu.classList.contains("active")
){

mobileMenu.classList.remove("active");

if(menuToggle){

menuToggle.classList.remove("active");

menuToggle.setAttribute(
"aria-expanded",
"false"
);

}

document.body.style.overflow="";

}


/* PICCOLISSIMO RITARDO SOLO SE CHIUDE IL MENU */

setTimeout(
()=>premiumScrollTo(target,1400),
20
);

});

});


/* =========================================================
   06. APARTMENT GALLERY
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

let current=0,
autoplay=null,
touchStartX=0,
touchEndX=0,
mouseStartX=0,
mouseEndX=0,
dragging=false;

function showSlide(index){

if(index<0)index=slides.length-1;
if(index>=slides.length)index=0;

slides.forEach(
slide=>slide.classList.remove("active")
);

slides[index].classList.add("active");

current=index;

if(counter){

counter.textContent=
`${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;

}

}

const nextSlide=
()=>showSlide(current+1);

const previousSlide=
()=>showSlide(current-1);

function stopAutoplay(){

if(autoplay){

clearInterval(autoplay);
autoplay=null;

}

}

function startAutoplay(){

stopAutoplay();

autoplay=
setInterval(
nextSlide,
5000
);

}

function handleSwipe(start,end){

const d=start-end;

if(Math.abs(d)<45)return;

d>0
?nextSlide()
:previousSlide();

startAutoplay();

}

gallery.addEventListener(
"touchstart",
e=>touchStartX=e.touches[0].clientX,
{passive:true}
);

gallery.addEventListener(
"touchend",
e=>{

touchEndX=
e.changedTouches[0].clientX;

handleSwipe(
touchStartX,
touchEndX
);

},
{passive:true}
);

gallery.addEventListener(
"mousedown",
e=>{

dragging=true;
mouseStartX=e.clientX;
mouseEndX=e.clientX;

gallery.style.userSelect=
"none";

}
);

gallery.addEventListener(
"mousemove",
e=>{

if(dragging){
mouseEndX=e.clientX;
}

}
);

gallery.addEventListener(
"mouseup",
e=>{

if(!dragging)return;

dragging=false;

mouseEndX=e.clientX;

gallery.style.userSelect="";

handleSwipe(
mouseStartX,
mouseEndX
);

}
);

gallery.addEventListener(
"mouseleave",
()=>{

if(!dragging)return;

dragging=false;

gallery.style.userSelect="";

handleSwipe(
mouseStartX,
mouseEndX
);

}
);

showSlide(0);
startAutoplay();

});

/* =========================================================
   07. BOOKING CALENDAR
========================================================= */

const bookingCards=document.querySelectorAll(".booking-residence-card"),
bookingForm=document.querySelector("#bookingRequestForm"),
residenceInput=document.querySelector("#residence"),
calendarResidence=document.querySelector("#calendarResidence"),
checkinInput=document.querySelector("#checkin"),
checkoutInput=document.querySelector("#checkout"),
selectedResidenceText=document.querySelector("#selectedResidenceText"),
bookingFormSection=document.querySelector("#booking-form-section"),
bookingMessage=document.querySelector("#bookingMessage"),
bookingSubmit=document.querySelector(".booking-submit"),

primeCalendar=document.querySelector("#primeCalendar"),
calendarGrid=document.querySelector("#calendarGrid"),
calendarMonthLabel=document.querySelector("#calendarMonthLabel"),
calendarPrev=document.querySelector("#calendarPrev"),
calendarNext=document.querySelector("#calendarNext"),
calendarResidenceTitle=document.querySelector("#calendarResidenceTitle"),
calendarLiveStatus=document.querySelector("#calendarLiveStatus"),
calendarLiveText=document.querySelector("#calendarLiveText"),
calendarLoadingMessage=document.querySelector("#calendarLoadingMessage"),
calendarMessage=document.querySelector("#calendarMessage"),

selectedStay=document.querySelector("#selectedStay"),
selectedStayResidence=document.querySelector("#selectedStayResidence"),
selectedStayCheckin=document.querySelector("#selectedStayCheckin"),
selectedStayCheckout=document.querySelector("#selectedStayCheckout"),
selectedStayNights=document.querySelector("#selectedStayNights"),
selectedStayClear=document.querySelector("#selectedStayClear");

let calendarEvents=[],
selectedStart="",
selectedEnd="",
previewEnd="",
calendarLoaded=false,
currentCalendarKey="",
calendarRequestId=0;

let dragActive=false,
dragStart="",
dragMoved=false,
suppressClick=false;

const todayISO=()=>{

const d=new Date();

return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

};

const parseISO=value=>{

const[y,m,d]=
value.split("-").map(Number);

return new Date(
y,
m-1,
d
);

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
"en-GB",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)
.toUpperCase();

const nightsBetween=(start,end)=>
Math.round(
(parseISO(end)-parseISO(start))
/86400000
);

let displayMonth=new Date();

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
!rangeHasConflict(start,end)
);

}

function clearCalendarMessage(){

if(!calendarMessage)return;

calendarMessage.className=
"calendar-message";

calendarMessage.textContent="";

}

function showCalendarMessage(
text,
type="info"
){

if(!calendarMessage)return;

calendarMessage.textContent=
text;

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
text;

}

function unlockSubmit(){

if(!bookingSubmit)return;

bookingSubmit.disabled=false;

bookingSubmit.classList.remove(
"availability-locked"
);

bookingSubmit.textContent=
"Send Booking Request";

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
prettyDate(selectedStart);

}

if(selectedStayCheckout){

selectedStayCheckout.textContent=
prettyDate(selectedEnd);

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
){
return;
}

calendarGrid.innerHTML="";

calendarMonthLabel.textContent=
displayMonth.toLocaleDateString(
"en-GB",
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
new Date(y,m,1);

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
displayMonth<=currentMonth;

}

for(
let i=0;
i<leading;
i++
){

const empty=
document.createElement("div");

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
`${prettyDate(iso)} ${booked?"fully booked":"available"}`
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
()=>handleDayClick(iso)
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
   CLICK CALENDAR
========================================================= */

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


/* RANGE GIÀ COMPLETATO */

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


/* STESSO GIORNO */

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


/* SECONDO CLICK */

if(
day>selectedStart
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
e=>{

if(!dragActive)return;

const cell=
e.target.closest(
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

if(day===dragStart){
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


/* SEMPLICE CLICK:
   NON RIDISEGNARE QUI */

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
"LOADING";

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
){
return;
}

calendarLoaded=false;

if(calendarLiveText){

calendarLiveText.textContent=
"UNAVAILABLE";

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

loadCalendar(
calendar,
residence
);

if(bookingFormSection){

bookingFormSection.scrollIntoView({
behavior:"smooth"
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
e=>{

if(
e.key==="Enter"||
e.key===" "
){

e.preventDefault();

selectResidence(card);

}

}
);

});

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
   FORM MESSAGE
========================================================= */

function showMessage(
text,
type
){

if(!bookingMessage)return;

bookingMessage.textContent=
text;

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
   FINAL AVAILABILITY CHECK
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
   BOOKING SUBMIT
========================================================= */

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
   08. PRIME ASSISTANT
========================================================= */

const assistant=
document.querySelector(
".prime-assistant"
);

if(assistant){

const page=
assistant.dataset.assistantPage||
"home",

launcher=
assistant.querySelector(
".prime-assistant-launcher"
),

chatWindow=
assistant.querySelector(
".prime-assistant-window"
),

closeChat=
assistant.querySelector(
".prime-assistant-close"
),

prompt=
assistant.querySelector(
".prime-assistant-prompt"
),

promptMain=
assistant.querySelector(
".assistant-prompt-main"
),

promptClose=
assistant.querySelector(
".assistant-prompt-close"
),

messages=
assistant.querySelector(
".prime-assistant-messages"
),

form=
assistant.querySelector(
".prime-assistant-form"
),

input=
assistant.querySelector(
".prime-assistant-input"
),

suggestionButtons=
assistant.querySelectorAll(
".assistant-suggestion"
),

promptStorageKey=
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
document.createElement("div"),

label=
document.createElement("span"),

p=
document.createElement("p");

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
document.createElement("a");

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

wrap.appendChild(a);

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

if(page==="home"){

let homePromptScheduled=
false;

window.addEventListener(
"primeIntroStarted",
()=>{

if(homePromptScheduled){
return;
}

homePromptScheduled=
true;

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
original.toLowerCase().trim(),

italian=
isItalian(original),

current=
residences[page]||
null,

actions=[];

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
"DISCOVER THE RESIDENCES →",
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
?"Puoi scegliere il residence, controllare la disponibilità sul calendario e inviare una richiesta tramite la pagina Book Your Stay."
:"You can choose a residence, check real-time availability on the calendar and submit your request through the Book Your Stay page.",

actions:[
{
label:
"BOOK YOUR STAY →",
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
?"Nella pagina Book Your Stay puoi vedere la disponibilità sul calendario e selezionare direttamente le date del soggiorno."
:"The Book Your Stay page displays real-time availability on the calendar so you can select your stay directly.",

actions:[
{
label:
"CHECK AVAILABILITY →",
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

let target=current;

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
button=>
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

default:
question=type;

}

processQuestion(
question
);

}
)
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
