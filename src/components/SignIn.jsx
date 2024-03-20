/* eslint-disable no-const-assign */
import {
  Image,
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  Card,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import banner from "../assets/banner.png";
import logo from "../assets/via-logo.png";
import aqua from "../assets/aqua_narchi_artwork.jpg";
import { Formik, Field, Form } from "formik";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../services/userService";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [userNameLogin, setUserNameLogin] = useState();
  const { login, role, userName, password, logout, setPasswordEmpty } =
    useAuth();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      const { role, userName } = data;
      login(role);
      setUserNameLogin(userName);
      setCountdown(5);
      setPasswordEmpty();
    },
    onError: () => {},
  });
  useEffect(() => {
    if (userName !== "" && password !== "") {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      console.log(countdown);
      if (countdown === 0) {
        mutate({ userName, password });
      }
      return () => clearTimeout(timer);
    }
  }, [userName, password, mutate, countdown]);
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
  const signinSchema = object({
    // phoneEmail: string().required("Vui lòng nhập email hoặc số điện thoại"),
    password: string().required("Vui lòng nhập mật khẩu"),
  });
  return (
    <div className="relative">
      <Image src={banner} w="100%" height="430px" fit="cover"></Image>
      <Box className="absolute top-[-64px]" boxSize="271px">
        <Image src={logo} w="100%"></Image>
      </Box>

      {role !== "Admin" && (
        <div className="absolute top-[90px] right-[20px] grid gap-[16px]">
          <Text color="p.white">ĐĂNG NHẬP NGAY</Text>
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validationSchema={signinSchema}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {() => (
              <Form>
                <Card p="7" borderRadius="none">
                  <Flex gap="4">
                    <Field name="userName" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.userName && form.touched.userName
                          }
                        >
                          <FormLabel
                            htmlFor="userName"
                            mb={1}
                            textStyle="formLabel"
                          >
                            Số điện thoại hoặc Email
                          </FormLabel>
                          <Input
                            {...field}
                            name="userName"
                            type="text"
                            placeholder="Nhập số điện thoại hoặc email"
                          ></Input>
                          <FormErrorMessage>
                            {form.errors.userName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, meta }) => (
                        <FormControl
                          isInvalid={!!(meta.error && meta.touched)}
                          isRequired
                        >
                          <FormLabel htmlFor="password" mb={1}>
                            Mật khẩu
                          </FormLabel>
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
                    <div>
                      <FormLabel
                        htmlFor="firstName"
                        mb={1}
                        textColor="transparent"
                      >
                        Đăng nhập
                      </FormLabel>
                      <Button colorScheme="primary" type="submit">
                        Đăng nhập
                      </Button>
                    </div>
                  </Flex>
                </Card>
              </Form>
            )}
          </Formik>
          <Text
            cursor="pointer"
            color="p.white"
            fontSize="18px"
            lineHeight="21px"
            fontWeight="400"
            textAlign="end"
            onClick={() => {
              navigate("/get-otp");
            }}
          >
            Quên mặt khẩu?
          </Text>
        </div>
      )}

      {role === "Admin" && (
        <div className="absolute top-[90px] right-[20px] flex gap-[16px] justify-center items-center">
          <div className="w-[600px]">
            <Text color="p.white">TÌM KIẾM NỘI DUNG</Text>
            <Formik
              initialValues={{
                userName: "",
                password: "",
              }}
              validationSchema={signinSchema}
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {() => (
                <Form>
                  <Card p="7" borderRadius="none">
                    <Flex gap="4">
                      <Field name="userName" validate={validateField}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.userName && form.touched.userName
                            }
                          >
                            <FormLabel
                              htmlFor="userName"
                              mb={1}
                              textStyle="formLabel"
                            >
                              Nhập thông tin cần tìm
                            </FormLabel>
                            <Input
                              {...field}
                              name="userName"
                              type="text"
                              placeholder="Nhập số điện thoại hoặc email"
                            ></Input>
                            <FormErrorMessage>
                              {form.errors.userName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <div>
                        <FormLabel
                          htmlFor="firstName"
                          mb={1}
                          textColor="transparent"
                        >
                          Đăng nhập
                        </FormLabel>
                        <Button colorScheme="primary" type="submit">
                          Đăng nhập
                        </Button>
                      </div>
                    </Flex>
                  </Card>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col items-center gap-[8px]  ">
            <Text color="p.white">Xin chào bạn</Text>
            <Text color="p.white">{userNameLogin}</Text>
            <Image src={aqua} boxSize="102px" />
            <Button _hover="#FDBA4D" bgColor="#FDBA4D" onClick={() => logout()}>
              Đăng xuất
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
