export function Aside() {
  return (
    <aside className="w-auto bg-[#24232C] border-r border-r-[#817D92] py-12 px-6">
      <h2 className="text-center text-xl pb-6">Passwords</h2>

      <ul className="flex flex-col justify-start items-center gap-6">
        <li className="flex items-center justify-center gap-4">
          <div className="bg-[#A4FFAF] w-8 h-8 rounded-lg"></div>
          <div className="flex flex-col">
            <h5 className="text-base font-medium">Google</h5>
            <p className="text-xs text-[#A4FFAF]">lucaspedro517@gmail.com</p>
          </div>
        </li>

        <li className="flex items-center justify-center gap-4">
          <div className="bg-[#A4FFAF] w-8 h-8 rounded-lg"></div>
          <div className="flex flex-col">
            <h5 className="text-base font-medium">Google</h5>
            <p className="text-xs text-[#A4FFAF]">lucaspedro517@gmail.com</p>
          </div>
        </li>
      </ul>
    </aside>
  );
}
