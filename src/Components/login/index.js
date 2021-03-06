import React, { useState } from 'react';
import "./Login.css"
import { useDispatch } from "react-redux"
import { signInAction , signOffAction} from "../../actions/authActions"
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom"
const { fetchUserFromApi } = require("../../helpers/login/fetchUserFromApi");

const Login = ({user}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()

    const hadleform = (e) => {
        e.preventDefault();
        fetchUserFromApi(userEmail, userPassword)
            .then((result) => {
                if (result.user !== undefined) {
                    dispatch(signInAction(result.user))
                    Cookies.set("logged", {
                        user: result.user,
                        isLogged : true
                    }, { expires: 1 / 72 })
                    if(result.user.type === "Gestionnaire")
                        history.push("/admin/dashboard")
                    else if(result.user.type === "Formateur")
                        history.push("/formateur/dashboard")
                }
                else {
                    console.log("error login");
                    dispatch(signOffAction(result.user))
                }
            })
            .catch((error) => {
                console.log("error login");
                dispatch(signOffAction( error.user ))
            })
    }
    const onChangeEmail = e => {
        setUserEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setUserPassword(e.target.value)
    }
    return (
        <div>
            <LoginForm
                onChangePassword={onChangePassword}
                onChangeEmail={onChangeEmail}
                hadleform={hadleform}
                userEmail={userEmail}
                userPassword={userPassword}
            />
        </div>
    );
}

export default Login;

