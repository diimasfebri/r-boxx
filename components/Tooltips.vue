<template>
  <div class="tooltips">
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
}
</script>

<style lang="scss" scoped>
.tooltips {
  z-index: 20;
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 50%;
  height: 1.5rem;
  padding: 0 0.5rem;
  border-radius: 9px;
  background: $font-color;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: translateX(-50%) scale(0.75);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span.name {
    font-family: 'Quicksand';
    font-size: 0.6rem;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    color: $background-light-color;
  }
}
</style>
