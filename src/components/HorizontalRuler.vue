<template>
  <div class="c-horizontal-ruler">
    <div
      class="c-horizontal-ruler__item"
      :key="index"
      v-for="(item, index) in amount"
    >
      <p class="c-horizontal-ruler__item-text">x{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'horizontal-ruler',
  data() {
    return {
      isDisabled: false,
    }
  },
  props: {
    amount: {
      type: Number,
      required: true,
    },
  },
};
</script>
