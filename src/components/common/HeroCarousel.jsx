"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

export function HeroCarousel({ images, className = "", onSlideChange }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: true })])

  React.useEffect(() => {
    if (emblaApi) {
      // Auto-play functionality
      const autoplay = emblaApi.plugins().autoplay
      if (autoplay) {
        autoplay.play()
      }

      // Listen for slide changes
      const onSelect = () => {
        const currentIndex = emblaApi.selectedScrollSnap()
        if (onSlideChange) {
          onSlideChange(currentIndex % 3) // Only show 3 indicators
        }
      }

      emblaApi.on('select', onSelect)
      onSelect() // Call once to set initial state

      return () => {
        emblaApi.off('select', onSelect)
      }
    }
  }, [emblaApi, onSlideChange])

  const handleMouseEnter = () => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay
      if (autoplay) {
        autoplay.stop()
      }
    }
  }

  const handleMouseLeave = () => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay
      if (autoplay) {
        autoplay.play()
      }
    }
  }

  return (
    <div 
      className={`embla overflow-hidden ${className}`}
      ref={emblaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--embla-transition-duration': '1.5s',
        '--embla-transition-timing-function': 'ease-in-out'
      }}
    >
      <div className="embla__container flex">
        {images.map((image, index) => (
          <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
            <img 
              src={image} 
              alt={`Hero visual ${index + 1}`}
              className="w-full h-full object-cover rounded-[32px] transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
