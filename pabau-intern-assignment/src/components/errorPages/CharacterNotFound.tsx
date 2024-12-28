import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const CharacterError = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>{t("character_not_found_title", "Character Not Found")}</h1>
      <p>
        {t(
          "character_not_found_message",
          "The character you are looking for does not exist."
        )}
      </p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        {t("go_home", "Go Home")}
      </button>
    </div>
  );
};
