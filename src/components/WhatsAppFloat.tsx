import { motion } from "framer-motion";
import { WHATSAPP } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP.default}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-accent shadow-accent grid place-items-center"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-background" aria-hidden="true">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.345 0 1.318-.13 1.59-.144.715-.244 1.346-1.346 1.346-1.85 0-.117 0-.245-.058-.345-.157-.288-.844-.345-1.118-.444zM16 .79C7.6.79.788 7.6.788 16c0 2.873.802 5.674 2.32 8.103L.118 32l8.05-2.575C10.515 30.79 13.225 31.21 16 31.21 24.4 31.21 31.21 24.4 31.21 16S24.4.79 16 .79zm0 27.952c-2.46 0-4.876-.66-6.997-1.92l-.5-.302-5.196 1.663 1.683-5.058-.33-.516a12.825 12.825 0 0 1-1.99-6.81c0-7.106 5.78-12.886 12.887-12.886 7.106 0 12.886 5.78 12.886 12.886 0 7.107-5.78 12.887-12.886 12.887z" />
      </svg>
    </motion.a>
  );
}
