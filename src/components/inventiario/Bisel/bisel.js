import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton, CModal, CModalHeader, CModalBody, } from '@coreui/react';

import { fetchBisel } from '../../../actions/fetchBisel';
import NewBisel from './newBisel'
import { cilPencil, cilTrash } from '@coreui/icons'; // Íconos de CoreUI
import CIcon from '@coreui/icons-react'

const Bicel = () => {
  const dispatch = useDispatch();
  const bicel = useSelector(state => state.bicel);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
      dispatch(fetchBisel());
  }, [dispatch]);

  const handleEdit = (userId) => {
      // Lógica para manejar la edición del usuario
      console.log("Editar usuario con ID:", userId);
    };
  
  const handleDelete = (userId) => {
  // Lógica para manejar la eliminación del usuario
  console.log("Eliminar usuario con ID:", userId);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

return (
  <>
  <CTable striped hover>
    <CTableHead>
    Bicel
      <CTableRow>
        <CTableHeaderCell>Nombre</CTableHeaderCell>
        <CTableHeaderCell>Tipo</CTableHeaderCell>
        <CTableHeaderCell>Existencia</CTableHeaderCell>
        <CTableHeaderCell>Precio</CTableHeaderCell>
        <CTableHeaderCell>Precio Venta</CTableHeaderCell>
        <CTableHeaderCell>Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {bicel.map((item, index) => (
        <CTableRow key={index}>
          <CTableDataCell>{item.nombre}</CTableDataCell>
          <CTableDataCell>{item.tipo}</CTableDataCell>
          <CTableDataCell>{item.existencia}</CTableDataCell>
          <CTableDataCell>{item.precio}</CTableDataCell>
          <CTableDataCell>{item.pVenta}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" className="mr-2" onClick={() => handleEdit(item.id)}>
              <CIcon icon={cilPencil}  className="text-info"/> Editar
            </CButton>
            <CButton  size="sm" onClick={() => handleDelete(item.id)}>
              <CIcon icon={cilTrash} className="text-danger"/> Eliminar
            </CButton>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
  <CButton 
    color="primary" 
    onClick={toggleModal} 
    className="ml-auto" 
    style={{ float: 'right' }}  // Estilo para alinear el botón a la derechas
  >
    Nuevo bicel
  </CButton>
  
  {/* Modal para agregar un nuevo usuario */}
  <CModal visible={modalVisible} onClose={toggleModal}>
  <CModalHeader closeButton>
    <h5>Crear Nuevo bicel</h5>
  </CModalHeader>
  <CModalBody>
    <NewBisel idInventario={ bicel && bicel[0] && bicel[0].idInventario}/>
  </CModalBody>
</CModal>
</>
);
};


export default Bicel;