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

type ResearchPaper = {
  title: string;
  category?: string;
  author?: string;
  date?: string;
  summary?: string;
};


type Article = {
  title: string;
  category?: string;
  author?: string;
  date?: string;
  summary?: string;
};


type CaseLaw = {
  title: string;
  court?: string;
  citation?: string;
  date?: string;
  summary?: string;
};



export default function LegalRepository() {
  const getTabFromPath = () => {
  const path = window.location.pathname;

  if (path === "/legal-repository/articles") {
    return "articles";
  }

  if (path === "/legal-repository/case-laws") {
    return "caselaw";
  }

  return "research";
};

const [activeTab, setActiveTab] = useState(getTabFromPath);

const changeTab = (tab: string) => {
  setActiveTab(tab);

  let path = "/legal-repository";

  if (tab === "articles") {
    path = "/legal-repository/articles";
  }

  if (tab === "caselaw") {
    path = "/legal-repository/case-laws";
  }

  if (tab === "research") {
    path = "/legal-repository/research-papers";
  }

  window.history.pushState({}, "", path);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

useEffect(() => {
  const handlePopState = () => {
    setActiveTab(getTabFromPath());
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (selectedItem) {
  return (
    <LegalArticleDetail
      item={selectedItem}
      onBack={() => setSelectedItem(null)}
    />
  );
}

  return (
  <section className="pt-20 pb-20 px-6 bg-background min-h-screen">
    <div className="max-w-5xl mx-auto">

      <div className="text-center pt-1 md:pt-4">

        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-primary/40"></div>

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Legal Research & Resources
          </span>

          <div className="h-px w-10 bg-primary/40"></div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
          Legal Repository
        </h1>

        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          A dedicated collection of legal research, case laws, articles and
          other authoritative legal resources.
        </p>

        {/* Coming Soon Card */}
        <div className="relative mt-12 max-w-3xl mx-auto">

          <div className="bg-card border border-border rounded-2xl px-8 py-12 md:px-14 md:py-14 shadow-sm">

            {/* Icon */}
            <div className="mx-auto mb-7 w-20 h-20 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
              <BookOpen
                className="text-primary"
                size={34}
                strokeWidth={1.5}
              />
            </div>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary"></span>

              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Coming Soon
              </span>
            </div>

            {/* Message */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-5">
              Our Legal Repository is Under Development
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-7 max-w-2xl mx-auto">
              Our Legal Repository is currently being updated with carefully
              curated research papers, case laws, legal articles and other
              legal resources. We are working to create a reliable and
              valuable knowledge resource and will be making it available
              shortly.
            </p>

            {/* Bottom Line */}
            <div className="mt-9 pt-7 border-t border-border">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Research • Case Laws • Legal Articles • Legal Resources
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
);
}