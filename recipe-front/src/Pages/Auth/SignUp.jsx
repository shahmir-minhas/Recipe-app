import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import axios from "axios";

const SignUp = () => {
  // Modal Handling
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  //form instance
  const [form] = Form.useForm();

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
      .post("/sign-up", data)
      .then((response) =>
        response.data.type
          ? message.info(response.data.message)
          : message.error(response.data.message)
      )
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setIsModalVisible(false);
  };

  return (
    <React.StrictMode>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="signUp"
          form={form}
          onFinish={onFinish}
          //   onFieldsChange={onFieldChange}
          autoComplete="off"
          layout="vertical"
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
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
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
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
            <Button onClick={handleCancel} className="me-2">Cancel</Button>
            <Button onClick={onFinish}>Sign Up</Button>
          </div>
        </Form>
      </Modal>

      <Button onClick={showModal}>Sign Up</Button>
    </React.StrictMode>
  );
};

export default SignUp;
