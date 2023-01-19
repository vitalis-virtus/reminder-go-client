/* eslint-disable no-fallthrough */
import React, { useEffect, useState } from "react";
import styles from "../styles/modules/app.module.scss";
import Button, { SelectButton } from "./Button";
import RemindModal from "./RemindModal";

function AppHeader({
  remind,
  onCreate,
  onGetAll,
  onGetCompleted,
  onGetCurrent,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);

  const updatedFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  useEffect(() => {
    switch (filter) {
      case "all":
        onGetAll();
        break;
      case "completed":
        onGetCompleted();
        break;
      case "current":
        onGetCurrent();

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Remind
      </Button>

      <SelectButton id="status" onChange={updatedFilter}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="current">Current</option>
      </SelectButton>
      <RemindModal
        type="add"
        onCreate={onCreate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default AppHeader;
