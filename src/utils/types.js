import namespace from './namespace';

// eslint-disable-next-line import/prefer-default-export
export const main = namespace('main', {
  getters: [
    'showSaveButton',
    'loadedGroups',
  ],
  actions: [
    'updateCellData',
    'hideSaveButton',
    'getCellsData',
    'loadNextGroups',
  ],
  mutations: [
    'UPDATE_CELL_DATA',
    'TOGGLE_SAVE_BUTTON',
    'CLEAR_UPDATED_DATA',
    'SET_LOADED_GROUPS',
  ],
});
