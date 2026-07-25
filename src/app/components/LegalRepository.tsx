import { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Scale,
  Calendar,
  ChevronRight,
} from "lucide-react";

type ResearchPaper = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  description: string;
};

const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "Fundamental Rights under the Constitution of India",
    category: "Constitutional Law",
    author: "Bajrangi Verma",
    date: "2026",
    description:
      "A detailed study of Fundamental Rights and landmark constitutional judgments.",
  },
  {
    id: 2,
    title: "Civil Procedure Code – Practical Analysis",
    category: "Civil Law",
    author: "Bajrangi Verma",
    date: "2026",
    description:
      "Important provisions of CPC explained with practical courtroom examples.",
  },
  {
    id: 3,
    title: "Criminal Procedure Code – Recent Developments",
    category: "Criminal Law",
    author: "Bajrangi Verma",
    date: "2026",
    description:
      "Analysis of recent procedural changes and important criminal law judgments.",
  },
];

type Article = {
  id: number;
  title: string;
  description: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Understanding Property Rights in India",
    description:
      "An overview of ownership rights, property disputes and legal remedies available under Indian law.",
  },
  {
    id: 2,
    title: "Importance of Legal Documentation",
    description:
      "A practical guide explaining the importance of agreements, notices and proper documentation.",
  },
  {
    id: 3,
    title: "Constitutional Remedies and Writ Jurisdiction",
    description:
      "A brief analysis of writ remedies available under the Constitution of India.",
  },
];


type CaseLaw = {
  id: number;
  title: string;
  description: string;
};

const caseLaws: CaseLaw[] = [
  {
    id: 1,
    title: "Kesavananda Bharati v. State of Kerala",
    description:
      "A landmark Supreme Court judgment establishing the Basic Structure Doctrine.",
  },
  {
    id: 2,
    title: "Maneka Gandhi v. Union of India",
    description:
      "A landmark decision interpreting Article 21 and expanding personal liberty protections.",
  },
  {
    id: 3,
    title: "Vishaka v. State of Rajasthan",
    description:
      "Supreme Court guidelines relating to workplace harassment prevention.",
  },
];

export default function LegalRepository() {
  const [activeTab, setActiveTab] = useState("research");
  const [search, setSearch] = useState("");

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
                  paper.category.toLowerCase().includes(search.toLowerCase())
              )
              .map((paper) => (
                <div
                  key={paper.id}
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
                    {paper.description}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span>{paper.author}</span>
                    <span>{paper.date}</span>
                  </div>

                  <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
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
        key={article.id}
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
          {article.description}
        </p>

        <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
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
        key={law.id}
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
          {law.description}
        </p>

        <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
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