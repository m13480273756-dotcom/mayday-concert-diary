const cards = [...document.querySelectorAll(".work")];
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#work-search");
const emptyState = document.querySelector("#empty-results");
let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-CN");
  let visible = 0;

  cards.forEach((card) => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const haystack = `${card.dataset.search || ""} ${card.textContent}`.toLocaleLowerCase("zh-CN");
    const searchMatch = !query || haystack.includes(query);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add("is-visible");
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
