import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardHeader, Input, Button} from 'reactstrap'
import {FaThumbsUp, FaSearch} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'

const axios = require('axios')

function SearchPostList(){

    const [posts, setPosts] = useState([])

    const History = useHistory()
    const [postSearch, setPostSearch] = useState('')
    const [postTypeSearch, setPostTypeSearch] = useState('Data')


    async function search(){

        const newTitleSearch = {
            title: postSearch,
            sortType: postTypeSearch
        }

        await axios({
            method: 'get', 
            url: "http://localhost:3000/post/allTitle", 
            data: newTitleSearch
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

    function handleToPost(shortId){
        History.push(`/forum/post/${shortId}`)
    }


    function RenderFixedPostsList(list){
        if(list !== null){
            return(
                list.map((listItem) => {
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
    

    return(
        <Card className="forum container mt-5">
            <CardHeader className="col-12 row">
                <h2 className="forumHeader text-center col-12">Procurar no Forum</h2>
            </CardHeader>
            <CardBody className="forumBody row">
                <div className="col-12 row justify-content-between mt-3 mb-5">
                        <Input type="text" name="searchForum" id="searchForum" placeholder="Procurar" 
                            value={postSearch} onChange={e => setPostSearch(e.target.value)}
                            className="col-4 col-md-8"></Input>
                        <Input type="select" name="selectTypeSearch" id="selectTypeSearch" 
                            onChange={e => setPostTypeSearch(e.target.value)}
                            className="col-4 col-md-2">
                            <option value="Data">Data</option>
                            <option value="Like">Like</option>
                        </Input>
                        <Button className="col-2 col-md-1 bg-primary" onClick={() => search()}>
                            <FaSearch></FaSearch>
                        </Button>
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
        
    )
}


export default SearchPostList