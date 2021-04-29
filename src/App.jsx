import React, { useState } from "react";
import "./App.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { firebase } from "./firebase";

export function App() {
  const [appointments, setAppointment] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const createData = () => {    
    const db = firebase.firestore();
    db.collection("citas")
      .add({
        nombre_cliente:"Alejandro",
        peluquero:"Espinete",
        fecha:"10/05/2021",
        tarea:"cortar"
      })
      .then(() => {
        console.log("Document successfully written!");
        readAllData();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const readAllData = () => {
    const db = firebase.firestore();
    db.collection("citas")
      .get()
      .then((querySnapshot) => {
        let allAppoinments = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          allAppoinments.push(doc.data());
        });

        setAppointment(allAppoinments);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const saveData = (e) => {
    e.preventDefault();

    const newData = {
      nombre_cliente: e.target.nombre.value,
      fecha: startDate,
      peluquero: e.target.peluquero.value,
      tarea: e.target.tarea.value,
    };
    const db = firebase.firestore();
    db.collection("citas")
      .add(newData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    e.target.reset();
  };

  return (
    <div className="container mt-4">
      <div class="row">
        <h1>Des-Pelu-Jandro</h1>
        <p>
          Si necesitas podar tu almendra tras esos largos dias de confinamiento
          solicita cita en tu peluquería de confianza.
        </p>
      </div>
      <div className="row">
        <div className="AppoinmentList">
          <ul className="list-group">
            {appointments.map((appoinment, i) => (
              <li key={i} className="list-group-item">
                {appoinment.nombre_cliente},{appoinment.peluquero}
              </li>
            ))}
          </ul>
        </div>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn ms-2 btn-danger">
            Eliminar
          </button>
          <button type="button" class="btn ms-2 btn-warning" onClick={createData}>
            Crear datos
          </button>
          <button type="button" class="btn ms-2 btn-success" onClick={readAllData}>
            Leer datos
          </button>
        </div>
      </div>
      <div className="col-12 mt-4">
        <h2>Crear cita:</h2>
          <form onSubmit={saveData}>
            <input
              type="text"
              placeholder="Ingrese nombre"
              className="form-control mb-2"
              name="nombre"
            />
            <span className="mb-2">Seleccion fecha para tu cita:</span>
            <DatePicker className="form-control mb-2" selected={startDate} onChange={date => setStartDate(date)} />

            <input type="time" id="appt" name="appt"
       min="09:00" max="18:00" required/>

            <input
              type="text"
              placeholder="Ingrese Estado"
              className="form-control mb-2"
              name="state"
            />
            <button className="btn btn-primary btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
    </div>
  );
}
