import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Input,
  FormLabel,
  FormControl,
  Button,
  Text,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import { getOptChangePs } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// eslint-disable-next-line react/prop-types
function ModalGetOtp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { changeUserName } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  const { mutate } = useMutation({
    mutationFn: getOptChangePs,
    onSuccess: (data) => {
      navigate("/enter-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function validateField(value) {
    let error;
    if (!value) {
      error = "Vui lòng nhập email hoặc số điện thoại";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Số điện thoại hoặc email không hợp lệ.";
      if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
        error = undefined;
      }
    }

    return error;
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(), navigate("/");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>YÊU CẦU THAY ĐỔI MẬT KHẨU</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              userName: "",
            }}
            onSubmit={(values) => {
              changeUserName(values.userName);
              mutate(values.userName);
            }}
          >
            {() => (
              <Form>
                <Field name="userName" validate={validateField}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.userName && form.touched.userName}
                    >
                      <FormLabel>Email/Số điện thoại</FormLabel>
                      <Input
                        {...field}
                        name="userName"
                        placeholder="Email/Số điện thoại"
                      />
                      <FormErrorMessage>
                        {form.errors.userName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <div className="flex items-center justify-center flex-col gap-[24px] mt-[24px]">
                  <Text textAlign="center">
                    Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn trên
                    điện thoại để lấy mã OTP
                  </Text>
                  <Button colorScheme="primary" type="submit">
                    Gửi yêu cầu
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalGetOtp;
