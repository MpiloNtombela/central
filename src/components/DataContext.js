import PropTypes from "prop-types";
import React from "react";
import {useImmerReducer} from "use-immer";

export const SETUP_USER = "SETUP_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SETUP_ALERT = "SETUP_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT"
export const LOADING = "LOADING"
export const LOADED = "LOADED"


export const DataContext = React.createContext();
export const DispatchContext = React.createContext();

const reducer = (draft, action) => {
  switch (action.type) {
    case LOADING:
      draft.isLoading = true;
      break
    case LOADED:
      draft.isLoading = false;
      break
    case SETUP_USER:
      draft.student.studentNumber = action.payload["stuNum"];
      localStorage.setItem("stuNum", action.payload["stuNum"])
      break;
    case REMOVE_USER:
      draft.student.studentNumber = "";
      localStorage.removeItem("stuNum")
      break;
    case SETUP_ALERT:
      draft.alert.message = action.payload.message;
      draft.alert.status = action.payload.status
      break;
    case CLEAR_ALERT:
      draft.alert.message = "";
      draft.alert.status = null
      break;
  }
}

const dataState = {
  student: {
    studentNumber: "000000000",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1 January 2000",
    idNumber: "0001010000080",
    homeLang: "Klingon",
    citizenship: "Gotham",
    contacts: {
      phoneNumber: "+77123456789",
      emailAddress: "dev@mpilo.live",
      postalAddress: "7 Goat Avenue, Gothville 7777",
      studyAddress: "7 Goat Avenue, Gothville 7777",
    },
  },
  applications:[
    {
      year: 2018,
      qualification: "BSCSIT",
      description: "Bachelor of Science (CSIT)",
      preference: 6,
      status: "Unsuccessful",
      collage: "Collage of Arg, Eng & Science",
      code: "caes"
    },
    {
      year: 2018,
      qualification: "B-ART",
      description: "Bachelor of Art",
      preference: 5,
      status: "Accept Offer",
      collage: "Collage of Humanities",
      code: "coh"
    },
    {
      year: 2018,
      qualification: "BETE",
      description: "BEd (Teacher Education)",
      preference: 4,
      status: "Programme Full",
      collage: "Collage of Humanities",
      code: "coh"
    },
    {
      year: 2019,
      qualification: "BSS",
      description: "Bachelor of Social Science",
      preference: 1,
      status: "Accepted Offer",
      collage: "Collage of Humanities",
      code: "coh"
    },
    {
      year: 2022,
      qualification: "BT-KING",
      description: "Bachelor of Techno King😏",
      preference: 1,
      status: "Pending",
      collage: "Collage of Gotham",
      code: "cog"
    },
    {
      year: 2022,
      qualification: "BH-IST",
      description: "Bachelor of Commerce Honours in IST",
      preference: 1,
      status: "Firm Offer",
      collage: "Collage of Humanities",
      code: "coh"
    },
  ],
  isLoading: true,
  alert: {
    message: "",
    status: null
  },
}

const DataProvider = ({children}) => {
  const [data, dispatch] = useImmerReducer(reducer, dataState)

  return (
    <DataContext.Provider value={ data }>
      <DispatchContext.Provider value={ dispatch }>
        { children }
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default DataProvider;