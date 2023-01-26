import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import PageTitle from "./Components/PageTitle";
import AppHeader from "./Components/AppHeader";
import AppContent from "./Components/AppContent";
import styles from "./styles/modules/app.module.scss";
import axios from "./utils/axios";
import { initialReminds } from "./static/static";
import moment from "moment";
import toast from "react-hot-toast";

function App() {
  // const [reminds, setReminds] = useState(null);

  const [reminds, setReminds] = useState([]);
  const [filteredReminds, setFilteredReminds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(20);

  const getAllReminds = async (cursor, limit) => {
    console.log("getAllReminds");
    // let limitIter = 0;
    try {
      await axios
        .get(`/remind`, {
          params: {
            cursor: cursor,
            limit: limit,
          },
        })
        .then((result) => {
          setFilteredReminds(result.data);
        });
      // ! delete

      // setFilteredReminds([
      //   ...filteredReminds,
      //   ...initialReminds.filter((remind) => {
      //     if (remind.id > cursor && limitIter < limit) {
      //       limitIter++;

      //       return true;
      //     }

      //     return false;
      //   }),
      // ]);

      //! delete
    } catch (error) {
      console.log(error);
    }
    // setCursor((prev) => {
    //   return prev + 5;
    // });
  };

  useEffect(() => {
    getAllReminds(cursor, limit);
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []); //[] only fires one time when the compent loads

  const createRemind = async (data) => {
    console.log("createRemind");
    console.log(data);
    try {
      await axios.post("/remind", data).then((res) => console.log(res));
      getAllReminds(cursor, limit);

      //!remove
      // setFilteredReminds((prev) => [data, ...prev]);
      //!remove
      toast.success("Remind Added Successfully");
    } catch (error) {
      toast.error("Failed To Add Remind");
      console.log(error);
    }
  };

  const updateRemind = async (data) => {
    console.log("update remind");
    console.log(data);
    try {
      await axios.put(`/remind/${data.id}`, data);
      //!delete
      setFilteredReminds(
        (prev) =>
          prev.map((remind) => {
            if (remind.id === data.id) {
              return { ...remind, ...data };
            }
            return remind;
          })
        // reminds.map((remind) => {
        //   if (remind.id === data.id) {
        //     return { ...remind, ...data };
        //   }
        //   return remind;
        // })
      );
      //!delete
      toast.success("Successfully changed");
    } catch (error) {
      toast.error("No Changes Made");

      console.log(error);
    }
  };

  const getCompletedReminds = async (cursor = 0, limit = 10) => {
    console.log("getCompletedReminds");

    try {
      await axios
        .get(`/completed?cursor=${cursor}&limit=${limit}`)
        .then((result) => {
          console.log(result);
          setFilteredReminds(result.data);
        });
      // ! delete
      // setFilteredReminds(reminds.filter((remind) => remind.completed === true));
      // ! delete
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentReminds = async (cursor = 0, limit = 10) => {
    console.log("getCurrentReminds");
    try {
      await axios
        .get(`/current?cursor=${cursor}&limit=${limit}`)
        .then((result) => {
          console.log(result);
          setFilteredReminds(result.data);
        });
      // ! delete
      // setFilteredReminds(
      //   reminds.filter((remind) => remind.completed === false)
      // );
      // ! delete
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRemind = async (id) => {
    console.log(`deleted remind with id ${id} from App.js`);
    try {
      await axios.delete(`/remind/${id}`).then((res) => console.log(res));
      setFilteredReminds(filteredReminds.filter((remind) => remind.id !== id)); //!remove
    } catch (error) {
      console.log(error);
    }
  };

  const onSortReminds = (type) => {
    switch (type) {
      case "deadline":
        setFilteredReminds(
          filteredReminds
            .slice()
            .sort(
              (a, b) =>
                moment(a.deadline_at, "YYYY-DD-MM").unix() -
                moment(b.deadline_at, "YYYY-DD-MM").unix()
            )
        );
        break;
      case "created":
        setFilteredReminds(
          filteredReminds
            .slice()
            .sort(
              (a, b) =>
                moment(a.created_at, "YYYY-DD-MM").unix() -
                moment(b.created_at, "YYYY-DD-MM").unix()
            )
        );
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.bg_container}>
      <div className="container">
        <PageTitle>Reminder GO</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader
            filter={filter}
            setFilter={setFilter}
            onCreate={createRemind}
            onGetAll={getAllReminds}
            onGetCompleted={getCompletedReminds}
            onGetCurrent={getCurrentReminds}
            onSort={onSortReminds}
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
    </div>
  );
}

export default App;
