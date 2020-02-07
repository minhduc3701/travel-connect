import React, { Component } from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

let warningText = {
  company_address: "Hồ sồ công ty chưa có địa chỉ",
  company_background: "Hồ sồ công ty chưa có ảnh bìa!",
  company_brandname: "Hồ sồ công ty chưa có tên thương hiệu",
  company_business: "Hồ sồ công ty chưa chọn loại hình kinh doanh",
  company_city: "Hồ sồ công ty chưa có địa chỉ",
  company_communities: "Bạn chưa tham gia cộng đồng nào",
  company_contacts: "Hồ sồ công ty chưa có nhân viên",
  company_district: "Hồ sồ công ty chưa có địa chỉ",
  company_establish: "Hồ sồ công ty chưa có ngày thành lập",
  company_events: "Hồ sồ công ty chưa tạo sự kiện",
  company_fb: "Hồ sồ công ty chưa liên kết mạng xã hội",
  company_gitlab: "Hồ sồ công ty chưa liên kết mạng xã hội",
  company_introduction: "Hồ sồ công ty chưa có mô tả",
  company_licence: "Hồ sồ công ty chưa có giấy phép",
  company_linkedin: "Hồ sồ công ty chưa liên kết mạng xã hội",
  company_logo: "Hồ sồ công ty chưa có logo",
  company_medias: "Hồ sồ công ty chưa có tư liệu hình ảnh",
  company_name: "Hồ sồ công ty chưa có tên",
  company_nation: "Hồ sồ công ty chưa có quốc gia",
  company_products: "Công ty chưa có sản phẩm nào",
  company_products_number: "Công ty chưa có sản phẩm nào",
  // company_products_type: "Landtour",
  company_service: "Công ty chưa có sản phẩm nào",
  company_skype: "Hồ sồ công ty chưa liên kết mạng xã hội",
  company_website: "Hồ sồ công ty chưa website"
};

class Processing extends Component {
  render() {
    let { Account } = this.props;
    let text = [];
    let textArr = [];
    if (Account.company_brandname) {
      for (const key in Account) {
        if (Account[key] === "" || Account[key] === []) {
          text.push(key);
        }
      }
    }
    text.forEach((textW, index) => {
      for (const key in warningText) {
        if (key === textW) {
          textArr.push(warningText[key]);
        }
      }
    });
    const textUnique = new Set(textArr);
    const textFinal = [...textUnique];
    return (
      <div className="block-r">
        <WidgetHeader title="Building a professional profile" />
        <div>
          <ul>
            {textFinal.length > 0
              ? textFinal.map((warText, index) => {
                  return (
                    <li key={index}>
                      <p>{warText}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default Processing;
