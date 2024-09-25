// actions/userActions.js
import { db } from '../config/firebaseConfig'; // Asegúrate de que esto sea correcto
import { doc, deleteDoc } from 'firebase/firestore';

// Acción para eliminar un usuario
export const deleteUserInFirestore = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = doc(db, 'users', userId); // Asegúrate de que 'users' sea tu colección
      await deleteDoc(userRef);
      
      dispatch({
        type: 'DELETE_USER',
        payload: userId,
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      // Manejo de errores
    }
  };
};
