// actions/updateUser.js
import { db } from '../config/firebaseConfig'; // Asegúrate de que la ruta es correcta
import { doc, updateDoc } from 'firebase/firestore';

// Define la acción para actualizar un usuario
export const updateUserInFirestore = (user) => {
    return async (dispatch) => {
        const userRef = doc(db, 'users', user.id); // Asegúrate de que 'users' es el nombre de tu colección
        try {
            // Actualiza los datos del usuario en Firestore
            await updateDoc(userRef, {
                name: user.name,
                email: user.email,
                userType: user.userType,
            });

            dispatch({ type: 'UPDATE_USER_SUCCESS', payload: user }); // Opcional: Despachar éxito
        } catch (error) {
            console.error("Error al actualizar el usuario: ", error);
            dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message }); // Opcional: Despachar error
        }
    };
};
