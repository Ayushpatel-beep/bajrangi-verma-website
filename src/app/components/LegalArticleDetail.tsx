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
    <section className="pt-28 pb-24 px-6 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={onBack}
          className="
            group
            inline-flex
            items-center
            gap-2.5
            mb-10
            px-4
            py-2.5
            rounded-full
            border
            border-primary/20
            bg-primary/[0.06]
            backdrop-blur-sm
            text-sm
            font-medium
            text-primary
            shadow-sm
            transition-all
            duration-200
            hover:bg-primary/[0.10]
            hover:border-primary/35
            hover:shadow-md
          "
        >
          <span
            className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-full
              bg-primary/10
              border
              border-primary/15
            "
          >
            <ChevronLeft
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-0.5
              "
            />
          </span>

          <span>
            Back to Legal Repository
          </span>
        </button>


        {/* Article Header */}
        <header className="max-w-4xl mb-12">

          {/* Category */}
          {item.category && (
            <div className="mb-6">
              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                {item.category}
              </span>
            </div>
          )}


          {/* Main Title */}
          <h1
            className="
              font-serif
              text-4xl
              md:text-5xl
              lg:text-[3.35rem]
              leading-[1.15]
              font-bold
              text-primary
              mb-7
            "
          >
            {item.title}
          </h1>


          {/* Metadata */}
          <div
            className="
              flex
              flex-wrap
              gap-x-8
              gap-y-3
              text-sm
              text-muted-foreground
              pb-8
              border-b
              border-border
            "
          >
            {item.author && (
              <span>
                <span className="font-medium text-foreground">
                  Author
                </span>{" "}
                {item.author}
              </span>
            )}

            {item.court && (
              <span>
                <span className="font-medium text-foreground">
                  Court
                </span>{" "}
                {item.court}
              </span>
            )}

            {item.citation && (
              <span>
                <span className="font-medium text-foreground">
                  Citation
                </span>{" "}
                {item.citation}
              </span>
            )}

            {item.date && (
              <span>
                <span className="font-medium text-foreground">
                  Date
                </span>{" "}
                {item.date}
              </span>
            )}
          </div>

        </header>


        {/* Reading Area */}
        <main className="max-w-4xl">

          {/* Abstract */}
          {item.summary && (
            <section className="mb-9">

              <div
                className="
                  border-l-[3px]
                  border-primary
                  pl-6
                  md:pl-8
                  py-1
                "
              >
                <h2
                  className="
                    font-serif
                    text-xl
                    md:text-2xl
                    font-bold
                    text-primary
                    mb-4
                  "
                >
                  Abstract
                </h2>

                <p
                  className="
                    text-base
                    md:text-[17px]
                    leading-8
                    text-muted-foreground
                    max-w-3xl
                    m-0
                  "
                >
                  {item.summary}
                </p>
              </div>

            </section>
          )}


          {/* Keywords */}
          <section
            className="
              mb-10
              pb-9
              border-b
              border-border
            "
          >

            <h2
              className="
                font-serif
                text-xl
                md:text-2xl
                font-bold
                text-primary
                mb-5
              "
            >
              Keywords
            </h2>

            <div className="flex flex-wrap gap-2.5">

              {[
                "Fundamental Rights",
                "Constitution of India",
                "Constitutional Law",
                "Article 14",
                "Article 19",
                "Article 21",
                "Article 32",
                "Supreme Court of India",
                "Basic Structure",
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/[0.05]
                    px-3.5
                    py-1.5
                    text-xs
                    font-medium
                    text-primary
                  "
                >
                  {keyword}
                </span>
              ))}

            </div>

          </section>


          {/* Markdown Content */}
          <div className="max-w-3xl">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{

                /* Hide duplicate Markdown title */
                h1: () => null,


                /* Main Sections */
                h2: ({ children }) => (
                  <h2
                    className="
                      font-serif
                      text-2xl
                      md:text-[1.55rem]
                      font-bold
                      text-primary
                      mt-8
                      mb-8
                      pb-4
                      border-b
                      border-primary/20
                      leading-tight
                    "
                  >
                    {children}
                  </h2>
                ),


                /* Sub Sections */
                h3: ({ children }) => (
                  <h3
                    className="
                      font-serif
                      text-xl
                      font-bold
                      text-primary
                      mt-16
                      mb-6
                      leading-snug
                    "
                  >
                    {children}
                  </h3>
                ),


                /* Paragraph */
                p: ({ children }) => (
                  <p
                    className="
                      text-foreground
                      text-[15px]
                      md:text-base
                      leading-[1.95]
                      mb-7
                    "
                  >
                    {children}
                  </p>
                ),


                /* Unordered List */
                ul: ({ children }) => (
                  <ul
                    className="
                      my-7
                      pl-6
                      space-y-2
                      text-muted-foreground
                    "
                  >
                    {children}
                  </ul>
                ),


                /* Ordered List */
                ol: ({ children }) => (
  <ol
    className="
      my-4
      pl-5
      list-decimal
      space-y-0
      text-muted-foreground
    "
  >
    {children}
  </ol>
),


                /* List Items */
                li: ({ children }) => (
  <li
    className="
      pl-1
      py-0
      my-0
      leading-5
      text-[12px]
      md:text-[13px]
      font-normal
      text-muted-foreground
    "
  >
    {children}
  </li>
),

                /* Bold Text */
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),


                /* Blockquote */
                blockquote: ({ children }) => (
                  <blockquote
                    className="
                      my-10
                      border-l-4
                      border-primary
                      pl-6
                      italic
                      text-muted-foreground
                    "
                  >
                    {children}
                  </blockquote>
                ),


                /* Horizontal Rule */
                hr: () => (
                  <hr className="my-12 border-border" />
                ),

              }}
            >
              {item.content}
            </ReactMarkdown>

          </div>


          {/* End */}
          <div
            className="
              max-w-3xl
              mt-20
              pt-8
              border-t
              border-border
            "
          >
            <p
              className="
                text-[10px]
                md:text-[11px]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Legal Repository • Ayush Patel
            </p>
          </div>

        </main>

      </div>
    </section>
  );
}