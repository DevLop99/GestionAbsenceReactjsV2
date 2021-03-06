import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import { getAllStagiaires } from '../../../helpers/Stagiaires/getAllStagiaires';
import { putAbsence } from '../../../helpers/Absences/putAbsence';
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import { getAbsenceByAdmin } from '../../../helpers/Absences/getAbsenceById';

function UpdateAbsence({user}) {
    const [stagiaires, setStagiaires] = useState([]);

    const {id_absence} = useParams();
    const [stagiaire, setStagiaire] = useState("");
    const [dateAbsence, setDateAbsence] = useState("")
    const [heureDebut, setHeureDebut] = useState("")
    const [heureFin, setheureFin] = useState("");

    let history = useHistory();

    useEffect(() => {
        getAllStagiaires(user._id)
            .then((result) => {
                setStagiaires(result.stagiaires)
            })
        getAbsenceByAdmin(user._id,id_absence)
        .then(result=>{
            if(result.status === "OK"){
                setStagiaire(result.details.stagiaire)
                setDateAbsence(moment(result.details.dateabsence).format("YYYY-MM-DD"))
                setHeureDebut(moment(result.details.heuredebut).format("HH:mm"))
                setheureFin(moment(result.details.heurefin).format("HH:mm"))
            }
        });
    },[user._id, id_absence])

    const handleSubmit = (e) => {
        e.preventDefault();

        putAbsence(user._id, id_absence , stagiaire , user._id, dateAbsence, heureDebut, heureFin)
            .then((result) => {
                if (result.status === "OK") {
                    history.push("/formateur/absences")
                }
                else {
                    console.log(result.message);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div>
                <DashboardNavbar />
                <div>
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2 className="h2 pb-4">Modifier une absence</h2>
                                <form className="form mt-4" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="form-group ">
                                        <label htmlFor="stagiaire">stagiaire :</label><br />
                                        <select
                                            className="form-control mb-3"
                                            aria-label="stagiaire"
                                            onChange={(e) => setStagiaire(e.target.value)}
                                            value={stagiaire}
                                        >
                                            <option>Selectionner stagiaire</option>
                                            {
                                                stagiaires.map((item, index) =>
                                                    <option
                                                        value={item._id}
                                                        key={index}
                                                    >
                                                        {item.nom + " " + item.prenom}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dateabsence">Date absence:</label><br />
                                        <input 
                                            className="form-control"
                                            type="date"
                                            value={dateAbsence}
                                            onChange={(e) => setDateAbsence(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heuredebut">Heure debut :</label><br />
                                        <input
                                            className="form-control" 
                                            type="time"
                                            min="08:00"
                                            max="18:30"
                                            onChange={(e) => setHeureDebut(e.target.value)}
                                            value={heureDebut}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heurefin">Heure Fin :</label><br />
                                        <input 
                                            className="form-control"
                                            type="time"
                                            min="08:00"
                                            max="18:30"
                                            onChange={(e) => setheureFin(e.target.value)}
                                            value={heureFin}
                                        />
                                    </div>

                                    <div className="form-group justify-content-center">
                                        <input type="submit" className="btn btn-success form-control" value="Modifier" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAbsence

