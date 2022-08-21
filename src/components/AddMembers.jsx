import { ActionIcon, Button, Input, List, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconAt, IconPlus } from "@tabler/icons";
import { useState } from "react";

export default function AddMember(){
  const [emailArray, setEmailArray] = useState([])
  const [email, setEmail] = useInputState()
  const [name, setName] = useInputState()
  return (
    <div>

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
          {emailArray.map(val => {return(
            <Items email={val} />
          )})}
        </List>
      </div>
      <div style={{width: "100%", display: "flex", justifyContent: "center", paddingTop: 20}}>
        <ActionIcon color="dark" size="lg" radius="xl" variant="filled" onClick={() => {emailArray.push(email); setEmail('');}}>
          <IconPlus />
        </ActionIcon> 
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

function Items({email}) {
  return(
      <div style={{display: "flex", marginLeft: 10, paddingLeft: 30, justifyContent: "flex-start", paddingTop: 10, paddingBottom: 10, backgroundColor: "#F4F6F7", marginRight: 10, borderRadius: 10, marginBottom: 10}}>
          <List.Item>{email}</List.Item>
      </div>
  )
}