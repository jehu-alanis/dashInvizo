import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRequisicionInFirestore } from '../../actions/updateRequisicion';
import { copyRequisicionToVentas } from '../../actions/udateStatus';
import { deleteRequisicionInFirestore } from '../../actions/deleteRequisicion';

import {
    CForm,
    CFormLabel,
    CFormInput,
    CButton,
    CCard,
    CCardBody,
  } from '@coreui/react';

const UpdateSatus = ({ requisicion }) => {
  // Estado inicial con los detalles de la requisición recibidos por props
  console.log(requisicion,"requesicion ")
  const [reqDetails, setReqDetails] = useState({
    nombre: '',
    numeroPedido: '',
    graduacionOD: '',
    graduacionOI: '',
    tipoArmazon: '',
    tipoMica: '',
    tipoReflejo: '',
    status: "",
    idVenta: "",
    material: "",
    clase: "",
    id: "",
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
        status: requisicion.status  ||"",
        idVenta: requisicion.idVenta || "",
        material: requisicion.material || "",
        clase: requisicion.material || "",
        id: requisicion.id || ""
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

    if (reqDetails.status != "pagado") {
        dispatch(updateRequisicionInFirestore(reqDetails.id, reqDetails));
    }else {

        
        dispatch(deleteRequisicionInFirestore(reqDetails.id))
        dispatch(copyRequisicionToVentas(reqDetails));
    }
    
    //dispatch(updateRequisicionInFirestore(requisicion.id, reqDetails));
  };

  const handleStatusChange = (e) => {
    const {value } = e.target;
    setReqDetails((prevState) => ({
        ...prevState,
        status: value,
      }));
  };

  return (
    <div className="mb-3">
        <CForm onSubmit={handleSubmit}>
        <label htmlFor="status-select" className="form-label">Selecciona el nuevo estado</label>
        <select
        id="status-select"
        className="form-select"
        value={reqDetails.status}
        onChange={handleStatusChange}
        >
        <option value="en proceso">En proceso</option>
        <option value="pagado">Pagado</option>
        <option value="cancelado">Cancelado</option>
        </select>
        <CButton type="submit" color="primary" style={{ marginTop: '10px' }}>
            Actualizar Requisicion
        </CButton>
    </CForm>
    {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
    {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
  </div>
  );
};

export default UpdateSatus;
