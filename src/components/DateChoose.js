import { Button } from "@chakra-ui/button";
import { Input, InputLeftAddon } from "@chakra-ui/input";
import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { InputGroup } from "@chakra-ui/react";
import { getCurMonthDays } from "Utils/index.js";

export default function DateChoose({ uploadDeallineData }) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [dateErr, setDateErr] = useState(null);
  const [hourErr, setHourErr] = useState(null);
  const [MinuteErr, setMinuteErr] = useState(null);
  const [isBtnDisable, setIsBtnDisable] = useState(true);

  useEffect(() => {
    setIsBtnDisable(
      [dateErr, MinuteErr, hourErr].some((i) => i !== null) ||
        [date, hour, minute].some((i) => i.length === 0)
    );
  }, [dateErr, MinuteErr, hourErr, date, hour, minute]);

  const handleChangeInputV = (setDataFunc, cb) => (e) => {
    setDataFunc(e.target.value);
    cb && cb();
  };
  const handleChangeDate = handleChangeInputV(setDate);
  const handleChangeHour = handleChangeInputV(setHour);
  const handleChangeMin = handleChangeInputV(setMinute);

  const handleConfirm = () => {
    if (isBtnDisable === false) {
      const deallineTime = new Date(`${date} ${hour}:${minute}`);
      uploadDeallineData(deallineTime);
    }
  };
  const handleDateBlur = () => {
    // check date
    if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      const [year, month, day] = [...date.split("/")];
      const tempDate = new Date();
      const curYear = tempDate.getFullYear();
      if (year < curYear) {
        setDateErr("过去的就让他过去吧，年份太老了");
      } else if (month > 12 || month === "00") {
        setDateErr("月份错误");
      } else if (day > getCurMonthDays(tempDate) || day === "00") {
        setDateErr("日期错误");
      } else {
        setDateErr(null);
      }
    } else {
      setDateErr("日期格式错误，请参考如下格式： 2021/11/11");
    }
  };
  const handleHourBlur = () => {
    // check time
    if (!/^\d{1,2}$/.test(hour) || hour >= 24) {
      setHourErr("小时仅支持：0 ~ 24");
    } else {
      setHourErr(null);
    }
  };

  const handleMinuteBlur = () => {
    if (!/^\d{1,2}$/.test(minute) || minute >= 60) {
      setMinuteErr("分钟仅支持 0 ~ 59");
    } else {
      setMinuteErr(null);
    }
  };
  const setDateBeforeTomorrow = (_hour, _minute) => {
    const tempDate = new Date();
    setDate(tempDate.toLocaleDateString());
    // setHour and setMinute
    setHour("23");
    setMinute("59");
  };

  const setTimeBefore2Hours = () => {
    const tempDate = new Date();
    const resultTime = tempDate.getTime() + 1000 * 60 * 60 * 2;
    const resultDate = new Date(resultTime);
    setDate(resultDate.toLocaleDateString());
    setHour(resultDate.getHours());
    setMinute(resultDate.getMinutes());
  };

  const setDateBeforeNextMonth = () => {
    const [year, month] = new Date().toLocaleDateString().split("/");
    if (month < 9) {
      setDate(`${year}/0${month + 1}/01`);
    } else if (month === 12) {
      setDate(`${year + 1}/01/01`);
    } else {
      setDate(`${year}/${~~month + 1}/01`);
    }
    // set minute and hour
    setHour("00");
    setMinute("00");
  };

  return (
    <Box>
      <Flex
        style={{
          gap: 4,
        }}
        justify="flex-end"
        m="0.5rem 0"
      >
        <Badge fontSize="12px" cursor="pointer" colorScheme="green" onClick={setTimeBefore2Hours}>
          两小时内
        </Badge>
        <Badge fontSize="12px" cursor="pointer" colorScheme="red" onClick={setDateBeforeTomorrow}>
          今天完成
        </Badge>
        <Badge
          fontSize="12px"
          cursor="pointer"
          colorScheme="purple"
          onClick={setDateBeforeNextMonth}
        >
          月底
        </Badge>
      </Flex>
      <Stack spacing={4} mt="0.8rem">
        <InputGroup size="sm">
          <InputLeftAddon children="日期" />
          <Input
            placeholder="YYYY/MM/DD"
            value={date}
            onChange={handleChangeDate}
            onBlur={handleDateBlur}
            minW="45%"
            borderColor={dateErr ? "red.300" : "gray.200"}
          />
          <Box w="1rem" h="0.5rem"></Box>
          <Input
            placeholder="HH"
            value={hour}
            onChange={handleChangeHour}
            onBlur={handleHourBlur}
            borderColor={hourErr ? "red.300" : "gray.200"}
          />
          <Box fontSize="1.2rem" p="0 4px">
            :
          </Box>
          <Input
            value={minute}
            placeholder="MM"
            onChange={handleChangeMin}
            onBlur={handleMinuteBlur}
            borderColor={MinuteErr ? "red.300" : "gray.200"}
          />
        </InputGroup>
      </Stack>
      <Button
        onClick={handleConfirm}
        size="sm"
        mt="6px"
        colorScheme="telegram"
        disabled={isBtnDisable}
      >
        确定
      </Button>
      {[dateErr, hourErr, MinuteErr].some((i) => i !== null) ? (
        <Text color="red.500" fontSize="12px" p="1rem 2px">
          {[dateErr, hourErr, MinuteErr].find((i) => i !== null)}
        </Text>
      ) : null}
    </Box>
  );
}
