import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import DGrid from "../components/DGrid";
import { firestore } from "../firebase/firestore";
import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import AnalysisView from "../components/AnalysisView";
import { Button } from "@mui/material";

const ResultPage = () => {
  let current = 0;
  const email = useSelector(getEmail);
  const [angleData, setAngleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const getData = async () => {
    try {
      const dataQuery = query(
        collection(firestore, "shots"),
        where("email", "==", email),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        setAngleData((prev) => [...prev, data]);
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

  const analyse = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="resultsCont">
      <AnalysisView
        data={selectedRow}
        setShowModal={setShowModal}
        visible={showModal}
      />
      <TopNav current={current} />
      <DGrid data={angleData} setSelectedRow={setSelectedRow} />
      {angleData.length > 0 && (
        <div className="buttonContainer">
          <div className="analyse">
            <Button
              className="analyseButton"
              onClick={analyse}
              variant="outlined"
            >
              Analyse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
