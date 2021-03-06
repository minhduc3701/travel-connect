import React from "react";
import { Link } from "react-router-dom";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { connect } from "react-redux";
import { actSaveSocial } from "appRedux/actions/CompanyProfile";
import { Col, Icon, Input } from "antd";
import IntlMessages from "util/IntlMessages";

class Socials extends React.Component {
  state = {
    stt_socials: false,
    social: "",
    fb: null,
    linkedin: null,
    gitlab: null,
    skype: null
  };

  changeSocialsToEdit = () => {
    if (this.state.stt_socials === true) {
      this.setState({ stt_socials: false });
    }
    if (this.state.stt_socials === false) this.setState({ stt_socials: true });
  };

  onChangeInput = event => {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  };

  onSaveSocial = () => {
    let { profile } = this.props;
    this.props.actSaveData({
      fb: this.state.fb ? this.state.fb : profile.company_fb,
      linkedin: this.state.linkedin
        ? this.state.linkedin
        : profile.company_linkedin,
      gitlab: this.state.gitlab ? this.state.gitlab : profile.company_gitlab,
      skype: this.state.skype ? this.state.skype : profile.company_skype
    });
  };

  render() {
    let { profile } = this.props;
    return (
      <div className="block-w-nb" style={{ paddingBottom: "3em" }}>
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title={<IntlMessages id="account.profile.connectandshare" />}
          extra={
            <div className="m-l-1" onClick={() => this.changeSocialsToEdit()}>
              {this.state.stt_socials === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  onClick={() => this.onSaveSocial()}
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
            </div>
          }
        />
        {this.state.stt_socials === false ? (
          <div className="d-flex d-flex-wrap justify-space-between">
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: this.state.fb ? this.state.fb : profile.company_fb
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon
                    type="facebook"
                    className="size-5 m-r-1"
                    theme="filled"
                  />{" "}
                  Facebook
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: this.state.linkedin
                      ? this.state.linkedin
                      : profile.company_linkedin
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon
                    type="linkedin"
                    className="size-5 m-r-1"
                    theme="filled"
                  />{" "}
                  Linkedin
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: this.state.gitlab
                      ? this.state.gitlab
                      : profile.company_gitlab
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon type="gitlab" className="size-5 m-r-1" theme="filled" />{" "}
                  Gitlab
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: this.state.skype
                      ? this.state.skype
                      : profile.company_skype
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon type="skype" className="size-5 m-r-1" theme="filled" />{" "}
                  Skype
                </Link>
              </h4>
            </Col>
          </div>
        ) : (
          <div className="d-flex d-flex-wrap justify-space-between">
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon
                    type="facebook"
                    className="size-5 m-r-1"
                    theme="filled"
                  />
                  <Input
                    name="fb"
                    onChange={this.onChangeInput}
                    className="d-inline-block w-65-i"
                    defaultValue={
                      this.state.fb ? this.state.fb : profile.company_fb
                    }
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon
                    type="linkedin"
                    className="size-5 m-r-1"
                    theme="filled"
                  />
                  <Input
                    name="linkedin"
                    onChange={this.onChangeInput}
                    className="d-inline-block w-65-i"
                    defaultValue={
                      this.state.linkedin
                        ? this.state.linkedin
                        : profile.company_linkedin
                    }
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon type="gitlab" className="size-5 m-r-1" theme="filled" />
                  <Input
                    name="gitlab"
                    onChange={this.onChangeInput}
                    className="d-inline-block w-65-i"
                    defaultValue={
                      this.state.gitlab
                        ? this.state.gitlab
                        : profile.company_gitlab
                    }
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon type="skype" className="size-5 m-r-1" theme="filled" />
                  <Input
                    name="skype"
                    onChange={this.onChangeInput}
                    className="d-inline-block w-65-i"
                    defaultValue={
                      this.state.skype
                        ? this.state.skype
                        : profile.company_skype
                    }
                  />
                </div>
              </h4>
            </Col>
          </div>
        )}
        <div
          className="gx-text-primary gx-fs-md gx-pointer gx-mb-4 gx-d-block gx-d-sm-none p-3 text-align-right"
          onClick={() => this.changeSocialsToEdit()}
        >
          {this.state.stt_socials === true ? (
            <div className="d-inline-block">
              <Icon
                type="check-circle"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              <IntlMessages id="general.btn.save" />
            </div>
          ) : (
            <div className="d-inline-block">
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              <IntlMessages id="general.btn.edit" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveData: social => {
      dispatch(actSaveSocial(social));
    }
  };
};

export default connect(null, mapDispatchToProps)(Socials);
