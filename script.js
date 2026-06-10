const content = window.PORTFOLIO_CONTENT;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const setField = (field, value) => {
  document.querySelectorAll(`[data-field="${field}"]`).forEach((element) => {
    if (field.endsWith("Url")) {
      element.href = value;
      return;
    }

    if (field === "emailHref") {
      element.href = `mailto:${content.email}`;
      return;
    }

    element.textContent = value;
  });
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderMetrics = () => {
  const container = document.querySelector("[data-metrics]");
  container.innerHTML = "";

  content.metrics.forEach((metric) => {
    const item = createElement("div", metric.label ? "metric" : "metric metric-single");
    item.append(createElement("dt", "", metric.value));
    if (metric.label) item.append(createElement("dd", "", metric.label));
    container.append(item);
  });
};

const renderExpertise = () => {
  const container = document.querySelector("[data-expertise]");
  container.innerHTML = "";

  content.expertise.forEach((item) => {
    const card = createElement("article", "expertise-card");
    card.append(createElement("h3", "", item.title), createElement("p", "", item.text));
    container.append(card);
  });
};

const renderImpact = () => {
  const container = document.querySelector("[data-impact]");
  container.innerHTML = "";

  content.impact.forEach((item) => {
    const row = createElement("article", "impact-row");
    row.append(
      createElement("div", "impact-metric", item.metric),
      createElement("div", "impact-label", item.label),
      createElement("p", "", item.detail),
    );
    container.append(row);
  });
};

const renderExperience = () => {
  const container = document.querySelector("[data-experience]");
  container.innerHTML = "";

  content.experience.forEach((job) => {
    const article = createElement("article", "timeline-item");
    const meta = createElement("div", "timeline-meta");
    meta.append(createElement("span", "", job.company), createElement("span", "", job.period));

    const list = createElement("ul");
    job.details.forEach((detail) => list.append(createElement("li", "", detail)));

    article.append(meta, createElement("h3", "", job.role), list);
    container.append(article);
  });
};

const renderProjects = () => {
  const container = document.querySelector("[data-projects]");
  container.innerHTML = "";

  content.projects.forEach((project) => {
    const card = createElement("article", "project-card");
    const tags = createElement("div", "tag-list");
    project.tags.forEach((tag) => tags.append(createElement("span", "tag", tag)));

    card.append(
      createElement("span", "project-type", project.type),
      createElement("h3", "", project.title),
      createElement("p", "", project.text),
      tags,
    );
    container.append(card);
  });
};

const renderSkills = () => {
  const container = document.querySelector("[data-skills]");
  container.innerHTML = "";

  content.skills.forEach((group) => {
    const card = createElement("section", "skill-group");
    const list = createElement("ul");
    group.items.forEach((item) => list.append(createElement("li", "", item)));
    card.append(createElement("h3", "", group.group), list);
    container.append(card);
  });
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const toggleMenu = () => {
  const isOpen = !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

const closeMenu = () => {
  mobileMenu.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
};

const initCopyEmail = () => {
  const button = document.querySelector("[data-copy-email]");
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(content.email);
      button.textContent = "Email Copied";
      window.setTimeout(() => {
        button.textContent = "Copy Email";
      }, 1800);
    } catch {
      window.location.href = `mailto:${content.email}`;
    }
  });
};

const init = () => {
  document.title = content.pageTitle || `${content.name} | Skills & Experience`;
  setText("[data-year]", new Date().getFullYear());
  setField("name", content.name);
  setField("role", content.role);
  setField("headline", content.headline);
  setField("summary", content.summary);
  setField("contactCopy", content.contactCopy);
  setField("resumeUrl", content.resumeUrl);
  setField("linkedInUrl", content.linkedInUrl);
  setField("emailHref", content.email);

  renderMetrics();
  renderExpertise();
  renderImpact();
  renderExperience();
  renderProjects();
  renderSkills();
  initCopyEmail();
  updateHeader();

  menuToggle.addEventListener("click", toggleMenu);
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", updateHeader, { passive: true });
};

init();
