import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchClients = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const clientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(clientsList,"clientsList");
      dispatch({
        type: 'SET_CLIENTS',
        payload: clientsList
      });
    } catch (error) {
      console.error('Error fetching fetchClients:', error);
    }
};