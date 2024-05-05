import { $calenderBodyItems } from "../constants/tags";

export default class HighLighter {
  constructor() {
    // 날짜 태그들 가져오기
    this.tags = $calenderBodyItems;
  }

  /**
   * 하이라이팅 관련 클래스명 초기화
   */
  initialClassName() {
    this.tags.forEach((tag) => {
      tag.classList.remove("calender__item--body-highlight");
      tag.classList.remove("calender__item--body-double-highlight");
    });
  }

  /**
   * 하이라이팅 클래스명 추가
   * @param {[number]} days 데이트 가능 날짜 배열
   */
  addClassName(days) {
    for (let i = 0; i < days.length; i++) {
      if (days[i + 1] === days[i] + 1) {
        this.tags[days[i] - 1].classList.add(
          "calender__item--body-double-highlight",
        );
        this.tags[days[i + 1] - 1].classList.add(
          "calender__item--body-double-highlight",
        );
        i = i + 1;
      } else if (typeof days[i] === "number") {
        this.tags[days[i] - 1].classList.add("calender__item--body-highlight");
      }
    }
  }
}
