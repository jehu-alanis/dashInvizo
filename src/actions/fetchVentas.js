import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchVentas = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ventas'));
      const ventasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      dispatch({
        type: 'SET_VENTAS',
        payload: ventasList
      });
    } catch (error) {
      console.error('Error fetching ventasList:', error);
    }
};