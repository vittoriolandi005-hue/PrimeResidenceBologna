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

window.addEventListener("wheel",e=>{
if(introFinished)return;
e.preventDefault();
if(e.deltaY<0)startIntro();
},{passive:false});

window.addEventListener("touchstart",e=>{
if(introFinished||introAnimating)return;
touchStartY=e.touches[0].clientY;
},{passive:true});

window.addEventListener("touchmove",e=>{
if(introFinished||introAnimating)return;
if(touchStartY-e.touches[0].clientY>12){e.preventDefault();startIntro();}
},{passive:false});

loader.addEventListener("mousedown",e=>{
if(introFinished||introAnimating||e.button!==0)return;
mouseDragging=true;mouseStartY=e.clientY;mouseCurrentY=e.clientY;
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
mouseDragging=false;mouseCurrentY=e.clientY;
loader.classList.remove("mouse-dragging");
document.body.style.userSelect="";
if(mouseStartY-mouseCurrentY>=35)startIntro();
});

loader.addEventListener("dragstart",e=>e.preventDefault());

window.addEventListener("keydown",e=>{
if(introFinished)return;
if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();startIntro();}
});
}

/* =========================================================
   02. NAVBAR
========================================================= */

const navbar=document.querySelector(".navbar");

function updateNavbar(){
if(!navbar)return;
window.scrollY>50?navbar.classList.add("scrolled"):navbar.classList.remove("scrolled");
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
menuToggle.setAttribute("aria-expanded",open?"true":"false");
document.body.style.overflow=open?"hidden":"";
});

mobileMenu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
menuToggle.classList.remove("active");
mobileMenu.classList.remove("active");
menuToggle.setAttribute("aria-expanded","false");
document.body.style.overflow="";
}));
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
   05. SMOOTH ANCHORS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener("click",e=>{
const id=link.getAttribute("href");
if(!id||id==="#")return;
const target=document.querySelector(id);
if(!target)return;
e.preventDefault();
const offset=navbar?navbar.offsetHeight:0;
window.scrollTo({top:target.offsetTop-offset,behavior:"smooth"});
});
});

/* =========================================================
   06. APARTMENT GALLERY
========================================================= */

