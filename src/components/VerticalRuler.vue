<template>
  <div class="c-vertical-ruler">
    <div
      class="c-vertical-ruler__item"
      :key="index"
      v-for="(item, index) in amount"
    >
      <p class="c-vertical-ruler__item-text">y{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-ruler',
  data() {
    return {
      isDisabled: false,
    };
  },
  props: {
    amount: {
      type: Number,
      required: true,
    },
  },
};
</script>
