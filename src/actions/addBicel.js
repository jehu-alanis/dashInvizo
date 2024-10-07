import { collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setBicel = (user) => ({
  type: 'SET_NEW_BICEL',
  payload: user,
});

export const createBicelFirestore = (bicel, inventarioId) => {
  return async (dispatch) => {

    try {
      // Referencia al documento en 'inventario/gidXxWanlYRd1jnLhcNp'
      const inventarioDocRef = doc(db, 'inventario', inventarioId);

      // Agrega el nuevo documento en la subcolección 'add'
      const docRef = await addDoc(collection(inventarioDocRef, 'bicel'), {
        ...bicel,
      });

      console.log('Documento agregado en subcolección add con ID: ', docRef.id);

      // Luego de guardar, despacha la acción para actualizar el store
      dispatch(setBicel({
        Bicel: { ...bicel, id: docRef.id },
        successMessage: 'bicel ingresado con éxito.',
        errorMessage: false,
      }));

    } catch (error) {
      dispatch(setBicel({
        ...bicel,
        successMessage: false,
        errorMessage: 'Error al crear el bicel.',
      }));
      console.error('Error al crear el documento en la subcolección add: ', error);
    }
  };
};
