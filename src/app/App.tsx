import { useState } from "react";
import {
  Phone, MessageCircle, MapPin, Star, ChevronDown, ChevronUp,
  Menu, X, Scale, FileText, Award, Clock, Calendar, CheckCircle,
  ArrowRight, Mail, Send, Building2, Gavel, BookOpen, Shield,
  Users, TrendingUp, Quote
} from "lucide-react";

type Page = "home" | "practice" | "booking";

const PHONE = "9415786469";
const WA_LINK = `https://wa.me/91${PHONE}`;
const CALL_LINK = `tel:+91${PHONE}`;
const MAP_LINK = "https://maps.google.com/?q=Bajrangi+Verma+Advocate,+8/732,+Matinpurwa,+Sector+8,+Vikas+Nagar,+Lucknow,+Uttar+Pradesh+226022";

const REVIEWS = [
  { name: "Rohit Maurya", role: "Local Guide · 7 reviews", stars: 5, time: "3 years ago", text: "Best Civil Advocate in Lucknow for High Court as well as District Court. Extremely knowledgeable and always prepared." },
  { name: "Aman Raj Verma", role: "3 reviews", stars: 5, time: "4 years ago", text: "Very trustful person. Handled our family property dispute with utmost professionalism and integrity." },
  { name: "Vishal Verma", role: "Local Guide · 22 reviews", stars: 5, time: "4 years ago", text: "Best Lawyer. Won our case in the High Court when others said it was impossible. Highly recommended." },
  { name: "Priya Singh", role: "5 reviews", stars: 4, time: "2 years ago", text: "Outstanding guidance in my matrimonial case. Patient, thorough, and genuinely invested in the outcome." },
  { name: "Deepak Mishra", role: "Local Guide · 14 reviews", stars: 5, time: "1 year ago", text: "35 years of experience truly shows. His courtroom presence and command over law is remarkable. Won our civil suit." },
];

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SUNDAY = ["Sunday"];

function generateSlots(start: number, end: number) {
  const slots: string[] = [];
  for (let h = start; h < end; h++) {
    slots.push(`${h}:00 ${h < 12 ? "AM" : "PM"}`);
    slots.push(`${h}:30 ${h < 12 ? "AM" : "PM"}`);
  }
  const h = end;
  slots.push(`${h}:00 ${h < 12 ? "AM" : "PM"}`);
  return slots;
}

function formatSlot(raw: string) {
  const [time, period] = raw.split(" ");
  const [h, m] = time.split(":").map(Number);
  const hour = h <= 12 ? h : h - 12;
  return `${hour}:${m === 0 ? "00" : m} ${period}`;
}

const WEEKDAY_SLOTS = generateSlots(18, 21).map(s => {
  const [time, period] = s.split(" ");
  const [h, m] = time.split(":").map(Number);
  const hour = h <= 12 ? h : h - 12;
  return `${hour}:${m === 0 ? "00" : m} ${period}`;
});

