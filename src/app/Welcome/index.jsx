import React from 'react';
import './index.less';
import Config from '../../../config/config';

const Welcome = () => {
    return (
        <div className="welcome">
            <h1>Hi,欢迎来到</h1>
            <h1>{Config.projectName}</h1>
        </div>
    );
};

export default Welcome;
