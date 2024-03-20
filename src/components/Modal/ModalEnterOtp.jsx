import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Button,
  Icon,
  Text,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getOptChangePs, validateOtp } from "../../services/userService";
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes <= 10) {
    minutes = "0" + minutes;
  }
  if (seconds <= 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};
function ModalEnterOtp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userName, getOtp } = useAuth();
  const [enterOtp, setEnterOtp] = useState("");
  const [successOtp, setSuccessOtp] = useState(true);
  const [countdown, setCountdown] = useState(180);
  const navigate = useNavigate();
  const timer = useRef();
  useEffect(() => {
    onOpen();
    timer.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, [onOpen]);
  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timer.current);
    }
  }, [countdown]);
  const { mutate: mutataGetOtp } = useMutation({
    mutationFn: getOptChangePs,
    onSuccess: (data) => {
      navigate("/enter-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateCheckOtp } = useMutation({
    mutationFn: validateOtp,
    onSuccess: (data) => {
      console.log(data.error);
      if (data.error === "Mã OTP không hợp lệ!") {
        setSuccessOtp(false);
      } else {
        navigate("/change-password");
      }
    },
    onError: (err) => {
      setSuccessOtp(false);
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>NHẬP MÃ OTP</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {successOtp && (
            <Text>MÃ OTP ĐÃ ĐƯỢC GỬI TỚI EMAIL/SỐ ĐIỆN THOẠI</Text>
          )}
          {!successOtp && (
            <Text textAlign="center">
              Mã OTP không đúng.{" "}
              <Text
                as="span"
                color="blue"
                cursor="pointer"
                onClick={() => {
                  setCountdown(180);
                  mutataGetOtp(userName);
                }}
              >
                Gửi lại mã
              </Text>
            </Text>
          )}
          <Text>Thời gian còn lại {formatTime(countdown)}</Text>
          <HStack
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={2}
            gap={4}
          >
            <PinInput otp size="lg" onChange={(e) => setEnterOtp(e)}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          {successOtp && (
            <Text textAlign="center">
              Không nhận được mã OTP.{" "}
              <Text
                as="span"
                color="blue"
                cursor="pointer"
                onClick={() => {
                  setCountdown(180);
                  mutataGetOtp(userName);
                }}
              >
                Gửi lại mã
              </Text>
            </Text>
          )}

          <HStack alignItems="center" justifyContent="center" gap={4}>
            <Button
              color="#323A46"
              bgColor="#E7EAEE"
              _hover={{ bg: "#E7EAEE" }}
              onClick={() => {
                navigate("/get-otp");
              }}
              leftIcon={<Icon as={IoChevronBackOutline} />}
            >
              Trở về
            </Button>
            {enterOtp.length === 6 ? (
              <Button
                isActive
                colorScheme="primary"
                onClick={() => {
                  const otpCode = enterOtp;
                  getOtp(otpCode);
                  mutateCheckOtp({ userName, otpCode });
                }}
              >
                Thay đổi mật khẩu
              </Button>
            ) : (
              <Button isDisabled colorScheme="primary">
                Thay đổi mật khẩu
              </Button>
            )}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalEnterOtp;
