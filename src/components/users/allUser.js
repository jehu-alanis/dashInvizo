import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CButton } from '@coreui/react';
import { fetchUsers } from '../../actions/fetchUsers';
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteUserInFirestore } from '../../actions/deleteUser'; // Importar la acción de eliminar usuario
import EditUserModal from './editUserModal';

const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalOpen(true); // Abre el modal
    };

    // Cierra el modal de edición
    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null); // Limpia el usuario seleccionado
    };

    // Maneja la eliminación de un usuario
    const handleDelete = (userId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            dispatch(deleteUserInFirestore(userId)); // Llama a la acción para eliminar el usuario
        }
    };

    return (
        <>
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
                                <CButton size="sm" className="mr-2" onClick={() => handleEdit(user)}>
                                    <CIcon icon={cilPencil} className="text-info" /> Editar
                                </CButton>
                                <CButton size="sm" onClick={() => handleDelete(user.id)}>
                                    <CIcon icon={cilTrash} className="text-danger" /> Eliminar
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {selectedUser && (
                <EditUserModal
                    existingUser={selectedUser}
                    isOpen={modalOpen}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default AllUsers;


