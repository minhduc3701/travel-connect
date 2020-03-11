import React from "react";
import { Tabs, Button } from "antd";

import IntlMessages from "util/IntlMessages";
import RecommendList from "./RecommendList";
const { TabPane } = Tabs;

class GeneralSettings extends React.Component {
  state = {
    loading: false,
    saveActive: false
  };

  render() {
    return (
      <div className="user_setting">
        <Tabs tabPosition="left">
          <TabPane
            tab={<IntlMessages id="account.setting.recommendList" />}
            key="general"
          >
            <RecommendList />
          </TabPane>
        </Tabs>
        {/* <div className="d-flex">
          <Button
            loading={this.state.loading}
            style={{ marginLeft: "auto", marginRight: "2em" }}
            type="primary"
          >
            Save
          </Button>
        </div> */}
      </div>
    );
  }
}

export default GeneralSettings;
