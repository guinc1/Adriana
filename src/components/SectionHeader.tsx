import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type SectionHeaderProps = {
  eyebrow: string;
  index: string;
  className?: string;
};

/**
 * Cabeçalho editorial compartilhado: rótulo (eyebrow) + régua + índice numérico.
 * Define a linguagem de layout das seções de conteúdo do site.
 */
export function SectionHeader({ eyebrow, index, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className={`flex items-center gap-4 border-b border-border pb-6 ${className}`}
    >
      <span className="text-[10px] tracking-[0.5em] uppercase text-accent-gradient">{eyebrow}</span>
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{index}</span>
    </motion.div>
  );
}
