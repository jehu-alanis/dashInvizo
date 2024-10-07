import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBicelFirestore } from '../../../actions/addBicel';
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
  
  const NewBisel = () => {
    const [userDetails, setUserDetails] = useState({
     nombre: '',
      tipo: '',
      existencia: '',
      precio: '',
      pVenta: '',
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
      dispatch(createBicelFirestore(userDetails, idInventario));
      // Restablecemos el estado a los valores iniciales
      setUserDetails({
       nombre: '',
        tipo: '',
        existencia: '',
        precio: '',
        pVenta: '',
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
              value={userDetails.nombre}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre completo"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Tipo</CFormLabel>
            <CFormInput
              type="text"
              name="tipo"
              value={userDetails.tipo}
              onChange={handleChange}
              required
              placeholder="Ingrese el Tipo"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Existencia</CFormLabel>
            <CFormInput
              type="text"
              name="existencia"
              value={userDetails.existencia}
              onChange={handleChange}
              required
              placeholder="Ingrese existencia"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Precio</CFormLabel>
            <CFormInput
              type="text"
              name="precio"
              value={userDetails.precio}
              onChange={handleChange}
              required
              placeholder="Ingrese el precio"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Precio de Venta </CFormLabel>
            <CFormInput
              type="text"
              name="pVenta"
              value={userDetails.pVenta}
              onChange={handleChange}
              required
              placeholder="Ingrese el Precio de Venta    completo"
            />
          </div>
          <CButton type="submit" color="primary">
            Crear Bicel
          </CButton>
        </CForm>
         {/* Mostrar el mensaje de éxito si existe */}
         {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
         {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      </CCardBody>
    </CCard>
  );
};
  
  export default NewBisel;