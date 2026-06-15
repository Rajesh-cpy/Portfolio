import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useTransform, animate, useInView } from 'framer-motion';

export default function Counter({ value, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayVal, setDisplayVal] = useState(0);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: 'easeOut',
      });
      return () => controls.stop();
    }
  }, [isInView, value, count, duration]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayVal(latest);
    });
  }, [rounded]);

  return (
    <span ref={ref} className="font-mono">
      {displayVal}
      {suffix}
    </span>
  );
}
