import { Button, NativeSelect, Tabs, Text, LoadingOverlay, ActionIcon } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import config from "../../config";
import ErrorModal from "../Error";

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
]

export default function ShoppingLists() {
    const [shoppingLists, setShoppingLists] = useState([])
    const [family, setFamily] = useState([])
    const [selectedFamily, setSelectedFamily] = useState(undefined)
    const [firstScreen, setFirstScreen] = useState(true)
    const [screen, setScreen] = useState(0)
    const [id, setID] = useState(0)
    const [loading, SetLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [errModal, setErrModal] = useState(false)
    useEffect(() => {

        SetLoading(true)
        axios
        .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
        .then(res => {setShoppingLists(res.data); SetLoading(false)})
        .catch(err => {
            console.log(err)
            setErrMsg(err.response.data.msg)
            setErrModal(true)
        })

        SetLoading(true)
        axios
        .get(`${config.backendLocation}/family/user`, {headers: {token : localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
            setFamily(res.data)
            setSelectedFamily(res.data[0].name)
            SetLoading(false)
        })
        .catch(err => {
            setErrMsg(err.response.data.msg)
            setErrModal(true)
        })
    }, [])

    useEffect(() => {
            
            // setSelectedFamily(family[0].name)
            if(screen == 0) {
                SetLoading(true)
                // SetLoading(true)
                // console.log(family)
                axios
                .get(`${config.backendLocation}/list/creator`, {headers: {token : localStorage.getItem('token')}})
                .then(res => {setShoppingLists(res.data); SetLoading(false)})
                .catch(err => {
                    console.log(err); 
                    SetLoading(false)
                    setErrMsg(err.response.data.msg)
                    setErrModal(true)
                })
            }
            else {
                SetLoading(true)
                if(family.length == 0) SetLoading(false)
                // SetLoading(true)
                // console.log(family.filter(e => e.name == "Main Family")[0].name)
                // console.log(family[0].name)
                // console.log(selectedFamily)
                family.length != 0 ?
                    axios
                    .get(`${config.backendLocation}/list/assigned/${family.filter(e => e.name == selectedFamily)[0]._id}`,
                        {headers: {token : localStorage.getItem('token')}})
                    .then(res => {setShoppingLists(res.data); SetLoading(false)})
                    .catch(err => {
                        console.log(err); 
                        SetLoading(false)
                        setErrMsg(err.response.data.msg)
                        setErrModal(true)
                    })
                : console.log('Nothing found')
            }
        }
        , [screen])

    useEffect(() => {
        SetLoading(true)
        selectedFamily ?
        (axios
        .get(`${config.backendLocation}/list/assigned/${family.filter(e => e.name == selectedFamily)[0]._id}`,
            {headers: {token : localStorage.getItem('token')}})
        .then(res => {setShoppingLists(res.data); SetLoading(false)})
        .catch(err => {
            console.log(err); 
            SetLoading(false)
            setErrMsg(err.response.data.msg)
            setErrModal(true)
        }))
        : console.log('undefined selectedfamily')
    }, [selectedFamily])

    function deleteList(id) {
        SetLoading(true)
        axios
        .post(`${config.backendLocation}/list/deletelist/${id}`, {}, {headers: {token : localStorage.getItem('token')}})
        .then(res => {SetLoading(false); 
            console.log('Deleted ' + id); 
            console.log(res)
            window.location.reload()
        })
        .catch(err => {
            SetLoading(false); 
            console.log(err)
            setErrMsg(err.response.data.msg)
            setErrModal(true)
        })
    }

    // useEffect(() => {if(family.length != 0)setSelectedFamily(family[0].name)}, [family])

    useEffect(() => {console.log(selectedFamily)}, [selectedFamily])
    
    const navigate = useNavigate();
    return (
        <div>
            <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
            <Tabs defaultValue="self">
                <Tabs.List>
                    <Tabs.Tab value="self" onClick={() => {setScreen(0); setFirstScreen(false)}}>Self</Tabs.Tab>
                    <Tabs.Tab value="family" onClick={() => {setScreen(1); setFirstScreen(false)}}>Family</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="self" pt="xs">
                    <SelfList shoppingLists={shoppingLists} navigate={navigate} SetLoading={SetLoading} deleteFunc={deleteList} /> 
                </Tabs.Panel>

                <Tabs.Panel value="family" pt="xs">
                    <FamilyList 
                    data={family} 
                    shoppingLists={shoppingLists} 
                    setValue={setSelectedFamily} 
                    value={selectedFamily} 
                    navigate={navigate} 
                    SetLoading={SetLoading}
                    deleteFunc={deleteList}
                    />
                </Tabs.Panel>
            </Tabs>
            {/* {screen == 0 ? <SelfList shoppingLists={shoppingLists} navigate={navigate} /> 
            : <FamilyList data={family} shoppingLists={shoppingLists} setValue={setSelectedFamily} value={selectedFamily} navigate={navigate} />} */}
            <ErrorModal msg={errMsg} setVisible={setErrModal} visible={errModal} />
        </div>
    )
}

function SelfList({shoppingLists, navigate, SetLoading, deleteFunc}){
    // let month = 0
    // let day = 0
    // let year = 0
    // let hours = 0
    // let minutes = 0
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; // timezone offset in milliseconds
    // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    return (
        <div style={{paddingTop: 10}}>
            {
            shoppingLists.length != 0 ? shoppingLists.slice(0).reverse().map((item, index) => {
                // parsedDate = new Date(Date.parse(item.createdAt))
                const parsedDate = new Date(item.createdAt)
                // console.log(parsedDate)
                return(
                    <div key={index} 
                    style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ECF0F1", 
                        width: "90%", marginBottom: 10, paddingLeft: 20, 
                        paddingRight: 10, borderRadius: 10, flexDirection: "row", display: "flex"}}
                    >
                        <div>
                            <Text size={'md'}>Date - {parsedDate.getDate()} {months[parsedDate.getMonth()]} {parsedDate.getFullYear()}</Text>
                            <Text size={'sm'}>Time - {parsedDate.getHours()}:{parsedDate.getMinutes()}</Text>
                        </div>
                        <div style={{position: "relative", right: "-30%", top: -10}}>
                            <ActionIcon variant="filled" color={'red'} onClick={() => deleteFunc(item._id)}>
                                <IconTrash size={18} />
                            </ActionIcon>
                        </div>
                        <div style={{position: "relative", right: "-20%", top: 30}}>
                            <ActionIcon variant="filled" color={'gray'} onClick={() => {SetLoading(true);navigate(`/showlist/${item._id}`)}}>
                                <IconEye size={18} />
                            </ActionIcon>
                        </div>
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

function FamilyList({data, value, setValue, shoppingLists, navigate, SetLoading, deleteFunc}) {
    let parsedDate = 0;
    // var tzoffset = (new Date()).getTimezoneOffset() * 60000; // timezone offset in milliseconds
    return(
        <div style={{paddingTop: 10}}>
            {data.length != 0 ? 
                <div>
                    <div style={{marginBottom: 10}}>
                    <NativeSelect 
                    label="Select Family to assign to" 
                    placeholder="Enter Family Name" 
                    data={data.map(val => val.name)}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    />
                </div>
                <div style={{paddingTop: 10}}>    
                    {
                    shoppingLists ? shoppingLists.slice(0).reverse().map((item, index) => {
                        const parsedDate = new Date(item.createdAt)
                        return(
                                <div key={index} style={{paddingTop: 20, 
                                    paddingBottom: 20, 
                                    backgroundColor: "#ECF0F1", 
                                    width: "90%", 
                                    marginBottom: 10, 
                                    paddingLeft: 20, 
                                    paddingRight: 10, 
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                                >
                                    <div>
                                        <Text size={'md'}>Date - {parsedDate.getDate()} {months[parsedDate.getMonth()]} {parsedDate.getFullYear()}</Text>
                                        <Text size={'sm'}>Time - {parsedDate.getHours()}:{parsedDate.getMinutes()}</Text>
                                    </div>
                                    <div style={{position: "relative", right: "-30%", top: -10}}>
                                        <ActionIcon variant="filled" color={'red'} onClick={() => deleteFunc(item._id)}>
                                            <IconTrash size={18} />
                                        </ActionIcon>
                                    </div>
                                    <div style={{position: "relative", right: "-20%", top: 30}}>
                                        <ActionIcon variant="filled" color={'gray'} onClick={() => {SetLoading(true);navigate(`/showlist/${item._id}`)}}>
                                            <IconEye size={18} />
                                        </ActionIcon>
                                    </div>
                                </div>
                        )
                    })  : 
                    <div>
                        <Text>Your Shopping Lists will appear here</Text>
                    </div>
                    }
                </div>
                <div style={{position: "absolute", bottom: "15%", right: "10%"}}>
                    <Button color="dark" radius="xl" size="xl" compact component={Link} to="/newlist" >
                    +
                    </Button>
                </div>
                </div>
                : <Text>No Families found</Text>
            }
            
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