import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {Switch, Route, withRouter as _withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {connect} from 'react-redux'

import Login from 'pages/Login/Form'
import LostCredentials from 'pages/Login/LostCredentials'
import ReadMore from 'pages/Login/ReadMore'
import Curriculum from 'pages/Curriculum'
import Student from 'pages/Accounts/Student'
import Admin from 'pages/Accounts/Admin'
import Company from 'pages/Accounts/Company'
import Jobs from 'pages/Content/Jobs'
import Culture from 'pages/Content/Culture'
import Courses from 'pages/Content/Courses'
import VideoLessons from 'pages/Content/Videolessons'
import Games from 'pages/Content/Games'
import Redirect from 'components/Redirect'

import {mainRoutes, contentRoutes, loginRoutes, accountRoutes} from 'utils/routes'

const Logged = () => (
    <Redirect to={mainRoutes.curriculumManager} timer={1600}/>
);

const NotLogged = () => (
    <Redirect to={loginRoutes.loginForm} timer={1600}/>
);

const App = ({auth}) => {
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setLogin(auth.login)
    }, [auth]);

    return (
        <Switch>
            {/* UNPROTECTED ROUTES */}
            <Route component={(login ? Logged : Login)} exact path={loginRoutes.loginForm}/>
            <Route component={login ? Logged : LostCredentials} exact path={loginRoutes.lostCredentials}/>
            <Route component={login ? Logged : ReadMore} exact path={loginRoutes.readMore}/>

            {/* PROTECTED ROUTES */}
            <Route component={login ? Curriculum : NotLogged} exact path={mainRoutes.curriculumManager}/>
            <Route component={login ? Student : NotLogged} exact path={accountRoutes.studentManager}/>
            <Route component={login ? Admin : NotLogged} exact path={accountRoutes.adminManager}/>
            <Route component={login ? Company : NotLogged} exact path={accountRoutes.companyManager}/>
            <Route component={login ? Jobs : NotLogged} exact path={contentRoutes.jobs}/>
            <Route component={login ? Culture : NotLogged} exact path={contentRoutes.culture}/>
            <Route component={login ? Courses : NotLogged} exact path={contentRoutes.courses}/>
            <Route component={login ? VideoLessons : NotLogged} exact path={contentRoutes.videoLessons}/>
            <Route component={login ? Games : NotLogged} exact path={contentRoutes.games}/>

            {/* 404 */}
            <Route component={NotLogged}/>
        </Switch>
    )
};

App.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = ({auth}) => ({auth});

const withRouter = () => _withRouter;

export default compose(
    withRouter(),
    connect(mapStateToProps),
)(App)
