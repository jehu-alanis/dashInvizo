import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserInFirestore } from '../../actions/addUser';
import { fetchClients } from '../../actions/fetchClientes';

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
      material: '',
      clase:"",
      idVenta: "",
    });

    const successMessage = useSelector((state) => state.successMessage);
    const errorMessage = useSelector((state) => state.errorMessage);
    const clients = useSelector((state) => state.clients);

console.log(clients,"clients")
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchClients());
  }, [dispatch]);

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
        material: '',
        clase:"",
        idVenta: "",
      });
    };
  
    return (
      <>
      <CCard>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Id venta</CFormLabel>
                <CFormInput
                  type="text"
                  name="idVenta"
                  value={reqDetails.idVenta}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el idVenta"
                />
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Folio cliente</CFormLabel>
                <CFormInput
                  type="text"
                  name="numeroPedido"
                  value={reqDetails.numeroPedido}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese Folio cliente"
                />
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Cliente</CFormLabel>
                <CFormSelect
                  name="nombre"
                  value={reqDetails.nombre}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Ingrese el Cliente
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.nombre}>
                      {client.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
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
    
              <div style={{ flex: 1, minWidth: '200px' }}>
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
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>ADD</CFormLabel>
                <CFormInput
                  type="text"
                  name="tipoMica"
                  value={reqDetails.tipoMica}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el ADD"
                />
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  name="material"
                  value={reqDetails.material}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un material</option>
                  <option value="HI INDEX AR ">HI INDEX AR </option>
                  <option value="BLUE">BLUE</option>
                  <option value="FOTO BLUE">FOTO BLUE</option>
                  <option value="FOTO AR">FOTO AR</option>
                  <option value="POLY W">POLY W</option>
                  <option value="POLY AR">POLY AR</option>
                  <option value="POLY BLUE">POLY BLUE</option>
                  <option value="POLY FOTO BLUE">POLY FOTO BLUE</option>
                  <option value="POLARIZADO">POLARIZADO</option>
                  <option value="ULTRA HI INDEX">ULTRA HI INDEX</option>
                  <option value="CR">CR</option>
                  <option value="MR-7 PLUS">MR-7 PLUS</option>
                  <option value="MR-8  FOTO PLUS BLUE">MR-8  FOTO PLUS BLUE</option>
                  <option value="OTRO…">OTRO…</option>
                </CFormSelect>
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Clase</CFormLabel>
                <CFormSelect
                  name="clase"
                  value={reqDetails.clase}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una clase</option>
                  <option value="MONOFOCAL">MONOFOCAL</option>
                  <option value="BIFOCAL ">BIFOCAL </option>
                  <option value="BLEND">BLEND</option>
                  <option value="PROGRESIVO">PROGRESIVO</option>
                  <option value="OTRO…">OTRO…</option>
                </CFormSelect>
              </div>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Armazon</CFormLabel>
                <CFormSelect
                  name="tipoArmazon"
                  value={reqDetails.tipoArmazon}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un Armazon</option>
                  <option value="COMPLETO">COMPLETO</option>
                  <option value="RANURADO ">RANURADO </option>
                  <option value="3 PIEZAS">3 PIEZAS</option>
                  <option value="OTRO…">OTRO…</option>
                </CFormSelect>
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CFormLabel>Bicel</CFormLabel>
                <CFormSelect
                  name="tipoMica"
                  value={reqDetails.tipoMica}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un Bicel</option>
                  <option value="SI SE RELIZO">SI SE RELIZO </option>
                  <option value="NO SE REALIZO">NO SE REALIZO  </option>
                  <option value="MEDIO BICEL">MEDIO BICEL</option>
                  <option value="REBICEL">REBICEL</option>
                  <option value="OTRO…">OTRO…</option>
                </CFormSelect>
              </div>
    
              <div style={{ flex: 1, minWidth: '200px' }}>
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
            </div>
    
            
          </CForm>
          
          {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
        </CCardBody>
      </CCard>
      <CButton type="submit" color="primary">
        Crear Requisicion
      </CButton>
    </>

    );
    
};
  
export default NewRequisicion;