import React from "react";
import { motion } from "framer-motion";
import { Flex, Textarea } from "@chakra-ui/react";
import { Box, Text, Heading } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { MdAutoFixHigh } from "react-icons/md";

export default function TaskItem({ data }) {
  return (
    <motion.div
      style={{
        background: "white",
        padding: "8px",
      }}
    >
      <Flex>
        <motion.span
          style={{
            color: data.isFinish ? "teal.400" : data.isDoing ? "tomato" : "orange",
          }}
        ></motion.span>
        <Heading as="h4" flexGrow="1">
          {data.content.title}
        </Heading>
        <Icon
          as={MdAutoFixHigh}
          opacity="0.3"
          transform="scale(0.8)"
          animate={{
            opacity: 1,
            color: "gray.600",
            transform: "scale(1)",
          }}
          color="gray.400"
          transition={{
            duration: 0.4,
          }}
        />
      </Flex>
      <Textarea value={data.content.text} placeholder="支持 Markdown 格式！写你所想🥳！" />
    </motion.div>
  );
}
