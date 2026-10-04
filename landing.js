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
function update() {
  header.classList.toggle("compact", scrollY > 120);
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
  rotation;
function setupRotation() {
  clearInterval(rotation);
  if (motion.matches) return;
  rotation = setInterval(() => {
    if (document.hidden) return;
    current = (current + 1) % categories.length;
    category.classList.add("changing");
    setTimeout(() => {
      category.textContent = categories[current];
      category.classList.remove("changing");
    }, 250);
    panels.forEach((p, i) => {
      p.classList.toggle("active", i === current);
      p.setAttribute("aria-hidden", String(i !== current));
    });
  }, 3000);
}
panels.forEach((p, i) => p.setAttribute("aria-hidden", String(i !== 0)));
motion.addEventListener("change", () => {
  paused = motion.matches;
  pauseLabel();
  setupRotation();
  update();
});
mobile.addEventListener("change", update);
setupRotation();
update();
