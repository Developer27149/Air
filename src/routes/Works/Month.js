import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Month() {
  const workState = useSelector((state) => state.works);

  return (
    <motion.div>
      <p>this month</p>
    </motion.div>
  );
}
