import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserInFirestore } from '../../actions/addUser';

import { createRequisicionInFirestore } from '../../actions/addRequisicion';

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

  const NewRequisicion = () => {

    const [reqDetails, setReqDetails] = useState({
      nombre: '',
      numeroPedido: '',
      graduacionOD: '',
      graduacionOI: '',
      tipoArmazon: '',
      tipoMica: '',
      tipoReflejo: '',
    });

    const successMessage = useSelector((state) => state.successMessage);
    const errorMessage = useSelector((state) => state.errorMessage);

    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      // Actualizamos el estado para el campo específico
      setReqDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createRequisicionInFirestore(reqDetails));
      // Restablecemos el estado a los valores iniciales
      setReqDetails({
        nombre: '',
        numeroPedido: '',
        graduacionOD: '',
        graduacionOI: '',
        tipoArmazon: '',
        tipoMica: '',
        tipoReflejo: '',
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
              name="nombre"
              value={reqDetails.nombre}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>numeroPedido</CFormLabel>
            <CFormInput
              type="text"
              name="numeroPedido"
              value={reqDetails.numeroPedido}
              onChange={handleChange}
              required
              placeholder="Ingrese numeroPedido"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>graduacionOD</CFormLabel>
            <CFormInput
              type="text"
              name="graduacionOD"
              value={reqDetails.graduacionOD}
              onChange={handleChange}
              required
              placeholder="Ingrese el graduacionOD"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>graduacionOI</CFormLabel>
            <CFormInput
              type="text"
              name="graduacionOI"
              value={reqDetails.graduacionOI}
              onChange={handleChange}
              required
              placeholder="Ingrese el graduacionOI"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>tipoArmazon</CFormLabel>
            <CFormInput
              type="text"
              name="tipoArmazon"
              value={reqDetails.tipoArmazon}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipoArmazon"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>tipoMica</CFormLabel>
            <CFormInput
              type="text"
              name="tipoMica"
              value={reqDetails.tipoMica}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipoMica"
            />
          </div> <div className="mb-3">
            <CFormLabel>tipoReflejo</CFormLabel>
            <CFormInput
              type="text"
              name="tipoReflejo"
              value={reqDetails.tipoReflejo}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipoReflejo"
            />
          </div>

         

      
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
  
export default NewRequisicion;