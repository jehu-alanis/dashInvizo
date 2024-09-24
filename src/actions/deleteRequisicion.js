import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // Configuración de Firestore

// Acción para eliminar requisición del estado de Redux
export const deleteRequisicionAction = (id) => ({
  type: 'DELETE_REQUISICION',
  payload: id,
});

// Función para eliminar requisición en Firestore
export const deleteRequisicionInFirestore = (id) => {
  return async (dispatch) => {
    try {
      // Referencia al documento de la requisición en Firestore por su ID
      const requisicionRef = doc(db, 'requisicion', id);
      
      // Elimina el documento de Firestore
      await deleteDoc(requisicionRef);
      console.log('Requisición eliminada con éxito:', id);
      
      // Luego de eliminar en Firestore, despacha la acción para eliminarla del store de Redux
      dispatch(deleteRequisicionAction(id));

    } catch (error) {
      console.error('Error al eliminar requisición:', error);
    }
  };
};
