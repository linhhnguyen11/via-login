import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  Icon,
  Center,
  Stack,
} from "@chakra-ui/react";
import { GoShieldCheck } from "react-icons/go";
// eslint-disable-next-line react/prop-types
function ModalPolicy({ isOpen, onClose }) {
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
                CHÍNH SÁCH ĐANG ĐƯỢC CẬP NHẬT
              </Text>
              <Text>Cảm ơn đã sử dụng dịch vụ</Text>
              <Text color="primary.500">Vui lòng kiểm tra lại sau</Text>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalPolicy;
