import { ActionIcon, Button, Group, Input, NumberInput, Text, NumberInputHandlers, NativeSelect } from "@mantine/core";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useInputState } from '@mantine/hooks';
import { List } from '@mantine/core';

export default function NewList({list, setList}) {
    const [value, setValue] = useState(1);
    const [unit, setUnit] = useState('KG');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useInputState('');
    useEffect(() => {console.log(items)}, [items])
    return(
        <div >
            <div style={{width: "100%", justifyContent: "center", display: "flex"}} >
                <h2>Create New List</h2>
            </div>
            <List type="ordered">
                {items.map((val, index) => {
                    return(
                           <Items item={val} /> 
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
                <AddButton onClick={() => {setItems([...items, {name: itemName, value: value, unit: unit}])}} />
            </div>
            <div style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-evenly", position: "fixed", bottom: 10}}>
                <Button color="dark" style={{width: "40%", borderWidth: 0}}>
                    Add
                </Button>
                <Button color="gray" style={{width: "40%", borderWidth: 0}}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

function Items({item}) {
    return(
        <div style={{display: "flex", marginLeft: 10, paddingLeft: 30, justifyContent: "flex-start", paddingTop: 10, paddingBottom: 10, backgroundColor: "#F4F6F7", marginRight: 10, borderRadius: 10, marginBottom: 10}}>
            <List.Item>{item.name} - {item.value} {item.unit}</List.Item>
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