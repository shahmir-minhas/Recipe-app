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
    // console.log('e ',e.image.file.originFileObj);
    const formData = addNewRecipe.getFieldsValue();
    // console.log(formData);
    // formData.append(e.image.file.originFileObj);
    console.log("form Data", formData);
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
    var data = new FormData();
    const image = addNewRecipe.getFieldValue('image');
    // console.log(e.image[0].originFileObj);
    // formData.append("image", values.image[0].originFileObj);
    // formData.append("title", values.title);
    // formData.append("body", textbody);
    console.log(image.file.originFileObj);
    data.append('image', image.file.originFileObj);
    

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
          <Form.Item
            label="Image Upload"
            name="image"
            rules={[
              {
                required: true,
                message: "Please upload image!",
              },
            ]}
          >
            <Upload customRequest={handleUpload} name="image">
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
