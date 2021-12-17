/* eslint-disable no-console */import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FullPost } from '../@types';

type FunctionType<T, R> = (value: T) => R; 

const formatDate: FunctionType<string, string> = (value) => {
  const valueAsDate = new Date(value);
  const newValue = format(valueAsDate, 'dd MMM yyyy', {
    locale: ptBR,
  });
  return newValue;
}

const formatUpdateDate: FunctionType<string, string> = (value) => {
  const valueAsDate = new Date(value);
  const newValue = format(valueAsDate, 'dd MMM yyyy HH:mm', {
    locale: ptBR,
  });
  const finalValue = newValue.split(' ');

  return `${finalValue[0]} ${finalValue[1]} ${finalValue[2]} as ${finalValue[3]}`;
}

const getReadTime: FunctionType<FullPost, number> = (post) => {
  try {
    const { content } = post.data;
    let readTime = 0;

    content.forEach(part => {
      part.body.forEach(({ text }) => {
        readTime += String(text).split(' ').length / 200;
      });
    });

    return Math.ceil(readTime);
  } catch (e) {
    console.log(e.message);
    return 0;
  }
}

export { formatDate, formatUpdateDate, getReadTime };
