import Header from "../../components/Header";
import Footer from "../../components/Footer";
import underConstruction from '../../images/underconstruction.jpg'

function Home() {
  return (
    <div className="container-fluid">
      <Header />
      <img src={underConstruction} alt="under construction image" />
      <Footer />
    </div>
  );
}

export default Home;