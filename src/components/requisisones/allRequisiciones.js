import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton } from '@coreui/react';
import { fetchRequisicion } from '../../actions/fetchRequisicion';
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AllRequisicion = () => {
    const dispatch = useDispatch();
    const requisicion = useSelector(state => state.requisicion);

    useEffect(() => {
        dispatch(fetchRequisicion());
    }, [dispatch]);

    const handleEdit = (userId) => {
        console.log("Editar usuario con ID:", userId);
      };
    
    const handleDelete = (userId) => {
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
          <CTableHeaderCell>Estatus</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>


        </CTableRow>
      </CTableHead>
      <CTableBody>
        {requisicion.map((item, index) => (
          <CTableRow key={item.id}>
            <CTableDataCell>{item.nombre}</CTableDataCell>
            <CTableDataCell>{item.numeroPedido}</CTableDataCell>
            <CTableDataCell>{item.graduacionOD}</CTableDataCell>
            <CTableDataCell>{item.graduacionOI}</CTableDataCell>
            <CTableDataCell>{item.tipoArmazon}</CTableDataCell>
            <CTableDataCell>{item.tipoMica}</CTableDataCell>
            <CTableDataCell>{item.tipoReflejo}</CTableDataCell>
            <CTableDataCell>{item.status}</CTableDataCell>

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

export default AllRequisicion;