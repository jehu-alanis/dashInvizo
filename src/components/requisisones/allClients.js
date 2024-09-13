import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton } from '@coreui/react';
import { fetchClient } from '../../actions/fetchClient';

import { cilPencil, cilTrash } from '@coreui/icons'; // Íconos de CoreUI
import CIcon from '@coreui/icons-react'

const AllClients = () => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients);

    useEffect(() => {
        dispatch(fetchClient());
    }, [dispatch]);

    const handleEdit = (userId) => {
        // Lógica para manejar la edición del usuario
        console.log("Editar usuario con ID:", userId);
      };
    
    const handleDelete = (userId) => {
    // Lógica para manejar la eliminación del usuario
    console.log("Eliminar usuario con ID:", userId);
    };

  return (
    <CTable striped hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Nombre</CTableHeaderCell>
          <CTableHeaderCell>N Pedido</CTableHeaderCell>
          <CTableHeaderCell>Graduacion Ojo D</CTableHeaderCell>
          <CTableHeaderCell>Graduacion Ojo I</CTableHeaderCell>
          <CTableHeaderCell>Tipo de Armazon</CTableHeaderCell>
          <CTableHeaderCell>Tipo de Mica</CTableHeaderCell>
          <CTableHeaderCell>Tipo de reflejo</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>


        </CTableRow>
      </CTableHead>
      <CTableBody>
        {clients.map((user, index) => (
          <CTableRow key={user.id}>
            <CTableDataCell>{user.nombre}</CTableDataCell>
            <CTableDataCell>{user.numeroPedido}</CTableDataCell>
            <CTableDataCell>{user.graduacionOD}</CTableDataCell>
            <CTableDataCell>{user.graduacionOI}</CTableDataCell>
            <CTableDataCell>{user.tipoArmazon}</CTableDataCell>
            <CTableDataCell>{user.tipoMica}</CTableDataCell>
            <CTableDataCell>{user.tipoReflejo}</CTableDataCell>
            <CTableDataCell>
              <CButton size="sm" className="mr-2" onClick={() => handleEdit(user.id)}>
                <CIcon icon={cilPencil}  className="text-info"/> Editar
              </CButton>
              <CButton  size="sm" onClick={() => handleDelete(user.id)}>
                <CIcon icon={cilTrash} className="text-danger"/> Eliminar
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default AllClients;