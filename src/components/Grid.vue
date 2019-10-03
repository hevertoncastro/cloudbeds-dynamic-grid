<template>
  <div class="c-grid">
    <HorizontalRuler :amount="rulersX" />
    <VerticalRuler :amount="rulersY" />
    <div class="c-grid__holder" v-if="loaded">
      <div
        class="c-grid__row"
        :key="index"
        v-for="(row, index) in Object.keys(loadedGroups)"
      >
        <Group
          :id="`group-x${loadedGroups[row][index] + 1}-y${row + 1}`"
          :width="groupWidth"
          :height="groupHeight"
          :collumns="cellsAmountX"
          :rows="cellsAmountY"
          :positionX="(loadedGroups[row][index] * cellsAmountX + 1)"
          :positionY="(row * cellsAmountY + 1)"
          :groupRow="parseInt(row)"
          :groupColl="parseInt(coll)"
          :key="index"
          v-for="(coll, index) in loadedGroups[row]"
        />
      </div>
    </div>
    <div class="c-footer-bar" :class="{ 'c-footer-bar--active': showSaveButton }">
      <div class="c-footer-bar__holder">
        <p class="c-footer-bar__title o-title">Do you want to save the changes?</p>
        <button class="c-footer-bar__button o-button" @click="hideSaveButton">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../store';
import { main as types } from '../utils/types';
import HorizontalRuler from './HorizontalRuler.vue';
import VerticalRuler from './VerticalRuler.vue';
import Group from './Group.vue';

export default {
  name: 'grid',
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      cellsAmountX: 0,
      cellsAmountY: 0,
      groupWidth: 0,
      groupHeight: 0,
      loaded: false,
    };
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    setupCellsAmount() {
      if (this.window.width > 0 && this.window.height > 0) {
        this.cellsAmountX = Math.ceil(this.window.width / 150);
        this.cellsAmountY = Math.ceil(this.window.height / 40);
      }
    },
    setupGroupSize() {
      this.groupWidth = (this.cellsAmountX * 150);
      this.groupHeight = (this.cellsAmountY * 40);
      this.loaded = true;
    },
    activeFooterBar() {
      this.isVisible = true;
    },
    hideSaveButton() {
      store.dispatch(types.actions.hideSaveButton);
    },
  },
  computed: {
    ...mapGetters({
      showSaveButton: types.getters.showSaveButton,
      loadedGroups: types.getters.loadedGroups,
    }),
    rulersX() {
      return Object.keys(this.loadedGroups[0]).length * this.cellsAmountX;
    },
    rulersY() {
      return Object.keys(this.loadedGroups).length * this.cellsAmountY;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  mounted() {
    this.setupCellsAmount();
    this.setupGroupSize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  components: {
    HorizontalRuler,
    VerticalRuler,
    Group,
  },
};
</script>
