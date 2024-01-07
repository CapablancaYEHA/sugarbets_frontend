import { FC } from "preact/compat";
import { useEffect, useState, useCallback } from "preact/hooks";
import { Image } from "@mantine/core";
import useEmblaCarousel from "embla-carousel-react";

import { DotButton } from "./dots";
import "./embla.scss";

type PropType = {
  options?: any;
  images: any;
};

export const Carousel: FC<PropType> = ({ options = {}, images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const imageByIndex = (index: number): string => images[index % images.length];

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((a: any) => {
    setScrollSnaps(a.scrollSnapList());
  }, []);

  const onSelect = useCallback((b: any) => {
    setSelectedIndex(b.selectedScrollSnap());
    setPrevBtnDisabled(!b.canScrollPrev());
    setNextBtnDisabled(!b.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((a, index) => (
              <div className="embla__slide" key={index}>
                <Image
                  key={index}
                  src={imageByIndex(index)}
                  fallbackSrc="https://placehold.co/440x120?text=Game_logo"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => scrollTo(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
};
