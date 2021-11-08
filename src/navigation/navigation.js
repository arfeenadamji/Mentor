import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import Auth from "../Auth/auth";
import Register from "../Auth/register";
import Temp from "../component/temp";


const AuthNavigator = createStackNavigator(
  {
    Auth: Auth,
    Register:Register
  },
  {
    initialRouteName: "Auth",
    defaultNavigationOptions: {
      title: "Mentor",
      headerTintColor: "black",
      headerStyle: { backgroundColor: '#06bcee' },    },
  }
);
const DrawerNavigator = createDrawerNavigator(
  {
    tem:Temp
    
 
  },
  {
    initialRouteName: "tem",
    // drawerPosition:'right'
  }
);

export default createAppContainer(
  createSwitchNavigator({
    AuthStack: AuthNavigator,
    HomeStack: DrawerNavigator,
  })
);
