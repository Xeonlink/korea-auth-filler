import { useState } from "react";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false),

   open = () => setIsOpen(true),
   close = () => setIsOpen(false);

  return { isOpen, open, close };
}
