import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Input, Button} from 'reactstrap'
import './styles.css'
import {FaSearch} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'

const axios = require('axios')


function Forum(){

    const typesOfForum = [
        'Animes da temporada',
        'Enquetes e Pesquisas',
        'Fan arts',
        'FanFics',
        'Importantes',
        'Informações',
        'Noticias',
        'Recomendações',
        'Recomendações de jogos',
        'Regras',
        'Sugestões',
    ]

    const History = useHistory()
    const [forumSearch, setForumSearch] = useState('')
    const [forumTypeSearch, setForumTypeSearch] = useState('Data')
    const [values, setValues] = useState(typesOfForum)

    
    function search(){

        History.push("/forum/search")
    
    }

    function findByTopic(topic){
        History.push(`/forum/${topic}`)
    }


    function RenderListForum(list){
        return(
            list.map((listItem) => {
                return(
                    <div className="col-12 listForums row shadow m-1 rounded" key={listItem} onClick={() => findByTopic(listItem)}>
                        <h3 className="col-12 my-auto text-primary">{listItem}</h3>
                    </div>
                )
            })
        )
    }

    

    return(
        
        <Card className="forum container mt-5">
            <CardHeader className="col-12 row">
                <h2 className="forumHeader text-center col-12">Forum</h2>
            </CardHeader>
            <CardBody className="forumBody row">
                <div className="col-12 row justify-content-between">
                    <Input type="text" name="searchForum" id="searchForum" placeholder="Procurar" 
                        value={forumSearch} onChange={e => setForumSearch(e.target.value)}
                        className="col-4 col-md-8"></Input>
                    <Input type="select" name="selectTypeSearch" id="selectTypeSearch" 
                        onChange={e => setForumTypeSearch(e.target.value)}
                        className="col-4 col-md-2">
                        <option value="Data">Data</option>
                        <option value="Like">Like</option>
                    </Input>
                    <Button className="col-2 col-md-1 bg-primary" onClick={() => search()}>
                        <FaSearch></FaSearch>
                    </Button>
                </div>
                <div className="col-12 row justify-content-center mt-3">
                    {RenderListForum(values)}
                </div>
            </CardBody>
        </Card>
    
    )
}

export default Forum