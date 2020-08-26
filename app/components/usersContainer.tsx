import React, {MouseEvent} from "react";
import { useSelector, useDispatch } from "react-redux";
import UsersTable from '../components/usersTable'
import { listUsers, listUsersResponse } from "../store/actions";

export default function UsersContainer() {

    const dispatch = useDispatch()

    
    const disp = dispatch(listUsers())
    

    return (
        <UsersTable></UsersTable>
    )
}