import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import SidebarLayoutAdmin from 'src/layouts/SidebarLayoutAdmin';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );




// Pages



// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications


const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// ---------------------- partie employee -------------------------  

const LoginEmployee = Loader(lazy(() => import('src/components/Login/LoginEmployee')));
const ForgotPassword = Loader(lazy(() => import('src/components/Login/ForgotPassword')));
const Login = Loader(lazy(() => import('src/components/Login/Login')));

const AjouterConge = Loader(
  lazy(() => import('src/components/Employee/Conge/AjouterConge'))
);

const ListeConge = Loader(
  lazy(() => import('src/components/Employee/Conge/AffichageConge'))
);


const ListeCongeA = Loader(
  lazy(() => import('src/components/Employee/Conge/ListCongeA'))
);

const ListeCongeR = Loader(
  lazy(() => import('src/components/Employee/Conge/ListCongeR'))
);

const ListeCongeE = Loader(
  lazy(() => import('src/components/Employee/Conge/ListCongeE'))
);

const ListeAutorisationE = Loader(
  lazy(() => import('src/components/Employee/Autorisation/ListAutorisationE'))
);

const ListeAutorisationA = Loader(
  lazy(() => import('src/components/Employee/Autorisation/ListAutorisationA'))
);

const ListAutorisationR = Loader(
  lazy(() => import('src/components/Employee/Autorisation/ListAutorisationR'))
);

const ModifierConge = Loader(
  lazy(() => import('src/components/Employee/Conge/ModifierConge'))
);

const DashboardEmployee  = Loader(
  lazy(() => import('src/components/Employee/Dashboard/index'))
); 


// ------------------------ partie Admin -------------------

const DashboardAdmin  = Loader(
  lazy(() => import('src/components/Admin/Dashboard/index'))
); 



const LoginAdmin = Loader(lazy(() => import('src/components/Admin/Login/LoginAdmin')));

const ChoixSociete = Loader(lazy(() => import('src/components/Admin/ChoixSociete')));

const DataGrid = Loader(lazy(() => import('src/components/Admin/Datagrid')));

const ListTypeConge = Loader(lazy(() => import('src/components/Admin/TypeConge/ListTypeConge.js')));

const AjouterCongeADMIN = Loader(lazy(() => import('src/components/Admin/Conge/AjouterCongeADMIN')));


const ListeCongeARADMIN = Loader(
  lazy(() => import('src/components/Admin/Conge/AllConge'))
);

const ListeCongeEADMIN = Loader(
  lazy(() => import('src/components/Admin/Conge/ListCongeE'))
);
const ListeCongeAADMIN = Loader(
  lazy(() => import('src/components/Admin/Conge/ListCongeA'))
);
const ListeCongeRADMIN = Loader(
  lazy(() => import('src/components/Admin/Conge/ListCongeR'))
);

const AjouterEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/AjouterEmployee'))
);

const AfficherEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/AfficherEmployee/ListEmployee'))
);

const MyComponent = Loader(
  lazy(() => import('src/components/Admin/Employee/MyComponent'))
);

const CongeEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/AfficherEmployee/CongeEmployee'))
);


const ModifierEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/ModifierEmployee'))
);

const AutorisationEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/AfficherEmployee/AutorisationEmployee'))
);



const DetailsEmployee = Loader(
  lazy(() => import('src/components/Admin/Employee/AfficherEmployee/DetailsEmployee'))
);



const CustomizedSnackbars = Loader(
  lazy(() => import('src/components/Admin/Employee/CustomizedSnackbars'))
);


const ResetPasswordForm  = Loader(
  lazy(() => import('src/components/Admin/Employee/ResetPasswordForm '))
);

const ListAutorisationE  = Loader(
  lazy(() => import('src/components/Admin/Autorisation/ListAutorisationE'))
);
const ListAutorisationA  = Loader(
  lazy(() => import('src/components/Admin/Autorisation/ListAutorisationA'))
);
const ListeAutorisationR  = Loader(
  lazy(() => import('src/components/Admin/Autorisation/ListAutorisationR'))
);

const Payement  = Loader(
  lazy(() => import('src/components/Admin/Payement/payement'))
);

const PayementDetails  = Loader(
  lazy(() => import('src/components/Admin/Payement/DetailPayement'))
);

const AjouterAutorisationADMIN = Loader(lazy(() => import('src/components/Admin/Autorisation/AjouterAutorisationADMIN')));



