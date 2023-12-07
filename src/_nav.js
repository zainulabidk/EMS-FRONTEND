import React from 'react'
import CIcon from '@coreui/icons-react'
import { CBadge } from '@coreui/react';

import {
  cilBriefcase,
  cilLink,
  cilChatBubble,
  cilPhone,
  cilCart,
  cilGlobeAlt,
  cilBuilding,
  cilPuzzle,
  cilLifeRing,
  cilList,
  cilSpeedometer,

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },

 {
    component: CNavItem,
    name: 'Enquiries',
    to: '/EnquiryManagement',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Licensee',
    to: '/Licensee',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'My Team',
    to: '/MyTeam',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  
  },

  {
    component: CNavItem,
    name: 'Support Enquiry',
    to: '/SupportEnquiry',
    icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
  
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/Settings',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Enquiry Mode',
        to: '/Settings/EnquiryMode',
        icon:   <CIcon icon={cilPhone}  customClassName="nav-icon"   />
      
       
      },

      {
        component: CNavItem,
        name: 'Enquiry Type',
        to: '/Settings/EnquiryType',
        icon:   <CIcon icon={cilPhone}  customClassName="nav-icon"   />

       
      },
      {
        component: CNavItem,
        name: 'Enquiry Source',
        to: '/Settings/EnquirySource',
        icon:  <CIcon icon={cilLink}  customClassName="nav-icon"   />
        

      },

      {
        component: CNavItem,
        name: 'Support Type',
        to: '/Settings/SupportType',
        icon:  <CIcon icon={cilChatBubble} customClassName="nav-icon"   />
      },
    

      {
        component: CNavItem,
        name: 'Org Type',
        to: '/Settings/OrgType',
        icon: <CIcon icon={cilBuilding}  customClassName="nav-icon"   />

      
      },

      {
        component: CNavItem,
        name: 'Org Category',
        to: '/Settings/OrgCategory',
        icon:  <CIcon icon={cilGlobeAlt} customClassName="nav-icon"   />
      
      },
      {
        component: CNavItem,
        name: 'Product Services',
        to: '/Settings/ProductServices',
       icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />
      
      },
      {
        component: CNavItem,
        name: 'User Roles',
        to: '/Settings/userroles',
       icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />
      
      },
    ],
  },
]
export default _nav
