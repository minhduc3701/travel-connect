import React from "react";

class JoinUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  contentJoin = () => {
    switch (this.props.type) {
      case 2:
        return (
          <div>
            <FormItem {...formItemLayout} label="Tổ chức:">
              Hiệp hội Du lịch Việt Nam
            </FormItem>
            <FormItem {...formItemLayout} label="Chức vụ:">
              <Input />
            </FormItem>
          </div>
        );
      case 3:
        return (
          <div>
            <FormItem {...formItemLayout} label="Đơn vị báo chí:">
              Tòa báo sự kiện và phát triển Du lịch
            </FormItem>
            <FormItem {...formItemLayout} label="Chức vụ:">
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="Thẻ nhà báo:">
              <Dragger
                {...props}
                onChange={() => this.openNotificationWithIcon("licenseimage")}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy phép kinh doanh; Giấy phép hành nghề của
                  công ty bạn tại đây
                </p>
              </Dragger>
            </FormItem>
          </div>
        );
      case 5:
        return (
          <div>
            <FormItem {...formItemLayout} label="Tổ chức/Cơ quan:">
              Tòa báo sự kiện và phát triển Du lịch
            </FormItem>
            <FormItem {...formItemLayout} label="Chức vụ:">
              <Input />
            </FormItem>
          </div>
        );
      case 6:
        return <div>
            <FormItem {...formItemLayout} label="Đại diện cho quốc gia:">
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="Giấy phép hành nghê:">
              <Dragger
                {...props}
                onChange={() => this.openNotificationWithIcon("licenseimage")}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy phép chứng nhận/chứng chỉ/thẻ Hướng dẫn
                  viên
                </p>
              </Dragger>
            </FormItem>
        </div>;
      case 7:
        return (
          <div>
            <FormItem {...formItemLayout} label="Chức vụ:">
              <Input />
            </FormItem>
            <FormItem {...formItemLayout} label="Giấy phép hành nghê:">
              <Dragger
                {...props}
                onChange={() => this.openNotificationWithIcon("licenseimage")}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy phép chứng nhận/chứng chỉ/thẻ Hướng dẫn
                  viên
                </p>
              </Dragger>
            </FormItem>
          </div>
        );
      case 8:
        return (
          <div>
            <FormItem {...formItemLayout} label="Lĩnh vực theo học:">
              Kinh tế thương mại và Du lịch
            </FormItem>
            <FormItem {...formItemLayout} label="Thẻ sinh viên">
              <Dragger
                {...props}
                onChange={() => this.openNotificationWithIcon("licenseimage")}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy phép chứng nhận/chứng chỉ/thẻ Sinh viên
                </p>
              </Dragger>
            </FormItem>
          </div>
        );
    }
  };

  render() {
    return <div></div>;
  }
}

export default JoinUnit;
