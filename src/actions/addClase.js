import { collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setClase = (user) => ({
  type: 'SET_NEW_CLASE',
  payload: user,
});

export const createClaseFirestore = (clase, inventarioId) => {
  return async (dispatch) => {

    try {
      // Referencia al documento en 'inventario/gidXxWanlYRd1jnLhcNp'
      const inventarioDocRef = doc(db, 'inventario', inventarioId);

      // Agrega el nuevo documento en la subcolección 'add'
      const docRef = await addDoc(collection(inventarioDocRef, 'clase'), {
        ...clase,
      });

      console.log('Documento agregado en subcolección add con ID: ', docRef.id);

      // Luego de guardar, despacha la acción para actualizar el store
      dispatch(setClase({
        Clase: { ...clase, id: docRef.id },
        successMessage: 'clase ingresado con éxito.',
        errorMessage: false,
      }));

    } catch (error) {
      dispatch(setClase({
        ...clase,
        successMessage: false,
        errorMessage: 'Error al crear el clase.',
      }));
      console.error('Error al crear el documento en la subcolección add: ', error);
    }
  };
};
