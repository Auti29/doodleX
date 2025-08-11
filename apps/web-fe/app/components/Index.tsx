import { PenTool, MousePointer, Share2, Zap } from "lucide-react";
import Link from "next/link";
const Index = () => {


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "doodleX",
    applicationCategory: "GraphicsApplication",
    operatingSystem: "Web",
    description:
      "doodleX is a minimal, fast collaborative whiteboard for sketching ideas with beautiful simplicity.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <header className="w-full border-b">
        <nav className="container flex items-center justify-between py-5">
          <a href="/" className="flex items-center gap-2" aria-label="doodleX home">
            <span className="text-lg font-semibold tracking-tight">doodleX</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <Link href="/signin">
            <button>
              Sign in
            </button>
            </Link>
            <Link href="/signup">
            <button>
              Sign up
            </button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="container py-16 animate-fade-in">
          <article className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-5xl md:text-6xl leading-[1.1] tracking-tight mb-5">
              doodleX — Minimal Collaborative Whiteboard
            </h1>
            <p className="text-lg text-muted-foreground mb-7">
              Quick sketches, clean canvas, zero distraction. A lightweight collaborative whiteboard designed for clarity and speed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button>
                Open Editor
              </button>
              <button>
                <a href="#features">See Features</a>
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No sign‑up required at launch.</p>
          </article>
        </section>

        <section id="features" className="container py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-xl border p-6 transition-transform hover:scale-[1.02]">
              <PenTool className="mb-4 text-[hsl(var(--brand))]" />
              <h3 className="text-lg font-semibold mb-2">Beautiful primitives</h3>
              <p className="text-muted-foreground">
                Draw rectangles, circles, arrows and text with smooth handles and crisp snapping.
              </p>
            </div>
            <div className="group rounded-xl border p-6 transition-transform hover:scale-[1.02]">
              <MousePointer className="mb-4 text-[hsl(var(--brand))]" />
              <h3 className="text-lg font-semibold mb-2">Fluid UX</h3>
              <p className="text-muted-foreground">
                Minimal chrome, keyboard-first controls, and gentle animations that stay out of your way.
              </p>
            </div>
            <div className="group rounded-xl border p-6 transition-transform hover:scale-[1.02]">
              <Share2 className="mb-4 text-[hsl(var(--brand))]" />
              <h3 className="text-lg font-semibold mb-2">Share instantly</h3>
              <p className="text-muted-foreground">
                Export PNG/SVG or share a link. Your ideas, ready to move.
              </p>
            </div>
          </div>

          <div id="about" className="mt-12 rounded-xl border p-8 bg-muted/30">
            <div className="flex items-start gap-4">
              <Zap className="mt-0.5 text-[hsl(var(--brand))]" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Why doodleX?</h3>
                <p className="text-muted-foreground">
                  doodleX focuses on speed and serene simplicity — the perfect canvas when you just
                  need to think.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} doodleX • Built with care
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Index;