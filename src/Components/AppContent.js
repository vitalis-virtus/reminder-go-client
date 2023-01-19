import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RemindItem from "./RemindItem";
import styles from "../styles/modules/app.module.scss";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent({ reminds, onUpdateRemind, onDeleteRemind }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={styles.content__wrapper}
    >
      <AnimatePresence>
        {reminds.length ? (
          reminds.map((remind) => (
            <RemindItem
              remind={remind}
              key={remind.id}
              onUpdateRemind={onUpdateRemind}
              onDeleteRemind={onDeleteRemind}
            />
          ))
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            No Todo Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
