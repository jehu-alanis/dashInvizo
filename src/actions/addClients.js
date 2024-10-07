import { collection, addDoc } from 'firebase/firestore';
import { getAuth,} from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setClient = (user) => ({
  type: 'SET_NEW_CLIENT',
  payload: user,
});

export const createClientInFirestore = (user) => {
    return async (dispatch) => {
      const auth = getAuth(); // Obtén la instancia de Auth

      try {
        // Agrega el usuario a Firestore
        const docRef = await addDoc(collection(db, 'clientes'), {
          ...user,
        });
  
        console.log('Usuario guardado en Firestore con ID: ', docRef.id);
  
        // Luego de guardar, despacha la acción para actualizar el store
        dispatch(setClient({
          clients: { ...user, id: docRef.id },
          successMessage: 'Cliente ingresado con Exito.',
          errorMessage: false
        }));

      } catch (error) {
        dispatch(setUser({
          ...user,
          successMessage: false,
          errorMessage: 'Error al crear el cliente', 
        }));
        console.error('Error al crear cliente: ', error);
      }
    };
};