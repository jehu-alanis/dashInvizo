import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

//import NewClient from '../../components/clientes/newClient';
import AllClients from '../../components/clientes/allCientes';

import Add from '../../components/inventiario/Adds/add';
import Armazon from '../../components/inventiario/Armazon/armazon';
import Bicel from '../../components/inventiario/Bisel/bisel';
import Clase from '../../components/inventiario/Clase/clase';
import Material from '../../components/inventiario/Materiales/material';



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

  console.log(modalVisible,"modalVisible");

  return (
    <>
      <CCard>
        <CCardHeader>
          Inventario
          {/*   <CButton 
            color="primary" 
            onClick={toggleModal} 
            className="ml-auto" 
            style={{ float: 'right' }}  // Estilo para alinear el botón a la derechas
          >
            Nuevo Inventario
          </CButton> */}
        
        </CCardHeader>
        <CCardBody>
          <Add />
          <Armazon />
          <Bicel />
          <Clase />
          <Material />

        </CCardBody>
      </CCard>

      {/* Modal para agregar un nuevo usuario */}
      <CModal visible={modalVisible} onClose={toggleModal}>
        <CModalHeader closeButton>
          <h5>Crear Nuevo Inventario</h5>
        </CModalHeader>
        <CModalBody>
          
        </CModalBody>
      </CModal>
    </>
  );
};

export default Index;