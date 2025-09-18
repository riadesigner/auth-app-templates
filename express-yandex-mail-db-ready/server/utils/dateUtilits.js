
module.exports.formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};