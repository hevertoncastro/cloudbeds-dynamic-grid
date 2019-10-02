<template>
  <div
    class="c-group"
    :id="id"
    :style="`width: ${width}px; height: ${height}px`"
  >
    <div class="c-loader" v-if="isLoading">
      <div class="c-loader__block c-loader--animation"
      v-for="(n, index) in rows"
      :key="index"
      ></div>
    </div>

    <Cell
      :x="cell.x"
      :y="cell.y"
      :value="cell.value"
      :key="index"
      v-for="(cell, index) in cells"
    />
  </div>
</template>

<script>
import store from '../store';
import { main as types } from '../utils/types';
import Cell from './Cell.vue';

export default {
  name: 'group',
  data() {
    return {
      cells: [],
      isLoading: true,
      loadTimeout: null,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    collumns: {
      type: Number,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
    positionY: {
      type: Number,
      required: true,
    },
    groupRow: {
      type: Number,
      required: true,
    },
    groupColl: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getCellsData() {
      store.dispatch(types.actions.getCellsData, {
        collumns: this.collumns,
        rows: this.rows,
        positionX: this.positionX,
        positionY: this.positionY,
      }).then((resolve) => {
        this.cells = resolve;
        this.isLoading = false;
      });
    },
    loadNextBlocks() {
      store.dispatch(types.actions.loadNextGroups, {
        row: this.groupRow,
        coll: this.groupColl,
      });
    },
    clearTimeout() {
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout);
        this.loadTimeout = null;
      }
    },
  },
  mounted() {
    if (window.IntersectionObserver) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadNextBlocks();

            this.loadTimeout = setTimeout(() => {
              this.getCellsData();
              observer.unobserve(entry.target);
              this.clearTimeout();
            }, 500);
          } else {
            this.clearTimeout();
          }
        });
      }, {
        rootMargin: '40px 0px 0px 40px',
        threshold: 0,
      });

      const group = document.querySelector(`#${this.id}`);
      obs.observe(group);
    }
  },
  components: {
    Cell,
  },
};
</script>
