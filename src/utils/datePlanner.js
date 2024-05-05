export default class DatePlanner {
  constructor() {
    this._dateDays = [];
  }

  /**
   * 데이트 가능 날짜 반환
   * @param {Object} options - 남친, 여친 근무표
   * @param {string} options.boyfriend - 남친 근무표
   * @param {string} options.girlfriend - 여친 근무표
   * @returns {[number]} - 남친, 여친 데이트 가능 날짜 배열
   */
  findDay({ boyfriend, girlfriend }) {
    this._dateDays = [];
    for (let i = 0; i <= 31; i++) {
      if (boyfriend[i] === "X" && girlfriend[i] === "X") {
        this._dateDays.push(i + 1);
        if (boyfriend[i + 1] === "X" && girlfriend[i + 1] === "X") {
          this._dateDays.push(i + 2);
          i = i + 2;
        }
        if (boyfriend[i + 1] === "X" && girlfriend[i + 1] === "N") {
          this._dateDays.push(i + 2);
          i = i + 2;
        }
        if (boyfriend[i + 1] === "N" && girlfriend[i + 1] === "X") {
          this._dateDays.push(i + 2);
          i = i + 2;
        }
      }
    }
    this._dateDays.push("*");
    return this._dateDays;
  }
}
