import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Acción para obtener los usuarios desde Firestore
export const fetchUsers = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users')); // Obtener la colección 'users'
    const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapear documentos a objetos de usuario

    // Despachar la acción para almacenar los usuarios en el estado de Redux
    dispatch({
      type: 'SET_USERS',
      payload: usersList
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
