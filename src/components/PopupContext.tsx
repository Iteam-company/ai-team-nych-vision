import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type PopupState = { isOpen: boolean; open: () => void; close: () => void };

const PopupContext = createContext<PopupState | null>(null);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error('usePopup must be used inside PopupProvider');
  return ctx;
}
