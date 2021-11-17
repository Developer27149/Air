import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function AllTasks() {
  const workState = useSelector((state) => state.works);

  return (
    <motion.div>
      <p>AllTasks</p>
    </motion.div>
  );
}
