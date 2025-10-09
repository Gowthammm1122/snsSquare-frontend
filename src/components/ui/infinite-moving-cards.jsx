"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "../common/card.jsx";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone the items multiple times to ensure smooth infinite scroll
      for (let i = 0; i < 3; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "150s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "250s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "150s");
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const scroll = x - startX;
      containerRef.current.scrollLeft = scrollLeft - scroll;
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsMouseDown(true);
    if (containerRef.current) {
      setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const scroll = x - startX;
      containerRef.current.scrollLeft = scrollLeft - scroll;
    }
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              "relative max-w-full shrink-0",
              item.cardStyle
            )}
          >
            <Card className="w-full">
              <CardContent className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full min-w-[200px] max-w-[250px] sm:min-w-[200px] sm:max-w-[250px] md:min-w-[300px] md:max-w-[350px] lg:min-w-[450px] lg:max-w-[600px] xl:w-250">
                {item.textPosition === 'top' ? (
                  <>
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                      <h4 className={cn(
                        "text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-tight",
                        item.textRotate
                      )}>
                        {item.title}
                      </h4>
                    </div>
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      draggable="false"
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-150 object-cover rounded-lg"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      draggable="false"
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-150 object-cover rounded-lg"
                    />
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                      <h4 className={cn(
                        " leading-tight",
                        item.textRotate
                      )}>
                        {item.title}
                      </h4>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};