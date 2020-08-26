import React from "react";
import UserDetail from './userDetail'
import { useDispatch } from "react-redux";
import {getUser, listRoles} from '../store/actions'



export default function UserContainerDetail({userID}:any) {

    const dispatch = useDispatch()
    let newUser

    dispatch(listRoles())

    if(userID){
        dispatch(getUser(userID))
        newUser = false
    }else{
        newUser = true
    }

    return(
        <div>
            <UserDetail newUser={newUser}></UserDetail>
        </div>
    )
}