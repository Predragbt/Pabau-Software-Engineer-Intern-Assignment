import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>{t("not_found_title")}</h1>
      <p>{t("not_found_message")}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        {t("go_home")}
      </button>
    </div>
  );
};
