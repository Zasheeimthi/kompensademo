const motion = matchMedia("(prefers-reduced-motion: reduce)");
const mobile = matchMedia("(max-width: 760px)");
const header = document.querySelector(".navigation");
const menu = document.querySelector(".menu-toggle");
function closeMenu() {
  header.classList.remove("menu-open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Öppna menyn");
}
menu.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Stäng menyn" : "Öppna menyn");
});
header
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
const words = document.querySelector(".word-reveal");
const text = words.textContent.trim();
words.setAttribute("aria-label", text);
words.replaceChildren(
  ...text.split(/\s+/).map((word) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.setAttribute("aria-hidden", "true");
    return span;
  }),
);
const sequence = document.querySelector(".benefit-scroll");
const track = document.querySelector(".benefit-track");
let ticking = false;
let previousScroll = scrollY;
function update() {
  header.classList.toggle("compact", scrollY > 120);
  const delta = scrollY - previousScroll;
  if (Math.abs(delta) > 4) {
    header.classList.toggle(
      "mobile-hidden",
      mobile.matches &&
        delta > 0 &&
        scrollY > 180 &&
        !header.classList.contains("menu-open"),
    );
    previousScroll = scrollY;
  }
  if (!mobile.matches || scrollY < 80) header.classList.remove("mobile-hidden");
  const wr = words.getBoundingClientRect();
  const reveal = Math.max(
    0,
    Math.min(1, (innerHeight * 0.85 - wr.top) / (innerHeight * 0.7)),
  );
  [...words.children].forEach(
    (word, i) =>
      (word.style.color =
        motion.matches || i / words.children.length < reveal
          ? "#101317"
          : "#d6d9d1"),
  );
  const steps = [...document.querySelectorAll('.process-card')];
  const timeline = document.querySelector('.process-track');
  if (timeline && steps.length) {
    const positions = steps.map(step => step.getBoundingClientRect().top);
    const readingLine = innerHeight * 0.65;
    let progress = 0;
    if (readingLine >= positions[positions.length - 1]) progress = 1;
    else if (readingLine > positions[0]) {
      const segment = positions.findIndex((top, i) => i < positions.length - 1 && readingLine < positions[i + 1]);
      if (segment >= 0) progress = (segment + (readingLine - positions[segment]) / (positions[segment + 1] - positions[segment])) / (steps.length - 1);
    }
    timeline.style.setProperty('--progress', `${progress * 100}%`);
    timeline.querySelectorAll('i').forEach((dot, i) => dot.classList.toggle('is-filled', readingLine >= positions[i]));
  }
  ticking = false;
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  },
  { passive: true },
);
addEventListener("resize", update);
const cards = [...track.querySelectorAll(".scroll-card")];
const pauseButton = document.querySelector(".slider-toggle");
let slide = 0,
  paused = motion.matches,
  hovering = false,
  focused = false;
function showSlide(index) {
  slide = (index + cards.length) % cards.length;
  track.scrollTo({
    left:
      cards[slide].offsetLeft -
      track.offsetLeft -
      parseFloat(getComputedStyle(track).paddingLeft),
    behavior: motion.matches ? "instant" : "smooth",
  });
  document.querySelector(".slider-count").textContent =
    String(slide + 1).padStart(2, "0") + " / 05";
}
function pauseLabel() {
  pauseButton.textContent = paused ? "Spela bildspel" : "Pausa bildspel";
  pauseButton.setAttribute("aria-pressed", String(paused));
}
pauseButton.addEventListener("click", () => {
  paused = !paused;
  pauseLabel();
});
document.querySelector(".slider-prev").addEventListener("click", () => {
  paused = true;
  pauseLabel();
  showSlide(slide - 1);
});
document.querySelector(".slider-next").addEventListener("click", () => {
  paused = true;
  pauseLabel();
  showSlide(slide + 1);
});
sequence.addEventListener("mouseenter", () => (hovering = true));
sequence.addEventListener("mouseleave", () => (hovering = false));
sequence.addEventListener("focusin", () => (focused = true));
sequence.addEventListener("focusout", () => {
  focused = sequence.contains(document.activeElement);
});
track.addEventListener(
  "touchstart",
  () => {
    paused = true;
    pauseLabel();
  },
  { passive: true },
);
setInterval(() => {
  const r = sequence.getBoundingClientRect();
  if (
    !paused &&
    !motion.matches &&
    !hovering &&
    !focused &&
    !document.hidden &&
    r.top < innerHeight &&
    r.bottom > 0
  )
    showSlide(slide + 1);
}, 3500);
pauseLabel();
const category = document.querySelector(".rotating-category");
const categories = ["din vardagsresa", "din helgresa", "ditt periodkort"];
const panels = [...document.querySelectorAll(".screen-panel")];
let current = 0,
  rotation,
  screenAnimation;
const screen = document.querySelector(".device-screen");
function animatePanel() {
  screenAnimation?.cancel();
  panels.forEach((p, i) => {
    p.classList.toggle("active", i === current);
    p.setAttribute("aria-hidden", String(i !== current));
  });
  const panel = panels[current];
  const distance = Math.max(0, panel.scrollHeight - screen.clientHeight);
  if (!motion.matches && distance > 0) {
    screenAnimation = panel.animate(
      [
        { transform: "translateY(0)", offset: 0 },
        { transform: "translateY(0)", offset: 0.18 },
        { transform: `translateY(-${distance}px)`, offset: 0.8 },
        { transform: `translateY(-${distance}px)`, offset: 1 },
      ],
      { duration: 5600, easing: "ease-in-out", fill: "forwards" },
    );
  }
}
function setupRotation() {
  clearInterval(rotation);
  animatePanel();
  if (motion.matches) return;
  rotation = setInterval(() => {
    if (document.hidden) return;
    current = (current + 1) % panels.length;
    category.textContent = categories[current];
    animatePanel();
  }, 6400);
}
let previewWidth = innerWidth;
addEventListener("resize", () => {
  if (innerWidth === previewWidth) return;
  previewWidth = innerWidth;
  setupRotation();
});
document.fonts.ready.then(setupRotation);
motion.addEventListener("change", () => {
  paused = motion.matches;
  pauseLabel();
  setupRotation();
  update();
});
mobile.addEventListener("change", update);
setupRotation();
update();

const journeyForm = document.querySelector("#journey-search-form");
const journeyFrom = document.querySelector("#journey-from");
const journeyTo = document.querySelector("#journey-to");
const journeyDate = document.querySelector("#journey-date");
const today = new Date();
journeyDate.max = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");
document.querySelector(".station-swap").addEventListener("click", () => {
  [journeyFrom.value, journeyTo.value] = [journeyTo.value, journeyFrom.value];
  journeyTo.setCustomValidity("");
});
[journeyFrom, journeyTo].forEach((input) =>
  input.addEventListener("input", () => journeyTo.setCustomValidity("")),
);
journeyForm.addEventListener("submit", (e) => {
  if (
    journeyFrom.value.trim().toLocaleLowerCase("sv") ===
    journeyTo.value.trim().toLocaleLowerCase("sv")
  ) {
    e.preventDefault();
    journeyTo.setCustomValidity("Välj två olika stationer.");
    journeyTo.reportValidity();
  }
});
