import React, { Fragment } from "react";
import { Row, Col } from "antd";
import HightLightItem from "./HightLightItem";
import IntlMessages from "util/IntlMessages";
const company_data = [
  { name: "Page A", partners: 200 },
  { name: "Page B", partners: 1200 },
  { name: "Page C", partners: 600 },
  { name: "Page D", partners: 1600 },
  { name: "Page D", partners: 1000 },
  { name: "Page H", partners: 2260 },
  { name: "Page K", partners: 800 }
];

class HightLight extends React.Component {
  render() {
    // let Account = this.props.profile;
    // let detail = Account.company_products;

    return (
      <Row>
        {/* {Account.company_partner ? ( */}
        <Fragment>
          <Col xl={12} lg={12} md={12} sm={12} xs={24} className="no-bor-rad">
            <HightLightItem
              chartPropertiesSeed={{
                title: <IntlMessages id="numberOfPartners" />,
                prize: this.props.analysis
                  ? this.props.analysis[0].partners.matching
                  : 0,
                icon: "stats",
                bgColor: "primary",
                styleName: "up",
                desc: <IntlMessages id="newPartner" />,
                percent: this.props.analysis
                  ? this.props.analysis[0].daily[
                      new Date().toLocaleDateString()
                    ]
                    ? this.props.analysis[0].daily[
                        new Date().toLocaleDateString()
                      ].partner
                    : 0
                  : 0
              }}
              dataList={company_data}
              bind_stroke="#092453"
              bind_fill="#092453"
              bind_type="monotone"
              bind_dataKey="partners"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24} className="no-bor-rad">
            <HightLightItem
              chartPropertiesSeed={{
                title: <IntlMessages id="numberOfProducts" />,
                prize: this.props.analysis
                  ? this.props.analysis[0].products.sum
                  : 0,
                icon: "stats",
                bgColor: "orange",
                styleName: "up",
                desc: <IntlMessages id="newProduct" />,
                percent: this.props.analysis
                  ? this.props.analysis[0].daily[
                      new Date().toLocaleDateString()
                    ]
                    ? this.props.analysis[0].daily[
                        new Date().toLocaleDateString()
                      ].product
                    : 0
                  : 0
              }}
              dataList={company_data}
              bind_stroke="#C87000"
              bind_fill="#C87000"
              bind_type="monotone"
              bind_dataKey="partners"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24} className="no-bor-rad">
            <HightLightItem
              chartPropertiesSeed={{
                title: <IntlMessages id="numberOfTransaction" />,
                prize: this.props.analysis
                  ? this.props.analysis[0].requests.sum
                  : 0,
                icon: "stats",
                bgColor: "teal",
                styleName: "up",
                desc: <IntlMessages id="newTransaction" />,
                percent: this.props.analysis
                  ? this.props.analysis[0].daily[
                      new Date().toLocaleDateString()
                    ]
                    ? this.props.analysis[0].daily[
                        new Date().toLocaleDateString()
                      ].transaction
                    : 0
                  : 0
              }}
              dataList={company_data}
              bind_stroke="#158765"
              bind_fill="#158765"
              bind_type="monotone"
              bind_dataKey="partners"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24} className="no-bor-rad">
            <HightLightItem
              chartPropertiesSeed={{
                title: <IntlMessages id="numberOfAccess" />,
                prize: this.props.analysis
                  ? this.props.analysis[0].partners.sum
                  : 0,
                icon: "stats",
                bgColor: "pink",
                styleName: "up",
                desc: <IntlMessages id="newAccess" />,
                percent: this.props.analysis
                  ? this.props.analysis[0].daily[
                      new Date().toLocaleDateString()
                    ]
                    ? this.props.analysis[0].daily[
                        new Date().toLocaleDateString()
                      ].access
                    : 0
                  : 0
              }}
              dataList={company_data}
              bind_stroke="#BB1258"
              bind_fill="#BB1258"
              bind_type="monotone"
              bind_dataKey="partners"
            />
          </Col>
        </Fragment>
        {/* ) : null} */}
      </Row>
    );
  }
}
export default HightLight;
