import React, { Fragment } from "react";
import { Row, Col, Pagination, Empty } from "antd";
import ItemProduct from "./ProductItem";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import {
  getLandProductMember,
  getGroupProductMember,
  actResetCurrentList,
  getNextPageProductLand,
  getNextPageProductGroup,
  getPrevPageData
} from "appRedux/actions/Account";
import { connect } from "react-redux";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.props.getLandProductMember(props.data.params.id);
    // this.props.getGroupProductMember(props.data.params.id);
    this.state = {
      page: 1,
      product: [],
      pageSize: 6
    };
  }

  onChangePage = currentPage => {
    let indexLand =
      this.props.landList.length > 0
        ? this.props.landList[this.props.landList.length - 1].createdAt
        : 0;
    let indexGroup =
      this.props.groupList.length > 0
        ? this.props.groupList[this.props.groupList.length - 1].createdAt
        : 0;
    if (
      currentPage > this.state.page &&
      currentPage > this.props.productList.length / 6 &&
      this.props.productList.length % 6 === 0
    ) {
      if (this.props.productList[this.state.page * 6 - 1] !== undefined) {
        this.props.actResetCurrentList();
        this.props.getNextPageProductLand(
          indexLand,
          this.props.data.params.id,
          indexGroup
        );
        // this.props.getNextPageProductGroup(
        //   this.props.groupList[this.props.groupList.length - 1].createdAt,
        //   this.props.data.params.id
        // );
        this.setState({
          page: currentPage
        });
      } else {
        this.setState({
          page: currentPage - 1
        });
      }
    } else {
      if (currentPage * 6 > Math.floor(this.props.productList.length / 6) * 6) {
        let data = [];
        for (
          let index = 0;
          index < this.props.productList.length % 6;
          index++
        ) {
          data.push(
            this.props.productList[
              Math.floor(this.props.productList.length / 6) * 6 + index
            ]
          );
        }
        this.props.getPrevPageData(data);
        this.setState({ page: currentPage });
      } else {
        this.props.getPrevPageData([
          this.props.productList[currentPage * 6 - 1],
          this.props.productList[currentPage * 6 - 2],
          this.props.productList[currentPage * 6 - 3],
          this.props.productList[currentPage * 6 - 4],
          this.props.productList[currentPage * 6 - 5],
          this.props.productList[currentPage * 6 - 6]
        ]);
        this.setState({ page: currentPage });
      }
    }
  };

  render() {
    let {
      loadingProductLand,
      loadingProductGroup,
      // productList,
      // currentListProduct,
      // currentNextProduct,
      loadNextLand,
      loadNextGroup
    } = this.props;
    return (
      <Fragment>
        {loadingProductLand || loadingProductGroup ? (
          <div>
            <Row>
              {this.props.currentListProduct.length > 0 ? (
                this.props.currentListProduct.map((item, index) => {
                  return (
                    <Col key={index} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <ItemProduct detail={item} />
                    </Col>
                  );
                })
              ) : this.props.currentListProduct.length < 1 &&
                this.props.currentNextProduct.length > 0 &&
                (loadNextLand || loadNextGroup) ? (
                this.props.currentNextProduct.map((item, index) => {
                  return (
                    <Col key={index} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <ItemProduct detail={item} />
                    </Col>
                  );
                })
              ) : loadingProductLand &&
                loadNextLand &&
                this.props.currentListProduct.length < 1 &&
                this.props.currentNextProduct.length < 1 ? (
                <Col span={24}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Col>
              ) : (
                <CircularProgress />
              )}
            </Row>
            <Row>
              <Col
                className="d-flex-i justify-center align-items-center"
                span={24}
              >
                <Pagination
                  defaultCurrent={1}
                  total={
                    this.props.productList.length > 6
                      ? Math.ceil(this.props.productList.length / 6) * 6
                      : this.props.productList.length + 6
                  }
                  pageSize={this.state.pageSize}
                  current={this.state.page}
                  showLessItems={true}
                  onChange={this.onChangePage}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ Account }) => {
  const {
    loadingProductLand,
    loadingProductGroup,
    productList,
    currentListProduct,
    error,
    currentNextProduct,
    loadNextLand,
    loadNextGroup,
    landList,
    groupList
  } = Account;
  return {
    loadingProductLand,
    loadingProductGroup,
    productList,
    currentListProduct,
    error,
    currentNextProduct,
    loadNextLand,
    loadNextGroup,
    landList,
    groupList
  };
};

export default connect(mapStateToProps, {
  getLandProductMember,
  getGroupProductMember,
  actResetCurrentList,
  getNextPageProductGroup,
  getNextPageProductLand,
  getPrevPageData
})(Product);
