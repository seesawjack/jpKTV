import { defineStore } from "pinia";

export const useRegexStore = defineStore('regex', () => {
    const passwordRegex = function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/g.test(value)
    }

    const songTitleRegex = function (value) {
        return value.split(
            /[^\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf\w]/g
        )
        .map((i) => i.trim())
        .filter((i) => i != "")
    }

    const songIdRegex = function (value) {
        return value.replace('?v=','');
    }

    return {
        passwordRegex,
        songTitleRegex,
        songIdRegex
    }
})