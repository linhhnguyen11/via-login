import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  Icon,
  Center,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { GoShieldCheck } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModalChangeSuccess() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    onOpen();
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    console.log(countdown);
    if (countdown === 0) {
      navigate("/");
    }
    return () => clearTimeout(timer);
  }, [onOpen, countdown, navigate]);
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
                MẬT KHẨU ĐÃ ĐƯỢC THIẾT LẬP LẠI
              </Text>
              <Text>Bạn vui lòng ghi nhớ mật khẩu nhé!</Text>
              <Text color="primary.500">
                Tự động đăng nhập sau {countdown} giây
              </Text>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalChangeSuccess;
