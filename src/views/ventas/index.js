import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import AllVentas from '../../components/ventas/allVentas';
import { setClean } from '../../actions/setClean';
import { useDispatch, useSelector } from 'react-redux';


const Index = () => {
  // Estado local para manejar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setClean());
    setModalVisible(!modalVisible);
  };
                                 
  return (
    <>
      <CCard>
        <CCardHeader>
          Ventas    
        </CCardHeader>
        <CCardBody>
          <AllVentas/>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;