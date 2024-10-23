import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // Configuración de Firestore

// Acción de Redux para copiar los datos a la colección "ventas" en Firestore
export const copyRequisicionToVentas = (requisicion) => {
  return async (dispatch) => {
    try {
      // Referencia a la colección "ventas"
      const ventasCollectionRef = collection(db, 'ventas');
      
      // Añade un nuevo documento a la colección "ventas" con los datos de la requisición
      const docRef = await addDoc(ventasCollectionRef, requisicion);
      
      console.log('Requisición copiada con éxito a ventas:', docRef.id);
      
      // Despachamos la acción para actualizar el estado de Redux
      dispatch({
        type: 'COPY_REQUISICION_TO_VENTAS',
        payload: {
          ventasId: docRef.id,  // El ID del nuevo documento en la colección "ventas"
          requisicion,
          successMessage: 'Requisición enviada con éxito a ventas',
          errorMessage: false
        }
      });

    } catch (error) {
      console.error('Error al copiar la requisición a ventas:', error);
      dispatch({
        type: 'COPY_REQUISICION_TO_VENTAS',
        payload: {
          requisicion,
          successMessage: false,
          errorMessage: 'Error al copiar la requisición a ventas'
        }
      });
    }
  };
};
