import { Col, Form, Input, Modal, Row, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card, { user_data } from "../../components/card/Card";

const Home = () => {
  const [users, setUsers] = useState<user_data[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers([...res?.data]);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  }, []);

  const [userData, setUserData] = useState<user_data>({} as user_data);

  const updateUserData = (data: user_data) => {
    setUserData({ ...data });
  };

  const handleNameChange = (val: string) => {
    setUserData({ ...userData, name: val });
  };
  const handleEmailChange = (val: string) => {
    setUserData({ ...userData, email: val });
  };
  const handlePhoneChange = (val: string) => {
    setUserData({ ...userData, phone: val });
  };
  const handleWebsiteChange = (val: string) => {
    setUserData({ ...userData, website: val });
  };

  const deleteUser = (id: number) => {
    setUsers([...users.filter((user) => user.id !== id)]);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (data: user_data) => {
    updateUserData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newUsers: user_data[] = users.map((item) => {
      if (item.id === userData.id) {
        return { ...userData };
      } else {
        return { ...item };
      }
    });

    setUsers([...newUsers]);

    setUserData({} as user_data);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {loading && (
        <Row>
          <Spin />
        </Row>
      )}

      {isModalVisible && (
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              name: userData.name,
              phone: userData.phone,
              email: userData.email,
              website: userData.website,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                onChange={(e) => handleNameChange(e.target.value)}
                value={userData.name}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email address!",
                  type: "email",
                },
              ]}
            >
              <Input
                value={userData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                value={userData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: "Please input your website!",
                },
              ]}
            >
              <Input
                value={userData.website}
                onChange={(e) => handleWebsiteChange(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Row>
        {users.map((item) => (
          <>
            <Card data={item} deleteUser={deleteUser} editUser={showModal} />
          </>
        ))}
      </Row>
    </>
  );
};

export default Home;
