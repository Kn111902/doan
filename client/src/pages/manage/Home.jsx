import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import productRest from "../../api/ProductRest";
import LineChart from "./LineChart ";
import billRest from "../../api/BillRest";

function Home() {
  const [label, setLaBel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataChartQty, setDataChartQty] = useState([]);
  const [dataChartRevenue, setDataChartRevenue] = useState([]);
  const [sumQty, setSumQty] = useState(0);
  const [sumRevenue, setSumRevenue] = useState(0);

  useEffect(() => {
    const getTopSelleing = async () => {
      try {
        const data = await billRest.getDataChart();
        console.log("🚀 ~ getTopSelleing ~ data:", data);
        let sum1 = 0;
        let sum2 = 0;
        data.forEach((c) => {
          setLaBel((prev) => [...prev, c.productName]);
          setDataChartQty((prev) => [...prev, c.count]);
          sum1 += c.count;
          setDataChartRevenue((prev) => [...prev, c.reverse]);
          sum2 += c.reverse;
        });
        setSumQty(sum1);
        setSumRevenue(sum2);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    getTopSelleing();
  }, []);
  const dataQty = {
    labels: label,
    datasets: [
      {
        label: "10 sản phẩm bán nhiều nhất. ",
        data: dataChartQty,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const dataRevenue = {
    labels: label,
    datasets: [
      {
        label: "Doanh thu  10 sản phẩm bán nhiều nhất. ",
        data: dataChartRevenue,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.sellers) {
    return (
      <div
        className="text-center align-middle flex flex-col justify-center"
        style={{ height: "60vh" }}
      >
        <h3 className="font-bold text-yellow-yody text-3xl">
          Bạn không có quyền truy cập trang này.
        </h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{ minHeight: "50vh" }}
        className="flex flex-col justify-center items-center text-center m-auto"
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }
  return (
    <div className="container m-auto">
      <Row>
        <Col span={12}>
          <LineChart data={dataQty} />
          <div className="text-center">Tổng số lượng bán : {sumQty}</div>
        </Col>
        <Col span={12}>
          <LineChart data={dataRevenue} />
          <div className="text-center">Tổng doanh thu: {sumRevenue}vnd</div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
