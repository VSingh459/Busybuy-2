
import NavBar from '../../components/NavBar/NavBar.js';
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar.js";
import "./HomePage.css";
import PList from '../../components/Product/ProductList.js';

function HomePage() {

     return(
      <>
       <FilterSidebar />
       <form className="form">
        <input
          type="search"
          placeholder="Search By Name"
          className="searchInput"
        />
      </form>
      <PList />
      </>
       
     )
}

export default HomePage;