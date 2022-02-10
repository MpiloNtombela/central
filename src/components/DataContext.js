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
  announcements: [
    {
      id: 1,
      title: "Checkout my profile",
      content: "You can also find me or connect with me in these networks I use",
      date: "01/01/2022",
      user: 'Mpilo',
      importantScore: 10,
      pinned: true,
      actions: [
        {
          type: 'link',
          name: 'linkedin',
          destination: 'https://linkedin.com/in/mpilo-ntombela',
          message: null
        },
        {
          type: 'link',
          name: 'github',
          destination: 'https://github.com/MpiloNtombela/',
          message: null
        }],
      active: true
    },
    {
      id: 2,
      title: "Bust pipe at (certain campus🤐)",
      content: "No water at a (certain campus🤐) due to bust pipes, the matter is now handled by the municipality",
      date: "06/02/2022",
      importantScore: 3,
      user: 'Communique️',
      pinned: false,
      actions: [{
        type: 'button',
        name: 'enquiries',
        important: true,
        destination: null,
        message: 'the matter has been resolved'
      }],
      active: Date.now() < Date.parse('07/02/2022')
    },
    {
      id: 3,
      title: "inactive message",
      content: "Just to showcase an inactive announcement, in case you saw this project before the 07/20/2022",
      date: "03/02/2022",
      user: null,
      importantScore: 1,
      pinned: false,
      actions: [],
      active: false
    },
    {
      id: 4,
      title: "Zoom event invite",
      content: "You are kindly invited to inauguration of a newly found prof. of Techno kings😏 on the 04/20/2022",
      date: "01/02/2022",
      user: 'Communique️',
      importantScore: 2,
      pinned: false,
      actions: [
        {
          type: 'button',
          name: 'enquiries',
          destination: null,
          important: false,
          message: 'Enquiries closed for this event'
        },
        {
          type: 'button',
          name: 'RSVP now',
          destination: null,
          important: true,
          message: 'Event already passed'
        },

      ],
      active: false
    },
    {
      id: 5,
      title: "Registration closing date",
      content: `All registration processes closes on the 24/02/2022 , 
      unless otherwise a formal notice from the institution stating the extension.`,
      date: '10/01/2022',
      user: 'Communique️',
      importantScore: 8,
      actions: [],
      pinned: true,
      active: Date.now() < Date.parse('02/24/2022')
    },
    {
      id: 6,
      title: "Negative term decision",
      content: `If you received a letter notifying you of negative term decision,
       please follow the action below before attempting to register.`,
      importantScore: 9,
      user: 'Support dep.',
      date: '10/01/2022',
      actions: [{
        type: 'button',
        name: 'take action',
        destination: null,
        important: true,
        message: 'you do not have any negative term decision'
      }],
      pinned: true,
      active: Date.now() < Date.parse('02/24/2022')
    }
  ],
  ads: [
    {
      id: 1,
      email: 'dev@mpilo.live',
      productName: "Fantastic Steel Fish",
      department: "Movies",
      price: "681.00",
      productMaterial: "Granite"
    },
    {
      id: 2,
      email: 'dev@mpilo.live',
      productName: "Gorgeous Plastic Cheese",
      department: "Computers",
      price: "480.00",
      productMaterial: "Wooden"
    },
    {
      id: 3,
      email: 'dev@mpilo.live',
      productName: "Refined Cotton Pants",
      department: "Automotive",
      price: "229.00",
      productMaterial: "Fresh"
    },
    {
      id: 4,
      email: 'dev@mpilo.live',
      productName: "Ergonomic Steel Salad",
      department: "Beauty",
      price: "568.00",
      productMaterial: "Metal"
    },
    {
      id: 5,
      email: 'dev@mpilo.live',
      productName: "Gorgeous Metal Chips",
      department: "Grocery",
      price: "689.00",
      productMaterial: "Steel"
    },
    {
      id: 6,
      email: 'dev@mpilo.live',
      productName: "Unbranded Plastic Gloves",
      department: "Beauty",
      price: "922.00",
      productMaterial: "Fresh"
    },
    {
      id: 7,
      email: 'dev@mpilo.live',
      productName: "Handcrafted Rubber Sausages",
      department: "Grocery",
      price: "196.00",
      productMaterial: "Granite"
    },
    {
      id: 8,
      email: 'dev@mpilo.live',
      productName: "Gorgeous Steel Sausages",
      department: "Outdoors",
      price: "881.00",
      productMaterial: "Plastic"
    },
    {
      id: 9,
      email: 'dev@mpilo.live',
      productName: "Handmade Fresh Tuna",
      department: "Automotive",
      price: "958.00",
      productMaterial: "Rubber"
    },
    {
      id: 10,
      email: 'dev@mpilo.live',
      productName: "Rustic Plastic Shoes",
      department: "Baby",
      price: "148.00",
      productMaterial: "Fresh"
    },
    {
      id: 11,
      email: 'dev@mpilo.live',
      productName: "Unbranded Plastic Salad",
      department: "Jewelery",
      price: "623.00",
      productMaterial: "Frozen"
    },
    {
      id: 12,
      email: 'dev@mpilo.live',
      productName: "Gorgeous Granite Soap",
      department: "Home",
      price: "574.00",
      productMaterial: "Concrete"
    },
    {
      id: 13,
      email: 'dev@mpilo.live',
      productName: "Generic Soft Fish",
      department: "Home",
      price: "711.00",
      productMaterial: "Rubber"
    },
    {
      id: 14,
      email: 'dev@mpilo.live',
      productName: "Gorgeous Frozen Pants",
      department: "Jewelery",
      price: "255.00",
      productMaterial: "Soft"
    },
    {
      id: 15,
      email: 'dev@mpilo.live',
      productName: "Incredible Wooden Sausages",
      department: "Beauty",
      price: "232.00",
      productMaterial: "Granite"
    },
    {
      id: 16,
      email: 'dev@mpilo.live',
      productName: "Sleek Frozen Mouse",
      department: "Movies",
      price: "935.00",
      productMaterial: "Steel"
    },
    {
      id: 17,
      email: 'dev@mpilo.live',
      productName: "Rustic Frozen Hat",
      department: "Automotive",
      price: "645.00",
      productMaterial: "Plastic"
    },
    {
      id: 18,
      email: 'dev@mpilo.live',
      productName: "Generic Frozen Pizza",
      department: "Games",
      price: "804.00",
      productMaterial: "Soft"
    },
    {
      id: 19,
      email: 'dev@mpilo.live',
      productName: "Handcrafted Granite Fish",
      department: "Beauty",
      price: "168.00",
      productMaterial: "Cotton"
    },
    {
      id: 20,
      email: 'dev@mpilo.live',
      productName: "Ergonomic Fresh Bike",
      department: "Electronics",
      price: "508.00",
      productMaterial: "Fresh"
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