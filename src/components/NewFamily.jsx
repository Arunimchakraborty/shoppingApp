import { ActionIcon, Button, Input, List, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconAt, IconPlus } from "@tabler/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import ErrorModal from "./Error";

export default function NewFamily(){

  const [emailArray, setEmailArray] = useState([])
  const [idArray, setIDArray] = useState([])
  const [email, setEmail] = useInputState()
  const [name, setName] = useInputState()

  const [errMsg, setErrMsg] = useState('')
  const [errModal, setErrModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {console.log(idArray)}, [idArray])

  function getUserData() {
    axios
    .get(`${config.backendLocation}/user/byemail/${email}`)
    .then(res => {
      console.log(res)
      emailArray.push(email)
      setEmail('')
      setIDArray([...idArray, res.data._id])
    })
    .catch(err => {
      setErrMsg(err.response.data.msg)
      setErrModal(true)
    })
  }

  function createFamily() {
    axios
    .post(`${config.backendLocation}/family/createfamily`, {name: name, members: idArray}, {headers: {token : localStorage.getItem('token')}})
    .then(res => {
      console.log('Successfully created Family')
      navigate('../mainpage')
    })
    .catch(err => {
      setErrMsg(err.response.data.msg)
      setErrModal(true)
    })
  }

  return (
    <div>

      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <h1>New Family</h1> 
      </div>

      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <Input placeholder="Add Family Name" value={name} onChange={setName} />
      </div>

      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <h3>Add Members Email Addresses</h3>
      </div>

      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <Input
        icon={<IconAt />}
        placeholder="Enter email"
        value={email}
        onChange={setEmail}
        />
      </div>
      {/* <div style={{width: "100%", display: "flex", justifyContent: "center", paddingTop: 20, paddingBottom: 20,  paddingRight: 10, height: 40}}>
        <div style={{width: "80%", paddingLeft: 20, paddingTop: 10, backgroundColor: "#F4F6F7", borderRadius: 10}}>
          <Text>Hello</Text>
        </div>
      </div> */}
      <div style={{paddingTop: 20}}>
        <List>
          {emailArray.map(val => {return(
            <Items email={val} />
          )})}
        </List>
      </div>
      <div style={{width: "100%", display: "flex", justifyContent: "center", paddingTop: 20}}>
        <ActionIcon color="dark" size="lg" radius="xl" variant="filled" onClick={() => {
          getUserData() 
        }}>
          <IconPlus />
        </ActionIcon> 
      </div>
      <div style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-evenly", position: "fixed", bottom: 10}}>
        <Button color="dark" style={{width: "40%", borderWidth: 0}} onClick={() => createFamily()}>
            Add
        </Button>
        <Button color="gray" style={{width: "40%", borderWidth: 0}} onClick={() => navigate('../')}>
            Cancel
        </Button>
      </div>
      <ErrorModal msg={errMsg} setVisible={setErrModal} visible={errModal} />
    </div>
  )
}

function Items({email}) {
  return(
      <div style={{display: "flex", marginLeft: 10, paddingLeft: 30, justifyContent: "flex-start", paddingTop: 10, paddingBottom: 10, backgroundColor: "#F4F6F7", marginRight: 10, borderRadius: 10, marginBottom: 10}}>
          <List.Item>{email}</List.Item>
      </div>
  )
}