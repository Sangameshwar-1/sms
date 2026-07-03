import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

/**
 * Centered modal dialog with glass styling.
 * For forms, confirmations, and detail views.
 */
const GlassModal: React.FC<GlassModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = '500px',
}) => {
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
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] rounded-3xl overflow-hidden"
            style={{
              maxWidth,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Close fontSize="small" />
                </button>
              </div>
            )}
            {/* Content */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlassModal;
