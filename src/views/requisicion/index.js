import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import NewUser from '../../components/requisisones/addCliente';
import AllClient from '../../components/requisisones/allClients';

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
          Requisiciones
          <CButton 
            color="primary" 
            onClick={toggleModal} 
            className="ml-auto" 
            style={{ float: 'right' }}  // Estilo para alinear el botón a la derecha
          >
            Nueva Requisicion
          </CButton>
        </CCardHeader>
        <CCardBody>
          <AllClient />
        </CCardBody>
      </CCard>

      {/* Modal para agregar un nuevo usuario */}
      <CModal visible={modalVisible} onClose={toggleModal}>
        <CModalHeader closeButton>
          <h5>Crear Nueva Requisicion</h5>
        </CModalHeader>
        <CModalBody>
          <NewUser />
        </CModalBody>
      </CModal>
    </>
  );
};

export default Index;