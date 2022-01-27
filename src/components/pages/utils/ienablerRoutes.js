import React from 'react';
import {
  FaAward,
  FaBed,
  FaCertificate, FaDonate, FaDoorOpen,
  FaFileInvoice,
  FaFileInvoiceDollar, FaFileSignature, FaHandHoldingUsd, FaMoneyCheck,
  FaQuestionCircle,
  FaRegEdit,
  FaUniversity,
  FaUser
} from "react-icons/fa";
import {
  MdFactCheck,
  MdGavel, MdMedicalServices,
  MdOutlineAppRegistration,
  MdOutlineHistoryEdu,
  MdPaid, MdPriceCheck, MdSecurity
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
        name: "Statement of Reg",
        icon: <FaFileInvoice size={24} color={stringToColor("Statement of Reg").hex}/>,
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
    icon: <FaHandHoldingUsd size={24} color={stringToColor("Financial Aid").hex}/>,
    link: null
  },
  {
    name: "Residence Application",
    icon: <FaBed size={24} color={stringToColor("Residence Application").hex}/>,
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
    name: "Access Control",
    icon: <MdSecurity size={24} color={stringToColor("Access Control").hex}/>,
    link: null
  },
  {
    name: "Student Finance",
    icon: <FaMoneyCheck size={24} color={stringToColor("Student Finance").hex}/>,
    link: null,
    subRoutes: [
      {
        name: "Acknowledge Debt",
        icon: <FaFileSignature size={24} color={stringToColor("Acknowledge Debt").hex}/>,
        link: null,
      }
    ]
  },
  {
    name: "Medical Web",
    icon: <MdMedicalServices size={24} color={stringToColor("Medical Web").hex}/>,
    link: null
  },
  {
    name: "Exemption",
    icon: <FaDoorOpen size={24} color={stringToColor("Exemption").hex}/>,
    link: null
  },
  {
    name: "Bursary Awards",
    icon: <FaAward size={24} color={stringToColor("Bursary Awards").hex}/>,
    link: null,
    subRoutes: [
      {
        name: "Accept Bursary",
        icon: <MdPriceCheck size={24} color={stringToColor("Accept Bursary").hex}/>,
        link: null
      },
    ]
  },
]

export default iRoutes