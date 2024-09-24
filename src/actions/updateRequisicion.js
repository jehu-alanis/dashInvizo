import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // Configuración de Firestore

// Acción de Redux para actualizar la requisición en Firestore y el estado de Redux
export const updateRequisicionInFirestore = (id, requisicion) => {
  return async (dispatch) => {
    try {
      // Referencia al documento en Firestore usando el ID de la requisición
      const requisicionRef = doc(db, 'requisicion', id);
      
      // Actualiza el documento en Firestore con los nuevos datos
      await updateDoc(requisicionRef, requisicion);
      
      console.log('Requisición actualizada con éxito:', id);
      
      // Despachamos la acción para actualizar el estado de Redux
      dispatch({
        type: 'UPDATE_REQUISICION',
        payload: {
          requisicion: { id, ...requisicion },  // El ID y los datos actualizados
          successMessage: 'Requisición actualizada con éxito',
          errorMessage: false
        }
      });
      
    } catch (error) {
      console.error('Error al actualizar la requisición:', error);
      dispatch({
        type: 'UPDATE_REQUISICION',
        payload: {
          requisicion,
          successMessage: false,
          errorMessage: 'Error al actualizar la requisición'
        }
      });
    }
  };
};
