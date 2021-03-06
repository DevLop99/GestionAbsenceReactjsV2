import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import { useHistory, useParams } from 'react-router'
import { putFormateurByAdmin } from '../../../helpers/Formateur/putFormateurByAdmin';
import { getFormateurByAdmin } from '../../../helpers/Formateur/getFormateurByAdmin';

function UpdateFormateur({user}) {
    const history = useHistory();

    const [formateur, setformateur] = useState("");
    const [email, setemail] = useState("");
    const [nom, setnom] = useState("");
    const [prenom, setprenom] = useState("");
    const [matricule, setmatricule] = useState("");
    const [cin, setcin] = useState("");
    const [motdepasse, setmotdepasse] = useState("");
    const [confirmation, setconfirmation] = useState("");

    const { id_f } = useParams()
    useEffect(() => {
        getFormateurByAdmin(user._id,id_f)
        .then(result =>{
            if(result.status === "OK"){
                const formateur = result.details
                setformateur(formateur._id);
                setemail(formateur.email);
                setnom(formateur.nom);
                setprenom(formateur.prenom);
                setmatricule(formateur.matricule);
                setcin(formateur.cin)
            }
        }).catch(err => {
            console.log(err);
        })
        return () => {
            console.log("cleanUP!");
        }
    }, [ user._id , id_f ])

    const handleSubmit = (e) => {
        e.preventDefault();
        if( motdepasse === confirmation ){
            putFormateurByAdmin(user._id,formateur,email,nom ,prenom,matricule,cin,motdepasse)
            .then(result => {
                if(result.status === "OK"){
                    history.push("/admin/formateurs")
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            console.log("Mot de passe et confirmation ne correspond pas");
        }
    }

    return (
        <div>
            <div>
                <DashboardNavbar />
                <div>
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2 className="h2 pb-4">Modifier un formateur</h2>
                                <form className="form mt-4" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label><br />
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nom">Nom:</label><br />
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="nom"
                                            value={nom}
                                            onChange={(e) => setnom(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="prenom">Prenom:</label><br />
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="prenom"
                                            value={prenom}
                                            onChange={(e) => setprenom(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="matricule">Matricule:</label><br />
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="matricule"
                                            value={matricule}
                                            onChange={(e) => setmatricule(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cin">CIN:</label><br />
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="cin"
                                            value={cin}
                                            onChange={(e) => setcin(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mdp">Mot de Passe:</label><br />
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="mdp"
                                            value={motdepasse}
                                            onChange={(e) => setmotdepasse(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmation">Confirmation:</label><br />
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="confirmation"
                                            value={confirmation}
                                            onChange={(e) => setconfirmation(e.target.value)}
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

export default UpdateFormateur

