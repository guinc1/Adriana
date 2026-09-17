import { motion } from "framer-motion";
import portrait from "@/assets/adriana-portrait.webp";
import { SectionHeader } from "@/components/SectionHeader";

const specs = [
  { label: "Registro", value: "CRP 04/37702" },
  { label: "Experiência", value: "Mais de 14 anos de prática clínica" },
  { label: "Formato", value: "Presencial no Lindéia · BH · Online" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  return (
    <section
      id="sobre"
      className="relative py-28 md:py-40 px-6 md:px-10 bg-secondary/30 overflow-hidden"
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-gradient-glow opacity-50" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Sobre" index="01" className="mb-14 md:mb-20" />

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <h2 className="font-display text-4xl md:text-6xl leading-[1.04] text-foreground mb-8">
              Adriana Azevedo<span className="text-accent-gradient">.</span>
              <br />
              <span className="italic font-light text-3xl md:text-4xl text-muted-foreground">
                Psicóloga · CRP 04/37702
              </span>
            </h2>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
              <p>
                Sou Adriana, psicóloga <span className="text-foreground">(CRP 04/37702)</span> e
                consultora em saúde mental, com{" "}
                <span className="text-foreground">
                  mais de quatorze anos de experiência clínica
                </span>
                . Meu convite é simples e direto:{" "}
                <span className="text-foreground">
                  transforme sua vida e seja protagonista da sua história
                </span>
                .
              </p>
              <p>
                Ofereço um <span className="text-foreground">espaço seguro</span> para que cada
                pessoa percorra, através da terapia, o caminho da{" "}
                <span className="text-foreground">autodescoberta</span> e do crescimento pessoal.
                Com uma atenção diferenciada, foco na promoção da saúde mental — do controle da
                ansiedade ao manejo da sobrecarga emocional, do luto e do estresse às travessias do
                momento profissional, sempre com{" "}
                <span className="text-foreground">autoconhecimento e autocuidado</span> no centro.
              </p>
              <p>
                Atendo em <span className="text-foreground">psicoterapia para adolescentes,</span>{" "}
                <span className="text-foreground">adultos e famílias</span>, com dedicação especial
                a <span className="text-foreground">mulheres e questões de gênero</span>. O
                consultório fica no Lindéia, próximo à região do Barreiro, em Belo Horizonte — e os
                atendimentos online acontecem mediante agendamento.
              </p>
            </div>

            {/* spec / ficha técnica */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6 sm:gap-8">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="pt-4 border-t border-border"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-accent-gradient mb-2">
                    {s.label}
                  </div>
                  <div className="text-sm text-foreground font-light leading-snug">{s.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — portrait with overlapping quote */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-5 order-1 md:order-2 relative md:-mt-12"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-elevated aspect-[4/5]">
              <img
                src={portrait}
                alt="Retrato de Adriana Azevedo, psicóloga"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>

            {/* overlapping pull-quote */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="glass-card accent-border p-5 md:p-7 max-w-[13rem] md:max-w-[16rem] absolute bottom-4 right-4 md:bottom-5 md:right-5"
            >
              <div className="relative z-10">
                <span className="font-display text-5xl leading-none text-accent-gradient">“</span>
                <p className="font-display italic text-lg md:text-xl leading-snug text-foreground -mt-3">
                  Nenhuma história se transforma sozinha — mas nenhuma se transforma sem você.
                </p>
              </div>
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
