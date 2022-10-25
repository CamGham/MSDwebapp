import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "./HomePage.css";
import DataTable from "../components/DataTable";
import { firestore } from "../firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
  let current = 1;
  const email = useSelector(getEmail);
  const [angleData, setAngleData] = useState([]);
  const [userName, setUserName] = useState("User");

  const getData = async () => {
    try {
      console.log(email);
      const dataQuery = query(
        collection(firestore, "shots"),
        where("email", "==", email),
        orderBy("date", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let data = doc.data();
        setAngleData((prev) => [...prev, data]);
      });

      const nameQuery = query(
        collection(firestore, "users"),
        where("email", "==", email)
      );
      const nameSnapshot = await getDocs(nameQuery);
      nameSnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let name = doc.data().name;
        setUserName(name);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  return (
    <div>
      <TopNav current={current} />
      <div className="homeCont">
        <h2>Welcome {userName}!</h2>
        <h4>Here are the results of your most recent shots:</h4>
        <DataTable data={angleData} />
      </div>
    </div>
  );
};

export default HomePage;
