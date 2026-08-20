import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Compass,
  Crosshair,
  Menu,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Click & Convert — Profitable attention, properly handled';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Click & Convert is a paid Meta ads and digital marketing partner for ambitious brands that want profitable attention.');
    document.head.appendChild(description);
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell min-h-[100dvh]">
      <div className="grain" />
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-[rgba(238,232,220,.9)] backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <button onClick={() => scrollTo('top')} className="group flex items-center gap-3 text-left" data-testid="button-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] font-display text-lg italic text-[var(--paper)] transition-transform group-hover:rotate-[-12deg]">C</span>
            <span className="font-display text-[1.2rem] leading-none tracking-[-.03em]">Click <span className="text-[var(--coral)]">&amp;</span> Convert</span>
          </button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {[
              ['Services', 'services'],
              ['Approach', 'approach'],
              ['Results', 'results'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-[.7rem] font-semibold uppercase tracking-[.14em]" data-testid={`link-${id}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => scrollTo('contact')} className="button-ink hidden rounded-full bg-[var(--ink)] px-5 py-3 text-[.68rem] font-bold uppercase tracking-[.14em] text-[var(--paper)] md:block" data-testid="button-header-contact">
            Start a conversation <ArrowUpRight className="ml-2 inline-block h-3.5 w-3.5" />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-[rgba(29,58,47,.35)] p-2 md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t hairline px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
            {[
              ['Services', 'services'],
              ['Approach', 'approach'],
              ['Results', 'results'],
              ['Contact', 'contact'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b hairline py-4 text-left font-display text-2xl" data-testid={`mobile-link-${id}`}>{label}</button>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[820px] border-b hairline px-5 pb-20 pt-[145px] md:min-h-[900px] md:px-10 md:pt-[190px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid items-end gap-14 lg:grid-cols-[1.3fr_.7fr]">
              <div className="reveal">
                <p className="eyebrow mb-8 flex items-center gap-3 text-[var(--coral)]"><span className="h-px w-10 bg-[var(--coral)]" /> Paid attention, made profitable</p>
                <h1 className="display-xl max-w-[1000px] font-display text-[var(--ink)]">
                  Good brands<br /><span className="serif-italic text-[var(--coral)]">deserve</span> good<br />growth.
                </h1>
              </div>
              <div className="reveal delay-2 pb-3 lg:pb-5">
                <p className="max-w-[340px] text-[1.05rem] leading-[1.55] text-[rgba(29,58,47,.75)]">
                  Click &amp; Convert is the sharp, trusted growth partner for ambitious brands. We turn media spend into momentum — with rigor, not noise.
                </p>
                <button onClick={() => scrollTo('contact')} className="button-ink mt-8 inline-flex items-center rounded-full bg-[var(--ink)] px-6 py-4 text-[.7rem] font-bold uppercase tracking-[.13em] text-[var(--paper)]" data-testid="button-hero-contact">
                  Let’s talk about growth <ArrowUpRight className="ml-3 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-24 flex items-end justify-between border-t hairline pt-5">
              <p className="eyebrow text-[rgba(29,58,47,.62)]">Independent. Focused. Accountable.</p>
              <button onClick={() => scrollTo('services')} className="group flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.13em]" data-testid="button-scroll-services">
                Explore the work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-[12%] right-[8%] hidden h-28 w-28 items-center justify-center rounded-full border border-[var(--coral)] text-center text-[.57rem] font-bold uppercase leading-[1.25] tracking-[.1em] text-[var(--coral)] md:flex">
            <div className="absolute inset-2 rounded-full border border-dashed border-[var(--coral)] opacity-60" />
            <span className="stamp">Make<br />it count</span>
          </div>
        </section>

        <div className="overflow-hidden border-b border-[var(--ink)] bg-[var(--coral)] py-4 text-[var(--paper)]">
          <div className="marquee flex w-max items-center gap-8 whitespace-nowrap text-[.67rem] font-bold uppercase tracking-[.2em]">
            <span>Strategy before spend</span><span>•</span><span>Creative with a job</span><span>•</span><span>Numbers you can defend</span><span>•</span><span>Strategy before spend</span><span>•</span><span>Creative with a job</span><span>•</span><span>Numbers you can defend</span><span>•</span>
          </div>
        </div>

        <section id="services" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div className="reveal">
                <p className="eyebrow mb-7 text-[var(--coral)]">What we do</p>
                <h2 className="display-md max-w-[410px] font-display text-[var(--ink)]">The whole machine, not just the media buy.</h2>
                <p className="mt-8 max-w-[300px] text-[.96rem] leading-[1.65] text-[rgba(29,58,47,.66)]">Attention is only valuable when it moves the business. Every engagement joins the dots between the offer, the audience, the ad and the action.</p>
              </div>
              <div className="reveal delay-1 border-t border-[var(--ink)]">
                {[
                  { n: '01', title: 'Paid social', copy: 'Meta campaigns built around buying intent, not vanity metrics.', icon: Crosshair },
                  { n: '02', title: 'Creative direction', copy: 'A clear point of view, expressed in work people actually want to watch.', icon: Sparkles },
                  { n: '03', title: 'Conversion systems', copy: 'Landing pages and journeys that keep a click from becoming a leak.', icon: Compass },
                  { n: '04', title: 'Growth intelligence', copy: 'Reporting that tells you what happened — and what to do next.', icon: BarChart3 },
                ].map(({ n, title, copy, icon: Icon }) => (
                  <div key={n} className="service-row group grid grid-cols-[45px_1fr_auto] items-center gap-4 border-b border-[rgba(29,58,47,.2)] py-6 md:grid-cols-[65px_1fr_1fr_auto] md:gap-8 md:py-8" data-testid={`service-row-${n}`}>
                    <span className="font-mono-ui text-[.68rem] text-[var(--coral)]">{n}</span>
                    <h3 className="font-display text-[1.7rem] text-[var(--ink)] md:text-[2.4rem]">{title}</h3>
                    <p className="hidden max-w-[235px] text-[.86rem] leading-[1.45] text-[rgba(29,58,47,.64)] md:block">{copy}</p>
                    <span className="service-arrow flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(29,58,47,.35)]"><Icon className="h-4 w-4" /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[var(--ink)] px-5 py-24 text-[var(--paper)] md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
              <div className="reveal">
                <p className="eyebrow mb-8 text-[var(--coral-soft)]">Our approach</p>
                <h2 className="display-lg max-w-[760px] font-display">A little more<br /><span className="serif-italic text-[var(--coral-soft)]">thinking.</span><br />A lot less guessing.</h2>
              </div>
              <div className="reveal delay-1 flex items-end">
                <p className="max-w-[390px] text-[1.08rem] leading-[1.65] text-[rgba(238,232,220,.72)]">We borrow the best from two worlds: the disciplined craft of direct response and the pace, fluency and testing culture of modern platforms.</p>
              </div>
            </div>
            <div className="mt-24 grid gap-10 border-t border-[rgba(238,232,220,.25)] pt-8 md:grid-cols-3">
              {[
                ['01', 'Find the signal', 'We start with the business truth — your margins, your buyers, your unfair advantage.'],
                ['02', 'Make the case', 'Then we build a simple, persuasive story and put it in front of the right people.'],
                ['03', 'Earn the next click', 'Every week brings a sharper read on what works, what does not, and where to go next.'],
              ].map(([number, title, copy], index) => (
                <div className={`reveal ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`} key={number}>
                  <span className="font-mono-ui text-[.68rem] text-[var(--coral-soft)]">{number}</span>
                  <h3 className="mt-10 font-display text-[2rem]">{title}</h3>
                  <p className="mt-4 max-w-[290px] text-[.9rem] leading-[1.6] text-[rgba(238,232,220,.6)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-7 text-[var(--coral)]">Selected results</p>
                <h2 className="display-md max-w-[590px] font-display">Proof is a better pitch.</h2>
              </div>
              <p className="max-w-[250px] text-[.86rem] leading-[1.5] text-[rgba(29,58,47,.62)]">A few businesses we have helped find a more profitable version of their attention.</p>
            </div>
            <div className="mt-16 grid gap-5 md:grid-cols-[1.15fr_.85fr]">
              <article className="case-card reveal relative min-h-[430px] overflow-hidden bg-[var(--ink)] p-7 text-[var(--paper)] md:p-10" data-testid="card-result-evergreen">
                <div className="case-mark absolute -right-14 -top-16 h-64 w-64 rounded-full border-[30px] border-[var(--coral)] opacity-90" />
                <div className="case-mark absolute right-10 top-20 h-32 w-32 rounded-full border border-[var(--paper)] opacity-30" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between"><span className="eyebrow text-[var(--coral-soft)]">Evergreen House / DTC</span><ArrowUpRight className="h-5 w-5 text-[var(--coral-soft)]" /></div>
                  <div>
                    <p className="font-mono-ui text-[3.6rem] leading-none tracking-[-.08em] text-[var(--coral-soft)] md:text-[5rem]">3.8<span className="text-[1.6rem] tracking-normal">x</span></p>
                    <p className="mt-3 max-w-[270px] font-display text-[1.65rem] leading-[1.05]">return on ad spend, held for 9 straight months.</p>
                  </div>
                </div>
              </article>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
                <article className="case-card reveal delay-1 flex min-h-[205px] flex-col justify-between bg-[var(--paper-deep)] p-7" data-testid="card-result-northstar">
                  <div className="flex justify-between"><span className="eyebrow text-[rgba(29,58,47,.58)]">Northstar / SaaS</span><ArrowUpRight className="h-5 w-5" /></div>
                  <div><p className="font-mono-ui text-4xl tracking-[-.07em] text-[var(--coral)]">−42%</p><p className="mt-2 font-display text-[1.4rem] leading-none">cost per qualified lead</p></div>
                </article>
                <article className="case-card reveal delay-2 flex min-h-[205px] flex-col justify-between border border-[rgba(29,58,47,.3)] p-7" data-testid="card-result-morrow">
                  <div className="flex justify-between"><span className="eyebrow text-[rgba(29,58,47,.58)]">Morrow &amp; Field / Retail</span><ArrowUpRight className="h-5 w-5" /></div>
                  <div><p className="font-mono-ui text-4xl tracking-[-.07em] text-[var(--coral)]">+64%</p><p className="mt-2 font-display text-[1.4rem] leading-none">new customer revenue</p></div>
                </article>
              </div>
            </div>
            <div className="reveal mt-20 grid gap-8 border-t hairline pt-8 md:grid-cols-[1fr_2fr] md:items-start">
              <Quote className="h-8 w-8 text-[var(--coral)]" />
              <div><blockquote className="max-w-[760px] font-display text-[2rem] leading-[1.05] tracking-[-.03em] md:text-[3.2rem]">“They brought a level of clarity we had been missing. The numbers got better because the decisions got better.”</blockquote><p className="eyebrow mt-7 text-[rgba(29,58,47,.58)]">Maya Chen — Founder, Evergreen House</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--ink)] bg-[var(--paper-deep)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-[.7fr_1.3fr]">
            <p className="eyebrow text-[var(--coral)]">A note from the desk</p>
            <p className="reveal font-display text-[2.2rem] leading-[1.02] tracking-[-.035em] md:text-[3.8rem]">“If your ads are not making the business easier to run, they are not doing their job.”</p>
          </div>
        </section>

        <section id="contact" className="bg-[var(--coral)] px-5 py-24 text-[var(--ink)] md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_.75fr]">
              <div className="reveal">
                <p className="eyebrow mb-8">Your next chapter</p>
                <h2 className="display-lg max-w-[700px] font-display">Let’s make<br /><span className="serif-italic">attention</span><br />pay rent.</h2>
                <p className="mt-8 max-w-[380px] text-[1rem] leading-[1.55] text-[rgba(29,58,47,.76)]">Tell us where you are, where you want to go, and what is getting in the way. We will come back with a considered point of view.</p>
              </div>
              <div className="reveal delay-1">
                {submitted ? (
                  <div className="border-t border-[rgba(29,58,47,.55)] pt-7" data-testid="status-contact-success">
                    <Check className="h-10 w-10" />
                    <h3 className="mt-8 font-display text-4xl">Message received.</h3>
                    <p className="mt-4 max-w-[350px] leading-[1.6] text-[rgba(29,58,47,.72)]">Thank you for putting it on our desk. We will be in touch within two working days.</p>
                    <button onClick={() => setSubmitted(false)} className="button-outline mt-8 rounded-full border border-[var(--ink)] px-5 py-3 text-[.68rem] font-bold uppercase tracking-[.13em]" data-testid="button-send-another">Send another note</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="border-t border-[rgba(29,58,47,.55)] pt-2" data-testid="form-contact">
                    <label className="block border-b border-[rgba(29,58,47,.35)] py-5"><span className="eyebrow block mb-3 opacity-60">Your name</span><input required name="name" className="input-field w-full bg-transparent py-1 text-lg" placeholder="How should we address you?" data-testid="input-name" /></label>
                    <label className="block border-b border-[rgba(29,58,47,.35)] py-5"><span className="eyebrow block mb-3 opacity-60">Email</span><input required type="email" name="email" className="input-field w-full bg-transparent py-1 text-lg" placeholder="you@yourcompany.com" data-testid="input-email" /></label>
                    <label className="block border-b border-[rgba(29,58,47,.35)] py-5"><span className="eyebrow block mb-3 opacity-60">What are we solving?</span><textarea required name="message" rows={3} className="input-field w-full resize-none bg-transparent py-1 text-lg" placeholder="A little context goes a long way." data-testid="input-message" /></label>
                    <button type="submit" className="button-ink mt-8 inline-flex items-center rounded-full bg-[var(--ink)] px-6 py-4 text-[.7rem] font-bold uppercase tracking-[.13em] text-[var(--paper)]" data-testid="button-submit-contact">Send the brief <ArrowUpRight className="ml-3 h-4 w-4" /></button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--ink)] px-5 py-10 text-[var(--paper)] md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div><button onClick={() => scrollTo('top')} className="flex items-center gap-3" data-testid="button-footer-logo"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper)] font-display text-lg italic">C</span><span className="font-display text-xl">Click <span className="text-[var(--coral-soft)]">&amp;</span> Convert</span></button><p className="mt-7 max-w-[260px] text-[.82rem] leading-[1.5] text-[rgba(238,232,220,.56)]">A growth partner for brands with something worth saying.</p></div>
            <div><p className="eyebrow mb-5 text-[var(--coral-soft)]">Explore</p><button onClick={() => scrollTo('services')} className="mb-3 block text-left text-sm hover:text-[var(--coral-soft)]" data-testid="footer-link-services">Services</button><button onClick={() => scrollTo('approach')} className="mb-3 block text-left text-sm hover:text-[var(--coral-soft)]" data-testid="footer-link-approach">Approach</button><button onClick={() => scrollTo('results')} className="block text-left text-sm hover:text-[var(--coral-soft)]" data-testid="footer-link-results">Results</button></div>
            <div><p className="eyebrow mb-5 text-[var(--coral-soft)]">Say hello</p><a href="mailto:hello@clickandconvert.co" className="block text-sm hover:text-[var(--coral-soft)]" data-testid="link-email">hello@clickandconvert.co</a><p className="mt-3 text-sm text-[rgba(238,232,220,.56)]">New York · London · Everywhere</p></div>
          </div>
          <div className="mt-16 flex flex-col justify-between gap-3 border-t border-[rgba(238,232,220,.22)] pt-5 text-[.64rem] uppercase tracking-[.13em] text-[rgba(238,232,220,.46)] md:flex-row"><span>© 2024 Click &amp; Convert</span><span>Good work travels</span></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
