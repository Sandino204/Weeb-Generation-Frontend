import React, { useEffect, useState } from 'react'
import {Button, Card, CardBody, CardHeader, Input, Modal, ModalHeader, ModalBody, Form} from 'reactstrap'
import {FaThumbsUp} from 'react-icons/fa'
import './styles.css'
import { useHistory } from 'react-router-dom'

const axios = require('axios')

function TopicPostList({topic}){

    const [posts, setPosts] = useState([])

    const [orderBy, setOrderBy] = useState('Data')
    const [newPost, setNewPost] = useState(false)
    const [Newtitle, setNewTitle] = useState('')
    const [newText, setNewText] = useState('')

    useEffect(() => {

        const newTopyc= {
            topic: topic, 
            sortType: orderBy
        }  

        async function getPosts(){
            await axios({
                method: 'get', 
                url: "http://localhost:3000/post/allTopic", 
                data: newTopyc
            })
            .then((res) => {
                if(res.data.success === true){
                    setPosts(res.data.data)
                }else{
                    alert("Algo de errado com o servidor, tente mais tarde")      
                }
            })
            .catch((err) =>{
                alert("Algo de errado com o servidor, tente mais tarde")
            })
        }

        getPosts()

    }, [])

    useEffect(() => {

        const newTopyc= {
            topic: topic, 
            sortType: orderBy
        }  

        async function getPosts(){
            await axios({
                method: 'get', 
                url: "http://localhost:3000/post/allTopic", 
                data: newTopyc
            })
            .then((res) => {
                if(res.data.success === true){
                    setPosts(res.data.data)
                }else{
                    alert("Algo de errado com o servidor, tente mais tarde")      
                }
            })
            .catch((err) =>{
                alert("Algo de errado com o servidor, tente mais tarde")
            })
        }

        getPosts()

    }, [orderBy])

    async function submitNewPost(e, title, text, topic){
        e.preventDefault()

        if(title === '' && text === ''){
            return 
        }

        const newPost = {
            title: title, 
            text: text, 
            topic: topic
        }

        await axios({
            method: 'post', 
            url: "http://localhost:3000/post/submit", 
            data: newPost
        })
        .then((res) => {
            if(res.data.success === true){
                alert('Post Enviado com sucesso')
            }else{
                alert("Algo de errado com o servidor, tente mais tarde")      
            }
        })
        .catch((err) =>{
            alert("Algo de errado com o servidor, tente mais tarde")
        })

    }


    const History = useHistory()
    
    function handleToPost(shortId){
        History.push(`/forum/post/${shortId}`)
    }

    function toggleNewPost(){
        setNewPost(!newPost)
    }
    
    function RenderFixedPostsList(list){
        if(list !== null){
            return(
                list.map((listItem) => {
                    if(listItem !== null){
                        if(listItem.isFixed === true){
                            return(
                                <div className="col-12 listForums row shadow m-1 rounded" key={listItem.shortId} onClick={() => handleToPost(listItem.shortId)}>
                                    <div className="row col-12 col-md-8">
                                        <h4 className="col-12 text-primary postTitle">{listItem.title}</h4>
                                        <p className="col-12 text-dark datePost">por {listItem._author.username}, {listItem.createAt}</p>
                                    </div>
                                    <div className="d-none d-md-flex col-md-2 row align-items-center">
                                        <p className="col-12 text-primary postInfo mb-0">{listItem.like} <FaThumbsUp></FaThumbsUp></p>
                                        <p className="col-12 text-secondary postInfo mt-0">{listItem._comments.length} comments</p>
                                    </div>
                                    <div className="row ml-auto mr-2 justify-content-end d-none d-md-flex">
                                        <h4 className="text-dark postTitle my-auto postUsername">{listItem._author.username}</h4>
                                        <img src={listItem._author.img} alt="" className="PostImage my-auto"/>
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            )
        }
    }
    
    function RenderPostsList(list){
        if(list !== null){
            return(
                list.map((listItem) => {
                    return(
                        <div className="col-12 listForums row shadow m-1 rounded" key={listItem.shortId} onClick={() => handleToPost(listItem.shortId)}>
                            <div className="row col-12 col-md-8">
                                <h4 className="col-12 text-primary postTitle">{listItem.title}</h4>
                                <p className="col-12 text-dark datePost">por {listItem._author.username}, {listItem.createAt}</p>
                            </div>
                            <div className="d-none d-md-flex col-md-2 row align-items-center">
                                <p className="col-12 text-primary postInfo mb-0">{listItem.like} <FaThumbsUp></FaThumbsUp></p>
                                <p className="col-12 text-secondary postInfo mt-0">{listItem._comments.length} comments</p>
                            </div>
                            <div className="row ml-auto mr-2 justify-content-end d-none d-md-flex">
                                <h4 className="text-dark postTitle my-auto postUsername">{listItem._author.username}</h4>
                                <img src={listItem._author.img} alt="" className="PostImage my-auto"/>
                            </div>
                        </div>
                    )
                
                })
            )
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-2 row mt-4 mb-2 ml-auto mr-2">
                        <Button color="primary" className="col-12"  onClick={() => toggleNewPost()}>Novo Post</Button>
                    </div>
                </div>
            </div>
            <Card className="forum container mt-4">
                <CardHeader className="col-12 row">
                    <h2 className="forumHeader text-center col-12">{topic}</h2>
                </CardHeader>
                <CardBody className="forumBody row">
                    <div className="col-12 col-lg-2 row my-4 ml-auto mr-2">
                        <Input type="select" name="orderBy" onChange={e => setOrderBy(e.target.value)}
                            className="col-12">
                                <option value="Data">Data</option>
                                <option value="Data">Like</option>
                            </Input>
                    </div>
                    <h3 className="postFixedHeader text-center col-12 rounded">Fixados</h3>
                    <div className="col-12 row justify-content-center mt-3">
                        {RenderFixedPostsList(posts)}
                    </div>
                    <h3 className="postFixedHeader text-center col-12 rounded mt-4">Posts</h3>
                    <div className="col-12 row justify-content-center mt-3">
                        {RenderPostsList(posts)}
                    </div>
                </CardBody>
            </Card>


            <Modal isOpen={newPost} toggle={() => toggleNewPost()} size="xl">
                <ModalHeader toggle={() => toggleNewPost()} className="modalHeader">
                    <h2 className="text-light text-center">Novo Post</h2>
                </ModalHeader>
                <ModalBody className="conatiner">
                    <Form className="row mt-3" onSubmit={e => submitNewPost(e, Newtitle, newText, topic)}>
                        <div className="col-12 row">
                            <label className="col-md-2 col-12">Titulo do Post: </label>
                            <Input className="col-md-8 offset-md-0 offset-1 col-11" placeholder="Titulo" onChange={e => setNewTitle(e.target.value)} value={Newtitle}>
                            </Input>
                        </div>
                        <div className="col-12 row mt-5">
                            <label className="col-md-2 col-12">Texto do Post: </label>
                            <textarea className="col-md-8 offset-md-0 offset-1 col-11 " onChange={e => setNewText(e.target.value)} placeholder="Texto" value={newText}>
                            </textarea>
                        </div>
                        <Button className="mt-5 mb-2 mr-1 ml-auto col-5 col-md-2" color="danger">
                            Cancelar
                        </Button>
                        <Button className="mt-5 mb-2 mr-5 col-5 col-md-2" color="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}


export default TopicPostList