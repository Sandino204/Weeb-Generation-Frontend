import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {Input, FormGroup, Button, Form, Card, CardBody, CardHeader, FormText} from 'reactstrap'
const axios = require('axios')

function ResetPassword({token}){


    const [password, setPassword] = useState('')
    const [password2 , setPassword2] = useState('')

    async function handleSubmitReset(e, password, password2){
        if((!password && !password.length) || (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)))){
            return            
        }

        if(password !== password2){
            return 
        }

        const NewPassword = {
            password: password
        }

        await Axios({
            method: 'put', 
            url: `http://localhost:3000/users/reset/${token}`,
            data: NewPassword
        })
        .then((res) => {
            if(res.data.success === true){
                alert('Senha foi Atualizada')
                History.push('/')
            }else if(res.data.err === 1){
                alert('Algo de errado com o servidor, tente mais tarde')
            }else{
                alert('Algo de errado com o servidor, tente mais tarde')
            }
        })
        .catch((err) => {
            alert('Algo de errado com o servidor, tente mais tarde')
        })
    }

    function validationPassword(val){
        let combination = 0 

        if(!val && !val.length){
            combination = 1
        }
        if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val))){
            combination = 2
        }    
        
        if(combination === 1){
            return(
                <FormText className="text-danger" valid="false">Esse campo é necessario</FormText>
            )
        }else if(combination === 2){
            return(
                <FormText className="text-danger">Senha muito fraca</FormText>
            )
        }else{
            return(
                <FormText className="text-success">Senha valida</FormText>
            )
        }
    }

    function validationPassword2(password, password2){
        
        let combination = 0

        if(password !== password2){
            combination = 1
        }
        
        if(combination === 0){
            <FormText className="text-success">Senhas iguais</FormText>
        }
        else{
            <FormText className="text-success">As duas senhas devem ser iguais</FormText>
        }
    }

    return(
        <div className="row justify-content-center mt-5">
            <Card className="rounded">
                <CardHeader className="bg-primary">
                    <h2 className="text-light text-center">Recuperar Senha</h2>
                </CardHeader>
                <CardBody className="">
                    <Form className="row mt-3" onSubmit={e => handleSubmitReset(e, password, password2)}>
                        <FormGroup className="mt-3 col-12 justify-content-center mb-3">
                            <Input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} 
                                className="col-12"></Input>
                                {validationPassword(password)}
                            <Input type="text" placeholder="Password" value={password2} onChange={e => setPassword2(e.target.value)} 
                                className="col-12"></Input>
                                {validationPassword2(password, password2)}
                        </FormGroup>
                        <FormGroup className="col-12 mb-5">
                            <Button className="col-12 shadow text-light" color="primary" type="submit">Trocar de Senha</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
                
            </Card>
        </div>
    
    )
}

export default ResetPassword