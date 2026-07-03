import { useNavigate } from 'react-router-dom';

interface EntityLinkProps {
  type: 'class' | 'subject';
  id: string | number;
  name: string;
  className?: string;
}

const EntityLink: React.FC<EntityLinkProps> = ({ type, id, name, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // prevent row clicks if inside a table
    if (type === 'class') {
      navigate(`/classes/${id}`);
    } else {
      navigate(`/subject/${id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors ${className}`}
    >
      {name}
    </button>
  );
};

export default EntityLink;
