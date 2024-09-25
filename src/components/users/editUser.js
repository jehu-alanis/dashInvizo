import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormSelect } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { updateUserInFirestore } from '../../actions/updateUser'; // Acción para actualizar el usuario

const EditUser = ({ existingUser, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(existingUser);

  useEffect(() => {
    setUserDetails(existingUser); // Establecer los detalles del usuario cuando se abra el modal
  }, [existingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInFirestore(userDetails)); // Llama a la acción para actualizar el usuario
    onClose(); // Cierra el modal después de la actualización
  };

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Editar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Nombre</CFormLabel>
            <CFormInput
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Tipo de Usuario</CFormLabel>
            <CFormSelect
              name="userType"
              value={userDetails.userType}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo de usuario</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
              <option value="viewer">Visualizador</option>
              <option value="guest">Invitado</option>
            </CFormSelect>
          </div>
          <CButton type="submit" color="primary">Actualizar</CButton>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditUser;

