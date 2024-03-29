import { ActionIcon, Button, Input, NumberInput, Text, NativeSelect, Modal, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { useInputState } from '@mantine/hooks';
import { List } from '@mantine/core';
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { IconTrash } from "@tabler/icons";

export default function NewList({list, setList}) {

    const navigate = useNavigate()

    const [value, setValue] = useState(1);
    const [unit, setUnit] = useState('KG');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useInputState('');
    const [assignModal, setAssignModal] = useInputState(false);
    const [family, setFamily] = useState([])
    const [selectedFamily, setSelectedFamily] = useState()


    useEffect(() => {
        axios
        .get(`${config.backendLocation}/family/user`, {headers: {token : localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
            setFamily(res.data)
            setSelectedFamily(res.data[0].name)
        })
    }, [])

    function newList() {
        axios
        .post(`${config.backendLocation}/list/createlist`,
            {items: items},
            {headers: {token : localStorage.getItem('token')}})
        .then(res => {console.log(res); navigate('../mainpage')})
        .catch(err => console.log(err))
    }

    function newListWithFam() {
        axios
        .post(`${config.backendLocation}/list/createlist`,
            {items: items, assignedTo : family.filter(e => e.name == selectedFamily)[0]._id},
            {headers: {token : localStorage.getItem('token')}})
        .then(res => {console.log(res); navigate('../mainpage')})
        .catch(err => console.log(err))
    }

    useEffect(() => {console.log(items)}, [items])
    useEffect(() => {console.log(selectedFamily)}, [selectedFamily])


    return(
        <div >
            <div style={{position: "absolute", top: 10, left: 10}}>
                <BackButton onClick={() => {navigate('../')}} />
            </div>
            <div style={{width: "100%", justifyContent: "center", display: "flex"}} >
                <h2>Create New List</h2>
            </div>
            <ScrollArea type="never" style={{height: window.innerHeight - 150}}>
                <List type="ordered">
                    {items.map((val, index) => {
                        return(
                            <Items item={val} key={index} onClick={() => setItems(items.filter(e => e!=val)) } /> 
                        )
                    })}
                </List>
                <div style={{display: 'flex', flexDirection: "row", paddingTop: 10}}>
                    <Input placeholder="Name of item" style={{width: "60%", paddingLeft: 10}} onChange={setItemName} value={itemName} />
                    <div style={{paddingLeft: 10, paddingRight: 10}}>
                        <Quantity value={value} setValue={setValue} setUnit={setUnit} unit={unit} />
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "center", paddingTop: 10}}>
                    <AddButton onClick={() => {
                        setItems([...items, {name: itemName, value: value, unit: unit}]); 
                        setItemName(''); 
                        setValue(1)
                    }} />
                </div>
                
            </ScrollArea>
            <div style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-evenly", position: "fixed", bottom: 10}}>
                <Button color="dark" style={{width: "40%", borderWidth: 0}} onClick={() => {items.length!=0 ? setAssignModal(true) : console.log('Add Some Items First')}}>
                    Add
                </Button>
                <Button color="gray" style={{width: "40%", borderWidth: 0}} onClick={() => navigate('../')}>
                    Cancel
                </Button>
            </div>
            {family ? 
                <AssignModal 
                data={family} 
                value={selectedFamily} 
                setValue={setSelectedFamily} 
                opened={assignModal} 
                setOpened={setAssignModal}
                skipFunc={newList}
                assignFunc={newListWithFam}
                /> 
            : null}
        </div>
    )
}

function Items({item, onClick}) {
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
        >
            <div>
                <List.Item>{item.name} - {item.value} {item.unit}</List.Item>
            </div>
            {/* <div style={{position: "absolute", right: 70, top: "30%"}}>
                <ActionIcon variant="filled">
                    <IconEdit size={18} />
                </ActionIcon>
            </div> */}
            <div style={{position: "absolute", right: 30, top: "30%"}}>
                <ActionIcon variant="filled" color={'red'} onClick={onClick}>
                    <IconTrash size={18} />
                </ActionIcon>
            </div>
        </div>
    )
}

function AddButton({onClick}){
    return(
        <ActionIcon color="dark" variant="filled" size={"lg"} onClick={onClick}>
            <Text size={'xl'} style={{fontWeight: "bold"}}>
                +
            </Text>
        </ActionIcon>
    )
}

function Quantity({value, setValue, unit, setUnit}) {
    return(
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>

            <NumberInput
            max={10}
            min={0}
            precision={1}
            defaultValue={1}
            step={0.5}
            value={value}
            onChange={val => {setValue(val)}}
            styles={{ input: { width: 60, textAlign: 'justify' } }}
            />

            <NativeSelect
            data={['KG', 'Liter', 'Number']}
            placeholder="Select unit"
            style={{paddingLeft: 5}}
            value={unit}
            onChange={(event) => setUnit(event.currentTarget.value)}
            />

        </div>
    )
}

function AssignModal({data, value, setValue, opened, setOpened, assignFunc, skipFunc}) {
    return(
        <Modal 
        opened={opened}
        onClose={() => setOpened(false)}
        >
            {data.length != 0 ? 
                <div>
                    <h2>Assign To Family</h2>
                    <NativeSelect 
                    label="Select Family to assign to" 
                    placeholder="Enter Family Name" 
                    data={data.map(val => val.name)}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    /> 
                    
                    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", marginTop: 20}}>
                        <Button color="dark" style={{width: "40%", borderWidth: 0}} onClick={() => assignFunc()}>
                            Assign
                        </Button>
                        <Button color="gray" style={{width: "40%", borderWidth: 0}} onClick={() => skipFunc()} >
                            Skip
                        </Button>
                    </div>
                </div>
            :   <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <Button color="dark" style={{width: "40%", borderWidth: 0}} onClick={() => skipFunc()}>
                        Add List
                    </Button>
                </div>
            }
        </Modal>
    )
}