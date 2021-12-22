import React from "react";
import { Tabs } from "antd";
import { OrderedListOutlined, PlusCircleOutlined } from "@ant-design/icons";
import RecipeListTable from "./RecipeListTable";
import AddNewRecipe from "./AddNewRecipe";

const { TabPane } = Tabs;
const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Tabs
        defaultActiveKey="1"
        centered
        className="ant-tabs-custom"
        tabPosition="left"
      >
        <TabPane
          tab={
            <span>
              <OrderedListOutlined />
              List
            </span>
          }
          key="1"
        >
          <RecipeListTable />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PlusCircleOutlined /> Add New
            </span>
          }
          key="2"
        >
          <AddNewRecipe />
        </TabPane>
        {/* <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Dashboard;
