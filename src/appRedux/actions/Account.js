import {
  FETCH_PROFILE,
  COMPANY_PROFILE_STEP3,
  COMPANY_PROFILE_STEP4,
  SAVE_LOCAL_BACKGROUND,
  SAVE_LOCAL_LOGO
  // FETCH_PROFILE_SDK_START
} from "../../constants/ActionTypes";
import { CallApi_USER, CallApi_ACCOUNT } from "util/CallApi";
import { notiChange } from "util/Notification";
// import firebase from "firebase/firebaseAcc";

export const actFetchAction = profile => {
  return {
    type: FETCH_PROFILE,
    profile
  };
};

// lay profile company
export const actFetchActionRequest = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(`VN/companies/${uId.company_id}`, "GET", null)
      .then(res => {
        // console.log(res);
        dispatch(actFetchAction(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
// export const actFetchActionRequest = () => {
//   let uId = JSON.parse(localStorage.getItem("user_info"));
//   return dispatch => {
//     dispatch({ type: FETCH_PROFILE_SDK_START });
//     const AuthStr = "Bearer " + localStorage.getItem("request_token");
//     firebase
//       .firestore()
//       .collection("companies")
//       .doc("VN")
//       .collection("companies")
//       .doc(uId.company_id)
//       .get()
//       .then(data => {
//         let requests = [];
//         data.forEach(doc => {
//           requests.push({
//             company_address: doc.data().address,
//             company_background: doc.data().background,
//             company_brandname: doc.data().brandname,
//             company_business: doc.data().business,
//             company_city: doc.data().city,
//             company_comments: doc.data().comments,
//             company_communities: doc.data().communities,
//             company_contacts: doc.data().contacts,
//             company_deal: doc.data().deal,
//             company_district: doc.data().district,
//             company_establish: doc.data().establish,
//             company_events: doc.data().events,
//             company_fb: doc.data().fb,
//             company_gitlab: doc.data().gitlab,
//             company_introduction: doc.data().introduction,
//             company_licence: doc.data().licence,
//             company_licence_doc: doc.data().licenceDoc,
//             company_linkedin: doc.data().linkedin,
//             company_logo: doc.data().logo,
//             company_medias: doc.data().medias,
//             company_name: doc.data().name,
//             company_nation: doc.data().nation,
//             company_orders: doc.data().orders,
//             company_partner: doc.data().partner,
//             company_products: doc.data().products,
//             company_products_number: doc.data().products_number,
//             company_products_type: doc.data().products_type,
//             company_rating: doc.data().rating,
//             company_rating_bad: doc.data().rating_bad,
//             company_rating_fail: doc.data().rating_fail,
//             company_rating_good: doc.data().rating_good,
//             company_rating_great: doc.data().rating_great,
//             company_rating_normal: doc.data().rating_normal,
//             company_skype: doc.data().skype,
//             company_website: doc.data().website
//           });
//         });
//         return requests;
//       })
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };

export const actSaveProfile3 = step3 => {
  return {
    type: COMPANY_PROFILE_STEP3,
    step3
  };
};
export const actSaveProfile4 = step4 => {
  return {
    type: COMPANY_PROFILE_STEP4,
    step4
  };
};

//send resquest license update profile company
export const actChangeLicenseRequest = license => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/requests`,
      "POST",
      license
    )
      .then(res => {
        console.log("Send request success!" + res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//create company step 2-3
export const actCreateCompanyRequest = (profile, file) => {
  return dispatch => {
    return CallApi_ACCOUNT("companies", "POST", profile)
      .then(res => {
        onSendImage(file, res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const onSendImage = (fileList, id) => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  const formData = new FormData();
  fileList.forEach(file => {
    formData.append("image-", file);
  });
  CallApi_ACCOUNT(`VN/companies/${id.company_id}/licenceDocs`, "PUT", formData)
    .then(res => {
      let dataDup = uId;
      for (const key in id) {
        for (const newKey in dataDup) {
          if (key === newKey) {
            dataDup[newKey] = id[key];
          }
        }
      }
      if (res.data) {
        localStorage.removeItem("user_info");
        let newInfo = JSON.stringify(dataDup);
        notiChange("success", "Cập nhật thành công");
        localStorage.setItem("user_info", newInfo);
      }
    })
    .catch(err => console.log(err));
};

//Complete profile step 2 (cá nhân)
export const actUpdatePersonProfileRequest = profile => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_USER(`users/${uId.user_id}/suggestion`, "PUT", profile)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//update profile company
export const actUpdateCompanyProfileRequest = profile => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(`VN/companies/${uId.company_id}`, "PUT", profile)
      .then(res => {
        console.log("Update success!" + res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const actSetNewImage = imageUrl => {
  return {
    type: SAVE_LOCAL_BACKGROUND,
    imageUrl
  };
};
export const actSetNewAvatar = imageUrl => {
  return {
    type: SAVE_LOCAL_LOGO,
    imageUrl
  };
};
