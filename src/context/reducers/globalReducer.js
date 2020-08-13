import { createContext } from 'react';
import { actionTypes } from '../actions/globalActions';

export const GlobalContext = createContext(null);

export const globalState = {
  url: null,
  projectUrl: null,
  isProjectLoaded: false,
  fileTree: null,
  componentName: '',
  isFileDirectoryOpen: true,
  isRightPanelOpen: true,
  rightPanelDisplay: 'browserView',
  displayedFileCode: '',
  isFolderOpen: {},
  isFileHighlighted: '',
  projectFilePath: '',
  filePathMap: {},
  file: '',
};

export const globalReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_PROJECT_URL:
      const url = action.url;
      return {
        ...state,
        url,
        projectUrl: url,
      };
    case actionTypes.LOAD_PROJECT:
      return {
        ...state,
        isProjectLoaded: action.load,
      };
    case actionTypes.CREATE_FILE_TREE:
      const fileTree = action.fileTree;
      return {
        ...state,
        fileTree,
      };
    case actionTypes.SET_COMPONENT_NAME:
      const componentName = action.componentName;
      return {
        ...state,
        componentName,
      };
    case actionTypes.TOGGLE_FILE_DIRECTORY:
      const isFileDirectoryOpen = !state.isFileDirectoryOpen;
      return {
        ...state,
        isFileDirectoryOpen,
      };
    case actionTypes.CLOSE_RIGHT_PANEL:
      const projUrl = state.projectUrl;
      return {
        ...state,
        isRightPanelOpen: false,
        url: projUrl,
      };
    case actionTypes.TOGGLE_RIGHT_PANEL:
      const rightPanelDisplay = action.display;
      return {
        ...state,
        rightPanelDisplay,
        isRightPanelOpen: true,
      };
    case actionTypes.DISPLAY_FILE_CODE:
      const displayedFileCode = action.displayedFileCode;
      return {
        ...state,
        displayedFileCode,
        file: '',
      };
    case actionTypes.TOGGLE_FOLDER_VIEW:
      const isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath] = !isFolderOpen[action.filePath];
      return {
        ...state,
        isFolderOpen,
      };
    case actionTypes.HIGHLIGHT_FILE:
      const isFileHighlighted = action.fileName;
      return {
        ...state,
        isFileHighlighted,
      };
    case actionTypes.SET_PROJECT_FILE_PATH:
      const projectFilePath = action.projectFilePath;
      return {
        ...state,
        projectFilePath,
      };
    case actionTypes.SET_FILE_PATH_MAP:
      const filePathMap = action.filePathMap;
      return {
        ...state,
        filePathMap,
      };
    case actionTypes.CREATE_FILE_SHOW:
      const file = action.testString;
      return {
        ...state,
        file,
      };
    case actionTypes.UPDATE_FILE_SHOW:
      const fileUp = action.testString;
      return {
        ...state,
        file: fileUp,
      };
    case actionTypes.OPEN_BROWSER_DOCS:
      const docsUrl = action.docsUrl;
      return {
        ...state,
        url: docsUrl,
        isRightPanelOpen: true,
        rightPanelDisplay: 'browserView',
      };
    default:
      return state;
  }
};
