import { Flex } from "@chakra-ui/layout";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import Header from "./Header.js";
import Container from "./Container.js";
import { setProfile } from "Store/profile.js";
import { useDispatch, useSelector } from "react-redux";

export default function AccountPage() {
  const [posState, setPosState] = useState(true);
  const history = useHistory();
  const handleSwitchState = (is) => {
    setPosState(is);
  };
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  const loginAsAnonymous = useCallback(() => {
    dispatch(
      setProfile({
        ...profile,
        isAnonymous: true,
      })
    );
    history.replace("/");
  });
  return (
    <Flex bg="#f6f6f6" flexDir="column" align="stretch" h="100vh">
      <Header
        isOnLogin={posState}
        setIsOnLogin={handleSwitchState}
        onRedirctToHome={loginAsAnonymous}
      />
      <Container flexGrow="1" onRedirctToHome={loginAsAnonymous} isOnLogin={posState} />
    </Flex>
  );
}
