import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createClientInFirestore } from '../../actions/addClients';
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
  
  const NewClient = () => {
    const [userDetails, setUserDetails] = useState({
      name: '',
      folio: '',
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
      dispatch(createClientInFirestore(userDetails));
      // Restablecemos el estado a los valores iniciales
      setUserDetails({
        name: '',
        folio: '',
      });
    };
  
  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
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
          <div className="mb-3">
            <CFormLabel>Folio Ciente</CFormLabel>
            <CFormInput
              type="text"
              name="folio"
              value={userDetails.folio}
              onChange={handleChange}
              required
              placeholder="Ingrese el Folio Ciente"
            />
            
          </div>

          
          <CButton type="submit" color="primary">
            Crear Usuario
          </CButton>
        </CForm>
         {/* Mostrar el mensaje de éxito si existe */}
         {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
         {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      </CCardBody>
    </CCard>
  );
};
  
  export default NewClient;