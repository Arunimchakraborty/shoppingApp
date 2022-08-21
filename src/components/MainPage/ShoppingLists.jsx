import { Anchor, Button, NativeSelect, Tabs, Text } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import config from "../../config";


export default function ShoppingLists() {
    const [shoppingLists, setShoppingLists] = useState()
    const [family, setFamily] = useState([])
    const [selectedFamily, setSelectedFamily] = useState(undefined)
    const [firstScreen, setFirstScreen] = useState(true)
    const [screen, setScreen] = useState(0)
    const [id, setID] = useState(0)
    useEffect(() => {

        axios
        .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
        .then(res => setShoppingLists(res.data))
        .catch(err => console.log(err))

        axios
        .get(`${config.backendLocation}/family/user`, {headers: {token : localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
            setFamily(res.data)
        })
    }, [])

    useEffect(() => {
            // setSelectedFamily(family[0].name)
            if(screen == 0) {
                console.log(family)
                axios
                .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
                .then(res => setShoppingLists(res.data))
                .catch(err => console.log(err))
            }
            else {
                // console.log(family.filter(e => e.name == "Main Family")[0].name)
                console.log(family[0].name)
                console.log(selectedFamily)
                axios
                .get(`${config.backendLocation}/list/assigned/${family.filter(e => e.name == selectedFamily)[0]._id}`,
                    {headers: {token : localStorage.getItem('token')}})
                .then(res => setShoppingLists(res.data))
                .catch(err => console.log(err))
            }
        }
        , [screen])

    useEffect(() => {
        axios
        .get(`${config.backendLocation}/list/assigned/${family.filter(e => e.name == selectedFamily)[0]._id}`,
            {headers: {token : localStorage.getItem('token')}})
        .then(res => setShoppingLists(res.data))
        .catch(err => console.log(err))
    }, [selectedFamily])

    useEffect(() => {if(family.length != 0)setSelectedFamily(family[0].name)}, [family])
    
    const navigate = useNavigate();
    return (
        <div>
            <Tabs defaultValue="self">
                <Tabs.List>
                    <Tabs.Tab value="self" onClick={() => {setScreen(0); setFirstScreen(false)}}>Self</Tabs.Tab>
                    <Tabs.Tab value="family" onClick={() => {setScreen(1); setFirstScreen(false)}}>Family</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="self" pt="xs">
                    <SelfList shoppingLists={shoppingLists} navigate={navigate} /> 
                </Tabs.Panel>

                <Tabs.Panel value="family" pt="xs">
                    <FamilyList 
                    data={family} 
                    shoppingLists={shoppingLists} 
                    setValue={setSelectedFamily} 
                    value={selectedFamily} 
                    navigate={navigate} 
                    />
                </Tabs.Panel>
            </Tabs>
            {/* {screen == 0 ? <SelfList shoppingLists={shoppingLists} navigate={navigate} /> 
            : <FamilyList data={family} shoppingLists={shoppingLists} setValue={setSelectedFamily} value={selectedFamily} navigate={navigate} />} */}
        </div>
    )
}

function SelfList({shoppingLists, navigate}){
    return (
        <div>
            {
            shoppingLists ? shoppingLists.map((item, index) => {
                return(
                        <div key={index} style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ECF0F1", width: "90%", marginBottom: 10, paddingLeft: 20, paddingRight: 10, borderRadius: 10}}
                            onClick={() => navigate(`/showlist/${item._id}`)}
                        >
                            <Text>{item.createdAt}</Text>
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

function FamilyList({data, value, setValue, shoppingLists, navigate}) {
    return(
        <div>
            <NativeSelect 
            label="Select Family to assign to" 
            placeholder="Enter Family Name" 
            data={data.map(val => val.name)}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            />
            {
            shoppingLists ? shoppingLists.map((item, index) => {
                return(
                        <div key={index} style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ECF0F1", width: "90%", marginBottom: 10, paddingLeft: 20, paddingRight: 10, borderRadius: 10}}
                            onClick={() => navigate(`/showlist/${item._id}`)}
                        >
                            <Text>{item.createdAt}</Text>
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