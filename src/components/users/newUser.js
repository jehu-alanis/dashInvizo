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

  const generateRandomPassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
  
  const NewUser = () => {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(generateRandomPassword());
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
        email,
        userType,
        name,
        password
      };
      dispatch(createUserInFirestore(newUser));
    };
  
    return (
      <CCard>
        <CCardHeader>
          <h3>Crear Nuevo Usuario</h3>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingrese el correo electrónico"
              />
            </div>
  
            <div className="mb-3">
              <CFormLabel>Tipo de Usuario</CFormLabel>
              <CFormSelect
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ingrese el nombre completo"
              />
            </div>
  
            {/* Campo invisible para almacenar la contraseña */}
            <input type="hidden" value={password} />

            <CButton type="submit" color="primary">
              Crear Usuario
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    );
  };
  
  export default NewUser;