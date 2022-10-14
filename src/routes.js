/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.js';
import Users from 'views/users/Users';
import Services from 'views/services/Services';
import Packages from 'views/packages/Packages'
import Categories from 'views/categories/Categories'
import Register from 'views/Register.js';
import Login from 'views/Login.js';

var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/staff',
    name: 'Manage Staff',
    icon: 'ni ni-single-02 text-primary',
    component: Users,
    layout: '/admin',
  },
  {
    path: '/services',
    name: 'Services',
    icon: 'ni ni-single-02 text-primary',
    component: Services,
    layout: '/admin',
  },
  {
    path: '/packages',
    name: 'Packages',
    icon: 'ni ni-single-02 text-primary',
    component: Packages,
    layout: '/admin',
  },
  {
    path: '/categories',
    name: 'Categories',
    icon: 'ni ni-single-02 text-primary',
    component: Categories,
    layout: '/admin',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-key-25 text-info',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-pink',
    component: Login,
    layout: '/auth',
  },
];
export default routes;
