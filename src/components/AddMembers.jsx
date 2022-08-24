import { ActionIcon, Button, Input, List, LoadingOverlay, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconAt, IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import BackButton from "./BackButton";
import ErrorModal from "./Error";

export default function AddMember(){

  const location = useLocation()
  const locationArray = location.pathname.split('/')
  const id = locationArray.splice(-1)[0]

  const [family, setFamily] = useState()
  const [familyIDs, setFamilyIDs] = useState([])

  const [loading, setLoading] = useState(true)

  const [errMsg, setErrMsg] = useState('')
  const [errModal, setErrModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

    setLoading(true)
    axios
    .get(`${config.backendLocation}/family/getfamily/${id}`, {headers: {token : localStorage.getItem('token')}})
    .then(res => {
      setFamily(res.data.members)
      setLoading(false)
    })

    setLoading(true)
    axios
    .get(`${config.backendLocation}/family/getmembers/${id}`, {headers: {token : localStorage.getItem('token')}})
    .then(res => {
      setFamilyIDs(res.data.members)
      setLoading(false)
    })
    .catch(err => {
      setErrMsg(err.response.data.msg)
      setErrModal(true)
    })
  }, [])

  function getUserData() {
    setLoading(true)
    axios
    .get(`${config.backendLocation}/user/byemail/${email}`)
    .then(res => {
      console.log(res)
      setFamily([...family, res.data])
      setFamilyIDs([...familyIDs, res.data._id])
      setEmail('')
      setLoading(false)
    })
    .catch(err => {
      setErrMsg(err.response.data.msg)
      setErrModal(true)
    })
  }

  function addMembers() {
    setLoading(true)
    axios
    .post(`${config.backendLocation}/family/addmembers/${id}`, {members: familyIDs}, {headers: {token : localStorage.getItem('token')}})
    .then(res => {
      console.log(res)
      setLoading(false)
      navigate('../mainpage')
    })
    .catch(err => {
      setErrMsg(err.response.data.msg)
      setErrModal(true)
    })
  }

  const [emailArray, setEmailArray] = useState([])
  const [email, setEmail] = useInputState()
  return (
    <div>
        
      <div style={{position: "relative"}}>

        <LoadingOverlay visible={loading} overlayBlur={6} transitionDuration={100} />

        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <h1>Add Member</h1> 
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
            {family ?family.map(val => {return(
              <Items email={val.email} />
            )}) : null}
          </List>
        </div>
        <div style={{width: "100%", display: "flex", justifyContent: "center", paddingTop: 20}}>
          <ActionIcon color="dark" size="lg" radius="xl" variant="filled" onClick={() => {getUserData()}}>
            <IconPlus />
          </ActionIcon> 
        </div>
        <div style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-evenly", position: "fixed", bottom: 10}}>
          <Button color="dark" style={{width: "40%", borderWidth: 0}} onClick={() => {addMembers()}}>
              Add
          </Button>
          <Button color="gray" style={{width: "40%", borderWidth: 0}} onClick={() => navigate('../')}>
              Cancel
          </Button>
        </div>
        <ErrorModal msg={errMsg} setVisible={setErrModal} visible={errModal} />
      </div>
      <div style={{position: "absolute", top: 10, left: 10}}>
          <BackButton onClick={() => {navigate('../')}} />
      </div>
    </div>
  )
}

function Items({email}) {
  return(
      <div style={{paddingTop: 20, 
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
      position: "relative"}}>  
        <div>
          <List.Item>{email}</List.Item>
        </div>
        {/* <div style={{position: "absolute", right: 70, top: "30%"}}>
          <ActionIcon variant="filled">
            <IconEdit size={18} />
          </ActionIcon>
        </div> */}
        <div style={{position: "absolute", right: 30, top: "30%"}}>
          <ActionIcon variant="filled" color={'red'}>
            <IconTrash size={18} />
          </ActionIcon>
        </div>
      </div>
  )
}