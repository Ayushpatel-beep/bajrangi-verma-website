import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LegalItem = {
  title: string;
  date?: string;
  summary?: string;
  category?: string;
  author?: string;
  court?: string;
  citation?: string;
  content: string;
};

type Props = {
  item: LegalItem;
  onBack: () => void;
};

export default function LegalArticleDetail({
  item,
  onBack,
}: Props) {
  return (
    <section className="pt-28 pb-20 px-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-8"
        >
          <ChevronLeft size={18} />
          Back to Legal Repository
        </button>


        <div className="bg-card border border-border rounded-lg p-8">

          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
            {item.title}
          </h1>


          <div className="text-sm text-muted-foreground mb-6 space-y-1">

            {item.author && (
              <p>
                Author: {item.author}
              </p>
            )}

            {item.court && (
              <p>
                Court: {item.court}
              </p>
            )}

            {item.citation && (
              <p>
                Citation: {item.citation}
              </p>
            )}

            {item.category && (
              <p>
                Category: {item.category}
              </p>
            )}

            {item.date && (
              <p>
                Date: {item.date}
              </p>
            )}

          </div>


          {item.summary && (
            <p className="text-muted-foreground mb-8">
              {item.summary}
            </p>
          )}


          <div
  className="
    prose 
    prose-headings:font-bold 
    prose-headings:text-foreground
    prose-h1:text-4xl
    prose-h2:text-2xl
    prose-h3:text-xl
    prose-h1:mt-12
    prose-h1:mb-10
    prose-h2:mt-16
    prose-h2:mb-6
    prose-h3:mt-10
    prose-h3:mb-5
    prose-p:leading-8
    prose-p:mb-8
    prose-p:font-normal
    prose-li:mb-3
    prose-li:font-normal
    max-w-none 
    text-foreground
    font-normal
  "
>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {item.content}
  </ReactMarkdown>
</div>
  

        </div>

      </div>
    </section>
  );
}