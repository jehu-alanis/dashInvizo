import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchUsers = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(usersList,"usersList");
      dispatch({
        type: 'SET_USERS',
        payload: usersList
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
};