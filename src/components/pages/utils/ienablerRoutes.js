import React from 'react';
import {
  FaBed,
  FaCertificate,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaQuestionCircle,
  FaRegEdit,
  FaUniversity,
  FaUser
} from "react-icons/fa";
import {
  MdFactCheck,
  MdGavel,
  MdOutlineAppRegistration,
  MdOutlineHistoryEdu,
  MdPaid
} from "react-icons/md";
import {stringToColor} from "../../../utils/colors";

const iRoutes = [
  {
    name: 'Web Registration',
    icon: <MdOutlineAppRegistration size={24} color={stringToColor("Web Registration").hex}/>,
    link: null,
    subRoutes: [
      {
        name: "Rules & Regulations",
        icon: <MdGavel size={24} color={stringToColor("Rules & Regulations").hex}/>,
        link: null,
      },
      {
        name: "Address Validation",
        icon: <MdFactCheck size={24} color={stringToColor("Address Validation").hex}/>,
        link: null,
      },
      {
        name: "New Registration",
        icon: <FaRegEdit size={24} color={stringToColor("New Registration").hex}/>,
        link: '/registration'
      },
      {
        name: "Change of Curriculum",
        icon: <MdOutlineHistoryEdu size={24} color={stringToColor("Change of Curriculum").hex}/>,
        link: null
      },
      {
        name: "Proof of Registration",
        icon: <FaCertificate size={24} color={stringToColor("Proof of Registration").hex}/>,
        link: null,
      },
      {
        name: "Statement",
        icon: <FaFileInvoice size={24} color={stringToColor("Statement").hex}/>,
        link: null
      }
    ]
  },
  {
    name: "Student Admin",
    icon: <FaUser size={24} color={stringToColor("Student Admin").hex}/>,
    link: null
  },
  {
    name: "Financial Aid",
    icon: <MdPaid size={24} color={stringToColor("Financial Aid").hex}/>,
    link: null
  },
  {
    name: "Res Application",
    icon: <FaBed size={24} color={stringToColor("Res Application").hex}/>,
    link: null
  },
  {
    name: "Student Enquiry",
    icon: <FaQuestionCircle size={24} color={stringToColor("Student Enquiry").hex}/>,
    link: null,
    subRoutes: [
      {
        name: "Proof of Registration",
        icon: <FaCertificate size={24} color={stringToColor("Proof of Registration").hex}/>,
        link: null,
      },
      {
        name: "Admission Status",
        icon: <FaUniversity size={24} color={stringToColor("Admission Status").hex}/>,
        link: null,
      },
      {
        name: "Statement of Acc",
        icon: <FaFileInvoiceDollar size={24} color={stringToColor("Statement of Acc").hex}/>,
        link: null,
      },
    ]
  },
  {
    name: "Student Admin",
    icon: <FaUser size={24} color={stringToColor("Student Admin").hex}/>,
    link: null
  },
]

export default iRoutes