import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Input, FormGroup, Button, Form, Card, CardBody, CardHeader} from 'reactstrap'
import './styles.css'
const axios = require('axios')

function Forgot(){

    const History = useHistory()
    const [email, setEmail] = useState('')

    async function handleSubmitForgot(e, email){
        e.preventDefault()

        const NewEmail = {
            email: email
        }
        
        await axios({
            method: 'post', 
            url: 'http://localhost:3000/users/forgot',
            data: NewEmail
        })
        .then((res) => {
            if(res.data.success === true){
                alert('logado com sucesso')
                History.push('/')
            }else if(res.data.err === 2){
                alert("Algo de errado com o servidor, tente mais tarde")
            }else{
                alert("Não conseguimos mandar a mensagem para o seu email, tente mais tarde")
            }
        })
        .catch((err) =>{
            alert("Algo de errado com o servidor, tente mais tarde")
        })
        
    }

    return(
        <div className="row justify-content-center mt-5">
            <Card className="rounded">
                <CardHeader className="bg-primary">
                    <h2 className="text-light text-center">Recuperar Senha</h2>
                </CardHeader>
                <CardBody className="">
                    <Form className="row mt-3" onSubmit={e => handleSubmitForgot(e, email)}>
                        <FormGroup className="mt-3 col-12 justify-content-center mb-3">
                            <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} 
                                className="col-12"></Input>
                        </FormGroup>
                        <FormGroup className="col-12 mb-5">
                            <Button className="col-12 shadow text-light" color="primary" type="submit">Me mande o E-mail</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
                
            </Card>
        </div>
    
    )
}

export default Forgot