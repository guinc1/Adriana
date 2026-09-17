import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const ease = [0.22, 1, 0.36, 1] as const;

const pilares = [
  "Escuta acolhedora e sem julgamentos",
  "Ética profissional e sigilo",
  "Um espaço seguro em cada encontro",
  "Atenção a mulheres e questões de gênero",
  "Autoconhecimento e autocuidado",
  "Atendimento presencial e online",
];

export function Approach() {
  return (
    <section id="abordagem" className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] bg-gradient-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow="Abordagem" index="03" className="mb-14 md:mb-20" />

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-5 md:sticky md:top-28"
          >
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground">
              Um espaço seguro.
              <br />
              <span className="italic font-light text-accent-gradient">Uma escuta atenta.</span>
              <br />
              Sua história no centro.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="md:col-span-7 space-y-7 text-base md:text-lg text-muted-foreground leading-relaxed font-light"
          >
            <p>
              Minha prática parte de uma ideia simples: você é quem melhor conhece a própria
              experiência. Meu papel não é dizer o que você deve sentir, mas sustentar um{" "}
              <span className="text-foreground">espaço seguro</span> em que o que você sente possa,
              enfim, ser dito — com acolhimento e{" "}
              <span className="text-foreground">sem julgamentos</span>.
            </p>
            <p>
              A terapia é o caminho da{" "}
              <span className="text-foreground">autodescoberta e do crescimento pessoal</span>: mais
              do que falar sobre a dor, caminhamos para compreender o que a sustenta e{" "}
              <span className="text-foreground">encontrar novos modos de se posicionar</span> diante
              dela. São mais de quatorze anos de experiência clínica — sempre com ética,
              responsabilidade e respeito ao seu tempo.
            </p>
          </motion.div>
        </div>

        {/* Pilares — grade numerada editorial */}
        <div className="mt-20 md:mt-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="text-[10px] tracking-[0.4em] uppercase text-accent-gradient mb-8"
          >
            Pilares da atuação
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-px">
            {pilares.map((pilar, i) => (
              <motion.div
                key={pilar}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="group flex items-baseline gap-5 border-t border-border py-6"
              >
                <span className="font-display text-sm text-accent-gradient tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg font-light text-foreground leading-snug transition-colors group-hover:text-accent-gradient">
                  {pilar}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
