import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton } from '@coreui/react';
import { fetchUsers } from '../../actions/fetchUsers';
import { cilPencil, cilTrash } from '@coreui/icons'; // Íconos de CoreUI
import CIcon from '@coreui/icons-react'

const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
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
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Nombre</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>Tipo de Usuario</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.map((user, index) => (
          <CTableRow key={user.id}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{user.name}</CTableDataCell>
            <CTableDataCell>{user.email}</CTableDataCell>
            <CTableDataCell>{user.userType}</CTableDataCell>
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

export default AllUsers;