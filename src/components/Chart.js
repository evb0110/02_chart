import React from 'react';

export default function Chart({
  serie,
  serieIndex,
  compareNumbers,
  labels,
  colors,
  max,
  classType
}) {
  var sortedSerie = serie.slice(0);

  sortedSerie.sort(compareNumbers);

  return (
    <div className={`Charts--serie ${classType}`} key={serieIndex} style={{ height: 250 }}>
      <label>{labels[serieIndex]}</label>
      {serie.map((item, itemIndex) => {
        var color = colors[itemIndex],
          style,
          size = (item / max) * 100;

        style = {
          backgroundColor: color,
          opacity: item / max + 0.05,
          zIndex: item,
          height: size + '%',
        };

        return (
          <div className={`Charts--item ${classType}`} style={style} key={itemIndex}>
            <b style={{ color: color }}>{item}</b>
          </div>
        );
      })}
    </div>
  );
}
