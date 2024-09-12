import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserInFirestore } from '../../actions/addUser';
import {
    CForm,
    CFormLabel,
    CFormInput,
    CFormSelect,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
  } from '@coreui/react';

  
  const EditUser = () => {
    const [userDetails, setUserDetails] = useState({
      email: '',
      userType: '',
      name: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      // Actualizamos el estado para el campo específico
      setUserDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createUserInFirestore(userDetails));
      // Restablecemos el estado a los valores iniciales
      setUserDetails({
        email: '',
        userType: '',
        name: '',
      });
    };
  
  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
              placeholder="Ingrese el correo electrónico"
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

          <div className="mb-3">
            <CFormLabel>Nombre</CFormLabel>
            <CFormInput
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre completo"
            />
          </div>

          <CButton type="submit" color="primary">
            Crear Usuario
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
  
  export default EditUser;