import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchBisel = () => async (dispatch) => {
  try {
  const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
    
  const biselPromises = inventarioSnapshot.docs.map(async (doc) => {
    const biselSnapshot = await getDocs(collection(doc.ref, 'bicel'));
    
    // Incluye el id del documento de inventario en cada documento de la subcolección 'bisel'
    return biselSnapshot.docs.map(matDoc => ({
      id: matDoc.id, // ID del documento en la subcolección 'bisel'
      idInventario: doc.id, // ID del documento en la colección 'inventario'
      ...matDoc.data()
    }));
  });

  // Usa Promise.all para esperar todas las promesas y aplanar los resultados
  const biselList = (await Promise.all(biselPromises)).flat();
  
  dispatch({ type: 'SET_BICEL', payload: biselList });
} catch (error) {
  console.error('Error fetching SET_BICEL:', error);
}
};