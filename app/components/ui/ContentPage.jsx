export default function ContentPage({ children }) {
  return (
    <div className="w-full max-w-5xl py-8 px-6 backdrop-blur filter border-2 border-gray-400 border-opacity-20 rounded-xl flex flex-col justify-start items-start shadow-xl">
      <div className="w-full flex justify-between items-end">
        <h1 className="font-light text-4xl text-violet-600">
          <span className="font-bold text-gray-500">MH</span> Automation
        </h1>
        <span className="text-xl">
          <span className="text-violet-400 font-bold">v</span>1.0.0
        </span>
      </div>
      <div className="mt-16 h-full w-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
