import React from 'react'
import {FaDoorOpen, FaGraduationCap, FaIdBadge, FaUserGraduate, FaUserShield} from "react-icons/fa";
import {MdEdit, MdFactCheck, MdHistoryEdu, MdRefresh, MdSupportAgent} from "react-icons/md";

export const selfHelp = {
  name: "Self Help",
  icon: <MdSupportAgent size={28}/>,

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
export const achievements = {
  name: "Achievements",
  icon: <FaUserGraduate size={28}/>,
  subRoutes: [
    {
      name: "Class Marks",
      icon: <MdFactCheck size={32}/>,
      path: "/achievements/class"
    },
    {
      name: "Final Marks",
      icon: <FaGraduationCap size={32}/>,
      path: "/achievements/final"
    }
  ]
}
export const admin = {
  name: "Admin",
  icon: <FaUserShield size={28}/>,
  subRoutes: [
    {
      name: "Biographical",
      icon: <FaIdBadge size={32}/>,
      path: "admin/bio"
    },
    {
      name: "Reg History",
      icon: <MdHistoryEdu size={32}/>,
      path: "/admin/reg"
    }
  ]
}