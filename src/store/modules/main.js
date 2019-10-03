/* eslint-disable no-shadow */
import { main as types } from '../../utils/types';
import getRandom from '../../utils/random';

const gridLimit = 40000;
const cellsAmountX = (window.innerWidth / 150);
const cellsAmountY = (window.innerHeight / 40);

const state = {
  limitX: gridLimit / cellsAmountX,
  limitY: gridLimit / cellsAmountY,
  updatedCells: {},
  loadedGroups: {
    0: [0],
  },
  showSaveButton: false,
};

const getters = {
  [types.getters.showSaveButton]: state => state.showSaveButton,
  [types.getters.loadedGroups]: state => state.loadedGroups,
};

const actions = {
  /**
   * Update store with each updated cell value and enabled flag
   *
   * @param {*} { commit } used to update store
   * @param {*} payload receive cell position and values
   */
  [types.actions.updateCellData]({ commit }, payload) {
    return new Promise((resolve) => {
      commit(types.mutations.UPDATE_CELL_DATA, payload);
      if (!state.showSaveButton) {
        commit(types.mutations.TOGGLE_SAVE_BUTTON, true);
        resolve();
      }
    });
  },

  /**
   * Hide save button after output updated data on console
   *
   * @param {*} { commit } used to update store
   */
  [types.actions.hideSaveButton]({ commit }) {
    return new Promise((resolve) => {
      commit(types.mutations.TOGGLE_SAVE_BUTTON, false);
      commit(types.mutations.CLEAR_UPDATED_DATA);
      resolve();
    });
  },

  /**
   * Get data for a block of celss, simulating an endpoint
   *
   * @param {*} { state }
   * @param {*} payload receive group data like amount of collumns and rows
   */
  [types.actions.getCellsData]({ state }, payload) {
    return new Promise((resolve) => {
      const cells = [];
      const { collumns } = payload;
      const { rows } = payload;
      const { positionX } = payload;
      const { positionY } = payload;
      let a;
      let b;

      for (a = 0; a < rows; a += 1) {
        for (b = 0; b < collumns; b += 1) {
          cells.push({
            x: b + positionX,
            y: a + positionY,
            value: getRandom(0, 255),
          });
        }
      }
      resolve(cells);
    });
  },

  /**
   * Bring next groups to the document, based on current group in viewport
   *
   * @param {*} { commit } used to update store
   * @param {*} payload receive row and collumn from current group
   */
  [types.actions.loadNextGroups]({ commit }, payload) {
    return new Promise((resolve) => {
      const rowLimit = payload.row + 3;
      const collLimit = payload.coll + 3;
      const loadedGroups = {};
      let a;
      let b;

      for (a = 0; a < rowLimit; a += 1) {
        const rowColls = [];
        for (b = 0; b < collLimit; b += 1) {
          rowColls.push(b);
        }
        loadedGroups[a] = rowColls;
      }

      commit(types.mutations.SET_LOADED_GROUPS, loadedGroups);
      resolve();
    });
  },
};

const mutations = {
  [types.mutations.UPDATE_CELL_DATA](state, data) {
    state.updatedCells[data.position] = {
      value: data.value,
      enabled: data.enabled,
    };
  },

  [types.mutations.TOGGLE_SAVE_BUTTON](state, data) {
    state.showSaveButton = data;
  },

  [types.mutations.CLEAR_UPDATED_DATA](state) {
    console.log('Data updated:', state.updatedCells);
    state.updatedCells = {};
  },

  [types.mutations.SET_LOADED_GROUPS](state, data) {
    state.loadedGroups = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
