

export const formatDate = (isoDate) => {        
    const date = new Date(isoDate);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };      
    return date.toLocaleDateString('ru-RU', options);
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};