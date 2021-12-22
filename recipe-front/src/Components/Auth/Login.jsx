import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
const LogIn = () => {
  // Modal Handling
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  //form instance
  const [form] = Form.useForm();
  //User context destructure
  const { login } = useUserContext();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Form Handling
  const onFinish = () => {
    const data = form.getFieldValue();
    axios
      .post("/login", data)
      .then((response) => {
        if (response.data.type) {
          message.info(response.data.message);
          login({
            user: response.data.userName,
            token: response.data.token,
            userId: response.data.userId,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setIsModalVisible(false);
  };

  return (
    <React.StrictMode>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="login"
          form={form}
          onFinish={onFinish}
          //   onFieldsChange={onFieldChange}
          autoComplete="off"
          layout="vertical"
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your passwrod!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="text-end">
            <Button onClick={handleCancel} className="me-1 btn-cancel">
              cancel
            </Button>
            <Button onClick={onFinish} className="btn-login">
              Login
            </Button>
          </div>
        </Form>
      </Modal>

      <Button onClick={showModal}>Login</Button>
    </React.StrictMode>
  );
};

export default LogIn;
