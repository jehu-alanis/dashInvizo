import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton, CModal, CModalHeader, CModalBody, } from '@coreui/react';

import { fetchClase } from '../../../actions/fetchClase';
import NewClase from './newClase';
import { cilPencil, cilTrash } from '@coreui/icons'; // Íconos de CoreUI
import CIcon from '@coreui/icons-react'

const Clase = () => {
  const dispatch = useDispatch();
  const clase = useSelector(state => state.clase);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
      dispatch(fetchClase());
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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h5>Clase</h5>
  </div>
  <CTable striped hover>
    <CTableHead>
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
      {clase.map((item, index) => (
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
    Nuevo clase
  </CButton>
  
  {/* Modal para agregar un nuevo usuario */}
  <CModal visible={modalVisible} onClose={toggleModal}>
  <CModalHeader closeButton>
    <h5>Crear Nuevo clase</h5>
  </CModalHeader>
  <CModalBody>
    <NewClase idInventario={ clase && clase[0] && clase[0].idInventario}/>
  </CModalBody>
</CModal>
</>
);
};

export default Clase;