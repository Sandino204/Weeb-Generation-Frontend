import React, { useState, useEffect } from 'react'
import './styles.css'
import {FaCalendar, FaThumbsUp, FaComments} from 'react-icons/fa'
import {Input, Button, Form} from 'reactstrap'

const axios = require('axios')

function Post({shortId}){
    


    const [post, setPost] = useState({})
    const comments = post._comments ? post._comments : null
    const [comment, setComment] = useState('')
    
    useEffect(() => { 

        async function getPosts(){
            await axios({
                method: 'get', 
                url: `http://localhost:3000/post/${shortId}`, 
            })
            .then((res) => {
                if(res.data.success === true){
                    setPost(res.data.data)
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

    async function submitNewComment(text, postId, e){
        
        e.preventDefault()

        if(text === ''){
            return
        }

        const newComment = {
            text: text, 
            postId: postId
        }

        await axios({
            method: 'post', 
            url: 'http://localhost:3000/comment/submit', 
            data: newComment
        })
        .then((res) => {
            if(res.data.success === true){
                alert('Commentario postado com sucesso')
            }else{
                alert("Algo de errado com o servidor, tente mais tarde")      
            }
        })
        .catch((err) =>{
            alert("Algo de errado com o servidor, tente mais tarde")
        })

    }

    function renderAllComments(comments){
        if(comments === null){
            return 
        }
        return (
            comments.map((comment) =>{
                return(
                    <div className="container post rounded mt-3 shadow">
                        <div className="row">
                            <div className="col-md-3 d-none d-md-flex row justify-content-center bl">
                                <img src={comment._author.img} alt="" className="mt-5"/>
                                <h3 className="col-12 text-center text-dark mt-2">{comment._author.username}</h3>
                                <p className="col-12 text-secondary info"><FaCalendar></FaCalendar> {comment.createAt}</p>
                                <p className="col-12 text-secondary info mb-5"><FaThumbsUp></FaThumbsUp> {comment.like}</p>
                            </div>
                            <div className="mx-auto col-md-9 d-none d-md-flex row justify-content-center">
                                <p className="text-dark col-12  my-5">{comment.text}</p>
                            </div>
                            <div className="col-12 d-flex d-md-none row bb">
                                <div className="col-12 row">
                                    <img src={comment._author.img} alt="" className="mt-1 col-4 mb-3"/>
                                    <h3 className="col-4 text-center text-dark mt-3 mb-3">{comment._author.username}</h3>
                                </div>
                                <p className="col-4 text-secondary info"><FaCalendar></FaCalendar> {comment.createAt}</p>
                                <p className="col-4 text-secondary info mb-5"><FaThumbsUp></FaThumbsUp> {comment.like}</p>
                            </div>
                            <div className="mx-auto col-12 d-flex d-md-none row justify-content-center">
                                <p className="text-dark col-12  my-5">{comment.text}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    if(post === null){
        return(
            <h2>Post não Existe</h2>
        )
    }


    return(
        <>
        <div className="container post rounded mt-5 shadow">
            <div className="row">
                <div className="col-md-3 d-none d-md-flex row justify-content-center bl">
                    <img src={post._author.img} alt="" className="mt-5"/>
                    <h3 className="col-12 text-center text-dark mt-2">{post._author.username}</h3>
                    <p className="col-12 text-secondary info"><FaCalendar></FaCalendar> {post.createAt}</p>
                    <p className="col-12 text-secondary info"><FaComments></FaComments> {post._comments.length}</p>
                    <p className="col-12 text-secondary info mb-5"><FaThumbsUp></FaThumbsUp> {post.like}</p>
                </div>
                <div className="mx-auto col-md-9 d-none d-md-flex row justify-content-center">
                    <h4 className="text-dark mt-4 text-center col-12 mb-4">{post.title}</h4>
                    <p className="text-dark col-12  mb-5">{post.text}</p>
                </div>
                <div className="col-12 d-flex d-md-none row bb">
                    <div className="col-12 row">
                        <img src={post._author.img} alt="" className="mt-1 col-4 mb-3"/>
                        <h3 className="col-4 text-center text-dark mt-3 mb-3">{post._author.username}</h3>
                    </div>
                    <p className="col-4 text-secondary info"><FaCalendar></FaCalendar> {post.createAt}</p>
                    <p className="col-4 text-secondary info"><FaComments></FaComments> {post._comments.length}</p>
                    <p className="col-4 text-secondary info mb-5"><FaThumbsUp></FaThumbsUp> {post.like}</p>
                </div>
                <div className="mx-auto col-12 d-flex d-md-none row justify-content-center">
                    <h4 className="text-dark mt-4 text-center col-12 mb-4">{post.title}</h4>
                    <p className="text-dark col-12  mb-5">{post.text}</p>
                </div>
            </div>
        </div>
        {renderAllComments(comments)}
        <div className="container my-5 commentBox">
            <Form className="row" onSubmit={e => submitNewComment(comment, shortId, e)}>
                <h2 className="col-12 mb-4">Participe da conversa</h2>
                <Input className="col-12 cm" type="textarea" placeholder="Comentar" value={comment} 
                    onChange={e => setComment(e.target.value)}>
                    </Input>
                <Button className="ml-auto col-12 col-md-2 my-4" color="primary" type="submit">Comentar</Button>
            </Form>
        </div>
        </>

    )

}

export default Post