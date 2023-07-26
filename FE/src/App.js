import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/common/nav/Navbar";
import Routers from "./pages/Routers";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div>
        <BrowserRouter>
          <Header />
          <div>
            <Navbar />
            <div>
              <Routers />
            </div>
          </div>
          <Footer />
        </BrowserRouter>
    </div>
  )
}

export default App;
