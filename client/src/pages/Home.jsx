import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import AboutFifa from '../components/AboutFifa';
import FlagMarquee from '../components/FlagMarquee';
import ExploreFeatures from '../components/ExploreFeatures';

/**
 * Home — Main homepage after nation selection.
 * Hero slideshow + About FIFA + Flag marquee + Explore Features.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-deep overflow-hidden">
      <HeroSlideshow />
      <AboutFifa />
      <FlagMarquee />
      <ExploreFeatures />
    </main>
  );
}