<script setup>
const { gsap } = useGsap();
const emitter = useEmitter();

const slots = ['live', 'source'];

const revealInfoLinks = () =>
  gsap.to('.project-header__info__links__item__content', {
    yPercent: -110,
    stagger: { from: 'end', each: 0.075 },
    ease: 'expo.out',
    duration: 1,
    delay: 0.285,
  });

emitter.once('overlay:hiding', revealInfoLinks);
</script>

<template>
  <header class="project-header" data-scroll-section>
    <slot class="project-header__title" />

    <div class="project-header__info">
      <ul class="project-header__info__links">
        <template v-for="(slot, key) in slots">
          <li
            v-if="$slots[slot]"
            :key="key"
            :class="[
              'project-header__info__links__item',
              `project-header__info__links__item--${slot}`,
            ]"
            data-scroll
            :data-scroll-speed="1.25 + 0.25 * (slots.length - key)"
          >
            <span class="project-header__info__links__item__content">
              <ContentSlot :use="$slots[slot]" :unwrap="true" />
            </span>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
.project-header {
  min-height: 75vh;

  padding: 30vh clamp(1rem, 7vw, 10rem) 0;

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-top: 2rem;

    &__links {
      display: grid;
      justify-content: start;
      align-content: end;
      grid-template-rows: 1fr;
      gap: 0.5rem;

      text-align: right;

      padding: 0;
      margin-left: auto;
      list-style-type: none;

      &__item {
        overflow: hidden;

        &__content {
          display: inline-block;

          transform: translateY(110%);
        }
      }
    }
  }
}
</style>
