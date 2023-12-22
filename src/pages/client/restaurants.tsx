import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import "./restaurants.css"; // Import the CSS file
import Categories from "../../components/Categories";
import Restaurant from "../../components/Restaurant";

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
  const { data } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  console.log(data);

  const {
    restaurants: { results },
  } = data || { restaurants: { results: null } };

  const {
    allCategories: { categories },
  } = data || { allCategories: { categories: null } };

  return (
    <div className="">
      <form className="search-form w-full text-center p-4 py-28 bg-primary">
        <input
          type="search"
          className="search-input w-full p-4 md:w-5/12 py-3 border-2 border-slate-950 rounded-md focus:outline-none text-slate-950 font-bold transition-colors duration-200 ease-in-out"
          placeholder="Search Restaurants..."
        />
      </form>
      <div className="w-full max-w-7xl mx-auto p-4">
        <ul className=" gap-3 flex w-full text-slate-900 rounded-lg overflow-x-scroll no-scrollbar">
          {categories?.map((category) => {
            return <Categories category={category} key={category.id} />;
          })}
        </ul>
      </div>
      <div>
        <div className="w-full max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-slate-900">Restaurants</h2>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {results?.map((restaurant) => (
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
