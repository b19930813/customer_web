import React from 'react';
import { BrowserRouter, Route, Link , Switch} from "react-router-dom";
import './index.css';
import App from './App';
import CustomBar from './components/AppBar/appbar';
import CompanyManagement from './components/company_management/main';
import CustomManagement from './components/custom_management/main';
import ReactDOM from 'react-dom';
import CustomQuestionRecord from './components/custom_question_record/main';

ReactDOM.render(

    <BrowserRouter>
        <CustomBar />
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/CompanyManagement" component={CompanyManagement} />
            <Route path="/CustomManagement" component={CustomManagement} />

        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

{/* <BrowserRouter>
        <CustomBar />
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>,  */}
