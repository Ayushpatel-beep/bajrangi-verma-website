import { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Scale,
  Calendar,
  ChevronRight,
} from "lucide-react";

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

      </div>
    </section>
  );
}