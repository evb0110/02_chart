import React from 'react';

export default function Chart1({
  serie,
  compareNumbers,
  serieIndex,
  series,
  labels,
  colors,
  max,
  classType,
  sum,
  right,
  height,
  horizontal,
}) {
  var sortedSerie = serie.slice(0);

  sortedSerie.sort(compareNumbers);

  return (
    <div
      className={`Charts--serie ${classType}`}
      key={serieIndex}
      style={{ height: height ? height : 250 }}
    >
      <label>{horizontal ? series[serieIndex] : labels[serieIndex]}</label>
      {serie.map((item, itemIndex) => {
        var color = colors[itemIndex],
          style,
          size = (item / (sum ? sum : max)) * 100;

        style = {
          backgroundColor: color,
          opacity: item / max + 0.05,
          zIndex: item,
          height: height ? size + '%' : null,
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
