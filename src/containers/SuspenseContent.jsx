function SuspenseContent() {
  return (
    <div className="w-full h-screen text-gray-300 dark:text-gray-200 bg-base-100">
      <div className="hero pt-10">
        <span className="loading loading-bars loading-lg"></span>
        Loading...
      </div>
    </div>
  );
}

export default SuspenseContent;
