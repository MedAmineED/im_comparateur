
"use client";

import axios from "axios";
import Page from "./home/page";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function Home() {
  return (
    <Page />
  );
}
