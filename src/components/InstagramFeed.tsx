import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { INSTAGRAM_URL } from "@/lib/constants";

type Post = {
  src: string;
  alt: string;
};

// Arquivos esperados em /public/instagram/ (formato 4:5, 1080x1350).
// [A PREENCHER] Substituir pelas publicações da Adriana e ajustar os textos alternativos.
const posts: Post[] = [
  {
    src: "/instagram/post-1.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
  {
    src: "/instagram/post-2.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
  {
    src: "/instagram/post-3.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
  {
    src: "/instagram/post-4.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
  {
    src: "/instagram/post-5.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
  {
    src: "/instagram/post-6.jpg",
    alt: "Publicação do Instagram da psicóloga Adriana Azevedo (placeholder)",
  },
];

// Duplicamos a lista para o loop contínuo emendar sem "salto".
const loopPosts = [...posts, ...posts];

const SCROLL_SPEED = 0.2; // px por frame (~30px/s em 60fps)

export function InstagramFeed() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  // Posição acumulada em float — scrollLeft arredonda na leitura, então
  // guardamos a posição aqui para somar incrementos menores que 1px.
  const posRef = useRef(0);

  // Auto-scroll contínuo com loop perfeito.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respeita quem desativou animações no sistema.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    posRef.current = track.scrollLeft;
    let raf = 0;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += SCROLL_SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        track.scrollLeft = posRef.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const resume = () => {
    // Ressincroniza com a posição real (caso o usuário tenha arrastado).
    if (trackRef.current) posRef.current = trackRef.current.scrollLeft;
    pausedRef.current = false;
  };
  // Pausa durante uma interação e retoma depois de um instante.
  const pauseThenResume = () => {
    pause();
    resumeTimer.current = window.setTimeout(resume, 2500);
  };

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: "smooth" });
    pauseThenResume();
  };

  return (
    <section id="instagram" className="relative py-28 md:py-40 overflow-hidden">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl mb-12 md:mb-16">
          <SectionHeader eyebrow="No Instagram" index="07" className="mb-10 md:mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-foreground">
              Reflexões que
              <br />
              <span className="italic font-light text-accent-gradient">circulam por aí.</span>
            </h2>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start md:self-end shrink-0 text-sm text-foreground"
            >
              <span className="border-b border-accent/40 pb-1 transition-colors group-hover:border-accent group-hover:text-accent-gradient">
                Seguir no Instagram
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={pauseThenResume}
          className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopPosts.map((post, i) => (
            <a
              key={`${post.src}-${i}`}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-hidden={i >= posts.length}
              tabIndex={i >= posts.length ? -1 : undefined}
              className="group relative shrink-0 w-[72vw] sm:w-[44vw] md:w-[30vw] lg:w-[22rem] aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-elevated"
            >
              <img
                src={post.src}
                alt={i < posts.length ? post.alt : ""}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Navegação — apenas desktop */}
        <div className="hidden md:flex items-center gap-3 mt-8 px-10 mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-secondary/60 hover:border-accent/40"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-secondary/60 hover:border-accent/40"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
