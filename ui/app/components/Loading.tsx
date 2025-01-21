export const Loading = () => {
  return (
    <div className="m-auto flex justify-center items-center min-h-[250px]">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <h1 className="sr-only">Loading...</h1>
        <div className="ripple border-black animate-ripple absolute h-8 w-8 rounded-full border-2"></div>
        <div className="ripple border-black animate-ripple-delay absolute h-8 w-8 rounded-full border-2"></div>
      </div>
    </div>
  );
};
