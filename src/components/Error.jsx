import { Modal, useMantineTheme } from "@mantine/core";

export default function ErrorModal({visible, setVisible, msg}) {
  const theme = useMantineTheme();
  return (
      <Modal
      opened={visible}
      centered
      onClose={() => setVisible(false)}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      >
          <div>
              <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                  <h1>Error</h1>
              </div>
              <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                  <h4>{msg}</h4>
              </div>
          </div>
      </Modal>
  )
}