// -------------TODO-------------
// (p0) Clean up comments/code
// (p0) Fix reverse scroll hiccup
// (p0) QA Resize function

// (p1) Color rectangle, match sketch
// (p1) Outline as separate div with blend mode
//      -- responsive to mouse pos ?
// (p1) Color change on hover
//      -- Use CSS variables

// (p2) Animated Type
// (p2) Mirrored type
// (p2) Hover to reveal images

// (p3) Type on a rounded rectangular path
// ------------------------------

let winHeight = $(window).innerHeight(),
    winWidth = $(window).innerWidth(),
    panelHeight = $(".panel").innerHeight(),
    creditsHeight = $(".credits").innerHeight(),
    reverseScrollRate;

$(document).ready(() => {
  $(".big-type").height(winHeight);
  // $(".outline-offset").height(winHeight);
  $("body").height(winHeight * $(".panel").length);

  // Clone the Credits
  $('.credits').clone().appendTo('.credits-container');

  // Clone the Big Type
  $('.panel').clone().appendTo('.big-type');

  // TranslateY big type
  $(".reverse-scroll").css('transform', `translateY(${ - 1.05 * panelHeight}px)`);

  // Calculate reverse scroll rate
  reverseScrollRate =  panelHeight / creditsHeight;
});

// *** NEEDS ATTENTION ***
window.addEventListener('resize', (event) => {
  // *** INSERT RESET SCROLL FUNCTION? ***

  // Reloads site *** temporary fix
  window.location.reload(false);

  winHeight = $(window).innerHeight();
  winWidth = $(window).innerWidth();
  panelHeight = $(".panel").innerHeight();
  creditsHeight = $(".credits").innerHeight();
  reverseScrollRate = panelHeight / creditsHeight;

  $(".big-type").height(winHeight);
  // $(".outline-offset").height($(window).innerHeight());
  $("body").height(winHeight * $(".panel").length);

  // window.scrollTo(0, 1);
  // $(".reverse-scroll").css('transform', `translateY(${ - 1.05 * panelHeight}px)`);
});

// SCROLLING FEATURES
$(window).on('scroll', () => {
  // Reverse Looping Scroll
  $(".reverse-scroll").css('transform', `translateY(${$(window).scrollTop() * reverseScrollRate - 1.05 * panelHeight}px)`);

  // Credits Looping Scroll
  const scrolled = winHeight + window.scrollY;
  const documentHeight = document.body.offsetHeight;
  const offset = 0.05*winHeight;
    // distance from bottom before the page resets to top

  if (scrolled - offset >= $('.credits').innerHeight() + documentHeight) {
    window.scrollTo(0, 1);
  } else if (scrolled <= documentHeight) {
    window.scrollTo(0, $('.credits').innerHeight() + offset);
  }
});

ambientScroll();
function ambientScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(ambientScroll, 40);
}

// MOUSE-REACTIVE FEATURES
let outlineX = 0;
let outlineY = 0;
let outlineDist = 20;

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
});
