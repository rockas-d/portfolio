"use client";

import dynamic from "next/dynamic";

const Blob = dynamic(() => import("@/components/ui/blob").then((mod) => mod.Blob), {
  ssr: false,
});

export function HeroBlob() {
  return (
    <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
      <Blob />
    </div>
  );
}
