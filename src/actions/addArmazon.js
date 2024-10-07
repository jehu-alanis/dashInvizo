import { collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setArmazon = (user) => ({
  type: 'SET_NEW_ARMAZON',
  payload: user,
});

export const createArmazonFirestore = (armazon, inventarioId) => {
  return async (dispatch) => {

    try {
      // Referencia al documento en 'inventario/gidXxWanlYRd1jnLhcNp'
      const inventarioDocRef = doc(db, 'inventario', inventarioId);

      // Agrega el nuevo documento en la subcolección 'add'
      const docRef = await addDoc(collection(inventarioDocRef, 'armazon'), {
        ...armazon,
      });

      console.log('Documento agregado en subcolección add con ID: ', docRef.id);

      // Luego de guardar, despacha la acción para actualizar el store
      dispatch(setArmazon({
        Armazon: { ...armazon, id: docRef.id },
        successMessage: 'armazon ingresado con éxito.',
        errorMessage: false,
      }));

    } catch (error) {
      dispatch(setArmazon({
        ...armazon,
        successMessage: false,
        errorMessage: 'Error al crear el armazon.',
      }));
      console.error('Error al crear el documento en la subcolección add: ', error);
    }
  };
};
