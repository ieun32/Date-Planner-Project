import * as tags from "../constants/tags";

export default class CalendarView {
  /**
   * 캘린더 상단의 년도, 월을 변경
   * @param {number} viewYear 현재 년도
   * @param {number} viewMonth 현재 월
   */
  static setHead(viewYear, viewMonth) {
    tags.$calenderHeadDate.textContent = `${viewYear}년 ${viewMonth + 1}월`;
  }
  /**
   * 메모 상단의 년도, 월, 일자 변경
   * @param {number} viewYear 현재 년도
   * @param {number} viewMonth 현재 월
   * @param {number} curDay 현재 일자
   */
  static setMemoDate(viewYear, viewMonth, curDay) {
    tags.$memoDate.innerHTML = `${viewYear}년 ${viewMonth + 1}월 ${curDay}일`;
  }
  /**
   * 월 정보를 받아 캘린더에 반영
   * @param {[number]} dates 일자 배열
   * @param {number} firstDateIndex 첫번째 일자 인덱스
   * @param {number} lastDateIndex 마지막 일자 인덱스
   */
  static setDates(dates, firstDateIndex, lastDateIndex) {
    tags.$calenderBody.innerHTML = dates
      .map((date, i) => {
        const condition =
          i >= firstDateIndex && i < lastDateIndex + 1
            ? "calender__item--this"
            : "calender__item--other";
        return `<li class="calender__item calender__item--body"><span class="${condition}">${date}</span></li>`;
      })
      .join("");
  }
  /**
   * 이번 달이 아닌 날짜는 불투명 처리
   * @param {number} viewYear 현재 년도
   * @param {number} viewMonth 현재 월
   */
  static setActiveDates(viewYear, viewMonth) {
    const today = new Date();
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
      for (let date of document.querySelectorAll(".calender__item--this")) {
        if (+date.innerHTML === today.getDate()) {
          date.classList.add("calender__item--active");
          break;
        }
      }
    }
  }
}
