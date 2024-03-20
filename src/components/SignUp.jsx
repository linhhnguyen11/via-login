import {
  Container,
  Center,
  Text,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Button,
  Select,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { object, string, ref } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signUpApi, getOptChangePs } from "../services/userService";
import ModalPolicy from "./Modal/ModalPolicy";
import ModalSignUpFailed from "./Modal/ModalSignUpFailed";
import ModalEnterOtpSignUp from "./Modal/ModalEnterOtpSignUp";
import useAuth from "../hooks/useAuth";

const signupSchema = object({
  shopName: string().required("Trường này là bắt buộc."),
  email: string()
    .required("Trường này là bắt buộc")
    .email("Vui lòng nhập đúng định dạng email."),
  phoneNumber: string()
    .required("Trường này là bắt buộc")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Vui lòng nhập đúng định dạng số điện thoại"
    ),
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
function SignUp() {
  const { role, changeUserName } = useAuth();
  const {
    isOpen: isOpenPolicy,
    onOpen: onOpenPolicy,
    onClose: onClosePolicy,
  } = useDisclosure();
  const {
    isOpen: isOpenFail,
    onOpen: onOpenFail,
    onClose: onCloseFail,
  } = useDisclosure();

  const {
    isOpen: isOpenOTP,
    onOpen: onOpenOTP,
    onClose: onCloseOTP,
  } = useDisclosure();
  const { mutate: mutatagetOtp } = useMutation({
    mutationFn: getOptChangePs,
    onSuccess: () => {
      onOpenOTP();
    },
    onError: () => {},
  });
  const { mutate } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      mutatagetOtp(data.data.content.userName);
      changeUserName(data.data.content.userName);
    },
    onError: () => {
      onOpenFail();
    },
  });
  return (
    <Container maxW="none" w="auto" m={0} flex={1}>
      {role === "Admin" && (
        <div className="flex-initial">
          <Stack justifyContent="center" alignItems="center">
            <Text color="primary.500" fontSize="25px" fontWeight="600">
              BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG
            </Text>
            <Text>Chào mừng user1 Đã quay trở lại hệ thống</Text>
          </Stack>
        </div>
      )}
      {role !== "Admin" && (
        <Center>
          <div>
            <Text
              color="rgba(220, 162, 69, 1) "
              fontSize="25px"
              fontWeight="600"
              textAlign="center"
            >
              ĐĂNG KÝ TÀI KHOẢN
            </Text>
            <Formik
              initialValues={{
                userName: "",
                shopName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                address: "",
                wards: "",
                district: "",
                province: "",
                acceptTerm: false,
              }}
              validationSchema={signupSchema}
              onSubmit={(values, { resetForm }) => {
                values.userName = values.email;
                if (values.acceptTerm === false) {
                  alert("Vui lòng đồng ý với Chính sách bảo mật");
                }
                mutate(values);
                resetForm({ values: "" });
              }}
            >
              {() => (
                <Form>
                  <Stack mt="10" gap="6">
                    <Flex gap="4">
                      <Field name="shopName">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                            isRequired
                          >
                            <FormLabel htmlFor="shopName">
                              Tên Cửa Hàng
                            </FormLabel>
                            <Input
                              {...field}
                              name="shopName"
                              type="text"
                              placeholder="Nhập tên cửa hàng..."
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
                            <FormLabel htmlFor="phoneNumber">
                              Số điện thoại
                            </FormLabel>
                            <Input
                              {...field}
                              name="phoneNumber"
                              type="text"
                              placeholder="Nhập số điện thoại"
                            ></Input>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                            isRequired
                          >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                              {...field}
                              name="email"
                              type="email"
                              placeholder="Nhập Email"
                            ></Input>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex gap="4">
                      <Field name="password">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                            isRequired
                          >
                            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                            <Input
                              {...field}
                              name="password"
                              type="password"
                              placeholder="Nhập mật khẩu..."
                            ></Input>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="confirmPassword">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                            isRequired
                          >
                            <FormLabel htmlFor="confirmPassword">
                              Nhập lại mật khẩu
                            </FormLabel>
                            <Input
                              {...field}
                              name="confirmPassword"
                              type="password"
                              placeholder="Xác nhận mật khẩu"
                            ></Input>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Field name="address">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                          <Input
                            {...field}
                            name="address"
                            type="text"
                            placeholder="Nhập số nhà, toà nhà, tên đường..."
                          ></Input>
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Flex gap="4">
                      <Field name="wards">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                          >
                            <FormLabel htmlFor="wards">Phường/Xã</FormLabel>
                            <Select
                              placeholder="Chọn Phường/Xã"
                              name="wards"
                              {...field}
                            >
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </Select>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="district">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                          >
                            <FormLabel htmlFor="district">Quận/Huyện</FormLabel>
                            <Select
                              placeholder="Chọn Quận/Huyện"
                              {...field}
                              name="district"
                            >
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </Select>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="province">
                        {({ field, meta }) => (
                          <FormControl
                            isInvalid={!!(meta.error && meta.touched)}
                          >
                            <FormLabel htmlFor="province">Thành Phố</FormLabel>
                            <Select
                              placeholder="Chọn Thành phố"
                              {...field}
                              name="province"
                            >
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </Select>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex>
                      <Field
                        as={Checkbox}
                        colorScheme="primary"
                        name="acceptTerm"
                      >
                        <Text textStyle="p3" fontSize="16px">
                          Tôi đã đọc và đồng ý với{" "}
                          <Text
                            as="span"
                            color="primary.500"
                            fontSize="16px"
                            onClick={() => {
                              onOpenPolicy();
                            }}
                          >
                            Chính sách bảo mật thông tin
                          </Text>
                        </Text>
                      </Field>
                      <Spacer />
                      <Button colorScheme="primary" type="submit">
                        Đăng ký ngay
                      </Button>
                    </Flex>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
          <ModalEnterOtpSignUp isOpen={isOpenOTP} onClose={onCloseOTP} />

          <ModalSignUpFailed onClose={onCloseFail} isOpen={isOpenFail} />
          <ModalPolicy onClose={onClosePolicy} isOpen={isOpenPolicy} />
        </Center>
      )}
    </Container>
  );
}

export default SignUp;
