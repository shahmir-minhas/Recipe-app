import React, { Component } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
import { UploadOutlined } from "@ant-design/icons";

const AddNewRecipe = () => {
  // useStates
  const { getUserId, getUser } = useUserContext();
  const [addNewRecipe] = Form.useForm();
  // Form handling
  const onFinish = (e) => {
    console.log(e);
    // console.log("e ", e.image.file.originFileObj);
    // const formData = addNewRecipe.getFieldsValue();
    var formData = new FormData();
    formData.append("title", e.title);
    formData.append("content", e.content);
    formData.append("ingredients", e.ingredients);
    formData.append("totalCost", e.totalCost);
    formData.append("totalTimeReq", e.totalTimeReq);
    formData.append("userId", e.userId);
    formData.append("image", e.image.file.name);
    formData.append("file", e.image.file.originFileObj);
    console.log("file", formData.get("file"));
    console.log("image", formData.get("image"));

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
  //handling
  const handleUpload = (e) => {
    console.log("filed value", e);

    // axios.post("/image-upload", e.file).then((res) => {
    //   console.log(res);
    // });
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
          <Form.Item label="Image" name="image">
            <Upload
              customRequest={handleUpload}
              name="image"
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
