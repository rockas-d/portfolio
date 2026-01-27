"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import {
  Hero,
  FeaturedWork,
  Services,
  AboutPreview,
} from "@/components/sections";
import { Preloader, MouseTracker, CustomCursor } from "@/components/ui";
import { HeroBlob } from "@/components/ui/hero-blob";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          <CustomCursor />
          <MouseTracker />
          <div className="relative z-10 bg-background overflow-x-clip mb-200">
            <HeroBlob />
            <Header />
            <main>
              <Hero />
              <FeaturedWork />
              <Services />
              <AboutPreview />
            </main>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
