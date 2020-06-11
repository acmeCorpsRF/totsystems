import React, {Component} from 'react';
import './style.scss';

export default class NotFound extends Component {

    render() {
        return (
            <div className="error-page__block">
                <h1 className="error-page__title">Что-то потерялось....</h1>
            </div>
        )
    }
}