import { db } from '../config/firebaseConfig'; // Asegúrate de que esto sea correcto
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Acción para actualizar un usuario
export const updateUserInFirestore = (user) => {
  return async (dispatch) => {
    try {
      const userRef = doc(db, 'users', user.id); // Asegúrate de que 'users' sea tu colección
      await updateDoc(userRef, user);
      
      dispatch({
        type: 'UPDATE_USER',
        payload: user,
      });
    } catch (error) {
      console.error("Error updating user: ", error);
      // Manejo de errores
    }
  };
};

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
