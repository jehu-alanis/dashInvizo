import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRequisicionInFirestore } from '../../actions/updateRequisicion';
import {
    CForm,
    CFormLabel,
    CFormInput,
    CButton,
    CCard,
    CCardBody,
  } from '@coreui/react';

const UpdateRequisicion = ({ requisicion }) => {
  // Estado inicial con los detalles de la requisición recibidos por props
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

  // Llenar el formulario con los datos existentes de la requisición al montar el componente
  useEffect(() => {
    if (requisicion) {
      setReqDetails({
        nombre: requisicion.nombre || '',
        numeroPedido: requisicion.numeroPedido || '',
        graduacionOD: requisicion.graduacionOD || '',
        graduacionOI: requisicion.graduacionOI || '',
        tipoArmazon: requisicion.tipoArmazon || '',
        tipoMica: requisicion.tipoMica || '',
        tipoReflejo: requisicion.tipoReflejo || '',
      });
    }
  }, [requisicion]);

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
    // Despachamos la acción para actualizar la requisición en Firestore
    dispatch(updateRequisicionInFirestore(requisicion.id, reqDetails));
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
            <CFormLabel>Numero Pedido</CFormLabel>
            <CFormInput
              type="text"
              name="numeroPedido"
              value={reqDetails.numeroPedido}
              onChange={handleChange}
              required
              placeholder="Ingrese el numero de pedido"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Graduacion OD</CFormLabel>
            <CFormInput
              type="text"
              name="graduacionOD"
              value={reqDetails.graduacionOD}
              onChange={handleChange}
              required
              placeholder="Ingrese la graduacion OD"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Graduacion OI</CFormLabel>
            <CFormInput
              type="text"
              name="graduacionOI"
              value={reqDetails.graduacionOI}
              onChange={handleChange}
              required
              placeholder="Ingrese la graduacion OI"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Tipo Armazon</CFormLabel>
            <CFormInput
              type="text"
              name="tipoArmazon"
              value={reqDetails.tipoArmazon}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipo de armazon"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Tipo Mica</CFormLabel>
            <CFormInput
              type="text"
              name="tipoMica"
              value={reqDetails.tipoMica}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipo de mica"
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Tipo Reflejo</CFormLabel>
            <CFormInput
              type="text"
              name="tipoReflejo"
              value={reqDetails.tipoReflejo}
              onChange={handleChange}
              required
              placeholder="Ingrese el tipo de reflejo"
            />
          </div>

          <CButton type="submit" color="primary">
            Actualizar Requisicion
          </CButton>
        </CForm>
        
        {/* Mostrar mensajes de éxito o error si existen */}
        {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      </CCardBody>
    </CCard>
  );
};

export default UpdateRequisicion;

