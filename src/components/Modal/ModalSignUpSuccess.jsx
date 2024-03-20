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
  useDisclosure,
} from "@chakra-ui/react";
import { GoShieldCheck } from "react-icons/go";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
function ModalSignUpSuccess() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />

      <ModalContent>
        <ModalBody>
          <Center>
            <Stack alignItems="center" gap={6} p={6}>
              <Icon as={GoShieldCheck} color="#10B981" boxSize="64px" />
              <Text
                fontSize="28px"
                lineHeight="34px"
                fontWeight="600"
                color="#10B981"
              >
                ĐĂNG KÝ THÀNH CÔNG
              </Text>
              <Text>
                Để sử dụng dịch vụ thu hộ , bạn có muốn ký kết hợp đồng điện thử
                ngay ?
              </Text>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <Button
                  color="#323A46"
                  bgColor="#E7EAEE"
                  onClick={() => {
                    onClose();
                  }}
                  _hover={{ bg: "#E7EAEE" }}
                >
                  Đăng nhập
                </Button>
                <Button
                  _hover={{ bg: "#19B88B" }}
                  bgColor="#19B88B"
                  onClick={onClose}
                >
                  Ký kết hợp đồng
                </Button>
              </HStack>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalSignUpSuccess;
