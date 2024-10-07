import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchArmazon = () => async (dispatch) => {
  try {
    const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
    
    const armazonPromises = inventarioSnapshot.docs.map(async (doc) => {
      const armazonSnapshot = await getDocs(collection(doc.ref, 'armazon'));
      
      // Incluye el id del documento de inventario en cada documento de la subcolección 'armazon'
      return armazonSnapshot.docs.map(matDoc => ({
        id: matDoc.id, // ID del documento en la subcolección 'armazon'
        idInventario: doc.id, // ID del documento en la colección 'inventario'
        ...matDoc.data()
      }));
    });

    // Usa Promise.all para esperar todas las promesas y aplanar los resultados
    const armazonList = (await Promise.all(armazonPromises)).flat();
    
    dispatch({ type: 'SET_ARMAZON', payload: armazonList });
  } catch (error) {
    console.error('Error fetching SET_ARMAZON:', error);
  }
};