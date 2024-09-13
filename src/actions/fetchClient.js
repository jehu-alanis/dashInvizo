import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchClients = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'requisicion'));
      const requisicionList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      dispatch({
        type: 'SET_REQUISICION',
        payload: requisicionList
      });
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
};