import React from "react";
import {PublicRoutes} from "./public"
import {PrivateRoutes} from "./private"
import {useApp} from "../hooks"


function Routes() {
    const {token} = useApp()
    if (token) {
      return <PrivateRoutes/>
    }
    return (
        <PublicRoutes/>
    )
};

export default Routes