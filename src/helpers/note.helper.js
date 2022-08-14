import dayjs from 'dayjs';

export default {
  formatDate: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
};
