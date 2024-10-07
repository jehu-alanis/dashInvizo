import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton, CModal, CModalBody, CModalHeader } from '@coreui/react';
import { fetchRequisicion } from '../../actions/fetchRequisicion';
import { updateRequisicionInFirestore } from '../../actions/updateRequisicion';
import { deleteRequisicionInFirestore } from '../../actions/deleteRequisicion';  // Importamos la acción de eliminar
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import UpdateRequisicion from './UpdateRequisicion';  // Importamos el componente de actualización

const AllRequisicion = () => {
    const dispatch = useDispatch();
    const requisiciones = useSelector(state => state.requisicion);
    
    const [selectedRequisicion, setSelectedRequisicion] = useState(null); // Requisición seleccionada para editar
    const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal

    useEffect(() => {
        dispatch(fetchRequisicion()); // Se obtiene la lista de requisiciones desde Firestore
    }, [dispatch]);

    // Función que maneja la edición de una requisición
    const handleEdit = (requisicion) => {
        setSelectedRequisicion(requisicion);  // Guardamos la requisición seleccionada en el estado
        setModalVisible(true);  // Mostramos el modal
    };

     // Función para cerrar el modal
     const toggleModal = () => {
        setModalVisible(!modalVisible);  // Cambia el estado del modal (abrir/cerrar)
    };

    // Función para eliminar requisición
    const handleDelete = (requisicionId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta requisición?")) {
            dispatch(deleteRequisicionInFirestore(requisicionId));
        }
    };

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
                {requisiciones.map((item) => (
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
                        <CTableDataCell>{item.status}</CTableDataCell>
                        <CTableDataCell>
                            <CButton size="sm" className="mr-2" onClick={() => handleEdit(item)}>
                                <CIcon icon={cilPencil} className="text-info"/> Editar
                            </CButton>
                            <CButton size="sm" onClick={() => handleDelete(item.id)}>
                                <CIcon icon={cilTrash} className="text-danger"/> Eliminar
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>

        {/* Modal para editar requisición */}
        <CModal visible={modalVisible} onClose={toggleModal}>
            <CModalHeader closeButton>Editar Requisición</CModalHeader>
            <CModalBody>
                {selectedRequisicion && (
                    <UpdateRequisicion requisicion={selectedRequisicion} onClose={toggleModal} />
                )}
            </CModalBody>
        </CModal>
        </>
    );
};

export default AllRequisicion;
