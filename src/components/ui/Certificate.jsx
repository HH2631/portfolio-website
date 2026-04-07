import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

export default function Certificate({ ImgSertif, title, description }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail card with flip/hover effect */}
      <div
        className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[rgba(255,255,255,0.06)] hover:border-[rgba(108,99,255,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.08)]"
        onClick={() => setOpen(true)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={ImgSertif}
            alt={title || 'Certificate'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-sm text-white">
              <Maximize2 className="w-4 h-4" />
              View
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-[rgba(18,18,26,0.6)]">
          {title && <h4 className="text-sm font-semibold text-white mb-0.5 line-clamp-1">{title}</h4>}
          {description && <p className="text-xs text-[#8B8B9E] line-clamp-1">{description}</p>}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-[#0A0A0F]/90 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:bg-[rgba(108,99,255,0.2)] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={ImgSertif}
                alt={title || 'Certificate Full View'}
                className="block max-w-full max-h-[85vh] rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
