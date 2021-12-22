import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";

const AddNewRecipe = () => {
  const { getUserId, getUser } = useUserContext();
  const [addNewRecipe] = Form.useForm();

  const onFinish = () => {
    const formData = addNewRecipe.getFieldsValue();
    axios
      .post("/create-recipe", formData)
      .then((res) => {
        res.data.type
          ? message.info(res.data.message)
          : message.error(res.data.message);
        addNewRecipe.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <React.Fragment>
      <div className="recipe-form-wrapper">
        <Form
          name="newRecipe"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={addNewRecipe}
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="userId"
                name="userId"
                initialValue={getUserId()}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="author"
                name="author"
                initialValue={getUser()}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Recipe Name"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your recipe name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ingredients"
                name="ingredients"
                rules={[
                  {
                    required: true,
                    message: "Please input ingredients",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Time Required for Cooking"
                name="totalTimeReq"
                rules={[
                  {
                    required: true,
                    message: "Please input time required for cooking!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Total Cost"
                name="totalCost"
                rules={[
                  {
                    required: true,
                    message: "Please input cost for recipe!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Discription"
            name="content"
            rules={[
              {
                required: true,
                message:
                  "Please input discription with steps and full dettail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="text-start">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddNewRecipe;
