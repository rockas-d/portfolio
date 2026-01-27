"use client";

import { LenisProvider } from "./lenis-provider";
import { MotionProvider } from "./motion-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <LenisProvider>{children}</LenisProvider>
    </MotionProvider>
  );
}
