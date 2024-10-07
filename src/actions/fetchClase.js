import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchClase = () => async (dispatch) => {

  try {
    const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
      
    const clasePromises = inventarioSnapshot.docs.map(async (doc) => {
      const claseSnapshot = await getDocs(collection(doc.ref, 'clase'));
      
      // Incluye el id del documento de inventario en cada documento de la subcolección 'bisel'
      return claseSnapshot.docs.map(matDoc => ({
        id: matDoc.id, // ID del documento en la subcolección 'clase'
        idInventario: doc.id, // ID del documento en la colección 'inventario'
        ...matDoc.data()
      }));
    });
  
    // Usa Promise.all para esperar todas las promesas y aplanar los resultados
    const claseList = (await Promise.all(clasePromises)).flat();
    
    dispatch({ type: 'SET_CLASE', payload: claseList });
  } catch (error) {
    console.error('Error fetching SET_CLASE:', error);
  }
};