import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { getAllFormateurs } from "../../../helpers/Formateur/getAllFormateurs"
import { deleteFormateurByAdmin } from "../../../helpers/Formateur/deleteFormateurByAdmin"

const Formateurs = ({user}) => {
    const [formateurs, setFormateurs] = useState([])
    const history = useHistory();
    useEffect(() => {
        getAllFormateurs(user._id)
            .then((result) => {
                setFormateurs(result.formateurs)
            })
            .catch(err => {
                setFormateurs([])
            })
    }, [user._id])

    const deleteFormateur = (id) => {
        if (window.confirm("êtes-vous sûr de vouloir supprimer ce Formateur!") === true) {
            deleteFormateurByAdmin(user._id, id)
                .then(result => {
                    if (result.status === "OK") {
                        console.log(result.message);
                        history.push("/admin/formateurs")
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const loadTable = () => {
        return formateurs.map((item) => {
            const { _id, email, nom, prenom, matricule, cin } = item
            return (
                <tr key={_id} >
                    <td> {email} </td>
                    <td> {nom} </td>
                    <td> {prenom} </td>
                    <td> {matricule} </td>
                    <td> {cin} </td>
                    <td>
                        <Link
                            to={"/admin/formateurs/" + _id + "/update"}
                            className="form-control btn btn-warning"
                        >
                            Modifier
                        </Link>
                        <button type="button" className="form-control btn btn-danger" onClick={() => { deleteFormateur(_id) }}>Supprimer</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <DashboardNavbar />
                        <h1>Liste des Formateurs</h1>
                        <div className="container">
                            <Link
                                to='/admin/formateurs/create'
                                className="btn btn-primary btn-lg  mb-4">
                                Ajouter un formateur
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing={0}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Email</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Prenom</th>
                                            <th scope="col">Matricule</th>
                                            <th scope="col">CIN</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loadTable()
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formateurs;