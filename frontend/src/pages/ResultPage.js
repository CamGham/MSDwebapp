import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import DataTable from "../components/DataTable";
import {firestore} from "../firebase/firestore";

import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";



const ResultPage = () => {
    let current = 0;
    const email = useSelector(getEmail);
    const [angleData, setAngleData] = useState([]);



    const getData = async () => {
      try {
        // let exists = false;

        const dataQuery = query(collection(firestore, "shots"), where("email", "==", email));
const querySnapshot = await getDocs(dataQuery);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  let data = doc.data();
  // setAngleData(doc.data());
  setAngleData((prev) => [...prev, data]);
});




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
  

    useEffect(()=>{
      (async ()=>{
        await getData();
    })();
     
    },[])
  return (
    <div>
      <TopNav current={current}/>
      <DataTable data={angleData}/>
    </div>
  );
};

export default ResultPage;
