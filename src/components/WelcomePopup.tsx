import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Mostra o popup uma vez por sessão. Versione a chave para reexibir após mudanças.
const WELCOME_KEY = "adrianaazevedo_welcome_v1";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(WELCOME_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(WELCOME_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-ink/40 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong accent-border relative max-w-md w-full rounded-3xl p-9 md:p-10 text-center"
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full hover:bg-foreground/5 text-foreground/60"
            >
              <X size={16} />
            </button>

            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent-gradient">
                Bem-vinda
              </span>
              <span className="h-px w-6 bg-accent" />
            </div>

            <h3 className="font-display text-3xl md:text-4xl leading-tight text-foreground mb-4">
              Olá, <span className="italic text-accent-gradient">Adriana</span>.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-4">
              É com muito carinho que apresentamos a prévia do
              <span className="text-foreground"> seu novo site!</span> Um espaço digital tão
              acolhedor quanto a sua escuta.
            </p>
            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-4">
              Os textos nasceram a partir das suas próprias palavras. A assinatura no topo da
              página, a seção de formação e os horários de atendimento estão provisórios, aguardando
              as suas informações.
            </p>
            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-7">
              Tudo pode ser ajustado com o seu conteúdo definitivo. Fique à vontade para explorar e
              dar seu feedback!
            </p>

            <button
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-accent text-background px-7 py-3.5 text-xs tracking-[0.04em] shadow-accent hover:scale-[1.02] transition-transform"
            >
              Conhecer meu site
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
