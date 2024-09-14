import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isAuthenticated: false,  // Estado de autenticación
  user: null,              // Estado de usuario
  users: [],
  successMessage: false,
  errorMessage: false,
  clients: [],
  requisicion: [],

};

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: payload };
    case 'SET_USER':    // Caso para actualizar el usuario
      return { ...state, user: payload, successMessage: payload.successMessage, errorMessage: payload.errorMessage,  };
    case 'SET_USERS':   // Manejar el estado de los usuarios
      return { ...state, users: payload,  };
    case 'SET_REQUISICION':   // Manejar el estado de los usuarios
      return { ...state, requisicion: payload,  };
    case 'SET_CLEAN':   // Manejar el estado de los usuarios
      return { ...state, successMessage: false, errorMessage: false,  };
    case 'SET_NEW_REQUISICION':   // Manejar el estado de los usuarios
      return { ...state, requisicion: requisicion.concat(payload.requisicion), successMessage: false, errorMessage: false,  };
    default:
      return state;
  }
};

const store = createStore(changeState, applyMiddleware(thunk));
export default store;