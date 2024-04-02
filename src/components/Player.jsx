import { useState } from "react";

export default function Player({ defaultName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(defaultName);

  const handleEdit = () => {
    setIsEditing(editing => !editing);
    if (isEditing) onChangeName(symbol, name);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? <input type="text" value={name} onChange={event => setName(event.target.value)} required /> 
                   : <span className="player-name">{name}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}