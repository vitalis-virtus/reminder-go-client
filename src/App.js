import React, { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import PageTitle from "./Components/PageTitle";
import AppHeader from "./Components/AppHeader";
import AppContent from "./Components/AppContent";
import styles from "./styles/modules/app.module.scss";
// import axios from "./utils/axios";

const initialReminds = [
  {
    id: "1",
    description: "test1",
    created_at: "2023-01-01",
    deadline_at: "2023-01-30",
    finished_at: "2023-01-02",
    completed: true,
  },
  {
    id: "2",
    description: "test2",
    created_at: "2023-02-01",
    deadline_at: "2023-02-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "3",
    description: "test3",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "4",
    description: "test4",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "5",
    description: "test5",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "6",
    description: "test6",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
];

function App() {
  // const [reminds, setReminds] = useState(null);

  const [testReminds, setTestReminds] = useState(initialReminds);
  const [filteredReminds, setFilteredReminds] = useState(testReminds);

  const getAllReminds = (cursor = 1, limit = 10) => {
    console.log("getAllReminds");
    try {
      // await axios
      // .get("/remind", { params: { cursor, limit } })
      // .then((result) => setReminds(result.data));
      // ! delete
      setFilteredReminds(testReminds);
      //! delete
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFilteredReminds(testReminds);
  }, [testReminds]);

  useEffect(() => {
    getAllReminds();
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []); //[] only fires one time when the compent loads

  const createRemind = async (data) => {
    console.log("createRemind");
    console.log(data);

    try {
      // await axios.post("/remind", data);
      //!remove
      setTestReminds([...testReminds, data]);
      //!remove
    } catch (error) {
      console.log(error);
    }
  };

  const updateRemind = async (data) => {
    console.log("update remind");
    try {
      // await axios.put("/remind", data);
      //!delete
      setTestReminds(
        testReminds.map((remind) => {
          if (remind.id === data.id) {
            return { ...remind, ...data };
          }
          return remind;
        })
      );
      //!delete
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedReminds = async (cursor = 1, limit = 10) => {
    console.log("getCompletedReminds");

    try {
      // await axios
      // .get("/completed", { params: { cursor, limit } })
      // .then((result) => setReminds(result.data));
      // ! delete
      setFilteredReminds(
        testReminds.filter((remind) => remind.completed === true)
      );
      // ! delete
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentReminds = async (cursor = 1, limit = 10) => {
    console.log("getCurrentReminds");
    try {
      // await axios
      // .get("/current", { params: { cursor, limit } })
      // .then((result) => setReminds(result.data));
      // ! delete
      setFilteredReminds(
        testReminds.filter((remind) => remind.completed === false)
      );
      // ! delete
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRemind = async (id) => {
    console.log(`deleted remind with id ${id} from App.js`);
    try {
      setTestReminds(testReminds.filter((remind) => remind.id !== id)); //!remove
      // await axios.delete(`/remind/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <PageTitle>Reminder GO</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader
            onCreate={createRemind}
            onGetAll={getAllReminds}
            onGetCompleted={getCompletedReminds}
            onGetCurrent={getCurrentReminds}
          />
          <AppContent
            reminds={filteredReminds}
            onUpdateRemind={updateRemind}
            onDeleteRemind={deleteRemind}
          />
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
