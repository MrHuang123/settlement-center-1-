import React, { Component } from 'react';
import './index.less';
import { Login } from 'bnq-sys-react-component';
import Config from '../../../config/config';
import LoginForm from './LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <Login
                selfTitle={Config.projectName}
                // sendLogin={this.handleSubmit}
                selfForm={<LoginForm />}
            />
        );
    }
}

export default LoginPage;
