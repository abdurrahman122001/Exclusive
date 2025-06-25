// pages/_app.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab }    from "@fortawesome/free-brands-svg-icons";
import { far }    from "@fortawesome/free-regular-svg-icons";
import { fas }    from "@fortawesome/free-solid-svg-icons";

import AOS        from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import axios      from "axios";
import Router     from "next/router";
import NProgress  from "nprogress";
import "nprogress/nprogress.css";

import Toaster            from "../src/components/Helpers/Toaster";
import DefaultLayout      from "../src/components/Partials/DefaultLayout";
import MaintenanceWrapper from "../src/components/Partials/Headers/MaintenanceWrapper";
import LoginContext       from "../src/components/Contexts/LoginContexts";

import store from "../src/store/store";

import auth, { setAuth } from "../utils/auth";

import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/selectbox.css";

// NProgress loading indicator on route changes
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());

// add FontAwesome icons
library.add(fas, fab, far);

function MyApp({ Component, pageProps }) {
  const [loginPopup, setLoginPopup] = useState(false);

  // toggle login popup
  const handlerPopup = (value) => setLoginPopup(value);

  // initialize AOS animations once
  useEffect(() => {
    AOS.init();
  }, []);

  // on first load, if there's no auth payload, call our guest-login endpoint
  useEffect(() => {
    if (!auth()) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/guest-login`)
        .then(({ data }) => {
          // data contains { access_token, token_type, expires_in, is_vendor, user }
          setAuth(data);
        })
        .catch((err) => {
          console.error("Guest login failed:", err);
        });
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <LoginContext.Provider
          value={{ loginPopup, handlerPopup }}
        >
          <DefaultLayout>
            <MaintenanceWrapper>
              <Component {...pageProps} />
            </MaintenanceWrapper>
          </DefaultLayout>
        </LoginContext.Provider>
      </Provider>
      <Toaster />
    </>
  );
}

export default MyApp;
