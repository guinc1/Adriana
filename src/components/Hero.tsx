import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/adriana-hero.webp";
import heroImgMobile from "@/assets/adriana-hero-mobile.webp";
import { WHATSAPP } from "@/lib/constants";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink [--hero-anchor:7rem] md:[--hero-anchor:8rem]"
    >
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroImgMobile} />
          <img
            src={heroImg}
            alt="Adriana Azevedo, psicóloga clínica — atendimento presencial no Lindéia, em Belo Horizonte, e online"
            className="h-full w-full object-cover object-[60%_center] md:object-center"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
        <div className="absolute inset-0 bg-gradient-glow opacity-60" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute top-[var(--hero-anchor)] inset-x-0 z-10 flex items-center justify-center gap-3 px-6 text-center"
      >
        <span className="h-px w-8 bg-accent-light/70" />
        <span className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-background/80">
          Psicologia Clínica · Presencial e Online
        </span>
        <span className="h-px w-8 bg-accent-light/70" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full items-end md:items-center md:pt-[var(--hero-anchor)]"
      >
        <div className="mx-auto max-w-7xl w-full px-6 md:px-10 pb-24 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-background text-[clamp(2.45rem,min(6.5vw,calc((100svh_-_var(--hero-anchor))*0.1)),5.15rem)] leading-[0.95] font-medium">
              Seja protagonista
              <br />
              da sua própria
              <br />
              <span className="italic text-accent-light">história</span>
              <span className="text-accent-light">.</span>
            </h1>

            <p className="mt-6 md:mt-8 max-w-xl text-background/80 text-base md:text-lg font-light leading-relaxed">
              Mais de quatorze anos de experiência clínica em um espaço seguro para a autodescoberta
              e o crescimento pessoal. Psicoterapia para adolescentes, adultos e famílias —
              presencial no Lindéia, em Belo Horizonte, e online.
            </p>

            <div className="mt-8 md:mt-10 flex flex-nowrap md:flex-wrap items-stretch gap-2.5 md:gap-3">
              <a
                href={WHATSAPP.agendar}
                target="_blank"
                rel="noreferrer"
                className="group flex-1 md:flex-none inline-flex items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-accent text-background px-4 md:px-7 py-3.5 md:py-4 text-[11px] md:text-sm tracking-[0.04em] whitespace-nowrap shadow-accent hover:scale-[1.02] transition-transform duration-500"
              >
                Agendar atendimento
                <ArrowRight
                  size={16}
                  className="shrink-0 transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#sobre"
                className="glass flex-1 md:flex-none inline-flex items-center justify-center rounded-full px-4 md:px-7 py-3.5 md:py-4 text-[11px] md:text-sm tracking-[0.04em] whitespace-nowrap text-background hover:bg-background/15 transition-colors"
              >
                Conheça minha história
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-center text-background/70"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          ↓
        </motion.span>
        <span className="text-[10px] tracking-[0.4em] uppercase">Role para descobrir</span>
      </motion.div>
    </section>
  );
}
