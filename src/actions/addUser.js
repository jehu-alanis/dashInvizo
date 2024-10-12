import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import { db } from '../config/firebaseConfig'; // Importa tu instancia de Firestore

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const addUserInFirestore = (user) => {
    return async (dispatch) => {
      const auth = getAuth(); // Obtén la instancia de Auth
  
      try {
        // Crea el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        const userAuth = userCredential.user;
  
        // Agrega el usuario a Firestore
        const docRef = await addDoc(collection(db, 'users'), {
          ...user,
          uid: userAuth.uid,
        });
  
        console.log('Usuario guardado en Firestore con ID: ', docRef.id);
  
        // Luego de guardar, despacha la acción para actualizar el store
        dispatch(setUser({
          ...user,
          successMessage: 'Correo de restablecimiento enviado. El usuario debe establecer una nueva contraseña.',
          errorMessage: false
        }));
  
        // Opcional: Enviar un correo de restablecimiento de contraseña si quieres que el usuario lo cambie
        // Puedes comentar o descomentar esta línea según tus necesidades
        await sendPasswordResetEmail(auth, user.email);
  
        console.log('Correo de restablecimiento enviado. El usuario debe establecer una nueva contraseña.');
        
      } catch (error) {
        dispatch(setUser({
          ...user,
          successMessage: false,
          errorMessage: 'Error al crear usuario posiblemente ya este registrado', 
        }));
        console.error('Error al crear usuario: ', error);
      }
    };
}; 

