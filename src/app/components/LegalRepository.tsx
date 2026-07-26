import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("research");
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
    <section className="pt-28 pb-20 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Legal Repository
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Research Papers, Case Laws, Legal Articles and Current Legal
            Updates by Bajrangi Verma Advocate.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border bg-card rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-10">

          <button
            onClick={() => setActiveTab("research")}
            className={`px-5 py-2 rounded-lg ${
              activeTab === "research"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border"
            }`}
          >
            Research Papers
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`px-5 py-2 rounded-lg ${
              activeTab === "articles"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border"
            }`}
          >
            Articles
          </button>

          <button
            onClick={() => setActiveTab("caselaw")}
            className={`px-5 py-2 rounded-lg ${
              activeTab === "caselaw"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border"
            }`}
          >
            Case Laws
          </button>

                </div>

        {/* Research Papers */}

        {activeTab === "research" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchPapers
  .filter(
    (paper) =>
      paper.title.toLowerCase().includes(search.toLowerCase()) ||
      (paper.category || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((paper) => (
                <div
                  key={paper.title}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <BookOpen size={18} />
                    <span className="text-xs uppercase tracking-wider">
                      {paper.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {paper.summary}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span>{paper.author}</span>
                    <span>{paper.date}</span>
                  </div>

                  <button
  onClick={() => setSelectedItem(paper)}
  className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
>
  Read More
  <ChevronRight size={16} />
</button>
                </div>
              ))}
          </div>
        )}

        {/* Articles */}

{activeTab === "articles" && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {articles.map((article) => (
      <div
        key={article.title}
        className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
      >

        <div className="flex items-center gap-2 text-primary mb-3">
          <FileText size={18} />
          <span className="text-xs uppercase tracking-wider">
            Legal Article
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-foreground mb-3">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          {article.summary}
        </p>

        <button
  onClick={() => setSelectedItem(article)}
  className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
>
  Read More
  <ChevronRight size={16} />
</button>

      </div>
    ))}
  </div>
)}

{/* Case Laws */}

{activeTab === "caselaw" && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {caseLaws.map((law) => (
  <div
    key={law.title}
        className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
      >

        <div className="flex items-center gap-2 text-primary mb-3">
          <Scale size={18} />
          <span className="text-xs uppercase tracking-wider">
            Supreme Court Case Law
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-foreground mb-3">
          {law.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          {law.summary}
        </p>

        <button
  onClick={() => setSelectedItem(law)}
  className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
>
  Read Judgment
  <ChevronRight size={16} />
</button>

      </div>
    ))}
  </div>
)}

      </div>
    </section>
  );
}