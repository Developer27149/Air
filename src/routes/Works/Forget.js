import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Forget() {
  const workState = useSelector((state) => state.works);

  return (
    <motion.div>
      <p>Forget</p>
    </motion.div>
  );
}
