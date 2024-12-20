import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setNewRequisicion = (requisicion) => ({
  type: 'SET_NEW_REQUISICION',
  payload: requisicion,
});

export const createRequisicionInFirestore = (requisicion) => {
    return async (dispatch) => {
      console.log('llegue al dispach: ');

      try {
        // Agrega requisicion a Firestore
        const docRef = await addDoc(collection(db, 'requisicion'), {
          ...requisicion,
          status: 'en proceso',
        });
        console.log('Se agrego la requisicion con exito: ', docRef.id);
        // Luego de guardar, despacha la acción para actualizar el store
        dispatch(setNewRequisicion({
          requisicion: { ...requisicion, status: 'en proceso' },
          successMessage: 'Se agrego la requisicion con exito',
          errorMessage: false
        }));      
        
      } catch (error) {
        dispatch(setNewRequisicion({
          ...requisicion,
          successMessage: false,
          errorMessage: 'Error al crear la requisicion', 
        }));
        console.error('Error: ', error);
      }
    };
};