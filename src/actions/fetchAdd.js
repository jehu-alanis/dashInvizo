import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchADD = () => async (dispatch) => {
  try {
    const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
    
    const addPromises = inventarioSnapshot.docs.map(async (doc) => {
      const addSnapshot = await getDocs(collection(doc.ref, 'add'));
      
      // Incluye el id del documento de inventario en cada documento de la subcolección 'add'
      return addSnapshot.docs.map(matDoc => ({
        id: matDoc.id, // ID del documento en la subcolección 'add'
        idInventario: doc.id, // ID del documento en la colección 'inventario'
        ...matDoc.data()
      }));
    });

    // Usa Promise.all para esperar todas las promesas y aplanar los resultados
    const addList = (await Promise.all(addPromises)).flat();
    
    dispatch({ type: 'SET_ADD', payload: addList });
  } catch (error) {
    console.error('Error fetching SET_ADD:', error);
  }
};