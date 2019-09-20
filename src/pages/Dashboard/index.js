import React from 'react'

import Container from 'components/Container'
import General from './General'

const tabStruct = [
    {
        title: 'Geral',
        component: <General/>,
    },
];

const Dashboard = () => <Container activeItem='Dashboard' tabStruct={tabStruct}/>;

export default Dashboard
