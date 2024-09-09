import { legacy_createStore as createStore } from 'redux';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isAuthenticated: false,  // Añadido estado de autenticación
};

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: payload };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;