
export const editUser = (userId, userData) => {
    return async (dispatch) => {
      try {
        const userRef = firestore.collection('users').doc(userId);
        await userRef.update(userData);
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: { userId, userData } });
      } catch (error) {
        dispatch({ type: 'UPDATE_USER_ERROR', error });
      }
    };
  };