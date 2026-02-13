import "./index.css";

const SkillsCard = (props) => {
  const { skillDetails } = props;
  const { name, imageUrl } = skillDetails;
  return (
    <li className="skills-card">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  );
};

export default SkillsCard;
