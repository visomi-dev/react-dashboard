import { useEffect, useLayoutEffect, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { uiStore as ui } from '@/stores/ui';

export function PageNavigationLoader() {
  const loading = ui.use.loading();
  const setLoading = ui.use.setLoading();
  const location = useLocation();
  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    setLoading(true);
  }, [location]);

  useEffect(() => {
    startTransition(() => {
      setLoading(false);
    });
  }, [location]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="background"
          className="fixed left-0 top-0 z-40 h-screen w-screen bg-white bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="indicator"
            className="fixed top-0 z-50 h-1 w-1/4 rounded bg-primary"
            initial={{ x: '-100%' }}
            animate={{ x: '100vw' }}
            transition={{ ease: 'linear', duration: 1, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
