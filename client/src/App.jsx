import { Suspense, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Website from "./pages/Website";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Properties from "./pages/Properties/Properties";
import {QueryClient, QueryClientProvider} from 'react-query';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ReactQueryDevtools} from 'react-query/devtools'
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";


//query client is a data fetching tool. it manages the state of query and query lifecycle 
function App() {
  const queryClient=new QueryClient()
  const [userDetails, setUserDetails]=useState({
    favourites:[],
    bookings:[],
    token:null,
  })

  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}> {/* so that user is available/can access throughout the application */}
    <QueryClientProvider client={queryClient} >
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}> 
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Website />} />
        <Route path="/properties">
          <Route index element={<Properties />} />
          <Route path=":propertyId" element={<Property />} />
        </Route>
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
      
    </Routes>
    </Suspense>
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}
// fallback is used when heavy js is used and its taking time to load then Loading should be displayed
// layout is the component that will be common across all pages..like header and footer
export default App;