document.querySelectorAll(".apartment-gallery").forEach(gallery=>{
const slides=[...gallery.querySelectorAll(".apartment-slide")];
if(slides.length<2)return;

const section=gallery.closest(".apartment-gallery-section"),counter=section?section.querySelector(".apartment-gallery-counter"):null;
let current=0,autoplay=null,touchStartX=0,touchEndX=0,mouseStartX=0,mouseEndX=0,dragging=false;

function showSlide(index){
if(index<0)index=slides.length-1;
if(index>=slides.length)index=0;
slides.forEach(slide=>slide.classList.remove("active"));
slides[index].classList.add("active");
current=index;
if(counter)counter.textContent=`${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
}

const nextSlide=()=>showSlide(current+1),previousSlide=()=>showSlide(current-1);
function stopAutoplay(){if(autoplay){clearInterval(autoplay);autoplay=null;}}
function startAutoplay(){stopAutoplay();autoplay=setInterval(nextSlide,5000);}
function handleSwipe(start,end){const diff=start-end;if(Math.abs(diff)<45)return;diff>0?nextSlide():previousSlide();startAutoplay();}

gallery.addEventListener("touchstart",e=>touchStartX=e.touches[0].clientX,{passive:true});
gallery.addEventListener("touchend",e=>{touchEndX=e.changedTouches[0].clientX;handleSwipe(touchStartX,touchEndX);},{passive:true});

gallery.addEventListener("mousedown",e=>{dragging=true;mouseStartX=e.clientX;mouseEndX=e.clientX;gallery.style.userSelect="none";});
gallery.addEventListener("mousemove",e=>{if(dragging)mouseEndX=e.clientX;});

gallery.addEventListener("mouseup",e=>{
if(!dragging)return;
dragging=false;mouseEndX=e.clientX;gallery.style.userSelect="";
handleSwipe(mouseStartX,mouseEndX);
});

gallery.addEventListener("mouseleave",()=>{
if(!dragging)return;
dragging=false;gallery.style.userSelect="";
handleSwipe(mouseStartX,mouseEndX);
});

showSlide(0);startAutoplay();
});

/* =========================================================
   07. BOOKING + LIVE CALENDAR AVAILABILITY
========================================================= */

const bookingCards=document.querySelectorAll(".booking-residence-card"),
bookingForm=document.querySelector("#bookingRequestForm"),
residenceInput=document.querySelector("#residence"),
calendarResidence=document.querySelector("#calendarResidence"),
selectedResidenceText=document.querySelector("#selectedResidenceText"),
bookingFormSection=document.querySelector("#booking-form-section"),
checkinInput=document.querySelector("#checkin"),
checkoutInput=document.querySelector("#checkout"),
guestsInput=document.querySelector("#guests"),
bookingMessage=document.querySelector("#bookingMessage"),
bookingSubmit=document.querySelector(".booking-submit"),
availabilityBox=document.querySelector("#availabilityCheck"),
availabilityStatusText=document.querySelector("#availabilityStatusText"),
availabilityTitle=document.querySelector("#availabilityTitle"),
availabilityDescription=document.querySelector("#availabilityDescription"),
availabilityResidence=document.querySelector("#availabilityResidence"),
availabilityDates=document.querySelector("#availabilityDates"),
availabilityNights=document.querySelector("#availabilityNights");

let availabilityVerified=false,availabilityIsAvailable=false,availabilityRequestId=0;

function localToday(){
const d=new Date(),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");
return `${y}-${m}-${day}`;
}

function parseDateOnly(value){
const [y,m,d]=value.split("-").map(Number);
return new Date(y,m-1,d);
}

function nightsBetween(start,end){
return Math.round((parseDateOnly(end)-parseDateOnly(start))/86400000);
}

function prettyDate(value){
return parseDateOnly(value).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase();
}

function setSubmitLocked(text="Select Dates First"){
if(!bookingSubmit)return;
bookingSubmit.disabled=true;
bookingSubmit.classList.add("availability-locked");
bookingSubmit.textContent=text;
}

function setSubmitReady(){
if(!bookingSubmit)return;
bookingSubmit.disabled=false;
bookingSubmit.classList.remove("availability-locked");
bookingSubmit.textContent="Send Booking Request";
}

function setAvailabilityState(state,status,title,description){
if(!availabilityBox)return;
availabilityBox.classList.remove("checking","available","unavailable","error");
if(state)availabilityBox.classList.add(state);
if(availabilityStatusText)availabilityStatusText.textContent=status;
if(availabilityTitle)availabilityTitle.textContent=title;
if(availabilityDescription)availabilityDescription.textContent=description;
}

function resetAvailability(){
availabilityRequestId++;
availabilityVerified=false;
availabilityIsAvailable=false;
setSubmitLocked();

if(availabilityResidence)availabilityResidence.textContent="—";
if(availabilityDates)availabilityDates.textContent="—";
if(availabilityNights)availabilityNights.textContent="—";

setAvailabilityState(
"",
"WAITING FOR DATES",
"Select a residence and your dates.",
"We will compare your selected stay with the current Booking.com calendar before the request can be sent."
);
}

function stayOverlapsEvent(checkin,checkout,eventStart,eventEnd){
return checkin<eventEnd&&checkout>eventStart;
}

async function checkAvailability(){
if(!bookingForm||!residenceInput||!calendarResidence||!checkinInput||!checkoutInput)return;

const residence=residenceInput.value.trim();
const calendar=calendarResidence.value.trim();
const checkin=checkinInput.value;
const checkout=checkoutInput.value;

availabilityVerified=false;
availabilityIsAvailable=false;
setSubmitLocked("Checking Availability...");

if(!residence||!calendar){
setAvailabilityState("","SELECT RESIDENCE","Select a residence first.","Choose Gastone Rossi 12 or Barontini 8 before selecting your stay.");
setSubmitLocked("Select Residence First");
return;
}

if(!checkin||!checkout){
setAvailabilityState("","WAITING FOR DATES",residence,"Choose both check-in and check-out to verify calendar availability.");
setSubmitLocked("Select Dates First");
return;
}

if(checkout<=checkin){
setAvailabilityState("error","INVALID DATES","Check-out must be after check-in.","Please choose a check-out date later than your check-in date.");
setSubmitLocked("Check Your Dates");
return;
}

const requestId=++availabilityRequestId;

setAvailabilityState(
"checking",
"CHECKING",
"Checking current availability...",
"Please wait while we compare your dates with the latest calendar data."
);

try{
const response=await fetch(`/api/availability?residence=${encodeURIComponent(calendar)}`,{cache:"no-store"});
const result=await response.json();

if(requestId!==availabilityRequestId)return;
if(!response.ok||!result.success)throw new Error(result.error||"Unable to retrieve calendar.");

const selectedStart=checkin;
const selectedEnd=checkout;

const conflict=(Array.isArray(result.events)?result.events:[]).some(event=>{
if(!event.start||!event.end)return false;
return stayOverlapsEvent(selectedStart,selectedEnd,event.start,event.end);
});

availabilityVerified=true;
availabilityIsAvailable=!conflict;

if(conflict){
setAvailabilityState(
"unavailable",
"NOT AVAILABLE",
`${residence} is not available for these dates.`,
"Part of the selected stay overlaps with an unavailable period. Please choose different dates."
);
setSubmitLocked("Dates Not Available");
return;
}

const nights=nightsBetween(checkin,checkout);

if(availabilityResidence)availabilityResidence.textContent=residence;
if(availabilityDates)availabilityDates.textContent=`${prettyDate(checkin)} — ${prettyDate(checkout)}`;
if(availabilityNights)availabilityNights.textContent=String(nights);

setAvailabilityState(
"available",
"AVAILABLE",
`${residence} is currently available.`,
"Your selected dates do not overlap with any unavailable period currently reported by the Booking.com calendar. Final confirmation is still required."
);

setSubmitReady();

}catch(error){
if(requestId!==availabilityRequestId)return;

availabilityVerified=false;
availabilityIsAvailable=false;

setAvailabilityState(
"error",
"UNABLE TO CHECK",
"We could not verify availability right now.",
"Please try again in a moment. The booking request cannot be sent until the calendar check succeeds."
);

setSubmitLocked("Availability Unavailable");
}
}

let availabilityTimer=null;

function scheduleAvailabilityCheck(){
availabilityVerified=false;
availabilityIsAvailable=false;
setSubmitLocked();

clearTimeout(availabilityTimer);
availabilityTimer=setTimeout(checkAvailability,250);
}

if(checkinInput)checkinInput.min=localToday();
if(checkoutInput)checkoutInput.min=localToday();

if(checkinInput&&checkoutInput){
checkinInput.addEventListener("change",()=>{
checkoutInput.min=checkinInput.value||localToday();
if(checkoutInput.value&&checkoutInput.value<=checkinInput.value)checkoutInput.value="";
scheduleAvailabilityCheck();
});

checkoutInput.addEventListener("change",scheduleAvailabilityCheck);
}

if(guestsInput)guestsInput.addEventListener("change",()=>{
/* Guests do not change iCal availability, so no new calendar fetch is required. */
});

function selectResidence(card){
bookingCards.forEach(c=>c.classList.remove("selected"));
card.classList.add("selected");

if(residenceInput)residenceInput.value=card.dataset.residence||"";
if(calendarResidence)calendarResidence.value=card.dataset.calendar||"";
if(selectedResidenceText)selectedResidenceText.textContent=card.dataset.residence||"";

resetAvailability();

if(checkinInput&&checkoutInput&&checkinInput.value&&checkoutInput.value)scheduleAvailabilityCheck();

if(bookingFormSection)bookingFormSection.scrollIntoView({behavior:"smooth"});
}

bookingCards.forEach(card=>{
card.addEventListener("click",()=>selectResidence(card));

card.addEventListener("keydown",e=>{
if(e.key==="Enter"||e.key===" "){
e.preventDefault();
selectResidence(card);
}
});
});

function showMessage(text,type){
if(!bookingMessage)return;
bookingMessage.textContent=text;
bookingMessage.className=`booking-message ${type}`;
bookingMessage.style.display="block";
}

function hideMessage(){
if(bookingMessage)bookingMessage.style.display="none";
}

if(bookingForm){
resetAvailability();

bookingForm.addEventListener("submit",async e=>{
e.preventDefault();
hideMessage();

if(!residenceInput||!residenceInput.value){
showMessage("Please select a residence first.","error");
return;
}

if(!checkinInput.value||!checkoutInput.value){
showMessage("Please select your dates.","error");
return;
}

if(checkoutInput.value<=checkinInput.value){
showMessage("Check-out must be after check-in.","error");
return;
}

if(!availabilityVerified){
showMessage("Please wait until availability has been checked.","error");
scheduleAvailabilityCheck();
return;
}

if(!availabilityIsAvailable){
showMessage("The selected residence is not available for these dates.","error");
return;
}

/* RICONTROLLO FINALE SUBITO PRIMA DELL'INVIO */
setSubmitLocked("Rechecking...");

try{
await checkAvailability();

if(!availabilityVerified||!availabilityIsAvailable){
showMessage("Availability has changed or could not be confirmed. Please review your dates.","error");
return;
}
}catch{
showMessage("Unable to verify availability right now. Please try again.","error");
return;
}

const privacy=document.querySelector("#privacy");

if(privacy&&!privacy.checked){
showMessage("Please accept the privacy policy.","error");
setSubmitReady();
return;
}

setSubmitLocked("Sending...");

const data=Object.fromEntries(new FormData(bookingForm).entries());

try{
const response=await fetch("/api/booking-request",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

const result=await response.json();

if(!response.ok)throw new Error(result.message||"Unable to send request.");

showMessage(result.message||"Booking request sent successfully.","success");

const selectedResidence=residenceInput.value;
const selectedCalendar=calendarResidence.value;

bookingForm.reset();

residenceInput.value=selectedResidence;
calendarResidence.value=selectedCalendar;

if(selectedResidenceText)selectedResidenceText.textContent=selectedResidence;

if(checkinInput)checkinInput.min=localToday();
if(checkoutInput)checkoutInput.min=localToday();

resetAvailability();

}catch(err){
showMessage(err.message||"Unable to send request.","error");

if(availabilityVerified&&availabilityIsAvailable)setSubmitReady();
else setSubmitLocked();
}
});
}

/* =========================================================
   08. PRIME ASSISTANT
========================================================= */

const assistant=document.querySelector(".prime-assistant");

if(assistant){
const page=assistant.dataset.assistantPage||"home",
launcher=assistant.querySelector(".prime-assistant-launcher"),
chatWindow=assistant.querySelector(".prime-assistant-window"),
closeChat=assistant.querySelector(".prime-assistant-close"),
prompt=assistant.querySelector(".prime-assistant-prompt"),
promptMain=assistant.querySelector(".assistant-prompt-main"),
promptClose=assistant.querySelector(".assistant-prompt-close"),
messages=assistant.querySelector(".prime-assistant-messages"),
form=assistant.querySelector(".prime-assistant-form"),
input=assistant.querySelector(".prime-assistant-input"),
suggestionButtons=assistant.querySelectorAll(".assistant-suggestion"),
promptStorageKey=`primeAssistantPromptClosed_${page}`;

const residences={
gastone:{name:"Gastone Rossi 12",bedrooms:3,bathrooms:2,guests:6,address:"Via Gastone Rossi 12, Bologna",description:"Gastone Rossi 12 is a spacious residence in Bologna with 3 bedrooms, 2 bathrooms and space for up to 6 guests."},
barontini:{name:"Barontini 8",bedrooms:2,bathrooms:1,guests:6,address:"Via Barontini 8, Bologna",description:"Barontini 8 is a refined two-bedroom residence in Bologna with 1 bathroom and space for up to 6 guests."}
};

function isItalian(text){
const q=text.toLowerCase();
return["ciao","salve","buongiorno","buonasera","cos'è","cosa è","che cos","appartamento","camere","camera","bagni","bagno","ospiti","prenot","prezzo","quanto","dove","indirizzo","parcheggio","animali","famiglia","persone","grazie","contatt"].some(w=>q.includes(w));
}

function scrollMessages(){if(messages)requestAnimationFrame(()=>messages.scrollTop=messages.scrollHeight);}

function addMessage(text,type="bot",actions=[]){
if(!messages)return;

const wrap=document.createElement("div"),label=document.createElement("span"),p=document.createElement("p");

wrap.className=`assistant-message assistant-message-${type}`;
label.className="assistant-message-label";
label.textContent=type==="user"?"YOU":"PRIME ASSISTANT";
p.textContent=text;

wrap.append(label,p);

actions.forEach(action=>{
const a=document.createElement("a");
a.href=action.href;
a.textContent=action.label;

if(action.external){
a.target="_blank";
a.rel="noopener noreferrer";
}

wrap.appendChild(a);
});

messages.appendChild(wrap);
scrollMessages();
}

function hidePrompt(){
if(!prompt)return;
prompt.classList.remove("visible");
prompt.setAttribute("aria-hidden","true");
}

function showPrompt(){
if(!prompt||assistant.classList.contains("chat-open"))return;
prompt.classList.add("visible");
prompt.setAttribute("aria-hidden","false");
}

function openChat(){
if(!chatWindow)return;

hidePrompt();

assistant.classList.add("chat-open");
chatWindow.classList.add("open");
chatWindow.setAttribute("aria-hidden","false");

if(launcher)launcher.setAttribute("aria-expanded","true");

setTimeout(()=>input&&input.focus(),250);
}

function closeAssistant(){
if(!chatWindow)return;

assistant.classList.remove("chat-open");
chatWindow.classList.remove("open");
chatWindow.setAttribute("aria-hidden","true");

if(launcher)launcher.setAttribute("aria-expanded","false");
}

if(launcher)launcher.addEventListener("click",openChat);
if(closeChat)closeChat.addEventListener("click",closeAssistant);
if(promptMain)promptMain.addEventListener("click",openChat);

if(promptClose){
promptClose.addEventListener("click",e=>{
e.stopPropagation();
hidePrompt();
try{sessionStorage.setItem(promptStorageKey,"1");}catch{}
});
}

let promptClosed=false;
try{promptClosed=sessionStorage.getItem(promptStorageKey)==="1";}catch{}

if(prompt&&!promptClosed){
if(page==="home"){
let homePromptScheduled=false;

window.addEventListener("primeIntroStarted",()=>{
if(homePromptScheduled)return;
homePromptScheduled=true;
setTimeout(showPrompt,4000);
},{once:true});

}else{
setTimeout(showPrompt,2500);
}
}

function getResponse(original){
const question=original.toLowerCase().trim(),italian=isItalian(original),current=residences[page]||null,actions=[];

if(question.includes("about-prime")||question.includes("what is prime")||question.includes("what's prime")||question.includes("tell me about prime")||question.includes("what do you offer")||question.includes("who are you")||question.includes("cos'è prime")||question.includes("cosa è prime")||question.includes("che cos'è prime")){
return{text:italian?"Prime Residence Bologna è una collezione di residence privati e raffinati pensati per chi desidera vivere Bologna con il comfort, la privacy e la libertà di una casa propria. Le nostre strutture combinano spazi contemporanei, posizioni selezionate e assistenza diretta durante il soggiorno.":"Prime Residence Bologna is a collection of refined private residences designed for guests who want to experience Bologna with the comfort, privacy and freedom of their own space. Our residences combine contemporary living, carefully selected locations and direct assistance throughout your stay.",actions:[{label:italian?"SCOPRI I RESIDENCE →":"DISCOVER THE RESIDENCES →",href:"index.html#residences"}]};
}

if(/^(hi|hello|hey|ciao|salve|buongiorno|buonasera)\b/.test(question)){
return{text:italian?"Benvenuto a Prime Residence Bologna. Posso aiutarti con i residence, la prenotazione, la posizione e le informazioni sul soggiorno.":"Welcome to Prime Residence Bologna. I can help with our residences, booking, location and information about your stay.",actions};
}

if(question.includes("thank")||question.includes("grazie")){
return{text:italian?"È un piacere. Se vuoi sapere altro su Prime Residence Bologna, chiedimi pure.":"You're very welcome. If there's anything else you'd like to know about Prime Residence Bologna, just ask.",actions};
}

if(question.includes("which residences")||question.includes("what residences")||question.includes("the residences")||question.includes("quali appartamenti")||question.includes("quali residence")){
return{text:italian?"Prime Residence Bologna dispone di due residence: Gastone Rossi 12 e Barontini 8. Posso aiutarti anche a confrontarli.":"Prime Residence Bologna currently offers two residences: Gastone Rossi 12 and Barontini 8. I can also help you compare them.",actions};
}

if(current&&(question.includes("residence-details")||question.includes("this residence")||question.includes("this apartment")||question.includes("questo appartamento")||question.includes("questa struttura"))){
return{text:italian?`${current.name} dispone di ${current.bedrooms} camere da letto, ${current.bathrooms} ${current.bathrooms===1?"bagno":"bagni"} e può ospitare fino a ${current.guests} persone.`:`${current.name} has ${current.bedrooms} bedrooms, ${current.bathrooms} ${current.bathrooms===1?"bathroom":"bathrooms"} and can accommodate up to ${current.guests} guests.`,actions};
}

if(question.includes("bedroom")||question.includes("camera")||question.includes("camere")){
let target=current;
if(question.includes("gastone"))target=residences.gastone;
if(question.includes("barontini"))target=residences.barontini;

if(target)return{text:italian?`${target.name} dispone di ${target.bedrooms} camere da letto.`:`${target.name} has ${target.bedrooms} bedrooms.`,actions};

return{text:italian?"Gastone Rossi 12 dispone di 3 camere da letto, mentre Barontini 8 ne dispone di 2.":"Gastone Rossi 12 has 3 bedrooms, while Barontini 8 has 2.",actions};
}

if(question.includes("bathroom")||question.includes("bagno")||question.includes("bagni")){
let target=current;
if(question.includes("gastone"))target=residences.gastone;
if(question.includes("barontini"))target=residences.barontini;

if(target)return{text:italian?`${target.name} dispone di ${target.bathrooms} ${target.bathrooms===1?"bagno":"bagni"}.`:`${target.name} has ${target.bathrooms} ${target.bathrooms===1?"bathroom":"bathrooms"}.`,actions};

return{text:italian?"Gastone Rossi 12 dispone di 2 bagni, mentre Barontini 8 dispone di 1 bagno.":"Gastone Rossi 12 has 2 bathrooms, while Barontini 8 has 1.",actions};
}

if(question.includes("guest")||question.includes("ospiti")||question.includes("persone")||question.includes("people")){
if(current)return{text:italian?`${current.name} può ospitare fino a ${current.guests} persone.`:`${current.name} can accommodate up to ${current.guests} guests.`,actions};

return{text:italian?"Entrambi i residence Prime Residence possono ospitare fino a 6 persone.":"Both Prime Residence apartments can accommodate up to 6 guests.",actions};
}

if(question.includes("compare")||question.includes("difference")||question.includes("which is better")||question.includes("differenza")||question.includes("quale scegliere")){
return{text:italian?"Gastone Rossi 12 offre 3 camere da letto e 2 bagni, mentre Barontini 8 offre 2 camere da letto e 1 bagno. Entrambi possono ospitare fino a 6 persone. Se desideri più camere separate e un bagno aggiuntivo, Gastone Rossi 12 può essere la soluzione più comoda.":"Gastone Rossi 12 offers 3 bedrooms and 2 bathrooms, while Barontini 8 offers 2 bedrooms and 1 bathroom. Both accommodate up to 6 guests. If you prefer more separate bedrooms and an additional bathroom, Gastone Rossi 12 may be the more convenient choice.",actions};
}

if(question.includes("location")||question.includes("address")||question.includes("where")||question.includes("dove")||question.includes("indirizzo")){
let target=current;
if(question.includes("gastone"))target=residences.gastone;
if(question.includes("barontini"))target=residences.barontini;

if(target)return{text:italian?`${target.name} si trova in ${target.address}. Nella pagina del residence trovi anche la mappa interattiva.`:`${target.name} is located at ${target.address}. The residence page also includes an interactive map.`,actions};

return{text:italian?"Entrambi i Prime Residence si trovano a Bologna: Gastone Rossi 12 in Via Gastone Rossi 12 e Barontini 8 in Via Barontini 8.":"Both Prime Residence properties are located in Bologna: Gastone Rossi 12 at Via Gastone Rossi 12 and Barontini 8 at Via Barontini 8.",actions};
}

if(question.includes("booking")||question.includes("book")||question.includes("reserve")||question.includes("prenot")){
return{text:italian?"Puoi inviare una richiesta direttamente tramite la pagina Book Your Stay scegliendo il residence, le date e inserendo i tuoi dati. La richiesta non costituisce una conferma automatica.":"You can submit a request directly through the Book Your Stay page by selecting the residence, dates and entering your details. A request is not an automatic booking confirmation.",actions:[{label:"BOOK YOUR STAY →",href:"booking.html"}]};
}

if(question.includes("available")||question.includes("availability")||question.includes("disponibil")){
return{text:italian?"La disponibilità dipende dalle date richieste. Nella pagina Book Your Stay puoi selezionare residence e date per controllare il calendario corrente prima di inviare la richiesta.":"Availability depends on your requested dates. On the Book Your Stay page you can select a residence and dates to check the current calendar before submitting your request.",actions:[{label:"CHECK AVAILABILITY →",href:"booking.html"}]};
}

if(question.includes("price")||question.includes("cost")||question.includes("prezzo")||question.includes("quanto costa")){
return{text:italian?"Le tariffe possono variare in base al residence, alle date e alla durata del soggiorno. Il calendario attuale controlla la disponibilità; le informazioni sul prezzo vengono confermate con la richiesta.":"Rates can vary depending on the residence, dates and length of stay. The current calendar checks availability; pricing information is confirmed with your request.",actions:[{label:"BOOK YOUR STAY →",href:"booking.html"}]};
}

if(question.includes("checkin")||question.includes("check-in")||question.includes("check in")||question.includes("arrivo")){
return{text:italian?"Le informazioni e le istruzioni precise per il check-in vengono comunicate agli ospiti prima dell'arrivo. Per richieste particolari contatta direttamente Prime Residence.":"Exact check-in details and arrival instructions are provided to guests before arrival. For special requests, please contact Prime Residence directly.",actions};
}

if(question.includes("parking")||question.includes("parcheggio")){
return{text:italian?"Non dispongo ancora di informazioni confermate sul parcheggio. Per evitare informazioni inesatte, contatta direttamente Prime Residence.":"I don't currently have confirmed parking information. To avoid giving you inaccurate information, please contact Prime Residence directly.",actions};
}

if(question.includes("contact")||question.includes("whatsapp")||question.includes("email")||question.includes("contatt")){
return{text:italian?"Puoi contattare direttamente Prime Residence tramite WhatsApp o email.":"You can contact Prime Residence directly via WhatsApp or email.",actions:[{label:"WHATSAPP ↗",href:"https://wa.me/393917055625",external:true},{label:"EMAIL ↗",href:"mailto:vittoriolandi005@gmail.com"}]};
}

return{text:italian?"Non dispongo ancora di informazioni confermate su questo argomento. Preferisco non darti una risposta inesatta. Puoi contattare direttamente Prime Residence tramite WhatsApp o email.":"I don't have confirmed information about that yet, and I prefer not to give you an inaccurate answer. You can contact Prime Residence directly via WhatsApp or email.",actions:[{label:"WHATSAPP ↗",href:"https://wa.me/393917055625",external:true},{label:"EMAIL ↗",href:"mailto:vittoriolandi005@gmail.com"}]};
}

function processQuestion(question){
if(!question||!question.trim())return;
const clean=question.trim();
addMessage(clean,"user");
const response=getResponse(clean);
setTimeout(()=>addMessage(response.text,"bot",response.actions),320);
}

if(form&&input){
form.addEventListener("submit",e=>{
e.preventDefault();
const question=input.value;
input.value="";
processQuestion(question);
});
}

suggestionButtons.forEach(button=>button.addEventListener("click",()=>{
const type=button.dataset.question||"";
let question="";

switch(type){
case"about-prime":question="What is Prime Residence Bologna?";break;
case"residences":question="Which residences do you have?";break;
case"residence-details":question="Tell me about this residence";break;
case"compare":question="What is the difference between the two apartments?";break;
case"booking":question="How can I book?";break;
case"location":question=page==="gastone"?"Where is Gastone Rossi 12?":page==="barontini"?"Where is Barontini 8?":"Where are the residences?";break;
case"checkin":question="How does check-in work?";break;
default:question=type;
}

processQuestion(question);
}));

document.addEventListener("keydown",e=>{
if(e.key==="Escape"&&assistant.classList.contains("chat-open"))closeAssistant();
});
}

/* =========================================================
   09. ESC MOBILE MENU
========================================================= */

document.addEventListener("keydown",e=>{
if(e.key==="Escape"&&mobileMenu&&mobileMenu.classList.contains("active")){
mobileMenu.classList.remove("active");

if(menuToggle){
menuToggle.classList.remove("active");
menuToggle.setAttribute("aria-expanded","false");
}

document.body.style.overflow="";
}
});

/* =========================================================
   10. YEAR
========================================================= */

const year=document.querySelector("#year");
if(year)year.textContent=new Date().getFullYear();

console.log("Prime Residence Bologna — website ready.");

});
