 // bu iki dizi arasında aynı olan elemanları bulup birleştirir eğer aynı yoksa onu ekler sonrasında dönen objeyi diziye çevirip sunar
  export const mergeArrays = (arr1: any[], arr2: any[]) => {
    const combined = [
      ...arr1,
      ...arr2.map((item) => ({ ...item, id: item.id })),
    ];
    const uniqueById = combined.reduce((acc, item) => {
      acc[item.id] = { ...acc[item.id], ...item };
      return acc;
    }, {});
    return Object.values(uniqueById);
  };