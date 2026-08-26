export default function Disclaimer() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <div className="mb-12">
        <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">
          Legal Information
        </p>

        <h1 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4">
          Disclaimer
        </h1>

        <div className="w-16 h-0.5 bg-primary mb-6" />

        <p className="font-sans text-muted-foreground max-w-2xl leading-relaxed">
          Important information regarding the use of this website and its
          legal content.
        </p>
      </div>

      <div className="space-y-10 font-sans text-sm text-muted-foreground leading-relaxed">

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            General Information
          </h2>

          <p>
            The information published on this website is provided for general
            legal awareness and informational purposes only. It should not be
            treated as legal advice for any specific case, dispute, or
            circumstance.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            No Legal Advice
          </h2>

          <p>
            Information available on this website does not create an
            advocate-client relationship and should not be relied upon as a
            substitute for advice from a qualified legal professional.
            Visitors should obtain professional legal advice based on the
            specific facts of their matter before taking legal action.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            No Guarantee of Outcome
          </h2>

          <p>
            Every legal matter depends on its individual facts, applicable law,
            evidence, procedure, and decisions of the relevant authorities or
            courts. No information on this website guarantees a particular
            result or outcome in any legal matter.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Accuracy and Updates
          </h2>

          <p>
            Reasonable efforts are made to keep the information on this website
            accurate and current. However, laws, regulations, procedures, and
            legal interpretations may change. We do not guarantee that every
            piece of information will remain complete, accurate, or current at
            all times.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Website Content
          </h2>

          <p>
            The content of this website may include articles, legal information,
            research material, case-related information, and other educational
            resources. Such content is provided for informational purposes and
            should not be interpreted as a solicitation, advertisement, or
            personal legal advice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            External Links
          </h2>

          <p>
            This website may contain links to third-party websites and
            services, including Google Maps, WhatsApp, and other external
            resources. Bajrangi Verma Advocate does not control these websites
            and is not responsible for their content, availability, or privacy
            practices.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Professional Engagement
          </h2>

          <p>
            Visiting this website, reading its content, submitting an enquiry,
            communicating through available contact methods, or requesting a
            consultation does not by itself establish an advocate-client
            relationship. Professional engagement is subject to acceptance and
            applicable terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Contact
          </h2>

          <p>
            <strong className="text-foreground">
              Bajrangi Verma Advocate
            </strong>
            <br />
            Lucknow, Uttar Pradesh
            <br />
            Phone: +91 9415786469
          </p>
        </section>

        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Last Updated: August 27, 2026
          </p>
        </div>

      </div>
    </div>
  );
}