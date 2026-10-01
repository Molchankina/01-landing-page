// =========================================================
// НАСТРОЙКИ ЗАКАЗЧИКА
// =========================================================

const MAX_CONTACT_LINK = "https://vk.ru/away.php?to=https%3A%2F%2Fmax.ru%2Fu%2Ff9LHodD0cOL-qqbMUNEDu6LD-4e64t2_OKVBsDXFoYVXOI9fHnjITVzsHmg&utf=1";
const MAX_CHANNEL_LINK = "https://vk.ru/away.php?to=https%3A%2F%2Fmax.ru%2Fjoin%2FVVbjJqffA_YXCzXi-JNqKg7SA_M2kz9RPOFPVMY4R2U&utf=1";
const VK_LINK = "https://vk.ru/uclownns";

// =========================================================
// ELEMENTS
// =========================================================

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const modal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const currentYear = document.getElementById("currentYear");
const header = document.getElementById("header");

// =========================================================
// CURRENT YEAR
// =========================================================

if (currentYear) {
currentYear.textContent = new Date().getFullYear();
}

// =========================================================
// MOBILE MENU
// =========================================================

if (burger && nav) {
burger.addEventListener("click", () => {
const isOpen = burger.classList.toggle("active");

nav.classList.toggle("active");

burger.setAttribute("aria-expanded", isOpen);
burger.setAttribute(
"aria-label",
isOpen ? "Закрыть меню" : "Открыть меню"
);
});

// CLOSE MOBILE MENU
document.querySelectorAll(".nav__link").forEach((link) => {
link.addEventListener("click", () => {
burger.classList.remove("active");
nav.classList.remove("active");

burger.setAttribute("aria-expanded", "false");
burger.setAttribute("aria-label", "Открыть меню");
});
});

// CLOSE MOBILE MENU OUTSIDE
document.addEventListener("click", (event) => {
if (
window.innerWidth <= 850 &&
nav.classList.contains("active") &&
!nav.contains(event.target) &&
!burger.contains(event.target)
) {
burger.classList.remove("active");
nav.classList.remove("active");

burger.setAttribute("aria-expanded", "false");
burger.setAttribute("aria-label", "Открыть меню");
}
});
}

// =========================================================
// HEADER ON SCROLL
// =========================================================

if (header) {
window.addEventListener("scroll", () => {
if (window.scrollY > 20) {
header.classList.add("scrolled");
} else {
header.classList.remove("scrolled");
}
});
}

// =========================================================
// MODAL
// =========================================================

const openModalButtons = document.querySelectorAll(".js-open-modal");
const closeModalElements = document.querySelectorAll("[data-close-modal]");

function openModal() {
if (!modal) {
return;
}

modal.classList.add("active");
modal.setAttribute("aria-hidden", "false");

document.body.classList.add("modal-open");

const nameInput = document.getElementById("name");

if (nameInput) {
setTimeout(() => {
nameInput.focus();
}, 200);
}
}

function closeModal() {
if (!modal) {
return;
}

modal.classList.remove("active");
modal.setAttribute("aria-hidden", "true");

document.body.classList.remove("modal-open");
}

openModalButtons.forEach((button) => {
button.addEventListener("click", openModal);
});

closeModalElements.forEach((element) => {
element.addEventListener("click", closeModal);
});

// =========================================================
// ESCAPE — CLOSE MODAL
// =========================================================

document.addEventListener("keydown", (event) => {
if (
event.key === "Escape" &&
modal &&
modal.classList.contains("active")
) {
closeModal();
}
});

// =========================================================
// BOOKING FORM → MAX
// =========================================================

if (bookingForm) {
bookingForm.addEventListener("submit", (event) => {
event.preventDefault();

const formData = new FormData(bookingForm);

const name = formData.get("name");
const time = formData.get("time");

const message =
`Здравствуйте! Хочу записаться на бесплатную диагностику.\n\n` +
`Имя: ${name}\n` +
`Удобное время: ${time}`;

const separator = MAX_CONTACT_LINK.includes("?")
? "&"
: "?";

const maxUrl =
`${MAX_CONTACT_LINK}` +
`${separator}` +
`text=${encodeURIComponent(message)}`;

window.open(
maxUrl,
"_blank",
"noopener,noreferrer"
);
});
}

// =========================================================
// REVEAL ANIMATION
// =========================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {

if (!entry.isIntersecting) {
return;
}

entry.target.classList.add("visible");

observer.unobserve(entry.target);
});
},
{
threshold: 0.12
}
);

revealElements.forEach((element) => {
revealObserver.observe(element);
});

} else {

// Если браузер не поддерживает IntersectionObserver,
// просто показываем все элементы.

revealElements.forEach((element) => {
element.classList.add("visible");
});
}

// =========================================================
// MAX LINKS
// =========================================================

document
.querySelectorAll('a[href="https://max.ru/"]')
.forEach((link) => {

if (link.classList.contains("channel-link")) {
link.href = MAX_CHANNEL_LINK;
} else {
link.href = MAX_CONTACT_LINK;
}
});

// =========================================================
// VK LINKS
// =========================================================

document
.querySelectorAll('a[href="https://vk.com/"]')
.forEach((link) => {
link.href = VK_LINK;
});