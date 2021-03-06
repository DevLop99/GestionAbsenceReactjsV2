import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { deleteFilierByAdmin } from '../../../helpers/Filiers/deleteFilierByAdmin';
import { getAllFiliers } from '../../../helpers/Filiers/getAllFiliersByAdmin';
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const Filiers = ({user}) => {
    const history = useHistory();
    const [filiers, setfiliers] = useState([])
    useEffect(() => {
        getAllFiliers(user._id)
            .then((result) => {
                setfiliers(result.details)
            }).catch(err => {
                console.log(err);
            })
    }, [user._id])

    const deleteFilier = (id_filier) => {
        if (window.confirm("êtes-vous sûr de vouloir supprimer cette filier!") === true) {
            deleteFilierByAdmin(user._id, id_filier)
                .then(result => {
                    if (result.status === "OK") {
                        console.log("supprmé avec succes");
                        history.push("/admin/filiers");
                    }
                    else {
                        console.log("error lors de la suppression!");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const loadTable = () => {
        return filiers.map((item) => {
            const { _id, designation, niveau } = item
            return (
                <tr key={_id} >
                    <td> {designation} </td>
                    <td> {niveau} </td>
                    <td>
                        <Link
                            to={"/admin/filiers/" + _id + "/update"}
                            className="form-control btn btn-warning"
                        >
                            Modifier
                        </Link>
                        <button type="button" className="form-control btn btn-danger" onClick={() => deleteFilier(_id)}>Supprimer</button>
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
                        <h1>Liste des Filiers</h1>
                        <div className="container">
                            <Link
                                to='/admin/filiers/create'
                                className="btn btn-primary btn-lg  mb-4">
                                Ajouter un Filier
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing={0}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Designation</th>
                                            <th scope="col">Niveau</th>
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

export default Filiers;