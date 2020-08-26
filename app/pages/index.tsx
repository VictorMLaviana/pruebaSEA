import React from "react";
import {Provider} from "react-redux"
import {store, } from '../store/store'
import UsersContainer from "../components/usersContainer";

export default function Index() {
    return (
        <div>
            <h1>Prueba SEA - Victor M. Laviana - TSX</h1>
            <Provider store={store}>
                <UsersContainer></UsersContainer>
            </Provider>
        </div>
    )
}