import axios from '../utils/interactive';

// 获取小说分类
const getNovelCategory = _ => axios.get('/getNovelCategory', _);

// 获取小说排行榜
const getNovelRank = _ => axios.get('/getNovelRank', _);

// 根据分类获取小说
const getNovelList = params => axios.get('/getNovelList', { params: params });

// 获取小说详情
const getNovelInfo = params => axios.get('/getNovelInfo', { params: params });

// 获取小说章节
const getNovelChapter = params => axios.get('/getNovelChapter', { params: params });

// 获取章节内容
const getChapterContent = params => axios.get('/getChapterContent', { params: params });

// post
// const postAny = _ => axios.post('/api', _);

export {
  getNovelCategory,
  getNovelRank,
  getNovelList,
  getNovelInfo,
  getNovelChapter,
  getChapterContent
};
