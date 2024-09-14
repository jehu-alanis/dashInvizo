import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchClients = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      dispatch({
        type: 'SET_USERS',
        payload: userList
      });
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
};