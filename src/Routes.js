import React, { useEffect, useState } from 'react'
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Forgot from './pages/Forgot'
import ResetPassword from './pages/ResetPassword'
import Forum from './pages/Forum'
import PostList from './pages/TopicPostList'
import SearchPost from './pages/SearchPostList'
import Post from './pages/Post'

const axios = require('axios')

function Animes(){
    return(
        <h1>Animes</h1>
    )
}


function Routes(){

    const [logged, setLogged] = useState(false)
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        async function isLogged(){
            await axios({
                method: "get", 
                url: "http://localhost:3000/users/isLogged"
            })
            .then(res => {
                if(res.data.Logged === true){
                    setUsername(res.data.user.username)
                    let base64Image = `data:image/png;base64,${res.data.user.img}`
                    setImage(base64Image)
                    return setLogged(true)
                }else{
                    return
                }
            })
        }

        isLogged()
    })    


    useEffect(() => {
        async function isLogged(){
            await axios({
                method: "get", 
                url: "http://localhost:3000/users/isLogged"
            })
            .then(res => {
                if(res.data.Logged === true){
                    setUsername(res.data.user.username)
                    let base64Image = `data:image/png;base64,${res.data.user.img}`
                    setImage(base64Image)
                    return setLogged(true)
                }else{
                    return
                }
            })
        }

        isLogged()
    }, [logged])

    function Reset({match}){
        return(
            <ResetPassword token={match.params.token}></ResetPassword>
        )
    }

    function ThePost({match}){
        return(
            <Post shortId={match.params.shortId}></Post>
        )
    }

    function allPostsByTopic({match}){
        return(
            <PostList topic={match.params.topic}></PostList>
        )
    }

    return(
        <BrowserRouter>
            <Header setLogged={setLogged} logged={logged} user={username} image={image}></Header>
            <Switch>
                <Route exact path="/" component={Animes}></Route>
                <Route exact path="/forgotPassword" component={Forgot}></Route>
                <Route path="/reset/:token" component={Reset} ></Route>
                <Route exact path="/forum" component={Forum}></Route>
                <Route exact path="/forum/search" component={SearchPost}></Route>
                <Route path="/forum/post/:shortId" component={ThePost}></Route>
                <Route path="/forum/:topic/add"></Route>
                <Route path="/forum/:topic" component={allPostsByTopic}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
            <Footer></Footer>
        </BrowserRouter>
    )
}

export default Routes