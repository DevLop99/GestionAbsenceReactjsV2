import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import { useSelector } from "react-redux"
import { Redirect } from 'react-router'
import { getAllFormateurs } from '../../../helpers/getAllFormateurs';
import { getAllStagiaires } from '../../../helpers/getAllStagiaires';
import { putAbsenceByAdmin } from '../../../helpers/Admin/Absences/putAbsenceByAdmin';
import { useHistory } from "react-router-dom";
import moment from 'moment';

function UpdateAbsence() {
    const isLogged = useSelector(state => state.auth.isLogged);
    const absenceToUpdate = useSelector(state => state.updateAbsence.absenceToUpdate);
    const [stagiaires, setstagiaires] = useState([]);
    const [formateurs, setformateurs] = useState([]);

    const [stagiaire, setstagiaire] = useState("");
    const [formateur, setformateur] = useState("");
    const [dateAbsence, setDateAbsence] = useState("");
    const [heureDebut, setheureDebut] = useState("");
    const [heureFin, setheureFin] = useState("");

    let history = useHistory();

    useEffect(() => {
        setstagiaire(absenceToUpdate.stagiaire);
        setformateur(absenceToUpdate.formateur);
        setDateAbsence(moment(absenceToUpdate.dateabsence).format("YYYY-MM-DD"));
        setheureDebut(moment(absenceToUpdate.heuredebut).format("HH:mm"));
        setheureFin(moment(absenceToUpdate.heurefin).format("HH:mm"));

        getAllStagiaires("609a93614f29bc1bbc6ea128")
            .then((result) => {
                setstagiaires(result.stagiaires)
            })

        getAllFormateurs()
            .then((result) => {
                setformateurs(result.formateurs)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        putAbsenceByAdmin("609a93614f29bc1bbc6ea128", absenceToUpdate._id, stagiaire, formateur, dateAbsence, heureDebut, heureFin)
            .then((result) => {
                if (result.status === "OK") {
                    history.push("/admin/absences")
                }
                else {
                    console.log(result.message);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    if (!isLogged)
        return <Redirect to="/login" />
    if (!absenceToUpdate)
        return <Redirect to="/admin/absences" />
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
                                            className="form-select mb-3"
                                            aria-label="stagiaire"
                                            onChange={(e) => setstagiaire(e.target.value)}
                                            value={absenceToUpdate.stagiaire}
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
                                        <label htmlFor="formateur">formateur :</label><br />
                                        <select
                                            className="form-select mb-3"
                                            ria-label="formateur"
                                            onChange={(e) => setformateur(e.target.value)}
                                            value={absenceToUpdate.formateur}
                                        >
                                            <option>Selectionner formateur</option>
                                            {
                                                formateurs.map((item, index) =>
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
                                        <label htmlFor="dateabsence">date absence :</label><br />
                                        <input type="date"
                                            max="2021-05-30"
                                            value={dateAbsence}
                                            onChange={(e) => setDateAbsence(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heuredebut">Heure debut :</label><br />
                                        <input type="time"
                                            min="08:00"
                                            max="18:30"
                                            onChange={(e) => setheureDebut(e.target.value)}
                                            value={heureDebut}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heurefin">Heure Fin :</label><br />
                                        <input type="time"
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

