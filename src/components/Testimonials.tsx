import { animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const SLIDE_MS = 750;
const AUTOPLAY_MS = 5200;

type Testimonial = {
  quote: string;
  author: string;
};

// Avaliações públicas de 5 estrelas deixadas no perfil do Google.
const testimonials: Testimonial[] = [
  {
    quote:
      "Excelente profissional e pessoa. Atendimento em um ambiente muito tranquilo e confiável. Muito acolhedor.",
    author: "Amanda Maciel",
  },
  {
    quote:
      "Sou paciente há 3 anos e hoje, além da terapia individual, também faço a terapia de casal com a Adriana. Sou grata por todo o profissionalismo, atenção e carinho dispensados em todas as sessões, fora a boa vontade para acertar os melhores horários e atendimentos urgentes. Excelente profissional!",
    author: "Érica Aparecida",
  },
  {
    quote:
      "Ótimo atendimento, sempre me sinto bem ao sair da consulta, sinto total conforto e confiança, espaço agradável e tranquilo!",
    author: "Hengel Gabrielly",
  },
];

const total = testimonials.length;
// A lista é duplicada para o loop emendar sem "salto": o slide `total` é
// visualmente idêntico ao slide 0, então a volta ao início passa despercebida.
const slides = [...testimonials, ...testimonials];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} className="fill-accent text-accent" aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const indexRef = useRef(0);
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // As larguras dos cards são definidas em CSS (responsivas); medimos a posição
  // real de cada um para que o deslocamento funcione em qualquer breakpoint.
  const measure = useCallback(() => {
    offsetsRef.current = itemRefs.current.map((el) => el?.offsetLeft ?? 0);
  }, []);

  const go = useCallback(
    (next: number) => {
      measure();
      indexRef.current = next;
      setActive(((next % total) + total) % total);
      animate(x, -(offsetsRef.current[next] ?? 0), {
        duration: SLIDE_MS / 1000,
        ease,
        onComplete: () => {
          if (indexRef.current >= total) {
            indexRef.current -= total;
            x.set(-(offsetsRef.current[indexRef.current] ?? 0));
          }
        },
      });
    },
    [measure, x],
  );

  const goNext = useCallback(() => go(indexRef.current + 1), [go]);

  const goPrev = useCallback(() => {
    // No início, saltamos para o clone equivalente antes de voltar um slide.
    if (indexRef.current <= 0) {
      measure();
      indexRef.current = total;
      x.set(-(offsetsRef.current[total] ?? 0));
    }
    go(indexRef.current - 1);
  }, [go, measure, x]);

  useEffect(() => {
    measure();
    const onResize = () => {
      measure();
      x.set(-(offsetsRef.current[indexRef.current] ?? 0));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, x]);

  useEffect(() => {
    if (paused) return;
    // Respeita quem desativou animações no sistema — a navegação manual continua.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, goNext]);

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] bg-gradient-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow="Depoimentos" index="05" className="mb-14 md:mb-20" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-4xl md:text-6xl leading-[1.02] text-foreground max-w-3xl mb-16 md:mb-20"
        >
          Quem já passou por aqui,
          <br />
          <span className="italic font-light text-accent-gradient">recomenda o caminho.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* O padding vertical dá folga para a sombra dos cards dentro da área recortada. */}
          <div
            className="overflow-hidden py-4 -my-4"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Avaliações de pacientes no Google"
          >
            <motion.div style={{ x }} className="relative flex items-stretch gap-6">
              {slides.map((t, i) => {
                const clone = i >= total;
                return (
                  <a
                    key={`${t.author}-${i}`}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-hidden={clone}
                    tabIndex={clone ? -1 : undefined}
                    className="glass-card accent-border group shrink-0 w-[86%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] flex flex-col justify-between gap-8 p-8 md:p-9 transition-shadow duration-500 hover:shadow-elevated"
                  >
                    <div className="relative z-10">
                      <Stars />
                      <span className="font-display text-6xl text-accent/15 leading-none select-none block -mb-4 mt-1">
                        &ldquo;
                      </span>
                      <p className="font-display italic text-lg md:text-xl leading-[1.3] text-foreground">
                        {t.quote}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-baseline gap-4 pt-6 border-t border-border/60">
                      <span className="font-display text-xs text-accent-gradient tabular-nums shrink-0">
                        {String((i % total) + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="text-sm text-foreground font-medium block">
                          {t.author}
                        </span>
                        <span className="text-xs text-muted-foreground font-light">
                          Avaliação no Google
                        </span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Controles — setas e indicadores */}
          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Avaliação anterior"
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
                onClick={goNext}
                aria-label="Próxima avaliação"
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

            <div className="flex items-center gap-2.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para a avaliação ${i + 1} de ${total}`}
                  aria-current={active === i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active === i ? "w-7 bg-gradient-accent" : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-gradient-accent text-background px-7 py-4 text-xs md:text-sm tracking-[0.04em] shadow-accent hover:scale-[1.02] transition-transform duration-500"
          >
            <Star size={16} className="fill-current" />
            Avaliar no Google
          </a>
          <p className="text-xs text-muted-foreground/60 font-light">
            Avaliações públicas deixadas por pacientes no Google. Já é paciente? Sua avaliação
            também ajuda outras pessoas a chegarem até aqui.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
