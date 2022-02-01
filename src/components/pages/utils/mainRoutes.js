import React from 'react'
import {FaDoorOpen, FaGraduationCap, FaIdBadge} from "react-icons/fa";
import {MdEdit, MdFactCheck, MdHistoryEdu, MdRefresh, MdSupportAgent} from "react-icons/md";

export const selfHelp = {
  name: "Self Help",
  icon: <MdSupportAgent/>,

  subRoutes: [
    {
      name: "iEnabler",
      icon: <MdRefresh size={32}/>,
      path: "/self-help/ienabler",
    },
    {
      name: "Registration",
      icon: <MdEdit size={32}/>,
      path: "/self-help/registration"
    },
    {
      name: "Exclusion",
      icon: <FaDoorOpen size={32}/>,
      path: "/self-help/exclusion"
    }
  ]
}
export const achievements = [
  {
    name: "Class Marks",
    icon: <MdFactCheck/>,
    path: "/achievements/class"
  },
  {
    name: "Final Marks",
    icon: <FaGraduationCap/>,
    path: "/achievements/final"
  }
]
export const admin = [
  {
    name: "Biographical",
    icon: <FaIdBadge/>,
    path: "admin/bio"
  },
  {
    name: "Reg History",
    icon: <MdHistoryEdu/>,
    path: "/admin/reg"
  }
]