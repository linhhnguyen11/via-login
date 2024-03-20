import {
  Image,
  Text,
  Grid,
  GridItem,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/react";
import logo from "../assets/via-logo.png";
import checkbct from "../assets/bct.png";
import qrcode from "../assets/qrcode.jfif";
import dowloadFrom from "../assets/pngegg.png";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-via-color text-white">
      <div
        className="box-border flex  items-baseline w-full text-left   py-[48px] px-[80px]
    "
      >
        <div className="w-2/5 pr-[15%]">
          <Image w="160px" h="52px" objectFit="cover" src={logo} />
          <Text fontSize="13px" lineHeight="18px" fontWeight="600">
            CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN ỨNG DỤNG THÔNG MINH VIỆT
          </Text>

          <Text fontWeight="400" fontSize="13px" lineHeight="18px">
            Mã số thuế: 0106494214
          </Text>
          <Text fontWeight="400" fontSize="13px" lineHeight="18px">
            Ngày hoạt động: 27/03/2014
          </Text>
          <Text fontWeight="400" fontSize="13px" lineHeight="18px">
            Sở kế hoạch và đầu tư thành phố Hà Nội
          </Text>
          <Flex gap="16px" mt={2}>
            <a className="rounded-full border border-white p-[3px] flex w-[30px] h-[30px] items-center justify-center">
              <Icon as={FaFacebookF} />
            </a>
            <a className="rounded-full border border-white p-[3px] flex w-[30px] h-[30px] items-center justify-center">
              <Icon as={CiInstagram} />
            </a>
            <a className="rounded-full border border-white p-[3px] flex w-[30px] h-[30px] items-center justify-center">
              <Icon as={FaTiktok} />
            </a>
            <a className="rounded-full border border-white p-[3px] flex w-[30px] h-[30px] items-center justify-center">
              <Icon as={FaYoutube} />
            </a>
            <a className="rounded-full border border-white p-[3px] flex w-[30px] h-[30px] items-center justify-center">
              <Icon as={FaFacebookF} />
            </a>
          </Flex>
        </div>

        <div className="w-2/5">
          <Text fontWeight="600" fontSize="13px" lineHeight="18px" mb="16px">
            LIÊN HỆ
          </Text>
          <div className="flex mt-[8px] gap-[8px]">
            <Icon as={MdOutlineEmail} />
            <Text fontWeight="600" fontSize="13px" lineHeight="18px">
              contact@viajs.com
            </Text>
          </div>
          <div className="flex mt-[8px] gap-[8px] ">
            <Icon as={FaPhoneAlt} />
            <Text fontWeight="600" fontSize="13px" lineHeight="18px">
              1900 1999
            </Text>
          </div>
          <div className="flex mt-[8px] gap-[8px]">
            <Icon as={FaLocationDot} />
            <Text fontWeight="600" fontSize="13px" lineHeight="18px">
              16, Ngõ 205, Trần Duy Hưng, Trung Hoà, Cầu Giấy, HN
            </Text>
          </div>
          <Image w="90px" mt="8px" objectFit="contain" src={checkbct} />
        </div>
        <div className="w-1/5">
          <Text>TẢI ỨNG DỤNG</Text>
          <Grid
            h="100px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={2}>
              <Image w="90px" mt="8px" objectFit="contain" src={qrcode} />{" "}
            </GridItem>
            <GridItem colSpan={2} rowSpan={2}>
              <Image
                boxSize="90px"
                mt="8px"
                objectFit="fill"
                src={dowloadFrom}
              />{" "}
            </GridItem>
          </Grid>
        </div>
      </div>
      <div className="text-center pb-[16px]">
        <Text fontWeight="600" fontSize="13px" lineHeight="18px">
          CHÍNH SÁCH BẢO MẬT
        </Text>
        <Text fontWeight="400" fontSize="13px" lineHeight="18px">
          Copyright © 2021 VIA JSC. All rights reserved.
        </Text>
      </div>
    </div>
  );
}

export default Footer;
