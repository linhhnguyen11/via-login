import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import { object, string, ref } from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const changePasswordSchema = object({
  password: string()
    .required("Trường này là bắt buộc")
    .min(9, "Mật khẩu phải có ít nhất 9 kí tự")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa")
    .matches(/[a-z]/, "Mât khẩu phải chứa ít nhất 1 chữ cái viết thường"),
  confirmPassword: string()
    .required("Trường này là bắt buộc")
    .oneOf([ref("password"), null], "Mật khẩu không trùng khớp"),
});
function ModalChangePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { otp, userName, changePassword: setPassword } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      navigate("/change-password-success");
    },
    onError: (err) => {},
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thiết lập mật khẩu mới</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={(values) => {
              const password = values.password;
              const confirmPassword = values.confirmPassword;
              const otpCode = otp;
              setPassword(values.password);

              mutate({ userName, otpCode, password, confirmPassword });
            }}
          >
            {() => (
              <Form>
                <Stack gap={4}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl
                        isInvalid={!!(meta.error && meta.touched)}
                        isRequired
                      >
                        <FormLabel htmlFor="password">Mật khẩu mới</FormLabel>
                        <Input
                          {...field}
                          name="password"
                          type="password"
                          placeholder="Nhập mật khẩu"
                        ></Input>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phoneNumber">
                    {({ field, meta }) => (
                      <FormControl
                        isInvalid={!!(meta.error && meta.touched)}
                        isRequired
                      >
                        <FormLabel htmlFor="confirmPassword">
                          Xác nhận mật khẩu mới
                        </FormLabel>
                        <Input
                          {...field}
                          name="confirmPassword"
                          type="password"
                          placeholder="Nhập mật khẩu"
                        ></Input>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <div className="flex items-center justify-center flex-col gap-[24px] mt-[24px]">
                  <Button colorScheme="primary" type="submit">
                    Đăng nhập
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

export default ModalChangePassword;
