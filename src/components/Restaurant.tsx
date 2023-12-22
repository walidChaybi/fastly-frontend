import React from "react";

function Restaurant({ restaurant }) {
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${restaurant.coverImage})` }}
        className="bg-cover bg-center mb-3 py-28"
      ></div>
      <h3 className="text-lg font-medium">{restaurant.name}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
        {restaurant.category?.name}
      </span>
    </div>
  );
}

export default Restaurant;
