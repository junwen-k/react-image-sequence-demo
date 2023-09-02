import {
  type SpringOptions,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export interface UseFramerCanvasProps {
  keyframes: HTMLImageElement[];
  scrollOptions?: any;
  springConfig?: SpringOptions;
}

const useFramerCanvas = ({
  keyframes,
  scrollOptions,
  springConfig = {
    damping: 50,
    stiffness: 300,
    restSpeed: 0.5,
    restDelta: 0.001,
  },
}: UseFramerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll(scrollOptions);
  const progress = useSpring(scrollYProgress, springConfig);

  const drawImage = (img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const widthRatio = canvas.width / img.width;
    const heightRatio = canvas.height / img.height;
    const ratio = Math.max(widthRatio, heightRatio);
    const centerX = (canvas.width - img.width * ratio) / 2;
    const centerY = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerX,
      centerY,
      img.width * ratio,
      img.height * ratio,
    );
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const renderImage = useCallback(
    (progress: number) => {
      const constraint = (n: number, min = 0, max = keyframes.length - 1) =>
        Math.min(Math.max(n, min), max);
      drawImage(
        keyframes[constraint(Math.round(keyframes.length * progress))],
        canvasRef.current!.getContext('2d')!,
      );
    },
    [keyframes],
  );

  useEffect(() => {
    resizeCanvas();
    const resizeCanvasAndRerender = () => {
      resizeCanvas();
      renderImage(progress.get());
    };
    window.addEventListener('resize', resizeCanvasAndRerender);
    return () => {
      window.removeEventListener('resize', resizeCanvasAndRerender);
    };
  }, [progress, renderImage, resizeCanvas]);

  useEffect(() => {
    keyframes[0].onload = () => {
      drawImage(keyframes[0], canvasRef.current!.getContext('2d')!);
    };
  }, [keyframes]);

  useMotionValueEvent(progress, 'change', renderImage);

  return [progress, canvasRef] as const;
};

export default useFramerCanvas;