const routes = [

  // ---------------------- partie employee -------------------------
  {
    path: '',
    element: <BaseLayout />,
    children: [

      
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/ForgotPassword',
        element: <ForgotPassword />
      },

      {
        path: '/',
        element: <LoginEmployee />
      },
      {
        path: 'LoginEmployee',
        element: <Navigate to="/" replace />
      },
     
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  {
    path: 'dashboard-employee',
    element: <SidebarLayout />,
    children: [
     
      {
        path: 'home',
        element: <DashboardEmployee />
      },
   
    ]
  },





  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
   
    ]
  },


  {
    path: 'Conge',
    element: <SidebarLayout />,
    children: [
 
    {
      path:'AjouterConge',
      element:<AjouterConge /> 
    },
    {
      path:'ListeConge',
      element:<ListeConge /> 
      
    },
    {
      path:'ListeCongeA',
      element:<ListeCongeA /> 
      
    },
    {
      path:'ListeCongeR',
      element:<ListeCongeR /> 
      
    },
    {
      path:'ListeCongeE',
      element:<ListeCongeE /> 
      
    },
    {
      path:'ListeAutorisationE',
      element:<ListeAutorisationE /> 
      
    },
    
    {
      path:'ModifierConge',
      element:<ModifierConge /> 
      
    }
    ]
  },



  {
    path: 'Autorisation',
    element: <SidebarLayout />,
    children: [
 
    
   
    {
      path:'ListeAutorisationA',
      element:<ListeAutorisationA /> 
      
    },
    {
      path:'ListeAutorisationR',
      element:<ListAutorisationR /> 
      
    },
    
    {
      path:'ListeAutorisationE',
      element:<ListeAutorisationE /> 
      
    },
    
   
    ]
  },

  // ------------------------ partie admin -----------------------------

  
  
  {
    path: '/LoginAdmin',
    element: <LoginAdmin />
  },
     
  {
    path: '/ChoixSociete',
    element: <ChoixSociete />
  },

  {
    path: '/DataGrid',
    element: <DataGrid />
  },

  {
    path: 'dashboard-admin',
    element: <SidebarLayoutAdmin />,
    children: [
     
      {
        path: 'home',
        element: <DashboardAdmin />
      },
   
    ]
  },


  {

    path: 'CongeAdmin',
    element: <SidebarLayoutAdmin />,
    children: [
      {
        path:'AjouterCongeADMIN',
        element:<AjouterCongeADMIN />
      },
      {
        path:'ListeCongeAR',
        element:<ListeCongeARADMIN />
      },
      {
        path:'ListeCongeA',
        element:<ListeCongeAADMIN /> 
        
      },
      {
        path:'ListeCongeR',
        element:<ListeCongeRADMIN /> 
        
      },
      {
        path:'ListeCongeE',
        element:<ListeCongeEADMIN /> 
        
      },
    ]
  },
  {
    path: 'Employee',
    element: <SidebarLayoutAdmin />,
    children: [
 
    {
      path:'AjouterEmployee',
      element:<AjouterEmployee /> 
    },

    {
      path:'AfficherEmployee',
      element:<AfficherEmployee /> 
    },
       
    {
      path:'AutorisationEmployee',
      element:<AutorisationEmployee /> 
      
    },

    {
      path:'MyComponent',
      element:<MyComponent /> 
    },
    
    {
      path:'CongeEmployee',
      element:<CongeEmployee /> 
      
    },
    {
      path:'ModifierEmployee',
      element:<ModifierEmployee /> 
    },
    {
      path:'DetailsEmployee',
      element:<DetailsEmployee /> 
    },
    {
      path:'ResetPasswordForm',
      element:<ResetPasswordForm /> 
    },
    
    {
      path:'CustomizedSnackbars',
      element:<CustomizedSnackbars /> 
    },
    
    ]
  },


  {
    path: 'TypeConge',
    element: <SidebarLayoutAdmin />,
    children: [
 
    {
      path:'ListTypeConge',
      element:<ListTypeConge /> 
    },

  
    ]
  },

  {
    path: 'Autorisations',
    element: <SidebarLayoutAdmin />,
    children: [
      {
        path:'AjouterAutorisationADMIN',
        element:<AjouterAutorisationADMIN />
      },
 
    {
      path:'ListeAutorisationE',
      element:<ListAutorisationE /> 
    },
    {
      path:'ListeAutorisationA',
      element:<ListAutorisationA /> 
    },
    {
      path:'ListeAutorisationR',
      element:<ListeAutorisationR /> 
    },

  
    ]
  },

  {
    path: '',
    element: <SidebarLayoutAdmin />,
    children: [
 
      {
        path:'payement',
        element:<Payement /> 
      },
      {
        path:'payement-details',
        element:< PayementDetails /> 
      },
     
  
    ]
  },


   
    
 
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
 
      {
        path: 'transactions',
        element: <Transactions />
      },
     
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          },
         
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ] 
  },



];

export default routes;
