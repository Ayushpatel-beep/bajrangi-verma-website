import { useEffect, useState } from "react";

const CONSENT_KEY = "bajrangi_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4">
      <div className="max-w-6xl mx-auto bg-card border border-border shadow-2xl p-5 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="max-w-3xl">
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">
              Privacy & Cookie Notice
            </h2>

            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              This website may use cookies and similar technologies for
              essential functionality, analytics, and advertising. By
              selecting “Accept”, you consent to the use of non-essential
              cookies. You can learn more in our{" "}
              <a
                href="/privacy-policy"
                className="text-primary underline underline-offset-2 hover:text-accent"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => handleConsent("rejected")}
              className="px-5 py-2.5 border border-border text-sm font-semibold font-sans text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Decline
            </button>

            <button
              onClick={() => handleConsent("accepted")}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold font-sans hover:bg-accent transition-colors"
            >
              Accept
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
