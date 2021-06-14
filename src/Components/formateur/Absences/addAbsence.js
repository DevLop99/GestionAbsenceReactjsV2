import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import { useSelector } from "react-redux"
import { Redirect } from 'react-router'
import { getAllStagiaires } from '../../../helpers/getAllStagiaires';
import { postAbsence } from '../../../helpers/Absences/postAbsence';
import { useHistory } from "react-router-dom";


function AddAbsenceFormateur() {
    const isLogged = useSelector(state => state.auth.isLogged);
    const [stagiaires, setstagiaires] = useState([]);

    const [stagiaire, setstagiaire] = useState("");
    const [formateur, setformateur] = useState("");
    const [dateabsence, setdateabsence] = useState();
    const [heureDebut, setheureDebut] = useState();
    const [heureFin, setheureFin] = useState();

    const history = useHistory();

    useEffect(() => {
        getAllStagiaires("6099e10b7ea02b34e4f75cbb")
            .then((result) => {
                setstagiaires(result.stagiaires)
            })
    }, [])

    const remplirComboStagiaires = () => {
        return stagiaires.map((item, index) => {
            return (
                <option value={item._id} key={index}>{item.nom + " " + item.prenom}</option>
            )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postAbsence("6099e10b7ea02b34e4f75cbb", stagiaire, "6099e10b7ea02b34e4f75cbb", dateabsence, heureDebut, heureFin)
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

    if (!isLogged)
        return <Redirect to="/login" />
    return (
        <div>
            <div>
                <DashboardNavbar />
                <div>
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2 className="h2 pb-4">Ajouter une absence</h2>
                                <form className="form mt-4" onSubmit={(e) => handleSubmit(e)}>

                                    <div className="form-group ">
                                        <label htmlFor="stagiaire">stagiaire :</label><br />
                                        <select
                                            className="form-control mb-3"
                                            aria-label="stagiaire"
                                            onChange={(e) => setstagiaire(e.target.value)}
                                        >
                                            <option>Selectionner stagiaire</option>
                                            {
                                                remplirComboStagiaires()
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dateabsence">date absence :</label><br />
                                        <input type="date"
                                            className="form-control"
                                            onChange={(e) => setdateabsence(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heuredebut">Heure debut :</label><br />
                                        <input
                                            className="form-control" 
                                            type="time"
                                            min="08:00"
                                            max="18:30"
                                            onChange={(e) => setheureDebut(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="heurefin">Heure Fin :</label><br />
                                        <input 
                                            className="form-control"
                                            type="time"
                                            min="08:00"
                                            max="18:30"
                                            onChange={(e) => setheureFin(e.target.value)} />
                                    </div>


                                    <div className="form-group justify-content-center">
                                        <input type="submit" className="btn btn-success form-control" value="Ajouter" />
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

export default AddAbsenceFormateur;
