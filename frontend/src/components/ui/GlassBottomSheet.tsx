import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';

interface GlassBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * A mobile-first bottom sheet with glass styling and smooth animation.
 * Used for advanced filters, forms, and detail panels on mobile.
 */
const GlassBottomSheet: React.FC<GlassBottomSheetProps> = ({ open, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[1000] max-h-[85vh] overflow-y-auto rounded-t-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>
            
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
                <h3 className="font-black text-lg text-slate-800 tracking-tight">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Close fontSize="small" />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="px-6 py-4 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlassBottomSheet;
