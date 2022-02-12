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

const date = new Date();

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
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Fantastic Steel Fish",
      category: "Movies",
      price: 681.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 2,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Gorgeous Plastic Cheese",
      category: "Computers",
      price: 480.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 3,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Refined Cotton Pants",
      category: "Automotive",
      price: 229.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 4,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Ergonomic Steel Salad",
      category: "Beauty",
      price: 568.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 5,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Gorgeous Metal Chips",
      category: "Grocery",
      price: 689.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 6,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Unbranded Plastic Gloves",
      category: "Beauty",
      price: 922.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 7,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Handcrafted Rubber Sausages",
      category: "Grocery",
      price: 196.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 8,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Gorgeous Steel Sausages",
      category: "Outdoors",
      price: 881.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 9,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Handmade Fresh Tuna",
      category: "Automotive",
      price: 958.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 10,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Rustic Plastic Shoes",
      category: "Baby",
      price: 148.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 11,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Unbranded Plastic Salad",
      category: "Jewelery",
      price: 623.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 12,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Gorgeous Granite Soap",
      category: "Home",
      price: 574.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 13,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Generic Soft Fish",
      category: "Home",
      price: 711.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 14,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Gorgeous Frozen Pants",
      category: "Jewelery",
      price: 255.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 15,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Incredible Wooden Sausages",
      category: "Beauty",
      price: 232.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 16,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Sleek Frozen Mouse",
      category: "Movies",
      price: 935.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 17,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Rustic Frozen Hat",
      category: "Automotive",
      price: 645.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 18,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Generic Frozen Pizza",
      category: "Games",
      price: 804.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 19,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Handcrafted Granite Fish",
      category: "Beauty",
      price: 168.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },
    {
      id: 20,
      postedBy: 'MpiloX',
      email: 'dev@mpilo.live',
      title: "Ergonomic Fresh Bike",
      category: "Electronics",
      price: 508.00,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
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