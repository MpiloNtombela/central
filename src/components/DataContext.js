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
  applications: [
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
      qualification: "BH-IST",
      description: "Bachelor of Commerce Honours in IST",
      preference: 1,
      status: "Firm Offer",
      collage: "Collage of Law & Man Studies",
      code: "clms"
    },
    {
      year: 2022,
      qualification: "MT-KING",
      description: "Master of Techno King😏",
      preference: 1,
      status: "Pending",
      collage: "Collage of Gotham",
      code: "cog"
    },
  ],
  financial: [
    {
      date: "08-Oct-2018",
      ref: 3534869,
      credit: 1743,
      balance: 9267
    },
    {
      date: "06-Jan-2018",
      ref: 9082800,
      credit: 9587,
      balance: 4671
    },
    {
      date: "28-May-2018",
      ref: 8313881,
      credit: 1241,
      balance: 8073
    },
    {
      date: "19-Nov-2018",
      ref: 9725979,
      credit: 3100,
      balance: 5761
    },
    {
      date: "19-Sep-2018",
      ref: 2312611,
      credit: 3205,
      balance: 7072
    },
    {
      date: "24-May-2018",
      ref: 3314440,
      credit: 2202,
      balance: 5792
    },
    {
      date: "14-Jun-2018",
      ref: 8840477,
      credit: 6166,
      balance: 9694
    },
    {
      date: "02-Oct-2018",
      ref: 6238367,
      credit: 9826,
      balance: 1419
    },
    {
      date: "12-Jan-2018",
      ref: 5164823,
      credit: 4100,
      balance: 8162
    },
    {
      date: "10-May-2018",
      ref: 3074147,
      credit: 2101,
      balance: 7045
    },
    {
      date: "14-Feb-2018",
      ref: 6472705,
      credit: 1958,
      balance: 2910
    },
    {
      date: "14-Mar-2018",
      ref: 2154278,
      credit: 7049,
      balance: 8236
    },
    {
      date: "13-Nov-2018",
      ref: 5304816,
      credit: 9815,
      balance: 3553
    },
    {
      date: "26-Jul-2018",
      ref: 1966945,
      credit: 9251,
      balance: 1139
    },
    {
      date: "01-Jun-2018",
      ref: 9163285,
      credit: 4433,
      balance: 6462
    }
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
    <DataContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default DataProvider;