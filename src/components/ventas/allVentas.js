import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton, CModal, CModalBody, CModalHeader } from '@coreui/react';
import { fetchVentas } from '../../actions/fetchVentas';
import { cilPencil, cilTrash, cilFile, cilSpreadsheet} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';

const AllVentas = () => {
    const dispatch = useDispatch();
    const ventas = useSelector(state => state.ventas);

    useEffect(() => {
        dispatch(fetchVentas()); // Se obtiene la lista de requisiciones desde Firestore
    }, [dispatch]);

    return (
        <>
        <CTable striped hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>Id Venta</CTableHeaderCell>
                    <CTableHeaderCell>Folio cliente</CTableHeaderCell>
                    <CTableHeaderCell>Cliente</CTableHeaderCell>
                    <CTableHeaderCell>OD</CTableHeaderCell>
                    <CTableHeaderCell>OI</CTableHeaderCell>
                    <CTableHeaderCell>ADD</CTableHeaderCell>

                    <CTableHeaderCell>Material</CTableHeaderCell>
                    <CTableHeaderCell>Clase</CTableHeaderCell>
                    <CTableHeaderCell>Armazon</CTableHeaderCell>
                    <CTableHeaderCell>Bicel</CTableHeaderCell>

                    <CTableHeaderCell>Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {ventas.map((item) => (
                    <CTableRow key={item.id}>
                        <CTableDataCell>{item.idVenta}</CTableDataCell>
                        <CTableDataCell>{item.numeroPedido}</CTableDataCell>
                        <CTableDataCell>{item.nombre}</CTableDataCell>
                        <CTableDataCell>{item.graduacionOD}</CTableDataCell>
                        <CTableDataCell>{item.graduacionOI}</CTableDataCell>
                        <CTableDataCell>{item.tipoMica}</CTableDataCell>
                        <CTableDataCell>{item.material}</CTableDataCell>

                        <CTableDataCell>{item.clase}</CTableDataCell>

                        <CTableDataCell>{item.tipoArmazon}</CTableDataCell>
                        <CTableDataCell>{item.tipoReflejo}</CTableDataCell>
                        <CTableDataCell>
                            <span
                              className={
                                item.status === "en proceso"
                                  ? "badge bg-warning text-dark"
                                  : item.status === "cancelado"
                                  ? "badge bg-danger"
                                  : item.status === "pagado"
                                  ? "badge bg-success"
                                  : "badge bg-secondary"
                              }
                                >
                                {item.status}
                            </span>
                            
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButton size="sm" className="mr-2" >
                                <CIcon icon={cilFile} className="text-info"/> PDF
                            </CButton>
                            <CButton size="sm">
                                <CIcon icon={cilSpreadsheet} className="text-success"/> Excel
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>

      
        </>
    );
};

export default AllVentas;
