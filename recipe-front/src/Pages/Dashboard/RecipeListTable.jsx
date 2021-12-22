import React, { Component } from "react";
import { useEffect } from "react";
import axios from "axios";
import { message, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useUserContext } from "../../Context/UserContext";

const RecipeListTable = (props) => {
  const { getUserId } = useUserContext();

  const [recipes, setRecipes] = React.useState([]);
  const [u_id] = React.useState(getUserId());
  console.log(u_id);

  useEffect(() => {
    axios.get(`/recipes/${u_id}`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const handleDelete = (_id) => {
    console.log("handle Delete", _id);

    axios.delete(`/delete-recipe/${_id}`).then((res) => {
      res.data.type
        ? message.info(res.data.message)
        : message.error("Error in deleting record");
    });
    window.location.reload();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      render: (record) => (
        <div>
          <Popconfirm
            title="Are you sure to delete this recor?"
            onConfirm={() => {
              handleDelete(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="me-2" />
          </Popconfirm>
          <EditOutlined />
        </div>
      ),
      key: "action",
    },
  ];
  return (
    <React.Fragment>
      <Table dataSource={recipes} columns={columns} />;
    </React.Fragment>
  );
};

export default RecipeListTable;
