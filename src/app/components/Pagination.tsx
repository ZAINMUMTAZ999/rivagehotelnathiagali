

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <ul className="flex flex-wrap gap-2 border border-slate-300 rounded-md p-2 bg-white  shadow-sm">
        {pageNumbers.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md border transition-all hover:cursor-pointer duration-150 
                ${
                  page === p
                    ? "bg-blue-600 text-white border-blue-500"
                    : " active:bg-slate-500 active:text-slate-700 scale-95 bg-white text-black hover:bg-blue-700 hover:cursor-pointer hover:text-white  border-gray-300"
                }`}
            >
              
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;