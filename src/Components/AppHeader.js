/* eslint-disable no-fallthrough */
import React, { useEffect, useState } from "react";
import styles from "../styles/modules/app.module.scss";
import Button, { SelectButton } from "./Button";
import RemindModal from "./RemindModal";

function AppHeader({
  onCreate,
  onGetAll,
  onGetCompleted,
  onGetCurrent,
  onSortReminds,
  onSort,
  filter,
  setFilter,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [filter, setFilter] = useState(null);

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

      <div className={styles.header_button}>
        {filter === "completed" && (
          <SelectButton>
            <option value="today" key="today">
              Today
            </option>
            <option value="lastWeek" key="lastWeek">
              Last week
            </option>

            <option value="lastMonth" key="lastMonth">
              Last month
            </option>
          </SelectButton>
        )}

        {filter === "current" && (
          <div>
            {/* <p>Sort by</p> */}
            <SelectButton
              id="filter"
              onChange={(e) => {
                onSort(e.target.value);
              }}
            >
              <option value="created" key="created">
                Created
              </option>
              <option value="deadline" key="deadline">
                Deadline
              </option>
            </SelectButton>
          </div>
        )}

        <SelectButton id="status" onChange={updatedFilter}>
          <option key="all" value="all">
            All
          </option>
          <option key="completed" value="completed">
            Completed
          </option>
          <option key="current" value="current">
            Current
          </option>
        </SelectButton>
      </div>

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
