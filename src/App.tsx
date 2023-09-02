import { motion, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

import { useFramerCanvas } from './hooks';

const createImage = (src: string) => {
  const img = document.createElement('img');
  img.src = src;
  return img;
};

const SpatialAudioSection = () => {
  const keyframes = useMemo(
    () =>
      [...new Array(215)].map((_, i) =>
        createImage(
          `https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/spatial-audio/large/${i
            .toString()
            .padStart(4, '0')}.jpg`,
        ),
      ),
    [],
  );

  const containerRef = useRef<HTMLElement>(null);
  const [progress, canvasRef] = useFramerCanvas({
    keyframes: keyframes,
    scrollOptions: {
      target: containerRef,
      offset: ['start start', 'end end'],
    },
  });

  // We know that the entire animation spans across 4 screen height.
  const opacity = useTransform(progress, [0, 0.25, 0.5], [0, 1, 0]);
  const scale = useTransform(progress, [0, 0.25, 0.5], [0.95, 1, 1.2]);

  return (
    <section ref={containerRef} className="h-[400vh]">
      <div className="sticky top-0">
        <motion.div
          style={{ scaleX: progress }}
          className="absolute top-0 z-10 h-2 w-full origin-left bg-white"
        />
        <canvas ref={canvasRef} className="absolute inset-0 block" />
        <div className="mx-auto flex h-screen max-w-6xl items-center justify-center px-12">
          <motion.h1
            style={{ opacity, scale }}
            className="text-center text-4xl font-semibold text-white md:text-7xl"
          >
            With Personalised Spatial Audio that places sound all around you,
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

const BatterySection = () => {
  const keyframes = useMemo(
    () =>
      [...new Array(54)].map((_, i) =>
        createImage(
          `https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/battery/large/${i
            .toString()
            .padStart(4, '0')}.jpg`,
        ),
      ),
    [],
  );

  const containerRef = useRef<HTMLElement>(null);
  const [progress, canvasRef] = useFramerCanvas({
    keyframes: keyframes,
    scrollOptions: {
      target: containerRef,
      offset: ['start start', 'end end'],
    },
  });

  // We know that the entire animation spans across 2 screen height.
  const opacity = useTransform(progress, [0, 0.125, 0.25], [0, 1, 0]);
  const scale = useTransform(progress, [0, 0.125, 0.25], [0.95, 1, 1.2]);

  return (
    <section ref={containerRef} className="h-[200vh]">
      <div className="sticky top-0">
        <motion.div
          style={{ scaleX: progress }}
          className="absolute top-0 z-10 h-2 w-full origin-left bg-white"
        />
        <canvas ref={canvasRef} className="absolute inset-0 block" />
        <div className="mx-auto flex h-screen max-w-6xl items-center justify-center px-12">
          <motion.h1
            style={{ opacity, scale }}
            className="text-center text-4xl font-semibold text-white md:text-7xl"
          >
            Adaptive EQ that tunes music to your ears,
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <main>
    <div className="overflow-clip">
      <SpatialAudioSection />
      <BatterySection />
    </div>
  </main>
);

export default App;
