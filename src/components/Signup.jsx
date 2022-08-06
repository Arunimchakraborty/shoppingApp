import { Input } from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff, IconPhone } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { Title } from '@mantine/core';
export default function Login(){
    return(
        <div style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
            <div style={{display: "flex", width: "100%", justifyContent: "center",paddingTop: 20, paddingBottom: 40 }}>
                <Title order={1}>Sign Up</Title>
            </div>
            <div style={{paddingTop: 20, paddingBottom: 10,}}>
                <Input
                placeholder="First Name"
                />
            </div>
            <div style={{paddingTop: 10, paddingBottom: 10,}}>
                <Input
                placeholder="Last Name"
                />
            </div>
            <div style={{paddingTop: 10, paddingBottom: 10,}}>
                <Input
                icon={<IconPhone />}
                placeholder="Phone Number"
                />
            </div>
            <div style={{paddingTop: 30, paddingBottom: 20,}}>
                <Input
                icon={<IconAt />}
                placeholder="Your email"
                />
            </div>
            <div style={{paddingTop: 20, paddingBottom: 20,}}>
                <PasswordInput
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
                defaultValue="secret"
                visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
      }
                />
            </div>
        </div>
    )
}