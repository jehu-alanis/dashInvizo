import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setRequesicion = (requisicion) => ({
  type: 'SET_REQUISICION',
  payload: requisicion,
});

export const createUserInFirestore = (requisicion) => {
    return async (dispatch) => {
      try {
        // Agrega requisicion a Firestore
        const docRef = await addDoc(collection(db, 'requisicion'), {
          ...requisicion,
        });
  
        console.log('Usuario guardado en Firestore con ID: ', docRef.id);
  
        // Luego de guardar, despacha la acción para actualizar el store
        dispatch(setRequesicion({
          ...requisicion,
          successMessage: 'Se agrego la requisicion con exito',
          errorMessage: false
        }));      
        
      } catch (error) {
        dispatch(setRequesicion({
          ...user,
          successMessage: false,
          errorMessage: 'Error al crear la requisicion', 
        }));
        console.error('Error: ', error);
      }
    };
};