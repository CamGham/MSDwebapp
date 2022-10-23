import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import DGrid from "../components/DGrid";
import { firestore } from "../firebase/firestore";

import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import AnalysisView from "../components/AnalysisView";

const ResultPage = () => {
  let current = 0;
  const email = useSelector(getEmail);
  const [angleData, setAngleData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState([]);

  const getData = async () => {
    try {
      // let exists = false;

      const dataQuery = query(
        collection(firestore, "shots"),
        where("email", "==", email), orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let data = doc.data();
        // setAngleData(doc.data());
        setAngleData((prev) => [...prev, data]);
      });

      // angleData.sort((a, b) => a.date.seconds - b.date.seconds);

      // const docRef = doc(firestore, "users", values.email);
      // const querySnapShot = await getDoc(docRef);

      // if (querySnapShot.exists()) {
      //   exists = true;
      // }
      // return exists;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);


  useEffect(() => {
    console.log("current state of modal showing is: " + showModal);

  }, [showModal]);


  return (
    <div className="resultsCont">
      {/* setShowModal={setShowModal} show={showModal} */}
      <AnalysisView data={angleData} setShowModal={setShowModal} visible={showModal}/>
      <TopNav current={current} />
      <DGrid data={angleData} setSelectedRow={setSelectedRow}/>
    </div>
  );
};

export default ResultPage;
