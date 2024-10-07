import { collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setADD = (user) => ({
  type: 'SET_NEW_ADD',
  payload: user,
});

export const createADDFirestore = (add, inventarioId) => {
  return async (dispatch) => {
    const auth = getAuth(); // Obtén la instancia de Auth

    try {
      // Referencia al documento en 'inventario/gidXxWanlYRd1jnLhcNp'
      const inventarioDocRef = doc(db, 'inventario', inventarioId);

      // Agrega el nuevo documento en la subcolección 'add'
      const docRef = await addDoc(collection(inventarioDocRef, 'add'), {
        ...add,
      });

      console.log('Documento agregado en subcolección add con ID: ', docRef.id);

      // Luego de guardar, despacha la acción para actualizar el store
      dispatch(setADD({
        Add: { ...add, id: docRef.id },
        successMessage: 'add ingresado con éxito.',
        errorMessage: false,
      }));

    } catch (error) {
      dispatch(setADD({
        ...add,
        successMessage: false,
        errorMessage: 'Error al crear el add.',
      }));
      console.error('Error al crear el documento en la subcolección add: ', error);
    }
  };
};
