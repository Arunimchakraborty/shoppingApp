import { ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";

export default function BackButton({onClick}) {
  return (
      <ActionIcon size="lg" radius="xl" variant="filled" onClick={onClick} >
        <IconArrowLeft size={26} />
      </ActionIcon>
  )
}