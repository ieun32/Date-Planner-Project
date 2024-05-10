export default class DatePlanner {
  /**
   * 기준 날짜로부터 몇 일 차이나는 지 계산해 일수를 반환
   * @param {Date} date 월의 첫번째 날짜
   * @returns 기준 날짜로부터 차이나는 일수 반환
   */
  static getDiffInDays(date) {
    const standard = new Date(2023, 0, 1);
    const diff = Math.floor(
      (date.getTime() - standard.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff;
  }

  static getStartIdxOfPattern(pattern, diff) {
    const length = pattern.length;
    const index = diff % length;
    return index;
  }

  static getMonthPattern(pattern, startIdx, Days) {
    let i = 0;
    const patternArr = Array.from(pattern);
    while (i !== startIdx) {
      patternArr.push(patternArr.shift());
      i++;
    }
    const monthPattern = new Array(Days).fill("").map((_, i) => {
      return patternArr[i % pattern.length];
    });
    return monthPattern;
  }

  static findDatedays(boyPattern, girlPattern, Days) {
    const dateDays = [];
    let i = 0;
    while (i <= Days) {
      if (boyPattern[i] === "X" && girlPattern[i] === "X") {
        dateDays.push(i + 1);
        if (
          (boyPattern[i + 1] === "X" && girlPattern[i + 1] === "X") ||
          (boyPattern[i + 1] === "X" && girlPattern[i + 1] === "N") ||
          (boyPattern[i + 1] === "N" && girlPattern[i + 1] === "X") ||
          (boyPattern[i + 1] === "N" && girlPattern[i + 1] === "N")
        ) {
          dateDays.push(i + 1);
          dateDays.push(i + 2);
          dateDays.push(i + 2);
          i = i + 2;
          continue;
        }
      }
      i++;
    }
    // new Array(Days).fill(0).map((_, i) => {
    //   if (boyPattern[i] === "X" && girlPattern[i] === "X") {
    //     dateDays.push(i + 1);
    //     if (
    //       (boyPattern[i + 1] === "X" && girlPattern[i + 1] === "X") ||
    //       (boyPattern[i + 1] === "X" && girlPattern[i + 1] === "N") ||
    //       (boyPattern[i + 1] === "N" && girlPattern[i + 1] === "X") ||
    //       (boyPattern[i + 1] === "N" && girlPattern[i + 1] === "N")
    //     ) {
    //       dateDays.push(i + 1);
    //       dateDays.push(i + 2);
    //     }
    //   }
    // });

    return dateDays;
  }
}

// 2023년 1월 1일 기준 해당 달의 첫번째 날짜가 몇일차이 나는 지 계산하기 <-- 현재 달의 첫번째 일자 정보 필요
// 2023년 2월 1일은 1월 1일과 31일 차이남

// 패턴이 XXDDNN 이거며는 패턴 길이가 6이고 <-- 현재 고른 패턴 정보/ 차이나는 일자 정보 필요
// 31 % 6 = 1
// 차이나는 일자에 패턴 길이를 나누면 어떤 인덱스부터 시작해야 할 지 알 수 있음
// 즉 XXDDNN 중 인덱스 2부터 해당 달의 1일부터 패턴 시작 즉 DDNNXXDDNNXX.. 이렇게 진행

// 해당 달의 패턴을 만들기 위해 원래 패턴에서 시작 인덱스까지 뒤로 보냄 DDNNXX <-- 패턴 시작 인덱스 정보 필요
// 그리고 해당 달의 날짜 개수만큼 (31일이면 길이가 31이 될 때까지) <-- 현재 달의 일자 개수 필요
// 패턴 길이만큼 반복하면서 뒤에 패턴 붙이기 pattern.push(pattern[0]) ~ pattern.push(pattern[5]) 31까지 반복하는데 인덱스에 6을 나눈 나머지를 인덱스로 쓰면 됨

// 그러면 길이가 31인 패턴 남친거 여친거 비교하면서 겹치는 휴일 계산 <-- 만들어진 패턴 두 개 필요
// 연속해서 이틀이 겹치는 일자 처리를 해줘야함 겹치는 일자 배열에 이틀 겹치면 [1, 2, 2, 3, 3, 4, 5] 이런식으로 두 번씩 넣어준다 이전 연산이랑 동시에 수행

// 겹치는 휴일 일자에 하이라이팅을 할 건데 이미 클래스 네임에 하이라이팅이 있는데 또 하이라이팅 해야 하는 경우 기존 하이라이팅 지우고 더블 하이라이팅 클래스네임 추가해준다.
