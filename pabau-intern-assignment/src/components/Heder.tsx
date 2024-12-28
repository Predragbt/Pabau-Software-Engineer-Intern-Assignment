import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header bg-dark py-3">
      <p
        className="text-center text-white fs-2 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </p>
    </div>
  );
};
