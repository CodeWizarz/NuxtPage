<script setup>
const { $smoothScroll } = useNuxtApp();
const { gsap } = useGsap();
const route = useRoute();

const overlay = shallowRef({});

function setVh() {
  const windowHeight = window.innerHeight;

  gsap.set(document.documentElement, { '--vh': `${windowHeight / 100}px` });
}

function logGreeting() {
  // eslint-disable-next-line
  console.log(
    '%cCode Wizard',
    'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-family: "Arial", sans-serif;font-size: 2rem;color: white'
  );
  // eslint-disable-next-line
  console.log(
    "%cHello😁 curios friend! If you have any questions, let's get in touch at contact@bogdankostyuk.xyz! Or if you are looking for a source📦 here you are: https://github.com/logotip4ik/portfolio",
    'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-size:1rem;color: white;line-height:1.75'
  );
}

function showFlagStripes() {
  gsap.from('.flag-stripe__line', {
    xPercent: -25,
    stagger: 0.125,
    ease: 'expo.out',
    duration: 1.5,
    delay: route.name === 'index' ? 3 : 1,
  });
}

function disableScrollRestoration() {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}

onMounted(() => {
  $smoothScroll.disable();

  logGreeting();
  setVh();
  showFlagStripes();
  disableScrollRestoration();

  if (route.name === 'index')
    gsap.set('.page-overlay__slide', {
      opacity: 0,
      pointerEvents: 'none',
      onComplete: () => $smoothScroll.enable(),
    });

  if (route.name !== 'index') {
    gsap.set('.loader', { autoAlpha: 0, display: 'none' });

    gsap.fromTo(
      '.page-overlay__slide__text',
      { yPercent: 105, autoAlpha: 1 },
      { yPercent: 0, delay: 0.075, ease: 'expo.out' }
    );

    overlay.value.enterPageAnim('div[page-content]', () => null);
  }

  window.addEventListener('resize', setVh);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setVh);
});
</script>

<template>
  <VNavbar />
  <UkraineFlagStripe />

  <KeepAlive>
    <Transition
      :css="false"
      mode="out-in"
      @enter="overlay.enterPageAnim"
      @leave="overlay.leavePageAnim"
    >
      <div page-content :key="$route.fullPath">
        <NuxtPage />
      </div>
    </Transition>
  </KeepAlive>

  <VPointer />
  <VLoader />
  <VOverlay ref="overlay" />
</template>

