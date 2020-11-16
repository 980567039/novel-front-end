import axios from '../utils/interactive';

// 获取小说分类
const getNovelCategory = _ => axios.get('/getNovelCategory', _);

// post
const postAny = _ => axios.post('/api', _);

export {
  getNovelCategory,
  postAny
};
