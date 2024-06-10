import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useFetchCryptoNewsMutation } from "../services/cryptoNewsAPi";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState("CryptoCurrency");
  const count = simplified ? 6 : 100;
  const [fetchCryptoNews, { data: cryptoNews }] = useFetchCryptoNewsMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCryptoNews({
          max_results: count,
          region: "wt-wt",
          text: newsCategory,
        }).unwrap();
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [count, newsCategory, fetchCryptoNews]);

  if (!cryptoNews?.news && !data) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showsearch="true"
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.news.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img src={news?.image || demoImage} alt="news" />
              </div>
              <p>
                {news.body > 100
                  ? `${news.body.substring(0, 100)}...`
                  : news.body}
              </p>
              <div className="provider-conatiner">
                <div>
                  <Avatar src={news?.source || demoImage} alt="" />
                  <Text className="provider-name">{news.source}</Text>
                </div>
                <Text>{moment(news.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
