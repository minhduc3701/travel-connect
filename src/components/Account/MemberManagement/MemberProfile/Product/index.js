import React from "react";
import { Row, Col, Pagination, Empty } from "antd";
import ItemProduct from "./ProductItem";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import firebase from "firebase/firebaseAcc";

class Product extends React.Component {
  state = {
    product: null
  };

  componentWillMount() {
    let { params } = this.props.data;
    let productList = [];
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection("landtours")
      .where(`manager.id`, "==", params.id)
      .limit(6)
      .get()
      .then(doc => {
        doc.docs.forEach(doc => {
          productList.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            day: doc.data().durationDay,
            night: doc.data().durationNight,
            hours: doc.data().durationHours,
            publish: doc.data().publish,
            requests: doc.data().requests,
            thumb: doc.data().thumbs[0].thumb,
            status: doc.data().status,
            verify: doc.data().verify,
            type: "landtour"
          });
        });
      })
      .then(res => {
        this.setState({
          product: productList
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Row>
          {this.state.product && this.state.product.length > 0 ? (
            this.state.product.map((item, index) => {
              return (
                <Col key={index} xl={12} lg={12} md={24} sm={24} xs={24}>
                  <ItemProduct detail={item} />
                </Col>
              );
            })
          ) : this.state.product && this.state.product.length < 1 ? (
            <Col span={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          ) : (
            <CircularProgress />
          )}
        </Row>

        <Row>
          <Col className="d-flex-i justify-center align-items-center" span={24}>
            <Pagination defaultCurrent={1} total={50} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Product;
