import * as tags from "../constants/tags";

export default class CalendarView {
  static setHead(viewYear, viewMonth) {
    tags.$calenderHeadDate.textContent = `${viewYear}년 ${viewMonth + 1}월`;
  }

  static setMemoDate(viewYear, viewMonth, curDay) {
    tags.$memoDate.innerHTML = `${viewYear}년 ${viewMonth + 1}월 ${curDay}일`;
  }

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
