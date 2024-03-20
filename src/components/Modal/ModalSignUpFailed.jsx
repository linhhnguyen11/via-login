import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  Icon,
  Center,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { GoShieldX } from "react-icons/go";
import { IoChevronBackOutline } from "react-icons/io5";
// eslint-disable-next-line react/prop-types
function ModalSignUpFailed({ isOpen, onClose }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />

      <ModalContent>
        <ModalBody>
          <Center>
            <Stack alignItems="center" gap={6} p={6}>
              <Icon as={GoShieldX} color="#DC2626" boxSize="64px" />
              <Text
                fontSize="28px"
                lineHeight="34px"
                fontWeight="600"
                color="#DC2626"
              >
                ĐĂNG KÝ KHÔNG THÀNH CÔNG
              </Text>
              <Text>
                Thông tin bạn đăng ký có thể đã trùng với một tài khoản khác
                trên hệ thống
              </Text>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <Button
                  color="#323A46"
                  bgColor="#E7EAEE"
                  _hover={{ bg: "#E7EAEE" }}
                  leftIcon={<Icon as={IoChevronBackOutline} />}
                >
                  Bỏ qua đăng ký
                </Button>
                <Button
                  _hover={{ bg: "#19B88B" }}
                  bgColor="#19B88B"
                  onClick={onClose}
                >
                  Thử lại
                </Button>
              </HStack>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalSignUpFailed;
