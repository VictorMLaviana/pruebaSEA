import React from "react";
import { useForm } from "react-hook-form";
import {createUser, updateUser} from '../store/actions'
import { useSelector, useDispatch } from "react-redux";
import {GlobalState} from '../store/types'
import { useRouter } from 'next/router'


interface IFormInputs {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    roles: string,
}

export default function UserDetail({newUser}:any) {

  const router = useRouter()

  const { register, errors, handleSubmit } = useForm<IFormInputs>();

  const dispatch = useDispatch()
  
  const roles = useSelector<GlobalState, GlobalState["roles"]>(
    (state) => state.roles
  )

  const user = useSelector<GlobalState, GlobalState["user"]>(
    (state) => state.user
  )

  if(!newUser){

    const onSubmit = (data: any) => {
      dispatch(updateUser(data))
    }

    return (
      <div>
        <h3>ID de usuario: {user.id}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="id" hidden defaultValue={user.id} ref={register({ required: true })} />
          <label>Nombre</label>
          <input name="first_name" defaultValue={user.first_name} ref={register({ required: true })} />
          {errors.first_name && "First name is required"}
          <br/><br/>
          <label>Apellidos</label>
          <input name="last_name" defaultValue={user.last_name} ref={register({ required: true })} />
          {errors.last_name && "Last name is required"}
          <br/><br/>
          <label>Email:</label>
          <input name="email" defaultValue={user.email} ref={register({ required: true })}/>
          {errors.last_name && "Email is required"}
          <br/><br/>
    
          <label>Roles:</label>
          {roles.map((rol) => {
            if(user.roles.indexOf(rol.id)!=-1){
              return (<div key={rol.id}><input type="checkbox" defaultChecked name="roles" ref={register} value={rol.id} /><label>{rol.description}</label><br/></div>)
            }else{
              return (<div key={rol.id}><input type="checkbox" name="roles" ref={register} value={rol.id} /><label>{rol.description}</label><br/></div>)
            }
          })}
          
    
          <br/><br/>
          <input type="submit" />
        </form>
      </div>
    );

  }else{

    const onSubmit = (data: any) => {
      dispatch(createUser(data))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre</label>
        <input name="first_name" ref={register({ required: true })} />
        {errors.first_name && "First name is required"}
        <br/><br/>
        <label>Apellidos</label>
        <input name="last_name" ref={register({ required: true })} />
        {errors.last_name && "Last name is required"}
        <br/><br/>
        <label>Email:</label>
        <input name="email" ref={register({ required: true })}/>
        {errors.last_name && "Email is required"}
        <br/><br/>
  
        <label>Roles:</label>
        {roles.map((rol) => {
          return <div key={rol.id}><input type="checkbox" name="roles" ref={register} value={rol.id} /><label>{rol.description}</label><br/></div>
        })}   
  
        <br/><br/>
        <input type="submit" />
      </form>
    );
  }
  
  
  
}