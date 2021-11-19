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

export default function AddComment({ addComment, onClose, isOpen }) {
  const [newComment, setNewComment] = useState("");
  const handleSave = () => {
    addComment(newComment);
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加新的评论</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              minH="4rem"
              fontSize="12px"
              variant="unstyled"
              placeholder="这件事我觉得不太靠谱"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
