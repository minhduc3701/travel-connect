import React, { Component } from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";

let warningText = {
  company_address: <IntlMessages id="profile.update.address.warning" />,
  company_background: <IntlMessages id="profile.update.background.warning" />,
  company_brandname: <IntlMessages id="profile.update.brandname.warning" />,
  company_business: <IntlMessages id="profile.update.business.warning" />,
  company_city: <IntlMessages id="profile.update.city.warning" />,
  company_communities: <IntlMessages id="profile.update.communities.warning" />,
  company_contacts: <IntlMessages id="profile.update.contacts.warning" />,
  company_district: <IntlMessages id="profile.update.district.warning" />,
  company_establish: <IntlMessages id="profile.update.establish.warning" />,
  company_events: <IntlMessages id="profile.update.event.warning" />,
  company_fb: <IntlMessages id="profile.update.fb.warning" />,
  company_gitlab: <IntlMessages id="profile.update.gitlab.warning" />,
  company_introduction: <IntlMessages id="profile.update.intro.warning" />,
  company_licence: <IntlMessages id="profile.update.licence.warning" />,
  company_linkedin: <IntlMessages id="profile.update.linkedin.warning" />,
  company_logo: <IntlMessages id="profile.update.logo.warning" />,
  company_medias: <IntlMessages id="profile.update.media.warning" />,
  company_name: <IntlMessages id="profile.update.name.warning" />,
  company_nation: <IntlMessages id="profile.update.nation.warning" />,
  company_products: <IntlMessages id="profile.update.products.warning" />,
  company_products_number: (
    <IntlMessages id="profile.update.numberProduct.warning" />
  ),
  company_service: <IntlMessages id="profile.update.service.warning" />,
  company_skype: <IntlMessages id="profile.update.skype.warning" />,
  company_website: <IntlMessages id="profile.update.website.warning" />
};

class Processing extends Component {
  render() {
    let { Account } = this.props;
    let text = [];
    let textArr = [];
    if (Account.company_brandname) {
      for (const key in Account) {
        if (Account[key] === "" || Account[key].length < 1) {
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
      <div className="block-r block_shadow">
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
