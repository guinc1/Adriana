import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
// [A SUBSTITUIR] Assinatura provisória — a cliente ainda não possui logo.
import logo from "@/assets/adriana-logo-placeholder.svg";
import logoLight from "@/assets/adriana-logo-light-placeholder.svg";
import { WHATSAPP } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Abordagem", href: "#abordagem" },
  { label: "Serviços", href: "#servicos" },
  { label: "Filosofia", href: "#manifesto" },
  { label: "Instagram", href: "#instagram" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // No topo o menu mobile não existe; ao deixar de rolar, garantimos que fique fechado.
  useEffect(() => {
    if (!scrolled) setOpen(false);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className="fixed top-3 inset-x-0 z-50 px-3"
    >
      <motion.div
        layout
        transition={{ duration: 0.55, ease }}
        className={`relative mx-auto max-w-6xl flex items-center rounded-full ${
          scrolled ? "justify-between py-2 px-4 md:px-5" : "justify-center py-3 px-5"
        }`}
      >
        {/* Fundo de vidro — aparece apenas com a rolagem */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-full glass accent-border transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Logo — desliza do centro para a esquerda */}
        <motion.a
          layout
          transition={{ duration: 0.55, ease }}
          href="#top"
          className="relative z-10 flex min-w-0 items-center gap-3"
        >
          {/* A assinatura já traz nome e CRP — dispensa texto ao lado.
              No topo a logo fica sobre a hero escura, então usamos a versão clara;
              com a rolagem o fundo vira vidro claro e voltamos à versão colorida. */}
          <span
            className={`relative inline-flex transition-all duration-500 ${
              scrolled ? "h-14" : "h-20 md:h-24"
            }`}
          >
            <img
              src={logoLight}
              alt="Adriana Azevedo — Psicóloga · CRP 04/37702"
              className={`h-full w-auto object-contain transition-opacity duration-500 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={logo}
              alt=""
              aria-hidden
              className={`absolute inset-y-0 left-0 h-full w-auto object-contain transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </motion.a>

        {/* Navegação — apenas com a rolagem */}
        <AnimatePresence initial={false}>
          {scrolled && (
            <motion.nav
              key="nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 hidden md:flex items-center gap-7"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[12px] tracking-[0.06em] text-foreground/75 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Ações (Agendar + menu mobile) — apenas com a rolagem */}
        <AnimatePresence initial={false}>
          {scrolled && (
            <motion.div
              key="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 flex items-center gap-2"
            >
              <a
                href={WHATSAPP.agendar}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center rounded-full bg-white/60 text-foreground px-5 py-2 text-[11px] tracking-[0.08em] ring-1 ring-foreground/10 hover:bg-white/80 transition-colors"
              >
                Agendar
              </a>
              <button
                aria-label="Menu"
                className="md:hidden h-9 w-9 grid place-items-center rounded-full text-foreground"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden glass-strong rounded-3xl mt-2 mx-3 p-6 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.08em] text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP.agendar}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white/60 text-foreground px-5 py-3 text-xs tracking-[0.08em] ring-1 ring-foreground/10"
            >
              Agendar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
