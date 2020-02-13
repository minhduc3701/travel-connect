import {
  SAVE_DATA_INTRO,
  SAVE_DATA_SOCIAL,
  SAVE_DATA_MEDIA,
  SAVE_DATA_WEBSITE,
  SAVE_DATA_ADDRESS,
  CLEAN_STORE_REDUX,
  SAVE_DATA_BACKGROUND,
  SAVE_DATA_LOGO
} from "../../constants/ActionTypes";
import { CallApi_ACCOUNT } from "util/CallApi";
import firebaseAcc from "firebase/firebaseAcc";
import { notificationPop } from "util/Notification";

let cok = document.cookie;
let Token = cok.split(";");
let tokenID = Token[1].split("=");
let userId = tokenID[1];
// Intro
export const actSaveIntro = intro => {
  return {
    type: SAVE_DATA_INTRO,
    intro
  };
};
export const actSaveIntroRequest = intro => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/introduction`,
      "PUT",
      intro
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Social
export const actSaveSocial = social => {
  return {
    type: SAVE_DATA_SOCIAL,
    social
  };
};
export const actSaveSocialRequest = social => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/social`,
      "PUT",
      social
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Media
export const actSaveMedia = media => {
  return {
    type: SAVE_DATA_MEDIA,
    media
  };
};
export const actSaveMediaRequest = media => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/medias`,
      "POST",
      media
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Website
export const actSaveWebsite = website => {
  return {
    type: SAVE_DATA_WEBSITE,
    website
  };
};
export const actSaveWebsiteRequest = website => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/website`,
      "PUT",
      website
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Address
export const actSaveAddress = address => {
  return {
    type: SAVE_DATA_ADDRESS,
    address
  };
};
export const actSaveAddressRequest = address => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/location`,
      "PUT",
      address
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

//CLEAN STORE
export const actCleanReduxStore = () => {
  return {
    type: CLEAN_STORE_REDUX
  };
};

//Change Background
export const actChangeBackground = background => {
  return {
    type: SAVE_DATA_BACKGROUND,
    background
  };
};

//Change Logo
export const actChangeLogo = logo => {
  return {
    type: SAVE_DATA_LOGO,
    logo
  };
};

//create complete user profile account
export const SendDataUserSDK = data => {
  let userData = {
    name: data.name,
    birth: data.birth,
    gender: data.gender,
    phone: data.phone,
    nation: data.nation,
    district: data.district,
    city: data.city,
    address: data.address,
    imageUrl: data.logo,
    verifyPerson: "",
    companyAddress: "",
    companyBrand: "",
    companyBusiness: [],
    companyCity: "",
    companyDistrict: "",
    companyId: "",
    companyLogo: "",
    companyName: "",
    companyNation: "",
    companyTarget: "",
    createAt: new Date().toISOString(),
    currency: "vnd",
    email: "",
    language: "",
    notiCommunity: false,
    notiCompany: false,
    notiCurrentRequest: false,
    notiEvents: false,
    notiFlow: false,
    notiLogin: false,
    notiNewRequest: false,
    notiSystem: false,
    package: "",
    position: "",
    private: "only",
    sendEmail: false,
    sendNotiPush: false,
    sendNotiWeb: false,
    specialized: "",
    interested: "",
    timezone: "vn",
    companyHeadquarters: "",
    tourGuide: "",
    updateAt: "",
    website: "",
    zipcode: "",
    unitSuggest: []
  };
  return dispatch => {
    firebaseAcc
      .firestore()
      .collection("users")
      .doc(userId)
      .set(userData)
      .then(docRef => {
        let user_info = JSON.parse(localStorage.getItem("user_info"));
        let userDetail = {
          user_name: data.name,
          user_birth: data.birth,
          user_gender: data.gender,
          user_phone: data.phone,
          user_nation: data.nation,
          user_district: data.district,
          user_city: data.city,
          user_address: data.address,
          user_logo: data.logo
        };

        for (const item in userDetail) {
          for (const info in user_info) {
            if (item === info) {
              user_info[info] = userDetail[item];
            }
          }
        }
        localStorage.removeItem("user_info");
        localStorage.setItem("user_info", JSON.stringify(user_info));
        notificationPop(
          "success",
          "Chỉnh sửa hành công!",
          "Bạn đã bổ sung thông tin cho tài khoản thành công !"
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const CreateUserWorkSDK = (data, id) => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    firebaseAcc
      .firestore()
      .collection("users")
      .doc(uId.user_id)
      .update(data)
      .then(res => {
        notificationPop(
          "success",
          "Chỉnh sửa hành công!",
          "Bạn đã bổ sung thông tin cho tài khoản thành công !"
        );
      })

      .catch(err => {
        console.log(err);
      });
  };
};

//create company
export const CreateCompanySDK = data => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  let companyData = {
    address: data.address,
    brandname: data.brandname,
    city: data.city,
    createdAt: new Date().toISOString(),
    district: data.district,
    email: data.email,
    establish: data.establish,
    licence: data.licence,
    name: data.name,
    nation: data.nation,
    phone: data.phone,
    target: data.target,
    business: data.business,
    licenceDoc: [],
    admin: uId.user_id,
    comments: [],
    communities: [],
    confirm: "",
    contacts: [],
    deal: 0,
    events: [],
    fb: "",
    gitlab: "",
    linkedin: "",
    medias: [],
    orders: 0,
    partner: 0,
    products: [],
    products_number: 0,
    products_type: [],
    rating: 0,
    rating_bad: 0,
    rating_fail: 0,
    rating_good: 0,
    rating_great: 0,
    rating_normal: 0,
    skype: "",
    background: "",
    logo: "",
    website: "",
    active: false,
    introduction: ""
  };

  return dispatch => {
    firebaseAcc
      .firestore()
      .collection("companies")
      .add(companyData)
      .then(res => {
        let user_info = JSON.parse(localStorage.getItem("user_info"));
        let newDataForLocal = {
          company_id: res.id,
          company_name: data.name,
          company_brandname: data.brandname,
          company_nation: data.nation,
          company_city: data.city,
          company_district: data.district,
          company_address: data.address,
          company_business: data.business
        };
        for (const item in newDataForLocal) {
          for (const info in user_info) {
            if (item === info) {
              user_info[info] = newDataForLocal[item];
            }
          }
        }
        localStorage.removeItem("user_info");
        localStorage.setItem("user_info", JSON.stringify(user_info));
        notificationPop(
          "success",
          "Chỉnh sửa hành công!",
          "Bạn đã tạo công ty thành công! Hãy tiếp tục xác minh công ty để được phê duyệt"
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//verify company
export const VerifyCompanySDK = data => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    firebaseAcc
      .firestore()
      .collection("companies")
      .doc(uId.company_id)
      .update(data)
      .then(res => {
        notificationPop(
          "success",
          "Gửi yêu cầu xác minh thành công!",
          "Bạn đã gửi yêu cầu xác minh thông tin công ty thành công! Ban quản trị sẽ kiểm tra thông tin và xác minh sớm nhất"
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};
