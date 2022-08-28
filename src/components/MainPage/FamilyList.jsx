import { ActionIcon, Button, LoadingOverlay, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import config from "../../config";
import ErrorModal from "../Error";


export default function FamilyList() {

    const [familyList, setFamilyList] = useState([])
    const [loading, setLoading] = useState(true)

    const [errMsg, setErrMsg] = useState('')
    const [errModal, setErrModal] = useState(false)

    // useEffect(() => {
    //     axios
    //     .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
    //     .then(res => setShoppingLists(res.data))
    //     .catch(err => console.log(err))
    // }, [])
    useEffect(() => {
        setLoading(true)
      axios
      .get(`${config.backendLocation}/family/user`, {headers: {token : localStorage.getItem('token')}})
      .then(res => {
        console.log(res)
        setFamilyList(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setErrMsg(err.response.data.msg)
        setErrModal(true)
    })
    }, [])

    function deleteFamily(id) {
        setLoading(true)
        axios
        .post(`${config.backendLocation}/family/delete/${id}`, {}, {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
            console.log(`Deleted ${id}`)
            setLoading(false)
            window.location.reload()
        })
        .catch(err => {
            console.log(err); 
            setLoading(false)
            setErrMsg(err.response.data.msg)
            setErrModal(true)
        })
    }
    
    const navigate = useNavigate();
    return (
        <>
            <div style={{position: "relative"}}>
                <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
                {
                familyList.length!=0 ? familyList.map((item, index) => {
                    return(
                            <div key={index} style={{paddingTop: 10, 
                                paddingBottom: 10, 
                                backgroundColor: "#ECF0F1", 
                                width: "90%", 
                                marginBottom: 10, 
                                paddingLeft: 20, 
                                paddingRight: 10, 
                                borderRadius: 10,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                                
                            >
                                <Text>{item.name}</Text>
                                <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", paddingRight: 10, paddingTop: -20}}>
                                    <div style={{marginBottom: 10}}>
                                        <ActionIcon variant="filled" color={'red'} onClick={() => deleteFamily(item._id)}>
                                            <IconTrash size={18} />
                                        </ActionIcon>
                                    </div>
                                    <div>
                                        <ActionIcon variant="filled" color={'gray'} onClick={() => navigate(`/addmember/${item._id}`)}>
                                            <IconEye size={18} />
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                    )
                })  : 
                <div>
                    <Text>Your Families will appear here</Text>
                </div>
                }
            </div>
            <div style={{position: "absolute", bottom: "15%", right: "10%"}}>
                <Button color="dark" radius="xl" size="xl" compact component={Link} to="/newfamily" >
                +
                </Button>
            </div>
            <ErrorModal msg={errMsg} setVisible={setErrModal} visible={errModal} />
        </>
    )
}

const style={
    noList: {
        display: 'flex',
        width: "100%", 
        justifyContent: "center",
        position: "absolute", 
        top: "40%", 
        paddingLeft: 20
    },
    list: {
        display: 'flex',
        width: "100%", 
        justifyContent: "center",
        paddingTop: "50%"
    }
}