const SUNDAY_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 16; h <= 21; h++) {
    const hour = h <= 12 ? h : h - 12;
    const period = h < 12 ? "AM" : "PM";
    slots.push(`${hour}:00 ${period}`);
    if (h < 21) slots.push(`${hour}:30 ${period}`);
  }
  return slots;
})();

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Practice Areas", page: "practice" },
    { label: "Book Consultation", page: "booking" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => nav("home")} className="flex items-center gap-3 group">
          <Scale size={22} className="text-primary" />
          <div className="text-left">
            <div className="font-serif text-base font-bold text-foreground tracking-wide leading-tight">Bajrangi Verma</div>
            <div className="text-[10px] text-primary tracking-[0.2em] uppercase font-sans">Advocate</div>
          </div>
        </button>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => nav(l.page)}
              className={`font-sans text-sm tracking-wide transition-colors ${current === l.page ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l.label}
            </button>
          ))}
          <a href={CALL_LINK} className="ml-2 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold font-sans tracking-wide hover:bg-accent transition-colors">
            <Phone size={14} />
            {PHONE}
          </a>
        </nav>
        {/* Mobile menu */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button key={l.page} onClick={() => { nav(l.page); setOpen(false); }}
              className={`text-left font-sans text-sm tracking-wide py-1 ${current === l.page ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </button>
          ))}
          <a href={CALL_LINK} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold font-sans w-fit">
            <Phone size={14} /> {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ nav }: { nav: (p: Page) => void }) {
  return (
    <footer className="bg-card border-t border-border mt-0">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Scale size={20} className="text-primary" />
            <div>
              <div className="font-serif text-base font-bold text-foreground">Bajrangi Verma</div>
              <div className="text-[10px] text-primary tracking-[0.2em] uppercase font-sans">Advocate</div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm font-sans leading-relaxed">
            35 years of trusted legal practice across Civil, Criminal, Matrimonial, and High Court matters in Lucknow.
          </p>
          <div className="flex items-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className={i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"} />
            ))}
            <span className="text-xs text-muted-foreground font-sans ml-1">4.4 (13 Google Reviews)</span>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-sm font-bold text-foreground mb-4 tracking-widest uppercase">Office Hours</h4>
          <div className="space-y-1.5 text-sm font-sans text-muted-foreground">
            <div className="flex justify-between"><span>Monday – Saturday</span><span className="text-foreground">6:00 – 9:00 PM</span></div>
            <div className="flex justify-between"><span>Sunday</span><span className="text-foreground">4:00 – 9:00 PM</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
              <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
              8/732, Sector 8, Vikas Nagar,<br />Lucknow, Uttar Pradesh 226022
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-sm font-bold text-foreground mb-4 tracking-widest uppercase">Quick Links</h4>
          <div className="space-y-2">
            {(["home", "practice", "booking"] as Page[]).map(p => (
              <button key={p} onClick={() => nav(p)}
                className="block text-sm font-sans text-muted-foreground hover:text-primary transition-colors capitalize">
                {p === "home" ? "Home" : p === "practice" ? "Practice Areas" : "Book Consultation"}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <a href={CALL_LINK} className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-3 py-2 font-semibold font-sans hover:bg-accent transition-colors">
              <Phone size={12} /> Call Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs bg-secondary text-foreground border border-border px-3 py-2 font-semibold font-sans hover:border-primary transition-colors">
              <MessageCircle size={12} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground font-sans">
        © {new Date().getFullYear()} Bajrangi Verma, Advocate. All rights reserved.
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }: { nav: (p: Page) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", subject: "", message: "" });

  const stats = [
    { value: "35+", label: "Years Experience", icon: Award },
    { value: "2000+", label: "Cases Handled", icon: Gavel },
    { value: "97%", label: "Success Rate", icon: TrendingUp },
    { value: "4.4★", label: "Google Rating", icon: Star },
  ];

  const services = [
    { icon: FileText, title: "Civil Litigation", desc: "Property disputes, contracts, injunctions, and civil recovery matters before District Courts." },
    { icon: Gavel, title: "District & Sessions Court", desc: "Criminal defence, bail applications, trial advocacy, and sessions matters in Lucknow courts." },
    { icon: Building2, title: "High Court – Lucknow Bench", desc: "Writ petitions, appeals, and revisions before the High Court of Judicature at Allahabad – Lucknow Bench." },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&h=900&fit=crop&auto=format"
            alt="High Court of Judicature at Allahabad – Lucknow Bench"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent z-10" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/40 px-3 py-1.5 mb-8 text-[11px] tracking-[0.25em] text-primary font-sans uppercase">
              <Scale size={12} />
              Enrolled Advocate · Bar Council of U.P.
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] mb-2">
              Bajrangi<br />Verma
            </h1>
            <p className="text-primary font-sans text-lg tracking-[0.15em] uppercase font-semibold mb-6">Advocate</p>
            <p className="font-serif text-xl text-muted-foreground leading-relaxed mb-4 italic max-w-lg">
              "Trusted legal counsel across Civil, Criminal & Matrimonial matters for over three and a half decades."
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
              Practicing before the District Courts of Lucknow and the High Court of Judicature at Allahabad – Lucknow Bench since 1989.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => nav("booking")}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-semibold font-sans text-sm tracking-wide hover:bg-accent transition-colors">
                Book Consultation <ArrowRight size={16} />
              </button>
              <a href={CALL_LINK}
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 font-semibold font-sans text-sm tracking-wide hover:bg-primary/10 transition-colors">
                <Phone size={15} /> {PHONE}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 font-semibold font-sans text-sm tracking-wide hover:border-primary hover:text-primary transition-colors">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
          {/* Stats panel */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                <Icon size={20} className="text-primary mb-3" />
                <div className="font-serif text-4xl font-black text-primary mb-1">{value}</div>
                <div className="font-sans text-xs text-muted-foreground tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar (mobile) ── */}
      <section className="lg:hidden bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 gap-6">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-primary shrink-0" />
              <div>
                <div className="font-serif text-2xl font-black text-primary">{value}</div>
                <div className="font-sans text-xs text-muted-foreground tracking-wide uppercase">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Practice teaser ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Areas of Practice</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive Legal Services</h2>
          <div className="w-16 h-0.5 bg-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-card border border-border p-7 hover:border-primary/60 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 border border-primary/40 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">{title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <button onClick={() => nav("practice")}
          className="flex items-center gap-2 text-primary font-sans text-sm font-semibold hover:gap-4 transition-all">
          View All Practice Areas & Fee Structure <ArrowRight size={16} />
        </button>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-border" />

      {/* ── Credentials strip ── */}
      <section className="bg-secondary/50">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <BookOpen size={22} className="text-primary mx-auto mb-2" />
            <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1">Enrolled With</div>
            <div className="font-serif text-sm text-foreground">Bar Council of Uttar Pradesh</div>
          </div>
          <div className="border-x border-border">
            <Gavel size={22} className="text-primary mx-auto mb-2" />
            <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1">Primary Jurisdiction</div>
            <div className="font-serif text-sm text-foreground">High Court of Judicature at Allahabad – Lucknow Bench</div>
          </div>
          <div>
            <Shield size={22} className="text-primary mx-auto mb-2" />
            <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1">Practice Since</div>
            <div className="font-serif text-sm text-foreground">1989 — Lucknow, Uttar Pradesh</div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Legal Team</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Advocates</h2>
          <div className="w-16 h-0.5 bg-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Senior */}
          <div className="bg-card border border-primary/40 p-7">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
                <Scale size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">Bajrangi Verma</h3>
                <p className="font-sans text-xs text-primary tracking-widest uppercase mt-0.5">Senior Advocate</p>
              </div>
            </div>
            <div className="space-y-2 text-sm font-sans text-muted-foreground">
              <div className="flex items-center gap-2"><Award size={13} className="text-primary shrink-0" /> 35+ Years Experience</div>
              <div className="flex items-center gap-2"><Building2 size={13} className="text-primary shrink-0" /> High Court of Judicature at Allahabad – Lucknow Bench</div>
              <div className="flex items-center gap-2"><Gavel size={13} className="text-primary shrink-0" /> Civil · Criminal · Matrimonial</div>
            </div>
            <div className="mt-5 pt-4 border-t border-border flex gap-3">
              <a href={CALL_LINK} className="flex items-center gap-1.5 text-xs font-sans font-semibold text-primary hover:underline"><Phone size={12} /> {PHONE}</a>
            </div>
          </div>
          {/* Junior */}
          <div className="bg-card border border-border p-7 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">Ashwani Kumar</h3>
                <p className="font-sans text-xs text-primary tracking-widest uppercase mt-0.5">Junior Advocate</p>
              </div>
            </div>
            <div className="space-y-2 text-sm font-sans text-muted-foreground">
              <div className="flex items-center gap-2"><Scale size={13} className="text-muted-foreground shrink-0" /> Enrolled – Bar Council of Uttar Pradesh</div>
              <div className="flex items-center gap-2"><Building2 size={13} className="text-muted-foreground shrink-0" /> District Court & High Court – Lucknow</div>
              <div className="flex items-center gap-2"><FileText size={13} className="text-muted-foreground shrink-0" /> Civil · Criminal · Document Drafting</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Client Testimonials</p>
          <div className="flex items-end gap-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">What Clients Say</h2>
            <div className="hidden md:flex items-center gap-2 pb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"} />
                ))}
              </div>
              <span className="font-sans text-sm text-muted-foreground">4.4 · 13 Google Reviews</span>
            </div>
          </div>
          <div className="w-16 h-0.5 bg-primary mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} className="bg-card border border-border p-6 hover:border-primary/40 transition-colors">
              <Quote size={20} className="text-primary/40 mb-3" />
              <p className="font-serif text-sm text-foreground leading-relaxed mb-5 italic">{r.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-sans text-xs font-semibold text-foreground">{r.name}</div>
                  <div className="font-sans text-[10px] text-muted-foreground">{r.role}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex">
                    {[...Array(r.stars)].map((_, i) => <Star key={i} size={11} className="fill-primary text-primary" />)}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-sans">{r.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Get In Touch</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Reach Out Directly</h2>
            <div className="w-16 h-0.5 bg-primary mb-8" />
            <div className="space-y-5">
              <a href={CALL_LINK} className="flex items-center gap-4 group">
                <div className="w-11 h-11 border border-primary/40 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-0.5">Call Directly</div>
                  <div className="font-serif text-base text-foreground font-semibold">+91 {PHONE}</div>
                </div>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-11 h-11 border border-primary/40 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <MessageCircle size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-0.5">WhatsApp</div>
                  <div className="font-serif text-base text-foreground font-semibold">+91 {PHONE}</div>
                </div>
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-11 h-11 border border-primary/40 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-0.5">Office Location</div>
                  <div className="font-serif text-base text-foreground font-semibold">8/732, Sector 8, Vikas Nagar<br />Lucknow, UP 226022</div>
                  <div className="font-sans text-xs text-primary mt-1 underline">View on Google Maps →</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 border border-primary/40 flex items-center justify-center">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-0.5">Office Hours</div>
                  <div className="font-sans text-sm text-foreground">Mon–Sat: 6:00–9:00 PM &nbsp;|&nbsp; Sun: 4:00–9:00 PM</div>
                </div>
              </div>
            </div>
          </div>
          {/* Query form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const msg = `Hello Bajrangi Verma Advocate,%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Subject:* ${encodeURIComponent(formData.subject)}%0A%0A*Description:*%0A${encodeURIComponent(formData.message)}`;
                window.open(`https://wa.me/91${PHONE}?text=${msg}`, "_blank");
              }}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Send a Query</h3>
              {[
                { id: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                { id: "phone", label: "Phone Number *", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                { id: "subject", label: "Subject / Case Type *", type: "text", placeholder: "e.g. Property dispute, Divorce, Criminal bail" },
              ].map(f => (
                <div key={f.id}>
                  <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={(formData as any)[f.id]}
                    onChange={e => setFormData(v => ({ ...v, [f.id]: e.target.value }))}
                    className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">Brief Description *</label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe your legal matter..."
                  required
                  value={formData.message}
                  onChange={e => setFormData(v => ({ ...v, message: e.target.value }))}
                  className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 font-sans font-semibold text-sm tracking-wide hover:bg-accent transition-colors">
                <MessageCircle size={15} /> Send via WhatsApp
              </button>
            </form>
        </div>
      </section>
    </div>
  );
}

// ─── PRACTICE AREAS PAGE ──────────────────────────────────────────────────────
function PracticePage({ nav }: { nav: (p: Page) => void }) {
  const [open, setOpen] = useState<number | null>(0);

  const areas = [
    {
      icon: FileText,
      title: "Civil Litigation",
      subtitle: "District Court, Lucknow",
      overview: "Comprehensive civil litigation services covering property disputes, contractual claims, injunctions, declaratory suits, and civil recovery proceedings before the Civil Courts at Lucknow.",
      services: [
        "Property & land disputes (title suits, partition, possession)",
        "Injunctions — temporary, permanent, mandatory",
        "Recovery suits & money decrees",
        "Specific performance of contracts",
        "Easement and encroachment matters",
        "Succession & probate proceedings",
      ],
      fees: [
        { label: "Initial Consultation", amount: "₹2,000" },
        { label: "Document Drafting (Plaints, Appeals, etc.)", amount: "₹5,000+" },
        { label: "Court Representation (per hearing)", amount: "On request" },
        { label: "Full Case Retainer", amount: "On request" },
      ],
    },
    {
      icon: Gavel,
      title: "Criminal Defence",
      subtitle: "District & Sessions Court, Lucknow",
      overview: "Robust criminal defence and prosecution assistance across all criminal matters, from FIR registration to trial advocacy, bail hearings, and appeals in the Sessions Court.",
      services: [
        "Bail applications — anticipatory, regular & bail cancellation",
        "Criminal trials — defence and prosecution",
        "Quashing petitions for FIRs and charge sheets",
        "Anticipatory bail before District & High Courts",
        "Compounding of offences and compromises",
        "Cheque dishonour (Section 138 NI Act) matters",
      ],
      fees: [
        { label: "Initial Consultation", amount: "₹2,000" },
        { label: "Bail Application Drafting", amount: "₹5,000+" },
        { label: "Court Representation", amount: "On request" },
        { label: "Full Trial Retainer", amount: "On request" },
      ],
    },
    {
      icon: Building2,
      title: "High Court — Lucknow Bench",
      subtitle: "High Court of Judicature at Allahabad – Lucknow Bench",
      overview: "Senior advocacy before the High Court of Judicature at Allahabad – Lucknow Bench, covering writ jurisdiction, first appeals, revision petitions, and constitutional matters.",
      services: [
        "Writ petitions — Habeas Corpus, Mandamus, Certiorari, Prohibition",
        "First Appeals from Civil Court decrees",
        "Criminal revision and criminal appeals",
        "Anticipatory bail before the High Court",
        "Contempt of court proceedings",
        "Public Interest Litigations (PIL)",
      ],
      fees: [
        { label: "Initial Consultation", amount: "₹3,500" },
        { label: "Writ / Appeal Drafting", amount: "₹10,000+" },
        { label: "High Court Representation", amount: "On request" },
        { label: "Full Retainer", amount: "On request" },
      ],
    },
    {
      icon: Users,
      title: "Matrimonial & Family Law",
      subtitle: "Family Court & District Court, Lucknow",
      overview: "Sensitive, solution-oriented handling of matrimonial disputes including divorce, maintenance, custody, and domestic violence matters with discretion and expertise.",
      services: [
        "Divorce petitions — mutual consent & contested",
        "Child custody and visitation rights",
        "Maintenance and alimony claims",
        "Domestic Violence Act proceedings",
        "Restitution of conjugal rights",
        "Marriage registration disputes",
      ],
      fees: [
        { label: "Initial Consultation", amount: "₹2,000" },
        { label: "Petition / Application Drafting", amount: "₹5,000+" },
        { label: "Court Representation", amount: "On request" },
        { label: "Full Case Retainer", amount: "On request" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <div className="mb-16">
        <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Legal Services</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4">Practice Areas</h1>
        <div className="w-16 h-0.5 bg-primary mb-6" />
        <p className="font-sans text-muted-foreground max-w-2xl leading-relaxed">
          35 years of practice across Civil, Criminal, Matrimonial, and Constitutional law. Each case is handled with thorough research, strategic counsel, and committed court advocacy.
        </p>
      </div>

      {/* Fee transparency banner */}
      <div className="bg-card border border-primary/30 p-5 mb-12 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-10 h-10 border border-primary/40 flex items-center justify-center shrink-0">
          <CheckCircle size={18} className="text-primary" />
        </div>
        <div>
          <div className="font-sans text-xs tracking-widest text-primary uppercase font-semibold mb-1">Transparent Fee Policy</div>
          <p className="font-sans text-sm text-muted-foreground">
            Initial consultation: <span className="text-foreground font-semibold">₹2,000</span>. Document drafting starts at <span className="text-foreground font-semibold">₹5,000</span>. All fees are discussed openly before engagement — no hidden charges.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {areas.map((area, idx) => {
          const Icon = area.icon;
          const isOpen = open === idx;
          return (
            <div key={area.title} className={`border transition-colors ${isOpen ? "border-primary/50" : "border-border hover:border-primary/30"}`}>
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-7 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} className="text-primary shrink-0" />
                  <div>
                    <div className="font-serif text-lg font-bold text-foreground">{area.title}</div>
                    <div className="font-sans text-xs text-muted-foreground mt-0.5">{area.subtitle}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-7 pb-7 border-t border-border/50">
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-5 mb-6">{area.overview}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-sans text-xs tracking-widest text-primary uppercase font-semibold mb-4">Services Included</h4>
                      <ul className="space-y-2.5">
                        {area.services.map(s => (
                          <li key={s} className="flex items-start gap-2.5 font-sans text-sm text-foreground">
                            <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-xs tracking-widest text-primary uppercase font-semibold mb-4">Fee Structure</h4>
                      <div className="space-y-3">
                        {area.fees.map(f => (
                          <div key={f.label} className="flex items-center justify-between border-b border-border pb-3">
                            <span className="font-sans text-sm text-muted-foreground">{f.label}</span>
                            <span className="font-serif text-sm font-bold text-primary">{f.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-card border border-border p-10 text-center">
        <Scale size={28} className="text-primary mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Ready to Discuss Your Case?</h3>
        <p className="font-sans text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Schedule a confidential consultation. Initial consultation fee: ₹2,000. Available Mon–Sat 6–9 PM and Sunday 4–9 PM.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => nav("booking")}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-sans font-semibold text-sm tracking-wide hover:bg-accent transition-colors">
            <Calendar size={15} /> Book Consultation
          </button>
          <a href={CALL_LINK}
            className="flex items-center gap-2 border border-primary text-primary px-8 py-3 font-sans font-semibold text-sm tracking-wide hover:bg-primary/10 transition-colors">
            <Phone size={15} /> Call +91 {PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", caseType: "", description: "" });
  const [confirmed, setConfirmed] = useState(false);

  const isSunday = selectedDay === "Sunday";
  const slots = isSunday ? SUNDAY_SLOTS : WEEKDAY_SLOTS;
  const allDays = [...WEEKDAYS, ...SUNDAY];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-lg w-full text-center border border-primary/40 p-12 bg-card">
          <CheckCircle size={48} className="text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-black text-foreground mb-3">Booking Confirmed</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-8">
            Your consultation has been requested for <span className="text-foreground font-semibold">{selectedDay}</span> at <span className="text-foreground font-semibold">{selectedSlot}</span>.<br /><br />
            Consultation fee: <span className="text-primary font-bold">₹2,000</span> (payable at the office).<br />
            You will receive confirmation on WhatsApp at <span className="text-foreground font-semibold">+91 {form.phone}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALL_LINK}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-sans font-semibold text-sm hover:bg-accent transition-colors">
              <Phone size={15} /> Call to Confirm
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border text-muted-foreground px-6 py-3 font-sans font-semibold text-sm hover:border-primary hover:text-primary transition-colors">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <div className="mb-12">
        <p className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-3">Schedule a Meeting</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4">Book a Consultation</h1>
        <div className="w-16 h-0.5 bg-primary mb-5" />
        <p className="font-sans text-muted-foreground text-sm">
          Initial consultation fee: <span className="text-primary font-semibold">₹2,000</span>. Available Mon–Sat 6–9 PM · Sunday 4–9 PM.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-12">
        {[1, 2, 3].map((s, idx) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 flex items-center justify-center text-xs font-sans font-bold transition-colors
              ${step > s ? "bg-primary text-primary-foreground" : step === s ? "border-2 border-primary text-primary" : "border border-border text-muted-foreground"}`}>
              {step > s ? <CheckCircle size={14} /> : s}
            </div>
            <div className="font-sans text-xs ml-2 mr-6 hidden sm:block text-muted-foreground">
              {s === 1 ? "Select Day" : s === 2 ? "Select Time" : "Your Details"}
            </div>
            {idx < 2 && <div className={`flex-1 h-px w-8 mr-2 ${step > s ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Select Day */}
      {step === 1 && (
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-6">Select a Day</h3>
          <div className="mb-8">
            <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-3">Monday – Saturday <span className="text-primary">6:00 – 9:00 PM</span></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WEEKDAYS.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)}
                  className={`py-4 px-5 text-sm font-sans font-semibold border transition-all
                    ${selectedDay === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-3">Sunday <span className="text-primary">4:00 – 9:00 PM</span></div>
            <button onClick={() => setSelectedDay("Sunday")}
              className={`py-4 px-8 text-sm font-sans font-semibold border transition-all
                ${selectedDay === "Sunday" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
              Sunday
            </button>
          </div>
          <button
            onClick={() => { if (selectedDay) setStep(2); }}
            disabled={!selectedDay}
            className="mt-10 flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-sans font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 2 — Select Slot */}
      {step === 2 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(1)} className="text-xs font-sans text-muted-foreground hover:text-primary transition-colors">← Back</button>
            <div className="text-sm font-sans text-foreground">
              <span className="text-primary font-semibold">{selectedDay}</span> — select a time slot
            </div>
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-6">Select a Time Slot</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-10">
            {slots.map(slot => (
              <button key={slot} onClick={() => setSelectedSlot(slot)}
                className={`py-3 px-3 text-sm font-sans font-semibold border transition-all
                  ${selectedSlot === slot ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
                {slot}
              </button>
            ))}
          </div>
          <button
            onClick={() => { if (selectedSlot) setStep(3); }}
            disabled={!selectedSlot}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-sans font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 3 — Details */}
      {step === 3 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(2)} className="text-xs font-sans text-muted-foreground hover:text-primary transition-colors">← Back</button>
            <div className="text-sm font-sans text-foreground">
              <span className="text-primary font-semibold">{selectedDay}</span> at <span className="text-primary font-semibold">{selectedSlot}</span>
            </div>
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">Your Details & Case Brief</h3>
          <div className="bg-card border border-primary/30 px-5 py-3 mb-8 flex items-center gap-3">
            <CheckCircle size={16} className="text-primary shrink-0" />
            <p className="font-sans text-xs text-muted-foreground">
              Consultation fee: <span className="text-primary font-bold">₹2,000</span> — payable at the office. Your details are kept strictly confidential.
            </p>
          </div>
          <form onSubmit={handleConfirm} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                { id: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
              ].map(f => (
                <div key={f.id}>
                  <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">{f.label} *</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    value={(form as any)[f.id]}
                    onChange={e => setForm(v => ({ ...v, [f.id]: e.target.value }))}
                    className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">Email Address (optional)</label>
              <input type="email" placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">Case Type *</label>
              <select required value={form.caseType} onChange={e => setForm(v => ({ ...v, caseType: e.target.value }))}
                className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                <option value="">Select case type</option>
                <option>Civil / Property Dispute</option>
                <option>Criminal Defence</option>
                <option>High Court Writ / Appeal</option>
                <option>Matrimonial / Divorce</option>
                <option>Bail Application</option>
                <option>Document Drafting</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest text-muted-foreground uppercase mb-1.5">Brief Description of Your Matter *</label>
              <textarea rows={5} required placeholder="Briefly describe your legal issue, relevant dates, parties involved, and any prior court orders..."
                value={form.description}
                onChange={e => setForm(v => ({ ...v, description: e.target.value }))}
                className="w-full bg-input-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 font-sans font-bold text-sm tracking-wide hover:bg-accent transition-colors">
              <CheckCircle size={16} /> Confirm Consultation — ₹2,000
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Navbar current={page} nav={nav} />
      <main>
        {page === "home" && <HomePage nav={nav} />}
        {page === "practice" && <PracticePage nav={nav} />}
        {page === "booking" && <BookingPage />}
      </main>
      <Footer nav={nav} />
    </div>
  );
}
