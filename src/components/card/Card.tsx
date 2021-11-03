import { Card, Col, Image, Typography } from "antd";

import styles from "./card.module.css";

import MailOutlined from "@ant-design/icons/MailOutlined";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import GlobalOutlined from "@ant-design/icons/GlobalOutlined";

import HeartOutlined from "@ant-design/icons/HeartOutlined";
import HeartFilled from "@ant-design/icons/HeartFilled";
import EditOutlined from "@ant-design/icons/EditOutlined";
import EditFilled from "@ant-design/icons/EditFilled";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import DeleteFilled from "@ant-design/icons/DeleteFilled";
import { useState } from "react";

const data = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

export type user_data = typeof data;

interface props {
  data: user_data;
  deleteUser: Function;
  editUser: Function;
}

function Crd({ data, deleteUser, editUser }: props) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Col xs={24} md={8} lg={6}>
      <Card
        className={styles.card}
        cover={
          <Image
            src={`https://avatars.dicebear.com/v2/avataaars/${data.username}.svg?options[mood][]=happy`}
            preview={false}
            className={styles.image}
          />
        }
        actions={[
          liked ? (
            <HeartFilled
              onClick={toggleLike}
              style={{ color: "red", fontSize: 20 }}
            />
          ) : (
            <HeartOutlined
              onClick={toggleLike}
              style={{ color: "red", fontSize: 20 }}
            />
          ),
          <EditOutlined
            style={{ fontSize: 20 }}
            onClick={() => editUser(data)}
          />,
          <DeleteOutlined
            style={{ fontSize: 20 }}
            onClick={() => deleteUser(data.id)}
          />,
        ]}
      >
        <Typography.Title level={5}>{data.name}</Typography.Title>
        <Typography>
          <MailOutlined className={styles.icon} /> {data.email}
        </Typography>
        <Typography>
          <PhoneOutlined className={styles.icon} /> {data.phone}
        </Typography>
        <Typography>
          <GlobalOutlined className={styles.icon} /> website
        </Typography>
      </Card>
    </Col>
  );
}

export default Crd;
