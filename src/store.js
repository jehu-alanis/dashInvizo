import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isAuthenticated: false,  // Estado de autenticación
  user: null,              // Estado de usuario
};

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: payload };
    case 'SET_USER':    // Caso para actualizar el usuario
      return { ...state, user: payload };
    default:
      return state;
  }
};

const store = createStore(changeState, applyMiddleware(thunk));
export default store;