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

function RemindItem({ remind, onUpdateRemind, onDeleteRemind, key }) {
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
      // finished_at:
      //   remind.finished_at === "" ||
      //   remind.finished_at === null ||
      //   remind.finished_at === undefined
      //     ? moment(new Date()).format("YYYY-DD_MMTHH:MM:SS")
      //     : "",
      completed: !checked,
    });
  };

  return (
    <>
      <motion.div key={key} variants={child} className={styles.item}>
        <div className={styles.todoDetails} key={key}>
          <div className={styles.todoDescriptionBox}>
            <CheckButton checked={checked} handleCheck={handleCheck} />

            <p
              className={getClasses([
                styles.todoText,
                checked === true && styles["todoText--completed"],
              ])}
            >
              {remind.description}
            </p>
          </div>
          <div className={styles.texts}>
            <p className={styles.time}>
              created: {moment(remind.created_at).format("DD-MM-YYYY HH:MM:SS")}
            </p>

            <p className={styles.time}>
              deadline:{" "}
              {moment(remind.deadline_at).format("DD-MM-YYYY HH:MM:SS")}
            </p>

            <p className={styles.time}>
              {remind.completed &&
                moment(remind.finished_at).format("DD-MM-YYYY HH:MM:SS")}
            </p>
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
