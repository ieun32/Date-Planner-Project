// A(아침), M(저녁), N(야간), D(전일), X(휴일)
const dayShift = "XDDDDDX"; // 7일이 1사이클
const twoShift_1 = "DDNNXX"; // 6일이 1사이클
const twoShift_2 = "XXDDNN";
const twoShift_3 = "DDNNXX";
const threeShift_1 = "XAAAXXMMMXXNNNX"; //15일이 1사이클
const threeShift_2 = "XXNNNXXAAAXXMMM";
const threeShift_3 = "AXXMMMXXNNNXXAA";
const threeShift_4 = "NNXXAAAXXMMMXXN";
const threeShift_5 = "MMMXXNNNXXAAAXX";

export const SCHEDULE_TYPE = {
  dayShift: dayShift,
  twoShift_1: twoShift_1,
  twoShift_2: twoShift_2,
  twoShift_3: twoShift_3,
  threeShift_1: threeShift_1,
  threeShift_2: threeShift_2,
  threeShift_3: threeShift_3,
  threeShift_4: threeShift_4,
  threeShift_5: threeShift_5,
};
