import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import "./restaurants.css"; // Import the CSS file

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

function Restaurants() {
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div className="restaurants-container">
      <form className="search-form w-full py-40 mx-auto bg-primary text-secondary flex items-center justify-center">
        <input
          type="search"
          className="search-input w-5/12 px-5 py-3 border-2 border-slate-950 rounded-md focus:outline-none text-slate-950 font-bold transition-colors duration-200 ease-in-out"
          placeholder="Search Restaurants..."
        />
      </form>
    </div>
  );
}

export default Restaurants;
