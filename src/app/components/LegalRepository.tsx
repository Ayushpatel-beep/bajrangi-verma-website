import { useEffect, useState } from "react";
import LegalArticleDetail from "./LegalArticleDetail";

import {
  researchPapers,
  articles,
  caseLaws,
} from "../utils/markdownLoader";

import {
  Search,
  BookOpen,
  FileText,
  Scale,
  Calendar,
  ChevronRight,
} from "lucide-react";

type LegalItem = {
  title: string;
  category?: string;
  author?: string;
  date?: string;
  summary?: string;
  court?: string;
  citation?: string;
  content: string;
};

type Tab = "research" | "articles" | "caselaw";

export default function LegalRepository() {
  const getTabFromPath = (): Tab => {
    const path = window.location.pathname;

    if (path === "/legal-repository/articles") {
      return "articles";
    }

    if (path === "/legal-repository/case-laws") {
      return "caselaw";
    }

    return "research";
  };

  const [activeTab, setActiveTab] = useState<Tab>(getTabFromPath);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<LegalItem | null>(null);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearch("");
    setSelectedCategory("All");

    let path = "/legal-repository/research-papers";

    if (tab === "articles") {
      path = "/legal-repository/articles";
    }

    if (tab === "caselaw") {
      path = "/legal-repository/case-laws";
    }

    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromPath());
      setSearch("");
      setSelectedCategory("All");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (selectedItem) {
    return (
      <LegalArticleDetail
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  let items: LegalItem[] = [];
  let heading = "";
  let description = "";
  let Icon = BookOpen;

  if (activeTab === "research") {
    items = researchPapers as LegalItem[];
    heading = "Research Papers";
    description =
      "Academic research and detailed legal studies covering important areas of law.";
    Icon = BookOpen;
  }

  if (activeTab === "articles") {
    items = articles as LegalItem[];
    heading = "Legal Articles";
    description =
      "Legal analysis, commentary and informative articles on contemporary legal issues.";
    Icon = FileText;
  }

  if (activeTab === "caselaw") {
    items = caseLaws as LegalItem[];
    heading = "Case Laws";
    description =
      "Important judgments, precedents and case law materials for legal research.";
    Icon = Scale;
  }

  /* Dynamic Categories */
  const uniqueCategories = new Set<string>();

items.forEach((item) => {
  if (item.category?.trim()) {
    uniqueCategories.add(item.category.trim());
  }
});

const categories = ["All", ...Array.from(uniqueCategories).sort()];

  /* Search + Category Filter */
  const filteredItems = items.filter((item) => {
    const query = search.trim().toLowerCase();

    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.trim().toLowerCase() ===
        selectedCategory.toLowerCase();

    if (!matchesCategory) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchableText = [
      item.title,
      item.category,
      item.author,
      item.date,
      item.court,
      item.citation,
      item.summary,
      item.content,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return (
    <section className="pt-24 pb-20 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-primary/40" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Legal Research & Resources
            </span>

            <div className="h-px w-10 bg-primary/40" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Legal Repository
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A curated collection of research papers, legal articles and
            important case laws for legal research and reference.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto mb-10">

          <button
            onClick={() => changeTab("research")}
            className={`flex-1 flex items-center justify-center gap-3 px-5 py-4 rounded-xl border transition-all ${
              activeTab === "research"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            <BookOpen size={20} />
            <span className="font-semibold">Research Papers</span>
          </button>

          <button
            onClick={() => changeTab("articles")}
            className={`flex-1 flex items-center justify-center gap-3 px-5 py-4 rounded-xl border transition-all ${
              activeTab === "articles"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            <FileText size={20} />
            <span className="font-semibold">Articles</span>
          </button>

          <button
            onClick={() => changeTab("caselaw")}
            className={`flex-1 flex items-center justify-center gap-3 px-5 py-4 rounded-xl border transition-all ${
              activeTab === "caselaw"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            <Scale size={20} />
            <span className="font-semibold">Case Laws</span>
          </button>

        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${heading.toLowerCase()}...`}
              className="w-full h-14 pl-12 pr-5 rounded-xl border border-border bg-card text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            />

          </div>
        </div>

        {/* Dynamic Category Filter */}
        {categories.length > 1 && (
          <div className="max-w-5xl mx-auto mb-12">

            <div className="flex flex-wrap items-center justify-center gap-2.5">

              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-4
                      py-2
                      rounded-full
                      border
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}

            </div>

          </div>
        )}

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon size={21} className="text-primary" />
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                {heading}
              </h2>

            </div>

            <p className="text-sm text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "resource" : "resources"}
          </div>

        </div>

        {/* Resource Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {filteredItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                onClick={() => setSelectedItem(item)}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >

                {/* Category */}
                {item.category && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary mb-4">
                    {item.category}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Metadata */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs text-muted-foreground">

                  {item.author && (
                    <span>
                      By {item.author}
                    </span>
                  )}

                  {item.court && (
                    <span>
                      {item.court}
                    </span>
                  )}

                  {item.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {item.date}
                    </span>
                  )}

                </div>

                {/* Summary */}
                {item.summary && (
                  <p className="mt-4 text-sm text-muted-foreground leading-6 line-clamp-3">
                    {item.summary}
                  </p>
                )}

                {/* Read */}
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Read More
                  <ChevronRight size={16} />
                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">

            <Search
              size={32}
              className="mx-auto text-muted-foreground mb-4"
            />

            <h3 className="font-serif text-xl font-semibold text-foreground">
              No resources found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}