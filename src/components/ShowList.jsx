import { List, Text } from "@mantine/core";

export default function () {
    const list = {
        items: [
            {name: "Potato", value: 2, unit: "KG"},
            {name: "Oil", value: 1, unit: "Liter"},
            {name: "Battery", value: 3, unit: "Units"}
        ],
        user: "Arunim Chakraborty",
        date: new Date().toISOString()
    }
    return(
        <div style={{paddingTop: 20}}>
            <h2 style={{textAlign: "center"}}>List Summary</h2>
            <div style={{marginBottom: 10}}>
                <div>
                    <Text size={'sm'}>Added By {list.user}</Text>
                </div>
                <div>
                    <Text size={'xs'}>Added at {list.date}</Text>
                </div>
            </div>
            <List>
                {list.items.map((val, index) => {
                    return(
                        <div style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 20, marginBottom: 20, backgroundColor: "#F4F6F7", borderRadius: 10, width: "85%"}} key={index}>
                            <Text>{val.name}</Text>
                            <Text>{val.value} {val.unit}</Text>
                        </div>
                    )
                })}
            </List>
            
        </div>
    )
}