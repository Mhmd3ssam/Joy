import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(async () => {
    let res = await fetch("http://localhost:3000/joy");
    let myData = await res.json();

    isLoading(false);
    setData(myData);

  });

  if (loading) {
    return <h1>loadaing..</h1>;
  }

  return (
    <div>
      {data.map((ele) => {
        const { name, postion } = ele;
        return (
          <div>
            <h5>My name is <span style={{color:"green"}}>{name}</span></h5>
            <h6>my postion is <span style={{color:"red"}}>{postion}</span></h6>
          </div>
        );
      })}
    </div>
  );
}

export default App;
