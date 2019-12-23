import React from "react";
import IntlMessages from "util/IntlMessages";
// import {Avatar} from "antd";

// const userImageList = [
//   {
//     id: 1,
//     image: 'https://via.placeholder.com/150x150',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/150x150',
//   },
//   {
//     id: 3,
//     image: 'https://via.placeholder.com/150x150',

//   },
//   {
//     id: 4,
//     image: 'https://via.placeholder.com/150x150',
//     name: 'Mila Alba',
//     rating: '5.0',
//     deals: '27 Deals'
//   },
// ]

export const aboutList = [
  {
    id: 1,
    title: <IntlMessages id="brandname" />,
    icon: "company",
    userList: "",
    desc: ["Travel Connect "],
    verify: "check-circle-o"
  },
  {
    id: 2,
    title: <IntlMessages id="establishdate" />,
    icon: "schedule",
    userList: "",
    desc: ["Dec 07, 2010"]
  },
  {
    id: 6,
    title: <IntlMessages id="licence" />,
    icon: "inputnumber",
    userList: "",
    desc: "0105030308"
  },
  {
    id: 3,
    title: <IntlMessages id="step.information.address" />,
    icon: "location",
    userList: "",
    desc: "Số 2 đường 3.5 Gamuda Gardens, Hoàng Mai, Hà Nội"
  },
  {
    id: 4,
    title: <IntlMessages id="step.product" />,
    icon: "product-list",
    userList: "",
    desc: ["Tour"]
  },
  {
    id: 5,
    title: <IntlMessages id="businesstype" />,
    icon: "company",
    userList: "",
    desc: "Đại lý du lịch"
  }
];

export const eventList = [
  {
    id: 1,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/meetings/1562549479_uUrdcOi6.png",
    title: "DU LỊCH CHUNG TAY BẢO VỆ MÔI TRƯỜNG, HẠN CHẾ RÁC THẢI NHỰA",
    address: "Việt Trì (Phú Thọ)",
    date: "Jan 24, 2019"
  },
  {
    id: 2,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/ee22775aa0edbefb926af4b95a38dd03/sys/meetings/1559879684_xjEdDcqf.png",
    title: "HỘI NGHỊ XÚC TIẾN DU LỊCH NEPAL TẠI HÀ NỘI",
    address: "Hà Nội",
    date: "Feb 24, 2019"
  },
  {
    id: 3,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/aae9250afafc57f64c4c378414288d49/sys/meetings/1559728220_ARKzdr84.png",
    title: "CHƯƠNG TRÌNH KHẢO SÁT HỖ TRỢ PHÁT TRIỂN SẢN PHẨM DU LỊCH BIỂN ĐẢO",
    address: "Quảng Ngãi",
    date: "Oct 25, 2019"
  }
];

export const rateList = [
  {
    id: 1,
    title: "Excellent",
    rate: "99"
    // icon: 'heart',
  },
  {
    id: 2,
    title: "Very good",
    rate: "50"
    // icon: 'smile'
  },
  {
    id: 3,
    title: "Good",
    rate: "14"
    // icon: 'meh'
  },
  {
    id: 4,
    title: "Normal",
    rate: "5"
    // icon: 'frown'
  },
  {
    id: 5,
    title: "Bad",
    rate: "14"
    // icon: 'frown'
  }
];

export const communitiesList = [
  {
    id: 1,
    postion: 0,
    image: "https://via.placeholder.com/575x372",
    image2: "https://via.placeholder.com/80x80",
    title: "Welcome to roadmap new",
    desc: "Crypto Expert"
  },
  {
    id: 2,
    postion: 0,
    image: "https://via.placeholder.com/575x372",
    image2: "https://via.placeholder.com/80x80",
    title: "Welcome to roadmap",
    desc: "Crypto Expert"
  },
  {
    id: 3,
    postion: 0,
    image: "https://via.placeholder.com/575x372",
    image2: "https://via.placeholder.com/80x80",
    title: "Welcome to roadmap new",
    desc: "Crypto Expert"
  }
];

export const cartVisitList = [
  {
    id: 1,
    title: "Email",
    icon: "email",
    desc: [
      <span className="gx-link" key={1}>
        travelconnect@gmail.com
      </span>
    ]
  },
  {
    id: 2,
    title: "Phone",
    icon: "phone",
    desc: ["+1-234 (567) 890"]
  }
];

export const contactList = [
  {
    id: 1,
    name: "Arnaud Barré",
    icon: "https://via.placeholder.com/150x150",
    desc: "Sales Director"
  },
  // {
  //   id: 2,
  //   name: 'Email',
  //   icon: 'https://via.placeholder.com/150x150',
  //   desc: 'CEO',
  // },
  {
    id: 3,
    name: "Email",
    icon: "https://via.placeholder.com/150x150",
    desc: "Manager"
  }
];

export const friendList = [
  {
    id: 1,
    postion: 0,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/1300/1552576633_VD1DGKvQ.jpg",
    image2: "https://via.placeholder.com/80x80",
    title: "Hiệp Hội Du Lịch Việt Nam VITA",
    desc:
      "Hiệp hội Du lịch Việt Nam là một tổ chức tự nguyện phi chính phủ của các doanh nghiệp, tổ chức kinh tế và công dân Việt Nam hoạt động hợp pháp trong lĩnh vực du lịch."
  },
  {
    id: 2,
    postion: 0,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/1300/1552576658_hB7LD4rp.jpg",
    image2: "https://via.placeholder.com/80x80",
    title: "Hiệp Hội Lữ Hành Việt Nam VISTA",
    desc:
      "Hiệp hội Lữ hành Việt Nam là tổ chức xã hội nghề nghiệp của các doanh nghiệp lữ hành và vận chuyển khách du lịch, của các Hướng dẫn viên và Thuyết minh viên du lịch. Hiệp hội Lữ hành Việt Nam"
  },
  {
    id: 3,
    postion: 0,
    image:
      "https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/1300/1552745810_xtTKJx05.png",
    image2: "https://via.placeholder.com/80x80",
    title: "CLB Lữ hành Hà Nội UNESCO",
    desc:
      "CLB Lữ hành UNESCO Hà Nội hoạt động theo Điều lệ Câu lạc bộ được các hội viên CLB thông qua, theo nguyên tắc tập trung dân chủ, tự nguyện, tự quản, tự chủ về tài chính phù"
  }
];

export const saleData = [
  {
    id: 1,
    title: "Sold",
    rate: "50",
    des: "The number of product company sold"
  },
  {
    id: 2,
    title: "To",
    rate: "12",
    des: "The number of customer that purchased company's products"
  },
  {
    id: 3,
    title: "Buy",
    rate: "16",
    des: "The number of product company bought"
  },
  {
    id: 4,
    title: "From",
    rate: "3",
    des: "The number of customer that sold product to company"
  }
];

export const introData = [
  {
    id: 1,
    content:
      "SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect cam kết và nỗ lực mang lại cho du khách. Travel Connect trở thành người bạn đồng hành cùng du khách trong mọi hành trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel Connect, du lịch không những là hành trình khám phá mà còn là hành trình sẻ chia, thể hiện dấu ấn khác biệt của Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng và những giá trị gia tăng hấp dẫn cho du khách sau mỗi chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm: Travel Connect luôn khẳng định khách hàng là trung tâm của mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì khách hàng là người góp phần to lớn xây dựng nên thương hiệu Travel Connect."
  }
];
