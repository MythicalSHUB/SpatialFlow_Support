// @ts-ignore
import anime from 'animejs';

export const staggerMs = (delay: number) => anime.stagger(delay);

export function revealElements(targets: HTMLElement | HTMLElement[] | string, delay = 0, stagger = 60) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: anime.stagger(stagger, { start: delay }),
  });
}

export function revealFade(targets: HTMLElement | HTMLElement[] | string, delay = 0) {
  return anime({
    targets,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay,
  });
}

export function headerEnter(navRef: HTMLElement | null, eyebrowRef: HTMLElement | null, headlineRef: HTMLElement | null, descRef: HTMLElement | null, ctaRef: HTMLElement | null) {
  const tl = anime.timeline({
    easing: 'easeOutExpo',
  });

  if (navRef) {
    tl.add({
      targets: navRef,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
    }, 0);
  }

  const elements = [eyebrowRef, headlineRef, descRef, ctaRef].filter(Boolean);
  if (elements.length > 0) {
    tl.add({
      targets: elements,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(80),
    }, 200);
  }
}
