function Categories({ category }) {
  return (
    <li
      key={category.id}
      className="mx-auto max-w-[60px] min-w-[80px] gap-6 cursor-pointer hover:scale-110 duration-300 flex flex-col "
    >
      <img
        className="shadow-xl rounded-full mx-auto"
        src={
          category.coverImage ||
          "https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/Travel-pict-dinner.png"
        }
        alt={category.name}
      />
      <p className="text-xs font-bold text-center capitalize">
        {category.name}
      </p>
    </li>
  );
}

export default Categories;
