import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/common/nav/Navbar";
import Routers from "./pages/Routers";
// import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import "./styles/MainStyle.scss"

function App() {
  return (
    <div>
        <BrowserRouter>
          {/*<Header />*/}
          <Navbar />
          <div>

            <div className="main_body">
              <Routers />
              <Footer />
            </div>
          </div>

        </BrowserRouter>
    </div>
  )
}

export default App;
