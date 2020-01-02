import React from "react";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { connect } from "react-redux";
import doneChange from "util/Notification";
import { Input, Icon } from "antd";
import { actSaveIntro } from "appRedux/actions/CompanyProfile";

const { TextArea } = Input;
const introData =
  "SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect cam kết và nỗ lực mang lại cho du khách. Travel Connect trở thành người bạn đồng hành cùng du khách trong mọi hành trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel Connect, du lịch không những là hành trình khám phá mà còn là hành trình sẻ chia, thể hiện dấu ấn khác biệt của Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng và những giá trị gia tăng hấp dẫn cho du khách sau mỗi chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm: Travel Connect luôn khẳng định khách hàng là trung tâm của mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì khách hàng là người góp phần to lớn xây dựng nên thương hiệu Travel Connect.";

class Biography extends React.Component {
  state = {
    stt_biography: false,
    intro: {
      company_introduction: null
    }
  };

  changeBiographyToEdit = () => {
    if (this.state.stt_biography === true) {
      doneChange();
      this.setState({ stt_biography: false });
    }
    if (this.state.stt_biography === false)
      this.setState({ stt_biography: true });
  };

  onChangeTextArea = event => {
    let target = event.target;
    let value = target.value;
    this.setState({
      intro: {
        company_introduction: value
      }
    });
  };

  onSaveData = () => {
    let { profile } = this.props;
    let introResult = this.state.intro.company_introduction
      ? this.state.intro
      : profile.company_introduction;
    this.props.actSaveData(introResult);
  };

  render() {
    let { profile } = this.props;
    return (
      <div className="block-w-nb">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title={<IntlMessages id="company.introduction" />}
          extra={
            <div className="m-l-1" onClick={() => this.changeBiographyToEdit()}>
              {this.state.stt_biography === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  onClick={() => this.onSaveData()}
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
            </div>
          }
        />
        <p className="gx-text-grey gx-fs-sm">
          {<IntlMessages id="company.introduction.des" />}{" "}
          {profile.company_brandname}
        </p>
        <div className="text-align-justify">
          {!introData.length ? (
            <p className="gx-font-weight-light">
              {profile.company_introduction}
              {/* <i className="icon icon-sweet-alert"></i>{" "}
              <IntlMessages id="guide.company.intro" />
              <b>
                <i className="icon icon-setting"></i>{" "}
                <IntlMessages id="company.setting" />
              </b> */}
            </p>
          ) : this.state.stt_biography === false ? (
            <p style={{ lineHeight: "1.5em" }}>
              {this.state.intro.company_introduction
                ? this.state.intro.company_introduction
                : profile.company_introduction}
            </p>
          ) : (
            <TextArea
              // value={this.state.intro}
              defaultValue={
                this.state.intro.company_introduction
                  ? this.state.intro.company_introduction
                  : profile.company_introduction
              }
              onChange={this.onChangeTextArea}
              placeholder="Introduction"
              autoSize={{ minRows: 8, maxRows: 10 }}
            />
          )}
        </div>
        <div
          className="gx-text-primary gx-fs-md gx-pointer gx-mb-4 gx-d-block gx-d-sm-none p-3 text-align-right"
          onClick={() => this.changeBiographyToEdit()}
        >
          {this.state.stt_biography === false ? (
            <div className="d-inline-block">
              {" "}
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              Edit{" "}
            </div>
          ) : (
            <div className="d-inline-block">
              {" "}
              <Icon
                className="size-4 cursor-pointer cursor-pointer--zoom"
                type="check-circle"
              />{" "}
              Save{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveData: intro => {
      dispatch(actSaveIntro(intro));
    }
  };
};

export default connect(null, mapDispatchToProps)(Biography);
