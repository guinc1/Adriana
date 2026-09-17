import { motion } from "framer-motion";
import { MapPin, Clock, Monitor, ArrowUpRight } from "lucide-react";
import { ADDRESS, ADDRESS_LINE, GOOGLE_MAPS_URL, WHATSAPP } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";

const ease = [0.22, 1, 0.36, 1] as const;

const infos = [
  {
    icon: MapPin,
    title: `${ADDRESS.neighborhood} · ${ADDRESS.city}`,
    text: `${ADDRESS_LINE} — próximo à região do Barreiro`,
    href: GOOGLE_MAPS_URL,
  },
  { icon: Monitor, title: "Online", text: "Atendimento online mediante agendamento" },
  {
    icon: Clock,
    title: "Horários",
    text: "[A PREENCHER] Horários de atendimento — agende pelo WhatsApp",
  },
];

export function Contact() {
  return (
    <section id="contato" className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] bg-gradient-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contato" index="08" className="mb-14 md:mb-20" />

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* LEFT — call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-7"
          >
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-foreground mb-6">
              O primeiro passo
              <br />
              <span className="italic font-light text-accent-gradient">é uma conversa.</span>
            </h2>

            <p className="max-w-lg text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-10">
              Agende sua primeira sessão pelo WhatsApp. Respondo pessoalmente, com atenção e
              discrição.
            </p>

            <a
              href={WHATSAPP.agendar}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-accent text-background px-7 py-4 text-xs md:text-sm tracking-[0.04em] shadow-accent hover:scale-[1.02] transition-transform duration-500"
            >
              Entrar em contato no WhatsApp
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </a>
          </motion.div>

          {/* RIGHT — info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="md:col-span-5 glass-card accent-border p-2"
          >
            <div className="relative z-10 divide-y divide-border">
              {infos.map(({ icon: Icon, title, text, href }) => {
                const inner = (
                  <>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-accent text-background shadow-accent">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-lg text-foreground">{title}</span>
                        {href && (
                          <ArrowUpRight
                            size={15}
                            className="text-accent-gradient transition-transform duration-300 group-hover:rotate-45"
                          />
                        )}
                      </div>
                      <div className="text-xs leading-relaxed text-muted-foreground tracking-wide">
                        {text}
                      </div>
                    </div>
                  </>
                );

                return href ? (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-5 p-6 md:p-7 transition-colors hover:bg-foreground/[0.03]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={title} className="flex items-start gap-5 p-6 md:p-7">
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
