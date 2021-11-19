import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/modal";
import { Textarea, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Shortuuid from "shortuuid";
import { Input } from "@chakra-ui/react";

export default function AddTask({ addTask, onClose, isOpen }) {
  const [task, setTask] = useState({
    content: {
      title: "",
      text: "",
    },
    isFixed: false,
    comments: [],
    create_at: new Date().getTime(),
    deadline: new Date().getTime() + 1000 * 60 * 60 * 24,
    id: new Shortuuid().uuid(),
    needNotice: false,
    status: "init",
  });
  const handleSave = () => {
    addTask(task);
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加新的任务卡</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input placeholder="安排上！⛽️" variant="unstyled" m="0.5rem" maxLength="10" />
            <Textarea
              minH="4rem"
              fontSize="12px"
              variant="unstyled"
              placeholder="我打算在这个美好的下午..."
              value={task.content.text}
              onChange={(e) =>
                setTask({
                  ...task,
                  content: {
                    title: task.content.title,
                    text: e.target.value,
                  },
                })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              保存
            </Button>
            <Button onClick={onClose}>算了</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
