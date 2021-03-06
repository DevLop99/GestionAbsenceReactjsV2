import React  from 'react';

const LoginForm = ( props)  => {

    return (
        <div>
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">Please SignIn</h3>
                                        <form onSubmit={(e) => props.hadleform(e)}>
                                            <div className="form-label-group">
                                                <input type="email"
                                                    id="inputEmail"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    required onFocus={e => e.currentTarget.select()}
                                                    value={props.userEmail}
                                                    onChange={props.onChangeEmail}
                                                />
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-label-group">
                                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                                                    value={props.userPassword}
                                                    onChange={props.onChangePassword} />
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                            </div>
                                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 form-control" type="submit">Sign in</button>
                                            <div className="text-center">
                                                <a className="small" href="/">Forgot password?</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
