const RESOURCE_LIBRARY = [
  {
    keywords: ["javascript", "js"],
    title: "JavaScript Guide",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  {
    keywords: ["react"],
    title: "React Learn",
    link: "https://react.dev/learn",
  },
  {
    keywords: ["node", "express", "api"],
    title: "Node.js Learn",
    link: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
  },
  {
    keywords: ["mongodb", "mongoose", "database", "db"],
    title: "MongoDB University",
    link: "https://learn.mongodb.com/",
  },
  {
    keywords: ["sql"],
    title: "SQLBolt",
    link: "https://sqlbolt.com/",
  },
  {
    keywords: ["system design", "architecture"],
    title: "System Design Primer",
    link: "https://github.com/donnemartin/system-design-primer",
  },
  {
    keywords: ["dsa", "algorithm", "data structure"],
    title: "NeetCode Roadmap",
    link: "https://neetcode.io/roadmap",
  },
  {
    keywords: ["css", "html", "frontend"],
    title: "MDN HTML and CSS",
    link: "https://developer.mozilla.org/en-US/docs/Learn",
  },
];

const normalizeText = (value = "") => value.trim().toLowerCase();

const toDisplayConcept = (value = "") =>
  value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const buildWeakAreas = (results = [], limit = 8) => {
  const conceptCounts = new Map();

  results.forEach((result) => {
    (result?.weakAreas || []).forEach((item) => {
      const normalized = normalizeText(item);

      if (!normalized) {
        return;
      }

      conceptCounts.set(normalized, (conceptCounts.get(normalized) || 0) + 1);
    });
  });

  return [...conceptCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([concept, count]) => ({
      concept: toDisplayConcept(concept),
      count,
    }));
};

const getResourceForConcept = (concept = "") => {
  const normalized = normalizeText(concept);

  return (
    RESOURCE_LIBRARY.find(({ keywords }) =>
      keywords.some((keyword) => normalized.includes(keyword))
    ) || {
      title: "Developer Roadmaps",
      link: "https://roadmap.sh/",
    }
  );
};

const buildRecommendations = (weakAreas = [], limit = 6) =>
  weakAreas.slice(0, limit).map((item) => {
    const resource = getResourceForConcept(item.concept);

    return {
      concept: item.concept,
      title: resource.title,
      link: resource.link,
    };
  });

module.exports = {
  buildRecommendations,
  buildWeakAreas,
};
