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
import React, { useEffect, useState } from "react";
import { Input, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import DateChoose from "Components/DateChoose";
import { uuid } from "Utils/index.js";

const initTask = (status) => {
  return {
    content: {
      title: "",
      text: "",
    },
    isFixed: false,
    comments: [],
    deadline: "",
    needNotice: false,
    importantLevel: [],
    id: uuid(),
    create_at: new Date().getTime(),
    status,
  };
};

export default function AddTask({ addTask, status, onClose, isOpen }) {
  const [task, setTask] = useState(initTask(status));
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [isSaveBtnDisable, setIsDisableSaveBtn] = useState(true);

  useEffect(() => {
    setIsDisableSaveBtn(title.length === 0 || text.length === 0);
  }, [title, text]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleSave = () => {
    addTask({
      ...task,
      content: {
        title,
        text,
      },
    });
    // reset task
    setTask(initTask(status));
    setTitle("");
    setText("");
    onClose();
  };

  const handleNotice = (e) => {
    const isNeedNotice = e.target.checked;
    setTask((i) => ({
      ...i,
      needNotice: isNeedNotice,
    }));
  };

  const handleChangeImportantLevel = (e, info) => {
    const isChecked = e.target.checked;
    setTask((t) => {
      let oldLevelArr = t.importantLevel;
      if (isChecked && !t.importantLevel.includes(info)) {
        oldLevelArr.push(info);
      } else if (!isChecked && t.importantLevel.includes(info)) {
        oldLevelArr = oldLevelArr.filter((i) => i !== info);
      }
      return {
        ...t,
        importantLevel: oldLevelArr,
      };
    });
  };

  const handleChangeContent = (type) => (e) => {
    const v = e.target.value;
    if (type === "title") {
      setTitle(v);
    } else if (type === "text") {
      setText(v);
    }
  };

  const handleChangeTitle = handleChangeContent("title");
  const handleChangeText = handleChangeContent("text");

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加新的任务卡</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="标题⛽️"
              variant="unstyled"
              maxLength="10"
              value={title}
              onChange={handleChangeTitle}
            />
            <Textarea
              minH="4rem"
              fontSize="12px"
              variant="unstyled"
              placeholder="我打算在这个美好的下午..."
              value={text}
              onChange={handleChangeText}
            />
            {/* 状态 - 到期时间 - 是否需要提醒 -  */}
            <CheckboxGroup>
              <Checkbox
                size="md"
                color="blue.500"
                mr="1rem"
                onChange={() => setShowDatePicker(!showDatePicker)}
              >
                到期时间
              </Checkbox>
              <Checkbox size="md" color="blue.500" mr="1rem" onChange={handleNotice}>
                提醒我
              </Checkbox>
              <Checkbox
                size="md"
                color="blue.500"
                mr="1rem"
                onChange={(e) => handleChangeImportantLevel(e, "urgent")}
              >
                紧急
              </Checkbox>
              <Checkbox
                size="md"
                color="blue.500"
                mr="1rem"
                onChange={(e) => handleChangeImportantLevel(e, "important")}
              >
                重要
              </Checkbox>
            </CheckboxGroup>
            {/* 日期选择器 */}
            {showDatePicker ? (
              <DateChoose
                uploadDeallineData={(v) => {
                  if (v instanceof Date) {
                    // 隐藏日期选择器
                    setShowDatePicker(false);
                    // 更新数据
                    setTask({
                      ...task,
                      deadline: v.getTime(),
                    });
                  }
                }}
              />
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              disabled={isSaveBtnDisable}
              size="sm"
            >
              保存
            </Button>
            <Button onClick={onClose} size="sm">
              算了
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
