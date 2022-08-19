import { Anchor, Button, Text } from "@mantine/core";
import { useCallback } from "react";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export default function AddList({shoppingLists}) {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/showlist', {replace: true}), [navigate]);
    return (
        <div>
            {
            shoppingLists ? shoppingLists.map((item, index) => {
                return(
                        <div key={index} style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ECF0F1", width: "90%", marginBottom: 10, paddingLeft: 20, paddingRight: 10, borderRadius: 10}}>
                            <Text component={Link} to="/showlist">{item.date}</Text>
                        </div>
                )
            })  : 
            <div>
                <Text>Your Shopping Lists will appear here</Text>
            </div>
            }
            <div style={{position: "absolute", bottom: "15%", right: "10%"}}>
                <Button color="dark" radius="xl" size="xl" compact component={Link} to="/newlist" >
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