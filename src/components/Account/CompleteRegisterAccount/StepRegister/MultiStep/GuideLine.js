import React from 'react';

class GuildeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    guideLine = () => {
        switch (this.state.currentStep) {
          case 0:
            return (
              <div>
                <Divider>Nội dung hồ sơ</Divider>
                <div 
                  className = 'p-3'
                  style = {{border: '1px solid #54545454'}}>
                <p> Bao gồm các thông tin cơ bản: </p>
                <p><Icon type="check-circle" /> Ảnh đại diện: Hình ảnh cá nhân</p>
                <p><Icon type="check-circle" /> Họ và tên: Họ và tên đầy đủ của người dùng</p>
                <p><Icon type="check-circle" /> Giới tính: Giới tính được khai trên chứng minh thư</p>
                <p><Icon type="check-circle" /> Số điện thoại: Số điện thoại liên lạc thường dùng</p>
                <p><Icon type="check-circle" /> Quốc gia: Quốc gia hiện đang sinh sống</p>
                <p><Icon type="check-circle" /> Quận/huyện: Quận/huyện hiện đang sinh sống</p>
                <p><Icon type="check-circle" /> Địa chỉ: Khu vực hiện đang sinh sống</p>
                </div>
                <p></p>
               </div>
            )        
          case 1:
            return (
            <div>
              <Divider>Thông tin các lĩnh vực</Divider>
              <ScrollAutomatically/>
            </div>
            )
          case 2:
            return (
              <div>
                <Divider>Nội dung hoạt động</Divider>
                <div 
                  className = 'p-3'
                  style = {{border: '1px solid #54545454'}}>
                <p> Lựa chọn hình thức làm việc trên sàn: </p>
                <p><Icon type="check-circle" /> Kiểm tra công ty của bạn đã tồng tại bằng cách tìm kiếm trên thanh công cụ</p>
                <p><Icon type="check-circle" /> Nếu kết quả trả về có công ty của bạn, bạn có thể ấn tham gia để trở thành thành viên của công ty</p>
                <p><Icon type="check-circle" /> Nếu công ty của bạn chưa được tạo, bạn có thể tạo mới hoặc gợi ý cho chúng tôi:</p>
                <p>{' '} <Icon type="minus-circle" /> Tạo mới công ty: Khi bạn là người quản lý, có đầy đủ giấy phép kinh doanh của công ty.</p>
                <p>{' '} <Icon type="minus-circle" /> Giới thiệu: Khi bạn là nhân viên không có đầy đủ giấy phép kinh doanh của công ty.</p>
                </div>
                <p></p>
              </div>
              )
          case 3:
            if(!this.state.create)
            return (
              <div>
                <Divider>Hồ sơ công việc</Divider>
                <div 
                  className = 'p-3'
                  style = {{border: '1px solid #54545454'}}>
                <p> Bao gồm các thông tin : </p>
                <p><Icon type="check-circle" /> Đơn vị, công ty người dùng đang làm việc</p>
                <p><Icon type="check-circle" /> Công việc, chức vụ người dùng đang làm việc</p>
                <p><Icon type="check-circle" /> Thông tin xác minh của người dùng đối với nơi đang làm việc</p>
                </div>
                <p></p>
              </div>
              )
            else
            return (
              <div>
                <Divider>Nội dung</Divider>
                <div 
                  className = 'p-3'
                  style = {{border: '1px solid #54545454'}}>
                <p> Bao gồm các thông tin cơ bản: </p>
                <p><Icon type="check-circle" /> Lĩnh vực hoạt động của công ty</p>
                <p><Icon type="check-circle" /> Tên công ty ghi trên giấy phép kinh doanh</p>
                <p><Icon type="check-circle" /> Tên thương hiệu được sử dụng phổ biến</p>
                <p><Icon type="check-circle" /> Email liên hệ chính của công ty</p>
                <p><Icon type="check-circle" /> Số điện thoại liên hệ chính của công ty</p>
                <p><Icon type="check-circle" /> Quốc gia / Quận / Huyện của trụ sở công ty ghi trên giáy phép</p>
                <p><Icon type="check-circle" /> Địa chỉ của trụ sở công ty </p>
                <p><Icon type="check-circle" /> Ngày thành lập của công ty</p>
                <p><Icon type="check-circle" /> Thi trường hướng tới của công ty (Khu vực, lĩnh vực, quốc gia, ...)</p>
                </div>
                <p></p>
              </div>
              )
          case 4:
            return (
              <div>
                <Divider>Thông tin xác minh</Divider>
                <div 
                  className = 'p-3'
                  style = {{border: '1px solid #54545454'}}>
                  <p>Xác minh thông tin,giấy phép: </p>
                  <p><Icon type="check-circle" /> Nếu bạn tạo mới công ty trên sàn, hãy cung cấp đầy đủ thông tin cho chúng tôi</p>
                  <p><Icon type="check-circle" /> Nếu bạn muốn tham gia vào các tổ chức, công ty đã có trên sàn, hãy đợi chúng tôi xác minh cho bạn</p>
                </div>
                <p></p>
              </div>
            );
          default:
            break;
        }
      };

    render() {
        return (
            <div></div>
        );
    }
}

export default GuildeLine;
