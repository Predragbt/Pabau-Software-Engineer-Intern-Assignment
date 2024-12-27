import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <footer className="footer bg-dark text-center py-4 fixed-bottom">
      <div className="container d-flex justify-content-center">
        <div className="language-switcher">
          <label htmlFor="language-select" className="me-2">
            {t("language")}:
          </label>
          <select
            id="language-select"
            className="form-select form-select-sm d-inline w-auto"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
