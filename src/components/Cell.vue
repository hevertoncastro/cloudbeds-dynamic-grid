<template>
  <div class="c-cell">
    <div class="c-cell__checkbox">
      <input
        class="c-form__checkbox"
        :id="`checkbox-x${x}y${y}`"
        type="checkbox"
        value="yes"
        tabindex="0"
        v-model="checkboxValue"
        :checked="false"
      >
      <label :for="`checkbox-x${x}y${y}`"></label>
    </div>
    <div class="c-cell__input">
      <input
        class="c-form__input"
        type="phone"
        maxlength="9"
        tabindex="0"
        :disabled="!checkboxValue"
        @keypress="isNumber($event)"
        @focus="clearField($event)"
        @blur="fillField($event)"
        v-model="inputValue"
      >
    </div>
  </div>
</template>

<script>
import store from '../store';
import { main as types } from '../utils/types';

export default {
  name: 'cell',
  data() {
    return {
      inputValue: this.value,
      checkboxValue: true,
    };
  },
  watch: {
    inputValue() {
      this.updateStoreData();
    },
    checkboxValue() {
      this.updateStoreData();
    },
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateStoreData() {
      store.dispatch(types.actions.updateCellData, {
        position: `x${this.x}y${this.y}`,
        value: this.inputValue,
        enabled: this.checkboxValue,
      });
    },
    clearField(evt) {
      const elm = evt.target;
      if (elm.value === '0') {
        elm.value = '';
      }
    },
    fillField(evt) {
      const elm = evt.target;
      if (elm.value === '') {
        elm.value = '0';
      }
    },
    isNumber(event) {
      const evt = event || window.event;
      const charCode = evt.which || evt.keyCode;

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
      return false;
    },
  },
};
</script>
