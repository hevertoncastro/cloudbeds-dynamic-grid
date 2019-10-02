<template>
  <div class="c-row">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'row',
  data() {
    return {
      isDisabled: false,
    }
  },
  props: {
    msg: String,
  },
  methods: {
    handleField: () => {
      this.isDisabled = !this.isDisabled;
    },
  },
};
</script>
