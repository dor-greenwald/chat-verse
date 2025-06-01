import "./header.scss";

interface HeaderProps {
  title: string;
  level: number;
  xp: number;
}

export const Header = ({ title, level, xp }: HeaderProps) => {
  return (
    <div className="header">
      <img className="menu-icon" src="/images/icons/menu.svg" alt="menu" />
      <div className="header-info">
        <h1 className="header-title">{title}</h1>
        <span className="header-level-xp">
          <p className="level">Level {level}</p> | <p className="xp">{xp} XP</p>
        </span>
      </div>
    </div>
  );
};
