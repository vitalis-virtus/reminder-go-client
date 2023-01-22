import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import PageTitle from "./Components/PageTitle";
import AppHeader from "./Components/AppHeader";
import AppContent from "./Components/AppContent";
import styles from "./styles/modules/app.module.scss";
import axios from "./utils/axios";

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
  {
    id: "7",
    description: "test7",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "8",
    description: "test8",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "9",
    description: "test9",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
  {
    id: "10",
    description: "test10",
    created_at: "2023-03-01",
    deadline_at: "2023-03-30",
    finished_at: null,
    completed: false,
  },
];

function App() {
  // const [reminds, setReminds] = useState(null);

  const [testReminds, setTestReminds] = useState(initialReminds);
  const [filteredReminds, setFilteredReminds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(5);

  const getAllReminds = async (cursor, limit) => {
    console.log("getAllReminds");
    console.log("cursor: ", cursor, "limit: ", limit);
    let limitIter = 0;
    try {
      // await axios
      //   .get(`/remind?cursor=${cursor}&limit=${limit}`)
      //   .then((result) => {
      //     console.log(result);
      //     setFilteredReminds(result.data);
      //   });
      // ! delete

      setFilteredReminds([
        ...filteredReminds,
        ...initialReminds.filter((remind) => {
          if (remind.id > cursor && limitIter < limit) {
            console.log(remind);
            limitIter++;
            return true;
          }

          return false;
        }),
      ]);

      //! delete
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setFilteredReminds(testReminds);
  // }, [testReminds]);

  useEffect(() => {
    getAllReminds(cursor, limit);
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []); //[] only fires one time when the compent loads

  const createRemind = async (data) => {
    console.log("createRemind");
    console.log(data);

    try {
      // await axios.post("/remind", data).then((res) => console.log(res));
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

  const getCompletedReminds = async (cursor = 0, limit = 10) => {
    console.log("getCompletedReminds");

    try {
      // await axios
      //   .get(`/completed?cursor=${cursor}&limit=${limit}`)
      //   .then((result) => {
      //     console.log(result);
      //     setFilteredReminds(result.data);
      //   });
      // ! delete
      setFilteredReminds(
        testReminds.filter((remind) => remind.completed === true)
      );
      // ! delete
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentReminds = async (cursor = 0, limit = 10) => {
    console.log("getCurrentReminds");
    try {
      // await axios
      //   .get(`/current?cursor=${cursor}&limit=${limit}`)
      //   .then((result) => {
      //     console.log(result);
      //     setFilteredReminds(result.data);
      //   });
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
      // await axios.delete(`/remind/${id}`).then((res) => console.log(res));
      setTestReminds(testReminds.filter((remind) => remind.id !== id)); //!remove
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
            onGetAllreminds={getAllReminds}
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
