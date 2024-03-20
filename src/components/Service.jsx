import { Card, Text, Image, Stack, Flex } from "@chakra-ui/react";

import viaexpress from "../assets/via-express.png";
import viafast from "../assets/via-fast.png";
import viasuper from "../assets/via-super.png";
import viafresh from "../assets/via-fresh.png";
import viainternaltional from "../assets/via-internaltional.png";
function Service() {
  return (
    <Card
      w="352px"
      bg="rgba(247, 248, 249, 1)
"
      padding="24px"
    >
      <Text
        textAlign="center"
        lineHeight="23px"
        fontSize="19px"
        fontWeight="600"
      >
        DỊCH VỤ CỦA CHÚNG TÔI
      </Text>
      <Flex gap="24px" mt="24px">
        <Card flex="1" pt={4} pb={4} pr={2} pl={2}>
          <Stack spacing="3" align="center">
            <Image src={viaexpress} boxSize="40px" />
            <Text textStyle="service">VIA EXPRESS</Text>
          </Stack>
        </Card>
        <Card flex="1" pt={4} pb={4} pr={2} pl={2}>
          <Stack spacing="3" align="center">
            <Image src={viafast} boxSize="40px" />
            <Text textStyle="service">VIA FAST</Text>
          </Stack>
        </Card>
      </Flex>
      <Flex gap="24px" mt="24px">
        <Card flex="1" pt={4} pb={4} pr={2} pl={2}>
          <Stack spacing="3" align="center">
            <Image src={viasuper} boxSize="40px" />
            <Text textStyle="service">VIA SUPER</Text>
          </Stack>
        </Card>
        <Card flex="1" pt={4} pb={4} pr={2} pl={2}>
          <Stack spacing="3" align="center">
            <Image src={viafresh} boxSize="40px" />
            <Text textStyle="service">VIA FRESH</Text>
          </Stack>
        </Card>
      </Flex>
      <Card mt="24px" pt={4} pb={4} pr={2} pl={2}>
        <Stack spacing="3" align="center">
          <Image src={viainternaltional} boxSize="40px" />
          <Text textStyle="service">VIA INTERNALTIONAL</Text>
        </Stack>
      </Card>
    </Card>
  );
}

export default Service;
