import React, {MouseEvent} from "react";
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import {GlobalState} from '../store/types'
import { deleteUser, modifyPageBy } from "../store/actions";



export default function UsersTable() {
    
    const dispatch = useDispatch()

    const users = useSelector<GlobalState, GlobalState["users"]>(
        (state) => state.users
    )

    const page = useSelector<GlobalState, GlobalState["page"]>(
        (state) => state.page
    )

    const count = useSelector<GlobalState, GlobalState["count"]>(
        (state) => state.count
    )

    const deleteSelectedUser = (ev: MouseEvent<HTMLButtonElement>, u: any) => {
        ev.preventDefault();
        dispatch(deleteUser(u))
    }

    const paginateList = (diff: number) => {
        dispatch(modifyPageBy(diff))
    }

    return (
        <div>
            <h3>USERS:</h3>
            <div>
                <Link href="http://localhost:3000/user/?id=new">
                    <a>Crear nuevo usuario</a>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{
                                        user.roles.map((rol)=>{
                                        return <p key={rol}>{rol}</p>
                                        })
                                    }</td>
                                <td>
                                    <button>
                                        <Link href={"http://localhost:3000/user/?id=" + user.id}>
                                            <div>Editar</div>
                                        </Link>
                                    </button>
                                    <button onClick={(e)=> deleteSelectedUser(e, user)}>Eliminar</button>
                                </td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
            <div>
                { 
                    (page>0) ? (
                        <button onClick={ (e) => paginateList(-1) }>Anterior</button>
                    ):( 
                        <button disabled>Anterior</button>
                    )
                        
                    
                }

                { 
                    ((users.length + 10 * page) < count) ? (
                        <button onClick={ (e) => paginateList(1) }>Siguiente</button>
                    ):( 
                        <button disabled>Siguiente</button>
                    )
                }
                
                
            </div>
        </div> 
    )
}