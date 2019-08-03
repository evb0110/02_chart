import React from 'react';

export default function Chart1({
  serie,
  compareNumbers,
  serieIndex,
  series,
  colors,
  max,
}) {
  var sortedSerie = serie.slice(0);

  sortedSerie.sort(compareNumbers);

  return (
    <div className="Charts--serie" key={serieIndex} style={{ height: 'auto' }}>
      <label>{series[serieIndex]}</label>
      {serie.map((item, itemIndex) => {
        var color = colors[itemIndex],
          style,
          size = (item / max) * 100;

        style = {
          backgroundColor: color,
          opacity: item / max + 0.05,
          zIndex: item,
          width: size + '%',
        };

        return (
          <div className="Charts--item" style={style} key={itemIndex}>
            <b style={{ color: color }}>{item}</b>
          </div>
        );
      })}
    </div>
  );
}
