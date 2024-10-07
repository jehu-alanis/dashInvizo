import { collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setMaterial = (user) => ({
  type: 'SET_NEW_MATERIAL',
  payload: user,
});

export const createMaterialFirestore = (material, inventarioId) => {
  return async (dispatch) => {

    try {
      // Referencia al documento en 'inventario/gidXxWanlYRd1jnLhcNp'
      const inventarioDocRef = doc(db, 'inventario', inventarioId);

      // Agrega el nuevo documento en la subcolección 'add'
      const docRef = await addDoc(collection(inventarioDocRef, 'material'), {
        ...material,
      });

      console.log('Documento agregado en subcolección add con ID: ', docRef.id);

      // Luego de guardar, despacha la acción para actualizar el store
      dispatch(setMaterial({
        setMaterial: { ...material, id: docRef.id },
        successMessage: 'add ingresado con éxito.',
        errorMessage: false,
      }));

    } catch (error) {
      dispatch(setMaterial({
        ...material,
        successMessage: false,
        errorMessage: 'Error al crear el add.',
      }));
      console.error('Error al crear el documento en la subcolección add: ', error);
    }
  };
};
