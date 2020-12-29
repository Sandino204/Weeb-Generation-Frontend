import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {Nav, NavItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button, FormText } from 'reactstrap'
import {FaBars} from 'react-icons/fa'
import './styles.css'
const axios = require('axios')

function Header({logged, setLogged, user, image}){

    const History = useHistory()
    const [loginBox, setLoginBox] = useState(false)
    const [signUpBox, setSignUpBox] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [toggleMenu, setToggleMenu] = useState(false)

    function handleLoginBox(){
        setLoginBox(!loginBox)
    }

    function handleSignupBox(){
        setSignUpBox(!setSignUpBox)
    }

    function changeBox(){
        setLoginBox(!loginBox)
        setSignUpBox(!signUpBox)
    }
    
    async function handleSubmitLogin(e, username, password){
        e.preventDefault()

        const newLogger = {
            username: username, 
            password: password
        }

        

        await axios({
            method: 'post', 
            url: 'http://localhost:3000/users/login',
            data: newLogger
        })
        .then((res) => {
            if(res.data.success === true){
                setLogged(true)
                handleLoginBox()
                alert('logado com sucesso')
            }else{
                alert('Há algo errado com o servidor, tente mais tarde')
            }
        })
        .catch((err) => {
            alert('Há algo errado com o servidor, tente mais tarde')
        })


    }

    async function handleSubmitSignUp(e, email, username, password){
        e.preventDefault()

        if((!username && !username.length) || (username.length <= 3) || (username.length > 20)){
            return 
        }
        if((!email && !email.length) || (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)))){
            return
        }
        if((!password && !password.length) || (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)))){
            return            
        }

        const newUser = {
            email: email, 
            username: username, 
            password: password
        }

        await axios({
            method: 'post', 
            url: 'http://localhost:3000/users/signup',
            data: newUser
        })
        .then(res => {
            if(res.data.success === true){
                handleSignupBox()
                alert('Registro bem sucedido')
            }if(res.data.err.name === 'UserExistsError'){
                console.log(res.err)
                alert('Já existe um usuario com este nome')
            }
        })
        .catch(error => {
            alert('Há algo errado com o servidor, tente mais tarde')
        })
    }

    function handleForgotPassword(){
        handleLoginBox()
        History.push('/forgotPassword')
    }

    function validationUsername(val){
        
        let combination = 0

        if(!val && !val.length){
            combination = 1
        }else if((val.length <= 3)){
            combination = 3
        }else if(val.length > 20){
            combination = 5
        }

        if(combination === 1){
            return(
                <FormText className="text-danger">Esse campo é necessario</FormText>
            )
        }else if(combination === 3){
            return(
                <FormText className="text-danger">O nome de Usuario deve ter mais de 3 caracteres</FormText>
                )
        }else if(combination === 5){
            return(
                <FormText className="text-danger">O nome de Usuario deve ter menos de 20 caracteres</FormText>
            )
        }else{
            return(
                <FormText className="text-success">Nome de usuario valido</FormText>
            )
        }
    }

    function validationEmail(val){
        
        let combination = 0
        
        if(!val && !val.length){
            combination = 1
        }else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val))){
            combination = 2
        }

        if(combination === 1){
            return(
                <FormText className="text-danger">Esse campo é necessario</FormText>
            )
        }else if(combination === 2){
            return(
                <FormText className="text-danger">Esse email não e valido</FormText>
            )
        }else{
            return(
                <FormText className="text-success">Email Valido</FormText>
            )
        }

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

    function toForum(){
        History.push('/forum')
    }

    if(logged === false){
        
        return(
            <> 
            <Nav className="row header shadow">
            <NavItem className={toggleMenu ? "col-10 d-md-none justify-content-center row toggle m-0 p-0" : "col-10 d-none d-md-none justify-content-between row"}>
                <h1 className="mainLogo text-white col-12 text-center p-0">My Anime List</h1>
                <div className="navBoxT col-12 row loginT">
                    <h2 className="text-light col-12 text-center">Login</h2> 
                </div>
                <div className="navBoxT col-12 row">
                    <h2 className="text-light col-12 text-center">Anime</h2>
                </div>
                <div className="navBoxT col-12 row">
                    <h2 className="text-light col-12 text-center">Manga</h2>
                </div>
                <div className="navBoxT col-12 row">
                    <h2 className="text-light col-12 text-center ">LightNovel</h2>
                </div>
                <div className="navBoxT col-12 row" onClick={() => toForum()}>
                    <h2 className="text-light col-12 text-center">Forum</h2> 
                </div>
                <div className="navBoxT col-12 row">
                    <h2 className="text-light col-12 text-center">Listas</h2> 
                </div>
            </NavItem>
                <NavItem className="col-2 d-md-none" onClick={() => setToggleMenu(!toggleMenu)}>
                    <FaBars className="menuT"></FaBars>
                </NavItem>
                <NavItem className={toggleMenu ? "d-none" : "col-md-3 col-8 my-auto row menu"}>
                    <h1 className="mainLogo text-white col-12 text-center">My Anime List</h1>
                </NavItem>
                <NavItem className="offset-md-1 col-md-5 d-none d-md-flex justify-content-between row">
                    <div className="navBox">
                        <h2 className="text-light">Anime</h2>
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">Manga</h2>
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">LightNovel</h2>
                    </div>
                    <div className="navBox" onClick={() => toForum()}>
                        <h2 className="text-light" >Forum</h2> 
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">Listas</h2> 
                    </div>
                </NavItem>
                <NavItem className="col-md-3 row justify-content-end d-none d-md-flex">
                    <div className="login" onClick={() => handleLoginBox()}>
                        <h2 className="text-light text-center">Login</h2>
                    </div>
                </NavItem>
            </Nav>
            
            <Modal isOpen={loginBox} toggle={() => handleLoginBox()} size="md" className="rounded shadow">
                <ModalHeader className="mdHeader">
                    <h2 className="col-12 text-center text-light">Login</h2>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={e => handleSubmitLogin(e, username, password)}>
                        <FormGroup className="my-5">
                            <Input type='text' placeholder="Nome de Usuario" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className="my-5">
                            <Input type='password' placeholder="Senha" id="Password" name="Password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                            <p className="mt-1 text-danger" onClick={() => handleForgotPassword()}>Esqueci minha senha</p>
                        </FormGroup>
                        <FormGroup className="row justify-content-end">
                            <Button onClick={() => handleLoginBox()} size="lg" color="secondary" className="mr-2">Cancelar</Button>
                            <Button type="submit" size="lg" color="primary" className="mr-4">Logar</Button>
                        </FormGroup>
                        <p className="text-center mr-3 my-4" onClick={() => changeBox()}>Não sou um membro? <span className="text-primary"> Registrar-se </span></p>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={signUpBox} toggle={() => handleSignupBox()} size="md" className="">
                <ModalHeader className="mdHeader">
                    <h2 className="col-12 text-center text-light">Cadastrar-se</h2>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={e => handleSubmitSignUp(e, email, username, password)}>
                        <FormGroup className="my-3">
                            <Input type='email' placeholder="Email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
                            {validationEmail(email)}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Input type='text' placeholder="Nome de usuario" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}></Input>
                            {validationUsername(username)}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Input type='password' placeholder="Senha" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                            {validationPassword(password)}
                        </FormGroup>
                        <FormGroup className="row justify-content-end">
                            <Button onClick={() => handleSignupBox()} size="lg" color="secondary" className="mr-2">Cancelar</Button>
                            <Button type="submit" size="lg" color="primary" className="mr-4">Registrar</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

            </>

        )        
    }else{
        return(
            <Nav className="row header shadow">
                <NavItem className={toggleMenu ? "col-10 d-md-none justify-content-center row toggle m-0 p-0" : "col-10 d-none d-md-none justify-content-between row"}>
                    <h1 className="mainLogo text-white col-12 text-center p-0">My Anime List</h1>
                    <div className="navProfile col-12 row justify-content-center my-3">
                        <h2 className="text-light">{user}</h2>
                        <img src={image} alt="log Image"/>
                    </div>
                    <div className="navBoxT col-12 row">
                        <h2 className="text-light col-12 text-center">Anime</h2>
                    </div>
                    <div className="navBoxT col-12 row">
                        <h2 className="text-light col-12 text-center">Manga</h2>
                    </div>
                    <div className="navBoxT col-12 row">
                        <h2 className="text-light col-12 text-center ">LightNovel</h2>
                    </div>
                    <div className="navBoxT col-12 row" onClick={() => toForum()}>
                        <h2 className="text-light col-12 text-center">Forum</h2> 
                    </div>
                    <div className="navBoxT col-12 row">
                        <h2 className="text-light col-12 text-center">Listas</h2> 
                    </div>
                </NavItem>
                <NavItem className="col-2 d-md-none" onClick={() => setToggleMenu(!toggleMenu)}>
                    <FaBars className="menuT"></FaBars>
                </NavItem>
                <NavItem className={toggleMenu ? "d-none" : "col-md-3 col-8 my-auto row menu"}>
                    <h1 className="mainLogo text-white col-12 text-center">My Anime List</h1>
                </NavItem>
                <NavItem className="d-none d-md-flex offset-md-1 col-md-5 justify-content-between row">
                    <div className="navBox">
                        <h2 className="text-light">Anime</h2>
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">Manga</h2>
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">LightNovel</h2>
                    </div>
                    <div className="navBox" onClick={() => toForum()}>
                        <h2 className="text-light" >Forum</h2> 
                    </div>
                    <div className="navBox">
                        <h2 className="text-light">Listas</h2> 
                    </div>
                </NavItem>
                <NavItem className="col-md-3 row justify-content-end d-none d-md-flex">
                    <div className="navProfile col-12 row justify-content-end">
                        <h2 className="text-light">{user}</h2>
                        <img src={image} alt="log Image"/>
                    </div>
                </NavItem>
            </Nav>
        )
    }

}   

export default Header