import { ActionIcon, List, LoadingOverlay, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import BackButton from "./BackButton";

export default function ShowList() {
    const location = useLocation()
    const locationArray = location.pathname.split('/')
    const id = locationArray.splice(-1)
    const [list, setList] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        axios
        .get(`${config.backendLocation}/list/getlist/${id}`, 
            {headers: {token : localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
            setList(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])
    // const list = {
    //     items: [
    //         {name: "Potato", value: 2, unit: "KG"},
    //         {name: "Oil", value: 1, unit: "Liter"},
    //         {name: "Battery", value: 3, unit: "Units"}
    //     ],
    //     user: "Arunim Chakraborty",
    //     date: new Date().toISOString()
    // }
    return(
        list != undefined ?
        <div>
            <div style={{paddingTop: 20, position: "relative"}}>
                <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
                
                <h2 style={{textAlign: "center"}}>List Summary</h2>
                <div style={{marginBottom: 10}}>
                    {/* <div>
                        <Text size={'sm'}>Added By {list.user}</Text>
                    </div> */}
                    {/* <div>
                        <Text size={'xs'}>Added at {list.createdAt}</Text>
                    </div> */}
                </div>
                <List>
                    {list.items.map((val, index) => {
                        return(
                            <div 
                            style={{paddingTop: 20, 
                            paddingBottom: 20, 
                            paddingLeft: 20, 
                            marginBottom: 20, 
                            backgroundColor: "#F4F6F7", 
                            borderRadius: 10, 
                            paddingRight: 20,
                            width: "95%",
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            position: "relative"
                            }} 
                            key={index}>
                                <div>
                                    <Text>{val.name}</Text>
                                    <Text>{val.value} {val.unit}</Text>
                                </div>
                                <div style={{position: "absolute", right: 30, top: "30%"}}>
                                    <ActionIcon variant="filled">
                                        <IconEdit size={18} />
                                    </ActionIcon>
                                </div>
                            </div>
                        )
                    })}
                </List>
                <div style={{paddingTop: 30}}>
                    <Text>Assigned To : {list.assignedTo ?list.assignedTo.name : "None"}</Text>
                </div>
                <div style={{paddingTop: 30}}>
                    <Text>Created by : {list.creator.firstName} {list.creator.lastName}</Text>
                </div>
            </div> 
            <div style={{position: "absolute", top: 10, left: 10}}>
                    <BackButton onClick={() => {navigate('../')}} />
            </div>
        </div>
    : null
    )
}