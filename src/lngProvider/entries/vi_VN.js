import antdSA from "antd/lib/locale-provider/vi_VN";
import appLocaleData from "react-intl/locale-data/vi";
import saMessages from "../locales/vi_VN.json";

const vnLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'vi',
  data: appLocaleData
};
export default vnLang;
