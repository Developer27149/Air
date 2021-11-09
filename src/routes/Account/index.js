import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Header from "./Header.js";
import Container from "./Container.js";

export default function AccountPage() {
  const [posState, setPosState] = useState(true);
  const history = useHistory();
  const onRedirctToHome = () => history.replace("/");
  const handleSwitchState = (is) => {
    setPosState(is);
  };
  return (
    <Flex bg="white" flexDir="column" align="stretch" h="100vh">
      <Header
        isOnLogin={posState}
        setIsOnLogin={handleSwitchState}
        onRedirctToHome={onRedirctToHome}
      />
      <Container flexGrow="1" onRedirctToHome={onRedirctToHome} isOnLogin={posState} />
    </Flex>
  );
}
