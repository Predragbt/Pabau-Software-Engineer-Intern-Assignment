import { isRouteErrorResponse, useRouteError } from "react-router";

export const GlobalError = () => {
  const error = useRouteError();

  return (
    <div className="text-center mt-5">
      <h1>Something went wrong</h1>
      <p>
        {isRouteErrorResponse(error)
          ? error.statusText
          : "An unexpected error occurred. Please try again later."}
      </p>
      <button
        onClick={() => window.location.assign("/")}
        className="btn btn-primary mt-3"
      >
        Go to Home
      </button>
    </div>
  );
};
