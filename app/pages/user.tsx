import React from "react";
import UserContainerDetail from '../components/userContainerDatail'
import {Provider} from "react-redux"
import {store, } from '../store/store'
import { useRouter } from 'next/router'



export default function UserComp() {
    const router = useRouter()
    const id = router.query.id

    let userID
    if(id == 'new'){
        userID = null
    }else{
        userID = id
    }

    return (
        <div>
            <Provider store={store}>
                <UserContainerDetail userID={userID}></UserContainerDetail>
            </Provider>
        </div>
    )
}