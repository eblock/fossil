// -------------TODO-------------
// (p0) Clean up comments/code

// (p1) Color rectangle, match sketch
// (p1) Outline as separate div with blend mode
//      -- responsive to mouse pos ?
// (p1) Color change on hover
//      -- Use CSS variables
// (p1) Add a fade-in transition on load

// (p2) Animated Type
// (p2) Mirrored type
// (p2) Hover to reveal images

// (p3) Type on a rounded rectangular path
// ------------------------------

let winHeight,
    winWidth,
    panelHeight,
    creditsHeight,
    reverseScrollRate;

let stillImg = document.querySelector('.still img');
let stillNum = 1;
let stillMax = 4;
let isScrolling;

function initialize() {
  winHeight = $(window).innerHeight();
  winWidth = $(window).innerWidth();
  panelHeight = $(".panel").innerHeight();
  creditsHeight = $(".dark-blue").innerHeight();
  reverseScrollRate =  panelHeight / creditsHeight * .999;

  // Set height of body and big type 
  $("body").height(winHeight * $(".panel").length);
  $(".big-type").height(winHeight);
  // $(".outline-offset").height(winHeight);
}

$(document).ready(() => {
  initialize();

  // Clone the Credits
  $('.credits').clone().appendTo('.credits-container').css('transform', `translateY(${creditsHeight}px)`);

  // Clone the Big Type
  $('.panel').clone().appendTo('.big-type');

  // Translate Big type
  $(".reverse-scroll").css('transform', `translateY(${-panelHeight}px)`);
  
  // Ambient Scrolling
  // ambientScroll();
});

// RESIZE HANDLER
$(window).on('resize', event => {
  initialize();

  // Reloads site (temporary fix)
  // window.location.reload(false);

  $(window).trigger('scroll');
    // may be redundant

});

// SCROLLING FEATURES
$(window).on('scroll', () => {
  window.clearTimeout(isScrolling);

  // Reverse Looping Scroll
  $(".reverse-scroll").css('transform', `translateY(${window.scrollY * reverseScrollRate - panelHeight}px)`);

  // Credits Looping Scroll
  let scrolled = winHeight + window.scrollY;
  let offset = 0.001*winHeight;
  // distance from bottom before the page resets to top
  
  if (scrolled - offset >= creditsHeight + winHeight) {
    window.scrollTo(0, 1);
    nextStill();
  } else if (scrolled <= winHeight) {
    window.scrollTo(0, creditsHeight + offset);
    prevStill();
  }

  // Change opacity of still
  stillImg.style.opacity = "1.0";

  // Once scrolling stops
  isScrolling = setTimeout(() => {
    isScrolling = 0;
    stillImg.style.opacity = "0.0";
  }, 120);

});

function ambientScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(ambientScroll, 30);
}

// MOUSE-REACTIVE FEATURES
let outlineX = 0;
let outlineY = 0;
let outlineDist = 15;

$(document).on("mousemove", (event) => {
  let mouseX = 0.5 - (event.pageX / winWidth);
  let mouseY = 0.5 - ((event.pageY - window.scrollY) / winHeight);

  if (outlineX < outlineDist * mouseX) outlineX++;
  if (outlineX > outlineDist * mouseX) outlineX--;
  if (outlineY < outlineDist * mouseY) outlineY++;
  if (outlineY > outlineDist * mouseY) outlineY--;

  // console.log(event.pageY - window.scrollY);
  // console.log("mouseX: " + mouseX + ", mouseY: " + mouseY);
  // $('.outline').css('transform', `translate(${outlineX}px, ${outlineY}px)`);
  
  // // BIG-TYPE SHADOW
  // $('.big-type div').css('text-shadow', `
  // ${outlineX}px ${outlineY}px 0 var(--big-type-color)`);

  $('.big-type .panel div').css('transform', `translate(${outlineX}px, ${outlineY}px)`);
  $('.big-type .panel div').css('text-shadow', `
  ${-1*outlineX}px ${-1*outlineY}px 0 var(--big-type-color)`);

  // LOGO OUTLINE
  $('.fossil-by-wild-type .fossil').css('transform', `translate(${outlineX}px, ${outlineY}px)`);
  $('.fossil-by-wild-type .by').css('transform', `translate(${outlineX}px, ${outlineY}px)`);
  $('.fossil-by-wild-type .wild-type').css('transform', `translate(${outlineX}px, ${outlineY}px)`);

  $('.fossil-by-wild-type .fossil').css('text-shadow', `
  ${-1*outlineX}px ${-1*outlineY}px 0 var(--fossil-color)`);
  $('.fossil-by-wild-type .by').css('text-shadow', `
  ${-1*outlineX}px ${-1*outlineY}px 0 var(--fossil-color)`);
  $('.fossil-by-wild-type .wild-type').css('text-shadow', `
  ${-1*outlineX}px ${-1*outlineY}px 0 var(--wild-color)`);
});

// STILL VIEW HANDLERS
function nextStill() {
  if (stillNum < 4) stillNum++;
  else stillNum = 1;

  stillImg.src = `images/stills/Fossil-View-${stillNum}-No-Background-Edit.png`;
}

function prevStill() {
  if (stillNum > 1) stillNum--;
  else stillNum = 4;
  
  stillImg.src = `images/stills/Fossil-View-${stillNum}-No-Background-Edit.png`;
}