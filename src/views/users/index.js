import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import NewUser from '../../components/users/newUser';
import AllUsers from '../../components/users/allUser';

const Index = () => {
  // Estado local para manejar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  console.log(modalVisible,"modalVisible");

  return (
    <>
      <CCard>
        <CCardHeader>
          Usuarios
          <CButton 
            color="primary" 
            onClick={toggleModal} 
            className="ml-auto" 
            style={{ float: 'right' }}  // Estilo para alinear el botón a la derecha
          >
            Nuevo Usuario
          </CButton>
        </CCardHeader>
        <CCardBody>
          <AllUsers />
        </CCardBody>
      </CCard>

      {/* Modal para agregar un nuevo usuario */}
      <CModal visible={modalVisible} onClose={toggleModal}>
        <CModalHeader closeButton>
          <h5>Crear Nuevo Usuario</h5>
        </CModalHeader>
        <CModalBody>
          <NewUser />
        </CModalBody>
      </CModal>
    </>
  );
};

export default Index;