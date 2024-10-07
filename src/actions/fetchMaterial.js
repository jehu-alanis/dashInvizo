import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchMaterial = () => async (dispatch) => {
  try {
    const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
      
    const materialPromises = inventarioSnapshot.docs.map(async (doc) => {
      const materialSnapshot = await getDocs(collection(doc.ref, 'material'));
      
      // Incluye el id del documento de inventario en cada documento de la subcolección 'bisel'
      return materialSnapshot.docs.map(matDoc => ({
        id: matDoc.id, // ID del documento en la subcolección 'material'
        idInventario: doc.id, // ID del documento en la colección 'inventario'
        ...matDoc.data()
      }));
    });
  
    // Usa Promise.all para esperar todas las promesas y aplanar los resultados
    const materialList = (await Promise.all(materialPromises)).flat();
    
    dispatch({ type: 'SET_MATERIAL', payload: materialList });
  } catch (error) {
    console.error('Error fetching SET_MATERIAL:', error);
  }
};