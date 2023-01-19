import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getClasses } from "../utils/getClasses";
import styles from "../styles/modules/remindItem.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import CheckButton from "./CheckButton";
import RemindModal from "./RemindModal";
import toast from "react-hot-toast";
import * as moment from "moment";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function RemindItem({ remind, onUpdateRemind, onDeleteRemind }) {
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (remind.completed === "true" || remind.completed === true) {
      setChecked(true);
    } else if (remind.completed === "false" || remind.completed === false) {
      setChecked(false);
    }
  }, [remind]);

  const handleDelete = () => {
    onDeleteRemind(remind.id);
    toast.success("Todo Delete Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);

    onUpdateRemind({
      ...remind,
      finished_at:
        remind.finished_at === "" || remind.finished_at === null
          ? moment(new Date()).format("YYYY-MM-DD")
          : "",
      completed: !checked,
    });
  };

  return (
    <>
      <motion.div variants={child} className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                checked === true && styles["todoText--completed"],
              ])}
            >
              {remind.description}
            </p>
            <p className={styles.time}>created: {remind.created_at}</p>
            <p className={styles.time}>deadline: {remind.deadline_at}</p>
            {remind.finished_at !== "" && remind.finished_at !== null && (
              <p className={styles.time}>finished: {remind.finished_at}</p>
            )}
            {/* <p className={styles.time}>
              finished: {remind.finished_at ? remind.finished_at : "None"}
            </p> */}
          </div>
        </div>

        {/* actions */}
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            role="button"
            onKeyDown={handleDelete}
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            role="button"
            onKeyDown={handleUpdate}
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>

      <RemindModal
        type="update"
        remind={remind}
        onUpdate={onUpdateRemind}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default RemindItem;
