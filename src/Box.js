import React from "react";
import './Box.css'

function Box({
  id,
  handleRemove,
  width = 5,
  height = 5,
  backgroundColor = "blue"
}) {
  const remove = () => handleRemove(id);
  return (
    <div>
      <div id="bxclr"
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor
        }}
      />
      <button onClick={remove} title="Remove The Box!" id='rmvbttn'>X</button>
    </div>
  );
}

export default Box;
