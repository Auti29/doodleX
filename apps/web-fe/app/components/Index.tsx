import { PenTool, MousePointer, Share2, Zap } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
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
      <header className="w-full border-b-3 border-gray-200 ">
        <nav className="container flex items-center justify-between py-5 overflow-y-hidden shadow-xl">
          <a href="/" className="flex items-center gap-2 ml-4" aria-label="doodleX home">
            <Logo />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm mr-6">
            <Link href={'/signup'}>
              <button className="border-0 rounded-md pt-2 pb-2 pl-4 pr-4 bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-400">
                Register
              </button>
              </Link>
              <Link href={'/signin'}>
                <button className="border-2 border-blue-600 rounded-md pt-2 pb-2 pl-4 pr-4 bg-gray-600 text-white font-bold cursor-pointer hover:bg-gray-400">
                Login
              </button>
              </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="container py-16 animate-fade-in">
          <article className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-5xl md:text-5xl leading-[1.1] tracking-tight mb-5 font-bold font-mono">
              <span className="decoration-blue-600 underline">doodle</span><span className="text-7xl text-blue-600">X</span> — Minimal Collaborative Whiteboard
            </h1>
            <p className="text-lg text-muted-foreground mb-7">
              Quick sketches, clean canvas, zero distraction. A lightweight collaborative whiteboard designed for clarity and speed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={'/signup'}>
              <button className="border-0 rounded-md pt-2 pb-2 pl-4 pr-4 bg-blue-600 text-white font-bold text-lg cursor-pointer hover:bg-blue-400">
                Register
              </button>
              </Link>
              <Link href={'/signin'}>
                <button className="border-2 border-blue-600 rounded-md pt-2 pb-2 pl-4 pr-4 bg-gray-600 text-white font-bold text-lg cursor-pointer hover:bg-gray-400">
                Login
              </button>
              </Link>

            </div>
            <p className="mt-4 text-sm text-muted-foreground font-bold decoration-3 underline">Start doodling now!</p>
          </article>
        </section>

        <section id="features" className="container py-10">
          <div className="grid gap-6 md:grid-cols-3 p-3">
            <div className="group rounded-xl border-2 p-6 transition-transform hover:scale-[1.02] shadow-xl border-gray-300">
              <div className="flex">
                <PenTool className="mb-4 text-[hsl(var(--brand))] mr-2" />
              <h3 className="text-lg font-bold mb-2 text-blue-600">Beautiful primitives</h3>
              </div>
              <p className="text-muted-foreground">
                Draw rectangles, circles, arrows and text with smooth handles and crisp snapping.
              </p>
            </div>
            <div className="group rounded-xl border-2 p-6 transition-transform hover:scale-[1.02] shadow-xl border-gray-300">
               <div className="flex">
              <MousePointer className="mb-4 text-[hsl(var(--brand))] mr-2" />
              <h3 className="text-lg mb-2 text-blue-600 font-bold">Fluid UX</h3>
              </div>
              <p className="text-muted-foreground">
                Minimal chrome, keyboard-first controls, and gentle animations that stay out of your way.
              </p>
            </div>
            <div className="group rounded-xl border-2 p-6 transition-transform hover:scale-[1.02] shadow-xl border-gray-300">
               <div className="flex">
              <Share2 className="mb-4 text-[hsl(var(--brand))] mr-2" />
              <h3 className="text-lg font-bold mb-2 text-blue-600">Share instantly</h3>
              </div>
              <p className="text-muted-foreground">
                Export PNG/SVG or share a link. Your ideas, ready to move.
              </p>
            </div>
          </div>

          <div id="about" className="mt-12 rounded-xl border border-gray-300 p-8 bg-muted/30 ml-3 mr-3 shadow-xl">
            <div className="flex items-start gap-4">
              <Zap className="mt-0.5 text-[hsl(var(--brand))]" />
              <div>
                <h3 className="text-lg font-bold mb-1 text-blue-600">Why doodleX?</h3>
                <p className="text-muted-foreground">
                  doodleX focuses on speed and serene simplicity — the perfect canvas when you just
                  need to think.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-3 shadow-lg border-gray-300">
        <div className="container py-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} doodleX • Built by someone who is in your heart
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