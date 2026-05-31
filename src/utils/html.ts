const BLOCKED_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
]);

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "span",
  "spoiler",
  "u",
  "s",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "img",
  "hr",
  "code",
  "pre",
]);

const ALLOWED_ATTRIBUTES = new Set([
  "href",
  "src",
  "alt",
  "title",
  "target",
  "rel",
  "data-spoiler",
]);

const SPOILER_SELECTOR = '[data-spoiler="true"]';
const LINK_MARKUP_PATTERN = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;

const isSafeUrl = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();

  return !(
    normalizedValue.startsWith("javascript:") ||
    normalizedValue.startsWith("data:text/html")
  );
};

const replaceElementTag = (element: Element, nextTag: string) => {
  const replacement = element.ownerDocument.createElement(nextTag);

  Array.from(element.attributes).forEach((attribute) => {
    replacement.setAttribute(attribute.name, attribute.value);
  });

  while (element.firstChild) {
    replacement.appendChild(element.firstChild);
  }

  element.replaceWith(replacement);
};

const unwrapElement = (element: Element) => {
  const parent = element.parentNode;

  while (element.firstChild) {
    parent?.insertBefore(element.firstChild, element);
  }

  element.remove();
};

const sanitizeElement = (element: Element) => {
  const tagName = element.tagName.toLowerCase();

  if (BLOCKED_TAGS.has(tagName)) {
    element.remove();
    return;
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    unwrapElement(element);
    return;
  }

  Array.from(element.attributes).forEach((attribute) => {
    const attributeName = attribute.name.toLowerCase();
    const attributeValue = attribute.value;

    if (!ALLOWED_ATTRIBUTES.has(attributeName) || attributeName.startsWith("on")) {
      element.removeAttribute(attribute.name);
      return;
    }

    if (
      (attributeName === "href" || attributeName === "src") &&
      !isSafeUrl(attributeValue)
    ) {
      element.removeAttribute(attribute.name);
    }
  });

  if (tagName === "span" && element.getAttribute("data-spoiler") !== "true") {
    unwrapElement(element);
    return;
  }

  if (tagName === "spoiler") {
    Array.from(element.attributes).forEach((attribute) => {
      element.removeAttribute(attribute.name);
    });
  }

  if (tagName === "a" && element.getAttribute("target") === "_blank") {
    element.setAttribute("rel", "noopener noreferrer");
  }
};

const normalizeRichTextDocument = (body: HTMLElement) => {
  Array.from(body.querySelectorAll("strong")).forEach((element) => {
    replaceElementTag(element, "b");
  });

  Array.from(body.querySelectorAll("em")).forEach((element) => {
    replaceElementTag(element, "i");
  });

  Array.from(body.querySelectorAll("span")).forEach((element) => {
    if (element.getAttribute("data-spoiler") === "true") {
      replaceElementTag(element, "spoiler");
    }
  });

  Array.from(body.querySelectorAll("div")).forEach((element) => {
    replaceElementTag(element, "p");
  });

  Array.from(body.querySelectorAll("*")).forEach(sanitizeElement);
};

export const sanitizeHtml = (html: string) => {
  if (!html.trim()) {
    return "";
  }

  if (typeof window === "undefined") {
    return html;
  }

  const documentFragment = new DOMParser().parseFromString(html, "text/html");

  Array.from(documentFragment.body.querySelectorAll("*")).forEach(sanitizeElement);

  return documentFragment.body.innerHTML;
};

const escapeHtmlCharacters = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const convertInlinePlainTextToHtml = (value: string) => {
  let html = "";
  let cursor = 0;

  for (const match of value.matchAll(LINK_MARKUP_PATTERN)) {
    const fullMatch = match[0];
    const linkLabel = match[1]?.trim();
    const linkHref = match[2]?.trim();
    const matchIndex = match.index ?? -1;

    if (!linkLabel || !linkHref || matchIndex < 0) {
      continue;
    }

    html += escapeHtmlCharacters(value.slice(cursor, matchIndex)).replace(
      /\n/g,
      "<br>",
    );

    if (isSafeUrl(linkHref)) {
      html += `<a href="${escapeHtmlCharacters(
        linkHref,
      )}" target="_blank" rel="noopener noreferrer">${escapeHtmlCharacters(
        linkLabel,
      )}</a>`;
    } else {
      html += escapeHtmlCharacters(fullMatch);
    }

    cursor = matchIndex + fullMatch.length;
  }

  html += escapeHtmlCharacters(value.slice(cursor)).replace(/\n/g, "<br>");

  return html;
};

