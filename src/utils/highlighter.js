export default class HighLighter {
  /**
   * 하이라이팅 관련 클래스명 초기화
   */
  static initialClassName() {
    document.querySelectorAll(".calender__item--body").forEach((tag) => {
      tag.classList.remove("calender__item--body-highlight");
      tag.classList.remove("calender__item--body-double-highlight");
    });
  }

  /**
   * 하이라이팅 클래스명 추가
   * @param {[number]} days 데이트 가능 날짜 배열
   */
  static addClassName(days) {
    days.map((day) => {
      const $thisDays = document.querySelectorAll(".calender__item--this");
      if (
        $thisDays[day - 1].parentNode.classList.contains(
          "calender__item--body-highlight",
        )
      ) {
        console.log("들어옴");
        $thisDays[day - 1].parentNode.classList.remove(
          "calender__item--body-highlight",
        );
        $thisDays[day - 1].parentNode.classList.add(
          "calender__item--body-double-highlight",
        );
      } else {
        $thisDays[day - 1].parentNode.classList.add(
          "calender__item--body-highlight",
        );
      }
    });
  }
}
