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
        <div>
            <List>
                {list.items.map((val, index) => {
                    return(
                        <List.Item key={index}>{val.name} - {val.value} {val.unit}</List.Item>
                    )
                })}
            </List>
            <div>
                <Text>Added By {list.user}</Text>
            </div>
            <div>
                <Text>Added at {list.date}</Text>
            </div>
        </div>
    )
}