import { Button, Text } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import config from "../../config";


export default function FamilyList() {
    const [familyList, setFamilyList] = useState([])
    // useEffect(() => {
    //     axios
    //     .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
    //     .then(res => setShoppingLists(res.data))
    //     .catch(err => console.log(err))
    // }, [])
    useEffect(() => {
      axios
      .get(`${config.backendLocation}/family/user`, {headers: {token : localStorage.getItem('token')}})
      .then(res => {
        console.log(res)
        setFamilyList(res.data)
      })
      .catch(err => console.log(err))
    }, [])
    
    const navigate = useNavigate();
    return (
        <div>
            {
            familyList.length!=0 ? familyList.map((item, index) => {
                return(
                        <div key={index} style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ECF0F1", width: "90%", marginBottom: 10, paddingLeft: 20, paddingRight: 10, borderRadius: 10}}
                            onClick={() => navigate(`/addmember/${item._id}`)}
                        >
                            <Text>{item.name}</Text>
                        </div>
                )
            })  : 
            <div>
                <Text>Your Families will appear here</Text>
            </div>
            }
            <div style={{position: "absolute", bottom: "15%", right: "10%"}}>
                <Button color="dark" radius="xl" size="xl" compact component={Link} to="/newfamily" >
                +
                </Button>
            </div>
        </div>
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