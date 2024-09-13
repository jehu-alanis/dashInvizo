import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserInFirestore } from '../../actions/addUser';

import { setRequesicion } from '../../actions/addRequisicion';

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

  const NewUser = () => {

    const [userDetails, setUserDetails] = useState({
      email: '',
      userType: '',
      name: '',
      password: generateRandomPassword(),
    });
    const successMessage = useSelector((state) => state.successMessage);
    const errorMessage = useSelector((state) => state.errorMessage);

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
      dispatch(setRequesicion(userDetails));
      // Restablecemos el estado a los valores iniciales
      setUserDetails({
        email: '',
        userType: '',
        name: '',
        password: generateRandomPassword(),
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

          {/* Campo invisible para almacenar la contraseña */}
          <input type="hidden" value={userDetails.password} />

          <CButton type="submit" color="primary">
            Crear Requisicion
          </CButton>
        </CForm>
         {/* Mostrar el mensaje de éxito si existe */}
         {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
         {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      </CCardBody>
    </CCard>
  );
};
  
  export default NewUser;