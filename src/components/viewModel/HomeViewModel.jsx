import React from "react";
import { observer } from "mobx-react";
import HomeView from "../view/HomeView";

const HomeViewModel = observer(() => {
  return <HomeView />;
});

export default HomeViewModel;
