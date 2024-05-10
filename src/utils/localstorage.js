import { SCHEDULE_TYPE } from "../constants/schedule";

export default class LocalStorage {
  static clear() {
    window.localStorage.clear();
  }

  static setItem(key, value) {
    window.localStorage.setItem(key, value);
  }

  static getList() {
    const list = new Array(window.localStorage.length).fill(0).map((_, i) => {
      const key = window.localStorage.key(i);
      const value = window.localStorage.getItem(key);
      return [key, value];
    });

    console.log(list);
    return list;
  }

  static getMemo(date) {
    const list = LocalStorage.getList();
    const memo = list
      .map((info) => {
        if (info[0] !== "girlSchedule" && info[0] !== "boySchedule") {
          const listDate = new Date(JSON.parse(info[1]).date);
          if (
            date.getFullYear() === listDate.getFullYear() &&
            date.getMonth() === listDate.getMonth() &&
            date.getDate() === listDate.getDate()
          ) {
            return JSON.parse(info[1]).memo;
          }
        }
      })
      .filter((value) => value !== undefined);
    console.log(memo);
    return memo;
  }

  static getSchedules() {
    const schedules = {
      boySchedule: window.localStorage.getItem("boySchedule")
        ? SCHEDULE_TYPE[window.localStorage.getItem("boySchedule")]
        : SCHEDULE_TYPE.dayShift,
      girlSchedule: window.localStorage.getItem("girlSchedule")
        ? SCHEDULE_TYPE[window.localStorage.getItem("girlSchedule")]
        : SCHEDULE_TYPE.dayShift,
    };

    return schedules;
  }

  static setBoyShedule(boySchedule) {
    window.localStorage.setItem("boySchedule", boySchedule);
  }

  static setGirlShedule(girlSchedule) {
    window.localStorage.setItem("girlSchedule", girlSchedule);
  }
}
