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
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getOptChangePs, validateOtp } from "../../services/userService";
import ModalSignUpSuccess from "./ModalSignUpSuccess";
// eslint-disable-next-line react/prop-types
function ModalEnterOtpSignUp({ isOpen, onClose }) {
  const [modalSuccess, setModalSuccess] = useState(false);
  const { userName, getOtp } = useAuth();
  const [enterOtp, setEnterOtp] = useState("");
  const [successOtp, setSuccessOtp] = useState(true);
  const [countdown, setCountdown] = useState(180);
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const { mutate: mutataGetOtp } = useMutation({
    mutationFn: getOptChangePs,
    onSuccess: (data) => {},
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
        setModalSuccess(true);
      }
    },
    onError: (err) => {
      setSuccessOtp(false);
    },
  });
  return (
    <>
      {modalSuccess && <ModalSignUpSuccess />}
      {!modalSuccess && (
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
              <Text>Thời gian còn lại {countdown}</Text>
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
                  onClick={() => {
                    onClose();
                  }}
                  _hover={{ bg: "#E7EAEE" }}
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
                    Hoàn tất đăng ký
                  </Button>
                ) : (
                  <Button isDisabled colorScheme="primary">
                    Hoàn tất đăng ký
                  </Button>
                )}
              </HStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ModalEnterOtpSignUp;