export const plainTextToHtml = (value: string) => {
  const normalizedValue = value.replace(/\r\n/g, "\n").trim();

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${convertInlinePlainTextToHtml(paragraph)}</p>`)
    .join("");
};

export const htmlToPlainText = (html: string) => {
  if (!html.trim()) {
    return "";
  }

  const normalizedMarkup = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|h4|blockquote)>/gi, "\n\n")
    .replace(/<\/(ul|ol)>/gi, "\n");

  if (typeof window === "undefined") {
    return normalizedMarkup
      .replace(
        /<a\b[^>]*href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi,
        (_match, _quote, href, label) =>
          `[${label.replace(/<[^>]*>/g, "").trim() || href}](${href})`,
      )
      .replace(/<[^>]*>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  const documentFragment = new DOMParser().parseFromString(
    normalizedMarkup,
    "text/html",
  );

  Array.from(documentFragment.body.querySelectorAll("a")).forEach((element) => {
    const href = element.getAttribute("href")?.trim();
    const label = element.textContent?.trim();

    if (!href) {
      return;
    }

    element.replaceWith(
      documentFragment.createTextNode(`[${label || href}](${href})`),
    );
  });

  return documentFragment.body.textContent?.replace(/\n{3,}/g, "\n\n").trim() || "";
};

export const normalizeRichTextMarkup = (html: string) => {
  if (!html.trim()) {
    return "";
  }

  if (typeof window === "undefined") {
    return html;
  }

  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  normalizeRichTextDocument(documentFragment.body);

  return documentFragment.body.innerHTML.trim();
};

export const renderRichTextMarkup = (html: string) => {
  const normalizedMarkup = normalizeRichTextMarkup(html);

  if (!normalizedMarkup) {
    return "";
  }

  if (typeof window === "undefined") {
    return normalizedMarkup;
  }

  const documentFragment = new DOMParser().parseFromString(
    normalizedMarkup,
    "text/html",
  );

  Array.from(documentFragment.body.querySelectorAll("b")).forEach((element) => {
    replaceElementTag(element, "strong");
  });

  Array.from(documentFragment.body.querySelectorAll("i")).forEach((element) => {
    replaceElementTag(element, "em");
  });

  Array.from(documentFragment.body.querySelectorAll("spoiler")).forEach(
    (element) => {
      const replacement = documentFragment.createElement("span");
      replacement.setAttribute("data-spoiler", "true");

      while (element.firstChild) {
        replacement.appendChild(element.firstChild);
      }

      element.replaceWith(replacement);
    },
  );

  return sanitizeHtml(documentFragment.body.innerHTML).trim();
};

export const stripHtml = (html: string) => {
  if (!html.trim()) {
    return "";
  }

  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  return documentFragment.body.textContent?.replace(/\s+/g, " ").trim() || "";
};

const toggleSpoilerState = (spoiler: HTMLElement) => {
  const isRevealed = spoiler.getAttribute("data-revealed") === "true";
  spoiler.setAttribute("data-revealed", isRevealed ? "false" : "true");
};

export const attachSpoilerInteractions = (container: HTMLElement) => {
  const spoilers = Array.from(
    container.querySelectorAll<HTMLElement>(SPOILER_SELECTOR),
  );

  spoilers.forEach((spoiler) => {
    spoiler.tabIndex = 0;
    spoiler.setAttribute("role", "button");
    spoiler.setAttribute("aria-label", "Reveal spoiler");
  });

  const handleClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const spoiler = event.target.closest<HTMLElement>(SPOILER_SELECTOR);

    if (!spoiler || !container.contains(spoiler)) {
      return;
    }

    toggleSpoilerState(spoiler);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const spoiler = event.target.closest<HTMLElement>(SPOILER_SELECTOR);

    if (!spoiler || !container.contains(spoiler)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSpoilerState(spoiler);
    }
  };

  container.addEventListener("click", handleClick);
  container.addEventListener("keydown", handleKeyDown);

  return () => {
    container.removeEventListener("click", handleClick);
    container.removeEventListener("keydown", handleKeyDown);
  };
};
