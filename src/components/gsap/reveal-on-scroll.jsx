import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const RevealOnScroll = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  duration = 0.8, 
  delay = 0,
  ...props 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case 'up':
          return { y: distance, opacity: 0 };
        case 'down':
          return { y: -distance, opacity: 0 };
        case 'left':
          return { x: distance, opacity: 0 };
        case 'right':
          return { x: -distance, opacity: 0 };
        case 'fade':
          return { opacity: 0 };
        case 'scale':
          return { scale: 0.8, opacity: 0 };
        default:
          return { y: distance, opacity: 0 };
      }
    };

    // Set initial state
    gsap.set(element, getInitialTransform());

    // Create scroll trigger animation
    const animation = gsap.to(element, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        // markers: true, // Enable for debugging
      }
    });

    // Cleanup
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, distance, duration, delay]);

  return (
    <div ref={elementRef} {...props}>
      {children}
    </div>
  );
};
