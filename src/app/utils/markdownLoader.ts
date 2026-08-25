export type MarkdownItem = {
  title: string;
  date?: string;
  summary?: string;
  category?: string;
  author?: string;
  court?: string;
  citation?: string;
  keywords?: string[];
  content: string;
};

function parseFile(file: string): MarkdownItem {

  const frontmatterMatch = file.match(
    /^---\s*([\s\S]*?)\s*---/
  );

  const content = file.replace(
    /^---\s*([\s\S]*?)\s*---/,
    ""
  ).trim();


  const metadata: Record<string, string> = {};

  if (frontmatterMatch) {
    frontmatterMatch[1]
      .split("\n")
      .forEach((line) => {
        const [key, ...value] = line.split(":");

        if (key && value.length) {
          metadata[key.trim()] = value
            .join(":")
            .trim()
            .replace(/^["']|["']$/g, "");
        }
      });
  }


  return {
    title: metadata.title || "",
    date: metadata.date || "",
    summary: metadata.summary || "",
    category: metadata.category || "",
    author: metadata.author || "",
    court: metadata.court || "",
    citation: metadata.citation || "",
    keywords: metadata.keywords
  ? metadata.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean)
  : [],
    content,
  };
}


// Research Papers
const researchFiles = import.meta.glob(
  "../../../content/research/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);


// Articles
const articleFiles = import.meta.glob(
  "../../../content/articles/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);


// Case Laws
const caseLawFiles = import.meta.glob(
  "../../../content/caselaws/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);


export const researchPapers = Object.entries(researchFiles)
  .filter(([path]) => !path.split("/").pop()?.startsWith("_"))
  .map(([, file]) => parseFile(file as string));

export const articles = Object.entries(articleFiles)
  .filter(([path]) => !path.split("/").pop()?.startsWith("_"))
  .map(([, file]) => parseFile(file as string));

export const caseLaws = Object.entries(caseLawFiles)
  .filter(([path]) => !path.split("/").pop()?.startsWith("_"))
  .map(([, file]) => parseFile(file as string));