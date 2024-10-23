import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Importar redux-thunk correctamente

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
  add: [],
  material: [],
  clase: [],
  armazon: [],
  bicel: [],
  ventas: [],
};

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload };

    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: payload };

    case 'SET_USER':    // Caso para actualizar el usuario
      return { 
        ...state, 
        user: payload, 
        successMessage: payload.successMessage, 
        errorMessage: payload.errorMessage 
      };

    case 'SET_USERS':   // Manejar el estado de los usuarios
      return { ...state, users: payload };

    case 'UPDATE_USER': // Agregar un caso para actualizar un usuario
      return {
        ...state,
        users: state.users.map((user) => 
          user.id === payload.id ? { ...user, ...payload } : user
        ),
        successMessage: 'Usuario actualizado con éxito',
        errorMessage: false,
      };

    case 'DELETE_USER': // Agregar un caso para eliminar un usuario
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
        successMessage: 'Usuario eliminado con éxito',
        errorMessage: false,
      };

    case 'SET_REQUISICION':   // Manejar el estado de las requisiciones
      return { ...state, requisicion: payload };

    case 'SET_CLEAN':   // Limpiar los mensajes de éxito/error
      return { 
        ...state, 
        successMessage: false, 
        errorMessage: false 
      };

    case 'SET_NEW_REQUISICION':   // Agregar nueva requisición
      return { 
        ...state, 
        requisicion: state.requisicion.concat(payload.requisicion), 
        successMessage: payload.successMessage, 
        errorMessage: payload.errorMessage 
      };

    case 'UPDATE_REQUISICION':    // Editar una requisición existente
      return { 
        ...state, 
        requisicion: state.requisicion.map((req) =>
          req.id === payload.requisicion.id ? payload.requisicion : req
        ), 
        successMessage: payload.successMessage, 
        errorMessage: payload.errorMessage 
      };

    case 'DELETE_REQUISICION':    // Eliminar una requisición
      return { 
        ...state, 
        requisicion: state.requisicion.filter((req) => req.id !== payload), 
        successMessage: 'Requisición eliminada con éxito',
        errorMessage: false 
      };
    case 'SET_CLIENTS':   // Manejar el estado de los usuarios
      return { ...state, clients: payload };
    case 'SET_NEW_CLIENT':   // Agregar nueva requisición
      return { 
        ...state, 
        clients: state.clients.concat(payload.clients), 
        successMessage: payload.successMessage, 
        errorMessage: payload.errorMessage 
      };
    case 'SET_MATERIAL':   // Manejar el estado de los usuarios
      return { ...state, material: payload };
    case 'SET_CLASE':   // Manejar el estado de los usuarios
      return { ...state, clase: payload };
    case 'SET_BICEL':   // Manejar el estado de los usuarios
      return { ...state, bicel: payload };
    case 'SET_ARMAZON':   // Manejar el estado de los usuarios
      return { ...state, armazon: payload };
    case 'SET_ADD':   // Manejar el estado de los usuarios
      return { ...state, add: payload };
    case 'SET_NEW_ADD':
      return { 
        ...state, 
        add: state.add.concat(payload.Add), 
        successMessage: payload.successMessage, 
        errorMessage: payload.errorMessage 
      };
    case 'SET_NEW_ARMAZON':
        return { 
          ...state, 
          armazon: state.add.concat(payload.Armazon), 
          successMessage: payload.successMessage, 
          errorMessage: payload.errorMessage 
        };
    case 'SET_NEW_MATERIAL':
        return { 
          ...state, 
          material: state.material.concat(payload.Material), 
          successMessage: payload.successMessage, 
          errorMessage: payload.errorMessage 
        };
    case 'SET_NEW_BICEL':
          return { 
            ...state, 
            bicel: state.bicel.concat(payload.Bicel), 
            successMessage: payload.successMessage, 
            errorMessage: payload.errorMessage 
          };
    case 'SET_NEW_CLASE':
            return { 
              ...state, 
              clase: state.clase.concat(payload.Clase), 
              successMessage: payload.successMessage, 
              errorMessage: payload.errorMessage 
            };
    case 'COPY_REQUISICION_TO_VENTAS':    // Editar una requisición existente
            return { 
              ...state, 
              ventas: state.ventas.concat(payload.requisicion),
              successMessage: payload.successMessage, 
              errorMessage: payload.errorMessage 
            };
    case 'SET_VENTAS':   // Manejar el estado de las requisiciones
          return { ...state, ventas: payload };
    default:
      return state;
  }
};

// Crear el store con redux-thunk como middleware
const store = createStore(changeState, applyMiddleware(thunk));

export default store; 


