import tiktok from "../assets/e20d57f29801cfdb0b436a493f101db9.png";
import upos from "../assets/8e38b966cab9c1ea6c47f495b6ef9331.png";
import shoppe from "../assets/4c2443f98a271a7010e0fe5dfbf594ef.png";
import oppo from "../assets/d1ea70c645fa626e1434ee13d6d589fc.png";
import tiki from "../assets/09e6c875efe1aec2cbe1e82396250bab.png";
import tgdd from "../assets/dcc87e0c0aa2419c7ade39d149371041.png";
import { Container, Flex, Image, Button, Icon, Text } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
function Customers() {
  return (
    <Container
      w="auto"
      maxW="none"
      backgroundColor="rgba(247, 248, 249, 1)"
      px="48px"
      py="78px"
    >
      <Text
        lineHeight="34px"
        fontSize="28px"
        textAlign="center"
        fontWeight="600"
        color="primary.500"
      >
        KHÁCH HÀNG TIÊU BIỂU
      </Text>
      <Flex gap="54px" align="center" justifyContent="space-between">
        <Button variant="none">
          <Icon as={FaChevronLeft} />
        </Button>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={tiktok}
        ></Image>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={upos}
        ></Image>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={shoppe}
        ></Image>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={oppo}
        ></Image>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={tiki}
        ></Image>
        <Image
          boxSize="150px"
          height="70px"
          objectFit="contain"
          src={tgdd}
        ></Image>
        <Button variant="none">
          <Icon as={FaChevronRight} />
        </Button>
      </Flex>
    </Container>
  );
}

export default Customers;
