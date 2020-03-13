import React from "react";
import IntlMessages from "util/IntlMessages";
import { Divider, Select, Button, Row, Col, Input } from "antd";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
// import CircularProgress from "components/GlobalComponent/CircularProgress";

const { Option } = Select;

class Activities extends React.Component {
  scroll() {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }

  activitiesText = (data, index) => {
    switch (data.type) {
      case "matching":
        return (
          <span>
            {new Date(data.createdAt).toLocaleTimeString()} {data.user.name}{" "}
            <IntlMessages id={`app.${data.content}`} />{" "}
            <span>{data.target.name}</span>{" "}
            <span className="gx-link">{data.cTarget.name}</span>
            <Divider value={index} />
          </span>
        );
        break;

      default:
        return (
          <span>
            {new Date(data.createdAt).toLocaleTimeString()} {data.user.name}{" "}
            {data.target.name !== data.user.name ? (
              <span className="gx-link">{data.target.name}</span>
            ) : null}{" "}
            <IntlMessages id={`app.${data.content}`} />{" "}
            <span className="gx-link"></span>
            {data.object.name !== data.user.name ? (
              <span className="gx-link">{data.object.name}</span>
            ) : null}
            <Divider value={index} />
          </span>
        );
        break;
    }
  };

  render() {
    return (
      <div>
        <div className="guide-form">
          <div>
            <Row>
              <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                <p className="p-t-3">
                  <IntlMessages id="general.text.year" />
                </p>
                <Select
                  showSearch
                  className="w-90"
                  placeholder={
                    <IntlMessages id="home.activities.year.placeholder" />
                  }
                >
                  <Option value="1">2019</Option>
                  <Option value="2">2018</Option>
                  <Option value="3">2017</Option>
                  <Option value="4">2016</Option>
                  <Option value="5">2015</Option>
                  <Option value="6">2014</Option>
                  <Option value="7">2013</Option>
                  <Option value="8">2012</Option>
                </Select>
              </Col>
              <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                <p className="p-t-3">
                  <IntlMessages id="general.text.month" />
                </p>
                <Select
                  showSearch
                  className="w-90"
                  placeholder={
                    <IntlMessages id="home.activities.month.placeholder" />
                  }
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                  <Option value="9">9</Option>
                  <Option value="10">10</Option>
                  <Option value="11">11</Option>
                  <Option value="12">12</Option>
                </Select>
              </Col>
              <Col xl={10} lg={5} md={5} sm={24} xs={24}>
                <p className="p-t-3">
                  <IntlMessages id="home.activities.keyword" />
                </p>
                <Input placeholder="Từ khóa" />
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={12}>
                <p>
                  <br />
                </p>
                <div className="text-align-center d-block">
                  <Button
                    className="m-t-3"
                    style={{ backgroundColor: "#038FDE", color: "white" }}
                    onClick={() => this.scroll()}
                  >
                    <IntlMessages id="general.btn.search" />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ minHeight: "30em" }}>
            <div>
              {this.props.arrActivities
                ? this.props.arrActivities.map(
                    (activitie, index) => this.activitiesText(activitie, index)
                    // <span>
                    //   {new Date(activitie.createdAt).toLocaleTimeString()}{" "}
                    //   {activitie.user.name}{" "}
                    //   {activitie.target.name !== activitie.user.name ? (
                    //     <span className="gx-link">{activitie.target.name}</span>
                    //   ) : null}{" "}
                    //   <IntlMessages id={`app.${activitie.content}`} />{" "}
                    //   <span className="gx-link"></span>
                    //   {activitie.object.name !== activitie.user.name ? (
                    //     <span className="gx-link">{activitie.object.name}</span>
                    //   ) : null}
                    //   <Divider value={index} />
                    // </span>
                  )
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  const { arrActivities } = firestore.ordered;
  return {
    arrActivities
  };
};

export default compose(
  firestoreConnect(props => {
    let { params } = props.data;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "notifications",
        where: [
          [`user.id`, "==", `${params.id}`],
          [`object.id`, "==", user_info.company_id]
        ],
        limit: 10,
        storeAs: "arrActivities"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(Activities);
